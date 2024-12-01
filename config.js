import themes from "daisyui/src/theming/themes";

const config = {
  // REQUIRED
  appName: "Ethylobin",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Herramienta digital para gestionar tu compostadora",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "www.Ethylobin.software",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1PWDKO2NkWrPkE6CjNNsmVPe"
            : "price_1QHcE42NkWrPkE6CL113KEEa",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Starter",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "La mejor opción para tu cafetería",
        // The price you want to display, the one user will be charged on Stripe.
        price: 249,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 300,
        features: [
          { name: "Gestión de inventario" },
          { name: "Categorización por areas" },
          { name: "Lista de compras automática" },
          { name: "Alertas de stock bajo" },
          { name: "Actualizaciones automáticas" },
          { name: "Acceso ilimitado a todas las funciones" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Ethylobin <ethylobin.software@gmail.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Equipo Ethylobin <ethylobin.software@gmail.com>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "ethylobin.software@gmail.com",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "ethylobin.software@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard/almacen",
    zonasUrl: "/dashboard/zonas",
    landUrl: "/",
    landUrlPri: "/#pricing",
  },
};

export default config;
