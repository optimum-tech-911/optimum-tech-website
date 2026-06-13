import fs from 'node:fs';
import { publicProjects } from '../src/data/projects.js';

const env = Object.fromEntries(
  fs.readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf('=');
      return [line.slice(0, separator), line.slice(separator + 1)];
    }),
);

const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
if (!accessToken) throw new Error('SUPABASE_ACCESS_TOKEN is required.');

const quote = (value) => `'${String(value ?? '').replaceAll("'", "''")}'`;
const nullable = (value) => value ? quote(value) : 'null';
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`;

const values = publicProjects.map((project, index) => `(
  ${quote(project.id)},
  ${quote(project.slug)},
  ${quote(project.title)},
  ${quote(project.description)},
  ${nullable(project.url)},
  'Launched',
  'Client',
  ${index + 1},
  ${quote(project.sector)},
  ${quote(project.category)},
  ${quote(project.type)},
  ${quote(project.image)},
  ${nullable(project.logo)},
  ${json(project.capabilities)},
  ${quote(project.source)},
  ${project.featured ? 'true' : 'false'},
  ${project.caseStudy ? 'true' : 'false'},
  'public'
)`).join(',\n');

const query = `
delete from public.projects;

insert into public.projects (
  project_key, slug, title, description, url, status, owner, sort_order,
  sector, category, project_type, image, logo, capabilities, source,
  featured, case_study, visibility
)
select
  project_key, slug, title, description, url, status, owner, sort_order,
  sector, category, project_type, image, logo, capabilities, source,
  featured, case_study, visibility
from (values ${values}) as catalog(
  project_key, slug, title, description, url, status, owner, sort_order,
  sector, category, project_type, image, logo, capabilities, source,
  featured, case_study, visibility
);
`;

const response = await fetch('https://api.supabase.com/v1/projects/dpiycebkjwgiylqwdaoi/database/query', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
});

if (!response.ok) throw new Error(await response.text());
console.log(`Synchronized ${publicProjects.length} verified projects.`);
