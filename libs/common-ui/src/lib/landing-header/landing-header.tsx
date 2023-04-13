/* eslint-disable-next-line */
export interface LandingHeaderProps {
  title: string;
  description: string
}

export function LandingHeader({title, description}: LandingHeaderProps) {
  return (
    <header  className="">
    <div className="mb-10">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1.5 text-sm text-gray-500">
      {description}
      </p>
    </div>
    </header>
  );
}

export default LandingHeader;
