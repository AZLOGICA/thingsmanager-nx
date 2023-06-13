import { startEditUser, startGetUser, useAppDispatch } from '@thingsmanager-nx/store';
import { useRouter } from 'next/router';
import React, { useEffect , useState} from 'react';
import UserForm from '../components/UserForm';
import { toast } from 'react-toastify';

function EditUser(props) {

  const [item, setItem] = useState<any>(null)
  const router = useRouter();

  const dispatch = useAppDispatch();

  const getUser = async () => {
    // const data = await loadProduct(id) as Product;
    const data: any= await dispatch(startGetUser(router.query.id as string));
    if(data){
      setItem(data);
    }
    console.log("data", data)
   }

  useEffect(() => {
    console.log('router!', router);

    if (router?.query?.id) {
      console.log('router.query.id', router.query.id);
      getUser()
    }
  }, [router]);

  const onSubmit = async (data: any) => {
    console.log("data", data)
    try {
      const user = await dispatch(startEditUser(data));
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
  }
  
  return (
    <>
       {item &&  <UserForm item={item} disabledFields={{password: true, email: true}} buttonAction="Editar" onSubmit={onSubmit} /> }
    </>
  )
}

export default EditUser;
