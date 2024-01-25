import {ListRoute} from "@/Types/App/routes.type";
import Home from '@/Assets/images/Vector.svg'
import employee from '@/Assets/images/employee 1.svg'
import distributed from '@/Assets/images/distributed 1.svg'
import management from '@/Assets/images/management 1.svg'
import pages from '@/Assets/images/page 1.svg'
import server from '@/Assets/images/server 2.svg'
import logout from '@/Assets/images/exit (1) 1.svg'
import Image from "next/image";

const navList: ListRoute[] = [
    {
        text: "صفحه اصلی",
        path: "/Homeshome",
        name: "home",
        icon: <Image alt={'icon'} src={Home} width={25} height={25}/>,
        id: 1
    },
    {
        text: "کاربران",
        path: "/users",
        name: "users",
        icon: <Image alt={'icon'} src={employee} width={25} height={25}/>,
        id: 2
    },
    {
        text: "connection",
        path: "/connection",
        name: "connection",
        icon: <Image alt={'icon'} src={distributed} width={25} height={25}/>,
        id: 3
    },
    {
        text: "client",
        path: "/client",
        name: "client",
        icon: <Image alt={'icon'} src={management} width={25} height={25}/>,
        id: 3
    },
    {
        text: "ساخت صفحه",
        path: "/createpage",
        name: "createpage",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
        id: 3
    },
    {
        text: "تنظیمات سرور",
        path: "/settings-server",
        name: "settings-server",
        icon: <Image alt={'icon'} src={server} width={25} height={25}/>,
        id: 3
    },

    {
        text: "خروج",
        path: "/",
        name: "logout",
        icon: <Image alt={'icon'} src={logout} width={25} height={25}/>,
        id: 3
    },


]

export {navList}
