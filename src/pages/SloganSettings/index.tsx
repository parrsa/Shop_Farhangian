import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor,
    Grid,
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {ColorBoxTypes} from "devextreme-react/color-box";
const formValidationSchema = yup.object({
    phone: yup.string().required('متن شعار الزامی است'),
});

let alertColor: AlertColor | undefined;

const PageSetting = () => {
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({value}: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
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
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            const login = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
                try {
                    const response = await axios.post(`https://farhangian.birkar.ir/Slogan/Create`,
                        {
                            id:0,
                            title: values.phone,
                        },
                        config
                    )
                    if (response.status === 200) {
                        setMessage('شعار شما با موفقیت ثبت شد')
                        setTypeMessage('success')
                        setOpenMessage(true)
                        formik.resetForm();
                        setTimeout(() => {
                            // navigate('/')
                        }, 2000)
                    }
                } catch (error:any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.message)
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
                    <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    minRows={5}
                                    multiline
                                    id="phone"
                                    name="phone"
                                    type={'text'}
                                    label={"متن شعار"}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container justifyContent={"center"} p={2}
                              lg={12} md={12}>
                            <MTButton register type="submit">ورود</MTButton>
                        </Grid>
                    </form>
                </Grid>
                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </SettingLayout>
    )
}
export default PageSetting
