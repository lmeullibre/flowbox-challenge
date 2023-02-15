import { createTheme } from '@mui/material';

const text = {
    primary: '#32332E',
    secondary: '#615F5B'
};

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        background: {
            default: "#FBFAF8"
        },
        text,
        primary: {
            main: '#8E9882'
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #E7E3D9',
                    boxShadow: "none",
                    borderRadius: "8px"
                }
            }
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif',
        ].join(','),

        h2: {
            fontWeight: 600,
            fontSize: '36px',
            lineHeight: "43.88px"
        }
    }

});