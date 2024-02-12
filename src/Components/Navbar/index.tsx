import React, { useState } from 'react';
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
    MenuList,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
import Vaziat from '@/Assets/images/fluent_money-calculator-20-regular.webp';

const drawerWidth = 200;

const Navbars = ({ saveValue }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [setOpens, setOpenss] = useState(false);
    const [anchorEls, setAnchorEls] = useState<null | HTMLElement>(null);
    const Cook = Cookies.get('TokenLogin');

    const handleDrawerOpen = () => {
        setOpenss(true);
    };

    const handleDrawerClose = () => {
        setOpenss(false);
    };

    const handleLogout = () => {
        Cookies.remove('TokenLogin');
        router.push('/login');
    };

    return (
        <AppBar
            sx={{
                backgroundColor: '#F5F5F5',
                margin: 0,
                padding: 0,
                boxShadow: 0,
                position: 'static',
            }}
        >
            <Toolbar>
                <Grid item container lg={12} md={12} justifyContent="space-evenly">
                    <Grid item container justifyContent="space-between" sx={{ display: { lg: 'none', md: 'none' } }} alignItems="center">
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
                            open={setOpens}
                        >
                            <div>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <List>
                                {navList.map((item: Listnav, index) => (
                                    <Link href={item.path} key={index}>
                                        <MenuList>
                                            <MenuItem sx={{
                                                borderLeft: `${pathname === item.path && '3px solid #FFB636'}`,
                                                cursor: 'pointer',
                                                fontFamily: 'Yekan Bakh Medium',
                                            }}>
                                                {item.title}
                                            </MenuItem>
                                        </MenuList>
                                    </Link>
                                ))}
                                <MenuItem onClick={handleDrawerClose} sx={{
                                    cursor: 'pointer',
                                    fontFamily: 'Yekan Bakh Medium',
                                    color: open ? colors.yellow : ''
                                }}>
                                    Settings
                                    <IconButton onClick={handleDrawerClose}>
                                        {open ? <KeyboardArrowDownIcon sx={{ color: colors.yellow }} /> : <ChevronLeftIcon sx={{ color: 'red.500' }} />}
                                    </IconButton>
                                </MenuItem>
                                {ProfileList.map((item, index) => (
                                    <MenuItem sx={{
                                        display: open ? 'block' : 'none',
                                        p: 2,
                                        fontFamily: 'Yekan Bakh Medium',
                                    }} key={index}>
                                        {item.title}
                                    </MenuItem>
                                ))}
                                <Grid item container lg={12} justifyContent="center">
                                    {!Cook &&
                                        <MTButton login>
                                            {/* <span style={{ marginRight: '0px', fontFamily: 'Yekan Bakh Medium' }}>ورود / ثبت نام</span> */}
                                        </MTButton>
                                    }
                                </Grid>
                            </List>
                        </Drawer>
                    </Grid>
                    <Grid item container lg={5} md={5} justifyContent="center">
                        <Grid item lg={12} md={12} justifyContent="space-evenly" alignItems="center" sx={{ textDecoration: 'none', display: { xs: 'none', md: 'flex' } }}>
                            {navList.map((item: Listnav, index) => (
                                <Link href={item.path} style={{ display: 'flex' }} key={index}>
                                    <MenuList>
                                        <MenuItem sx={{
                                            borderBottom: `${pathname === item.path && '3px solid #FFB636'}`,
                                            cursor: 'pointer',
                                            fontFamily: 'Shabname',
                                            color: 'black.main',
                                        }}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            {item.title}
                                        </MenuItem>
                                    </MenuList>
                                </Link>
                            ))}
                            {Cook &&
                                <>
                                    <MenuItem sx={{
                                        cursor: 'pointer',
                                        fontFamily: 'Shabname',
                                        color: 'black.main',
                                    }}>
                                        <ListItemIcon>
                                            <Image src={Vaziat} width={25} height={25} alt="icon" />
                                        </ListItemIcon>
                                        <MenuList>وضعیت حساب</MenuList>
                                    </MenuItem>
                                    <MenuItem sx={{
                                        cursor: 'pointer',
                                        fontFamily: 'Shabname',
                                        color: 'black.main',
                                    }}>
                                        <ListItemIcon>
                                            <Image src={Vaziat} width={25} height={25} alt="icon" />
                                        </ListItemIcon>
                                        <MenuList onClick={handleLogout}>خروج</MenuList>
                                    </MenuItem>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbars;
