<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class task extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'description',
        'endDate',
        'status',
        'files',
        'idUser',
        'idTeam'
    ];

    public function team() {
        return $this->belongsToMany(team::class);
    }
}
