import React from 'react';

interface Props {
  title: string;
  value: string | number;
}
function InfoCard({ title, value }: Props) {
  return (
    <div className="group flex flex-col justify-between rounded-sm bg-white p-4 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-8">
      <div>
        <h3 className="text-3xl font-bold text-primary sm:text-5xl">{value}</h3>

        <div className="mt-4 border-t-2 border-gray-100 pt-4">
          <p className="text-sm font-medium uppercase text-gray-500">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
