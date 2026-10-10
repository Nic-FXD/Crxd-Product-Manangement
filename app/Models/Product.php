<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['user_id', 'name', 'sku', 'category', 'price', 'stock', 'status'];
    protected $casts = ['price' => 'float', 'stock' => 'integer'];
}
