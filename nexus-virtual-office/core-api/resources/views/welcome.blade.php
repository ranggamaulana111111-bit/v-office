<!DOCTYPE html>
<html><head><title>NEXUS Core API</title><style>body{background:#070B14;color:#fff;font-family:system-ui;margin:0;padding:24px} .card{background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:16px;margin:8px;display:inline-block;min-width:180px} h1{color:#06B6D4} a{color:#38bdf8}</style></head>
<body>
<h1>NEXUS Core API & MySQL Control Center</h1>
<p>MySQL (nexus_office_db): <b style="color:#10B981">CONNECTED</b></p>
<div>
<div class="card">Invoice: {{ $invoices }}</div>
<div class="card">Kas: Rp {{ number_format($cash) }}</div>
<div class="card">Tugas: {{ $tasks }}</div>
<div class="card">Proyek: {{ $projects }}</div>
<div class="card">Drive Files: {{ $drive }}</div>
<div class="card">Foto: {{ $photos }}</div>
<div class="card">Vault: {{ $vault }}</div>
<div class="card">Domain: {{ $domains }}</div>
</div>
<h2>Endpoints /api/v1</h2>
<ul>
@foreach($eps as $e)<li><a href="{{ $e }}">{{ $e }}</a></li>@endforeach
</ul>
<p><a href="http://localhost:3000">Buka Gedung 3D</a></p>
</body></html>