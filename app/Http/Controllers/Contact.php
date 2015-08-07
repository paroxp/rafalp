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
use Illuminate\Support\MessageBag;

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
        $instance = App\Contact::send($request->all());

        if ($instance instanceof App\Contact) {
            return response()->json([
                'status' => 'OK',
                'message' => 'Your message has been sent. Thank you!',
            ]);
        } elseif ($instance instanceof MessageBag) {
            return response()->json([
                'status' => 'Bad Request',
                'message' => 'I\'m sorry... We\'ve found some problems with your data...',
                'data' => $instance->getMessages(),
            ], 400);
        }

        return response()->json([
            'status' => 'I\'m a teapot',
            'message' => 'We couldn\'t send your message... Please try again later.',
        ], 418);
    }

}