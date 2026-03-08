// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';

import type { User } from "@/types/user"
import type { Note } from "@/types/note"
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
    const cookieStore = await cookies();
    const { data } = await nextServer.get('/notes', {
        params,
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};


export const fetchNoteById = async (id: string) => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};

export const checkSession = async () => {
    // Дістаємо поточні cookie
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers: {
            // передаємо кукі далі
            Cookie: cookieStore.toString(),
        },
    });
    // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
    return res;
};


export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

