import { FaClipboardList } from "react-icons/fa";
import AuthForm from "./components/AuthForm";

export default function signin() {
    return (
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Inicia sesión en tu cuenta
            </h2>
        </div>
            <AuthForm />
      </div>

    );
  }
  