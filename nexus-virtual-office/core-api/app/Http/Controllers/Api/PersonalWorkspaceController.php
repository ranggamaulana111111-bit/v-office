<?php
namespace App\Http\Controllers\Api;
use App\Models\PersonalWorkspace;
use Illuminate\Http\Request;
class PersonalWorkspaceController extends \Illuminate\Routing\Controller {
    public function index(){ return PersonalWorkspace::all(); }
    public function store(Request $r){ return PersonalWorkspace::create($r->all()); }
    public function show($id){ return PersonalWorkspace::findOrFail($id); }
    public function update(Request $r,$id){ $x=PersonalWorkspace::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ PersonalWorkspace::destroy($id); return response()->noContent(); }
}