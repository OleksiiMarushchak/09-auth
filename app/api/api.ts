import axios from 'axios';

export type ApiError = {
    response?: {
        data: {
            error: string;
        };
    };
    message: string;
};
export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
