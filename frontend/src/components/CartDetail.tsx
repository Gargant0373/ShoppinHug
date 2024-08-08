import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, CircularProgress, Container, IconButton, InputAdornment, List, ListItem, ListItemText, Snackbar, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemToCart, getCart, toggleItemCheck, updateItemQuantity } from '../api/cart';
import Cart from '../types/cart';

const CartDetail: React.FC = () => {
  const { cartName } = useParams<{ cartName: string }>();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [user, setUser] = useState<{ name: string; password: string } | null>(null);

  useEffect(() => {
    const username = Cookies.get('user');
    const password = Cookies.get('password');

    if (!username || !password) {
      navigate('/');
      return;
    }

    setUser({ name: username, password: password });
  }, [navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!cartName) return;

      try {
        const fetchedCart = await getCart(cartName);
        setCart(fetchedCart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setSnackbarMessage('Error fetching cart.');
        setSnackbarOpen(true);
        setLoading(false);
      }
    };

    fetchCart();
  }, [cartName]);

  const handleItemCheckToggle = async (itemName: string) => {
    if (!cartName) return;

    try {
      const updatedCart = await toggleItemCheck(cartName, itemName);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error toggling item check:', error);
      setSnackbarMessage('Error toggling item check.');
      setSnackbarOpen(true);
    }
  };

  const handleAddItem = async () => {
    if (!cartName || newItemName.trim() === '' || !user) {
      setSnackbarMessage('Item name cannot be empty and user must be logged in.');
      setSnackbarOpen(true);
      return;
    }

    try {
      await addItemToCart(cartName, newItemName, user.name);
      setNewItemName('');
      setNewItemQuantity(1);
      const fetchedCart = await getCart(cartName);
      setCart(fetchedCart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setSnackbarMessage('Error adding item to cart.');
      setSnackbarOpen(true);
    }
  };

  const handleQuantityChange = async (itemName: string, quantity: number) => {
    if (!cartName) return;

    try {
      await updateItemQuantity(cartName, itemName, quantity);
      const fetchedCart = await getCart(cartName);
      setCart(fetchedCart);
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setSnackbarMessage('Error updating item quantity.');
      setSnackbarOpen(true);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <IconButton onClick={handleBackClick} color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        {cart?.name || 'Cart Detail'}
      </Typography>
      <TextField
        label="New Item Name"
        variant="outlined"
        fullWidth
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        fullWidth
        value={newItemQuantity}
        onChange={(e) => setNewItemQuantity(Number(e.target.value))}
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">pcs</InputAdornment>
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddItem}>
        Add Item
      </Button>
      <List>
        {cart?.content.map((item) => (
          <ListItem
            key={item.name}
            button
            onClick={() => handleItemCheckToggle(item.name)}
            style={{ textDecoration: item.checked ? 'line-through' : 'none' }}
          >
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} | Owner: ${item.owner}`}
              primaryTypographyProps={{
                style: { textDecoration: item.checked ? 'line-through' : 'none' }
              }}
            />
            <TextField
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.name, Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">pcs</InputAdornment>
              }}
              style={{ marginLeft: 'auto', width: 120 }}
              onClick={(e) => e.stopPropagation()}
            />
          </ListItem>
        )) || <ListItem>No items in this cart</ListItem>}
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

export default CartDetail;