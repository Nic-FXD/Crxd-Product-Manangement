import BrandLogo from '@/Components/Crxd/BrandLogo';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const navLinks = ['Features', 'Contact', 'About Us', 'Blog'];

const stats = [
    { value: '99.99%', label: 'Uptime SLA', filled: true },
    { value: '10M+', label: 'SKUs Managed', filled: true },
    { value: '<50ms', label: 'Sync Speed', filled: false },
    { value: '200+', label: 'Integrations', filled: false },
];

const inputClass =
    'w-full rounded-xl border-2 border-neutral-300 bg-neutral-50 py-3 pl-11 text-sm font-medium ' +
    'placeholder:text-neutral-400 transition-colors hover:border-neutral-400 ' +
    'focus:border-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white font-display text-black antialiased selection:bg-brand selection:text-black">
            <Head title="Sign In">
                <meta
                    name="description"
                    content="Sign in to your CRXD workspace to access product management, inventory, and catalog tools."
                />
            </Head>

            {/* NAV */}
            <header className="sticky top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex h-16 items-center justify-between gap-6">
                        <BrandLogo />

                        <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 md:flex">
                            {navLinks.map((label) => (
                                <a key={label} href="#" className="transition-colors hover:text-black">
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
                    {/* LEFT PANEL */}
                    <section className="order-2 lg:order-1">
                        <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                            Welcome Back.
                            <br />
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-1.5 -z-10 h-4 bg-brand"></span>
                                Resume
                            </span>{' '}
                            Control.
                        </h1>

                        <div className="-ml-5 mt-8 rounded-r-3xl bg-brand px-6 py-6 sm:-ml-8 sm:px-8 lg:-ml-16 lg:max-w-xl lg:rounded-3xl">
                            <p className="text-[15px] font-medium leading-relaxed">
                                Sign in to your unified product workspace. Pick up live inventory
                                monitoring, catalog orchestration, and lifecycle planning exactly
                                where you left off — across every channel, in one place.
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-6">
                            <div className="shrink-0">
                                <svg
                                    width="154"
                                    height="154"
                                    viewBox="0 0 154 154"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-28 w-28 sm:h-36 sm:w-36"
                                    role="img"
                                    aria-label="CRXD emblem"
                                >
                                    <circle cx="77" cy="77" r="74" stroke="black" strokeWidth="2" strokeDasharray="6 7" />
                                    <path d="M52 56h50l4 56H48l4-56Z" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                                    <path d="M65 56a12 12 0 0 1 24 0" stroke="black" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>

                            <div className="grid w-full max-w-xs grid-cols-2 gap-3">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`rounded-2xl px-4 py-3 text-center ${
                                            stat.filled ? 'bg-brand' : 'border-2 border-black'
                                        }`}
                                    >
                                        <p className="text-lg font-extrabold leading-none">{stat.value}</p>
                                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-black/60">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* RIGHT FORM CARD */}
                    <section className="order-1 mx-auto w-full max-w-md lg:order-2 lg:ml-auto lg:mr-0">
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-3xl bg-brand"
                            ></div>

                            <div className="relative rounded-3xl border-2 border-black bg-white p-7 sm:p-9">
                                <h2 className="text-2xl font-extrabold tracking-tight">Sign in to CRXD</h2>
                                <p className="mt-1 text-sm font-medium text-neutral-600">
                                    Enter your credentials to access your workspace.
                                </p>

                                {status && (
                                    <div className="mt-4 rounded-xl bg-brand/20 px-4 py-3 text-sm font-semibold">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-6 space-y-5">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-bold">
                                            Work email
                                        </label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-neutral-400">
                                                <svg
                                                    className="h-[18px] w-[18px]"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                                                    <path d="m3 7 9 6 9-6" />
                                                </svg>
                                            </span>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                autoComplete="email"
                                                placeholder="name@company.com"
                                                className={`${inputClass} pr-4`}
                                            />
                                        </div>
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-baseline justify-between">
                                            <label htmlFor="password" className="block text-sm font-bold">
                                                Password
                                            </label>
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="text-xs font-bold underline decoration-brand decoration-2 underline-offset-4 hover:decoration-black"
                                                >
                                                    Forgot password?
                                                </Link>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 grid w-11 place-items-center text-neutral-400">
                                                <svg
                                                    className="h-[18px] w-[18px]"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                >
                                                    <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
                                                    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                                                </svg>
                                            </span>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className={`${inputClass} pr-12`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                aria-pressed={showPassword}
                                                className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-neutral-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                            >
                                                {showPassword ? (
                                                    <svg
                                                        className="h-[18px] w-[18px]"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M3 3l18 18" />
                                                        <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.4 0 10 7 10 7a18.6 18.6 0 0 1-2.4 3.4M6.5 6.7A18.3 18.3 0 0 0 2 12s3.6 7 10 7a10.6 10.6 0 0 0 4.1-.8" />
                                                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="h-[18px] w-[18px]"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <label
                                        htmlFor="remember"
                                        className="flex w-fit cursor-pointer select-none items-center gap-2.5 text-sm font-semibold text-neutral-700"
                                    >
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-[18px] w-[18px] rounded border-2 border-neutral-400 text-black focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        />
                                        Keep me signed in for 30 days
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group w-full rounded-full bg-brand py-3.5 text-sm font-extrabold transition-all hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-px disabled:opacity-60"
                                    >
                                        <span>{processing ? 'Signing in…' : 'Sign In'}</span>
                                        <span
                                            className="inline-block transition-transform group-hover:translate-x-1"
                                            aria-hidden="true"
                                        >
                                            &nbsp;→
                                        </span>
                                    </button>

                                    <p className="pt-1 text-center text-sm font-medium text-neutral-600">
                                        New to CRXD?{' '}
                                        <Link
                                            href={route('register')}
                                            className="font-extrabold text-black underline decoration-brand decoration-2 underline-offset-4 hover:decoration-black"
                                        >
                                            Create an account
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="border-t-2 border-black">
                <div className="mx-auto max-w-7xl px-5 py-6 text-center text-xs font-semibold text-neutral-500 sm:px-8">
                    © {new Date().getFullYear()} CRXD · Centralize Your Product Lifecycle.
                </div>
            </footer>
        </div>
    );
}
