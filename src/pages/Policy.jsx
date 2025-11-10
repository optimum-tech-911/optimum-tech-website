import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useI18n } from "../i18n.jsx";

export const Policy = () => {
  const { lang } = useI18n();

  const Section = ({ title, children }) => (
    <>
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#00E0B8]">{title}</h2>
      {children}
    </>
  );

  const ContentEN = () => (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#0A84FF]">Privacy Policy</h1>
      <p className="mb-6">
        At <strong>Optimum Tech</strong>, accessible from {" "}
        <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">optimutech.fr</a>, your privacy is one of our main priorities. This Privacy Policy explains how we handle your personal data when you visit our website, fill out a contact form, or interact with our services.
      </p>
      <Section title="1. Information We Collect">
        <p className="mb-4">When you contact us through our website, we may collect the following information:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Your full name</li>
          <li>Your business name (optional)</li>
          <li>Your email address</li>
          <li>Your phone number (optional)</li>
          <li>Any message or attachments you send us</li>
        </ul>
        <p className="mb-6">This information is provided voluntarily by you when filling out the contact form. We do not collect sensitive personal data such as financial or health information.</p>
      </Section>
      <Section title="2. How We Use Your Information">
        <p className="mb-6">The information you provide is used exclusively to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Respond to your inquiries or requests</li>
          <li>Provide services or project proposals you ask for</li>
          <li>Improve our website and communication</li>
          <li>Comply with legal obligations under French and EU law</li>
        </ul>
      </Section>
      <Section title="3. Legal Basis for Processing (GDPR)">
        <p className="mb-6">Under the EU General Data Protection Regulation (GDPR), we process personal data based on:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Consent:</strong> You voluntarily provide information via our forms.</li>
          <li><strong>Legitimate interest:</strong> To respond to your requests and improve our services.</li>
        </ul>
      </Section>
      <Section title="4. Data Retention">
        <p className="mb-6">We retain personal data only as long as necessary to fulfill the purposes outlined in this policy. Messages received via contact forms are stored securely and deleted when no longer relevant.</p>
      </Section>
      <Section title="5. Sharing and Security">
        <p className="mb-6">We do not sell, rent, or trade your personal information. Access to personal data is restricted to authorized personnel and protected through secure hosting providers.</p>
      </Section>
      <Section title="6. Analytics and Cookies">
        <p className="mb-6">Our website uses <strong>Google Search Console</strong> to analyze performance and search visibility. This tool may collect general usage data (such as page views or search queries) in an anonymized form. We do not use advertising cookies or tracking pixels.</p>
      </Section>
      <Section title="7. Your Rights Under GDPR">
        <p className="mb-4">As a visitor residing in the European Union, you have the following rights:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Right to access, modify, or delete your personal data</li>
          <li>Right to withdraw consent at any time</li>
          <li>Right to data portability</li>
          <li>Right to lodge a complaint with CNIL (France’s data authority)</li>
        </ul>
      </Section>
      <Section title="8. Contact Information">
        <p className="mb-6">For any questions or privacy-related requests, you can contact us at:</p>
        <p className="font-medium text-[#0A84FF]">Optimum Tech<br/>Email: <a href="mailto:optimum.tech.911@gmail.com" className="underline">optimum.tech.911@gmail.com</a><br/>Registered in France</p>
      </Section>
      <Section title="9. Updates to This Policy">
        <p className="mb-6">This Privacy Policy may be updated occasionally to reflect changes in our practices or legal requirements. Any updates will be published on this page with the revised date.</p>
      </Section>
      <p className="text-sm opacity-70 mt-10">Last updated: November 2025</p>
    </>
  );

  const ContentFR = () => (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#0A84FF]">Politique de Confidentialité</h1>
      <p className="mb-6">
        Chez <strong>Optimum Tech</strong>, accessible depuis {" "}
        <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">optimutech.fr</a>, votre vie privée est une priorité. Cette politique explique comment nous traitons vos données personnelles lorsque vous visitez notre site, remplissez un formulaire de contact ou interagissez avec nos services.
      </p>
      <Section title="1. Données que nous collectons">
        <p className="mb-4">Lorsque vous nous contactez via le site, nous pouvons collecter :</p>
        <ul className="list-disc list-inside mb-6">
          <li>Votre nom complet</li>
          <li>Le nom de votre société (optionnel)</li>
          <li>Votre adresse e‑mail</li>
          <li>Votre numéro de téléphone (optionnel)</li>
          <li>Tout message ou fichier joint que vous nous envoyez</li>
        </ul>
        <p className="mb-6">Ces informations sont fournies volontairement via le formulaire. Nous ne collectons pas de données sensibles (financières, santé, etc.).</p>
      </Section>
      <Section title="2. Utilisation de vos informations">
        <p className="mb-6">Vos données sont utilisées uniquement pour :</p>
        <ul className="list-disc list-inside mb-6">
          <li>Répondre à vos demandes</li>
          <li>Fournir des services ou des propositions de projet</li>
          <li>Améliorer notre site et notre communication</li>
          <li>Respecter nos obligations légales (France / UE)</li>
        </ul>
      </Section>
      <Section title="3. Base légale (RGPD)">
        <p className="mb-6">Conformément au RGPD, le traitement repose sur :</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Votre consentement</strong> : vous fournissez les informations via nos formulaires.</li>
          <li><strong>Intérêt légitime</strong> : répondre à vos demandes et améliorer nos services.</li>
        </ul>
      </Section>
      <Section title="4. Durée de conservation">
        <p className="mb-6">Nous conservons les données uniquement le temps nécessaire aux finalités décrites. Les messages sont stockés de manière sécurisée et supprimés lorsqu’ils ne sont plus pertinents.</p>
      </Section>
      <Section title="5. Partage et sécurité">
        <p className="mb-6">Nous ne vendons ni ne louons vos données. L’accès est limité au personnel autorisé et protégé par des hébergeurs sécurisés.</p>
      </Section>
      <Section title="6. Analyses et cookies">
        <p className="mb-6">Notre site utilise <strong>Google Search Console</strong> pour analyser les performances et la visibilité. Les données collectées sont agrégées et anonymisées. Aucun cookie publicitaire ni pixel de suivi n’est utilisé.</p>
      </Section>
      <Section title="7. Vos droits (RGPD)">
        <p className="mb-4">Vous disposez notamment des droits suivants :</p>
        <ul className="list-disc list-inside mb-6">
          <li>Droit d’accès, de rectification et d’effacement</li>
          <li>Droit de retirer votre consentement à tout moment</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit de réclamation auprès de la CNIL</li>
        </ul>
      </Section>
      <Section title="8. Contact">
        <p className="mb-6">Pour toute question ou demande liée à la confidentialité :</p>
        <p className="font-medium text-[#0A84FF]">Optimum Tech<br/>Email : <a href="mailto:optimum.tech.911@gmail.com" className="underline">optimum.tech.911@gmail.com</a><br/>Enregistrée en France</p>
      </Section>
      <Section title="9. Mises à jour de cette politique">
        <p className="mb-6">Cette politique peut être mise à jour pour refléter des évolutions légales ou de nos pratiques. Les changements seront publiés ici avec la date révisée.</p>
      </Section>
      <p className="text-sm opacity-70 mt-10">Dernière mise à jour : novembre 2025</p>
    </>
  );

  const ContentES = () => (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#0A84FF]">Política de Privacidad</h1>
      <p className="mb-6">En <strong>Optimum Tech</strong>, accesible desde {" "}
        <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">optimutech.fr</a>, tu privacidad es una prioridad. Esta política explica cómo tratamos tus datos personales cuando visitas el sitio, completas el formulario de contacto o utilizas nuestros servicios.</p>
      <Section title="1. Información que recopilamos">
        <p className="mb-4">Podemos recopilar:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Nombre completo</li>
          <li>Nombre de la empresa (opcional)</li>
          <li>Correo electrónico</li>
          <li>Teléfono (opcional)</li>
          <li>Mensaje o archivos adjuntos enviados</li>
        </ul>
        <p className="mb-6">La información se proporciona de forma voluntaria. No recopilamos datos sensibles.</p>
      </Section>
      <Section title="2. Uso de la información">
        <ul className="list-disc list-inside mb-6">
          <li>Responder a tus solicitudes</li>
          <li>Preparar servicios o propuestas</li>
          <li>Mejorar el sitio y la comunicación</li>
          <li>Cumplir con obligaciones legales (Francia/UE)</li>
        </ul>
      </Section>
      <Section title="3. Base legal (RGPD)">
        <ul className="list-disc list-inside mb-6">
          <li><strong>Consentimiento</strong>: proporcionas los datos mediante formularios.</li>
          <li><strong>Interés legítimo</strong>: responder e mejorar servicios.</li>
        </ul>
      </Section>
      <Section title="4. Conservación de datos">
        <p className="mb-6">Conservamos los datos solo el tiempo necesario. Los mensajes se almacenan de forma segura y se eliminan cuando ya no sean relevantes.</p>
      </Section>
      <Section title="5. Compartición y seguridad">
        <p className="mb-6">No vendemos ni alquilamos tus datos. El acceso está restringido y protegido por alojamiento seguro.</p>
      </Section>
      <Section title="6. Analítica y cookies">
        <p className="mb-6">Usamos <strong>Google Search Console</strong> para rendimiento y visibilidad, de forma agregada y anónima. No usamos cookies publicitarias ni píxeles de seguimiento.</p>
      </Section>
      <Section title="7. Tus derechos (RGPD)">
        <ul className="list-disc list-inside mb-6">
          <li>Acceso, rectificación y eliminación</li>
          <li>Retirar el consentimiento</li>
          <li>Portabilidad</li>
          <li>Reclamar ante la autoridad (CNIL)</li>
        </ul>
      </Section>
      <Section title="8. Contacto">
        <p className="mb-6">Para consultas o solicitudes:</p>
        <p className="font-medium text-[#0A84FF]">Optimum Tech<br/>Email: <a href="mailto:optimum.tech.911@gmail.com" className="underline">optimum.tech.911@gmail.com</a><br/>Registrada en Francia</p>
      </Section>
      <Section title="9. Actualizaciones">
        <p className="mb-6">Esta política puede actualizarse por cambios legales o de práctica. Publicaremos la fecha revisada.</p>
      </Section>
      <p className="text-sm opacity-70 mt-10">Última actualización: noviembre de 2025</p>
    </>
  );

  const ContentAR = () => (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#0A84FF]">سياسة الخصوصية</h1>
      <p className="mb-6">في <strong>Optimum Tech</strong>، والمتاحة عبر {" "}
        <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">optimutech.fr</a>، خصوصيتك أولوية. توضح هذه السياسة كيفية معالجة بياناتك الشخصية عند زيارة الموقع أو إرسال نموذج الاتصال أو استخدام خدماتنا.</p>
      <Section title="1. البيانات التي نجمعها">
        <p className="mb-4">قد نجمع ما يلي:</p>
        <ul className="list-disc list-inside mb-6">
          <li>الاسم الكامل</li>
          <li>اسم الشركة (اختياري)</li>
          <li>البريد الإلكتروني</li>
          <li>رقم الهاتف (اختياري)</li>
          <li>أي رسالة أو مرفقات ترسلها لنا</li>
        </ul>
        <p className="mb-6">تُقدَّم هذه المعلومات طوعاً عبر النماذج. لا نجمع بيانات حساسة.</p>
      </Section>
      <Section title="2. كيفية استخدام البيانات">
        <ul className="list-disc list-inside mb-6">
          <li>الرد على الاستفسارات</li>
          <li>تقديم الخدمات أو عروض المشاريع</li>
          <li>تحسين الموقع والتواصل</li>
          <li>الامتثال للالتزامات القانونية (فرنسا/الاتحاد الأوروبي)</li>
        </ul>
      </Section>
      <Section title="3. الأساس القانوني (GDPR)">
        <ul className="list-disc list-inside mb-6">
          <li><strong>الموافقة</strong>: تقديمك المعلومات عبر النماذج.</li>
          <li><strong>المصلحة المشروعة</strong>: الرد والتحسين.</li>
        </ul>
      </Section>
      <Section title="4. الاحتفاظ بالبيانات">
        <p className="mb-6">نحتفظ بالبيانات للمدة اللازمة فقط. تُخزَّن الرسائل بأمان وتُحذف عند عدم الحاجة.</p>
      </Section>
      <Section title="5. المشاركة والأمن">
        <p className="mb-6">لا نبيع بياناتك ولا نؤجرها. الوصول مقصور على المخوّلين ومحمي عبر استضافة آمنة.</p>
      </Section>
      <Section title="6. التحليلات وملفات تعريف الارتباط">
        <p className="mb-6">نستخدم <strong>Google Search Console</strong> لتحليل الأداء والرؤية، ببيانات مجمّعة ومجهولة. لا نستخدم ملفات تعريف الارتباط الإعلانية أو بكسلات التتبع.</p>
      </Section>
      <Section title="7. حقوقك (GDPR)">
        <ul className="list-disc list-inside mb-6">
          <li>الحق في الوصول والتصحيح والحذف</li>
          <li>الحق في سحب الموافقة في أي وقت</li>
          <li>الحق في قابلية نقل البيانات</li>
          <li>الحق في الشكوى لدى CNIL</li>
        </ul>
      </Section>
      <Section title="8. معلومات الاتصال">
        <p className="mb-6">للاستفسارات أو الطلبات المتعلقة بالخصوصية:</p>
        <p className="font-medium text-[#0A84FF]">Optimum Tech<br/>البريد: <a href="mailto:optimum.tech.911@gmail.com" className="underline">optimum.tech.911@gmail.com</a><br/>مسجّلة في فرنسا</p>
      </Section>
      <Section title="9. التحديثات">
        <p className="mb-6">قد نقوم بتحديث هذه السياسة تبعاً للتغييرات القانونية أو العملية. سننشر أي تحديث مع التاريخ المعدّل.</p>
      </Section>
      <p className="text-sm opacity-70 mt-10">آخر تحديث: نوفمبر 2025</p>
    </>
  );

  const Content = { en: ContentEN, fr: ContentFR, es: ContentES, ar: ContentAR }[lang] || ContentEN;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 py-16 text-gray-200 leading-relaxed">
        <Content />
      </main>
      <Footer />
    </div>
  );
};
