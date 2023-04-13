import { LoginLayout } from '@thingsmanager-nx/common-ui';
import React from 'react'
import { useForm } from 'react-hook-form';

function Login() {

    const onSubmit = data => console.log(data);

    return (
       <LoginLayout
        title='Metrokia'
        description='Plataforma Metrokia Things Manager'
        onSubmit={onSubmit}
       />
    )
}

export default Login