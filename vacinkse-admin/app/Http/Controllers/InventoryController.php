<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return Inventory::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string|max:255',
            'cikkszam' => 'nullable|string|max:255',
            'tipus' => 'nullable|string|max:255',
            'keszlet' => 'required|integer'
        ]);
        $item = Inventory::create($validated);
        return response()->json($item, 201);
    }

    public function show($id)
    {
        return Inventory::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Inventory::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Inventory::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
