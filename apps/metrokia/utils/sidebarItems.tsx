import { AiOutlineHome, AiOutlineOrderedList, AiOutlineUsergroupDelete, AiOutlineUser, AiOutlineVideoCamera } from "react-icons/ai";

const iconSize = '1.3em'

export const sidebarItems = [
    {
      name: "Inicio",
      link: "/admin/landing",
      icon: <AiOutlineHome size={iconSize} />
    },
    {
      name: "Usuarios",
      link: "/admin/persons",
      icon: <AiOutlineUsergroupDelete size={iconSize} />
    },
    {
      name: "Logs",
      link: "/admin/logs",
      icon: <AiOutlineOrderedList size={iconSize} />
    },
   /* {
      name: "Administración",
      link: "/admin/admin",
      icon: <AiOutlineUser size={iconSize} />
     
    } */
  ]
