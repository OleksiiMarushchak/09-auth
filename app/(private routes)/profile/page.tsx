// app/(private routes)/profile/page.tsx

import Link from 'next/link';
import { getMe } from '@/lib/api/clientApi';
import css from './ProfilePage.module.css'; 
import { Metadata } from "next";
import Image from 'next/image';
import { getMe as getMeServer } from '@/lib/api/serverApi';
export async function generateMetadata(): Promise<Metadata> {
    const user = await getMeServer();
    return {
        title: 'Profile',
        description: `${user.username}'s profile page`,
        openGraph: {
            title: 'Profile',
            description: `${user.username}'s profile page`,
            url: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
            images: [
                {
                    url: user.avatar,
                    width: 1200,
                    height: 630,
                    alt: 'Profile',
                },
            ],
        }
    };
}
const Profile = async () => {
    const user = await getMeServer(); // Отримуємо дані користувача з API

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </main>
    );
};

export default Profile;
