<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDistributionTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distribution_tables', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('n');
            $table->mediumText('input');
            $table->longText('distribution');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distribution_tables');
    }
}
