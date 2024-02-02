import * as React from 'react';
import {
    Box,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Grid, Drawer, List, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import colors from "@/Assets/theme/base/colors";
import logo from '@/Assets/images/logo.png'
import {Listnav} from '@/Types/App/routes.type'
import {MenuList} from '@mui/material';
import {navList, ProfileList} from "./navList";
import {useTheme} from '@emotion/react';
import MTButton from '../Mbutton/index';
import Link from "next/link";
import LoginImages from '../../../../Assets/images/Login.png'
import LocationImages from '../../../../Assets/images/Location.png'
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';
// import url from '../../../../Api/Url';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import {styled} from "@mui/material/styles";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchImages from "../../../../Assets/images/Search.png";
import {usePathname} from "next/navigation";
import {connect, useDispatch} from 'react-redux';
import {UseDispatch} from "react-redux";
import {useRouter} from "next/router";
const urlSplit = (path: string): string => {
    const splitUrl = path.split("/");
    const newText = splitUrl[1];
    return newText;
};


const drawerWidth = 200;


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function Navbars({saveValue }:any) {

    const Cook = Cookies.get('Tokenlogin')
    const [userInfo, setUserinfo] = React.useState()

    const theme = useTheme();

    const router=useRouter()
    const handleMenuItemClick = (child:any) => {
        // dispath(saveValue(child.title);
        router.push(`/Product?title=${encodeURIComponent(child)}`);

    };

    // React.useEffect(() => {
    //     const UserInfoDetails = async () => {
    //         const config = {
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 Authorization: `Token ${Cook}`,
    //             }
    //         };
    //         const response = await fetch(`${url}/user/user_info`, config)
    //         const data = await response.json();
    //         setUserinfo(data.user)
    //     }
    //     UserInfoDetails()
    // }, [])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const opens = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloses = () => {
        setAnchorEl(null);
    };

    const LogoutUser = () => {
        Cookies.remove('Tokenlogin');
    }

    const [setOpens, setOpenss] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpenss(true);
    };

    const handleDrawerClose = () => {
        setOpenss(false);
    };
    const [isHovered, setIsHovered] = useState(false);

    const [open, setopen] = useState(false)
    const [anchorEls, setAnchorEls] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEls);
    const handleClicks = (event: React.MouseEvent<HTMLElement>) => {
        setopen(!open);
    };
    const pathname = usePathname();

    const handleClose = () => {
        setAnchorEls(null);
    };


    const [Test,SetTest]=React.useState()
    const [anchorElparsa, setAnchorElparsa] = React.useState<null | HTMLElement>(null);
    const openparsa = Boolean(anchorElparsa);
    const handleClickparsa = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElparsa(event.currentTarget);
    };
    const handleCloseparsa = () => {
        setAnchorElparsa(null);
    };



    return (
        <AppBar sx={{
            backgroundColor: '#F5F5F5', margin: 0, padding: 0, boxShadow: 0,
            // opacity: { lg: "90%", md: '90%', xs: '100%' }
            position: 'static'
        }}>
            <Toolbar>
                <Grid item container lg={12} md={12} justifyContent={"space-evenly"}>
                    {/*Responsive*/}
                    <Grid item container justifyContent={'space-between'} sx={{display: {lg: 'none', md: 'none'}}}
                          alignItems={'center'}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerOpen}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {/*<ChevronLeftIcon />*/}
                                    {/*{((theme as any).direction === 'ltr') ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </DrawerHeader>
                            <List>
                                {
                                    navList.map((item: Listnav, index) => {
                                        return (
                                            <>
                                                <Link href={item.path}>
                                                    <MenuList key={index}>
                                                        <MenuItem sx={{
                                                            borderLeft: `${urlSplit(pathname) === urlSplit(item.path) && "3px solid #FFB636"}`,
                                                            cursor: "pointer",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                        }}>{item.title}</MenuItem>
                                                    </MenuList>

                                                </Link>
                                            </>
                                        )
                                    })
                                }

                                {/*<Button*/}
                                {/*    id="fade-button"*/}
                                {/*    aria-controls={open ? 'fade-menu' : undefined}*/}
                                {/*    aria-haspopup="true"*/}
                                {/*    aria-expanded={open ? 'true' : undefined}*/}
                                {/*    onClick={handleClicks}*/}
                                {/*>*/}
                                {/*    Dashboard*/}
                                {/*</Button>*/}

                                <MenuItem onClick={handleClicks} sx={{
                                    cursor: "pointer",
                                    fontFamily: 'Yekan Bakh Medium',
                                    color: open ? 'kaarnas.yellow' : ''
                                }}>
                                    تنظیمات
                                    <IconButton onClick={handleDrawerClose}>
                                        {/*<ChevronLeftIcon />*/}
                                        {open ? <KeyboardArrowDownIcon sx={{color: 'kaarnas.yellow'}}/> :
                                            <ChevronLeftIcon sx={{color: 'red.500'}}/>}
                                        {/*<ChevronLeftIcon/>*/}
                                    </IconButton>
                                </MenuItem>

                                {ProfileList.map((item, index) => (
                                    <>
                                        <MenuItem sx={{
                                            display: open ? 'block' : 'none',
                                            p: 2,
                                            fontFamily: 'Yekan Bakh Medium',

                                        }} key={index}>
                                            {item.title}
                                        </MenuItem>

                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </>
                                ))}
                                <Grid item container lg={12} justifyContent={'center'}>
                                    {/*{Cook &&*/}
                                    {/*    <MIconButton location>*/}
                                    {/*        <img src={LocationImages} alt='icons'/>*/}
                                    {/*    </MIconButton>*/}
                                    {/*}*/}

                                    {!Cook &&
                                        <MTButton login><span style={{
                                            marginRight: '0px',
                                            fontFamily: 'Yekan Bakh Medium'
                                        }}>ورود / ثبت نام</span></MTButton>
                                    }
                                </Grid>
                            </List>
                        </Drawer>
                    </Grid>
                    {/*EndResponsive*/}

                    <Grid item container lg={5} md={5} justifyContent={"center"}>
                        <Grid item lg={12} md={12} justifyContent={"space-evenly"} alignItems={"center"}
                              sx={{textDecoration: "none", display: {xs: 'none', md: 'flex'},}}>
                            {
                                navList.map((item: Listnav, index) => {
                                    return (
                                        <>
                                            {/*<Link href={item.path} style={{display:'flex'}}>*/}
                                            <MenuList
                                                onMouseEnter={item.children ? handleClickparsa : undefined}
                                                onMouseLeave={()=>setAnchorElparsa(null)}
                                                key={item.id}>
                                                <Link href={item.path}>
                                                        <MenuItem
                                                            // onClick={handleClickparsa}
                                                            sx={{
                                                                borderBottom: `${urlSplit(pathname) === urlSplit(item.path) && "3px solid #FFB636"}`,
                                                                cursor: 'pointer',
                                                                fontFamily:'Shabname Bakh Fat',
                                                                color: 'black.main',
                                                            }}
                                                        >
                                                            <ListItemIcon sx={{}}>
                                                                {item.icon}
                                                            </ListItemIcon>
                                                            {item.title}
                                                        </MenuItem>
                                                </Link>

                                                {item.children && (
                                                    <Menu
                                                        id={`basic-menu-${item.id}`}
                                                        anchorEl={anchorElparsa}
                                                        open={Boolean(anchorElparsa)}
                                                        onClose={handleCloseparsa}
                                                        MenuListProps={{
                                                            'aria-labelledby': `basic-button-${item.id}`,
                                                        }}
                                                        PaperProps={{
                                                            elevation: 1,
                                                            sx: {
                                                                overflow: 'visible',
                                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                mt: 1.5,
                                                                '& .MuiAvatar-root': {
                                                                    width: 30,
                                                                    height: 30,
                                                                    ml: -50,
                                                                    mr: 100,
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
                                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                    >
                                                        {item.children.map((child:any) => (
                                                            // <Link href={item.path}>
                                                            <MenuItem onClick={()=>handleMenuItemClick(child.title)} key={child.id} >
                                                                {child.title}
                                                            </MenuItem>
                                                            // </Link>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </MenuList>
                                            {/*</Link>*/}
                                        </>
                                    )
                                })
                            }
                            {/*<MenuList>دستبندی</MenuList>*/}

                        </Grid>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>

    )
}

export default Navbars
// connect(null, { saveValue })(Navbars)
