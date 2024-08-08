import { Button, Container, IconButton, List, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../types/cart';
import { addCart, getCarts, removeCart } from '../api/cart';

const CartList: React.FC = () => {
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
  }, []);

  const handleCreateCart = async () => {
    if (newCartName.trim() === '') {
      setSnackbarMessage('Cart name cannot be empty.');
      setSnackbarOpen(true);
      return;
    }

    try {
      await addCart(newCartName);
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
      <Typography variant="h4" gutterBottom>
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
            <ListItemText primary={cart.name} />
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
