import { Request, Response, Router } from 'express';

const router = Router();
const userRepository = require('../repository/user_repository');

userRepository.init();

router.post('/login', (req: Request, res: Response) => {
    const { name, password } = req.body;
    if (!name) return res.status(400).send('Name is required');
    if (!password) return res.status(400).send('Password is required');

    const user = userRepository.getUser(name);
    if (!user) return res.status(404).send('User not found');
    if (user.password !== password) return res.status(401).send('Incorrect password');
    res.status(200).send(user);
});

router.post('/register', (req: Request, res: Response) => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).send('Name and password are required');

    const status = userRepository.addUser(name, password);
    if (status !== 200) return res.status(status).send('User already exists');

    res.status(201).send(userRepository.users);
});

export default router;
