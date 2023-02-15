import React, { createContext, FC, forwardRef, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Box, Card, CardMedia, Container, Grid, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { theme } from './theme';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import { Pokemon } from './types';
import { PokemonContext } from './App';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import './app.css';

interface ModeSelectorProps {
    mode: number;
    handleMode: any;
}

const ModeSelector: FC<ModeSelectorProps> = ({ mode, handleMode }) => {
    return (
        <Box>
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleMode}
            >
                <ToggleButton value={1}>
                    <ViewCarouselIcon />
                </ToggleButton>
                <ToggleButton value={2} >
                    <GridViewIcon />
                </ToggleButton>
                <ToggleButton value={3}>
                    <ListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default ModeSelector;
