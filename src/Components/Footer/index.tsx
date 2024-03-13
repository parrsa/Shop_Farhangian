import {Grid, Typography} from "@mui/material";
import Link from "next/link";
import Arrow from '@/Assets/images/Vector 6.svg'
import Image from "next/image";

const Footer=()=>{
    return(
        // <Grid item container lg={12} mt={5} justifyContent={'center'} mb={2}>
        // <Grid item container lg={10} bgcolor={'white.main'} borderRadius={5} boxShadow={5}>
        //     <Grid item container lg={12} >
        //         <Grid item container lg={6} p={10} >1</Grid>
        //         <Grid item container lg={6} p={10} >2</Grid>
        //     </Grid>
        //     <Grid item container lg={12} p={5} >12</Grid>
        // </Grid>
        // </Grid>

            <Grid item container lg={12} bgcolor={'#1E1E1E'} >
                <Grid item container lg={10}>
                    <Grid item container lg={2} mt={{ lg: 2 }} justifyContent={"center"}>
                        <Link href='/'>
                            {/*<img src={logo} alt='logo' about='logo for website' style={{ marginRight: '20px' }} />*/}
                        </Link>
                    </Grid>
                </Grid>

                <Grid item container justifyContent={'space-evenly'} lg={12}>
                    <Grid item container lg={4}  justifyContent={"center"} >
                        <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}} mt={{ lg: 2 }} lg={8} xs={12} sm={12} md={8} justifyContent={{xs:'center' , lg:'start' , sm:'center' , md:'start'}} >
                            <Typography fontSize={{lg: "25px"}} ml={{lg: 1}} alignItems={{lg: "center"}} textAlign={'start'} variant={"h1"}>سایت تعاونی مصرف کارکنان فرهنگیان</Typography>
                        </Grid>
                        <Grid item container lg={8} xs={11} sm={11} mt={{ lg: 2 }} mb={{ lg: 2 }} justifyContent={"start"} >
                            <Typography variant='caption' sx={{ textAlign: "justify", }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container lg={3} xs={6} mt={{xs:2 , lg:0 , md:0}}  justifyContent={{lg:"end" , xs:'center'}}  >
                        {/*<Grid item container borderLeft={{lg: 3, md: 0}} ml={{lg:1}} borderColor={{lg: '#D6C109'}} mt={{ lg: 2 }} alignItems={'center'} mb={2} lg={8} xs={12} >*/}
                        {/*    <Typography fontSize={{lg: "25px"}} ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>لینک های مفید</Typography>*/}
                        {/*</Grid>*/}
                        <Grid item container borderLeft={{lg: 3, md: 0}} ml={{lg:1}} borderColor={{lg: '#D6C109'}} mt={{ lg: 2 }} lg={8} xs={6} >
                            <Typography fontSize={{lg: "25px"}} ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>لینک های مفید</Typography>
                        </Grid>
                        <Grid item container lg={8} mb={6} xs={8}  mt={{lg:2}} mr={{lg:0.5}} justifyContent={"space-evenly"}  flexDirection={'column'} >
                            <Grid item container  alignItems={'center'}>
                                <Image alt={'icon'} src={Arrow} width={20} height={20} />
                                <Link href='/News' style={{border:'none' , textDecoration:"none"}}>
                                    <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>اخبار</Typography>
                                </Link>
                            </Grid>

                            <Grid item container   mt={{lg:2}} alignItems={'center'}>
                                <Image alt={'icon'} src={Arrow} width={20} height={20} />
                                <Link href='/Chart' style={{border:'none' , textDecoration:"none"}}>
                                    <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>چارت سازمانی</Typography>
                                </Link>
                            </Grid>
                            <Grid item container  mt={{lg:2}} alignItems={'center'}>
                                <Image alt={'icon'} src={Arrow} width={20} height={20} />
                                <Link href='/Support' style={{border:'none' , textDecoration:"none"}}>
                                    <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>ارتباط با ما</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item container lg={5} xs={6} justifyContent={{lg:"end" , xs:'center'}} >
                        <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}} mt={{ lg: 2 }} lg={8} xs={6} >
                            <Typography fontSize={{lg: "25px"}} ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>ارتباط با ما</Typography>
                        </Grid>
                        <Grid item container lg={8} xs={11} mb={6} mt={{lg:2}} mr={{lg:0.5}} justifyContent={"space-evenly"}  flexDirection={'column'} >
                            <Grid item container  alignItems={'center'}>
                                {/*<img src={Location} width={20} height={20} />*/}
                                <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>
                                    آدرس : سنندج - خیابان 17 شهریور - سه راهی شیخان  - جنب هنرستان دخترانه ارشاد
                                </Typography>
                            </Grid>
                            <Grid item container   mt={{lg:2}} alignItems={'center'}>
                                {/*<img src={Phone} width={20} height={20} />*/}
                                <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>
                                    <a href={'tel:08733153053'}>
                                    تلفن تماس : 08733153053
                                    </a>
                                </Typography>
                            </Grid>
                            <Grid item container   mt={{lg:2}} alignItems={'center'}>
                                {/*<img src={Message} width={20} height={20} />*/}
                                <Typography  ml={{lg: 1}} alignItems={{lg: "center"}} variant={"h1"}>
                                    <a href={'mailto:someone@example.com'} target={'_blank'}>
                                        khatooni45@gmail.com
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr style={{ display: 'flex', width: '94%' }} />
                </Grid>
            </Grid>


    )
}
export default Footer
