<?php
/**
 * Created by PhpStorm.
 * User: rafal
 * Date: 8/6/15
 * Time: 12:10
 */

namespace App\Http\Controllers;

use Zend\Diactoros\Response;

class Main extends Controller
{

    /**
     * Default ping functionality.
     *
     * @param \Request $request
     * @return Response
     */
    public function index(\Request $request)
    {
        return response()->json([
            'status' => 'OK',
            'message' => 'Woo-Hoo! We\'ve got it rolling!',
        ]);
    }

}