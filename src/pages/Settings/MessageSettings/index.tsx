import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';

const eventHandlingLabel = { 'aria-label': 'Event Handling' };

import { ColorBox, ColorBoxTypes } from 'devextreme-react/color-box';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Cookies from "js-cookie";
import url from '@/Api';

const defaultModeLabel = { 'aria-label': 'Default mode' };
const formValidationSchemas = yup.object({
    phone: yup.string().required('عنوان متن الزامی است'),
});

const PageSetting = () => {
    const Cook = Cookies.get('TokenLogin');
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({ value }: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);

    const handleClickClear = () => {
        setUploadedFileName("");
    };

    const handleFileUploads = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name;
            setUploadedFileName(fileName);
            setFiles(files[0])
        }
    };

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const login = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };
                try {
                    const response = await axios.post(`${url}/api/User/SendSms?textMessage=${values.phone}`,config )
                    if (response.status === 200) {
                        setMessage('پیامک شما با  برای تمام کاربران وبسایت ارسال  شد')
                        setTypeMessage('success')
                        setOpenMessage(true)
                        setTimeout(() => {
                            formik.resetForm();
                        }, 2000)
                    }
                } catch (error: any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.message)
                }
            }
            login();
        },
    });

    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-evenly'} borderRadius={2}
                    bgcolor={'white.main'}>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>

                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    label="متن خود را بنویسید ..."
                                    minRows={5}
                                    multiline
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container lg={12} justifyContent={'end'} p={2}>
                            <MTButton submite type="submit">ارسال پیامک</MTButton>
                        </Grid>
                    </form>
                </Grid>
                <Snackbar open={openMessage} autoHideDuration={4500}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{ width: '100%' }}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>


        </SettingLayout>
    )
}
export default PageSetting
