<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // The starter template shipped a simple (product, price) table.
        // Drop it if it exists so this also works on a database that was already migrated.
        Schema::dropIfExists('products');

        Schema::create('products', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->string('name');
            $t->string('sku', 20);
            $t->string('category', 100);
            $t->decimal('price', 10, 2);
            $t->unsignedInteger('stock')->default(0);
            $t->enum('status', ['active', 'draft', 'archived'])->default('active');
            $t->timestamps();
            $t->unique(['user_id', 'sku']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
