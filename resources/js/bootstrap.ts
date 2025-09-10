import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Declare global window interface
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<any>;
    }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: window.location.hostname,
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});
