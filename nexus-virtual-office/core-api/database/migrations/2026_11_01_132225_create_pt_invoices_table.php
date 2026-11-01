<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('pt_invoices', function (Blueprint $t) {
            $t->id(); $t->foreignId('client_id')->constrained('pt_clients')->cascadeOnDelete();
            $t->string('invoice_number')->unique(); $t->string('period')->nullable();
            $t->decimal('subtotal',15,2)->default(0); $t->decimal('ppn',15,2)->default(0);
            $t->decimal('pph',15,2)->default(0); $t->decimal('total',15,2)->default(0);
            $t->enum('status',['DRAFT','SENT','PAID','OVERDUE'])->default('DRAFT');
            $t->date('due_date')->nullable(); $t->string('pdf_path')->nullable();
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('pt_invoices'); }
};