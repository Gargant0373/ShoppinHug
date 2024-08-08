import axios, { AxiosResponse } from 'axios';
import config from './config';
import User from '../types/user';

const server = config.server;

export const login = async (user: User): Promise<AxiosResponse<User>> => {
  return await axios.post(`${server}/user/login`, user);
};

export const register = async (user: User): Promise<AxiosResponse<User[]>> => {
  return await axios.post(`${server}/user/register`, user);
};
