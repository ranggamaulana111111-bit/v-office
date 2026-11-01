<?php
namespace App\Http\Controllers\Api;
use App\Models\SecretVaultItem;
use Illuminate\Http\Request;
class SecretVaultItemController extends \Illuminate\Routing\Controller {
    public function index(){ return SecretVaultItem::all(); }
    public function store(Request $r){ return SecretVaultItem::create($r->all()); }
    public function show($id){ return SecretVaultItem::findOrFail($id); }
    public function update(Request $r,$id){ $x=SecretVaultItem::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ SecretVaultItem::destroy($id); return response()->noContent(); }
}