import BrandLogo from '@/Components/Crxd/BrandLogo';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
    { label: 'Platform', href: '/#features' },
    { label: 'Contact', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
];

const inputClass =
    'block w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition-all ' +
    'focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400';

const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-wider text-black';

export default function Register() {
    const [terms, setTerms] = useState(false);
    const confirmRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Mirrors the original inline script: flag a mismatch on the confirm field.
    useEffect(() => {
        const mismatch =
            data.password_confirmation !== '' && data.password !== data.password_confirmation;
        confirmRef.current?.setCustomValidity(mismatch ? 'Passwords do not match.' : '');
    }, [data.password, data.password_confirmation]);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col justify-between bg-white font-display text-black antialiased">
            <Head title="Sign Up">
                <meta
                    name="description"
                    content="Create your CRXD account to start centralizing your product lifecycle."
                />
            </Head>

            {/* Top Header */}
            <header className="w-full px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-black py-4">
                    <BrandLogo className="gap-3" />

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
                </div>
            </header>

            {/* Sign Up Form Section */}
            <main className="mx-auto my-12 w-full max-w-md px-4">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <form className="space-y-5" onSubmit={submit}>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-black">
                                Create your CRXD account
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Start centralizing your product lifecycle today
                            </p>
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClass}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoComplete="name"
                                className={inputClass}
                                placeholder="Jane Doe"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClass}>
                                Work Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                className={inputClass}
                                placeholder="name@company.com"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="password" className={labelClass}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                minLength={8}
                                className={inputClass}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className={labelClass}>
                                Confirm Password
                            </label>
                            <input
                                ref={confirmRef}
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                minLength={8}
                                className={inputClass}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-start">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-50 text-yellow-400 accent-yellow-400 focus:ring-yellow-400"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 text-xs font-medium leading-tight text-gray-600">
                                I agree to the{' '}
                                <a href="#" className="font-bold text-black hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-bold text-black hover:underline">
                                    Privacy Policy
                                </a>
                                .
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full cursor-pointer rounded-full bg-yellow-400 px-5 py-3.5 text-center text-sm font-bold text-black shadow-sm transition-colors hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-200 disabled:opacity-60"
                        >
                            {processing ? 'Creating account…' : 'Create Account'}
                        </button>

                        {/* Sign In Link */}
                        <div className="pt-2 text-center text-sm font-medium text-gray-600">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-bold text-black hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer Container */}
            <footer className="w-full border-t border-black px-6 pb-6 pt-8 text-black">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row">
                    <p>&copy; {new Date().getFullYear()} CRXD. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="transition-colors hover:text-black">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-black">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
