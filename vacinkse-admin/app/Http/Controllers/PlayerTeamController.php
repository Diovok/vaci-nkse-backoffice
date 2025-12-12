<?php

namespace App\Http\Controllers;

use App\Models\PlayerTeam;
use Illuminate\Http\Request;

class PlayerTeamController extends Controller
{
    public function index()
    {
        return PlayerTeam::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'player_id' => 'required|integer|exists:players,id',
            'team_id' => 'required|integer|exists:teams,id',
            // 'alapertelmezett' => 'boolean', // ha kell
            // 'megjegyzes' => 'nullable|string', // ha kell
        ]);
        $record = PlayerTeam::create($validated);
        return response()->json($record, 201);
    }

    public function show($id)
    {
        return PlayerTeam::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $record = PlayerTeam::findOrFail($id);
        $record->update($request->all());
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = PlayerTeam::findOrFail($id);
        $record->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
