<?php
namespace App\Http\Controllers\Api;
use App\Models\DriveFile;
use Illuminate\Http\Request;
class DriveFileController extends \Illuminate\Routing\Controller {
    public function index(){ return DriveFile::all(); }
    public function store(Request $r){ return DriveFile::create($r->all()); }
    public function show($id){ return DriveFile::findOrFail($id); }
    public function update(Request $r,$id){ $x=DriveFile::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ DriveFile::destroy($id); return response()->noContent(); }
}