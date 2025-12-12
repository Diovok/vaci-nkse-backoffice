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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('szul_nev')->nullable();
            $table->enum('nem', ['fiú', 'lány']);
            $table->string('szul_hely');
            $table->date('szul_ido');
            $table->string('anyja_neve');
            $table->string('iskola')->nullable();
            $table->string('mezszam')->nullable();
            $table->string('szem_ig_szam')->nullable();
            $table->date('szem_ig_lejar')->nullable();
            $table->string('lakcim')->nullable();
            $table->string('taj')->nullable();
            $table->date('sportorvosi_ervenyes')->nullable();
            $table->date('fenykep_ervenyes')->nullable();
            $table->boolean('aktiv')->default(true);
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
        Schema::dropIfExists('players');
    }
};
