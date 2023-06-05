import React, { useMemo, useState } from 'react'

export const TableTitlePersons= ({
  cell: { value } 
} : any ) => {

  return (

    <div className={`font-bold`}>
        {value.map( (person: any) => (
            <div>{person.name}</div>
        ))}
      </div>
    

  )
}
