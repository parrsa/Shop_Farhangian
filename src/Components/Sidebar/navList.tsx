import {ListRoute} from "@/Types/App/routes.type";
import Home from '@/Assets/images/dashboard/settings (1) 1.svg'
import employee from '@/Assets/images/dashboard/side-menu 1.svg'
import distributed from '@/Assets/images/dashboard/edit 1.svg'
import management from '@/Assets/images/dashboard/chat 1.svg'
import pages from '@/Assets/images/dashboard/announcement 1.svg'
import server from '@/Assets/images/server 2.svg'
import logout from '@/Assets/images/dashboard/system-uicons_exit-right.svg'
import Image from "next/image";

const navList: ListRoute[] = [
    {
        text: "صفحه اصلی",
        path: "/Settings",
        name: "home",
        icon: <Image alt={'icon'} src={Home} width={25} height={25}/>,
        id: 0
    },
    {
        text: "تنظیمات صفحه ها",
        path: "/PageSetting",
        name: "home",
        icon: <Image alt={'icon'} src={Home} width={25} height={25}/>,
        id: 1
    },
    {
        text: "تنظیمات ساید بار",
        path: "/users",
        name: "users",
        icon: <Image alt={'icon'} src={employee} width={25} height={25}/>,
        id: 2
    },
    {
        text: "تنظیمات شعار",
        path: "/SloganSettings",
        name: "connection",
        icon: <Image alt={'icon'} src={distributed} width={25} height={25}/>,
        id: 3
    },
    {
        text: " تنظیمات پیامک ",
        path: "/MessageSettings",
        name: "client",
        icon: <Image alt={'icon'} src={management} width={25} height={25}/>,
        id: 3
    },
    {
        text: "تنظیمات اخبار",
        path: "/createpage",
        name: "createpage",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
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
