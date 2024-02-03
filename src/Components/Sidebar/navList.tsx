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
        text: "تنظیمات سامانه",
        path: "/Settings",
        name: "Settings",
        icon: <Image alt={'icon'} src={Home} width={25} height={25}/>,
        id: 0
    },
    {
        text: " صفحه اصلی",
        path: "/Settings/PageSetting",
        name: "PageSetting",
        icon: <Image alt={'icon'} src={Home} width={25} height={25}/>,
        id: 1
    },
    {
        text: " محصولات",
        path: "/Settings/ProductSettings",
        name: "ProductSettings",
        icon: <Image alt={'icon'} src={employee} width={25} height={25}/>,
        id: 2
    },
    {
        text: " شعار",
        path: "/Settings/SloganSettings",
        name: "SloganSettings",
        icon: <Image alt={'icon'} src={distributed} width={25} height={25}/>,
        id: 3
    },
    {
        text: " پیامک ",
        path: "/Settings/MessageSettings",
        name: "client",
        icon: <Image alt={'icon'} src={management} width={25} height={25}/>,
        id: 3
    },
    {
        text: "اخبار",
        path: "/Settings/NewsSettings",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
        id: 3
    },
    {
        text: "کاربران",
        path: "/Settings/Users",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
        id: 3
    },
    {
        text: "صورتحساب کاربران",
        path: "/Settings/a",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
        id: 3
    },
    {
        text: "پروفایل ادمین",
        path: "/Settings/log",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={pages} width={25} height={25}/>,
        id: 3
    },

    {
        text: "برگشت",
        path: "/",
        name: "logout",
        icon: <Image alt={'icon'} src={logout} width={25} height={25}/>,
        id: 3
    },


]

export {navList}
