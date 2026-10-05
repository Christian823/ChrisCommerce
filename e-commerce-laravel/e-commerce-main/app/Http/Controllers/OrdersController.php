<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\orders;
use App\Models\products;
use App\Models\order_items;


class OrdersController extends Controller
{
public function store(Request $request){
    $user = $request->user();

    $request->validate([
        'estado' => 'required|string',
        'productos' => 'required|array|min:1',
        'productos.*.id_producto' => 'required|integer|exists:products,id_producto',
        'productos.*.cantidad' => 'required|integer|min:1'
    ]);

    $order = new orders();

    $order->id_cliente = $user->id;
    $order->estado = $request->estado;

    $order->save();

    foreach ($request->productos as $item) {

        $product = products::find($item['id_producto']);

        $orderItem = new order_items();

        $orderItem->id_orden = $order->id_orden;
        $orderItem->id_producto = $product->id_producto;
        $orderItem->cantidad = $item['cantidad'];
        $orderItem->precio_unitario = $product->Precio_de_venta;

        $orderItem->save();
    }

    return response()->json([
        'message' => 'Orden creada correctamente',
        'order' => $order
    ], 201);
    }
}
