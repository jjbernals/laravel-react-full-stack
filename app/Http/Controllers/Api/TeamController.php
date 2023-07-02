<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\team;
use Illuminate\Http\Request;


class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $team = team::all();
        return $team;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $team = new team();
        $team->name = $request->name;

        $team -> save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = team::find($id);
        return $team;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $team = team::findOrFail($request->$id);
        $team->name = $request->name;

        $team -> save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
