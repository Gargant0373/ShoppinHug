import { Box, Button, Card, CardContent, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { login } from "../api/user";
import User from "../types/user";

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookies = async () => {
            const username = Cookies.get("user");
            const password = Cookies.get("password");

            if (username && password) {
                const user = { name: username, password: password } as User;
                try {
                    const res = await login(user);
                    if (res.status === 200) {
                        navigate('/shop');
                    } else {
                        Cookies.remove("user");
                        Cookies.remove("password");
                    }
                } catch (err) {
                    console.error('Login check failed:', err);
                }
            }
        };

        checkCookies();
    }, [navigate]);

    const handleSubmit = async () => {
        if (!username || !password) {
            setSnackbarMessage("Please fill in both fields.");
            setSnackbarOpen(true);
            return;
        }

        try {
            const user = { name: username, password: password };
            const res = await login(user);

            if (res.status !== 200) {
                setSnackbarMessage('Login failed. Please check your credentials.');
                setSnackbarOpen(true);
                return;
            }

            Cookies.set("user", username, { expires: 7 });
            Cookies.set("password", password, { expires: 7 });
            navigate('/shop');
        } catch (err) {
            console.error('Login failed:', err);
            setSnackbarMessage('An error occurred during login.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container alignItems="center" justifyContent="center" height="100vh" sx={{ position: 'relative', padding: 2 }}>
            <Card sx={{
                width: {
                    xs: "90%",
                    sm: "80%",
                    md: "40%",
                },
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: 'center',
            }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
            <Box
                component="img"
                sx={{
                    position: 'absolute',
                    width: {
                        xs: "100%",
                        sm: "50%",
                        md: "40%",
                    },
                    top: 0,
                    right: 0,
                    zIndex: -1,
                    opacity: 0.1,
                }}
                src="login_shopping.png"
                alt="login background"
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Grid>
    );
}

export default Login;
