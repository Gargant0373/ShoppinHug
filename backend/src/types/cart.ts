import Item from "./item";

interface Cart {
    name: string;
    content: Item[];
    owner: string;
}

export default Cart;
