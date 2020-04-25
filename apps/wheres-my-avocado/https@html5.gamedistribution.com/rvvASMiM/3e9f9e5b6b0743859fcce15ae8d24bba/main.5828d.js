(function () {

    'use strict';

    function boot () {

        var settings = window._CCSettings;
        window._CCSettings = undefined;

        if ( !settings.debug ) {
            var uuids = settings.uuids;

            var rawAssets = settings.rawAssets;
            var assetTypes = settings.assetTypes;
            var realRawAssets = settings.rawAssets = {};
            for (var mount in rawAssets) {
                var entries = rawAssets[mount];
                var realEntries = realRawAssets[mount] = {};
                for (var id in entries) {
                    var entry = entries[id];
                    var type = entry[1];
                    // retrieve minified raw asset
                    if (typeof type === 'number') {
                        entry[1] = assetTypes[type];
                    }
                    // retrieve uuid
                    realEntries[uuids[id] || id] = entry;
                }
            }

            var scenes = settings.scenes;
            for (var i = 0; i < scenes.length; ++i) {
                var scene = scenes[i];
                if (typeof scene.uuid === 'number') {
                    scene.uuid = uuids[scene.uuid];
                }
            }

            var packedAssets = settings.packedAssets;
            for (var packId in packedAssets) {
                var packedIds = packedAssets[packId];
                for (var j = 0; j < packedIds.length; ++j) {
                    if (typeof packedIds[j] === 'number') {
                        packedIds[j] = uuids[packedIds[j]];
                    }
                }
            }
        }

        // init engine
        var canvas;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('gameCanvas');
        }
		var isFirstLoad = false;
        function setLoadingDisplay () {
            // Loading splash scene
            if (!isFirstLoad) {
            cc.loader.onProgress = function (completedCount, totalCount, item) {
                var progress = 100 * completedCount / totalCount;
                if (totalCount == 1) {
						return;
					}
					var evt = new MGEvent(MGEvent.LOAD_PROGRESS);
					evt.data = {
						"itemsLoaded": completedCount,
						"itemsTotal": totalCount,
						"percent": progress
					};
					MGDelegate.dispatcherEvent(evt);
					if (completedCount === totalCount && !isFirstLoad) {
						isFirstLoad = true;
						MGDelegate.dispatcherEvent(new MGEvent(MGEvent.LOAD_COMPLETE));
					}
            };
        }
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);

            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }
                else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                // qq, wechat, baidu
                cc.view.enableAutoFullScreen(false
                    //cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU &&
                    //cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT &&
                    //cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ
                );
            }

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / brwosers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }

            // init assets
            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            });

            var launchScene = settings.launchScene;
            cc.director.preloadScene(launchScene,
                function () {
                    // Once all assets are loaded, tells the SDK
                    // to end loading view and start the game
					var self = this;
                    MGDelegate.addEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", function () {
					MGDelegate.removeEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", self);
					MGDelegate.removeEventListener(MGEvent.ENTER_GAME || "ENTER_GAME", self);
					// Once all assets are loaded, tells the SDK
					// to end loading view and start the game
					cc.director.loadScene(launchScene,
						function () {
						console.log('Success to load scene: ' + launchScene);
						cc.loader.onProgress = null;
					});
				}, this);
                }
            );
        };

        // jsList
        var jsList = settings.jsList;
        var bundledScript = settings.debug ? 'src/project.dev.js' : 'src/project.49423.js';
        if (jsList) {
            jsList = jsList.map(function (x) { return 'src/' + x; });
            jsList.push(bundledScript);
        }
        else {
            jsList = [bundledScript];
        }

        // anysdk scripts
        if (cc.sys.isNative && cc.sys.isMobile) {
            jsList = jsList.concat(['src/anysdk/jsb_anysdk.js', 'src/anysdk/jsb_anysdk_constants.js']);
        }

        var option = {
            //width: width,
            //height: height,
            id: 'gameCanvas',
            scenes: settings.scenes,
            debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            showFPS: settings.debug,
            frameRate: 60,
            jsList: jsList,
            groupList: settings.groupList,
            collisionMatrix: settings.collisionMatrix,
            renderMode: 0
        };

        cc.game.run(option, onStart);
    }

    if (window.document) {
        var cocos2d = document.createElement('script');
        cocos2d.async = true;
        cocos2d.src = window._CCSettings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.15050.js';

        var engineLoaded = function () {
                    document.body.removeChild(cocos2d);
                    cocos2d.removeEventListener('load', engineLoaded, false);
                    if (typeof VConsole !== 'undefined') {
                        window.vConsole = new VConsole();
                    }
                    boot();
                
        };
        cocos2d.addEventListener('load', engineLoaded, false);
        document.body.appendChild(cocos2d);
    }

})();
