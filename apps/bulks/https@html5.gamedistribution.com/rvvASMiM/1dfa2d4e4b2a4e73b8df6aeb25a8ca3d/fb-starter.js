(function(n) {
    "use strict";
    function t(n) {
        return window.fetch(n, {
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(n) {
            return n.text();
        });
    }
    var e;
    n.startGame = function(n, r) {
        if (typeof r === "undefined" || r === null) {
            r = window._nofb;
        }
        return new Promise(function(i, o) {
            if (r !== true) {
                var u = 0;
                e = setInterval(() => {
                    if (u < 96 && Math.random() < .05) {
                        u++;
                        FBInstant.setLoadingProgress(u);
                    }
                }, 50);
            } else {
                console.warn("FBInstant was not here !");
            }
            function a() {
                return r !== true ? FBInstant.initializeAsync() : new Promise(function(n) {
                    setTimeout(n, 0);
                });
            }
            function s() {
                return r !== true ? FBInstant.startGameAsync() : new Promise(function(n) {
                    setTimeout(n, 0);
                });
            }
            let c;
            a().then(function() {
                return t(n);
            }).then(function(n) {
                c = n;
                return s();
            }).then(function() {
                var n = document.createElement("script");
                n.innerHTML = c;
                document.body.appendChild(n);
                r !== true && clearInterval(e);
            }).catch(o);
        });
    };
})(this);