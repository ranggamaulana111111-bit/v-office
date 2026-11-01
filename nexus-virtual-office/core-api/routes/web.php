<?php
use Illuminate\Support\Facades\Route;
use App\Models\{PtInvoice,PtCashflow,Task,NextProject,DriveFile,PhotoAsset,SecretVaultItem,MonitoredDomain};
Route::get('/', function () {
    $eps=['/api/v1/health','/api/v1/public/lobby-status','/api/v1/billing/summary','/api/v1/tasks','/api/v1/next-projects','/api/v1/drive-files','/api/v1/photo-assets','/api/v1/monitored-domains','/api/v1/secret-vault-items','/api/v1/office-settings'];
    return view('welcome',[
      'invoices'=>PtInvoice::count(),'cash'=>PtCashflow::sum('amount'),'tasks'=>Task::count(),
      'projects'=>NextProject::count(),'drive'=>DriveFile::count(),'photos'=>PhotoAsset::count(),
      'vault'=>SecretVaultItem::count(),'domains'=>MonitoredDomain::count(),'eps'=>$eps
    ]);
});