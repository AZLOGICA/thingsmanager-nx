import { AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineVideoCamera } from "react-icons/ai";

const iconSize = '1.3em'

export const sidebarItems = [
    {
      name: "Inicio",
      link: "/landing",
      icon: <AiOutlineHome size={iconSize} />
    },
    {
      name: "Dispositivos",
      link: "/devices",
      icon: <AiOutlineVideoCamera size={iconSize} />
    },
    {
      name: "Administración",
      link: "/admin",
      icon: <AiOutlineUser size={iconSize} />
    }
  ]
