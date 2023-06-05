import { useForm } from "react-hook-form";
import ErrorAlert from "../error-alert/error-alert";

/* eslint-disable-next-line */
export interface LoginProps {
  title: string;
  description:string;
  onSubmit:  (data: any) => void
  loading: boolean;
}

export function LoginLayout({title, description, onSubmit, loading}: LoginProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <div className="relative min-h-screen flex ">
            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                // style={{ backgroundImage: "url(https://thingsmanager.s3.amazonaws.com/metrokia/assets/loginBackground.png)" }}
                >
                    <div className="absolute bg-gradient-to-b from-gradientPrimary to-gradientSecondary opacity-100 inset-0 z-0"></div>
                    <div className="w-full  max-w-md z-10">
                        <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">{title}</div>
                        <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> {description}</div>
                    </div>

                </div>
                <div className="md:flex md:items-center md:justify-center  sm:w-auto md:h-full w-full md:w-2/5 p-8  md:p-10 lg:p-12 sm:rounded-lg md:rounded-none bg-white">
                    <div className="md:mx-16 w-full space-y-8">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-generalTextColor">
                                Bienvenido
                            </h2>
                            <p className="mt-2 text-sm text-generalTextColor/80">Accede a tu cuenta</p>
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-3">


                            <form 
                             onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 space-y-6 w-full" action="#" method="POST">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-generalTextColor/90"
                                    >
                                        Usuario
                                    </label>

                                    <input
                                        type="email"
                                        className=" focus:border-2 focus:border-inputBorderFocus focus:ring focus:ring-transparent  mt-1 w-full rounded-md border-inputBorder bg-inputBackground text-sm text-inputText shadow-sm"
                                        {...register("email", {required: true})}
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-generalTextColor/90"
                                    >
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        className=" focus:border-2 focus:border-inputBorderFocus focus:ring focus:ring-transparent  mt-1 w-full rounded-md border-inputBorder bg-inputBackground text-sm text-inputText shadow-sm"
                                        {...register("password", {required: true})}
                                    />
                                </div>

                                {(errors.email || errors.password) &&  <ErrorAlert
                                    title="Error al iniciar sesión"
                                    description="Verifica los campos"
                                />}

                                <div className="flex items-center justify-between">
                                    {/* <div className="flex items-center">
                                                <input id="remember_me" name="remember_me" type="checkbox"
                                                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                                                    <label className="ml-2 block text-sm text-gray-900">
                                                        Remember me
                                                    </label>
                                            </div>
    */}
                                    {/* <div className="text-sm">
                                                <a href="#" className="text-indigo-400 hover:text-blue-500">
                                                    Forgot your password?
                                                </a>
                                            </div>
    */}
                                </div>
                                <div>
                                    <button type="submit"
                                        className="w-full flex justify-center bg-gradient-to-r from-buttonPrimary to-buttonSecondary  hover:bg-gradient-to-l hover:from-buttonPrimary hover:to-buttonSecondary text-buttonText p-4  text-sm rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Entrar
                                    </button>
                                </div>
                                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                                    {/*<span>Don't have an account?</span>
                                            <a href="#"
                                                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
                                                up</a>
    */}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default LoginLayout;
