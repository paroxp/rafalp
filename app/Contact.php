<?php
/**
 * Created by PhpStorm.
 * User: rafal
 * Date: 8/6/15
 * Time: 12:16
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Contact extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'contact';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'message', 'ip'];

    /**
     * Save the data and send an email.
     *
     * @param array $data
     * @return static
     */
    public static function send(array $data)
    {
        $validator = \Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required|min:25',
            'url' => 'in:',
        ], [
            'url.in' => 'I see what you did there. I don\'t like it...',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $instance = static::create($data);

        Mail::send('email.message', ['contact' => $instance], function ($message) use ($instance) {
            $message
                ->to('paroxp@gmail.com', 'Rafał Proszowski')
                ->replyTo($instance->email, $instance->name)
                ->subject('New message from ' . $instance->name);
        });

        return $instance;
    }

}