<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registration_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->onDelete('cascade');
            $table->string('lepes');                // pl. "adatbekérő", "nyomtatva", "MKSZ jóváhagyta" stb.
            $table->timestamp('datum')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // ki módosította (admin)
            $table->string('megjegyzes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registration_steps');
    }
};
