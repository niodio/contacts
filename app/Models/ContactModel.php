<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactModel extends Model
{
        use SoftDeletes;

    
    protected $table = 'contacts';
    protected $fillable = ['name', 'contact', 'email'];
    protected $dates = ['deleted_at'];

    // rules
    public static $rules = [
        'name' => 'required|min:5',
        'contact' => 'required|numeric|min:9|max:9',
        'email' => 'required|email',
    ];

}
