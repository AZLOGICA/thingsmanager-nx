import { Button, Title } from '@thingsmanager-nx/common-ui'
import React from 'react'

function Admin() {
  return (
    <div>
      <div className='flex pb-6 '>
        <div className='w-5/6 items-center'>
          <Title title='Administración' />
        </div>
        <div className='w-1/6'>
          <Button
          
            title='Añadir Usuario'
            link={'/admin/newUser'}
            animation='scale'
          />
        </div>
      </div>


      <div className="overflow-x-auto bg-tableBackground shadow-md p-7">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th
                className="whitespace-nowrap px-4 py-2 text-left font-medium text-tableText"
              >
                Usuario
              </th>
              <th
                className="whitespace-nowrap px-4 py-2 text-left font-medium  text-tableText"
              >
                Rol
              </th>
              <th
                className="whitespace-nowrap px-4 py-2 text-left font-medium  text-tableText"
              >
                Estado
              </th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium  text-tableText">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2  text-tableText">Admin</td>
              <td className="whitespace-nowrap px-4 py-2  text-tableText">Activo</td>

              <td className="whitespace-nowrap px-4 py-2">
                <Button
                  size='xs'
             
                  title='Editar'
                  link={'/admin/newUser'}
                  animation='swapColor'
                />
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium  text-tableText">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2  text-tableText">Admin</td>
              <td className="whitespace-nowrap px-4 py-2  text-tableText">Activo</td>

              <td className="whitespace-nowrap px-4 py-2">
                <Button
                  size='xs'
          
                  title='Editar'
                  link={'/admin/newUser'}
                  animation='swapColor'
                />
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin