
import { nextServer } from "./api";
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
export type RegisterRequest = {
    email: string;
    password: string;
};

export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
};

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
    return res.data.success;
};

export const getMe = async () => {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout');
};

interface FetchNotesParams {
    search: string;
    page: number;
    perPage: number;
    sortBy: string;
    tag?: string;
}
export const fetchNotes = async (
    search: string,
    page: number,
    perPage = 12,
    tag?: string,
): Promise<{ notes: Note[]; totalPages: number }> => {
    const params: FetchNotesParams = {
    search,
    page,
    perPage,
    sortBy: "created",
    };
    if (tag) {
        params.tag = tag;
    }
    const { data } = await nextServer.get('/notes', { params });
    return data;
};

export const fetchNoteById = async (id: string) => {
    const { data } = await nextServer.get(`/notes/${id}`);
    return data;
};

export const createNote = async ( note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
    const { data } = await nextServer.post('/notes', note);
    return data;
};

export const deleteNote = async (id: string) => {
    await nextServer.delete(`/notes/${id}`);
};


export type Category = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export const getCategories = () => {
    return ["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"];
};
