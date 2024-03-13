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
    Grid, TablePagination, Pagination
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
import Cookies from "js-cookie";
import Mbutton from "@/Components/Mbutton";
import MTButton from "@/Components/Mbutton";

const initialUsers = [
    { id: 1, name: 'John Doe', phone: '1234567890', password: 'password123' },
    { id: 2, name: 'Jane Doe', phone: '0987654321', password: 'pass456' },
    // Add more user data as needed
];

const UserTable = () => {
    const Cook=Cookies.get('TokenLogin')
    const [Clients, setClients] = useState([])
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [Value,setValue]=React.useState()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [Cookiess, SetCookies] = useCookies(['TokenLogin'])

    // const handleEdit = (id:any, field:any, value:any) => {
    //     setEditingUser(id);
    //     const updatedUsers = users.map((user) => (user.id === id ? { ...user, [field]: value } : user));
    //     setUsers(updatedUsers);
    // };
    //
    // const handleSave = (id:any, field:any, value:any) => {
    //     setEditingUser(null);
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const [pageIndex, setPageIndex] = useState(1); // شماره صفحه فعلی
    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };
                const response = await fetch(`https://farhangian.birkar.ir/api/User/GetAll?pageIndex=${currentPage}`, config);
                const data = await response.json();
                setClients(data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [pageIndex]);


    const columns = Object.keys(Clients && Clients[0] ? Clients[0] : {});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Clients?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleChangePage = (event:any, newPage:any) => {
        setPageIndex(newPage);
    };


    const handleDelete = (id:number) => {
        const Deleted = async () => {
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/User/Delete?id=${id}`,
                )
                if (response.status === 200) {
                    setMessage('حذف محصول  با موفقیت انجام شد')
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


    const getExcell=async ()=>{
        const getExcel = async () => {
            try {
                const response = await axios.get('https://farhangian.birkar.ir/api/Excel/GetExcel', {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'UsersList.xlsx');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        getExcel();
    }
    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} >
                <Grid item container lg={11}>

                        <Grid item container lg={12} mt={3} justifyContent={'space-between'}>
                            <Grid>
                                <Typography>دریافت خروجی</Typography>
                            </Grid>

                            <Grid alignItems={'center'}>
                                <MTButton onClick={getExcell} submite>خروجی</MTButton>
                            </Grid>
                        </Grid>
                    <TableContainer component={Paper} sx={{marginTop:2 , fontFamily:'Shabname' , overflow:'auto'}}>
                        <Table sx={{overflow:'auto'}}>
                            <TableHead>
                                <TableRow>
                                    {columns?.map((column, index) => (
                                        <TableCell sx={{ fontFamily: 'Shabname' }} key={index}>{column}</TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentItems.map((item:any, index) => (
                                    <TableRow key={index}>
                                        {columns?.map((column, colIndex) => (
                                            <TableCell sx={{ fontFamily: 'Shabname' }} key={colIndex}>{item[column]}</TableCell>
                                        ))}
                                        <TableCell>
                                                <>
                                                    <Button onClick={() => handleDelete(item?.id ?? '')}>
                                                        <Image src={Trash} alt={'icons'} />
                                                    </Button>
                                                </>
                                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <MyPagination itemsPerPage={itemsPerPage} totalItems={Clients.length} paginate={paginate} />

                    {/*<button onClick={handlePrevPage} disabled={pageIndex === 1}>Previous Page</button>*/}
                    {/*<button onClick={handleNextPage}>Next Page</button>*/}
                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[5, 10, 20, 30, 40, 100]}*/}
                    {/*    component="div"*/}
                    {/*    count={Clients ? Clients.length : 0}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={Clients ? Clients.length<=10 ? 1 : 2 : 0}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*/>*/}
                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[]} // غیرفعال کردن انتخاب تعداد ردیف‌ها در هر صفحه*/}
                    {/*    component="div"*/}
                    {/*    count={100}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={pageIndex}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*/>*/}
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

const MyPagination = ({ itemsPerPage, totalItems, paginate }: { itemsPerPage: number, totalItems: number, paginate: Function }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);


    return (
        <>
            <Pagination
                count={pageCount}
                onChange={(event:any, page:any) => paginate(page)}
                variant="outlined"
                shape="rounded"
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            />
        </>
    );
};


export default UserTable;
