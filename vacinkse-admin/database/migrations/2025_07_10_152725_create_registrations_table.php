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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained('players')->onDelete('cascade');
            $table->date('beadva')->nullable();          // mikor indult az ügy
            $table->string('forras')->nullable();        // pl. google forms, web, papír
            $table->string('statusz')->default('folyamatban'); // folyamatban, lezárva, elutasítva stb.
            $table->string('folyamat_lepes')->nullable();      // aktuális státusz (pl. "nyomtatva")
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
        Schema::dropIfExists('registrations');
    }
};
