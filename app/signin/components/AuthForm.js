'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsGoogle } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthSocialButton from "./AuthSocialButton";
import Input from "@/components/Input";
import Button from "@/components/Common/buttons/Button";

const AuthForm = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [variant, setVariant] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (session) {
      router.push('/zonas');
    }
  }, [session, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      try {
        await axios.post('/api/register', data);
        await signIn('credentials', data);
        toast.success('Registered and logged in successfully');
        router.push('/zonas');
      } catch {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    if (variant === 'LOGIN') {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false
      });

      if (callback?.error) {
        toast.error('Invalid credentials');
      } else if (callback?.ok) {
        toast.success('Logged in!');
        if (user) {
          router.push('/zonas');
        } else {
          // Handle the checkout redirection if the user doesn't have access
        }
      }

      setIsLoading(false);
    }
  }

  const socialAction = async (action) => {
    setIsLoading(true);

    const callback = await signIn(action, { redirect: false });

    if (callback?.error) {
      toast.error('Invalid credentials');
    } else {
      toast.success('Logged in!');
    }

    setIsLoading(false);
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-md sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input 
              id="name" 
              label="Nombre" 
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input 
            id="email" 
            label="Correo electrónico"
            type="email" 
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input 
            id="password" 
            label="Contraseña"
            type="password" 
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === 'LOGIN' ? 'Ingresar' : 'Registrarse'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">O</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              tag="Ingresar con Google"
              onClick={() => socialAction('google')}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? '¿Nuevo en Tario?' : '¿Ya tienes una cuenta?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Crear cuenta' : 'Iniciar sesión'}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;
