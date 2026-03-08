import axios, { AxiosError } from 'axios';
import type { User } from '../types/user';
import type { Note } from '../types/note';
export type ApiError = AxiosError<{ error: string }>;

export const nextServer = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // дозволяє axios працювати з cookie
});
