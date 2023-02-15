import React, { createContext, FC, forwardRef, useContext, useEffect, useState } from 'react';
import { Box, Card, CardMedia, Container, Grid, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PokemonContext } from './App';

const GridMode: FC = () => {
    const pokemon = useContext(PokemonContext);
    return (
        <Grid container spacing={2}>
            {pokemon.map(p => (
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    key={p.name}>
                    <Card >
                        <CardMedia
                            sx={{ height: 200 }}
                            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url.split('/')[6]}.png`}
                        >
                        </CardMedia>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default GridMode;
