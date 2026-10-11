import BrandLogo from '@/Components/Crxd/BrandLogo';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const Icon = ({ children }) => (
    <svg
        className="h-[18px] w-[18px] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        {children}
    </svg>
);

const round = { strokeLinecap: 'round', strokeLinejoin: 'round' };

// Each item links to a real Laravel route via `routeName`.
const navSections = [
    {
        title: 'Overview',
        items: [
            {
                label: 'Dashboard',
                routeName: 'dashboard',
                icon: (
                    <Icon>
                        <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                    </Icon>
                ),
            },
            {
                label: 'Products',
                routeName: 'products',
                icon: (
                    <Icon>
                        <path {...round} d="M4 7h16v13H4V7Zm4 0V5a4 4 0 0 1 8 0v2" />
                    </Icon>
                ),
            },
        ],
    },
];

const baseItem =
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm';
const activeItem = `${baseItem} bg-brand font-bold shadow-sm`;
const idleItem = `${baseItem} font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black`;

function NavItem({ item }) {
    const active = item.routeName ? route().current(item.routeName) : false;
    const href = item.routeName ? route(item.routeName) : '#';

    return (
        <li>
            <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={active ? activeItem : idleItem}
            >
                {item.icon}
                {item.label}
            </Link>
        </li>
    );
}

export default function DashboardLayout({ title, subtitle, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);

    // Close the drawer on Escape.
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="min-h-screen scroll-smooth bg-neutral-50 font-display text-black antialiased selection:bg-brand selection:text-black">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-black focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
            >
                Skip to content
            </a>

            {/* mobile overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 lg:hidden ${open ? '' : 'hidden'}`}
            />

            <div className="flex min-h-screen">
                {/* ===================== SIDEBAR ===================== */}
                <aside
                    id="sidebar"
                    className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white shadow-sm transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-5">
                        <BrandLogo boxClassName="h-9 w-9 rounded-xl" />
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-neutral-100 lg:hidden"
                        >
                            <span className="sr-only">Close navigation</span>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-5">
                        {navSections.map((section, i) => (
                            <div key={section.title}>
                                <p
                                    className={`px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 ${
                                        i > 0 ? 'pt-6' : ''
                                    }`}
                                >
                                    {section.title}
                                </p>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <NavItem key={item.label} item={item} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* Account footer (not in the truncated source — added so the layout can log out) */}
                    <div className="shrink-0 border-t border-neutral-200 p-3">
                        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold">
                                {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold">{user?.name}</p>
                                <p className="truncate text-xs font-medium text-neutral-500">{user?.email}</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                        >
                            Log out
                        </Link>
                    </div>
                </aside>

                {/* ===================== CONTENT ===================== */}
                <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
                    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white/95 px-5 backdrop-blur sm:px-8">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-controls="sidebar"
                            aria-expanded={open}
                            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-neutral-100 lg:hidden"
                        >
                            <span className="sr-only">Open navigation</span>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-extrabold tracking-tight">{title}</h1>
                            {subtitle && (
                                <p className="hidden truncate text-[11px] font-semibold text-neutral-500 sm:block">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </header>

                    <main id="main" className="flex-1 px-5 py-8 sm:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
