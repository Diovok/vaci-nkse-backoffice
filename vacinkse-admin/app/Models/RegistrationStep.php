<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationStep extends Model
{
    use HasFactory;
    protected $fillable = [
        'registration_id',
        'lepes',
        'datum',
        'user_id',
        'megjegyzes'
    ];
    
}
