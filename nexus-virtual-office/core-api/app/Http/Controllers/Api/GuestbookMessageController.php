<?php
namespace App\Http\Controllers\Api;
use App\Models\GuestbookMessage;
use Illuminate\Http\Request;
class GuestbookMessageController extends \Illuminate\Routing\Controller {
    public function index(){ return GuestbookMessage::all(); }
    public function store(Request $r){ return GuestbookMessage::create($r->all()); }
    public function show($id){ return GuestbookMessage::findOrFail($id); }
    public function update(Request $r,$id){ $x=GuestbookMessage::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ GuestbookMessage::destroy($id); return response()->noContent(); }
}