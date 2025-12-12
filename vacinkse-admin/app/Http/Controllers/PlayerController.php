<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    // Összes játékos listázása
    public function index()
    {
        return Player::all();
    }

    // Új játékos
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nem' => 'required|in:fiú,lány',
            'szul_hely' => 'required|string|max:255',
            'szul_ido' => 'required|date',
            'anyja_neve' => 'required|string|max:255',
            // ...további mezők szükség szerint, mindent nem muszáj kötelezőre tenni!
        ]);
        $player = Player::create($request->all());
        return response()->json($player, 201);
    }

    // Egy játékos lekérdezése
    public function show($id)
    {
        return Player::findOrFail($id);
    }

    // Játékos módosítása
    public function update(Request $request, $id)
    {
        $player = Player::findOrFail($id);
        $player->update($request->all());
        return response()->json($player);
    }

    // Játékos törlése
    public function destroy($id)
    {
        $player = Player::findOrFail($id);
        $player->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
