import AuthForm from "./components/AuthForm";
import getCurrentUser from "@/app/actions/getCurrentUser";
import config from "@/config";

export default async function signin() {
  const price = config.stripe.priceId;
  const user = await getCurrentUser();
  const hasAccess = user?.hasAccess;
  
    return (
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Inicia sesión en tu cuenta
            </h2>
        </div>
            <AuthForm user={hasAccess} />
      </div>

    );
  }
  