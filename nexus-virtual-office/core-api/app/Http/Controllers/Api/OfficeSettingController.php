<?php
namespace App\Http\Controllers\Api;
use App\Models\OfficeSetting;
use Illuminate\Http\Request;
class OfficeSettingController extends \Illuminate\Routing\Controller {
    public function index(){ return OfficeSetting::all(); }
    public function store(Request $r){ return OfficeSetting::create($r->all()); }
    public function show($id){ return OfficeSetting::findOrFail($id); }
    public function update(Request $r,$id){ $x=OfficeSetting::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ OfficeSetting::destroy($id); return response()->noContent(); }
}