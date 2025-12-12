<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index()
    {
        return Registration::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'player_id' => 'required|integer|exists:players,id',
            'beadva' => 'nullable|date',
            'forras' => 'nullable|string|max:255',
            'statusz' => 'required|string|max:255',
            'folyamat_lepes' => 'nullable|string|max:255',
            'megjegyzes' => 'nullable|string'
        ]);
        $reg = Registration::create($validated);
        return response()->json($reg, 201);
    }

    public function show($id)
    {
        return Registration::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $reg = Registration::findOrFail($id);
        $reg->update($request->all());
        return response()->json($reg);
    }

    public function destroy($id)
    {
        $reg = Registration::findOrFail($id);
        $reg->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
