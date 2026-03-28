import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type KeepaliveResponse = {
  ok: boolean;
  checkedAt: string;
  source: string;
  details?: string;
};

const json = (body: KeepaliveResponse, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

Deno.serve(async (req) => {
  try {
    const projectUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const cronSecret = Deno.env.get('KEEPALIVE_SECRET');

    if (!projectUrl || !serviceRoleKey) {
      return json(
        {
          ok: false,
          checkedAt: new Date().toISOString(),
          source: 'supabase-edge-function',
          details: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.',
        },
        500
      );
    }

    if (cronSecret) {
      const authHeader = req.headers.get('authorization');
      const expected = `Bearer ${cronSecret}`;

      if (authHeader !== expected) {
        return json(
          {
            ok: false,
            checkedAt: new Date().toISOString(),
            source: 'supabase-edge-function',
            details: 'Unauthorized keepalive request.',
          },
          401
        );
      }
    }

    const supabase = createClient(projectUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // A small read against a production table is enough to count as activity.
    const { error } = await supabase.from('projects').select('id', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return json({
      ok: true,
      checkedAt: new Date().toISOString(),
      source: 'supabase-edge-function',
      details: 'Keepalive query completed successfully.',
    });
  } catch (error) {
    return json(
      {
        ok: false,
        checkedAt: new Date().toISOString(),
        source: 'supabase-edge-function',
        details: error instanceof Error ? error.message : 'Unknown keepalive error.',
      },
      500
    );
  }
});
