(function(root) {
    var InterstitialAd = root.InterstitialAd = (function() {
        function InterstitialAd(videoId) {
            this.videoId = videoId;
            this.onloadfns = [];
            this.onerrorfns = [];
            this.onclosefns = [];

            this.inited = false;
            this.loading = false;
            this.loaded = false;
            setTimeout((function(){
            this.load().catch(function(err) {
                throw err;
            });
            }).bind(this),100);
        }

        Object.assign(InterstitialAd.prototype, {
            load: function() {
                var self = this;
                var onloadfns = this.onloadfns;
                if (!this.videoId || this.loaded === true) {
                    return new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            resolve(self.loaded === true ? undefined : false);

                            _.forEach(onloadfns, function(fn) {
                                fn && fn();
                            });
                        }, 0);
                    });
                }

                var self = this;
                return new Promise(function(resolve, reject) {
                    function getInterstitialAdAsync(videoId) {
                        if (self.inited === true) {
                            return new Promise(function(resolve) {
                                setTimeout(function() {
                                    resolve(self.video);
                                }, 0);
                            });
                        } else {
                            if (self.inited !== true || self.loaded !== true) {
                                resolve(false);
                            }
                            FBInstant.getInterstitialAdAsync(videoId).then(function(video) {
                                self.video = video;
                                self.inited = true;
                                video.loadAsync().then(function() {
                                    self.loaded = true;
                                }).catch(console.warn);
                            }).catch(console.warn);
                        }
                    }

                    getInterstitialAdAsync(self.videoId).then(function(video) {
                        if (video === false) {
                            return resolve(false);
                        }
                        self.video = video;
                        self.inited = true;

                        if (self.loaded === true) {
                            return new Promise(function(resolve, reject) {
                                setTimeout(function() {
                                    resolve();
                                }, 0);
                            });
                        }
                        return video.loadAsync();
                    }).then(function() {
                        self.loaded = true;
                        resolve(self.video);
                        _.forEach(onloadfns, function(fn) {
                            fn && fn();
                        });
                    }).catch(function(err) {
                        console.warn(err);
                        reject(err);
                    });
                });
            },
            show: function() {
                var self = this;
                var onclosefns = this.onclosefns;
                if (!this.video) {
                    return new Promise(function(resolve) {
                        setTimeout(function() {
                            resolve(false);

                            setTimeout(function() {
                                _.forEach(onclosefns, function(fn) {
                                    fn && fn({
                                        isEnded: true,
                                    });
                                })
                            }, 0);
                        }, 0);
                    });
                }

                var loadfn = function() {
                    if (self.loaded === true) {
                        return new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve(self.video);
                            }, 0);

                            setTimeout(function(){
                                self.load().catch(console.warn);
                            },100);
                        });
                    } else {
                        return self.load();
                    }
                }

                return new Promise(function(resolve, reject) {
                    loadfn().then(function(video) {
                        if (video === false) {
                            return resolve(false);
                        }
                        return video.showAsync();
                    }).then(function() {
                        self.inited = false;
                        self.loaded = false;
                        resolve();
                        _.forEach(onclosefns, function(fn) {
                            fn && fn({
                                isEnded: true,
                            });
                        });
                        setTimeout(function(){
                            self.load().catch(console.warn);
                        },100);
                    }).catch(reject);
                });
            },
            onLoad: function(callback) {
                this.onloadfns.push(callback);
            },
            offLoad: function(callback) {
                this.onloadfns.remove(callback);
            },
            onError: function(callback) {
                this.onerrorfns.push(callback);
            },
            offError: function(callback) {
                this.onerrorfns.remove(callback);
            },
            onClose: function(callback) {
                this.onclosefns.push(callback);
            },
            offClose: function(callback) {
                this.onclosefns = this.onclosefns.filter(function(cb) {
                    return cb !== callback;
                });
            },
        });

        return InterstitialAd;
    })();
})(this);