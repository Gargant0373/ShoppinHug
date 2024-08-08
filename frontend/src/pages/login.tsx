import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import User from "../types/user";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        let username = Cookies.get("user");
        let password = Cookies.get("password");
        let user = { name: username, password: password } as User;
        login(user).then((res) => {
            if (res.status == 200) navigate('/shop');
            else {
                Cookies.remove("user");
                Cookies.remove("password");
            }
        });
    }, [navigate]);

    const handleSubmit = () => {
        let user = { name: username, password: password };
        login(user).then((res) => {
            let status = res.status;
            if (status != 200) {
                alert(res.data);
                return;
            }
            
            Cookies.set("user", username, { expires: 7 });
            Cookies.set("password", password, { expires: 7 });

            navigate('/shop');
        })
    };

    return (
        <Grid container display="flex" justifyContent="center" alignItems="center" height="90vh">
            <Card sx={{
                width: {
                    xs: "90%",
                    md: "30%",
                },
            }}>
                <CardContent>
                    <Grid container display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Grid item display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h3" borderBottom="3px solid black">LOGIN</Typography>
                        </Grid>
                        <Grid item marginTop="15px">
                            <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                        <Grid item marginTop="5px">
                            <TextField label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid item marginTop="20px">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Box component="img" position="absolute" height="auto"
                sx={{
                    width: {
                        xs: "100%",
                        md: "40%",
                    },
                    top: {
                        xs: "55%",
                        md: "50%",
                    },
                    right: {
                        xs: "20%",
                        md: "40%",
                    },
                    zIndex: -1,
                }} src="login_shopping.png" alt="login" />
        </Grid >
    );
}
export default Login;