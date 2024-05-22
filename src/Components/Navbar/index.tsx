import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Grid,
    Drawer,
    List,
    ListItemIcon,
    MenuList, Avatar, Modal, Tooltip, ListItemButton,
    MenuProps,
    Popover,
    ListItem,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Setting from '@/Assets/images/settings.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
import url from '@/Api';
const drawerWidth = 200;
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

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
        router.push('/login');
        Cookies.remove('TokenLogin');
        Cookies.remove('Stamp');
    };
    const handleMenuItemClick = (child: any) => {
        // dispath(saveValue(child.title);
        router.push(`/Product?title=${encodeURIComponent(child)}`);

    };

    const [Categorys, setCategory] = React.useState<any[]>([]);


    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Category/GetAll`)
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
    const [CategoryId, setIdCategoryNames] = React.useState<any>();
    const [SubCategory, setSubCategory] = React.useState<any[]>([]);

    useEffect(() => {
        const getData = async () => {
            // https://tmfn2sna.ir/=1
            const response = await fetch(`${url}/api/Category/GetById?id=${CategoryId}`)
            const data = await response.json();
            setSubCategory(data.data)
            // setProduct(data.data);
        }
        getData()
    }, [CategoryId])

    const [anchorEl, setAnchorEl] = useState(null);
    const [openSubCategory, setOpenSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const Categoryss = [
        { id: 1, categoryName: 'Category 1', subCategories: [{ id: 11, subCategoryName: 'Subcategory 11' }, { id: 12, subCategoryName: 'Subcategory 12' }] },
        { id: 2, categoryName: 'Category 2', subCategories: [{ id: 21, subCategoryName: 'Subcategory 21' }, { id: 22, subCategoryName: 'Subcategory 22' }] },
    ];

    const handleClick = (event: any, categoryId: any) => {
        setAnchorEl(event.currentTarget);
        // setOpenSubCategory(categoryId);
        setSelectedCategory(categoryId);

    };

    // const handleClose = () => {
    //     setAnchorEl(null);
    //     // setOpenSubCategory(null);
    //     // setSelectedCategory(null);

    // };
    // const handleOpen = (event, categoryId) => {
    //     setAnchorEl(event.currentTarget);
    //     setSelectedCategory(categoryId);
    // };
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [anchorElmobile, setAnchorElmobile] = useState(false);
    const [openSubmenumobile, setOpenSubmenumobile] = useState(null);
    const [openmobile, setopenmobile] = React.useState(false)
    const [Id, setID] = React.useState();

    const handleAddFruit = (item: any) => {
        setID(item);
        setopenmobile(!openmobile);
    };

    const handleOpenMenumobile = (event: any) => {
        setAnchorElmobile(!anchorElmobile);
    };

    const handleClosemobile = () => {
        setAnchorElmobile(!anchorElmobile);
        setOpenSubmenumobile(null);
        // setopenmobile(!openmobile);
    };
    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
        setSelectedCategory(null);
        setOpenSubmenu(null);
    };

    const handleOpenSubmenu = (event: any, categoryId: any) => {
        setSelectedCategory(categoryId);
        setOpenSubmenu(categoryId);
    };





    return (
        <AppBar
            sx={{
                backgroundColor: { lg: '#F5F5F5', xs: '#1E1E1E', sm: '#1E1E1E', md: '#F5F5F5' },
                margin: 0,
                padding: 0,
                boxShadow: 0,
                position: 'static',
            }}
        >
            <Toolbar>
                <Grid item container lg={12} md={12} justifyContent="space-evenly">
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


                                    {/* <Button onClick={handleOpenMenumobile} variant="contained">
                                        Open Menus
                                    </Button> */}
                                    <MenuItem
                                        onClick={handleOpenMenumobile}
                                        sx={{
                                            cursor: 'pointer',
                                            fontFamily: 'Shabname',
                                            color: 'white.main',
                                        }}>

                                        <MenuList>محصولات</MenuList>
                                    </MenuItem>
                                    {/* Mobile Drawer for the main menu */}
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
                                        anchor="left" open={anchorElmobile} onClose={handleClosemobile}>
                                        <List >
                                            <MenuItem sx={{
                                                cursor: 'pointer',
                                                fontFamily: 'Shabname',
                                                color: 'white.main',
                                            }}>
                                                <ListItemIcon>
                                                    <Image src={logout} width={25} height={25} alt="icon" />
                                                </ListItemIcon>
                                                <MenuList onClick={handleClosemobile}>بستن</MenuList>
                                            </MenuItem>
                                            {/* <button >parsa</button> */}
                                            {Categorys.map((category) => (
                                                <>  <ListItem
                                                    key={category.id}
                                                    button
                                                    sx={{
                                                        color: 'white.main',

                                                    }}
                                                    onClick={() => handleAddFruit(category.id)}
                                                // onClick={(event) => handleOpenSubmenu(event, category.id)}
                                                >
                                                    <ListItemText primary={category.categoryName} />


                                                </ListItem>
                                                    <List sx={{ width: '100%' }}>
                                                        <CSSTransition key={category.id} in={Id === category.id && openmobile} timeout={300} classNames="fade" unmountOnExit>
                                                            <Grid item container lg={12} key={category.id}>
                                                                {category.subCategories.map((subCategory: any) => (
                                                                    <List
                                                                        onClick={() => handleMenuItemClick(subCategory.id)}
                                                                        key={subCategory.id}
                                                                        sx={{
                                                                            fontFamily: 'Shabname',
                                                                            p: 1.5,
                                                                            backgroundColor: 'white.main',
                                                                            flexDirection: 'row',
                                                                            width: '100%', // Set width to ensure items are aligned properly
                                                                        }}
                                                                    >
                                                                        {subCategory.subCategoryName}
                                                                    </List>
                                                                ))}
                                                            </Grid>

                                                            {/*<Grid item container p={2} lg={4} xs={6}*/}
                                                            {/*      justifyContent={'center'} alignItems={"center"}*/}
                                                            {/*      flexDirection={"column"}>*/}
                                                            {/*    <Mbutton onClick={() => handleOpen(item.id)} submite*/}
                                                            {/*             sx={{color: 'white.main'}}>حذف شکایت</Mbutton>*/}
                                                            {/*</Grid>*/}
                                                        </CSSTransition>
                                                    </List>
                                                </>

                                            ))}
                                        </List>



                                    </Drawer>

                                    {Cook && (
                                        <>
                                            <MenuItem onClick={handleLogout} sx={{
                                                cursor: 'pointer',
                                                fontFamily: 'Shabname',
                                                color: 'white.main',
                                            }}>

                                                <MenuList >خروج</MenuList>
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
                            {/* <Button onClick={handleOpenMenu} variant="contained">
                                Open Menu
                            </Button> */}
                            <MenuItem
                                onClick={handleOpenMenu}
                                sx={{
                                    cursor: 'pointer',
                                    fontFamily: 'Shabname',
                                    color: 'black.main',
                                }}>
                                <ListItemIcon>
                                    <Image src={Category} width={25} height={25} alt="icon" />
                                </ListItemIcon>
                                <MenuList>محصولات</MenuList>
                            </MenuItem>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 1,
                                    sx: {
                                        borderRadius: '10px',
                                        backgroundColor: 'white',
                                        width: '200px',
                                    },
                                }}
                            >
                                {Categorys?.map((category) => (
                                    <div key={category.id}>
                                        <MenuItem
                                            onClick={(event) => handleOpenSubmenu(event, category.id)}
                                            sx={{
                                                cursor: 'pointer',
                                                fontFamily: 'Shabname',
                                                color: 'black.main',
                                            }}
                                        >
                                            {category.categoryName}
                                        </MenuItem>
                                        {openSubmenu === category.id && (
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={openSubmenu === category.id}
                                                onClose={handleClose}

                                                PaperProps={{
                                                    elevation: 1,
                                                    sx: {
                                                        borderRadius: '10px',
                                                        backgroundColor: 'white',
                                                        width: '200px',
                                                    },
                                                }}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >
                                                {category.subCategories.map((subCategory: any) => (
                                                    <MenuItem
                                                        onClick={() => handleMenuItemClick(subCategory.id)}
                                                        key={subCategory.id}
                                                        sx={{ fontFamily: 'Shabname', p: 1.5 }}
                                                    >
                                                        {subCategory.subCategoryName}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        )}
                                    </div>
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
                                    <MenuItem onClick={handleLogout} sx={{
                                        cursor: 'pointer',
                                        fontFamily: 'Shabname',
                                        color: 'black.main',
                                    }}>
                                        <ListItemIcon>
                                            <Image src={logout} width={25} height={25} alt="icon" />
                                        </ListItemIcon>
                                        <MenuList >خروج</MenuList>
                                    </MenuItem>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    );
};

export default Navbars;



