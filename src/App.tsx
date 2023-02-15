import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Box, Button, Card, CardMedia, Container, Grid, IconButton, LinearProgress, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { theme } from './theme';
import { Pokemon } from './types';
import GridMode from './GridMode';
import ListMode from './ListMode';
import SliderMode from './SliderMode';
import axios from "axios"
import './app.css';
import debounce from 'lodash.debounce';
import ModeSelector from './ModeSelector';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
export const PokemonContext = createContext<Pokemon[]>([]);

function App() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [mode, setMode] = useState<number>(1);

    const handleMode = (
        event: React.MouseEvent<HTMLElement>,
        newMode: number,
    ) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const limit = 20;
            const result = await axios(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            if (offset === 0) {
                setPokemon(result.data.results);
            } else {
                setPokemon(prevPokemon => [...prevPokemon, ...result.data.results]);
            }
        };
        fetchData();
    }, [offset]);

    const handleScroll = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setOffset(offset + 20);
        }
    }, 100);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    padding: 4
                }}>
                <Box >
                    <Typography textAlign={"center"} variant={"h2"}>
                        Sergi's media selector
                    </Typography>
                </Box>
                <Box >
                    <ModeSelector mode={mode} handleMode={handleMode} />
                </Box>

                <Box width={"100%"}>
                    <PokemonContext.Provider value={pokemon}>
                        {
                            mode == 1 &&
                            <SliderMode offset={offset} setOffset={setOffset}></SliderMode>
                        }
                        {
                            mode == 2 &&
                            <GridMode />
                        }
                        {
                            mode == 3 &&
                            <ListMode />
                        }
                    </PokemonContext.Provider>
                </Box>
                {
                    (mode === 2 || mode === 3) && (
                        <Box position="fixed" bottom={4} right={3}>
                            <IconButton
                                onClick={handleScrollToTop}

                            >
                                <ArrowUpwardIcon sx={{ width: "3em", height: "3rem" }} />
                            </IconButton>
                        </Box>
                    )
                }
            </Container>
        </ThemeProvider >
    );
}

export default App;
