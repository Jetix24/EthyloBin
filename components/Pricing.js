import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="relative pt-8">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {config.stripe.plans.map((plan) => (
            <div key={plan.priceId} className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              <div className="flex-1 bg-purple_200 px-6 py-8 lg:p-12">
                <h3 className="text-3xl font-bold text-blue_500 sm:text-4xl">Precio pensado para tu negocio</h3>
                {plan.description && (
                      <p className="mt-3 text-l font-medium text-blue_500">
                        {plan.description}
                      </p>
                )}
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 text-md tracking-wider font-semibold uppercase text-blue_500">
                      ¿Qué incluye?</h4>
                    <div className="flex-1 border-t-2 border-blue_500"></div>
                  </div>
                  {plan.features && (
                  <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                    {plan.features.map((feature, i) => (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0"><svg className="h-6 w-6 text-blue_200" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"></path>
                        </svg></div>
                        <p className="ml-3 text-md text-blue_300">{feature.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
                  
                </div>
              </div>
              {plan.priceAnchor && (
              <div className="py-8 px-6 text-center bg-purple_100 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p className="text-xl leading-6 font-medium text-blue_300">Oferta Limitada</p>
                <div className="">
                  <span style={{opacity: '0.5'}} className="h1 line-through text-gray-600">${plan.priceAnchor}</span>
                  <span className="text-blue_200 text-md">{" "}Promoción</span>
                </div>
                
                <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-blue_300"><span>${plan.price}</span>
                  <span className="ml-3 text-xl font-medium text-gray-600">MXN/mes</span>
                </div>
                
                <div className="mt-4 bg-blue_200">
                  <ButtonCheckout priceId={plan.priceId} />
                </div>
              </div>
              )}
            </div>
            
            ))}
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default Pricing;
