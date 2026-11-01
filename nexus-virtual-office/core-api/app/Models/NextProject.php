<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NextProject extends Model
{
    protected $fillable=['name','phase','budget','priority_score','readiness','specs'];
    protected $casts=['specs'=>'array'];
}
