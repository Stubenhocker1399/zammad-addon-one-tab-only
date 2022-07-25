console.log('One tab only!');

(function() {
    'use strict';

    try {
        var location = window.location.hash;
        if (!location) {
            location = (window.location.origin + '/' === window.location.href) ? '/#dashboard' : false;
        }
        if (location) {
            var channel = new BroadcastChannel('tab');
    
            channel.postMessage({type: 'another-tab', content: location});
    
            channel.addEventListener('message', function(msg) {
                if (msg.data.type === 'another-tab') {
                    // Message received from other Zammad tab, reply to it and open its location
                    channel.postMessage({type: 'i-got-it'});
                    window.focus();
    
                    if (document.hidden) {
                        App.Event.trigger('notifyDesktop', {
                            title: 'Click here to focus opened Zammad link',
                            timeout: 10000,
                            onclick: function() { window.focus(); },
                        });
                    }
    
                    window.location = window.origin + msg.data.content;
                } else if (msg.data.type === 'i-got-it') {
                    window.close();
                }
            });
        }
    }
    catch (e) {
        console.error('One-tab-only error:', e);
    }
})();
