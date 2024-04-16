import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Grid,
    Drawer,
    List,
    ListItemIcon,
    MenuList, Avatar, Modal, Tooltip, ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Setting from '@/Assets/images/settings.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useTheme } from '@emotion/react';
import Cookies from 'js-cookie';
import { Listnav } from '@/Types/App/routes.type';
import { navList, ProfileList } from './navList';
import MTButton from '../Mbutton/index';
import Link from 'next/link';
import colors from '@/Assets/theme/base/colors';
import logo from '@/Assets/images/logo.png';
import Bill from '@/Assets/images/dashboard/bill.png';
import logout from '@/Assets/images/dashboard/system-uicons_exit-right.svg'
import Profiles from '@/Assets/images/iconamoon_profile-thin.webp'
import Category from '@/Assets/images/list.png'
import { Box } from 'devextreme-react';
import MInput from '../Minput';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 200;

const Navbars = ({ saveValue }: any) => {


    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [setOpens, setOpenss] = useState(false);
    const [anchorEls, setAnchorEls] = useState<null | HTMLElement>(null);
    const Cook = Cookies.get('TokenLogin');
    const CookStamp = Cookies.get('Stamp');
    const [Test, SetTest] = React.useState()
    const [anchorElparsa, setAnchorElparsa] = React.useState<null | HTMLElement>(null);
    const openparsa = Boolean(anchorElparsa);

    const handleClickparsa = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElparsa(event.currentTarget);
    };
    const handleCloseparsa = () => {
        setAnchorElparsa(null);
    };

    // const handleDrawerOpen = () => {
    //     setOpenss(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpenss(false);
    // };
    const [isOpen, setIsOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        window.addEventListener('click', () => { setIsOpen(!isOpen) })
    };

    const handleDrawerClose = () => {
        setIsOpen(!isOpen);
    };

    if (isOpen) {
        window.addEventListener('click', handleDrawerClose)
    }

    const handleLogout = () => {
        Cookies.remove('TokenLogin');
        Cookies.remove('Stamp');
        router.push('/login');
    };
    const handleMenuItemClick = (child: any) => {
        // dispath(saveValue(child.title);
        router.push(`/Product?title=${encodeURIComponent(child)}`);

    };

    const [Categorys, setCategory] = React.useState<any[]>([]);


    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/Category/GetAll')
            const data = await response.json();
            setCategory(data.data);
        }
        getData()
    }, []);

    const [inputValue, setInputValue] = React.useState('');

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            router.push(`/Search?title=${encodeURIComponent(inputValue)}`);
        }
    };

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };
    return (
        <AppBar
            sx={{
                backgroundColor: {lg:'#F5F5F5' , xs:'#1E1E1E' , sm:'#1E1E1E' , md:'#F5F5F5'},
                margin: 0,
                padding: 0,
                boxShadow: 0,
                position: 'static',
            }}
        >
            <Toolbar>
                <Grid item container  lg={12} md={12} justifyContent="space-evenly">
                    <Grid item container justifyContent={'space-between'} sx={{ display: { lg: 'none', md: 'none' } }} p={1} alignItems={'center'} >

                        <Grid item container xs={1} sm={1} justifyContent={'end'}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                sx={{
                                    backgroundColor: '#1E1E1E',
                                    width: drawerWidth,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        backgroundColor: '#1E1E1E',
                                        width: drawerWidth,
                                        boxSizing: 'border-box',
                                    },
                                }}
                                variant="persistent"
                                anchor="left"
                                open={isOpen}
                            >

                                <List>
                                    <React.Fragment>
                                        {navList.map((item: Listnav, index) => (
                                            <React.Fragment key={index}>
                                                <Link href={item.path}>
                                                    <MenuList onClick={() => {
                                                        // navigate(item.path)
                                                        setIsOpen(false)
                                                    }}>
                                                        <MenuItem sx={{
                                                            cursor: "pointer",
                                                            color: 'white.main',
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            // color: `${urlSplit(pathname) === urlSplit(item.path) ? colors.kaarnas.yellow : 'white.main'}`
                                                        }}>
                                                            {item.title}
                                                        </MenuItem>
                                                    </MenuList>
                                                </Link>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>

                                    {CookStamp === 'Admin' &&
                                        <>
                                            <Link href={'/Settings'}>
                                                <MenuItem sx={{
                                                    cursor: 'pointer',
                                                    fontFamily: 'Shabname',
                                                    color: 'white.main',
                                                }}>

                                                    <MenuList>تنظیمات</MenuList>
                                                </MenuItem>
                                            </Link>
                                        </>
                                    }


                                    {(Cook && CookStamp !== 'Admin') &&
                                        <>
                                            {/*<MenuItem sx={{*/}
                                            {/*    cursor: 'pointer',*/}
                                            {/*    fontFamily: 'Shabname',*/}
                                            {/*    color: 'black.main',*/}
                                            {/*}}>*/}
                                            {/*    <ListItemIcon>*/}
                                            {/*        <Image src={Bill} width={25} height={25} alt="icon" />*/}
                                            {/*    </ListItemIcon>*/}
                                            {/*    <MenuList>وضعیت حساب</MenuList>*/}
                                            {/*</MenuItem>*/}
                                            <Link href={'/Profile'}>
                                                <MenuItem sx={{
                                                    cursor: 'pointer',
                                                    fontFamily: 'Shabname',
                                                    color: 'white.main',
                                                }}>

                                                    <MenuList>
                                                        حساب کاربری
                                                    </MenuList>
                                                </MenuItem>
                                            </Link>
                                            {/*<Link href={'/Support'}>*/}
                                            {/*    <MenuItem sx={{*/}
                                            {/*        cursor: 'pointer',*/}
                                            {/*        fontFamily: 'Shabname',*/}
                                            {/*        color: 'black.main',*/}
                                            {/*    }}>*/}
                                            {/*        <ListItemIcon>*/}
                                            {/*            <Image src={Profiles} width={25} height={25} alt="icon" />*/}
                                            {/*        </ListItemIcon>*/}
                                            {/*        <MenuList>*/}
                                            {/*            پشتیبانی*/}
                                            {/*        </MenuList>*/}
                                            {/*    </MenuItem>*/}
                                            {/*</Link>*/}
                                        </>
                                    }

                                    {Cook && (
                                        <>
                                            <MenuItem sx={{
                                                cursor: 'pointer',
                                                fontFamily: 'Shabname',
                                                color: 'white.main',
                                            }}>

                                                <MenuList onClick={handleLogout}>خروج</MenuList>
                                            </MenuItem>
                                        </>
                                    )}
                                </List>
                            </Drawer>

                        </Grid>
                        <Grid item container xs={10} sm={10} justifyContent={'center'} >



                            <MInput
                                placeHolder={'p'}
                                value={inputValue}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                sx={{
                                    width: '95%', outline: 'none',
                                    backgroundColor: 'white.main',
                                    borderRadius: 2,
                                    height: '3rem',
                                    "& .MuiFormHelperText-root": {
                                        fontFamily: 'Yekan Bakh Medium',
                                        color: colors.red[500] + "!important",
                                    },
                                    "& .MuiInputLabel-root": {
                                        background: colors.white.main + "!important",
                                        color: colors.black.main + "!important"
                                    },
                                    // height: '55px'
                                }} search id="outlined-basic" label="جست و جو . . ." variant="outlined" />

                        </Grid>
                        <Grid item container xs={1} justifyContent={'start'}>
                            {!Cook &&
                                <IconButton sx={{ borderRadius: 0 }} aria-label="fingerprint" color="secondary">
                                    <Link href={'/login'}>
                                        <Avatar sx={{ width: 40, height: 32, backgroundColor: 'kaarnas.main', borderRadius: 1, border: '1px solid black' }}>
                                            <LoginIcon />
                                        </Avatar>
                                    </Link>
                                </IconButton>
                            }
                        </Grid>

                    </Grid>


                    <Grid item container lg={8} md={5} justifyContent="center">
                        <Grid item lg={12} md={12} justifyContent="space-evenly" alignItems="center" sx={{ textDecoration: 'none', display: { xs: 'none', md: 'flex' } }}>
                            {
                                navList.map((item: Listnav, index) => {
                                    return (
                                        <>
                                            <Link href={item.path} key={index} style={{ display: 'flex' }}>
                                                <MenuList
                                                    // onMouseEnter={item.children ? handleClickparsa : undefined}
                                                    // onMouseLeave={()=>setAnchorElparsa(null)}
                                                    key={index}>
                                                    {/*<Link href={item.path}>*/}
                                                    <MenuItem
                                                        key={index}
                                                        sx={{
                                                            borderBottom: `${pathname === item.path && '3px solid #FFB636'}`,
                                                            cursor: 'pointer',
                                                            fontFamily: 'Shabname',
                                                            color: 'black.main',
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{}}>
                                                            {item.icon}
                                                        </ListItemIcon>
                                                        {item.title}
                                                    </MenuItem>
                                                    {/*</Link>*/}

                                                    {/*{item.children && (*/}
                                                    {/*    <Menu*/}
                                                    {/*        id={`basic-menu-${item.id}`}*/}
                                                    {/*        anchorEl={anchorElparsa}*/}
                                                    {/*        open={Boolean(anchorElparsa)}*/}
                                                    {/*        onClose={handleCloseparsa}*/}
                                                    {/*        MenuListProps={{*/}
                                                    {/*            'aria-labelledby': `basic-button-${item.id}`,*/}
                                                    {/*        }}*/}
                                                    {/*        PaperProps={{*/}
                                                    {/*            elevation: 1,*/}
                                                    {/*            sx: {*/}
                                                    {/*                overflow: 'visible',*/}
                                                    {/*                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',*/}
                                                    {/*                mt: 1.5,*/}
                                                    {/*                '& .MuiAvatar-root': {*/}
                                                    {/*                    width: 30,*/}
                                                    {/*                    height: 30,*/}
                                                    {/*                    ml: -50,*/}
                                                    {/*                    mr: 100,*/}
                                                    {/*                },*/}
                                                    {/*                '&::before': {*/}
                                                    {/*                    content: '""',*/}
                                                    {/*                    display: 'block',*/}
                                                    {/*                    position: 'absolute',*/}
                                                    {/*                    top: 0,*/}
                                                    {/*                    right: 50,*/}
                                                    {/*                    width: 10,*/}
                                                    {/*                    height: 10,*/}
                                                    {/*                    bgcolor: 'background.paper',*/}
                                                    {/*                    transform: 'translateY(-50%) rotate(45deg)',*/}
                                                    {/*                    zIndex: 0,*/}
                                                    {/*                },*/}
                                                    {/*            },*/}
                                                    {/*        }}*/}
                                                    {/*        transformOrigin={{ horizontal: 'right', vertical: 'top' }}*/}
                                                    {/*        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}*/}
                                                    {/*    >*/}
                                                    {/*        {item.children.map((child:any) => (*/}
                                                    {/*            // <Link href={item.path}>*/}
                                                    {/*            <MenuItem sx={{fontFamily:'Shabname'}} onClick={()=>handleMenuItemClick(child.title)} key={child.id} >*/}
                                                    {/*                {child.title}*/}
                                                    {/*            </MenuItem>*/}
                                                    {/*             // </Link>*/}
                                                    {/*        ))}*/}
                                                    {/*    </Menu>*/}
                                                    {/*)}*/}
                                                </MenuList>
                                            </Link>
                                        </>
                                    )
                                })
                            }
                            <MenuItem
                                onClick={(e: any) => handleClickparsa(e)}
                                sx={{
                                    cursor: 'pointer',
                                    fontFamily: 'Shabname',
                                    color: 'black.main',
                                }}>
                                <ListItemIcon>
                                    <Image src={Category} width={25} height={25} alt="icon" />
                                </ListItemIcon>
                                <MenuList>
                                    محصولات
                                </MenuList>
                            </MenuItem>

                            <Menu
                                // id={`basic-menu-${item.id}`}
                                anchorEl={anchorElparsa}
                                open={Boolean(anchorElparsa)}
                                onClose={handleCloseparsa}
                                MenuListProps={{
                                    // 'aria-labelledby': `basic-button-${item.id}`,
                                }}
                                PaperProps={{
                                    elevation: 1,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 50,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                            >
                                {Categorys?.map((item, index) => (
                                    <MenuItem key={item.id} onClick={() => handleMenuItemClick(item.id)} sx={{ fontFamily: 'Shabname', p: 1.5 }}  >
                                        {item.categoryName}
                                    </MenuItem>
                                ))}


                            </Menu>
                            {CookStamp === 'Admin' &&
                                <>
                                    <Link href={'/Settings'}>
                                        <MenuItem sx={{
                                            cursor: 'pointer',
                                            fontFamily: 'Shabname',
                                            color: 'black.main',
                                        }}>
                                            <ListItemIcon>
                                                <Image src={Setting} width={25} height={25} alt="icon" />
                                            </ListItemIcon>
                                            <MenuList>تنظیمات</MenuList>
                                        </MenuItem>
                                    </Link>
                                </>
                            }

                            {(Cook && CookStamp !== 'Admin') &&
                                <>
                                    {/*<MenuItem sx={{*/}
                                    {/*    cursor: 'pointer',*/}
                                    {/*    fontFamily: 'Shabname',*/}
                                    {/*    color: 'black.main',*/}
                                    {/*}}>*/}
                                    {/*    <ListItemIcon>*/}
                                    {/*        <Image src={Bill} width={25} height={25} alt="icon" />*/}
                                    {/*    </ListItemIcon>*/}
                                    {/*    <MenuList>وضعیت حساب</MenuList>*/}
                                    {/*</MenuItem>*/}
                                    <Link href={'/Profile'}>
                                        <MenuItem sx={{
                                            cursor: 'pointer',
                                            fontFamily: 'Shabname',
                                            color: 'black.main',
                                        }}>
                                            <ListItemIcon>
                                                <Image src={Profiles} width={25} height={25} alt="icon" />
                                            </ListItemIcon>
                                            <MenuList>
                                                حساب کاربری
                                            </MenuList>
                                        </MenuItem>
                                    </Link>
                                    {/*<Link href={'/Support'}>*/}
                                    {/*    <MenuItem sx={{*/}
                                    {/*        cursor: 'pointer',*/}
                                    {/*        fontFamily: 'Shabname',*/}
                                    {/*        color: 'black.main',*/}
                                    {/*    }}>*/}
                                    {/*        <ListItemIcon>*/}
                                    {/*            <Image src={Profiles} width={25} height={25} alt="icon" />*/}
                                    {/*        </ListItemIcon>*/}
                                    {/*        <MenuList>*/}
                                    {/*            پشتیبانی*/}
                                    {/*        </MenuList>*/}
                                    {/*    </MenuItem>*/}
                                    {/*</Link>*/}
                                </>
                            }

                            {Cook && (
                                <>
                                    <MenuItem sx={{
                                        cursor: 'pointer',
                                        fontFamily: 'Shabname',
                                        color: 'black.main',
                                    }}>
                                        <ListItemIcon>
                                            <Image src={logout} width={25} height={25} alt="icon" />
                                        </ListItemIcon>
                                        <MenuList onClick={handleLogout}>خروج</MenuList>
                                    </MenuItem>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbars;



