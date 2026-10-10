import DashboardLayout from '@/Layouts/DashboardLayout';
import { api } from '@/lib/api';
import { money } from '@/lib/currency';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const [s, setS] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api('/api/stats').then(setS).catch((e) => setError(e.message));
    }, []);

    const cards = s && [
        ['Total Products', s.total_products, ''],
        ['Total Inventory Value', money(s.inventory_value), ''],
        ['Active Categories', s.categories, 'text-emerald-600'],
        ['Low Stock Alerts', s.low_stock, s.low_stock > 0 ? 'text-amber-600' : ''],
    ];

    return (
        <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${auth.user.name}`}>
            <Head title="Dashboard">
                <meta
                    name="description"
                    content="CRXD dashboard — centralized product management, inventory tracking, and analytics."
                />
            </Head>

            {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{error}</p>
            )}

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {!s && !error &&
                    [0, 1, 2, 3].map((i) => (
                        <div key={i} className="h-24 animate-pulse rounded-2xl border border-neutral-200 bg-white" />
                    ))}
                {cards?.map(([label, value, color]) => (
                    <div key={label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">{label}</p>
                        <p className={`mt-1 text-3xl font-extrabold ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {s?.total_products === 0 && (
                <div className="mt-6 rounded-2xl bg-brand p-6">
                    <p className="font-extrabold">Your catalog is empty.</p>
                    <Link
                        href={route('products')}
                        className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-extrabold text-white"
                    >
                        Add your first product
                    </Link>
                </div>
            )}
        </DashboardLayout>
    );
}
