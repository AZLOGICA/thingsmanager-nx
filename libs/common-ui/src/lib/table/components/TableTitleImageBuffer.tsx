import React, { useEffect, useMemo, useState } from 'react';

export const TableTitleImageBuffer = ({ cell: { value } }: any) => {
  const [image, setImage] = useState<any>(null);

  const getImage = async () => {
   
   const base64String = btoa(String.fromCharCode(...new Uint8Array(JSON.parse(value).data)));
    console.log("base64String", base64String)
   let srcValue = "data:image/jpg;base64,"+base64String
   setImage(srcValue);
   //setImage(window.URL.createObjectURL(value))
  };
  useEffect(() => {
    getImage();
  }, [value]);

  return (
    <div>{image &&  <img src={image} />}</div>
  );
};
