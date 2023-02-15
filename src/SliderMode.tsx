import React, { createContext, FC, forwardRef, useContext, useEffect, useState } from 'react';
import { Box, Card, CardMedia, Container, Grid, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PokemonContext } from './App';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import './app.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SliderModeProps {
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SliderMode: FC<SliderModeProps> = ({ offset, setOffset }) => {
    const pokemon = useContext(PokemonContext);
    return (
        <Box>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={16}
                slidesPerView={3}
                navigation
                onReachEnd={() => {
                    setOffset(offset + 20);
                }}
                breakpoints={{
                    1: {
                        slidesPerView: 1,
                    },
                    500: {
                        slidesPerView: 2,
                    },
                    800: {
                        slidesPerView: 4,
                    },
                }}
            >
                {
                    pokemon.map((p) => {
                        return (
                            <SwiperSlide>
                                <Card >
                                    <CardMedia sx={{ height: 200 }}
                                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url.split('/')[6]}.png`}
                                    >
                                    </CardMedia>
                                </Card>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Box>
    );
}

export default SliderMode;
