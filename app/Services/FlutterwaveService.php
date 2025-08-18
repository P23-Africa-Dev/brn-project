<?php

namespace App\Services;

use Flutterwave\Flutterwave;
use Flutterwave\Controller\PaymentController;
use Flutterwave\EventHandlers\ModalEventHandler;
use Flutterwave\Library\Modal;
use Illuminate\Http\Request;

class FlutterwaveService
{
    public function __construct()
    {
        Flutterwave::bootstrap();
    }

    public function initializePayment(Request $request)
    {
        $handler = new ModalEventHandler();
        $flutterwave = new Flutterwave();
        $modalType = Modal::STANDARD; // or Modal::POPUP
        $controller = new PaymentController($flutterwave, $handler, $modalType);

        return $controller->process($request->toArray());
    }

    public function handleCallback(Request $request)
    {
        $handler = new ModalEventHandler();
        $flutterwave = new Flutterwave();
        $modalType = Modal::STANDARD;
        $controller = new PaymentController($flutterwave, $handler, $modalType);

        return $controller->callback($request->toArray());
    }
}
