import React, { useEffect, useState } from 'react';
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
    Grid, TablePagination, Pagination, Modal, Box, List, InputLabel, InputAdornment, IconButton
} from '@mui/material';
import axios from "axios";
import SettingLayout from "@/Components/SettingLayout";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Image from "next/image";
import Trash from "@/Assets/images/circum_trash.svg";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import Mbutton from "@/Components/Mbutton";
import MTButton from "@/Components/Mbutton";
import FormControl from "@mui/material/FormControl";
import colors from "@/Assets/theme/base/colors";
import MInput from "@/Components/Minput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import url from '@/Api';

const initialUsers = [
    { id: 1, name: 'John Doe', phone: '1234567890', password: 'password123' },
    { id: 2, name: 'Jane Doe', phone: '0987654321', password: 'pass456' },
    // Add more user data as needed
];

const formValidationSchema = yup.object({
    UserName: yup.string().required('نام کاربری  الزامی است'),
    Password: yup.string().required('رمزعبور الزامی است'),
    FirstName: yup.string().required('نام خود الزامی است'),
    LastName: yup.string().required('نام خانوادگی خود الزامی است'),
    CodePersonneli: yup.string().required('کد پرسنلی الزامی است'),
    CodeMeli: yup.string().required('کد ملی الزامی است'),

});
const style = {
    position: 'absolute' as 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: 500, xs: 400 },
    bgcolor: 'background.paper',
    color: 'red.main',
    border: 'none',
    outline: 'none',
    borderRadius: 2,
    boxShadow: 24,
};
const formValidationSchemas = yup.object({
    NewPassword: yup.string().required('رمزعبور الزامی است'),
});
const UserTable = () => {
    const Cook = Cookies.get('TokenLogin')
    const [Clients, setClients] = useState([])
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [Value, setValue] = React.useState()
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
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [pageIndex, setPageIndex] = useState(1); // شماره صفحه فعلی
    const rowsPerPage = 10;

    React.useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,
                },
            };
            const response = await fetch(`${url}/api/User/GetAll?pageIndex=${page}`, config);
            const data = await response.json();
            setClients(data.data);
            setTotalItems(data.totalItems);

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    const columns = Object.keys(Clients && Clients[0] ? Clients[0] : {});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Clients?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleChangePage = (event: any, newPage: any) => {
        setPageIndex(newPage);
    };


    const handleDelete = (id: number) => {
        const Deleted = async () => {
            try {
                const response = await axios.delete(`${url}/api/User/Delete?id=${id}`,
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
    const handleClose = (event: any, reason: any) => {
        setOpenMessage(false);
    };


    const getExcell = async () => {
        const getExcel = async () => {
            try {
                const response = await axios.get(`${url}/api/Excel/GetUsersExcel`, {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                });
                const urls = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = urls;
                link.setAttribute('download', 'UsersList.xlsx');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        getExcel();
    }


    const [openEditePassword, setOpenEditePassword] = React.useState(false);

    const handleCloseEditePassword = () => setOpenEditePassword(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [IdUserEdite, setIdUserEdite] = React.useState<any>('')
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event: any) => {
        event.preventDefault();
    };
    const formiks = useFormik({
        initialValues: {
            NewPassword: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,

                    },
                };

                try {
                    const response = await axios.put(
                        `${url}/api/User/UpdatePassByAdmin`,
                        {
                            'id': IdUserEdite.toString(),
                            'password': values.NewPassword,
                        },
                        config
                    );
                    if (response.status === 200) {
                        setMessage(' با موفقیت رمز عبور ادیت شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiks.resetForm();
                        setOpenEditePassword(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.response.data.Message)
                }
            };

            Submite();
        },
    });

    const handelEditePassUser = (id: number) => {
        setOpenEditePassword(true)
        setIdUserEdite(id)
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const [id, SetId] = React.useState()
    const [open, setOpen] = React.useState(false);
    const handleOpenEdite = (item: any) => {
        setOpen(!open)
    }
    const handleCloses = (event: any, reason: any) => {
        setOpen(false);
    };

    const formiksEdit = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            FirstName: '',
            LastName: '',
            CodePersonneli: '',
            CodeMeli: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'accept': 'text/plain',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };

                try {
                    // const formData = new FormData();
                    // formData.append('UserName', values.UserName);
                    // formData.append('Password', values.Password);
                    // formData.append('FirstName', values.FirstName);
                    // formData.append('LastName', values.LastName);
                    // formData.append('CodePersonneli', values.CodePersonneli);
                    // formData.append('CodeMeli', values.CodeMeli);
                    const config = {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${Cook}`,
                        },
                    };
                    const response = await axios.post(`${url}/api/User/CreateNewAdmin?UserName=${values.UserName}&Password=${values.Password}&FirstName=${values.FirstName}&LastName=${values.LastName}&CodePersonneli=${values.CodePersonneli}&CodeMeli=${values.CodeMeli}`,null, config);
                    // const response = await axios.post(
                    //     `${url}/api/User/CreateNewAdmin?UserName=${values.UserName}&Password=${values.Password}&FirstName=${values.FirstName}&LastName=${values.LastName}&CodePersonneli=${values.CodePersonneli}&CodeMeli=${values.CodeMeli}`,
                    //     config
                    // );
                    // console.log(response);
                    if (response.status === 200) {
                        setMessage(' موفقیت ادمین جدید اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksEdit.resetForm();
                        setOpen(!open)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.response.data.message);
                }
            };

            Submite();
        },
    });
    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} >
                <Grid item container lg={11}>

                    <Grid item container lg={12} mt={3} justifyContent={'space-between'}>
                        <Grid item container lg={6}>
                            <Typography>دریافت خروجی</Typography>
                        </Grid>


                        <Grid item container lg={6} justifyContent={'end'} alignItems={'center'}>
                            <Grid item container lg={6} justifyContent={'space-around'} alignItems={'center'}>
                                <MTButton onClick={getExcell} submite>خروجی</MTButton>
                                <MTButton onClick={() => handleOpenEdite(1)} submite >اضافه کردن ادمین</MTButton>
                            </Grid>


                        </Grid>

                        <Grid alignItems={'center'}>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ marginTop: 2, fontFamily: 'Shabname', overflow: 'auto', minWidth:'95%' , maxWidth:'95%' }}>
                        <Table sx={{ overflow: 'auto' , }}>
                            <TableHead>
                                <TableRow>
                                    {columns?.map((column, index) => (
                                        <TableCell sx={{ fontFamily: 'Shabname' }} key={index}>{column}</TableCell>
                                    ))}
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Clients.map((item: any, index) => (
                                    <TableRow key={index}>
                                        {columns?.map((column, colIndex) => (
                                            <TableCell sx={{ fontFamily: 'Shabname' }} key={colIndex}>{item[column]}</TableCell>
                                        ))}
                                        <TableCell>
                                            <>
                                                <Button onClick={() => handleDelete(item?.id ?? '')}>
                                                    <Image src={Trash} alt={'icons'} />
                                                </Button>

                                                <Button onClick={() => handelEditePassUser(item?.id ?? '')}>
                                                    <Image src={Edite} alt={'icons'} />
                                                </Button>
                                            </>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination
                        count={Math.ceil(totalItems / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                    />


                    {/*<MyPagination itemsPerPage={itemsPerPage} totalItems={Clients.length} paginate={paginate} />*/}

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

            <Modal
                open={open}
                onClose={handleCloses}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={{ lg: 800 }}>
                    <Grid item container lg={12} justifyContent={'center'} alignItems={'center'} p={2}>
                        <Typography variant={'h1'} color={'black.main'}>اضافه کردن ادمین</Typography>
                    </Grid>
                    <hr style={{ width: '100%', height: 2, backgroundColor: 'red.main' }} />
                    <Grid item container mt={2} mb={0} p={0} position={'relative'} lg={12}
                        md={12} xs={12} sm={12} bgcolor={'white.main'}>
                        <List sx={{ width: '100%' }}>
                            <form onSubmit={formiksEdit.handleSubmit} style={{ width: '100%' }}>
                                <Grid item container lg={12}>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                نام کاربری :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="UserName"
                                                name="UserName"
                                                value={formiksEdit.values.UserName}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'text'}
                                                error={formiksEdit.touched.UserName && Boolean(formiksEdit.errors.UserName)}
                                                helperText={formiksEdit.touched.UserName && formiksEdit.errors.UserName}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                پسورد :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="Password"
                                                name="Password"
                                                value={formiksEdit.values.Password}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'pssword'}
                                                error={formiksEdit.touched.Password && Boolean(formiksEdit.errors.Password)}
                                                helperText={formiksEdit.touched.Password && formiksEdit.errors.Password}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item container lg={12}>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                نام  :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="FirstName"
                                                name="FirstName"
                                                value={formiksEdit.values.FirstName}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'text'}
                                                error={formiksEdit.touched.FirstName && Boolean(formiksEdit.errors.FirstName)}
                                                helperText={formiksEdit.touched.FirstName && formiksEdit.errors.FirstName}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                نام خانوادگی :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="LastName"
                                                name="LastName"
                                                value={formiksEdit.values.LastName}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'text'}
                                                error={formiksEdit.touched.LastName && Boolean(formiksEdit.errors.LastName)}
                                                helperText={formiksEdit.touched.LastName && formiksEdit.errors.LastName}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item container lg={12}>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                کد پرسنلی :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="CodePersonneli"
                                                name="CodePersonneli"
                                                value={formiksEdit.values.CodePersonneli}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'text'}
                                                error={formiksEdit.touched.CodePersonneli && Boolean(formiksEdit.errors.CodePersonneli)}
                                                helperText={formiksEdit.touched.CodePersonneli && formiksEdit.errors.CodePersonneli}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={6} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                کد ملی :
                                            </InputLabel>
                                            <MInput
                                                popup
                                                id="CodeMeli"
                                                name="CodeMeli"
                                                value={formiksEdit.values.CodeMeli}
                                                onChange={formiksEdit.handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                                type={'text'}
                                                error={formiksEdit.touched.CodeMeli && Boolean(formiksEdit.errors.CodeMeli)}
                                                helperText={formiksEdit.touched.CodeMeli && formiksEdit.errors.CodeMeli
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>



                                <Grid item container lg={12} justifyContent={'end'} p={2}>
                                    <MTButton submite type="submit">ثبت</MTButton>
                                </Grid>
                            </form>
                        </List>
                    </Grid>
                </Box>
            </Modal>
            <Modal
                open={openEditePassword}
                onClose={handleCloseEditePassword}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} width={{ xs: 50 }}>
                        <Grid item container lg={12} justifyContent={'center'} alignItems={'center'} p={2}>
                            <Typography variant={'h1'} color={'black.main'}>صفحه تغییر پسورد</Typography>
                        </Grid>
                        <hr style={{ width: '100%', height: 2, backgroundColor: 'red.main' }} />
                        <Grid item container lg={12} mt={{ lg: 2 }}>
                            <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                sm={12}>
                                <List sx={{ width: '100%' }}>
                                    <form onSubmit={formiks.handleSubmit} style={{ width: '100%' }}>

                                        <Grid item container lg={12} p={2} mt={{ lg: 2 }}>
                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-20px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    رمز عبور جدید :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    id="NewPassword"
                                                    name="NewPassword"
                                                    value={formiks.values.NewPassword}
                                                    onChange={formiks.handleChange}
                                                    onBlur={formiks.handleBlur}
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    error={formiks.touched.NewPassword && Boolean(formiks.errors.NewPassword)}
                                                    helperText={formiks.touched.NewPassword && formiks.errors.NewPassword}
                                                />

                                                <InputAdornment position={"start"} sx={{
                                                    width: '97%',
                                                    top: { lg: 30, xs: 30 },
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}>
                                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowNewPassword} onMouseDown={handleMouseDownNewPassword} edge="end">
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            </FormControl>
                                        </Grid>

                                        {/*<Grid item container lg={12} p={2} mt={{lg:2}}>*/}
                                        {/*    <FormControl fullWidth>*/}
                                        {/*        <InputLabel sx={{*/}
                                        {/*            marginTop: "-20px",*/}
                                        {/*            fontFamily: 'Yekan Bakh Medium',*/}
                                        {/*            fontSize: "1.2rem",*/}
                                        {/*            fontWeight: "bold !important",*/}
                                        {/*            color: colors.black.main + "!important",*/}

                                        {/*        }} shrink htmlFor="bootstrap-input">*/}
                                        {/*            تکرار عبور جدید :*/}
                                        {/*        </InputLabel>*/}
                                        {/*        <MInput*/}
                                        {/*            popup*/}
                                        {/*            id="ConfirmPassword"*/}
                                        {/*            name="ConfirmPassword"*/}
                                        {/*            value={formiks.values.ConfirmPassword}*/}
                                        {/*            onChange={formiks.handleChange}*/}
                                        {/*            onBlur={formiks.handleBlur}*/}
                                        {/*            error={formiks.touched.ConfirmPassword && Boolean(formiks.errors.ConfirmPassword)}*/}
                                        {/*            helperText={formiks.touched.ConfirmPassword && formiks.errors.ConfirmPassword}*/}
                                        {/*        />*/}


                                        {/*    </FormControl>*/}
                                        {/*</Grid>*/}


                                        <Grid item container lg={12} justifyContent={'center'} p={2}>
                                            <MTButton submite type="submit">تغییر رمز عبور</MTButton>
                                        </Grid>
                                    </form>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            </Modal>
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert sx={{ width: '100%' }}>
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
                onChange={(event: any, page: any) => paginate(page)}
                variant="outlined"
                shape="rounded"
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            />
        </>
    );
};


export default UserTable;
