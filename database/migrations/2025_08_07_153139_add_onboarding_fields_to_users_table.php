<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_picture')->nullable();
            $table->string('company_name')->nullable();
            $table->text('company_description')->nullable();
            $table->string('industry')->nullable();
            $table->json('categories')->nullable();
            $table->json('great_at')->nullable();
            $table->json('can_help_with')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'profile_picture',
                'company_name',
                'company_description',
                'industry',
                'categories',
                'great_at',
                'can_help_with',
            ]);
        });
    }
};
