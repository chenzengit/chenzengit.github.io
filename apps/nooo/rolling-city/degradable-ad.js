(function(root, RewardedVideoAd, InterstitialAd) {
    var DegradableAd = root.DegradableAd = (function() {
        function DegradableAd(videoAdId, interstitialAdId) {
            this.videoAdId = videoAdId;
            this.interstitialAdId = interstitialAdId;

            this.onloadfns = [];
            this.onerrorfns = [];
            this.onclosefns = [];

            this.videoAd = new RewardedVideoAd(videoAdId);
            this.interstitialAd = new InterstitialAd(interstitialAdId);
            this.transfer();
        }

        Object.assign(DegradableAd.prototype, {
            transfer: function() {
                var ads = [this.videoAd, this.interstitialAd];
                for (var i = 0; i < ads.length; i++) {
                    var ad = ads[i];
                    ad.onloadfns = this.onloadfns;
                    ad.onerrorfns = this.onerrorfns;
                    ad.onclosefns = this.onclosefns;
                }
            },
            load: function() {
                var self = this;
                self.transfer();
                return new Promise(function(resolve, reject) {
                    self.videoAd.load().then(function(ok) {
                        if (ok === false) {
                            return self.interstitialAd.load().then(function(ok) {
                                if (ok === false) {
                                    return resolve(false);
                                }
                                resolve();
                            }).catch(reject);
                        }
                        resolve();
                    }).catch(function(err) {
                        console.warn(err);
                        self.interstitialAd.load().then(function(ok) {
                            if (ok === false) {
                                return resolve(false);
                            }
                            resolve();
                        }).catch(reject);
                    });
                });
            },
            show: function() {
                var self = this;
                self.transfer();
                return new Promise(function(resolve, reject) {
                    self.videoAd.show().then(function(ok) {
                        if (ok === false) {
                            return self.interstitialAd.show().then(function(ok) {
                                if (ok === false) {
                                    return resolve(false);
                                }
                                resolve();
                            }).catch(reject);
                        }
                        resolve();
                    }).catch(function(err) {
                        console.warn(err);
                        self.interstitialAd.show().then(function(ok) {
                            if (ok === false) {
                                return resolve(false);
                            }
                            resolve();
                        }).catch(reject);
                    });
                });
            },
            onLoad: function(callback) {
                this.onloadfns.push(callback);
                this.transfer();
            },
            offLoad: function(callback) {
                this.onloadfns.remove(callback);
                this.transfer();
            },
            onError: function(callback) {
                this.onerrorfns.push(callback);
                this.transfer();
            },
            offError: function(callback) {
                this.onerrorfns.remove(callback);
                this.transfer();
            },
            onClose: function(callback) {
                this.onclosefns.push(callback);
                this.transfer();
            },
            offClose: function(callback) {
                this.onclosefns = this.onclosefns.filter(function(cb) {
                    return cb !== callback;
                });
                this.transfer();
            },
        });

        return DegradableAd;
    })();
})(this, this.RewardedVideoAd, this.InterstitialAd);