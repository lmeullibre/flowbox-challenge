import React, { createContext, FC, forwardRef, useContext, useEffect, useState } from 'react';
import { Box, Card, CardMedia, Container, Grid, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PokemonContext } from './App';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const ListMode: FC = () => {
    const pokemon = useContext(PokemonContext);
    const [pokemonDetails, setPokemonDetails] = useState<{ [id: string]: string }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            const promises = pokemon.map(async (p) => {
                const response = await axios.get(p.url);
                const data = response.data;
                const flavorTextResponse = await axios.get(data.species.url);
                const flavorTextData = flavorTextResponse.data;
                const flavorText = flavorTextData.flavor_text_entries
                    .find((entry: any) => entry.language.name === 'en')
                    .flavor_text.replace(/[\n\f]/g, ' ');
                return { id: data.id, flavorText };
            });
            const results = await Promise.all(promises);
            const details = results.reduce((acc: any, result) => {
                acc[result.id] = result.flavorText;
                return acc;
            }, {});
            setPokemonDetails(details);
            setIsLoading(false);
        };
        setIsLoading(true);
        fetchDetails();
    }, [pokemon]);

    return (
        <Container maxWidth="sm">
            <Box alignItems={"center"} display="flex" flexDirection="column" gap={2}>
                {pokemon.map(p => {
                    return (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} >
                                <Card >
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        component="img"
                                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url.split('/')[6]}.png`}
                                    >
                                    </CardMedia>
                                </Card>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {
                                    !isLoading &&
                                    <Typography>
                                        <Typography>{pokemonDetails[p.url.split('/')[6]]}</Typography>
                                    </Typography>
                                }
                                {
                                    isLoading &&
                                    <CircularProgress></CircularProgress>
                                }
                            </Grid>
                        </Grid>
                    )
                }
                )}
            </Box>
        </Container>
    );
}

export default ListMode;
