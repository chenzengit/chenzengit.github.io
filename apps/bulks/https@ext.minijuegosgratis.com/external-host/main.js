// $(document).ready() without jQuery
// https://github.com/jfriend00/docReady

(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);
// end docReay

// -------------------------------------------

// miniplay params fallback
if (typeof window.mpConfig!="object") {
	mpConfig = {
	"game": document.location.pathname,
	"partner": document.location.hostname
	}
}

// -------------------------------------------

// miniplay helper
var mpHelper = new function() {
	
	var loadScript, init, lechuck, onReady;
	loadScript = function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		
		script.src = url;
		
		if ((url=='../../../lechuck.minijuegosgratis.com/js/latest.js') || (url=='../../../https@ssl.minijuegosgratis.com/lechuck/js/latest.js'))
		{
			script.id = 'LeChuckAPIjs';
		}
		
		if (callback!=undefined) {
			script.onreadystatechange = callback;
			script.onload = callback;
		}

		head.appendChild(script);
	};

	// load partner integration
    init = function() {
		//alert('y');
		/*	if (typeof console!="undefined") {console.log("Current url: "+document.location.href);}*/
		if (typeof console!="undefined") {
			console.log("Current url: "+document.location.href);
			console.log("Current referrer: "+document.referrer);
		}
			lechuck = new LeChuckAPI({});
			//
			setTimeout(function() {
				//alert('x');
				lechuck.events.onApiReady( function() {
					window.mpHelper.loadPartner(mpConfig.partner);
					});
				}, 2000);	
				
			//window.mpHelper.loadPartner(mpConfig.partner);
			//
    };

	// load api on document ready
	onReady = function() {
		//loadScript("../../../lechuck.minijuegosgratis.com/js/latest.js", init);
		loadScript("../../../https@ssl.minijuegosgratis.com/lechuck/js/latest.js", init);
	};

	// send stats to api
	this.sendStat = function(stat,value) {
		lechuck.stat.put(function(response){
			//console.log(response);
		}, stat, value);
	}
	
	// load partner js
	this.loadPartner = function(url) {
		loadScript("../../../https@ext.minijuegosgratis.com/external-host/" + url + ".js?" + Math.random());
	}

	// document ready
	docReady(onReady);
};

