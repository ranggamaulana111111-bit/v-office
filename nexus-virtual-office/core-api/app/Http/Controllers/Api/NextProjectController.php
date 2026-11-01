<?php
namespace App\Http\Controllers\Api;
use App\Models\NextProject;
use Illuminate\Http\Request;
class NextProjectController extends \Illuminate\Routing\Controller {
    public function index(){ return NextProject::all(); }
    public function store(Request $r){ return NextProject::create($r->all()); }
    public function show($id){ return NextProject::findOrFail($id); }
    public function update(Request $r,$id){ $x=NextProject::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ NextProject::destroy($id); return response()->noContent(); }
}