<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ContactModel;
use Faker\Generator as Faker;

$factory->define(ContactModel::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'contact' => random_int(100000000, 999999999),
        'email' => $faker->unique()->safeEmail,
    ];
});
