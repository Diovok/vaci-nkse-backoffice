<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'szul_nev',
        'nem',
        'szul_hely',
        'szul_ido',
        'anyja_neve',
        'iskola',
        'mezszam',
        'szem_ig_szam',
        'szem_ig_lejar',
        'lakcim',
        'taj',
        'sportorvosi_ervenyes',
        'fenykep_ervenyes',
        'aktiv'
    ];
}


