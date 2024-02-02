import * as React from 'react';
import {useContext} from 'react'
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Grid} from "@mui/material";
import {usePathname} from 'next/navigation'
import colors from "@/Assets/theme/base/colors";
import {navList} from './navList'
import Link from "next/link";
import Image from "next/image";
import MBox from "@/Components/MBox";
import Vector from "@/Assets/images/Vector (1).svg";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const urlSplit = (path: string): string => {
    const splitUrl = path.split("/") ??" " ;
    const newText = splitUrl[1];
    return newText;
};
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexShrink: 1,
        display: 'flex',

        '& .MuiDrawer-paper': {
            backgroundColor: colors.red[500]
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme), background: 'red.500'
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar() {
    const theme = useTheme();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Drawer
                onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}
                PaperProps={{
                    elevation: 10,
                    sx: {
                        '&:hover': {
                            cursor: 'pointer',
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        },
                        display: 'flex',
                        alignItems: 'start',
                        // borderRadius: '0 1rem 1rem 0rem ',
                        color: "rgba(225,249,27,1)",
                        backgroundColor: "#fff",
                        zIndex: 1
                    }
                }} variant="permanent" open={open}>
                <Grid item container  height={100} justifyContent={'center'} flexDirection={'column'}  alignItems={'center'} sx={{display: open ? 'black' : "none"}}>
                    <MBox circlebox>
                        <MBox circlebox sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'farhangian.yellow' }}>
                            <Image width={50} height={'30'} src={Vector} alt={'vector'} />
                        </MBox>
                    </MBox>
                    <Typography color={'black.main'} variant={'caption'} mt={1}>بیرکار سیستم </Typography>
                </Grid>
                <List>
                    {navList.map((item, index) => (
                        <ListItem sx={{

                            borderLeft: `${urlSplit(pathname) === urlSplit(item.path) && "3px solid #FFB636"}`,
                            backgroundColor: `${urlSplit(pathname) === urlSplit(item.path) && "grey.200"}`,
                            display: 'flex',
                            alignItems: 'end',
                            ':hover':{
                                backgroundColor:'grey.300'
                            }
                        }} key={index} disablePadding>
                            <Link href={item.path}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 60,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        ':hover': {
                                            backgroundColor:'grey.300'
                                        }
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <Typography  variant={'caption'} color={'black.main'} sx={{opacity: open ? 1 : 0 , fontFamily:'Shabname Bakh Fat'}}>{item.text}</Typography>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
