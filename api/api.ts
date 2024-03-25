import axios, { AxiosResponse } from 'axios';
import { UserObject } from '../utils/interfaces';

const instance = axios.create({
	baseURL: 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/',
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
};

export const Clients = {
	getClients: (): Promise<UserObject[]> => requests.get('users'),
	getAClient: (id: number): Promise<UserObject> => requests.get(`users/${id}`),
};