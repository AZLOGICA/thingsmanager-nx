import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation';

/* eslint-disable-next-line */
export interface SidebarProps {
  sidebarItems: any
}

import { AiFillSetting } from "react-icons/ai";

const iconSize = '1.3em'


export function Sidebar({sidebarItems}: SidebarProps) {

  const pathname = usePathname();
  
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-r bg-sidebarPrimary">
    <div>
      
      <div className="border-t border-gray-100">
        <nav aria-label="Main Nav" className="flex flex-col p-2">
          <div className="py-4">

          </div>
  
          <ul className="space-y-1 border-t border-gray-100 pt-4">
            <li>
              {
                sidebarItems.map((item: any) => (
                  <SidebarItem
                    active={item.link === pathname}
                    link={item.link}
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                  />
                ))
              }
             
            </li>
          </ul>
        </nav>
      </div>
    </div>
  
    <div className="sticky inset-x-0 bottom-0 border-t border-sidebarSecondary/30  p-2">
      <form action="/logout">
        <SidebarItem
         active={'/settings' === pathname}
          link={'/settings'}
          icon={<AiFillSetting size={iconSize} />}
          name='Configuración'
        />
       
      </form>
    </div>
  </div>
  );
}

export default Sidebar;
