<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\products;
class ProductSeeder extends Seeder
{
        public function run(): void
    {
            $product = new products();
    $product->Nombre_producto = 'Sandia';
    $product->Descripcion = 'Sandia roja';
    $product->Precio_de_venta = 5.5;
    $product->save();


    $product = new products();
    $product->Nombre_producto = 'Coco';
    $product->Descripcion = 'Coconut';
    $product->Precio_de_venta = 3;
    $product->save();


    $product = new products();
    $product->Nombre_producto = 'Pepino';
    $product->Descripcion = 'Pepino azul';#No tengo imaginacion sorry xD
    $product->Precio_de_venta = 5;
    $product->save();
    }
}
