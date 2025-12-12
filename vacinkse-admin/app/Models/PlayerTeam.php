<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerTeam extends Model
{
    use HasFactory;
    protected $fillable = [
        'player_id',
        'team_id',
        // 'alapertelmezett', // ha van ilyen oszlop, tedd bele
        // 'megjegyzes',      // ha van ilyen oszlop, tedd bele
    ];
    
}
