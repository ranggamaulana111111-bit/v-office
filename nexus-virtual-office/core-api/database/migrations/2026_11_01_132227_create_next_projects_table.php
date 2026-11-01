<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('next_projects', function (Blueprint $t) {
            $t->id(); $t->string('name'); $t->string('phase')->nullable();
            $t->decimal('budget',15,2)->default(0); $t->integer('priority_score')->default(0);
            $t->integer('readiness')->default(0); $t->json('specs')->nullable(); $t->timestamps();
        });
        Schema::create('drive_files', function (Blueprint $t) {
            $t->id(); $t->string('name'); $t->string('folder')->default('/'); $t->string('path');
            $t->string('mime')->nullable(); $t->unsignedBigInteger('size')->default(0); $t->timestamps();
        });
        Schema::create('photo_assets', function (Blueprint $t) {
            $t->id(); $t->string('title')->nullable(); $t->string('album')->default('default');
            $t->string('path'); $t->string('thumbnail')->nullable(); $t->json('exif')->nullable();
            $t->json('adjustments')->nullable(); $t->timestamps();
        });
        Schema::create('secret_vault_items', function (Blueprint $t) {
            $t->id(); $t->string('title'); $t->string('category')->nullable();
            $t->longText('ciphertext'); $t->string('iv'); $t->string('salt'); $t->timestamps();
        });
        Schema::create('settings', function (Blueprint $t) {
            $t->id(); $t->string('key')->unique(); $t->longText('value')->nullable(); $t->timestamps();
        });
    }
    public function down(): void {
        foreach(['settings','secret_vault_items','photo_assets','drive_files','next_projects'] as $x) Schema::dropIfExists($x);
    }
};