<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotoAsset extends Model
{
    protected $fillable=['title','album','path','thumbnail','exif','adjustments'];
    protected $casts=['exif'=>'array','adjustments'=>'array'];
}
