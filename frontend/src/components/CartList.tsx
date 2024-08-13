import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, IconButton, List, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCart, getCarts, removeCart } from '../api/cart';
import Cart from '../types/cart';
import User from '../types/user';

const CartList: React.FC = () => {
    const [user, setUser] = useState({ name: '', password: '' } as User);
    const [carts, setCarts] = useState<Cart[]>([]);
    const [newCartName, setNewCartName] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const fetchedCarts = await getCarts();
                setCarts(fetchedCarts);
            } catch (error) {
                console.error('Error fetching carts:', error);
                setSnackbarMessage('Error fetching carts.');
                setSnackbarOpen(true);
            }
        };
        fetchCarts();

        const fetchUser = async () => {
            let username = Cookies.get('user');
            let password = Cookies.get('password');

            if (!username || !password) {
                navigate('/');
                return;
            }

            let user = { name: username, password: password };

            setUser(user);
        };

        fetchUser();
    }, []);

    const handleCreateCart = async () => {
        if (newCartName.trim() === '') {
            setSnackbarMessage('Cart name cannot be empty.');
            setSnackbarOpen(true);
            return;
        }

        try {
            await addCart(newCartName, user.name);
            setNewCartName('');
            const fetchedCarts = await getCarts();
            setCarts(fetchedCarts);
        } catch (error) {
            console.error('Error creating cart:', error);
            setSnackbarMessage('Error creating cart.');
            setSnackbarOpen(true);
        }
    };

    const handleCartClick = (cartName: string) => {
        navigate(`/cart/${cartName}`);
    };

    const handleRemoveCart = async (cartName: string) => {
        try {
            await removeCart(cartName);
            const fetchedCarts = await getCarts();
            setCarts(fetchedCarts);
        } catch (error) {
            console.error('Error removing cart:', error);
            setSnackbarMessage('Error removing cart.');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container>
            <Typography variant="h4" marginTop="15px" gutterBottom>
                Cart List
            </Typography>
            <TextField
                label="New Cart Name"
                variant="outlined"
                fullWidth
                value={newCartName}
                onChange={(e) => setNewCartName(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleCreateCart}>
                Create New Cart
            </Button>
            <List>
                {carts.map((cart) => (
                    <ListItem button key={cart.name} onClick={() => handleCartClick(cart.name)}>
                        <ListItemText 
                            primary={cart.name} 
                            secondary={`Owner: ${cart.owner}`}
                        />
                        <IconButton
                            edge="end"
                            color="secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCart(cart.name);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default CartList;
