// components/Header/Header.tsx

import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

import TagsMenu from '../TagsMenu//TagsMenu';
const Header = async () => {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home" className={css.headerLink}>
                NoteHub
            </Link>
            <nav className={css.navigation} aria-label="Main Navigation">
                <TagsMenu />

                <AuthNavigation />
            </nav>
        </header>
    );
};

export default Header;
