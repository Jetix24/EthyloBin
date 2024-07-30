import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// Eres un excelente abogado.

// Necesito tu ayuda para redactar unos Términos y Servicios simples para mi sitio web. Aquí tienes algo de contexto:
// - Sitio web: https://tario.com
// - Nombre: Tario
// - Información de contacto: Tario.software@gmail.com
// - Descripción: Tario es una herramienta digital para gestionar el inventario de tu negocio de preparación de alimentos. Ayuda a los propietarios de cafeterías, puestos de comida y restaurantes a administrar sus inventarios.
// - Propiedad: al comprar una suscripción, los usuarios obtienen acceso a la plataforma y a las funciones de gestión de inventario. No pueden revender la plataforma ni los datos recopilados.
// - Datos de usuarios recopilados: nombre, correo electrónico e información de pago
// - Recopilación de datos no personales: cookies web
// - Enlace a la política de privacidad: https://tario.com/privacy-policy
// - Ley aplicable: México
// - Actualizaciones de los Términos: los usuarios serán actualizados por correo electrónico

// Por favor, redacta unos Términos y Servicios simples para mi sitio. Añade la fecha actual. No añadas ni expliques tu razonamiento.

// Answer:

export const metadata = getSEOTags({
  title: `Términos y condiciones | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Términos y condiciones de {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Fecha de entrada en vigor: 18 de junio de 2024

Bienvenido a Tario, una herramienta digital para gestionar el inventario de tu negocio de preparación de alimentos. Al acceder y usar nuestro sitio web https://tario.software, aceptas cumplir y estar sujeto a los siguientes Términos y Servicios.

1. Aceptación de los Términos
Al utilizar nuestro sitio web y nuestros servicios, aceptas estos Términos y Servicios. Si no estás de acuerdo con estos términos, no utilices nuestro sitio web.

2. Suscripción y Acceso
Al adquirir una suscripción, obtienes acceso a nuestra plataforma y a las funciones de gestión de inventario. Los usuarios no pueden revender la plataforma ni los datos recopilados a través de ella.

3. Recopilación de Datos
Recopilamos los siguientes datos de los usuarios:

Nombre
Correo electrónico
Información de pago
Los usuarios también pueden ingresar información sobre los insumos que gestionan en su negocio. Esta información se utilizará exclusivamente para el correcto funcionamiento de la plataforma y no se empleará con fines de beneficio propio.

Además, recopilamos datos no personales a través de cookies web. Para más detalles, consulta nuestra Política de Privacidad en https://tario.com/privacy-policy.

4. Propiedad Intelectual
Todos los contenidos de la plataforma, incluyendo pero no limitado a textos, gráficos, logotipos y software, son propiedad de Tario y están protegidos por las leyes de propiedad intelectual.

5. Ley Aplicable
Estos Términos y Servicios se regirán e interpretarán de acuerdo con las leyes de México.

6. Modificaciones de los Términos
Nos reservamos el derecho de actualizar estos Términos y Servicios en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio por correo electrónico.

7. Información de Contacto
Si tienes alguna pregunta sobre estos Términos y Servicios, puedes contactarnos en tario.software@gmail.com.

Gracias por usar Tario.

Esta información se utilizará exclusivamente para el correcto funcionamiento de la plataforma y no se empleará con fines de beneficio propio.

cambia a "no se empleara con fines ajenos a... haz que suene formal y serio"
ChatGPT
Términos y Servicios de Tario
Fecha de vigencia: 30 de julio de 2024

Bienvenido a Tario, una herramienta digital para gestionar el inventario de su negocio de preparación de alimentos. Al acceder y utilizar nuestro sitio web https://tario.software, usted acepta cumplir y estar sujeto a los siguientes Términos y Servicios.

1. Aceptación de los Términos
Al utilizar nuestro sitio web y nuestros servicios, usted acepta estos Términos y Servicios. Si no está de acuerdo con estos términos, no utilice nuestro sitio web.

2. Suscripción y Acceso
Al adquirir una suscripción, usted obtiene acceso a nuestra plataforma y a las funciones de gestión de inventario. Los usuarios no pueden revender la plataforma ni los datos recopilados a través de ella.

3. Recopilación de Datos
Recopilamos los siguientes datos de los usuarios:

Nombre
Correo electrónico
Información de pago
Los usuarios también pueden ingresar información sobre los insumos que gestionan en su negocio. Esta información se utilizará exclusivamente para el correcto funcionamiento de la plataforma y no se empleará con fines ajenos a este propósito.

Además, recopilamos datos no personales a través de cookies web. Para más detalles, consulte nuestra Política de Privacidad en https://tario.software/privacy-policy.

4. Propiedad Intelectual
Todos los contenidos de la plataforma, incluyendo, pero no limitado a, textos, gráficos, logotipos y software, son propiedad de Tario y están protegidos por las leyes de propiedad intelectual.

5. Ley Aplicable
Estos Términos y Servicios se regirán e interpretarán de acuerdo con las leyes de México.

6. Modificaciones de los Términos
Nos reservamos el derecho de actualizar estos Términos y Servicios en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio por correo electrónico.

7. Información de Contacto
Si tiene alguna pregunta sobre estos Términos y Servicios, puede contactarnos en tario.software@gmail.com.

Gracias por usar Tario.

© 2024 Tario. Todos los derechos reservados.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
