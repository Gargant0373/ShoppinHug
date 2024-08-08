import axios, { AxiosResponse } from 'axios';
import config from './config';
import Cart from '../types/cart';

const server = config.server + "/shop";

export const getCarts = async (): Promise<Cart[]> => {
    const response: AxiosResponse<Cart[]> = await axios.get(`${server}/`);
    return response.data;
};

export const getCart = async (cartName: string): Promise<Cart> => {
    const response: AxiosResponse<Cart> = await axios.get(`${server}/cart`, {
        params: { cartName }
    });
    return response.data;
};

export const addCart = async (cartName: string): Promise<Cart[]> => {
    const response: AxiosResponse<Cart[]> = await axios.post(`${server}/cart`, {
        cartName
    });
    return response.data;
};

export const removeCart = async (cartName: string): Promise<Cart[]> => {
    const response: AxiosResponse<Cart[]> = await axios.delete(`${server}/cart`, {
        params: { cartName }
    });
    return response.data;
};

export const addItemToCart = async (
    cartName: string,
    itemName: string,
    owner: string
): Promise<Cart[]> => {
    const response: AxiosResponse<Cart[]> = await axios.post(`${server}/item`, {
        cartName,
        itemName,
        owner
    });
    return response.data;
};

export const toggleItemCheck = async (
    cartName: string,
    itemName: string
): Promise<Cart> => {
    const response: AxiosResponse<Cart> = await axios.put(`${server}/check`, {
        cartName,
        itemName
    });
    return response.data;
};

export const updateItemQuantity = async (
    cartName: string,
    itemName: string,
    quantity: number,
    owner: string
): Promise<Cart> => {
    // TODO
    return {} as Cart;
};
