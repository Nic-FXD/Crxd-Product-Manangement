<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    const LOW_STOCK_BELOW = 10;
    const CATEGORIES = ['Electronics', 'Apparel', 'Home & Garden', 'Office Supplies', 'Other'];

    private function rules(Request $r, ?Product $product = null): array
    {
        return [
            'name' => 'required|string|max:80',
            'sku' => ['required', 'string', 'max:20',
                Rule::unique('products', 'sku')->where('user_id', $r->user()->id)->ignore($product?->id)],
            'category' => ['required', Rule::in(self::CATEGORIES)],
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => ['required', Rule::in(['active', 'draft', 'archived'])],
        ];
    }

    private function mine(Request $r) { return Product::where('user_id', $r->user()->id); }

    public function index(Request $r) { return $this->mine($r)->latest('id')->get(); }

    public function store(Request $r)
    {
        $data = $r->validate($this->rules($r), ['sku.unique' => 'A product with this SKU already exists.']);
        return response()->json(Product::create($data + ['user_id' => $r->user()->id]), 201);
    }

    public function update(Request $r, Product $product)
    {
        abort_unless($product->user_id === $r->user()->id, 403);
        $product->update($r->validate($this->rules($r, $product), ['sku.unique' => 'A product with this SKU already exists.']));
        return $product;
    }

    public function destroy(Request $r, Product $product)
    {
        abort_unless($product->user_id === $r->user()->id, 403);
        $product->delete();
        return response()->noContent();
    }

    public function stats(Request $r)
    {
        $q = fn () => $this->mine($r);
        return [
            'total_products' => $q()->count(),
            'inventory_value' => (float) $q()->selectRaw('COALESCE(SUM(price * stock), 0) AS v')->value('v'),
            'categories' => $q()->where('status', 'active')->distinct()->count('category'),
            'low_stock' => $q()->where('stock', '>', 0)->where('stock', '<', self::LOW_STOCK_BELOW)->count(),
        ];
    }
}
