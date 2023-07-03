<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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
        $team = DB::table('teams')->latest('id')->first();

        $user = new User();
        $user->id = $request->id;

        $user = User::findOrFail($user['id']);
        $user->idTeam = $team->id;
        $user->rol = "Administrador";
        $user->save();

        $user = User::findOrFail($user['id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = DB::table('users')->select()->where('idTeam', $id)->get();
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

    public function newMember(Request $request){
        $admin = DB::table('users')->select("idTeam")->where("id", $request['id'])->first();
        $newMember = DB::table('users')->select()->where('email', $request['email'])->first();
        $user = User::findOrFail($newMember->id);

        if($user->rol=="Administrador"){
            return;
        }

        $user->idTeam = $admin->idTeam;
        $user->rol = "Miembro del equipo";

        $user->save();

        return DB::table('users')->select()->where('email', $request['email'])->first();
    }

}
