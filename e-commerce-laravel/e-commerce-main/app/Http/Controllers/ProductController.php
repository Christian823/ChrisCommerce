<?php

namespace App\Http\Controllers;
use App\Models\products;
use Illuminate\Http\Request;


class ProductController extends Controller
{

    public function index(){
        $products = products::all();
        return $products;
    }

    public function show($id){
    $product = products::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Producto no encontrado'
        ], 404);
    }

    return response()->json($product, 200);
    }

    public function store(Request $request){
        $request->validate([
            'Nombre_producto' => 'required|string|max:255',
            'Descripcion' => 'required|string',
            'Precio_de_venta' => 'required|numeric|min:0'
        ]);

        $product = new products();

        $product->Nombre_producto = $request->Nombre_producto;
        $product->Descripcion = $request->Descripcion;
        $product->Precio_de_venta = $request->Precio_de_venta;

        $product->save();

        return response()->json([
            'message' => 'Producto creado',
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id){
        $product = products::find($id);
        if(!$product){
            return response()->json([
                'message' => 'Producto no encontrado'
            ],404);
        }
            $request->validate([
        'Nombre_producto' => 'required|string|max:255',
        'Descripcion' => 'required|string',
        'Precio_de_venta' => 'required|numeric|min:0'
        ]);

        $product->Nombre_producto = $request->Nombre_producto;
        $product->Descripcion = $request->Descripcion;
        $product->Precio_de_venta = $request->Precio_de_venta;

        $product->save();

        return response()->json([
            'message' => 'Producto actualizado correctamente',
            'product' => $product
        ], 200);
    }

    public function destroy($id){
    $product = products::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Producto no encontrado'
        ], 404);
    }

    $product->delete();

    return response()->json([
        'message' => 'Producto eliminado correctamente'
    ], 200);
    }
}
