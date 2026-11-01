<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('pt_cashflows', function (Blueprint $t) {
            $t->id(); $t->enum('type',['in','out'])->default('in');
            $t->string('description'); $t->decimal('amount',15,2)->default(0);
            $t->date('date')->nullable(); $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('pt_cashflows'); }
};