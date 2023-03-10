import { react, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

import { postRequest } from "../utils/utils"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Login = () => {

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    let auth = false

    const token = localStorage.getItem("token")
    const expiration = localStorage.getItem("expiration")
    if (token !== undefined && new Date().getTime() < expiration) {
        auth = true
    }


    useEffect(() => {
        if (auth) {
            navigate("/clubs")
        }
    }, []);

    const handleClose = (event, reason) => {
        setOpen(false);
    };




    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        await postRequest(`auth`, {
            "email": data.get('email'),
            "password": data.get('password'),
        })
            .then(response => {
                localStorage.setItem("token", response.data?.token)
                localStorage.setItem("expiration", Date.parse(response.data?.expiration))
                navigate("/")
            }).catch(e => {
                setError(true)
                setOpen(true)
                throw e
            })

    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Invalid credentials
                        </Alert>
                    </Snackbar>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default Login;