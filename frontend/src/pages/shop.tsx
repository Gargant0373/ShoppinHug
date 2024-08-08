import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from '../types/user';
import CartList from '../components/CartList';

function Shop() {
    const [user, setUser] = useState({ name: '', password: '' } as User);
    const navigate = useNavigate();

    useEffect(() => {
        let username = Cookies.get('user');
        let password = Cookies.get('password');

        if (!username || !password) {
            navigate('/');
            return;
        }

        let user = { name: username, password: password };

        setUser(user);
    }, []);

    return <>
        <CartList />
    </>
}

export default Shop;