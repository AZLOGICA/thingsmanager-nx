import Link from "next/link";

/* eslint-disable-next-line */
export interface ButtonProps {
  title: string
  link: string
  size?: string
  className?: string;
  animation?: string;
}
const buttonSizes: any = {
  xs: 'py-1 px-3 text-xs',
  sm: 'py-2 px-4  text-sm',
  default: 'p-3 '
}

const buttonAnimations = [ 'scale', 'swapColor']
export function Button({ title, link, size, animation, className }: ButtonProps) {
  return (
    <>
      {
        link ?
          <Link
            className={`flex inline-blockh-auto  rounded shadow-sm
            ${size && buttonSizes[size]}
            ${!size && buttonSizes.default}
            duration-200
            bg-gradient-to-r from-buttonPrimary  to-buttonSecondary  text-center items-center
            text-buttonText
            w-fit
            ${size}
            ${animation && animation == 'scale' && 'hover:scale-105'}
            ${animation && animation == 'swapColor' && 'hover:to-buttonPrimary'}
            ${className}
           `}
            href={link}
          >
            <ButtonSpan title={title} />
          </Link>
          : <div>
            <ButtonSpan title={title} />
          </div>
      }

    </>
  );
}

function ButtonSpan({ title }: { title: string }) {
  return (
    <span
      className="block rounded-sm  font-medium "
    >
      {title}
    </span>
  )
}

export default Button;
