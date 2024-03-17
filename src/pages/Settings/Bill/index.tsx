import SettingLayout from "@/Components/SettingLayout";
import React, {useState} from "react";
import {
    AlertColor,
    Grid, IconButton, InputAdornment,
    Paper, Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TablePagination, TableRow, TextField, Typography
} from "@mui/material";
import * as yup from "yup";
import MInput from "@/Components/Minput";
import MTButton from "@/Components/Mbutton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import {useFormik} from "formik";
import Cookies from "js-cookie";

const formValidationSchema = yup.object({});

let alertColor: AlertColor | undefined;
const Bills = ({formData, setCurrentStep, setFormData, client}: any) => {
    const Cook = Cookies.get('TokenLogin')
    const [Clients, setClients] = useState([])
    const [Guids, setGuids] = useState('')
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [Validate, setValidate] = React.useState(false)
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const back = () => {
        setCurrentStep(1)
    }

    const HanellPage = () => {
        setCurrentStep(3)
    }

    const handleClose = () => {
        setOpenMessage(false);
    };

    const columns = Object.keys(Clients[0] ?? '');
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const handleFileUploads = (event: any) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFile(file);
            setUploadedFileName(file.name);
        }
    };

    const handleClickClear = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };

    const handleFileReset = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };


    const formik = useFormik({
        initialValues: {},
        validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            const Submite = async () => {
                const config = {
                        headers: {
                            'Content-type': 'multipart/form-data',
                            'Authorization': `Bearer ${Cook}`,
                    },
                    };

            try {
                const formData = new FormData();
                if (uploadedFile) {
                    formData.append('file', uploadedFile);
                }

                const response = await axios.post(
                    'https://farhangian.birkar.ir/api/Excel/PostExcel',
                    formData,
                    config
                );

                if (response.status === 200) {
                    handleFileReset();
                    setMessage('فایل اکسل با موفقیت ارسال شد');
                    setTypeMessage('success');
                    setOpenMessage(true);
                    formik.resetForm();
                }
            } catch (error: any) {
                setTypeMessage('error');
                setOpenMessage(true);
                setMessage(error.response.data.message);
            }
        };

        Submite();
    },
}
)
;


return (
    <SettingLayout>
        <Grid item container lg={12} mt={5} justifyContent={'center'}>
            <Grid item container lg={11} borderRadius={2} boxShadow={5} bgcolor={'white.main'}>
                <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                    <Grid item container justifyContent={'space-evenly'} lg={12} p={2}>
                        <Grid item container lg={10} p={2}>
                            <FormControl sx={{width: {lg: '100%', xs: 220, md: 350}}}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {!uploadedFileName && (
                                        <MTButton
                                            selectimages
                                            sx={{
                                                // backgroundColor: "white",
                                                // color: "black.main",
                                                // fontSize: "1rem",
                                                // border: "1px dashed rgba(0, 0, 0, 0.12)",
                                                width: "100%",
                                                height: "45px",
                                                boxShadow: "none",
                                                // "&:hover": {
                                                //     backgroundColor: "#FAFAFA",
                                                //     boxShadow: "none"
                                                // }
                                            }}
                                            startIcon={<CloudUploadRoundedIcon/>}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>اپلود فایل اکسل</Typography>
                                            <input
                                                hidden
                                                accept="xlsx"
                                                multiple
                                                type="file"
                                                onChange={handleFileUploads}
                                            />
                                        </MTButton>
                                    )}
                                    {uploadedFileName && (
                                        <TextField
                                            variant="outlined"
                                            value={uploadedFileName}
                                            disabled
                                            sx={{
                                                width: "100%"
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DescriptionRoundedIcon/>
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                </Stack>
                            </FormControl>
                        </Grid>
                        <Grid item container lg={2} p={2}>
                            <MTButton submite type="submit">
                                <Typography variant={'caption'}>ارسال</Typography>
                            </MTButton>
                        </Grid>
                    </Grid>


                    {/*<TableContainer style={{overflowX: 'auto', maxWidth: 1350}}>*/}
                    {/*    <Table component={Paper}>*/}
                    {/*        <TableHead>*/}
                    {/*            <TableRow>*/}
                    {/*                {Object.keys(Clients[0] ?? '').map((column, index) => (*/}
                    {/*                    <TableCell key={index}>{column}</TableCell>*/}
                    {/*                ))}*/}
                    {/*            </TableRow>*/}
                    {/*        </TableHead>*/}
                    {/*        <TableBody>*/}
                    {/*            {currentData.map((object, rowIndex) => (*/}
                    {/*                <TableRow key={rowIndex}>*/}
                    {/*                    {columns.map((column, colIndex) => (*/}
                    {/*                        <TableCell key={colIndex}>{object[column]}</TableCell>*/}
                    {/*                    ))}*/}
                    {/*                </TableRow>*/}
                    {/*            ))}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}
                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[5, 10, 20, 30, 40, 100]}*/}
                    {/*    component="div"*/}
                    {/*    count={Clients.length}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={currentPage}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*/>*/}


                </form>


                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    </SettingLayout>
)
}

export default Bills
