<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('personal_workspaces', function (Blueprint $t) {
            $t->id(); $t->text('journal')->nullable(); $t->integer('pomodoro_minutes')->default(25); $t->timestamps();
        });
        Schema::create('office_settings', function (Blueprint $t) {
            $t->id(); $t->string('key')->unique(); $t->longText('value')->nullable(); $t->timestamps();
        });
        Schema::create('monitored_domains', function (Blueprint $t) {
            $t->id(); $t->string('domain'); $t->integer('http_status')->default(200); $t->integer('ping_ms')->default(0); $t->integer('ssl_days_left')->default(0); $t->timestamps();
        });
        Schema::create('ai_agent_logs', function (Blueprint $t) {
            $t->id(); $t->string('agent'); $t->text('instruction'); $t->text('result')->nullable(); $t->timestamps();
        });
        Schema::create('guestbook_messages', function (Blueprint $t) {
            $t->id(); $t->string('name'); $t->string('email')->nullable(); $t->text('message'); $t->timestamps();
        });
    }
    public function down(): void {
        foreach (['guestbook_messages','ai_agent_logs','monitored_domains','office_settings','personal_workspaces'] as $x) Schema::dropIfExists($x);
    }
};