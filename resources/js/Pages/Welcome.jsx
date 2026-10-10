import HeroIllustration from '@/Components/Crxd/HeroIllustration';
import { Head, Link } from '@inertiajs/react';

const stats = [
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '10M+', label: 'SKUs Managed' },
    { value: '< 50ms', label: 'Catalog Sync Speed' },
    { value: '200+', label: 'Global Integrations' },
];

const features = [
    {
        title: 'Inventory',
        body: 'Gain real-time visibility across all global warehouses with automated stock balancing and predictive restocking alerts.',
    },
    {
        title: 'Catalog',
        body: 'Centralize product attributes, media, and multi-currency pricing to publish seamlessly across marketplace channels.',
    },
    {
        title: 'Automated Compliance',
        body: 'Ensure regulatory compliance and global catalog validation before lifecycle initialization and distribution.',
    },
];

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
];

const footerColumns = [
    { title: 'Product', links: ['Platform', 'Integrations', 'Enterprise'] },
    { title: 'Company', links: ['About Us', 'Contact', 'Privacy Policy'] },
];

const ctaClass =
    'bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full px-5 py-3 text-sm';

export default function Welcome({ auth }) {
    return (
        <>
            <Head>
                <title>CRXD — Enterprise Product Lifecycle Management</title>
                <meta
                    name="description"
                    content="CRXD — centralize your product lifecycle and scale enterprise operations with real-time inventory, catalog orchestration, and multi-channel distribution."
                />
            </Head>

            <header className="w-full px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-black py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 font-black text-gray-950 shadow-sm transition-transform duration-200">
                            <svg
                                className="h-5 w-5 text-gray-950"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold">CRXD</span>
                    </div>

                    <nav className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="font-medium text-black hover:text-gray-900"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link href={route('dashboard')} className={ctaClass}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('register')} className={ctaClass}>
                                    Sign Up
                                </Link>
                                <Link href={route('login')} className={ctaClass}>
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main>
                <div className="px-6 py-12 md:py-20">
                    <h1 className="mb-10 text-center text-4xl font-bold sm:text-5xl md:mb-16 lg:text-7xl">
                        Centralize Your Product Lifecycle. <br className="hidden sm:block" />
                        Scale Enterprise Operations
                    </h1>
                    <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row">
                        <div className="grow">
                            <p className="mb-10 max-w-3xl rounded-3xl bg-yellow-400 p-12 text-lg font-normal text-black shadow-sm sm:text-xl">
                                Streamline your enterprise product architecture with a unified
                                management system designed for speed and control. OpsFlow bridges
                                product planning, real-time inventory monitoring, and multi-channel
                                catalog orchestration into one intuitive platform—giving teams full
                                oversight from lifecycle initialization to global distribution.
                            </p>
                        </div>
                        <div className="flex grow justify-center">
                            <HeroIllustration />
                        </div>
                    </div>
                </div>

                <section className="mx-auto max-w-7xl border-b border-gray-200 px-6 py-12">
                    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-lg bg-yellow-400 p-4">
                                <p className="text-3xl font-extrabold text-black">{stat.value}</p>
                                <p className="mt-1 text-xs text-gray-800">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="features" className="mx-auto max-w-7xl px-6 py-16">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="mb-3 text-3xl font-bold">Engineered for Enterprise Scale</h2>
                        <p className="text-gray-600">
                            Everything you need to orchestrate complex product workflows across teams and channels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, i) => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 font-bold">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-600">{feature.body}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="w-full px-6 pb-6 pt-10 text-black">
                <div className="mx-auto max-w-7xl border-t border-black pt-8">
                    <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-3">
                        <div className="max-w-sm">
                            <h3 className="mb-3 text-xl font-bold">CRXD</h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                The leading enterprise product management system built for
                                high-scale orchestrations, real-time inventory, and catalog
                                intelligence.
                            </p>
                        </div>

                        {footerColumns.map((col) => (
                            <div key={col.title}>
                                <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {col.links.map((label) => (
                                        <li key={label}>
                                            <a href="#" className="transition-colors hover:text-black">
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-600 sm:flex-row">
                        <p>&copy; {new Date().getFullYear()} CRXD. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
