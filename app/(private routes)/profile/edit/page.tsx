"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
    const { user, setUser } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameInput = e.currentTarget.elements.namedItem("username") as HTMLInputElement;
        const username = usernameInput?.value.trim();
        if (!username) {
            alert("Username is required");
            return;
        }
        try {
            const updatedUser = await updateMe({ username });
            setUser(updatedUser);
            router.push("/profile");
        } catch (error) {
            // TODO: додати обробку помилок
            console.error(error);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            defaultValue={user?.username || ""}
                        />
                    </div>

                    <p>Email: {user?.email || ""}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
