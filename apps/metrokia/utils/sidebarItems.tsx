import { AiOutlineHome, AiOutlineUsergroupDelete, AiOutlineUser, AiOutlineVideoCamera } from "react-icons/ai";

const iconSize = '1.3em'

export const sidebarItems = [
    {
      name: "Inicio",
      link: "/landing",
      icon: <AiOutlineHome size={iconSize} />
    },
    {
      name: "Usuarios",
      link: "/users",
      icon: <AiOutlineUsergroupDelete size={iconSize} />
    },
    {
      name: "Administración",
      link: "/admin",
      icon: <AiOutlineUser size={iconSize} />
    }
  ]
