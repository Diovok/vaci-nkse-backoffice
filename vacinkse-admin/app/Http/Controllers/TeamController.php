<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Összes csapat listázása (GET /api/teams)
    public function index()
    {
        return Team::all();
    }

    // Új csapat létrehozása (POST /api/teams)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'korosztaly_also' => 'required|integer',
            'korosztaly_felso' => 'required|integer',
            'coach' => 'nullable|string|max:255',
        ]);

        $team = Team::create($validated);
        return response()->json($team, 201);
    }

    // Egy csapat adatainak lekérdezése (GET /api/teams/{id})
    public function show($id)
    {
        return Team::findOrFail($id);
    }

    // Csapat adatainak módosítása (PUT/PATCH /api/teams/{id})
    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'korosztaly_also' => 'sometimes|required|integer',
            'korosztaly_felso' => 'sometimes|required|integer',
            'coach' => 'nullable|string|max:255',
        ]);

        $team->update($validated);
        return response()->json($team);
    }

    // Csapat törlése (DELETE /api/teams/{id})
    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
