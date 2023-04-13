/* eslint-disable-next-line */
export interface TitleProps {
  title: string
}

export function Title({title}: TitleProps) {
  return (
    <h2 className="text-xl font-bold text-generalTextColor sm:text-2xl ">
       {title}
    </h2>
  );
}

export default Title;
