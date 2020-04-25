let requesting = false;


window.createVideoAd = ((func) => {
  if (requesting) return console.log("前一个广告正在加载中");
  requesting = true;
  console.log("即将播放广告");
  if (func) {
    if (!gdsdk) return func();
    window.__adErrorCallback = window.__adFinishedCallback = () => {
      setTimeout(() => {
        func();
      }, 100);
    }
    gdsdk.showAd();
  } else {
    gdsdk.showAd('rewarded');
  }
});
window.initBannerAd = (div) => {
  gdsdk
    .showAd(gdsdk.AdType.Display, { containerId: div + "Div" })
    .then(() => console.info(div + 'ok'))
    .catch(error => console.info(error));
}
window.showBannerAd = (divName) => {
  const div = document.getElementById(divName + "Div");
  if (!div) {
    debugger;
  }
  div.style.display = 'block';
}
window.hideBannerAd = (divName) => {
  const div = document.getElementById(divName + "Div");
  if (!div) {
    debugger;
  }
  div.style.display = 'none';
}
window["GD_OPTIONS"] = {
  gameId: "21f56cc09e3f41c6afe630f97614fa2d",
  onEvent: function (e) {
    console.log("event,name", e.name);
    switch (e.name) {
      case "SDK_GAME_START":
        setTimeout(() => {
          gdsdk
            .preloadAd('rewarded')
            .then(response => {
              console.log('preloaded', response)
              // A rewarded ad can be shown to user when he/she clicked it.
            })
            .catch(error => {
              console.log('preload failed', error)
              // Any Rewarded ad is not available to user.
            });
          requesting = false;
          window.__adErrorCallback && window.__adErrorCallback();
          window.__adErrorCallback = null;
        }, 200)
        break;

      case "SDK_GAME_PAUSE":
        (window.__adStartCallback || (() => {
          console.log("adStarted");
        }))();
        break;

      case "SDK_GDPR_TRACKING":
        break;

      case "SDK_GDPR_TARGETING":
        break;

      case "STARTED":
        break;

      case "AD_SDK_FINISHED":
      case "CONTENT_RESUME_REQUESTED":
        setTimeout(() => {
          requesting = false;
          (window.__adFinishedCallback || (() => {
            console.log("adFinished");
          }))();
          window.__adFinishedCallback = null;
          window.__adErrorCallback = null;
        }, 100)
        break;

      case "AD_SDK_CANCEL":
      case "AD_CANCELED":
        requesting = false;
        setTimeout(() => {
          (window.__adErrorCallback || (() => {
            console.log("adError");
            // PlatformAPI.showToast("No Ad available!");
          }))();
          window.__adErrorCallback = null;
        }, 100)
        break;
      case "SDK_READY":
        gdsdk
          .preloadAd('rewarded')
          .then(response => {
            console.log('preloaded', response)
            // A rewarded ad can be shown to user when he/she clicked it.
          })
          .catch(error => {
            console.log('preload failed', error)
            // Any Rewarded ad is not available to user.
          });
        initBannerAd('banner');
        initBannerAd('loading');
        break;
    }
  }
};

(function (e, a, n) {
  var o, r = e.getElementsByTagName(a)[0];
  if (e.getElementById(n)) return;
  o = e.createElement(a);
  o.id = n;
  o.src = "../../../https@html5.api.gamedistribution.com/main.min.js";
  o.onload = (() => {
    console.log("jsloaded");
  });
  e.head.appendChild(o);
})(document, "script", "gamedistribution-jssdk");