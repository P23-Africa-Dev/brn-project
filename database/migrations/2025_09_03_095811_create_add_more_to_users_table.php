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
            $table->string('phone')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('country')->nullable();
            $table->string('position')->nullable();
            $table->string('years_of_operation')->nullable();
            $table->string('number_of_employees')->nullable();
            $table->string('selected_outcome')->nullable();
            $table->string('goals')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'linkedin',
                'country',
                'position',
                'years_of_operation',
                'number_of_employees',
                'selected_outcome',
                'goals'
            ]);
        });
    }
};
