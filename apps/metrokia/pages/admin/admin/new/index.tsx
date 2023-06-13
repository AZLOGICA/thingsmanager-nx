import { Title } from '@thingsmanager-nx/common-ui';
import React from 'react';
import UserForm from '../components/UserForm';
import { startAddUser, useAppDispatch } from '@thingsmanager-nx/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function NewUser() {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    console.log("data", data)
    try {
      const user = await dispatch(startAddUser(data));
      router.push('/admin/admin')
    } catch (error) {
      toast.error('Error', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        toastId: 'addedToCart',
    });
   // router.push('/admin/admin')
    }
  
   
  };
  return (
    <div>
      <Title title="Nuevo usuario" />

      <UserForm buttonAction="Añadir" onSubmit={onSubmit} />
    </div>
  );
}

export default NewUser;
