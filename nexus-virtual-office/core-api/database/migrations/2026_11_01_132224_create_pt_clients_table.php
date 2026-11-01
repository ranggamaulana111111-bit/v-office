<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('pt_clients', function (Blueprint $t) {
            $t->id(); $t->string('company_name'); $t->string('npwp')->nullable();
            $t->text('billing_address')->nullable(); $t->string('pic_name')->nullable();
            $t->string('pic_email')->nullable(); $t->string('pic_phone')->nullable();
            $t->string('service_type')->nullable(); $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('pt_clients'); }
};