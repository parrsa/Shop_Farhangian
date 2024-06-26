import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor,
    Box, Button, FormControlLabel, FormHelperText,
    Grid,
    IconButton,
    InputAdornment, InputLabel, List, Modal, OutlinedInput, Pagination, RadioGroup, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';
import AddIcon from '@mui/icons-material/Add';

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useMemo, useRef, useState } from "react";
import colors from "@/Assets/theme/base/colors";

import { useTheme } from "@emotion/react";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Image from "next/image";
import Trash from "@/Assets/images/circum_trash.svg";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Cookies from "js-cookie";
import Radio from '@mui/material/Radio';
import url from '@/Api';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
    overflow: 'auto'
};

const formValidationSchemasEdite = yup.object({
    title: yup.string().required('عنوان متن الزامی است'),
});
const formValidationSchemasSub = yup.object({
    title: yup.string().required('عنوان متن الزامی است'),
});


const formValidationSchemas = yup.object({
    title: yup.string().required('عنوان متن الزامی است'),
    Tedad: yup.string().required('تعداد الزامی است'),
    // Gheymat: yup.string().required('قیمت الزامی است'),
    Description: yup.string().required('توضیحات الزامی است'),
});


const PageSetting = () => {
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const theme = useTheme();
    const [open, setopen] = React.useState(false)
    const [Id, setID] = React.useState();
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [Category, setCategory] = React.useState<any[]>([]);
    const [SubCategory, setSubCategory] = React.useState<any[]>([]);
    const [opens, setOpen] = React.useState(false);
    const [CategoryId, setIdCategoryNames] = React.useState<any>();
    const [CategoryIdForSub, setIdCategoryNamesForSub] = React.useState<any>();
    const [CategoryIdForSubAddProduct, setIdCategoryNamesForSubAddProduct] = React.useState<any>();
    const [Cate, setCate] = React.useState<any>();
    const [ModalProduct, setModalProduct] = React.useState(false)
    const [ModalProductEdit, setModalProductEdit] = React.useState(false)
    const Cook = Cookies.get('TokenLogin');

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Category/GetAll`)
            const data = await response.json();
            setCategory(data.data);
        }
        getData()
    }, [Category]);

    const handleClose = () => setOpen(false);

    const [IdEdit, SetIdEdit] = React.useState('')
    const handleOpenEdite = (item: any) => {
        SetIdEdit(item)
        setOpen(true)
    }


    const [OpenModalAddSubCategory, setOpenModalAddSubCategory] = React.useState(false)
    const handleOpenAddSubCategory = () => {
        setOpenModalAddSubCategory(true)
    }
    const handelCloseModalAddSubCategory = () => {
        setOpenModalAddSubCategory(false)
    }

    const [OpenModalAddCategory, setOpenModalAddCategory] = React.useState(false)
    const handleOpenAddCategory = () => {
        setOpenModalAddCategory(true)
    }
    const handelCloseModalAddCategory = () => {
        setOpenModalAddCategory(false)
    }
    const handelDeleted = (item: any) => {
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,

                },
            };
            try {
                const response = await axios.delete(`${url}/api/Category/Delete?id=${item}`, config)
                if (response.status === 200) {
                    setMessage('حذف دسته مورد نظر با موفقیت انجام شد')
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
    }

    const handelDeletedSub = (item: any) => {
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,

                },
            };
            try {
                const response = await axios.delete(`${url}/api/SubCategory/Delete?id=${item}`, config)
                if (response.status === 200) {
                    setMessage('حذف زیر دسته مورد نظر با موفقیت انجام شد')
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
    }
    const handleDeleteProduct = (id: number) => {
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,
                }
            };
            try {
                const response = await axios.delete(`${url}/api/Product/Delete?id=${id}`, config)
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
    const [loadingCategoty, setLoadingCategory] = useState(false); // وضعیت لودینگ برای ارسال درخواست به سرور

    const formiksAddCategory = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: formValidationSchemasEdite,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,

                    },
                };

                try {
                    setLoadingCategory(true)
                    const response = await axios.post(
                        `${url}/api/Category/Create`,
                        {
                            "categoryName": values.title
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage('با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksAddCategory.resetForm();
                        setOpenModalAddCategory(false)
                        setLoadingCategory(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                    setLoadingCategory(false)
                }
            };

            Submite();
        },
    });

    const formiksAddSubCategory = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: formValidationSchemasSub,
        onSubmit: (values) => {
            console.log('p')
            const Submite = async () => {

                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,

                    },
                };

                try {
                    setLoadingCategory(true)
                    const response = await axios.post(
                        `${url}/api/SubCategory/Create`,
                        {
                            "subCategoryName": values.title,
                            "categoryId": CategoryIdForSub
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage('با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksAddSubCategory.resetForm();
                        setOpenModalAddSubCategory(false)
                        // setLoadingCategory(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                    setLoadingCategory(false)
                }
            };

            Submite();
        },
    });


    const formiksEditeCategory = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: formValidationSchemasEdite,
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
                        `${url}/api/Category/Edit`,
                        {
                            "id": IdEdit,
                            "categoryName": values.title
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage('با موفقیت ادیت شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksEditeCategory.resetForm();
                        setOpen(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                }
            };

            Submite();
        },
    });
    useMemo(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Category/GetById?id=${CategoryId}`)
            const data = await response.json();
            setCate(data?.data);

        }
        getData()

    }, [])

    const [Products, setProduct] = React.useState<[]>([])
    const [page, setPage] = useState(1);
    const productsPerPage = 6; // Number of products per page

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    useEffect(() => {
        const getData = async () => {
            // https://tmfn2sna.ir/=1
            const response = await fetch(`${url}/api/Category/GetById?id=${CategoryId}`)
            const data = await response.json();
            setSubCategory(data.data)
            // setProduct(data.data);
        }
        getData()
    }, [CategoryId, SubCategory])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Product/GetBySubCategoryId?id=${CategoryIdForSubAddProduct}`)
            const data = await response.json();
            setProduct(data.data);
        }
        getData()
    }, [Products, CategoryIdForSubAddProduct])

    const product = Cate?.map((item: any) => (item?.products?.map((item: any) => (item))))

    const ShowModalProduct = (item: any) => {
        setModalProduct(true)
    }

    const handleCloseModalProduct = () => {
        setModalProduct(false)
    }
    const handleCloseModalProductEdit = () => {
        setModalProductEdit(false)
    }



    const [valueTakhfif, setValueTakhfif] = React.useState('');
    const [valueGheymat, setValueGheymat] = React.useState('');
    const [CategoryIdProdcutADD, setIdCategoryNamesProductAdd] = React.useState<any>();
    const [DarsadeTakhfif, setDarsadeTakhfif] = React.useState<any>();
    const [GheymatTakhfif, setGheymatTakhfif] = React.useState<any>();
    const [Gheymat, setGheymat] = React.useState<any>();
    let GheymatNahai = (Gheymat * DarsadeTakhfif / 100 - Gheymat)
    const handleRadioChangeGheymat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueGheymat((event.target as HTMLInputElement).value);
    };
    const handleRadioChangeTakhfif = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueTakhfif((event.target as HTMLInputElement).value);
    };
    const [loading, setLoading] = useState(false); // وضعیت لودینگ برای ارسال درخواست به سرور

    const formiksAdd = useFormik({
        initialValues: {
            title: '',
            Tedad: '',
            // Gheymat: '',
            Description: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };

                try {
                    const formData = new FormData();
                    formData.append('Name', values.title);
                    formData.append('Tedad', values.Tedad);
                    // formData.append('CategoryId', CategoryIdProdcutADD);
                    formData.append('SubCategoryId', CategoryIdForSubAddProduct);
                    formData.append('Description', values.Description);
                    if (valueGheymat == 'best') {
                        formData.append('Gheymat', Gheymat);
                        formData.append('baGheymat', 'true');

                    } else {
                        formData.append('baGheymat', 'false');
                    }

                    if (valueTakhfif == 'best') {
                        formData.append('DarsadeTakhfif', DarsadeTakhfif);

                        formData.append('GheymatNahai', GheymatNahai.toString());
                        // formData.append('GheymatNahai', '100');

                        formData.append('isTakhfif', 'true');
                    } else {
                        formData.append('DarsadeTakhfif', '');

                        formData.append('GheymatNahai', '');

                        formData.append('isTakhfif', 'false');
                    }
                    if (uploadedFileEdit) {
                        formData.append('Image', uploadedFileEdit);
                    }


                    const response = await axios.post(
                        `${url}/api/Product/Create`,
                        formData,
                        config
                    );

                    if (response.status === 200) {
                        handleFileResetEdit();
                        setMessage('با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksAdd.resetForm();
                        setOpen(false)
                        setGheymat('')
                        setDarsadeTakhfif('')
                        setLoading(false); // فعال کردن وضعیت لودینگ

                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                    setLoading(false); // فعال کردن وضعیت لودینگ
                }
            };
            Submite();
        },
    });

    const [EditData, setEditDate] = React.useState<any[]>([])
    const [idEdite, setidEdite] = React.useState<any>()

    const handleEditProduct = (item: number) => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };
                const response = await fetch(`${url}/api/Product/GetById?param=${item}`, config)
                const data = await response.json();
                setEditDate(data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        getData()
        setidEdite(item)
        setModalProductEdit(true)
    }
    const [editingEnabled, setEditingEnabled] = useState(false); // State to control editing mode



    const handleEditDescription = (newDescription: any) => {
        setEditingEnabled(true)
        setEditDate((prevEditData: any) => ({
            ...prevEditData,
            description: newDescription
        }));
    };

    let dataName = (EditData.map((item) => item.name));
    let dataTedad = (EditData.map((item) => item.tedad))
    let dataGheymate = (EditData.map((item) => item.gheymat))
    let dataIstakhfif = (EditData.map((item) => item.isTakhfif))
    let dataDarsadTakhfif = (EditData.map((item) => item.darsadeTakhfif))
    let dataDescriptions = (EditData.map((item) => item.description))
    let [istakhfifedit, setistakhfifedit] = React.useState('')

    const handleRadioChangeTakhfifedit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setistakhfifedit((event.target as HTMLInputElement).value);
    };


    const [name, setName] = useState({
        name: '',
    });
    React.useMemo(() => {
        setName({ 'name': dataName.toString() })
    }, [EditData])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setName(prevname => ({
            name: e.target.value
        }));
    };

    const [tedad, setTedad] = useState({
        tedad: '',
    });
    React.useMemo(() => {
        setTedad({ 'tedad': dataTedad.toString() })
    }, [EditData])

    const handleChangetedad = (e: any) => {
        const { name, value } = e.target;
        setTedad(prevtedad => ({
            tedad: e.target.value
        }));
    };

    const [gheymate, setGheymate] = useState({
        gheymate: '',
    });
    React.useMemo(() => {
        setGheymate({ 'gheymate': dataGheymate.toString() })
    }, [EditData])

    const handleChangegheymate = (e: any) => {
        const { name, value } = e.target;
        setGheymate(prevGheymate => ({
            gheymate: e.target.value
        }));
    };


    const [darsadtakhfif, setDarsadtakhfif] = useState({
        darsadtakhfif: '',
    });
    React.useMemo(() => {
        setDarsadtakhfif({ 'darsadtakhfif': dataDarsadTakhfif.toString() })
    }, [EditData])

    const handleChangedarsadtakhfif = (e: any) => {
        const { name, value } = e.target;
        setDarsadtakhfif(prevdarsadtakhfif => ({
            darsadtakhfif: e.target.value
        }));
    };


    const [description, setDescription] = useState({
        descriptions: '',
    });
    React.useMemo(() => {
        setDescription({ 'descriptions': dataDescriptions.toString() })
    }, [EditData])

    const handleChangdescripton = (e: any) => {
        const { name, value } = e.target;
        setDescription(prevdescription => ({
            descriptions: e.target.value
        }));
    };


    let GheymatNahai2 = (Number(gheymate?.gheymate) * Number(darsadtakhfif.darsadtakhfif) / 100 - Number(gheymate.gheymate))
    // (gheymate?.gheymate * darsadtakhfif.darsadtakhfif / 100 - gheymate.gheymate)

    let GheymatNahai1 = (Number(gheymate?.gheymate) * Number(darsadtakhfif.darsadtakhfif) / 100 - Number(gheymate.gheymate))
    const [CategoryIdProdcutADDEdit, setIdCategoryNamesProductAddEdit] = React.useState<any>();

    const [uploadedFileEdit, setUploadedFileEdit] = useState(null);
    const [uploadedFileNameEdit, setUploadedFileNameEdit] = useState('');
    const handleFileUploadsEdit = (event: any) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFileEdit(file);
            setUploadedFileNameEdit(file.name);
        }
    };
    const handleFileResetEdit = () => {
        setUploadedFileEdit(null);
        setUploadedFileNameEdit('');
    };

    const handleClickClearEdit = () => {
        setUploadedFileEdit(null);
        setUploadedFileNameEdit('');
    };
    const formiksEditProduct = useFormik({
        initialValues: {

        },
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };

                try {
                    const formData = new FormData();
                    formData.append('Name', name.name);
                    formData.append('Tedad', tedad.tedad);
                    // formData.append('Gheymat', gheymate.gheymate);
                    // formData.append('CategoryId', CategoryIdProdcutADDEdit);
                    formData.append('SubCategoryId', CategoryIdForSubAddProduct);
                    if (valueGheymat == 'best') {
                        formData.append('Gheymat', gheymate?.gheymate);
                        formData.append('baGheymat', 'true');

                    } else {
                        formData.append('baGheymat', 'false');
                    }

                    formData.append('Description', description.descriptions);
                    formData.append('Id', idEdite);
                    if (istakhfifedit == 'best') {
                        formData.append('DarsadeTakhfif', darsadtakhfif.darsadtakhfif);

                        formData.append('GheymatNahai', GheymatNahai2.toString());
                        // formData.append('GheymatNahai', '100');

                        formData.append('isTakhfif', 'true');
                    } else {
                        formData.append('DarsadeTakhfif', '');

                        formData.append('GheymatNahai', '');

                        formData.append('isTakhfif', 'false');
                    }
                    if (uploadedFileEdit) {
                        formData.append('Image', uploadedFileEdit);
                    }


                    const response = await axios.put(
                        `${url}/api/Product/Edit`,
                        formData,
                        config
                    );

                    if (response.status === 200) {
                        handleFileResetEdit();
                        setMessage('با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksEditProduct.resetForm();
                        setOpen(false)
                        setGheymat('')
                        setDarsadeTakhfif('')
                        setLoading(false); // فعال کردن وضعیت لودینگ

                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                    setLoading(false); // فعال کردن وضعیت لودینگ
                }
            };
            Submite();
        },
    });

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const boxRef = useRef<HTMLDivElement>(null)

    const elRef = useRef<HTMLDivElement>(null)

    const handleCloseAlert = () => {
        setOpenMessage(false);
    };


    let nameof = SubCategory?.map(item => item.subCategories?.find((cate: any) => (cate.id == CategoryIdForSubAddProduct)))


    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>
                <Grid item container lg={10} boxShadow={5} justifyContent={'center'} borderRadius={2}
                    bgcolor={'white.main'}>
                    {/*Category*/}
                    <Grid item container lg={10} p={2} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                        <Typography variant={'h1'}>دسته های موجود :</Typography>
                        <MTButton onClick={handleOpenAddCategory} submite> <AddIcon fontSize={'small'} /> اضافه کردن
                        </MTButton>
                    </Grid>
                    <Grid item container boxShadow={5} mt={2} borderRadius={2} lg={10} height={'50vh'}
                        justifyContent={'center'} overflow={'auto'}>
                        {Category?.map((item: any) => (
                            <>
                                <Grid item container lg={10} xs={10} maxHeight={'8vh'} minHeight={'8vh'}
                                    bgcolor={'white.main'}
                                    boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                                    justifyContent={{
                                        lg: 'space-between',
                                        md: 'space-between',
                                        xs: 'space-between',
                                    }} alignItems={'center'}>
                                    <Grid item container lg={4} xs={12} justifyContent={'center'}
                                        alignItems={"center"}>
                                        <Typography variant="h1" color={colors.yellow.main}>دسته
                                            : <span>{item.categoryName}</span> </Typography>
                                    </Grid>

                                    <Grid item container lg={2} xs={12} justifyContent={'center'} alignItems={"end"}
                                    >
                                        <Grid item container lg={4}>
                                            <Typography sx={{ cursor: "pointer" }}
                                                onClick={() => handleOpenEdite(item.id)}
                                                variant="h1" color={colors.red.main}><Image src={Edite}
                                                    alt={'icons'} />
                                                <span style={{ color: colors.black.main }}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4}>
                                            <Typography sx={{ cursor: "pointer" }}
                                                onClick={() => handelDeleted(item.id)}
                                                variant="h1" color={colors.red.main}><Image src={Trash}
                                                    alt={'icons'} />
                                                <span style={{ color: colors.black.main }}></span></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ))}
                    </Grid>

                    <Grid item container lg={10} p={2} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                        <Typography variant={'h1'}>زیر دسته های موجود :</Typography>

                    </Grid>
                    <Grid item container lg={10} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                        <Grid item container lg={6} p={2}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                    id="demo-controlled-open-select-label">انتخاب دسته</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    name="gens"
                                    native
                                    defaultValue=""
                                    id="gens"
                                    value={CategoryId}
                                    onChange={(e: any) => setIdCategoryNames(e.target.value)}
                                    // onBlur={formiks.handleBlur}
                                    // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                    label="انتخاب دسته"
                                    sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                    <>
                                        <option aria-label="None" value="" />
                                        {Category?.map((item) => (
                                            <>
                                                <option value={item.id} key={item.id}>{item.categoryName}</option>
                                            </>
                                        ))}
                                    </>
                                </Select>
                            </FormControl>
                        </Grid>
                        <MTButton onClick={handleOpenAddSubCategory} submite> <AddIcon fontSize={'small'} /> اضافه کردن
                        </MTButton>
                    </Grid>
                    <Grid item container boxShadow={5} mt={2} borderRadius={2} lg={10} height={'50vh'}
                        justifyContent={'center'} overflow={'auto'}>
                        {SubCategory?.map((item: any) => (
                            <>

                                {item.subCategories.map((item: any) => (
                                    <>
                                        <Grid item container lg={10} xs={10} maxHeight={'8vh'} minHeight={'8vh'}
                                            bgcolor={'white.main'}
                                            boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                                            justifyContent={{
                                                lg: 'space-between',
                                                md: 'space-between',
                                                xs: 'space-between',
                                            }} alignItems={'center'}>
                                            <Grid item container lg={4} xs={12} justifyContent={'center'}
                                                alignItems={"center"}>
                                                <Typography variant="h1" color={colors.yellow.main}>زیر دسته
                                                    : <span>{item.subCategoryName}</span> </Typography>
                                            </Grid>

                                            <Grid item container lg={2} xs={12} justifyContent={'center'} alignItems={"end"}
                                            >
                                                <Grid item container lg={4}>
                                                    <Typography sx={{ cursor: "pointer" }}
                                                        onClick={() => handleOpenEdite(item.id)}
                                                        variant="h1" color={colors.red.main}><Image src={Edite}
                                                            alt={'icons'} />
                                                        <span style={{ color: colors.black.main }}></span></Typography>
                                                </Grid>
                                                <Grid item container lg={4}>
                                                    <Typography sx={{ cursor: "pointer" }}
                                                        onClick={() => handelDeletedSub(item.id)}
                                                        variant="h1" color={colors.red.main}><Image src={Trash}
                                                            alt={'icons'} />
                                                        <span style={{ color: colors.black.main }}></span></Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid></>
                                ))}

                            </>
                        ))}
                    </Grid>
                    {/*AddCategory*/}
                    <Modal
                        open={OpenModalAddCategory}
                        onClose={handelCloseModalAddCategory}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} width={{ lg: 800 }}>
                            <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                sm={12} bgcolor={'white.main'}>
                                <List sx={{ width: '100%' }}>
                                    <form onSubmit={formiksAddCategory.handleSubmit} style={{ width: '100%' }}>
                                        <Grid item container lg={12} p={2}>

                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-15px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    عنوان متن :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    minRows={0}
                                                    multiline
                                                    id="title"
                                                    name="title"
                                                    value={formiksAddCategory.values.title}
                                                    onChange={formiksAddCategory.handleChange}
                                                    onBlur={formiksAddCategory.handleBlur}
                                                    error={formiksAddCategory.touched.title && Boolean(formiksAddCategory.errors.title)}
                                                    helperText={formiksAddCategory.touched.title && formiksAddCategory.errors.title}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item container lg={12} justifyContent={'end'} p={2}>
                                            <MTButton submite type="submit">
                                                {loading ? "در حال ارسال..." : "ثبت "}
                                            </MTButton>
                                        </Grid>
                                    </form>
                                </List>
                            </Grid>
                        </Box>
                    </Modal>

                    {/* SubCate */}
                    <Modal
                        open={OpenModalAddSubCategory}
                        onClose={handelCloseModalAddSubCategory}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>

                            <Box sx={style} width={{ lg: 800 }}>
                                <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                    sm={12} bgcolor={'white.main'}>
                                    <Grid item container lg={12} >
                                        <Typography color={'black.main'}>اضافه کردن زیر دسته</Typography>
                                    </Grid>
                                    <hr />
                                    <List sx={{ width: '100%' }}>
                                        <form onSubmit={formiksAddSubCategory.handleSubmit} style={{ width: '100%' }}>
                                            <Grid item container lg={12} >
                                                <Grid item container lg={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                                            id="demo-controlled-open-select-label">انتخاب دسته</InputLabel>
                                                        <Select
                                                            labelId="demo-controlled-open-select-label"
                                                            name="gens"
                                                            native
                                                            defaultValue=""
                                                            id="gens"
                                                            value={CategoryIdForSub}
                                                            onChange={(e: any) => setIdCategoryNamesForSub(e.target.value)}
                                                            // onBlur={formiks.handleBlur}
                                                            // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                                            label="انتخاب دسته"
                                                            sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                                            <>
                                                                <option aria-label="None" value="" />
                                                                {Category?.map((item) => (
                                                                    <>
                                                                        <option value={item.id} key={item.id}>{item.categoryName}</option>
                                                                    </>
                                                                ))}
                                                            </>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            عنوان متن :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            minRows={0}
                                                            multiline
                                                            id="title"
                                                            name="title"
                                                            value={formiksAddSubCategory.values.title}
                                                            onChange={formiksAddSubCategory.handleChange}
                                                            onBlur={formiksAddSubCategory.handleBlur}
                                                            error={formiksAddSubCategory.touched.title && Boolean(formiksAddSubCategory.errors.title)}
                                                            helperText={formiksAddSubCategory.touched.title && formiksAddSubCategory.errors.title}
                                                        />
                                                    </FormControl></Grid>
                                            </Grid>
                                            <Grid item container lg={12} justifyContent={'end'} mt={2} p={2}>
                                                <MTButton submite type="submit">
                                                    {loading ? "در حال ارسال..." : "ثبت "}
                                                </MTButton>
                                            </Grid>
                                        </form>
                                    </List>
                                </Grid>
                            </Box>
                        </>
                    </Modal>

                    {/*EditCategory*/}
                    <Modal
                        open={opens}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} width={{ lg: 800 }}>
                            <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                sm={12} bgcolor={'white.main'}>

                                <List sx={{ width: '100%' }}>

                                    <form onSubmit={formiksEditeCategory.handleSubmit} style={{ width: '100%' }}>
                                        <Grid item container lg={12} p={2}>

                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-15px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    عنوان متن :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    id="title"
                                                    name="title"
                                                    value={formiksEditeCategory.values.title}
                                                    onChange={formiksEditeCategory.handleChange}
                                                    onBlur={formiksEditeCategory.handleBlur}
                                                    error={formiksEditeCategory.touched.title && Boolean(formiksEditeCategory.errors.title)}
                                                    helperText={formiksEditeCategory.touched.title && formiksEditeCategory.errors.title}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item container lg={12} justifyContent={'end'} p={2}>
                                            <MTButton submite type="submit">ثبت</MTButton>
                                        </Grid>
                                    </form>
                                </List>
                            </Grid>
                        </Box>
                    </Modal>

                    <Grid item container lg={10} mt={10} overflow={'auto'}>
                        <Grid item container lg={12} p={2} justifyContent={'space-between'} alignItems={'center'}
                            mt={2}>
                            <Typography variant={'h1'}>افزدون کالا :</Typography>
                        </Grid>

                        <Grid item container lg={12} mb={{ lg: 8 }} alignItems={'center'}>
                            <Grid item container lg={4} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                        id="demo-controlled-open-select-label">انتخاب دسته</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        name="gens"
                                        native
                                        defaultValue=""
                                        id="gens"
                                        value={CategoryId}
                                        onChange={(e: any) => setIdCategoryNames(e.target.value)}
                                        // onBlur={formiks.handleBlur}
                                        // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                        label="انتخاب دسته"
                                        sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                        <>
                                            <option aria-label="None" value="" />
                                            {Category?.map((item) => (
                                                <>
                                                    <option value={item.id} key={item.id}>{item.categoryName}</option>
                                                </>
                                            ))}
                                        </>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item container lg={4} p={2}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                        id="demo-controlled-open-select-label">انتخاب زیر دسته</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        name="gens"
                                        native
                                        defaultValue=""
                                        id="gens"
                                        value={CategoryIdForSubAddProduct}
                                        onChange={(e: any) => setIdCategoryNamesForSubAddProduct(e.target.value)}
                                        // onBlur={formiks.handleBlur}
                                        // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                        label="انتخاب زیر دسته"
                                        sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                        <>
                                            <option aria-label="None" value="" />
                                            {SubCategory?.map((item: any) => (
                                                <>

                                                    {item.subCategories.map((item: any) => (
                                                        <>
                                                            <option value={item.id} key={item.id}>{item.subCategoryName}</option>

                                                        </>
                                                    ))}

                                                </>
                                            ))}
                                        </>
                                    </Select>


                                </FormControl>
                            </Grid>



                            <Grid item container lg={4} justifyContent={'end'} alignItems={'center'}>
                                <MTButton submite onClick={ShowModalProduct} sx={{ marginTop: 2, height: '3.3rem' }}>اضافه
                                    کردن محصول</MTButton>
                            </Grid>
                        </Grid>
                        <Grid>
                        </Grid>

                        <Grid item container lg={12} xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"} borderRadius={2} boxShadow={5} justifyContent={"space-between"}>
                            <Grid container item justifyContent={'space-around'} rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 10 }} sx={{ overflow: 'hidden', }}>
                                {Products?.slice((page - 1) * productsPerPage, page * productsPerPage).map((item: any, index: any) => (

                                    <>
                                        <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                            display: "flex", justifyContent: "space-between",
                                            flexDirection: "column", alignItems: "center"
                                        }} xs={2} sm={12} lg={4} md={6}>
                                            <Box className={'box'} key={index} ref={boxRef} my={4}>
                                                <Card className={'shadow'} ref={elRef}
                                                    sx={{
                                                        width: '290px',
                                                        height: (item?.gheymat) ? '360px' : '380px',
                                                        borderRadius: '1rem',
                                                        outline: "none",
                                                        border: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: "end",
                                                        transition: 'box-shadow 0.3s',
                                                        boxShadow: 5,
                                                        '&:hover': {
                                                            cursor: "pointer",
                                                            boxShadow: 2,
                                                        },

                                                    }}>
                                                    <Grid item container lg={12}>
                                                        {item?.darsadeTakhfif && (
                                                            <Box sx={{ width: '40px', height: '30px', backgroundColor: 'red.main', display: 'flex', justifyContent: 'center', alignItems: 'end', borderRadius: ' 1rem 0px 1rem 0px', position: 'absolute', zIndex: 1, }}>
                                                                <Typography gutterBottom variant="caption" component="h2" color={'white.main'}>
                                                                    {item?.darsadeTakhfif} %
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                    <CardMedia
                                                        sx={{
                                                            position: 'absolute',
                                                            top: "0",
                                                            right: "0",
                                                            minHeight: 200,
                                                            maxHeight: 200,
                                                            borderRadius: '1rem'
                                                        }}
                                                        component="img"
                                                        image={`${url}/${item.image}`}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent sx={{ position: 'relative', width: '100%' }}>
                                                        {(item?.gheymat) ? (
                                                            <>
                                                                <Grid item container lg={12} mt={2} flexDirection={'column'} >
                                                                    <Grid item container lg={12} alignItems={'end'} justifyContent={'center'} >
                                                                        <Typography gutterBottom variant="h1" component="h2">
                                                                            {item?.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                        <Grid item container lg={3} >
                                                                            <Typography gutterBottom variant="h1" component="h2">
                                                                                قیمت :
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item container lg={9} justifyContent={'end'}>
                                                                            <Typography gutterBottom variant="h1" component="h2" >
                                                                                {item?.isTakhfif ? (
                                                                                    <>
                                                                                        {item?.gheymatNahai?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

                                                                                    </>
                                                                                )}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {
                                                                        !item.isTakhfif && (
                                                                            <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                                <Grid item container lg={4} justifyContent={'start'}>
                                                                                    <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                                                        موجودی :
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item container lg={8} justifyContent={'end'}>
                                                                                    <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                                                        {item?.tedad}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        )
                                                                    }

                                                                </Grid>
                                                                {item?.isTakhfif && (
                                                                    <>
                                                                        <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                            <Grid item container lg={4} justifyContent={'start'}>
                                                                                <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                                                    موجودی :  {item?.tedad}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item container lg={8} justifyContent={'end'}>
                                                                                <Typography gutterBottom variant="caption" component="h2" color={'grey.500'} style={{ textDecoration: "line-through" }}>
                                                                                    {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </>
                                                                )}
                                                            </>

                                                        ) : (<>
                                                            <Grid item container lg={12} flexDirection={'column'} >
                                                                <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                    {/* <Grid item container lg={3}>
                                                                        <Typography gutterBottom variant="h1" component="h2">
                                                                            محصول :
                                                                        </Typography>
                                                                    </Grid> */}
                                                                    <Grid item container lg={12} justifyContent={'center'}>
                                                                        <Typography gutterBottom variant="h1" component="h2" >
                                                                            {item?.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                    <Grid item container lg={3}>
                                                                        <Typography gutterBottom variant="h1" component="h2">
                                                                            موجودی :
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item container lg={9} justifyContent={'start'}>
                                                                        <Typography gutterBottom variant="h1" component="h2" >
                                                                            {item?.tedad}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                {/* <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                    <Grid item container lg={4} justifyContent={'start'}>
                        <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                            موجودی :
                        </Typography>
                    </Grid>
                    <Grid item container lg={8} justifyContent={'start'}>
                        <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                            {item?.tedad}
                        </Typography>
                    </Grid>
                </Grid> */}
                                                                <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                                    <Grid item container lg={12}>
                                                                        <Typography gutterBottom variant="h1" component="h2">
                                                                            توضیحات :
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item container lg={12} justifyContent={'start'}>
                                                                        <Typography gutterBottom variant="caption" component="h2" >
                                                                            {item?.description}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>


                                                            </Grid>
                                                        </>)}

                                                        <Grid item container lg={12} justifyContent={'center'} mt={{ lg: 2 }}>
                                                            <Button>
                                                                <Image src={Edite} alt={'icons'} onClick={() => handleEditProduct(item.id)} />
                                                            </Button>
                                                            <Button>
                                                                <Image src={Trash} onClick={() => handleDeleteProduct(item.id)} alt={'icons'} />
                                                            </Button>
                                                        </Grid>

                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Grid>
                                    </>
                                ))}

                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                {Products && Products.length > 0 && (
                                    <Pagination count={Math.ceil(Products.length / productsPerPage)} page={page} onChange={handleChangePage} />
                                )}
                            </Box>

                        </Grid>
                        {/*AddProduct*/}
                        <Modal
                            open={ModalProduct}
                            onClose={handleCloseModalProduct}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} width={{ lg: 1200 }} minHeight={{ lg: '90vh' }} maxHeight={{ lg: '80vh' }} >
                                <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                    sm={12} bgcolor={'white.main'}>
                                    <Grid item container lg={12} justifyContent={'center'}>
                                        <Typography color={'black.main'}>اضافه کردن محصول در دسته{nameof?.map((item: any) => item?.subCategoryName)}</Typography>
                                    </Grid>
                                    <List sx={{ width: '100%' }}>
                                        <form onSubmit={formiksAdd.handleSubmit} style={{ width: '100%' }}>
                                            <React.Fragment>
                                                <Grid item container lg={12} p={2}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            عنوان :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="title"
                                                            id='title'
                                                            value={formiksAdd.values.title}
                                                            onChange={formiksAdd.handleChange}
                                                            onBlur={formiksAdd.handleBlur}
                                                            error={formiksAdd.touched.title && Boolean(formiksAdd.errors.title)}
                                                            helperText={formiksAdd.touched.title && formiksAdd.errors.title}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} p={2}>
                                                    <FormControl sx={{ width: { lg: '100%', xs: 220, md: 350 } }}>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",
                                                        }} shrink htmlFor="bootstrap-input">
                                                        </InputLabel>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            {!uploadedFileNameEdit && (
                                                                <MTButton
                                                                    selectimages
                                                                    sx={{
                                                                        width: "100%",
                                                                        height: "45px",
                                                                        boxShadow: "none",
                                                                    }}
                                                                    startIcon={<CloudUploadRoundedIcon />}
                                                                    variant="contained"
                                                                    component="label"
                                                                >
                                                                    <Typography variant={'h1'} color={'black.main'}>انتخاب
                                                                        عکس</Typography>
                                                                    <input
                                                                        hidden
                                                                        accept="image/*"
                                                                        multiple
                                                                        type="file"
                                                                        onChange={handleFileUploadsEdit}
                                                                    />
                                                                </MTButton>
                                                            )}
                                                            {uploadedFileNameEdit && (
                                                                <TextField
                                                                    variant="outlined"
                                                                    value={uploadedFileNameEdit}
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
                                                                                    onClick={handleClickClearEdit}
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
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} p={2} justifyContent={'space-between'}>
                                                    <FormControl>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            تعداد :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="Tedad"
                                                            id='Tedad'
                                                            type={'number'}
                                                            value={formiksAdd.values.Tedad}
                                                            onChange={formiksAdd.handleChange}
                                                            onBlur={formiksAdd.handleBlur}
                                                            error={formiksAdd.touched.Tedad && Boolean(formiksAdd.errors.Tedad)}
                                                            helperText={formiksAdd.touched.Tedad && formiksAdd.errors.Tedad}
                                                        />
                                                    </FormControl>

                                                    {/* <FormControl>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            قیمت :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="Gheymat"
                                                            id='Gheymat'
                                                            value={Gheymat}
                                                            onChange={(e: any) => setGheymat(e.target.value)}
                                                            // value={formiksAdd.values.Gheymat}
                                                            // onChange={formiksAdd.handleChange}
                                                            onBlur={formiksAdd.handleBlur}
                                                        // error={formiksAdd.touched.Gheymat && Boolean(formiksAdd.errors.Gheymat)}
                                                        // helperText={formiksAdd.touched.Gheymat && formiksAdd.errors.Gheymat}
                                                        />
                                                    </FormControl> */}

                                                    {/* <FormControl >
                                                        <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                                            id="demo-controlled-open-select-label">انتخاب دسته</InputLabel>
                                                        <Select
                                                            labelId="demo-controlled-open-select-label"
                                                            name="gens"
                                                            native
                                                            defaultValue=""
                                                            id="gens"
                                                            value={CategoryIdProdcutADD}
                                                            onChange={(e: any) => setIdCategoryNamesProductAdd(e.target.value)}
                                                            // onBlur={formiks.handleBlur}
                                                            // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                                            label="انتخاب دسته"
                                                            sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                                            <>
                                                                <option aria-label="None" value="" />
                                                                {Category?.map((item) => (
                                                                    <>
                                                                        <option value={item.id} key={item.id}>{item.categoryName}</option>
                                                                    </>
                                                                ))}
                                                            </>
                                                        </Select>
                                                    </FormControl> */}

                                                </Grid>

                                                <Grid item container lg={12} p={2} color={'black.main'} alignItems={'center'}
                                                    justifyContent={''}>
                                                    <Typography ml={{ lg: 2 }} color={'black.main'} id="demo-error-radios" variant={'h1'}>ایا قیمت دارد ؟</Typography>
                                                    <RadioGroup
                                                        row
                                                        sx={{ marginRight: { lg: 2 }, color: 'black.main' }}
                                                        name="quiz"
                                                        value={valueGheymat}
                                                        onChange={handleRadioChangeGheymat}
                                                    >
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl',
                                                            marginLeft: { lg: 3 },
                                                            '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="best" label="بله" control={<Radio />} />
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl', '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="worst" control={<Radio />} label="خیر" />
                                                    </RadioGroup>

                                                    {valueGheymat == 'best' && (
                                                        <>
                                                            <Grid item container justifyContent={'space-between'} mt={{ lg: 3 }} mb={{ lg: 3 }} lg={12}>
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        قیمت :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        name="Gheymat"
                                                                        id='Gheymat'
                                                                        value={Gheymat}
                                                                        onChange={(e: any) => setGheymat(e.target.value)}
                                                                        // value={formiksAdd.values.Gheymat}
                                                                        // onChange={formiksAdd.handleChange}
                                                                        onBlur={formiksAdd.handleBlur}
                                                                    // error={formiksAdd.touched.Gheymat && Boolean(formiksAdd.errors.Gheymat)}
                                                                    // helperText={formiksAdd.touched.Gheymat && formiksAdd.errors.Gheymat}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                        </>
                                                    )}
                                                </Grid>
                                                <Grid item container lg={12} p={2} color={'black.main'} alignItems={'center'}
                                                    justifyContent={''}>
                                                    <Typography ml={{ lg: 2 }} color={'black.main'} id="demo-error-radios" variant={'h1'}>ایا تخفیف دارد ؟</Typography>
                                                    <RadioGroup
                                                        row
                                                        sx={{ marginRight: { lg: 2 }, color: 'black.main' }}
                                                        name="quiz"
                                                        value={valueTakhfif}
                                                        onChange={handleRadioChangeTakhfif}
                                                    >
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl',
                                                            marginLeft: { lg: 3 },
                                                            '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="best" label="بله" control={<Radio />} />
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl', '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="worst" control={<Radio />} label="خیر" />
                                                    </RadioGroup>

                                                    {valueTakhfif == 'best' && (
                                                        <>
                                                            <Grid item container justifyContent={'space-between'} mt={{ lg: 3 }} mb={{ lg: 3 }} lg={12}>
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        درصد تخفیف :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        name="DarsadeTakhfif"
                                                                        id='DarsadeTakhfif'
                                                                        value={DarsadeTakhfif}
                                                                        onChange={(e: any) => setDarsadeTakhfif(e.target.value)}
                                                                    />
                                                                </FormControl>
                                                                {/*<FormControl>*/}
                                                                {/*    <InputLabel sx={{*/}
                                                                {/*        marginTop: "-15px",*/}
                                                                {/*        fontFamily: 'Yekan Bakh Medium',*/}
                                                                {/*        fontSize: "1.2rem",*/}
                                                                {/*        fontWeight: "bold !important",*/}
                                                                {/*        color: colors.black.main + "!important",*/}

                                                                {/*    }} shrink htmlFor="bootstrap-input">*/}
                                                                {/*        قیمت تخفیف :*/}
                                                                {/*    </InputLabel>*/}
                                                                {/*    <MInput*/}
                                                                {/*        textarea*/}
                                                                {/*        minRows={0}*/}
                                                                {/*        multiline*/}
                                                                {/*        name="GheymatTakhfif"*/}
                                                                {/*        id='GheymatTakhfif'*/}
                                                                {/*        value={GheymatTakhfif}*/}
                                                                {/*        onChange={(e:any)=>setGheymatTakhfif(e.target.value)}*/}
                                                                {/*    />*/}
                                                                {/*</FormControl>*/}
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        قیمت نهایی :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        minRows={0}
                                                                        multiline
                                                                        name="email"
                                                                        value={(Gheymat * DarsadeTakhfif / 100 - Gheymat)}
                                                                    // value={formiksAdd?.values?.Gheymat}
                                                                    // value={profile?.title}
                                                                    // value={`${EditData?.title || ''}${formiks.values.pass || ''}`}
                                                                    // onChange={handleChange}
                                                                    // error={formiks.touched.pass && Boolean(formiks.errors.pass)}
                                                                    // helperText={formiks.touched.pass && formiks.errors.pass}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                        </>
                                                    )}
                                                </Grid>

                                                <Grid item container lg={12} p={2}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            توضیحات :
                                                        </InputLabel>
                                                        <MInput
                                                            textarea
                                                            minRows={5}
                                                            maxRows={5}
                                                            multiline
                                                            id="Description"
                                                            name="Description"
                                                            value={formiksAdd.values.Description}
                                                            onChange={formiksAdd.handleChange}
                                                            onBlur={formiksAdd.handleBlur}
                                                            error={formiksAdd.touched.Description && Boolean(formiksAdd.errors.Description)}
                                                            helperText={formiksAdd.touched.Description && formiksAdd.errors.Description}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} justifyContent={'end'} p={2}>
                                                    <MTButton submite type="submit">
                                                        {loading ? "در حال ارسال..." : "ثبت "}
                                                    </MTButton>
                                                </Grid>

                                            </React.Fragment>
                                        </form>
                                    </List>
                                </Grid>
                            </Box>
                        </Modal>


                        {/*AddProduct*/}
                        <Modal
                            open={ModalProductEdit}
                            onClose={handleCloseModalProductEdit}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} width={{ lg: 1200 }} minHeight={{ lg: '90vh' }} maxHeight={{ lg: '80vh' }} >
                                <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                    sm={12} bgcolor={'white.main'}>
                                    <Grid item container lg={12} justifyContent={'center'}>
                                        <Typography color={'black.main'}>ویرایش کردن محصول در دسته {nameof?.map((item: any) => item?.subCategoryName)}</Typography>
                                    </Grid>
                                    <List sx={{ width: '100%' }}>
                                        <form onSubmit={formiksEditProduct.handleSubmit} style={{ width: '100%' }}>
                                            <React.Fragment>
                                                <Grid item container lg={12} p={2}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            عنوان :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="title"
                                                            id='title'
                                                            value={name?.name}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} p={2}>
                                                    <FormControl sx={{ width: { lg: '100%', xs: 220, md: 350 } }}>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",
                                                        }} shrink htmlFor="bootstrap-input">
                                                        </InputLabel>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            {!uploadedFileNameEdit && (
                                                                <MTButton
                                                                    selectimages
                                                                    sx={{
                                                                        width: "100%",
                                                                        height: "45px",
                                                                        boxShadow: "none",
                                                                    }}
                                                                    startIcon={<CloudUploadRoundedIcon />}
                                                                    variant="contained"
                                                                    component="label"
                                                                >
                                                                    <Typography variant={'h1'} color={'black.main'}>انتخاب
                                                                        عکس</Typography>
                                                                    <input
                                                                        hidden
                                                                        accept="image/*"
                                                                        multiple
                                                                        type="file"
                                                                        onChange={handleFileUploadsEdit}
                                                                    />
                                                                </MTButton>
                                                            )}
                                                            {uploadedFileNameEdit && (
                                                                <TextField
                                                                    variant="outlined"
                                                                    value={uploadedFileNameEdit}
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
                                                                                    onClick={handleClickClearEdit}
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
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} p={2} justifyContent={'space-between'}>
                                                    <FormControl>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            تعداد :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="Tedad"
                                                            id='Tedad'
                                                            type={'number'}
                                                            value={tedad?.tedad}
                                                            onChange={handleChangetedad}
                                                        />
                                                    </FormControl>

                                                    {/* <FormControl>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            قیمت :
                                                        </InputLabel>
                                                        <MInput
                                                            popup
                                                            name="Gheymat"
                                                            id='Gheymat'
                                                            value={gheymate?.gheymate}
                                                            onChange={handleChangegheymate}
                                                            // value={formiksAdd.values.Gheymat}
                                                            // onChange={formiksAdd.handleChange}
                                                            onBlur={formiksAdd.handleBlur}
                                                        // error={formiksAdd.touched.Gheymat && Boolean(formiksAdd.errors.Gheymat)}
                                                        // helperText={formiksAdd.touched.Gheymat && formiksAdd.errors.Gheymat}
                                                        />
                                                    </FormControl> */}

                                                    {/* <FormControl >
                                                        <InputLabel sx={{ color: 'black.main', fontFamily: 'Shabname' }}
                                                            id="demo-controlled-open-select-label">انتخاب دسته</InputLabel>
                                                        <Select
                                                            labelId="demo-controlled-open-select-label"
                                                            name="gens"
                                                            native
                                                            defaultValue=""
                                                            id="gens"
                                                            value={CategoryIdProdcutADDEdit}
                                                            onChange={(e: any) => setIdCategoryNamesProductAddEdit(e.target.value)}
                                                            // onBlur={formiks.handleBlur}
                                                            // error={formiks.touched.gens && Boolean(formiks.errors.gens)}
                                                            label="انتخاب دسته"
                                                            sx={{ width: '16rem', height: '3.2rem', fontFamily: 'Shabname' }}>
                                                            <>
                                                                <option aria-label="None" value="" />
                                                                {Category?.map((item) => (
                                                                    <>
                                                                        <option value={item.id} key={item.id}>{item.categoryName}</option>
                                                                    </>
                                                                ))}
                                                            </>
                                                        </Select>
                                                    </FormControl> */}

                                                </Grid>

                                                {/* edite */}
                                                <Grid item container lg={12} p={2} color={'black.main'} alignItems={'center'}
                                                    justifyContent={''}>
                                                    <Typography ml={{ lg: 2 }} color={'black.main'} id="demo-error-radios" variant={'h1'}>ایا قیمت دارد ؟</Typography>
                                                    <RadioGroup
                                                        row
                                                        sx={{ marginRight: { lg: 2 }, color: 'black.main' }}
                                                        name="quiz"
                                                        value={valueGheymat}
                                                        onChange={handleRadioChangeGheymat}
                                                    >
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl',
                                                            marginLeft: { lg: 3 },
                                                            '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="best" label="بله" control={<Radio />} />
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl', '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="worst" control={<Radio />} label="خیر" />
                                                    </RadioGroup>

                                                    {valueGheymat == 'best' && (
                                                        <>
                                                            <Grid item container justifyContent={'space-between'} mt={{ lg: 3 }} mb={{ lg: 3 }} lg={12}>
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        قیمت :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        name="Gheymat"
                                                                        id='Gheymat'
                                                                        value={gheymate?.gheymate}
                                                                        onChange={handleChangegheymate}
                                                                        // value={formiksAdd.values.Gheymat}
                                                                        // onChange={formiksAdd.handleChange}
                                                                        onBlur={formiksAdd.handleBlur}
                                                                    // error={formiksAdd.touched.Gheymat && Boolean(formiksAdd.errors.Gheymat)}
                                                                    // helperText={formiksAdd.touched.Gheymat && formiksAdd.errors.Gheymat}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                        </>
                                                    )}
                                                </Grid>

                                                <Grid item container lg={12} p={2} color={'black.main'} alignItems={'center'}
                                                    justifyContent={''}>
                                                    <Typography ml={{ lg: 2 }} color={'black.main'} id="demo-error-radios" variant={'h1'}>ایا تخفیف دارد ؟</Typography>
                                                    <RadioGroup
                                                        row
                                                        sx={{ marginRight: { lg: 2 }, color: 'black.main' }}
                                                        name="quiz"
                                                        value={istakhfifedit}
                                                        onChange={handleRadioChangeTakhfifedit}
                                                    >
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl',
                                                            marginLeft: { lg: 3 },
                                                            '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="best" label="بله" control={<Radio />} />
                                                        <FormControlLabel sx={{
                                                            direction: 'rtl', '& .MuiFormControlLabel-label': {
                                                                color: 'black.main',
                                                                fontWeight: 900,
                                                                lineHeight: 1.2
                                                            }
                                                        }} value="worst" control={<Radio />} label="خیر" />
                                                    </RadioGroup>

                                                    {istakhfifedit == 'best' && (
                                                        <>
                                                            <Grid item container justifyContent={'space-between'} mt={{ lg: 3 }} mb={{ lg: 3 }} lg={12}>
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        درصد تخفیف :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        name="DarsadeTakhfif"
                                                                        id='DarsadeTakhfif'
                                                                        value={darsadtakhfif?.darsadtakhfif}
                                                                        onChange={handleChangedarsadtakhfif}
                                                                    />
                                                                </FormControl>
                                                                {/*<FormControl>*/}
                                                                {/*    <InputLabel sx={{*/}
                                                                {/*        marginTop: "-15px",*/}
                                                                {/*        fontFamily: 'Yekan Bakh Medium',*/}
                                                                {/*        fontSize: "1.2rem",*/}
                                                                {/*        fontWeight: "bold !important",*/}
                                                                {/*        color: colors.black.main + "!important",*/}

                                                                {/*    }} shrink htmlFor="bootstrap-input">*/}
                                                                {/*        قیمت تخفیف :*/}
                                                                {/*    </InputLabel>*/}
                                                                {/*    <MInput*/}
                                                                {/*        textarea*/}
                                                                {/*        minRows={0}*/}
                                                                {/*        multiline*/}
                                                                {/*        name="GheymatTakhfif"*/}
                                                                {/*        id='GheymatTakhfif'*/}
                                                                {/*        value={GheymatTakhfif}*/}
                                                                {/*        onChange={(e:any)=>setGheymatTakhfif(e.target.value)}*/}
                                                                {/*    />*/}
                                                                {/*</FormControl>*/}
                                                                <FormControl>
                                                                    <InputLabel sx={{
                                                                        marginTop: "-15px",
                                                                        fontFamily: 'Yekan Bakh Medium',
                                                                        fontSize: "1.2rem",
                                                                        fontWeight: "bold !important",
                                                                        color: colors.black.main + "!important",

                                                                    }} shrink htmlFor="bootstrap-input">
                                                                        قیمت نهایی :
                                                                    </InputLabel>
                                                                    <MInput
                                                                        popup
                                                                        minRows={0}
                                                                        multiline
                                                                        name="email"
                                                                        value={(Number(gheymate.gheymate) * Number(darsadtakhfif.darsadtakhfif) / 100 - Number(gheymate.gheymate))}
                                                                    // value={formiksAdd?.values?.Gheymat}
                                                                    // value={profile?.title}
                                                                    // value={`${EditData?.title || ''}${formiks.values.pass || ''}`}
                                                                    // onChange={handleChange}
                                                                    // error={formiks.touched.pass && Boolean(formiks.errors.pass)}
                                                                    // helperText={formiks.touched.pass && formiks.errors.pass}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                        </>
                                                    )}
                                                </Grid>

                                                <Grid item container lg={12} p={2}>
                                                    <FormControl fullWidth>
                                                        <InputLabel sx={{
                                                            marginTop: "-15px",
                                                            fontFamily: 'Yekan Bakh Medium',
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold !important",
                                                            color: colors.black.main + "!important",

                                                        }} shrink htmlFor="bootstrap-input">
                                                            توضیحات :
                                                        </InputLabel>
                                                        <MInput
                                                            textarea
                                                            minRows={5}
                                                            maxRows={5}
                                                            multiline
                                                            id="Description"
                                                            name="Description"
                                                            value={description?.descriptions}
                                                            onChange={handleChangdescripton}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item container lg={12} justifyContent={'end'} p={2}>
                                                    <MTButton submite type="submit">
                                                        {loading ? "در حال ارسال..." : "ثبت "}
                                                    </MTButton>
                                                </Grid>

                                            </React.Fragment>
                                        </form>
                                    </List>
                                </Grid>
                            </Box>
                        </Modal>

                    </Grid>
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
