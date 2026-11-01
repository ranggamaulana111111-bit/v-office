<?php
namespace App\Http\Controllers\Api;
use App\Models\PtInvoice;
use Illuminate\Http\Request;
class PtInvoiceController extends \Illuminate\Routing\Controller {
    public function index(){ return PtInvoice::all(); }
    public function store(Request $r){ return PtInvoice::create($r->all()); }
    public function show($id){ return PtInvoice::findOrFail($id); }
    public function update(Request $r,$id){ $x=PtInvoice::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ PtInvoice::destroy($id); return response()->noContent(); }
}