import { Button, Title } from '@thingsmanager-nx/common-ui';
import { startLogout, useAppDispatch } from '@thingsmanager-nx/store';
import React from 'react';

function Settings() {

  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(startLogout());
  }
  return (
    <div>
      <Title title="Configuración" />
      <div className="my-4">
        <Button
          title="Cerrar sesión"
          backgroundColor="!bg-[#ef4444]"
          onClick={logout}
        />
      </div>
    </div>
  );
}

export default Settings;
