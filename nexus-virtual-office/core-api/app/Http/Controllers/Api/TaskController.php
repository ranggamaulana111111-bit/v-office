<?php
namespace App\Http\Controllers\Api;
use App\Models\Task;
use Illuminate\Http\Request;
class TaskController extends \Illuminate\Routing\Controller {
    public function index(){ return Task::all(); }
    public function store(Request $r){ return Task::create($r->all()); }
    public function show($id){ return Task::findOrFail($id); }
    public function update(Request $r,$id){ $x=Task::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ Task::destroy($id); return response()->noContent(); }
}