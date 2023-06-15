import { AiOutlineHome, AiOutlineOrderedList, AiOutlineUsergroupDelete, AiOutlineUser, AiOutlineVideoCamera, AiFillFileText, AiOutlineFileText } from "react-icons/ai";

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
    {
      name: "Reportes",
      link: "/admin/reports",
      icon: <AiOutlineFileText size={iconSize} />
    },

   {
      name: "Administración",
      link: "/admin/admin",
      icon: <AiOutlineUser size={iconSize} />
     
    } 
  ]
