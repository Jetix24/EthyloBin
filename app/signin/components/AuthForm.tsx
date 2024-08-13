'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGoogle } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthSocialButton from "./AuthSocialButton";
import Input from "@/components/Input";
import Button from "@/components/Common/buttons/Button";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = ( {user}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    if (session) {
      router.push('/zonas');
    }
  }, [session, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      /*.then((callback) => {
        if (callback?.error) {
          toast.error('Credentials are incorrect');
          toast.error(`Error: ${callback.error}`);
      }
      if (callback?.ok) {
          toast.success('Logged in successfully');
          router.push('/zonas');
      }
      })*/
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then(async (callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }

        if (callback?.ok) {
          toast.success('Logged in!');
          console.log("Usuario",user);
          /*if(user) {
            router.push('/zonas');
          }else{
            const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL // Asegúrate de reemplazar esto con tu dominio real
            const successUrl = `${baseUrl}/zonas`;
            const cancelUrl = `${baseUrl}/`;

            const res: { url: string } = await apiClient.post("/stripe/create-checkout", {
              priceId,
              mode,
              successUrl,
              cancelUrl,
            });
            window.location.href = res.url;
      }*/
        }
      })
      .finally(() => setIsLoading(false));
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error('Invalid Credentials');
      }

      if (callback?.ok && !callback?.error) {
        toast.success('Logged in!')
      }
    })
    .finally(() => setIsLoading(false));
  }

  return ( 
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          shadow
          sm:rounded-md
          sm:px-10
        "
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div 
                className="
                  w-full 
                  border-t 
                  border-gray-300"
              />
            </div>
            <div className="
              relative 
              flex 
              justify-center 
              text-sm
            "
          >
              <span className="
                bg-white 
                px-2 
                text-gray-500">
                  O
              </span>
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

        <div className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
        ">
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