import { useAppSelector } from '@thingsmanager-nx/store';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  buttonAction: string;
  onSubmit: (data: any) => void;
  disabledFields?: any;
  item?: any;
}
function UserForm({ buttonAction, onSubmit, disabledFields, item }: Props) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name ? item.name : '',
      email: item?.id ? item.id : '',
      password: item ? '123456' : '',
      isEnabled: item?.isEnabled ? item.isEnabled : true,
    },
  });

  const { isLoadingUser } = useAppSelector((state) => state.users);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 ">
      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              className={`w-full rounded-lg  border-gray-200   p-3 text-sm
              ${
                errors.name != null
                  ? '!border-red-500 hover:border-red-500 focus:!border-red-500'
                  : ''
              }
              `}
              placeholder="Nombre"
              type="text"
              id="name"
              {...register('name', { required: true })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full rounded-lg  border-gray-200   p-3 text-sm
                ${
                  errors.email != null
                    ? '!border-red-500 hover:border-red-500 focus:!border-red-500'
                    : ''
                }
                `}
                placeholder="Email"
                disabled={disabledFields?.email ? true : false}
                type="email"
                id="email"
                {...register('email', { required: true })}
              />
            </div>
            {!disabledFields?.password && (
              <div>
                <label className="sr-only" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className={`w-full rounded-lg  border-gray-200   p-3 text-sm
                ${
                  errors.password != null
                    ? '!border-red-500 hover:border-red-500 focus:!border-red-500'
                    : ''
                }
                `}
                  placeholder="Contraseña"
                  disabled={disabledFields?.password ? true : false}
                  type="password"
                  id="password"
                  {...register('password', {
                    required: true,

                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'La contraseña debe tener al menos 8 caracteres, una mayáscula, una minúscula, un número y un caracter especial',
                    },
                  })}
                />
                {errors.password?.message && (
                  <div className="text-sm ">{errors.password?.message}</div>
                )}
              </div>
            )}
            <div>
              <label className="label cursor-pointer">
                <span className="label-text">Activo / Inactivo</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  {...register('isEnabled', { required: false })}
                />
              </label>
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isLoadingUser}
              type="submit"
              className="inline-block w-full rounded-lg bg-buttonPrimary px-5 py-3 font-medium text-buttonText sm:w-auto"
            >
              {buttonAction}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
