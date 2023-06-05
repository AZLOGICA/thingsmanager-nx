import { LoginLayout } from '@thingsmanager-nx/common-ui';
import {
  startLoginWithEmailPassword,
  useAppDispatch,
  useAppSelector,
} from '@thingsmanager-nx/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { status } = useAppSelector((state) => state.auth);
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      startLoginWithEmailPassword({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (status === 'authenticated') router.push('/admin/landing')
    console.log(status);
  }, [status]);

  return (
    <LoginLayout
      title="Metrokia"
      description="Plataforma Metrokia Things Manager"
      onSubmit={onSubmit}
      loading={status === 'checking'}
    />
  );
}

export default Login;
