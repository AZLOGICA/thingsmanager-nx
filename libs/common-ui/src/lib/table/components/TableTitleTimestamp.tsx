import React, { useMemo, useState } from 'react';

export const TableTitleTimestamp = ({ cell: { value } }: any) => {
  const parseDate = (date: any) => {
    const offset = new Date().getTimezoneOffset();
    let yourDate: any = new Date(new Date(date).getTime() - offset * 60 * 1000);
    return yourDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  const date = useMemo(() => {
    const microseconds = parseInt(value);
    const microseconds_to_seconds = microseconds / 1000;
    return parseDate(microseconds_to_seconds);
  }, [value]);

  return <div className={`font-bold`}>{date}</div>;
};
