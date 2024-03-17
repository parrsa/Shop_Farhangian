import {ListRoute} from "@/Types/App/routes.type";
import Home from '@/Assets/images/dashboard/settings.png'
import MainPages from '@/Assets/images/MainPages.png'
import employee from '@/Assets/images/dashboard/online-shopping.png'
import distributed from '@/Assets/images/dashboard/slogan.png'
import Message from '@/Assets/images/dashboard/chat.png'
import AddNews from '@/Assets/images/dashboard/add.png'
import Users from '@/Assets/images/dashboard/group.png'
import Bill from '@/Assets/images/dashboard/bill.png'
import AdminProfiles from '@/Assets/images/dashboard/user-account.png'
import Support from '@/Assets/images/dashboard/customer-support.png'
import server from '@/Assets/images/server 2.svg'
import logout from '@/Assets/images/dashboard/system-uicons_exit-right.svg'
import Image from "next/image";


const navList: ListRoute[] = [
    {
        text: "تنظیمات سامانه",
        path: "/Settings",
        name: "Settings",
        icon: <Image alt={'icon'} src={Home} width={27} height={27}/>,
        id: 0
    },
    {
        text: " صفحه اصلی",
        path: "/Settings/PageSetting",
        name: "PageSetting",
        icon: <Image alt={'icon'} src={MainPages} width={27} height={27}/>,
        id: 1
    },
    {
        text: " محصولات",
        path: "/Settings/ProductSettings",
        name: "ProductSettings",
        icon: <Image alt={'icon'} src={employee} width={27} height={27}/>,
        id: 2
    },
    {
        text: " شعار",
        path: "/Settings/SloganSettings",
        name: "SloganSettings",
        icon: <Image alt={'icon'} src={distributed} width={27} height={27}/>,
        id: 3
    },
    {
        text: " پیامک ",
        path: "/Settings/MessageSettings",
        name: "client",
        icon: <Image alt={'icon'} src={Message} width={27} height={27}/>,
        id: 3
    },
    {
        text: "اخبار",
        path: "/Settings/NewsSettings",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={AddNews} width={27} height={27}/>,
        id: 3
    },

    {
        text: "صورتحساب کاربران",
        path: "/Settings/Bill",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={Bill} width={27} height={27}/>,
        id: 3
    },
    {
        text: "کاربران",
        path: "/Settings/Users",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={Users} width={27} height={27}/>,
        id: 3
    },
    // {
    //     text: "پروفایل ادمین",
    //     path: "/Settings/ProfileAdmin",
    //     name: "ProfileAdmin",
    //     icon: <Image alt={'icon'} src={AdminProfiles} width={27} height={27}/>,
    //     id: 3
    // },
    {
        text: "پشتیبانی",
        path: "/Settings/SupportList",
        name: "NewsSettings",
        icon: <Image alt={'icon'} src={Support} width={27} height={27}/>,
        id: 3
    },



    {
        text: "برگشت",
        path: "/",
        name: "logout",
        icon: <Image alt={'icon'} src={logout} width={27} height={27}/>,
        id: 3
    },


]

export {navList}
