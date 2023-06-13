import Link from 'next/link';

/* eslint-disable-next-line */
export interface ButtonProps {
  title: string;
  link?: string;
  size?: string;
  className?: string;
  backgroundColor?: string
  animation?: string;
  onClick?: () => void;
}
const buttonSizes: any = {
  xs: 'py-1 px-3 text-xs',
  sm: 'py-2 px-4  text-sm',
  default: 'p-3 ',
};

const buttonAnimations = ['scale', 'swapColor'];

export function Button({
  title,
  link,
  size,
  animation,
  className,
  backgroundColor,
  onClick
}: ButtonProps) {

  const _className = `flex inline-blockh-auto  rounded shadow-sm
  ${size && buttonSizes[size]}
  ${!size && buttonSizes.default}
  duration-200
  ${backgroundColor ? backgroundColor : 'bg-gradient-to-r from-buttonPrimary  to-buttonSecondary'}
  text-center items-center

  w-fit
  cursor-pointer
  text-buttonText
  ${size}
  ${animation && animation == 'scale' && 'hover:scale-105'}
  ${animation && animation == 'swapColor' && 'hover:to-buttonPrimary'}
  ${className}
 `;
  return (
    <>
      {link ? (
        <Link className={_className} href={link}>
          <ButtonSpan title={title} />
        </Link>
      ) : (
        <div 
        className={_className}
        onClick={onClick}
        >
          <ButtonSpan title={title} />
        </div>
      )}
    </>
  );
}

function ButtonSpan({ title }: { title: string }) {
  return <span className="block rounded-sm  font-medium    !text-buttonText">{title}</span>;
}

export default Button;
