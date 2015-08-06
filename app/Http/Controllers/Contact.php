<?php
/**
 * Created by PhpStorm.
 * User: rafal
 * Date: 8/6/15
 * Time: 12:10
 */

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;

class Contact extends Controller
{

    /**
     * Accept the post request, save and send the message.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(Request $request)
    {
        if (App\Contact::send($request->all())) {
            return response()->json([
                'status' => 'OK',
                'message' => 'Your message has been sent.',
            ]);
        }

        return response()->json([
            'status' => 'OK',
            'message' => 'Your message has been sent.',
        ], 400);
    }

}