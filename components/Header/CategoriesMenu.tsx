import Link from 'next/link';
export default function CategoriesMenu({ categories }: { categories: string[] }) {
    return (
        <div>
            <span>Categories</span>
            <ul>
                {categories.map((category) => (
                    <li key={category}>
                        <Link href={`/categories/${category}`}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
