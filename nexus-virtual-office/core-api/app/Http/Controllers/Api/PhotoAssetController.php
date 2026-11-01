<?php
namespace App\Http\Controllers\Api;
use App\Models\PhotoAsset;
use Illuminate\Http\Request;
class PhotoAssetController extends \Illuminate\Routing\Controller {
    public function index(){ return PhotoAsset::all(); }
    public function store(Request $r){ return PhotoAsset::create($r->all()); }
    public function show($id){ return PhotoAsset::findOrFail($id); }
    public function update(Request $r,$id){ $x=PhotoAsset::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ PhotoAsset::destroy($id); return response()->noContent(); }
}