protected $middlewareGroups = [
    'web' => [
        // ...existing middleware
        \App\Http\Middleware\TrackUserActivity::class,
    ],
];