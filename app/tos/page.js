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
// - Información de contacto: solofervazquez@gmail.com
// - Descripción: Tario es una herramienta digital para gestionar tu negocio de preparación de alimentos. Ayuda a los propietarios de cafeterías, puestos de comida y restaurantes a administrar sus inventarios.
// - Propiedad: al comprar una suscripción, los usuarios obtienen acceso a la plataforma y a las funciones de gestión de inventario. No pueden revender la plataforma ni los datos recopilados.
// - Datos de usuarios recopilados: nombre, correo electrónico e información de pago
// - Recopilación de datos no personales: cookies web
// - Enlace a la política de privacidad: https://tario.com/privacy-policy
// - Ley aplicable: México
// - Actualizaciones de los Términos: los usuarios serán actualizados por correo electrónico

// Por favor, redacta unos Términos y Servicios simples para mi sitio. Añade la fecha actual. No añadas ni expliques tu razonamiento.

// Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
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
          Terminos y condiciones de {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Fecha de entrada en vigor: 18 de junio de 2024

Bienvenido a Tario. Estos Términos y Servicios rigen el uso de nuestro sitio web y plataforma disponible en https://tario.com.

1. Aceptación de los Términos
Al acceder o utilizar nuestra plataforma, aceptas cumplir con estos Términos y Servicios. Si no estás de acuerdo con estos términos, no utilices nuestro servicio.

2. Descripción del Servicio
Tario es una herramienta digital para gestionar negocios de preparación de alimentos. Ofrecemos funcionalidades de gestión de inventarios para propietarios de cafeterías, puestos de comida y restaurantes.

3. Propiedad y Licencia
Al comprar una suscripción, obtienes acceso a nuestra plataforma y sus funciones. No puedes revender, distribuir o usar comercialmente la plataforma o los datos recopilados a través de ella.

4. Datos Recopilados
Recopilamos información personal como nombre, correo electrónico e información de pago. También recopilamos datos no personales a través de cookies web. Para más información, consulta nuestra Política de Privacidad en https://tario.com/privacy-policy.

5. Uso de la Plataforma
El uso de la plataforma debe ser conforme a las leyes y regulaciones aplicables. Está prohibido el uso indebido, la duplicación o la reproducción de cualquier parte de la plataforma sin nuestro consentimiento.

6. Actualizaciones de los Términos
Nos reservamos el derecho de modificar estos Términos y Servicios en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio por correo electrónico.

7. Ley Aplicable
Estos Términos y Servicios se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales competentes de México.

8. Contacto
Para cualquier consulta o soporte, contáctanos en solofervazquez@gmail.com.

Gracias por usar Tario.

© 2024 Tario. Todos los derechos reservados.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
