import { LandingCard, LandingHeader } from '@thingsmanager-nx/common-ui'
import React from 'react'


function Landing(props) {

  return (
    <div className='p-8'>
      <LandingHeader
       title='Bienvenido de Nuevo Elliot Alderson' 
       description='  Your website has seen a 52% increase in traffic in the last month. Keep
       it up! 🚀'
       />
      <div className='grid gap-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-5'>
        <LandingCard title={'Dispositivos'} description={'Cámaras y NVR'} link={'online'}/>
        <LandingCard title={'Usuarios'} description={'Administración de usuarios'} link={'/admin'}/>
        <LandingCard title={'Dashboard'} description={'Dashboard'} link={'dashboard'}/>
        <LandingCard title={'Reportes'} description={'Reportería en Power BI'} link={'reports'}/>

      </div>

    </div>
  )
}

export default Landing