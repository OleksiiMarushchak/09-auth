import css from "./SidebarNotes.module.css";
import Link from 'next/link';
import { getCategories } from "@/lib/api/clientApi";

export default function SidebarNotes() {
  const tags = getCategories();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}