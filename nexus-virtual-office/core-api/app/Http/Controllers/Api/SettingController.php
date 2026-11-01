<?php
namespace App\Http\Controllers\Api;
use App\Models\Setting;
use Illuminate\Http\Request;
class SettingController extends \Illuminate\Routing\Controller {
    public function index(){ return Setting::all(); }
    public function store(Request $r){ return Setting::create($r->all()); }
    public function show($id){ return Setting::findOrFail($id); }
    public function update(Request $r,$id){ $x=Setting::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ Setting::destroy($id); return response()->noContent(); }
}