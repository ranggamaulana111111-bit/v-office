<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('tasks', function (Blueprint $t) {
            $t->id(); $t->string('title'); $t->text('description')->nullable();
            $t->enum('status',['todo','in_progress','review','done'])->default('todo');
            $t->string('label')->nullable(); $t->string('priority')->default('medium');
            $t->date('due_date')->nullable(); $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('tasks'); }
};