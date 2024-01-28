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
