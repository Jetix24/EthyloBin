import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Politica de privacidad | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Política de privacidad de {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Fecha de vigencia: 30 de julio de 2024

Bienvenido a Tario. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información cuando visita nuestro sitio web https://tario.software y utiliza nuestros servicios. Al usar nuestro sitio web, usted acepta la recopilación y el uso de información de acuerdo con esta política.

1. Información que Recopilamos
Datos Personales
  Recopilamos los siguientes datos personales de los usuarios:
  - Nombre
  - Correo electrónico
  - Información de pago

Los usuarios también pueden ingresar información sobre los insumos que gestionan en su negocio. Esta información se utilizará exclusivamente para el correcto funcionamiento de la plataforma y no se empleará con fines ajenos a este propósito.

Datos No Personales
  Recopilamos datos no personales a través de cookies web para mejorar su experiencia de navegación en nuestro sitio web.

2. Propósito de la Recopilación de Datos
Los datos que recopilamos se utilizan para el procesamiento de pedidos y para garantizar el funcionamiento eficiente de nuestra plataforma.

3. Compartir Datos
No compartimos sus datos personales con terceros.

4. Privacidad de los Niños
No recopilamos datos de niños. Nuestros servicios están destinados únicamente para el uso de adultos.

5. Actualizaciones de la Política de Privacidad
Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los usuarios serán notificados de cualquier cambio por correo electrónico.

6. Información de Contacto
Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos en tario.software@gmail.com.

Gracias por usar Tario.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
