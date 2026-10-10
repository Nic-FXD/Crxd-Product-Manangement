import { Link } from '@inertiajs/react';

export default function BrandLogo({
    href = '/',
    boxClassName = 'h-8 w-8 rounded-lg',
    textClassName = 'text-xl',
    className = '',
}) {
    return (
        <Link
            href={href}
            className={`flex shrink-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${className}`}
        >
            <span className={`grid place-items-center bg-brand ${boxClassName}`}>
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M6 7h12l1 13H5L6 7Z" />
                    <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
            </span>
            <span className={`${textClassName} font-extrabold tracking-tight`}>CRXD</span>
        </Link>
    );
}
