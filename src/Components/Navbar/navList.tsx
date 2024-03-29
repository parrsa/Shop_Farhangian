import {Listnav} from "@/Types/App/routes.type";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import Settings from '@mui/icons-material/Settings';
import Home from '@/Assets/images/home.png'
import Vaziat from '@/Assets/images/fluent_money-calculator-20-regular.webp'
import Setting from '@/Assets/images/settings.png'
import Call from '@/Assets/images/fluent_call-20-regular.svg'
import Profiles from '@/Assets/images/iconamoon_profile-thin.webp'
import Messages from '@/Assets/images/messages.png'
import Chart from '@/Assets/images/flow-chart.png'
import Category from '@/Assets/images/list.png'
import Image from "next/image";
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Cookies from "js-cookie";
import Support from '@/Assets/images/dashboard/customer-support.png'

const CookStamp = Cookies.get('Stamp');
const navList: Listnav[] = [
    {
        title: "صفحه اصلی",
        path: '/',
        icon: <Image alt={'icon'}  src={Home} width={25} height={25} />,
        id: 1,
    },
    // {
    //     title: "دسته بندی محصولات",
    //     path: '/management-panel',
    //     icon:
    //         <Image alt={'icon'} src={Category} width={25} height={25}/>
    //     ,
    //     id: 2,
    //     children: [
    //         {
    //             title: "مواد غذایی",
    //             path: '/Product',
    //             icon: <Image alt={'icon'} src={Category} width={20} height={20}/>,
    //             id: 21,
    //         },
    //         {
    //             title: "مواد شوینده",
    //             path: '/Product',
    //             icon: <Image alt={'icon'} src={Category} width={20} height={20}/>,
    //             id: 22,
    //         },
    //         {
    //             title: "لوازم خوانگی",
    //             path: '/Product',
    //             icon: <Image alt={'icon'} src={Category} width={20} height={20}/>,
    //             id: 22,
    //         },
    //         // Add more children as needed
    //     ],
    // },

    {
        title: "ارتباط با ما",
        path: '/Support',
        icon: <Image alt={'icon'} src={Support} width={25} height={25}/>,
        id: 3,
    },


    // {
    //     title: "تنظیمات",
    //     path: '/Settings',
    //     icon:
    //         <Image alt={'icon'} src={Setting} width={25} height={25}/>
    //     ,
    //     id: 4,
    // },
    // {
    //     title: "تماس با ما",
    //     path: '/aboute',
    //     icon: <Image alt={'icon'} src={Call} width={25} height={25}/>,
    //     id: 5,
    // },
    // {
    //     title: "حساب کاربری",
    //     path: '/Profile',
    //     icon: <Image alt={'icon'} src={Profiles} width={25} height={25}/>,
    //     id: 6,
    // },

    {
        title: "اخبار",
        path: '/News',
        icon: <Image alt={'icon'} src={Messages} width={25} height={25}/>,
        id: 7,
    },
    {
        title: "چارت سازمانی ",
        path: '/Chart',
        icon: <Image alt={'icon'} src={Chart} width={25} height={25}/>,
        id: 8,
    },



]
const ProfileList: Listnav[] = [
    {
        title: "پروفایل",
        path: '/Profile',
        id: 1,
        icon: <PersonOutlineIcon sx={{color:'kaarnas.main'}} fontSize="small" />,
    },
    {
        title: "تنظیمات",
        path: '/settings',
        id: 2,
        icon: <Settings sx={{color:'kaarnas.main'}} fontSize="small" />,
    },

    {
        title: "شکایت ثبت شده",
        path: '/HistoryShekayet',
        id: 3,
        icon: <HistoryIcon sx={{color:'kaarnas.main'}} fontSize="small"/>,
    },
    {
        title: "پشتیبانی",
        path: '/Support',
        id: 4,
        icon: <HelpOutlineIcon sx={{color:'kaarnas.main'}} fontSize="small"/>,
    },
    // {
    //     title: "خروج",
    //     path: '/',
    //     id: 1,
    //     icon: <Logout />,
    // },

];
export {navList, ProfileList}


// import * as React from 'react';
// import Image from 'next/image';
// import { Listnav } from '@/Types/App/routes.type';
// import Category from '@/Assets/images/categorys.svg';
// import Messages from '@/Assets/images/messages 1.webp';
// import Chart from '@/Assets/images/organization-chart (1) 1.webp';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import HistoryIcon from '@mui/icons-material/History';
// import Settings from '@mui/icons-material/Settings';
// import HomeIcon from '@mui/icons-material/Home';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
//
// const navList: Listnav[] = [
//     {
//         title: "صفحه اصلی",
//         path: '/',
//         icon: <HomeOutlinedIcon fontSize="medium" />,
//         id: 1,
//     },
//     {
//         title: "دسته بندی محصولات",
//         path: '/management-panel',
//         icon: <Image alt={'icon'} src={Category} width={25} height={25} />,
//         id: 2,
//         children: [
//             {
//                 title: "مواد غذایی",
//                 path: '/Product',
//                 icon: <Image alt={'icon'} src={Category} width={20} height={20} />,
//                 id: 21,
//             },
//             {
//                 title: "مواد شوینده",
//                 path: '/Product',
//                 icon: <Image alt={'icon'} src={Category} width={20} height={20} />,
//                 id: 22,
//             },
//             {
//                 title: "لوازم خوانگی",
//                 path: '/Product',
//                 icon: <Image alt={'icon'} src={Category} width={20} height={20} />,
//                 id: 22,
//             },
//             // Add more children as needed
//         ],
//     },
//     {
//         title: "اخبار",
//         path: '/News',
//         icon: <Image alt={'icon'} src={Messages} width={25} height={25} />,
//         id: 7,
//     },
//     {
//         title: "چارت سازمانی ",
//         path: '/Chart',
//         icon: <Image alt={'icon'} src={Chart} width={25} height={25} />,
//         id: 8,
//     },
// ];
//
// const ProfileList: Listnav[] = [
//     {
//         title: "پروفایل",
//         path: '/Profile',
//         id: 1,
//         icon: <PersonOutlineIcon sx={{ color: 'kaarnas.main' }} fontSize="small" />,
//     },
//     {
//         title: "تنظیمات",
//         path: '/settings',
//         id: 2,
//         icon: <Settings sx={{ color: 'kaarnas.main' }} fontSize="small" />,
//     },
//     {
//         title: "شکایت ثبت شده",
//         path: '/HistoryShekayet',
//         id: 3,
//         icon: <HistoryIcon sx={{ color: 'kaarnas.main' }} fontSize="small" />,
//     },
//     {
//         title: "پشتیبانی",
//         path: '/Support',
//         id: 4,
//         icon: <HelpOutlineIcon sx={{ color: 'kaarnas.main' }} fontSize="small" />,
//     },
// ];
//
// export { navList, ProfileList };
