import React, { useMemo, useState } from 'react'

export const TableTitleGender = ({
  cell: { value } 
} : any ) => {


  return (

    <div className={`font-bold`}>
        { value == 1 ? 'Hombre' : ''}
        { value == 2 ? 'Mujer' : '' }
      </div>
    

  )
}
