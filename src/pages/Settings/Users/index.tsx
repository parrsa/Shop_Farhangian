import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid, TablePagination
} from '@mui/material';
import axios from "axios";
import SettingLayout from "@/Components/SettingLayout";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Image from "next/image";
import Trash from "@/Assets/images/circum_trash.svg";
import Typography from "@mui/material/Typography";
import {useCookies} from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialUsers = [
    { id: 1, name: 'John Doe', phone: '1234567890', password: 'password123' },
    { id: 2, name: 'Jane Doe', phone: '0987654321', password: 'pass456' },
    // Add more user data as needed
];

const UserTable = () => {
    const [Clients, setClients] = useState([])
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [Value,setValue]=React.useState()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [Cookiess, SetCookies] = useCookies(['TokenLogin'])

    const handleEdit = (id:any, field:any, value:any) => {
        setEditingUser(id);
        const updatedUsers = users.map((user) => (user.id === id ? { ...user, [field]: value } : user));
        setUsers(updatedUsers);
    };

    const handleSave = (id:any, field:any, value:any) => {
        setEditingUser(null);
    };

    // const handleDelete = (id:any) => {
    //     const updatedUsers = users.filter((user) => user.id !== id);
    //     setUsers(updatedUsers);
    //     setEditingUser(null);
    // };


    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/User/GetAll')
            const data = await response.json();
            setClients(data.data);
        }
        getData()
    }, [Clients]);


    const columns = Object.keys(Clients[0] ?? '');
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const startIdx = currentPage * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const currentData = Clients.slice(startIdx, endIdx);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to the first page when changing rows per page
    };
    const handleDelete = (id:number) => {
        const Deleted = async () => {
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/User/Delete?id=${id}`,
                )
                if (response.status === 200) {
                    setMessage('حذف خبر مورد نظر با موفقیت انجام شد')
                    setTypeMessage('warning')
                    setOpenMessage(true)
                }
            } catch (error: any) {
                setTypeMessage('error')
                setOpenMessage(true)
                setMessage(error.message)
            }
        }
        Deleted()
    };
    const handleClose = (event:any, reason:any) => {
        setOpenMessage(false);
    };

    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} >
                <Grid item container lg={11}>
                    <TableContainer component={Paper} sx={{marginTop:5}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell key={index}>{column}</TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentData.map((object, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {columns.map((column, colIndex) => (
                                            <TableCell key={colIndex}>{object[column]}</TableCell>
                                        ))}
                                        <TableCell>
                                            <Button>Edit</Button>
                                            <Button onClick={() => handleDelete(object.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 30, 40, 100]}
                        component="div"
                        count={Clients.length}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert  sx={{width: '100%'}}>
                    <Typography variant={'caption'}>{message}</Typography>
                </Alert>
            </Snackbar>
        </SettingLayout>
    );
};

export default UserTable;
