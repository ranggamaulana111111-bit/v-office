<?php
namespace App\Http\Controllers\Api;
use App\Models\MonitoredDomain;
use Illuminate\Http\Request;
class MonitoredDomainController extends \Illuminate\Routing\Controller {
    public function index(){ return MonitoredDomain::all(); }
    public function store(Request $r){ return MonitoredDomain::create($r->all()); }
    public function show($id){ return MonitoredDomain::findOrFail($id); }
    public function update(Request $r,$id){ $x=MonitoredDomain::findOrFail($id); $x->update($r->all()); return $x; }
    public function destroy($id){ MonitoredDomain::destroy($id); return response()->noContent(); }
}