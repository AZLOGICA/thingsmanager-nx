
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

function ReportsPage() {
  const Report = dynamic(() =>
  import('./Report').then((dashboard) => dashboard.default),
);


  return (
    <div>
      {/*<img className='w-full' src="https://prod-things-api-storagebucket89aab286-1gaqevb2nj0ga.s3.amazonaws.com/descarga.png"/>
      <img  className='w-full' src="https://prod-things-api-storagebucket89aab286-1gaqevb2nj0ga.s3.amazonaws.com/descarga2.png"/>
  */}
      <Report/>
      
    </div>
  );
}

export default ReportsPage;
