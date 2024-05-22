import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import url from '@/Api';

interface Slogan {
    title: string;
    backColor: string;
    color: string;
}

const NavTop = () => {
    const [slogans, setSlogans] = useState<Slogan[]>([]);
    const [randomSlogan, setRandomSlogan] = useState<string>("");
    const [randomBackColor, setRandomBackColor] = useState<string>("");
    const [randomColor, setRandomColor] = useState<string>("");
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/api/Slogan/GetAll`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setSlogans(data.data);
                setDataFetched(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (!dataFetched) {
            fetchData();
        }
    }, [dataFetched]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (slogans.length > 0) {
                const randomIndex = Math.floor(Math.random() * slogans.length);
                setRandomSlogan(slogans[randomIndex].title);
                setRandomBackColor(slogans[randomIndex].backColor);
                setRandomColor(slogans[randomIndex].color);
            }
        }, 4000);
        return () => clearInterval(intervalId);
    }, [slogans]);

    return (
        <Grid item container bgcolor={randomBackColor} lg={12} p={2} style={{ overflow: "hidden" }}>
            <Typography variant="h1" color={randomColor}  style={{ 
                        animation: ' slideRight 20s  linear infinite',


            }}>
                {randomSlogan}
            </Typography>
        </Grid>
    );
};

export default NavTop;
