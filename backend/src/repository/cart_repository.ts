import Cart from "../types/cart";

const fs = require('fs');
let carts: Cart[] = [];

function init() {
    // Check if folder exists
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }

    // Check if file exists
    if (!fs.existsSync('./data/carts.json')) {
        fs.writeFileSync('./data/carts.json', JSON.stringify([]));
    }
    carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf8'));
}

function getCart(name: string): Cart | undefined {
    return carts.find(cart => cart.name === name);
}

function save(): void {
    fs.writeFileSync('./data/carts.json', JSON.stringify(carts));
}

function addCart(name: string): number {
    let ix = carts.findIndex(c => c.name === name);
    if (ix !== -1) return 404;
    carts.push({ name: name, content: [] });
    save();
    return 200;
}

function addCartItem(cartName: string, itemName: string, owner: string): number {
    const cart: Cart | undefined = getCart(cartName);
    if (!cart) return 404;

    let item = cart.content.find(i => i.name === itemName);
    if (item) {
        item.quantity++;
    } else {
        cart.content.push({ name: itemName, owner: owner, quantity: 1, checked: false });
    }
    save();
    return 200;
}

function removeCart(cartName: string): number {
    let ix = carts.findIndex(c => c.name === cartName);
    if (ix === -1) return 404;
    carts.splice(ix, 1);
    save();
    return 200;
}

function updateCartItemQuantity(cartName: string, itemName: string, quantity: number): number {
    const cart: Cart | undefined = getCart(cartName);
    if (!cart) return 404;

    let item = cart.content.find(i => i.name === itemName);
    if (!item) return 404;

    item.quantity = quantity;
    if (item.quantity <= 0) {
        cart.content = cart.content.filter(i => i.name !== itemName);
    }
    save();
    return 200;
}

export { carts, init, getCart, save, addCart, addCartItem, removeCart, updateCartItemQuantity };
