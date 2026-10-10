import DashboardLayout from '@/Layouts/DashboardLayout';
import { api } from '@/lib/api';
import { money } from '@/lib/currency';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const CATEGORIES = ['Electronics', 'Apparel', 'Home & Garden', 'Office Supplies', 'Other'];
const EMPTY = { name: '', sku: '', category: '', price: '', stock: '', status: 'active' };
const STATUS = {
    active: ['Active', 'bg-emerald-50 text-emerald-700'],
    draft: ['Draft', 'bg-neutral-100 text-neutral-600'],
    archived: ['Archived', 'bg-red-50 text-red-700'],
};
const field = 'w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium transition-colors focus:border-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand';
const label = 'block text-xs font-bold uppercase tracking-wide mb-1.5';

function StockBadge({ stock }) {
    if (stock === 0) return <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700">Out of stock</span>;
    if (stock < 10) return <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">Low · {stock}</span>;
    return <span className="font-semibold">{stock}</span>;
}

function Modal({ open, onClose, className, children }) {
    const ref = useRef(null);
    useEffect(() => {
        const d = ref.current;
        if (open && !d.open) d.showModal();
        if (!open && d.open) d.close();
    }, [open]);
    return (
        <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}
                className={`m-auto w-full rounded-3xl border border-neutral-200 bg-white p-0 shadow-xl backdrop:bg-black/40 ${className}`}>
            {open && children}
        </dialog>
    );
}

export default function Products() {
    const [items, setItems] = useState(null);
    const [loadError, setLoadError] = useState('');
    const [query, setQuery] = useState('');
    const [form, setForm] = useState(null);      // product being created/edited
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [toast, setToast] = useState('');

    const load = () => api('/api/products').then(setItems).catch((e) => setLoadError(e.message));
    useEffect(() => { load(); }, []);

    const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const save = async (e) => {
        e.preventDefault();
        setSaving(true); setFormError('');
        try {
            if (form.id) await api(`/api/products/${form.id}`, 'PUT', form);
            else await api('/api/products', 'POST', form);
            notify(form.id ? 'Product updated successfully.' : 'Product added successfully.');
            setForm(null); await load();
        } catch (err) { setFormError(err.message); }
        setSaving(false);
    };

    const remove = async () => {
        try { await api(`/api/products/${toDelete.id}`, 'DELETE'); notify('Product deleted.'); setToDelete(null); await load(); }
        catch (err) { notify(err.message); setToDelete(null); }
    };

    const q = query.trim().toLowerCase();
    const shown = (items || []).filter((p) => [p.name, p.sku, p.category].some((v) => v.toLowerCase().includes(q)));
    const all = items || [];
    const stats = [
        ['Total Products', all.length, ''],
        ['In Stock', all.filter((p) => p.stock > 0).length, 'text-emerald-600'],
        ['Low Stock', all.filter((p) => p.stock > 0 && p.stock < 10).length, 'text-amber-600'],
        ['Out of Stock', all.filter((p) => p.stock === 0).length, 'text-red-600'],
    ];

    return (
        <DashboardLayout title="Products" subtitle="Manage your product catalog">
            <Head title="Products" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map(([l, v, c]) => (
                    <div key={l} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">{l}</p>
                        <p className={`mt-1 text-2xl font-extrabold ${c}`}>{v}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative w-full sm:max-w-xs">
                    <span className="sr-only">Search products</span>
                    <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, SKU, category…"
                           className="w-full rounded-full border border-neutral-300 bg-white py-2.5 px-5 text-sm font-medium placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-4 focus:ring-brand" />
                </label>
                <button type="button" onClick={() => { setFormError(''); setForm(EMPTY); }}
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-extrabold transition-colors hover:bg-brand-dark">
                    + Add Product
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="border-b border-neutral-200 bg-neutral-50">
                            <tr>{['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h, i) => (
                                <th key={h} scope="col" className={`px-5 py-3 font-bold text-neutral-600 ${i === 5 ? 'text-right' : ''}`}>{h}</th>))}</tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {shown.map((p) => (
                                <tr key={p.id} className="hover:bg-neutral-50">
                                    <td className="px-5 py-3.5"><p className="font-bold">{p.name}</p><p className="text-xs text-neutral-500">SKU: {p.sku}</p></td>
                                    <td className="px-5 py-3.5 text-neutral-600">{p.category}</td>
                                    <td className="px-5 py-3.5 font-semibold">{money(p.price)}</td>
                                    <td className="px-5 py-3.5"><StockBadge stock={p.stock} /></td>
                                    <td className="px-5 py-3.5"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS[p.status][1]}`}>{STATUS[p.status][0]}</span></td>
                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        <button type="button" onClick={() => { setFormError(''); setForm(p); }} className="rounded-lg px-2 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-100 hover:text-black">Edit</button>
                                        <button type="button" onClick={() => setToDelete(p)} className="rounded-lg px-2 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {(items === null && !loadError) && <p className="py-10 text-center text-sm font-semibold text-neutral-500">Loading products…</p>}
                {loadError && <p className="py-10 text-center text-sm font-bold text-red-700">{loadError}</p>}
                {items && shown.length === 0 && (
                    <div className="flex flex-col items-center gap-1 py-14 text-center">
                        <p className="text-sm font-bold">No products found</p>
                        <p className="text-xs text-neutral-500">{all.length ? 'Try a different search term.' : 'Select Add Product to create your first one.'}</p>
                    </div>
                )}
            </div>

            <Modal open={!!form} onClose={() => setForm(null)} className="max-w-lg">
                {form && (
                    <form onSubmit={save} className="p-6 sm:p-7">
                        <h2 className="text-xl font-extrabold tracking-tight">{form.id ? 'Edit Product' : 'Add Product'}</h2>
                        <p className="mt-1 text-sm text-neutral-500">Fill in the details below.</p>
                        <div className="mt-5 space-y-4">
                            <div><label htmlFor="pn" className={label}>Product Name</label>
                                <input id="pn" required maxLength={80} value={form.name} onChange={set('name')} placeholder="e.g. Wireless Mouse Pro" className={field} autoFocus /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label htmlFor="ps" className={label}>SKU</label>
                                    <input id="ps" required maxLength={20} value={form.sku} onChange={set('sku')} placeholder="e.g. WM-1042" className={field} /></div>
                                <div><label htmlFor="pc" className={label}>Category</label>
                                    <select id="pc" required value={form.category} onChange={set('category')} className={field}>
                                        <option value="">Select…</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                    </select></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label htmlFor="pp" className={label}>Price (PHP ₱)</label>
                                    <input id="pp" type="number" required min="0" step="0.01" value={form.price} onChange={set('price')} placeholder="0.00" className={field} /></div>
                                <div><label htmlFor="pq" className={label}>Stock Qty</label>
                                    <input id="pq" type="number" required min="0" step="1" value={form.stock} onChange={set('stock')} placeholder="0" className={field} /></div>
                            </div>
                            <div><label htmlFor="pt" className={label}>Status</label>
                                <select id="pt" value={form.status} onChange={set('status')} className={field}>
                                    <option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option>
                                </select></div>
                        </div>
                        {formError && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700" role="alert">{formError}</p>}
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setForm(null)} className="rounded-full px-5 py-2.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100">Cancel</button>
                            <button disabled={saving} className="rounded-full bg-brand px-6 py-2.5 text-sm font-extrabold transition-colors hover:bg-brand-dark disabled:opacity-60">{saving ? 'Saving…' : 'Save Product'}</button>
                        </div>
                    </form>
                )}
            </Modal>

            <Modal open={!!toDelete} onClose={() => setToDelete(null)} className="max-w-sm">
                {toDelete && (
                    <div className="p-6 sm:p-7">
                        <h2 className="text-lg font-extrabold tracking-tight">Delete this product?</h2>
                        <p className="mt-2 text-sm text-neutral-600">This will permanently remove "<span className="font-bold text-black">{toDelete.name}</span>" from your catalog. This action cannot be undone.</p>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setToDelete(null)} className="rounded-full px-5 py-2.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100">Cancel</button>
                            <button type="button" onClick={remove} className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-extrabold text-white hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                )}
            </Modal>

            <div role="status" className={`fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>{toast}</div>
        </DashboardLayout>
    );
}
