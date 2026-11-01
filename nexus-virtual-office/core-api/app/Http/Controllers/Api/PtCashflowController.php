<?php
namespace App\Http\Controllers\Api;
use App\Models\PtCashflow;
use Illuminate\Http\Request;
class PtCashflowController extends \Illuminate\Routing\Controller {
    public function index(){ return PtCashflow::all(); }
    public function store(Request $r){ return PtCashflow::create($r->all()); }
    public function show($id){ return PtCashflow::findOrFail($id); }
    public function update(Request $r,$id){ $x=PtCashflow::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ PtCashflow::destroy($id); return response()->noContent(); }
}