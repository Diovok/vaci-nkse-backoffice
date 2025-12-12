<?php

namespace App\Http\Controllers;

use App\Models\RegistrationStep;
use Illuminate\Http\Request;

class RegistrationStepController extends Controller
{
    public function index()
    {
        return RegistrationStep::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_id' => 'required|integer|exists:registrations,id',
            'lepes' => 'required|string|max:255',
            'datum' => 'nullable|date',
            'user_id' => 'nullable|integer|exists:users,id',
            'megjegyzes' => 'nullable|string'
        ]);
        $step = RegistrationStep::create($validated);
        return response()->json($step, 201);
    }

    public function show($id)
    {
        return RegistrationStep::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $step = RegistrationStep::findOrFail($id);
        $step->update($request->all());
        return response()->json($step);
    }

    public function destroy($id)
    {
        $step = RegistrationStep::findOrFail($id);
        $step->delete();
        return response()->json(['message' => 'Törölve!']);
    }
}
