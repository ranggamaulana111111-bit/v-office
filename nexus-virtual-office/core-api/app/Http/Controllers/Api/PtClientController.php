<?php
namespace App\Http\Controllers\Api;
use App\Models\PtClient;
use Illuminate\Http\Request;
class PtClientController extends \Illuminate\Routing\Controller {
    public function index(){ return PtClient::all(); }
    public function store(Request $r){ return PtClient::create($r->all()); }
    public function show($id){ return PtClient::findOrFail($id); }
    public function update(Request $r,$id){ $x=PtClient::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ PtClient::destroy($id); return response()->noContent(); }
}