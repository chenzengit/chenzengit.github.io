(function () {
    var c = 'yandex_metrika_callbacks2',
        n = document.getElementsByTagName('script')[0],
        s = document.createElement('script'),
        f = function () { 
            n.parentNode.insertBefore(s, n); 
        };

    if (window.yaCounter38866805)  {
        return;
    }
    (window[c] = window[c] || []).push(function () {
        window.yaCounter38866805 = new Ya.Metrika2({
            id: 38866805,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        });
    });
    s.type = 'text/javascript';
    s.async = true;
    s.src = '../../../../https@yastatic.net/metrika-static-watch/assessor-tag.js';

    if (window.opera == '[object Opera]') {
        document.addEventListener('DOMContentLoaded', f, false);
    } else { f(); }
})();

