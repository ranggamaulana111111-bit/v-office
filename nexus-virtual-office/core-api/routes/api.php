<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{PtClientController,PtInvoiceController,PtCashflowController,TaskController,NextProjectController,DriveFileController,PhotoAssetController,SecretVaultItemController,SettingController,PersonalWorkspaceController,OfficeSettingController,MonitoredDomainController,AiAgentLogController,GuestbookMessageController};

Route::prefix('v1')->group(function () {
    Route::post('/login', function (Request $r) {
        $u = \App\Models\User::where('email',$r->email)->first();
        if (!$u || !\Hash::check($r->password,$u->password)) return response()->json(['message'=>'invalid'],401);
        return ['token'=>$u->createToken('nexus')->plainTextToken];
    });
    Route::get('/public/lobby-status', function(){ return ['status'=>'online','owner'=>'ready']; });
    Route::get('/public/operational', function(){
        $domains = \App\Models\MonitoredDomain::query()->get(['domain','http_status','ping_ms','ssl_days_left']);
        $online = $domains->where('http_status', 200)->count();
        $tasks = \App\Models\Task::query()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total','status');
        $projects = \App\Models\NextProject::query()->get(['readiness','budget']);
        return [
            'generated_at' => now()->toIso8601String(),
            'source' => 'database',
            'devices' => [
                'monitored' => $domains->count(),
                'online' => $online,
                'offline' => $domains->count() - $online,
                'avg_ping_ms' => (int) round($domains->avg('ping_ms') ?? 0),
                'domains' => $domains,
            ],
            'tasks' => [
                'total' => (int) $tasks->sum(),
                'by_status' => $tasks,
            ],
            'billing' => [
                'invoices' => \App\Models\PtInvoice::query()->count(),
                'outstanding' => (float) \App\Models\PtInvoice::query()->where('status','!=','PAID')->sum('total'),
                'cash' => (float) \App\Models\PtCashflow::query()->where('type','in')->sum('amount'),
            ],
            'projects' => [
                'total' => $projects->count(),
                'avg_readiness' => (int) round($projects->avg('readiness') ?? 0),
                'budget' => (float) $projects->sum('budget'),
            ],
            'agents' => [
                'logs' => \App\Models\AiAgentLog::query()->count(),
                'latest' => \App\Models\AiAgentLog::query()->latest('id')->first(),
            ],
            'lobby' => ['status' => 'online', 'owner' => 'ready'],
        ];
    });
    Route::get('/health', fn()=>['ok'=>true]);
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('pt-clients', PtClientController::class);
        Route::apiResource('pt-invoices', PtInvoiceController::class);
        Route::apiResource('pt-cashflows', PtCashflowController::class);
        Route::apiResource('tasks', TaskController::class);
        Route::apiResource('next-projects', NextProjectController::class);
        Route::apiResource('drive-files', DriveFileController::class);
        Route::apiResource('photo-assets', PhotoAssetController::class);
        Route::apiResource('secret-vault-items', SecretVaultItemController::class);
        Route::apiResource('settings', SettingController::class);
        Route::apiResource('personal-workspaces', PersonalWorkspaceController::class);
        Route::apiResource('office-settings', OfficeSettingController::class);
        Route::apiResource('monitored-domains', MonitoredDomainController::class);
        Route::apiResource('ai-agent-logs', AiAgentLogController::class);
        Route::apiResource('guestbook-messages', GuestbookMessageController::class);
        Route::get('/billing/summary', function(){ return ['invoices'=>\App\Models\PtInvoice::count(),'cash'=>\App\Models\PtCashflow::sum('amount')]; });
        Route::get('/me', fn(Request $r)=>$r->user());
    });
});