import Link from "next/link";

/* eslint-disable-next-line */
export interface LandingCardProps {
  title: string;
  description: string;
  link: string;
 }

export function LandingCard({title, description,link}: LandingCardProps) {
  return (
    <div
      className="rounded-2xl bg-gradient-to-r from-gradientPrimary  to-gradientSecondary p-1 shadow-xl"
    >
      <Link className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 h-full" href={link}>
        <div className="mt-16">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default LandingCard;
