import { adsApiReady } from '../../ads/AdsSetup';

/* eslint-disable */
const init = async () => {
    // Load after we have an initialised / stubbed CMP API
    await adsApiReady

    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?

                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };

        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';

        n.queue = []; t = b.createElement(e); t.async = !0;

        t.src = v; s = b.getElementsByTagName(e)[0];

        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');


    fbq('init', '144852230851673');

    fbq('track', 'PageView');

}
/* eslint-enable */

export default init;
