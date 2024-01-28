import SettingLayout from "@/Components/SettingLayout";
import {Grid, IconButton, InputAdornment, InputLabel, Select, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';

const eventHandlingLabel = {'aria-label': 'Event Handling'};

import {ColorBox} from 'devextreme-react/color-box';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";

const defaultModeLabel = {'aria-label': 'Default mode'};

const PageSetting = () => {
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({value}: ColorBoxTypes.ValueChangedEvent) => {
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
    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-evenly'} borderRadius={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={12} p={2}>
                        <Grid item container lg={3}  alignItems={'center'} >
                            <Typography variant={'h1'} p={0.5}>نوار تبلیغاتی صفحه اصلی ( اسلاید اول )</Typography>
                        </Grid>
                        <Grid item container lg={6}>
                            <Grid item container lg={4}  flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>
                                <ColorBox
                                    style={{marginTop:'0'}}
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ متن  </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container lg={3}  justifyContent={'center'} alignItems={'end'}>
                            <FormControl sx={{ width: {lg: 250, xs: 220, md: 350}}}>
                                <Stack  direction="row" alignItems="center" spacing={2}>
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
                                            startIcon={<CloudUploadRoundedIcon />}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>
                                            <input
                                                hidden
                                                accept="image/*"
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
                                                        <DescriptionRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                </Stack>

                                {/*<MInput*/}
                                {/*    popup*/}
                                {/*    type="file"*/}
                                {/*    InputProps={{*/}
                                {/*        // startAdornment: <InputAdornment position="start" sx={{fontSize:'5px'}}>ان</InputAdornment>,*/}
                                {/*    }} x*/}
                                {/*    id="lname"*/}
                                {/*    name="lname"*/}
                                {/*    label={""}*/}
                                {/*    placeholder="نام و نام خانوادگی یا نرم مرکز تخضض خود را وارد کنید"*/}
                                {/*    // value={formik.values.lname}*/}
                                {/*    // minRows={5}*/}
                                {/*    rows={8}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    onBlur={formik.handleBlur}*/}
                                {/*    // error={formik.touched.lname && Boolean(formik.errors.lname)}*/}
                                {/*    // helperText={formik.touched.lname && formik.errors.lname}*/}
                                {/*/>*/}
                            </FormControl>

                        </Grid>
                    </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="عنوان متن ..."
                                minRows={0}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="متن خود را بنویسید ..."
                                minRows={5}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} justifyContent={'end'} p={2}>
                        <MTButton submite>ثبت</MTButton>
                    </Grid>
                </Grid>
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-evenly'} borderRadius={2} mt={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={12} p={2}>
                        <Grid item container lg={3}  alignItems={'center'}>
                            <Typography variant={'h1'} p={0.5} >نوار تبلیغاتی صفحه اصلی ( اسلاید دوم )</Typography>
                        </Grid>
                        <Grid item container lg={6}>
                            <Grid item container lg={4}  flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>
                                <ColorBox
                                    style={{marginTop:'0'}}
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ متن  </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container lg={3}  justifyContent={'center'} alignItems={'end'}>
                            <FormControl sx={{ width: {lg: 250, xs: 220, md: 350}}}>
                                <Stack  direction="row" alignItems="center" spacing={2}>
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
                                            startIcon={<CloudUploadRoundedIcon />}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>
                                            <input
                                                hidden
                                                accept="image/*"
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
                                                        <DescriptionRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                </Stack>

                                {/*<MInput*/}
                                {/*    popup*/}
                                {/*    type="file"*/}
                                {/*    InputProps={{*/}
                                {/*        // startAdornment: <InputAdornment position="start" sx={{fontSize:'5px'}}>ان</InputAdornment>,*/}
                                {/*    }} x*/}
                                {/*    id="lname"*/}
                                {/*    name="lname"*/}
                                {/*    label={""}*/}
                                {/*    placeholder="نام و نام خانوادگی یا نرم مرکز تخضض خود را وارد کنید"*/}
                                {/*    // value={formik.values.lname}*/}
                                {/*    // minRows={5}*/}
                                {/*    rows={8}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    onBlur={formik.handleBlur}*/}
                                {/*    // error={formik.touched.lname && Boolean(formik.errors.lname)}*/}
                                {/*    // helperText={formik.touched.lname && formik.errors.lname}*/}
                                {/*/>*/}
                            </FormControl>

                        </Grid>
                    </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="عنوان متن ..."
                                minRows={0}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="متن خود را بنویسید ..."
                                minRows={5}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} justifyContent={'end'} p={2}>
                        <MTButton submite>ثبت</MTButton>
                    </Grid>
                </Grid>
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-evenly'} borderRadius={2} mt={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={12} p={2}>
                        <Grid item container lg={3}  alignItems={'center'}>
                            <Typography variant={'h1'} p={0.5}>نوار تبلیغاتی صفحه اصلی ( اسلاید سوم )</Typography>
                        </Grid>
                        <Grid item container lg={6}>
                            <Grid item container lg={4}  flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>
                                <ColorBox
                                    style={{marginTop:'0'}}
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ متن  </Typography>
                                <ColorBox
                                    value={color}
                                    applyValueMode="instantly"
                                    inputAttr={eventHandlingLabel}
                                    onValueChanged={handleColorChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container lg={3}  justifyContent={'center'} alignItems={'end'}>
                            <FormControl sx={{ width: {lg: 250, xs: 220, md: 350}}}>
                                <Stack  direction="row" alignItems="center" spacing={2}>
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
                                            startIcon={<CloudUploadRoundedIcon />}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>
                                            <input
                                                hidden
                                                accept="image/*"
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
                                                        <DescriptionRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                </Stack>

                                {/*<MInput*/}
                                {/*    popup*/}
                                {/*    type="file"*/}
                                {/*    InputProps={{*/}
                                {/*        // startAdornment: <InputAdornment position="start" sx={{fontSize:'5px'}}>ان</InputAdornment>,*/}
                                {/*    }} x*/}
                                {/*    id="lname"*/}
                                {/*    name="lname"*/}
                                {/*    label={""}*/}
                                {/*    placeholder="نام و نام خانوادگی یا نرم مرکز تخضض خود را وارد کنید"*/}
                                {/*    // value={formik.values.lname}*/}
                                {/*    // minRows={5}*/}
                                {/*    rows={8}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    onBlur={formik.handleBlur}*/}
                                {/*    // error={formik.touched.lname && Boolean(formik.errors.lname)}*/}
                                {/*    // helperText={formik.touched.lname && formik.errors.lname}*/}
                                {/*/>*/}
                            </FormControl>

                        </Grid>
                        </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="عنوان متن ..."
                                minRows={0}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} p={2}>
                        <FormControl fullWidth>
                            <MInput
                                textarea
                                label="متن خود را بنویسید ..."
                                minRows={5}
                                multiline
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container lg={12} justifyContent={'end'} p={2}>
                        <MTButton submite>ثبت</MTButton>
                    </Grid>
                </Grid>
            </Grid>


        </SettingLayout>
    )
}
export default PageSetting
