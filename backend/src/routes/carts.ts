import { Router, Request, Response } from 'express';
import Item from '../types/item';

const router = Router();
const cartRepository = require('../repository/cart_repository');

cartRepository.init();

// Get all carts
router.get('/', (req: Request, res: Response) => {
  res.send(cartRepository.carts);
});

// Get a specific cart by name
router.get('/cart', (req: Request, res: Response) => {
  const { cartName } = req.query;
  if (!cartName) return res.status(400).send('Cart name is required');
  const cart = cartRepository.getCart(cartName as string);
  if (!cart) return res.status(404).send('Cart not found');
  res.send(cart);
});

// Create a new cart
router.post('/cart', (req: Request, res: Response) => {
  const { cartName, ownerName } = req.body;
  if (!cartName) return res.status(400).send('Cart name is required');
  const code = cartRepository.addCart(cartName, ownerName);
  res.status(code).send(cartRepository.carts);
});

// Remove a cart
router.delete('/cart', (req: Request, res: Response) => {
  const { cartName } = req.query;
  if (!cartName) return res.status(400).send('Cart name is required');
  const code = cartRepository.removeCart(cartName as string);
  res.status(code).send(cartRepository.carts);
});

// Add an item to a cart
router.post('/item', (req: Request, res: Response) => {
  const { cartName, itemName, owner } = req.body;
  if (!cartName || !itemName || !owner) return res.status(400).send('Cart name, item name, and owner are required');
  const code = cartRepository.addCartItem(cartName, itemName, owner);
  res.status(code).send(cartRepository.carts);
});

// Toggle item checked status
router.put('/check', (req: Request, res: Response) => {
  const { cartName, itemName } = req.body;
  if (!cartName || !itemName) return res.status(400).send('Cart name and item name are required');
  const cart = cartRepository.getCart(cartName);
  if (!cart) return res.status(404).send('Cart not found');
  const item = cart.content.find((i: Item) => i.name === itemName);
  if (!item) return res.status(404).send('Item not found');
  item.checked = !item.checked;
  cartRepository.save();
  res.send(cart);
});

// Update item quantity in a cart
router.put('/item/quantity', (req: Request, res: Response) => {
  const { cartName, itemName, quantity } = req.body;
  if (!cartName || !itemName || quantity === undefined) return res.status(400).send('Cart name, item name, and quantity are required');

  const code = cartRepository.updateCartItemQuantity(cartName, itemName, quantity);
  if (code === 404) return res.status(404).send('Cart or item not found');

  res.status(code).send(cartRepository.carts);
});

export default router;
