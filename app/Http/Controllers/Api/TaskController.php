<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $task = new task();
        $task->name = $request->name;
        $user = $request['idUser'];
        $user = DB::table('users')->select('id')->where('email', $user)->first();

        $task->idUser = $user->id;
        $task->description = $request->description;
        $task->endDate = $request->endDate;
        $task->idTeam = $request->idTeam;
        $task->status = "Asignado";

        $task->save();

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = DB::table('tasks')->select()->where('idUser', $id)->get();
        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, $status)
    {
        $task = task::findOrFail($id);
        $task->status = $status;
        $task->update();

    }

    public function uploadFiles($task, $file, Request $request){
        $request->file('file')->store('/files');

        $task = task::findOrFail($task);
        $files = [$file, $task->files];
        $task->files = $files;
        $task->update();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
