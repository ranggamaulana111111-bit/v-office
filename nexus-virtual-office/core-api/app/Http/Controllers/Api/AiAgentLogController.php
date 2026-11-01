<?php
namespace App\Http\Controllers\Api;
use App\Models\AiAgentLog;
use Illuminate\Http\Request;
class AiAgentLogController extends \Illuminate\Routing\Controller {
    public function index(){ return AiAgentLog::all(); }
    public function store(Request $r){ return AiAgentLog::create($r->all()); }
    public function show($id){ return AiAgentLog::findOrFail($id); }
    public function update(Request $r,$id){ $x=AiAgentLog::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ AiAgentLog::destroy($id); return response()->noContent(); }
}