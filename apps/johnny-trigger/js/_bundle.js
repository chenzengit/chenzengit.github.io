class IPlatform {
    filePath() {
        return "";
    }
    getStorageSync(key) { }
    ;
    setStorageSync(key, value) { }
    ;
    getFileSystemManager() {
        return {};
    }
    ;
    downloadFile(object) {
        return {};
    }
    ;
    showReward(success, failure) { };
    showInterstitial(complete) {};
    getForgames() {
        return [];
    }
    navigate(screenName, buttonName, gameId) { }
    ;
}

var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var views;
        (function (views) {
            class popUI extends Laya.Dialog {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(popUI.uiView);
                }
            }
            popUI.uiView = { 
                "type": "Dialog", 
                "props": { "width": 640, "height": 200 }, "compId": 2, 
                "child": [
                    {
                        "type":"Image",
                        "props":{
                            "skin":"bg/tishi.png",
                        },
                        "compId":35
                    },
                ], 
                "loadList": ["bg/tishi.png"], "loadList3D": [] };
            views.popUI = popUI;
            REG("ui.views.popUI", popUI);
        })(views = ui.views || (ui.views = {}));
    })(ui || (ui = {}));

class popup extends ui.views.popUI {
    onAwake() {
        Laya.timer.once(2.0e3, this, this.close);
    }
}

class WebPlatform extends IPlatform {
    constructor() {
        super();
        this.navigateActive = false;
        let canvas = document.getElementById("layaCanvas");
        canvas && canvas.addEventListener("mouseup", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
        canvas && canvas.addEventListener("touchend", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
    }
    navigate(screenName, buttonName, gameId) {
        if (this.navigateActive === false) {
            this.navigateActive = true;
            this._screenName = screenName;
            this._buttonName = buttonName;
            this._gameId = gameId;
        }
    }
    showInterstitial(complete) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.showInterstitial(()=>{
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            complete && complete();
        });
    }
    getStorageSync(key) {
        let v = Laya.LocalStorage.getItem(key);
        return JSON.parse(v);
    }
    setStorageSync(key, value) {
        return Laya.LocalStorage.setItem(key, JSON.stringify(value));
    }
    showReward(success, failure) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.adsManager.request(YYG.TYPE.REWARD, YYG.EventHandler.create(this, () => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            success && success();
        }), YYG.EventHandler.create(this, (event) => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            if (failure) {
                failure();
            }
            else {
                if (event == YYG.Event.AD_SKIPPED) {
                    new popup().popup();
                }
            }
        }));
    }

    popup(){
        new popup().popup();
    }

    
    getForgames() {
        let forgames = YYGSDK.forgames;
        forgames.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        return forgames;
    }
    showLoading(title) { }
    hideLoading() { }
}

class platform {
    static _init_() {
        this._platform = new WebPlatform();
    }
    static getInstance() {
        if (!this._platform) {
            this._init_();
        }
        return this._platform;
    }
}
platform._platform = null;
window["platform"] = platform;





!function() {
    "use strict";
    class e extends Laya.View {
        constructor() {
            super(), this.autoDestroyAtClosed = !0, this.name = this.constructor.name, this._event = {}, 
            this._aniArr = [], this.$updateArr = [];
        }
        onOpened(e) {
            super.onOpened(), this.argObj = e, this.initData(), this.initUI(), this.initEvent();
        }
        initUI() {}
        initData() {}
        initEvent() {}
        addEvent(e, t) {
            this._event[e] = t.bind(this), eventDispatcher.addEventListen(e, this, this._event[e]);
        }
        removeEvent(e) {
            eventDispatcher.removeEventListen(e, this, this._event[e]);
        }
        removeAllEvent() {
            for (var e in this._event) this.removeEvent(e);
        }
        dispatchEvent(e, t) {
            eventDispatcher.dispatchEvent(e, t);
        }
        playAni(e, t) {
            e._aniID && this._aniArr.push(e), e.play(0, t), e.$isPlaying = !0;
        }
        stopAllAni() {
            for (var e = 0; e < this._aniArr.length; e++) {
                var t = this._aniArr[e];
                t.$isPlaying && t.stop();
            }
        }
        resumeAllAni() {
            for (var e = 0; e < this._aniArr.length; e++) {
                var t = this._aniArr[e];
                t.$isPlaying && t.play(0, t.loop);
            }
        }
        removeTimer() {
            if (this.$updateArr) for (var e = 0; e < this.$updateArr.length; e++) updateManager.clear(this.$updateArr[e]);
        }
        doClose() {
            uiManager.closeUI(this.url);
        }
        onClosed() {
            this.removeTimer(), this.stopAllAni(), this.removeAllEvent();
        }
    }
    class t extends e {
        constructor() {
            super();
        }
        initUI() {
            this.argObj.success ? (
                audioManager.playSound(3), 
                this.label_restart.visible = !1) : 
                (
                    audioManager.playSound(4), 
                    this.img_roundBG.skin = "nine/img_di4.png", 
                    this.img_result.skin = "word/img_txt_shiBai.png", 
                    this.img_word1.skin = "word/img_txt_guanQia2.png", 
                    this.label_round.skin = "word/img_1234567890_2.png", 
                    this.label_next.visible = !1), 

            console.log(battleMgr.roundId);
            this.list.array = platform.getInstance().getForgames();
            this.list.renderHandler = new Laya.Handler(this,this.onRender);
            if(100 == battleMgr.roundId)
            {
                this.img_challenge.visible = true;
                this.label_round.visible = !1, 
                this.img_word1.visible = !1;
                this.label_challenge.skin = "word/img_txt_level_mode.png";
                // this.label_restart.skin = "word/img_txt_zhuJieMian.png";

                
            }
            else{
                this.img_challenge.visible = !1, 
                this.label_round.value = battleMgr.roundId;
            }
            if(25 == battleMgr.roundId){
                this.label_img_next.skin = "word/img_txt_replay.png";
            }





            this.label_killCnt.value = battleMgr.killCnt, 
            this.label_money.value = 15 * battleMgr.killCnt;
            var e = dataManager.getUserData("money");
            dataManager.setUserData("money", e + 15 * battleMgr.killCnt);
            var t = uiManager.getUI("game/MainView.scene");
            t.updateMoney();
            t.setVisibleSth(!1),
            t.img_word2.visible = !1, 
            t.box_killinfo.visible = !1, 
            4 == dataManager.getUserData("gunId") && (this.btn_getWeapon.visible = !1);
        }

        onRender(c){
            c.offAll(Laya.Event.MOUSE_DOWN);
            c.on(Laya.Event.MOUSE_DOWN,this,()=>{
                platform.getInstance().navigate("GAME","MORE",c.dataSource.id);
            });
        }


        onchallenge(){
            battleMgr.restartGame(100);
            var e = uiManager.getUI("game/MainView.scene");
            e.setChallengeKill(0), 
            e.img_bg.skin = D.roundConfig[100].picture2, 
            e.box_menu.visible = !1,
            e.box_killinfo.visible = !0, 
            e.btn_start2.visible = !0, 
            e.img_word2.visible = !0, 
            e.img_word1.visible = !1;
            this.doClose();
        }

        initData() {}
        initEvent() {
            utils.onBtnScaleEvent(this.btn_next, this, this.nextGame), 
            utils.onBtnScaleEvent(this.btn_challenge, this, function() {
                if(100 == battleMgr.roundId){
                    var e = uiManager.getUI("game/MainView.scene");
                    battleMgr.restartGame(dataManager.getUserData("roundId"));
                    e.restartGame(!0);
                    e.setVisibleSth(!0);
                    e.updateMoney(), 
                    this.doClose();
                }else{
                    this.onchallenge();
                }
                
            }), 
            utils.onBtnScaleEvent(this.btn_getWeapon, this, function() {
                uiManager.openDialog("game/WeaponView.scene", this);
            });
        }
        nextGame() {
            var e = uiManager.getUI("game/MainView.scene");
            platform.getInstance().showInterstitial(()=>{
                console.log("battleMgr.roundId =",battleMgr.roundId);
                if(100 == battleMgr.roundId){
                    this.onchallenge();
                }
                else
                {
                    battleMgr.restartGame(dataManager.getUserData("roundId"));
                    e.restartGame(!0);
                    e.setVisibleSth(!0);
                   
                }
                e.updateMoney(), 
                this.doClose();
            });
        }
    }
    class i extends e {
        constructor() {
            super(), this.loadItems = [], this.currItem = null, this.value = 0, this.count = 0, 
            this.currCount = 0, this.countMax = 0;
        }
        initUI() {
            super.initUI.call(this), this.updateKey = updateManager.frameLoop(1, this, this.update);
        }
        addItem(e) {
            this.countMax += e.count, this.loadItems.push(e), e.loading = this;
        }
        updateProgress() {
            this.value = this.count / this.countMax;
        }
        update() {
            if (null == this.currItem) if (0 == this.loadItems.length) {
                if (this.count >= this.countMax) return void this.onLoaded();
            } else this.count >= this.currCount && (this.currItem = this.loadItems.shift(), 
            this.currItem.start(), this.currCount += this.currItem.count); else this.currItem.loaded ? this.currItem = null : this.currItem.checkFn && this.currItem.checkFn();
            this.count < this.currCount && this.count++, this.updateProgress();
        }
        onLoaded() {
            updateManager.clear(this.updateKey, this);
        }
    }
    class a extends i {
        constructor() {
            super(), this.autoDestroyAtClosed = !0;
        }
        initUI() {
            super.initUI.call(this), 
            this.bar_loading.value = this.value;

            var self = this;
            this.addItem(new ulee.LoadItem(function()
            {
                YYGSDK.on(YYG.Event.YYGSDK_INITIALIZED,this,()=>{
                    self.yad.on(Laya.Event.MOUSE_DOWN,platform.getInstance(),()=>{
                        platform.getInstance().navigate("LOADING","LOGO");
                    });
                    this.onComplete();
                })
                let o = new YYG.Options();
                o.gameNameId = "Johnny-Trigger";
                o.gamedistributionID = "";
                YYGSDK.__init__(YYG.ChannelType.YAD,o);
            }, 10)), this.addItem(new ulee.LoadItem(function() {
                uiManager.openUI("game/MainView.scene"), console.log("加载2");
                var e = this;
                let t = function() {
                    G.heroComplete ? (console.log("加载2完成"), e.onComplete()) : Laya.stage.timer.once(1, this, t);
                };
                t();
            }, 10)), this.addItem(new ulee.LoadItem(function() {
                console.log("加载3"), 
                Laya.stage.timer.once(1e3,this,()=>{
                    battleMgr.initRound(dataManager.getUserData("roundId")); 
                    this.onComplete();
                });
            }, 10)), this.addItem(new ulee.LoadItem(function() {
                console.log("加载4"), this.onComplete();
            }, 20));
        }
        updateProgress() {
            super.updateProgress.call(this), this.bar_loading.value = this.value;
        }
        onLoaded() {
            super.onLoaded.call(this);
            console.log("loading加载完成");
            uiManager.getUI("game/MainView.scene").visible = !0;
            if ( bondSDK) {
                bondSDK && bondSDK.showMainMenu({
                    y: -250
                });
                var e = {
                    music: null
                };
                for (var t in e) e[t] = wx.loadSubpackage({
                    name: t,
                    success: function(e) {
                        console.log("music分包加载完毕");
                    },
                    fail: function(e) {
                        console.log("music分包加载失败", e);
                    }
                });
            }
            this.doClose();
        }
    }
    class s extends e {
        constructor() {
            super();
        }
        initUI() {
            this.visible = !1, battleMgr.initScene(this.box_scene), this.box_start.visible = !1, 
            this.box_menu.visible = !0, 
            this.label_money.text = dataManager.getUserData("money"), 
            this.label_round.value = dataManager.getUserData("roundId"), 
            this.img_bg.skin = D.roundConfig[dataManager.getUserData("roundId")].picture2, 
            dataManager.getUserData("roundId") <= 10 ? (this.img_map1.skin = "icon/map1.png", 
            this.img_map2.skin = "icon/map2.png") : (this.img_map1.skin = "icon/map2.png", 
            this.img_map2.skin = "icon/map3.png"), 
            4 == dataManager.getUserData("gunId") && this.hideGetWeapon();
        }
        showGuide(e) {
            this.isGuide = e, this.img_guide.visible = e, this.img_guide2.visible = e, e ? this.guide.play(0, !0) : this.guide.stop();
        }
        initData() {
            this.bulletCnt = 5;
        }
        initEvent() {
            this.yad.on(Laya.Event.MOUSE_DOWN,this,()=>{
                platform.getInstance().navigate("MAIN","LOGO");
            })
            this.btn_start.on(Laya.Event.MOUSE_DOWN, this, function() 
            {
                platform.getInstance().showInterstitial(()=>{
                    this.btn_challenge.visible  = this.btn_start.visible = false;
                    G.showTry && 1 != dataManager.getUserData("roundId") && dataManager.getUserData("gunId") == battleMgr.curGunId 
                    ? this.showTryUI() : 
                    this.startGame();
                });
            }), 
            this.box_start.on(Laya.Event.MOUSE_DOWN, this, function() {
                this.shot();
            }), 
            utils.onBtnScaleEvent(this.btn_getWeapon, this, function() {
                uiManager.openDialog("game/WeaponView.scene", this);
            }), 
            utils.onBtnScaleEvent(this.btn_set, this, this.onSet), 
            utils.onBtnScaleEvent(this.btn_pause, this, this.onPause), 
            utils.onBtnScaleEvent(this.btn_start2, this, function() {
                if (this.btn_start2.visible = !1, this.box_bullet.visible = !1, bondSDK) {
                    var e = this;
                    bondSDK.startGame(function() {
                        G.showTry && 1 != dataManager.getUserData("roundId") && dataManager.getUserData("gunId") == battleMgr.curGunId ? e.showTryUI() : e.startGame();
                    });
                } else G.showTry && 1 != dataManager.getUserData("roundId") && dataManager.getUserData("gunId") == battleMgr.curGunId ? this.showTryUI() : this.startGame();
            }), 
            utils.onBtnScaleEvent(this.btn_challenge, this, function() {
                battleMgr.restartGame(100), 
                this.setChallengeKill(0), 
                this.img_bg.skin = D.roundConfig[100].picture2, 
                this.box_menu.visible = !1, 
                this.box_killinfo.visible = !0, 
                this.btn_start2.visible = !0, 
                this.img_word2.visible = !0, 
                this.img_word1.visible = !1;
            }), 
            utils.listHandler(this.list_round, this, this.onListRender), 
            this.list_round.array = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 
            dataManager.getUserData("roundId") < 2 ? (this.btn_challenge.visible = !1, this.btn_start.y = 630) : this.btn_start.y = 580;
        }
        hideGetWeapon() {
            this.btn_getWeapon.visible = !1;
        }
        showTryUI() {
            this.showTry || (uiManager.openDialog("game/TryPlayView.scene", this), this.showTry = !0);
        }
        moveCloud() {
            this.img_cloud1.x -= .1,
            this.img_cloud2.x -= .2;
        }
        onListRender(e, t) {
            var i = dataManager.getUserData("roundId");
            i % 10 == 0 ? 9 == t ? (utils.getChildDeep(e, "img_blue").visible = !1, utils.getChildDeep(e, "img_yellow").visible = !0) : (utils.getChildDeep(e, "img_blue").visible = !0, 
            utils.getChildDeep(e, "img_yellow").visible = !1) : i % 10 - 1 == t ? (utils.getChildDeep(e, "img_blue").visible = !1, 
            utils.getChildDeep(e, "img_yellow").visible = !0) : i % 10 - 1 < t ? (utils.getChildDeep(e, "img_blue").visible = !1, 
            utils.getChildDeep(e, "img_yellow").visible = !1) : i % 10 - 1 > t && (utils.getChildDeep(e, "img_blue").visible = !0, 
            utils.getChildDeep(e, "img_yellow").visible = !1);
        }
        updateMoney() {
            this.label_money.text = dataManager.getUserData("money");
        }
        setVisibleSth(e) {
            this.img_word1.visible = e,
            this.box_bullet.visible = e, 
            this.btn_pause.visible = e;
        }
        startGame() {
            battleMgr.startGame(), 
            this.box_start.visible = !0, 
            this.box_menu.visible = !1, 
            this.btn_start2.visible = !1,  
            this.cloudKey = updateManager.frameLoop(1, this, this.moveCloud), this.showTry = !1;
        }
        restartGame(e) {
            if (this.lab_killCnt.value = 0, this.box_killinfo.visible = !1, this.btn_challenge.visible = !0, 
            this.box_start.visible = !1, this.box_menu.visible = !0, this.btn_start.visible = !0, 
            this.box_bullet.visible = !0, this.img_word1.visible = !0, this.img_word2.visible = !1, 
            this.label_round.value = dataManager.getUserData("roundId"), this.img_bg.skin = D.roundConfig[dataManager.getUserData("roundId")].picture2, 
            dataManager.getUserData("roundId") <= 10 ? (this.img_map1.skin = "icon/map1.png", 
            this.img_map2.skin = "icon/map2.png") : (this.img_map1.skin = "icon/map2.png", this.img_map2.skin = "icon/map3.png"), 
            this.list_round.array = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], updateManager.clear(this.cloudKey, this), 
            this.img_cloud1.x = -50, this.img_cloud2.x = -50, e)
            {
                this.btn_start.visible = false;
                this.btn_challenge.visible = false
                G.showTry && dataManager.getUserData("gunId") == battleMgr.curGunId ? this.showTryUI() : this.startGame();
            }
            else{
                dataManager.getUserData("roundId") < 2 ? (this.btn_challenge.visible = !1, this.btn_start.y = 630) : (this.btn_challenge.visible = !0, this.btn_start.y = 580);
            }
        }
        shot() {
            this.isGuide && (this.showGuide(!1), battleMgr.resumeGame()), (this.bulletCnt > 0 || battleMgr.isChallengeMode) && battleMgr.shot(function() {
                if (audioManager.playSound(5), !battleMgr.isChallengeMode) {
                    var e = new Laya.TimeLine();
                    e.addLabel("scale", 0).to(this["bullet" + this.bulletCnt], {
                        scaleX: 0,
                        scaleY: 0
                    }, 200, Laya.Ease.backIn, 0), e.play(0, !1), e.on(Laya.Event.COMPLETE, this, function() {
                        e.destroy();
                    }), this.bulletCnt--;
                }
            }.bind(this));
        }
        reload() {
            var e = new Laya.TimeLine();
            for (this.bulletCnt += 1; this.bulletCnt < 6; this.bulletCnt++) e.addLabel("scale", 0).to(this["bullet" + this.bulletCnt], {
                scaleX: 1,
                scaleY: 1
            }, 200, Laya.Ease.backOut, 0);
            e.play(0, !1), e.on(Laya.Event.COMPLETE, this, function() {
                e.destroy();
            }), this.bulletCnt = 5;
        }
        onPause() {
            uiManager.openUI("game/PauseView.scene"), 
            this.setVisibleSth(!1);
        }
        onSet() {
            uiManager.openDialog("game/SettingView.scene"), 
            this.setVisibleSth(!1);
        }
        setChallengeKill(e) {
            let best = dataManager.getUserData("bestKillEnemyCnt");
            if(battleMgr.roundId === 100 && e > best){
                best = e;
                dataManager.setUserData("bestKillEnemyCnt",best);
            }
            this.lab_bestKillCnt.value = best;
            this.lab_killCnt.value = e;
        }
    }
    class n extends e {
        constructor() {
            super();
        }
        initUI() {
            battleMgr.pauseGame();
        }
        initData() {}
        initEvent() {
            utils.onBtnScaleEvent(this.btn_resume, this, function() {
                battleMgr.resumeGame(), this.doClose();
            }), utils.onBtnScaleEvent(this.btn_home, this, function() {
                battleMgr.restartGame(dataManager.getUserData("roundId")), 
                uiManager.getUI("game/MainView.scene").restartGame(), this.doClose();
            });
        }
        doClose() {
            super.doClose.call(this), uiManager.getUI("game/MainView.scene").setVisibleSth(!0);
        }
    }
    class o extends Laya.Dialog {
        constructor() {
            super(), this.autoDestroyAtClosed = !0, this.name = this.constructor.name, this._event = {}, 
            this._aniArr = [], this.$updateArr = [];
        }
        onAwake() {
            this.initUI(), G.test = this;
        }
        onOpened(e) {
            super.onOpened(), this.argObj = e, this.initEvent();
        }
        initUI() {}
        initEvent() {}
        addEvent(e, t) {
            this._event[e] = t.bind(this), eventDispatcher.addEventListen(e, this, this._event[e]);
        }
        removeEvent(e) {
            eventDispatcher.removeEventListen(e, this, this._event[e]);
        }
        removeAllEvent() {
            for (var e in this._event) this.removeEvent(e);
        }
        dispatchEvent(e, t) {
            eventDispatcher.dispatchEvent(e, t);
        }
        playAni(e, t) {
            e._aniID && this._aniArr.push(e), e.play(0, t), e.$isPlaying = !0;
        }
        stopAllAni() {
            for (var e = 0; e < this._aniArr.length; e++) {
                var t = this._aniArr[e];
                t.$isPlaying && t.stop();
            }
        }
        resumeAllAni() {
            for (var e = 0; e < this._aniArr.length; e++) {
                var t = this._aniArr[e];
                t.$isPlaying && t.play(0, t.loop);
            }
        }
        removeTimer() {
            if (this.$updateArr) for (var e = 0; e < this.$updateArr.length; e++) updateManager.clear(this.$updateArr[e]);
        }
        doClose(e) {
            uiManager.closeDialog(this.url);
        }
        onClosed() {
            this.removeTimer(), this.stopAllAni(), this.removeAllEvent();
        }
    }
    class r extends o {
        constructor() {
            super();
        }
        initData() {}
        initEvent() {
            utils.onBtnScaleEvent(this.btn_close, this, this.doClose), 
            // utils.onBtnScaleEvent(this.btn_vibrate, this, this.onVibrate), 
            utils.onBtnScaleEvent(this.btn_sound, this, this.onSound);
        }
        initUI() {
            // utils.getChildDeep(this.btn_vibrate, "on").visible = G.ISVIBRATE, 
            // utils.getChildDeep(this.btn_vibrate, "off").visible = !G.ISVIBRATE, 
            utils.getChildDeep(this.btn_sound, "on").visible = G.ISSOUND, utils.getChildDeep(this.btn_sound, "off").visible = !G.ISSOUND;
        }
        onVibrate() {
            G.ISVIBRATE = !G.ISVIBRATE;
            var e = utils.getChildDeep(this.btn_vibrate, "on"),
             t = utils.getChildDeep(this.btn_vibrate, "off");
            e.visible = !1, t.visible = !1, G.ISVIBRATE ? (e.visible = !0, G.vibration = !0, 
            sdkUtils && sdkUtils.startVibrate()) : (t.visible = !0, G.vibration = !1);
        }
        onSound() {
            G.ISSOUND = !G.ISSOUND;
            var e = utils.getChildDeep(this.btn_sound, "on"), t = utils.getChildDeep(this.btn_sound, "off");
            e.visible = !1, t.visible = !1, G.ISSOUND ? (e.visible = !0, audioManager.isPlaying && audioManager.playMusic(2), 
            audioManager.setSoundVolume(1)) : (t.visible = !0, audioManager.stopMusic(), audioManager.setSoundVolume(0));
        }
        onClosed() {
            super.onClosed.call(this), bondSDK && bondSDK.showMainMenu({}), uiManager.getUI("game/MainView.scene").setVisibleSth(!0);
        }
    }
    class l extends o {
        constructor() {
            super();
        }
        initData() {
            this.noBackClose = !0, G.showTry = !0;
        }
        initEvent() {
            utils.onBtnScaleEvent(this.btn_close, this, function() {
                this.isBtnClose = !0, this.hero1.dispose(), this.hero2.dispose(), this.doClose();
            }),
            utils.onBtnScaleEvent(this.btn_try1, this, this.onTry), utils.onBtnScaleEvent(this.btn_try2, this, this.onTry);
            // utils.onBtnScaleEvent(this.btn_noShow, this, function() {
            //     G.showTry = !G.showTry, G.showTry ? this.btn_noShow.skin = "nine/img_btn5_off.png" : this.btn_noShow.skin = "nine/img_btn5_on.png";
            // });
        }
        initUI() {
            this.newScene = this.box_scene.addChild(new Laya.Scene3D()), this.camera = cameraUtils.createCamera(new Laya.Vector3(.5, 1.5, 9), new Laya.Vector3(0, 0, 0), !1), 
            this.newScene.addChild(this.camera);
            var e = this;
            this.createRole(2, function(t) {
                e.hero1 = t, t.setLocalPosition(-.5, 1.8, 0);
            }), this.createRole(3, function(t) {
                e.hero2 = t, t.setLocalPosition(1.4, 1.8, 0);
            });
        }
        createRole(e, t) {
            var i = D.roleConfig[e], a = D.gunConfig[i.gunId], s = i.modelId, n = ulee.Model.create(this.newScene, s, Handler.create(this, function() {
                n.setLocalRotation(90, 0, 0), n.setLocalScale(1.5), utils.getChildDeep(n._sprite, "ray").active = !1;
                ulee.Model.create(utils.getChildDeep(n._sprite, "gun1"), a.modelId, Handler.create(this, function() {})), 
                ulee.Model.create(utils.getChildDeep(n._sprite, "gun2"), a.modelId, Handler.create(this, function() {}));
                this.resetAni(n, "idle"), t && t(n);
            }));
        }
        resetAni(e, t) {
            var i = [ "die", "idle", "jumpbackdown", "jumpbackup", "jumpforwarddown", "jumpforwardup", "reload", "run", "shootdown1", "shootdown2", "shootup1", "shootup2" ], a = e.animator;
            a._controllerLayers[0]._statesMap = [];
            for (var s = 0, n = 0; n < i.length; n++) {
                let o = i[n], r = "models/action/" + o + ".lani";
                Laya.AnimationClip.load(r, Laya.Handler.create(this, function(n) {
                    s++;
                    let r = new Laya.AnimatorState();
                    r.name = o, r.clip = n, a._controllerLayers[0].addState(r), s == i.length && e.playAnim(t);
                }));
            }
        }
        onTry(e) {
            this.isBtnClose = !0;
            var t = this;
            sdkUtils.showVideoAD(function() {
                e.target == t.btn_try1 ? t.tryRole(2) : e.target == t.btn_try2 && t.tryRole(3);
            }, function() {
                t.hero1.dispose(), t.hero2.dispose(), t.doClose();
            });
        }
        tryRole(e) {
            var t = this;
            t.hero1.dispose(), t.hero2.dispose(), battleMgr.createHero(e, function() {
                G.heroComplete = !0, t.doClose();
            });
        }
        onClosed() {
            super.onClosed.call(this), uiManager.getUI("game/MainView.scene").startGame();
        }
    }
    class h extends o {
        constructor() {
            super();
        }
        initData() {}
        initEvent() {
            utils.onBtnScaleEvent(this.btn_close, this, function() {
                this.model.dispose(), this.doClose();
            }), 
            utils.onBtnScaleEvent(this.btn_try, this, this.onTry); 
            utils.onBtnScaleEvent(this.btn_collect, this, this.onCollect);
        }
        initUI() {
            this.newScene = this.box_scene.addChild(new Laya.Scene3D()), 
            this.camera = cameraUtils.createCamera(new Laya.Vector3(.5, 1.5, 9), new Laya.Vector3(0, 0, 0), !1), 
            this.newScene.addChild(this.camera);
            this.model = ulee.Model.create(this.newScene, 50006, Handler.create(this, function() {
                this.model.setLocalScale(5), this.model.setLocalRotation(0, -90, 0), this.model.setLocalPosition(.5, 2, 0);
                var e = ulee.Model.create(this.model._sprite, 60004, Handler.create(this, function() {
                    e.setLocalScale(3);
                }));
            })); 
        }
        onTry(e) {
            var t = this;
            this.model.dispose();

            console.log("onTry")
            var i = uiManager.getUI("game/AccountView.scene");
            i && (i.btn_getWeapon.visible = !1), 
            sdkUtils.showVideoAD(function() {
                battleMgr.tryTimes = 0, battleMgr.changeGun(4), t.doClose();
            }, function() {
                utils.prompt("Failed to get the reward, please watch the ads to the end.")
                t.doClose();
            });
        }
        onCollect(e) {
            console.log("onCollect")
            let money = dataManager.getUserData("money");
            if(money >=300){
                dataManager.setUserData("money", money - 300);

                this.model.dispose(); 
                var i = uiManager.getUI("game/AccountView.scene");
                i && (i.btn_getWeapon.visible = !1),
                battleMgr.tryTimes = 0,
                battleMgr.changeGun(4);
                var t = uiManager.getUI("game/MainView.scene");
                t.hideGetWeapon();
                t.updateMoney();
                this.doClose();
                
            }else{
                utils.prompt("Money is not enough");
            }
        }
    }
    class d {
        static init() {
            let e = Laya.ClassUtils.regClass;
            e("script/AccountUI.js", t), e("script/GameLoading.js", a), e("script/MainUI.js", s), 
            e("script/PauseUI.js", n), e("script/SettingUI.js", r), e("script/TryRoleUI.js", l), 
            e("script/GetWeaponUI.js", h);
        }
    }
    d.width = 720, d.height = 1559, d.scaleMode = "showall", d.screenMode = "none", 
    d.alignV = "top", d.alignH = "left", d.startScene = "game/LoadingView.scene", d.sceneRoot = "", 
    d.debug = !1, d.stat = !1, d.physicsDebug = !1, d.exportSceneToJson = !0, d.init(), 
    window.ulee = {}, ulee.io = {}, window.G = {}, window.D = {}, window.Vector3 = Laya.Vector3, 
    window.Pool = Laya.Pool, window.Handler = Laya.Handler, G.VERSION = 1, G.DEBUG = !1, 
    G.ONLINE = !1, G.PRINT_CLICK = !1, G.LOAD_DATA_JS = !0, G.setDebugMode = function() {
        G.PRINT_CLICK = !0, G.DEBUG = !0, Laya.Stat.show(0, 0);
    }, G.ENUM_LOOP_TYPE = {
        FRAME: 0,
        TIME: 1
    }, G.FRAME_INTERVAL = 0, G.NOW = Laya.Browser.now(), G.DELAYTIME = null, G.ADGUSTTIME = null, 
    G.SERVER_FRAMETIME = null, Math.RAD_1_ANGLE = Math.PI / 180, Math.ANGLE_1_RAD = 180 / Math.PI, 
    G.SCREEN_MODETYPE = {
        H: 0,
        V: 1
    }, G.SCREEN_MODE = G.SCREEN_MODETYPE.V, G.GAME_STATE = {
        READY: 0,
        START: 1,
        END: 2
    }, G.showTry = !0, G.MAXROUNDID = 100, G.LOADMODEL = [], G.sessionId = null, G.LOGIN_URL = "../../../192.168.1.12_3A8080/bikeServer", 
    G.SDKTYPE = null, G.ShareLimitTime = 2e3, G.ISSHOWSIGN = !1, G.ISTURNTABLE = !1, 
    G.ISVIBRATE = !0, G.vibration = !0, G.ISSOUND = !0, G.music = !0, Array.prototype.pushAll = function(e) {
        if (e) {
            if (!(e instanceof Array)) throw new error("参数items必须为数组类型");
            for (var t = 0; t < e.length; t++) this.push(e[t]);
        }
    }, Array.prototype.insert = function(e, t) {
        this.splice(e, 0, t);
    }, Array.prototype.remove = function(e) {
        for (var t = this.length - 1; t >= 0; t--) this[t] == e && this.splice(t, 1);
    }, Array.prototype.removeAt = function(e) {
        var t = this[e];
        return this.splice(e, 1), t;
    }, Array.prototype.removeAll = function() {
        this.length = 0;
    }, Array.prototype.contains = function(e) {
        return -1 != this.indexOf(e);
    }, Array.prototype.last = function() {
        return this[this.length - 1];
    }, Array.prototype.disposeArray = function() {
        if (this && 0 != this.length) {
            for (var e = this.length - 1; e >= 0; e--) this[e].dispose();
            this.removeAll();
        }
    }, Array.prototype.isEmpty = function() {
        return 0 == this.length;
    }, G.clone = function(e) {
        if (null == e || "object" != typeof e) return e;
        if (e instanceof Date) return t.setTime(e.getTime()), t;
        if (e instanceof Array) {
            for (var t = [], i = 0; i < e.length; ++i) t[i] = G.clone(e[i]);
            return t;
        }
        if (e instanceof Object) {
            for (var a in t = {}, e) e.hasOwnProperty(a) && (t[a] = G.clone(e[a]));
            return t;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }, Date.prototype.format = function(e) {
        var t = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        for (var i in /(y+)/i.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
        t) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
        return e;
    }, String.prototype.startWith = function(e) {
        var t = "^" + e, i = Pool.getItem(t, RegExp);
        null == i && (i = new RegExp(t));
        var a = i.test(this);
        return Pool.recover(t, i), a;
    }, String.prototype.endWith = function(e) {
        var t = e + "$", i = Pool.getItem(t, RegExp);
        null == i && (i = new RegExp(t));
        var a = i.test(this);
        return Pool.recover(t, i), a;
    }, String.prototype.replaceAll = function(e, t) {
        return this.split(e).join(t);
    }, G.resManager = {
        img: {}
    }, G.delResCount = function(e) {
        if (e) for (var t = G.resManager.img, i = 0; i < e.length; i++) {
            var a = e[i].url;
            t[a] -= 1, 0 == t[a] && G.clearRes(a);
        }
    }, G.clearRes = function(e) {
        Laya.loader.clearRes(e), e = laya.net.URL.formatURL(e), Laya.loader.clearRes(e);
    }, G.addResCount = function(e, t) {
        var i = G.resManager[e];
        i[t] ? i[t] += 1 : i[t] = 1;
    }, G.copyProperties = function(e, t) {
        for (var i in e) t[i] = e[i];
    }, G.getLength = function(e) {
        var t = 0;
        for (var i in e) t++;
        return t;
    }, Laya.Loader.cacheRes = function(e, t) {
        e = Laya.URL.formatURL(e), null != !Laya.Loader.loadedMap[e] && (Laya.Loader.loadedMap[e] = t);
    }, D = {}, D.properties = {}, D.backgroundConfig = {
        1: [ 40001 ],
        10: [ 40010 ],
        11: [ 40011 ],
        12: [ 40012 ],
        13: [ 40013 ],
        2: [ 40002 ],
        3: [ 40003 ],
        4: [ 40004 ],
        5: [ 40005 ],
        6: [ 40006 ],
        7: [ 40007 ],
        8: [ 40008 ],
        9: [ 40009 ]
    }, D.properties.backgroundConfig = [ "bgId", "modelId" ], D.CommonParameter = {
        adGetDiamondNum: [ "200,250,300,350,400" ],
        chooseForgRound: [ "2" ],
        chooseFrogId: [ "1001,1007,1013,1019,1025,1031" ],
        finshBlockType: [ "1,2,4,5" ],
        frogBiggerTimes: [ "20,1.1;40,1.2;60,1.3;80,1.4;100,1.5" ],
        frogColorLv: [ "1,2,3,4,5,5" ],
        guideRound: [ "2" ],
        pefectAtkScoreTimes: [ "10" ],
        signResetTime: [ "1" ],
        skillEffectDistance: [ "6.5,11.5,16.5,21.5,26.5,31.5" ],
        skillProgressIncrease: [ "2,0.1;3,0.2;4,0.3;5,0.35;6,0.4;7,0.5" ],
        skillProgressReducePerSecond: [ "0.05" ],
        trialFrogLv: [ "3" ],
        turntableFreeTimes: [ "1" ],
        userAdTimeLimit: [ "15" ],
        videoGetItemId: [ "30007" ]
    }, D.properties.CommonParameter = [ "id", "value" ], D.GameText = {
        1001: [ "确认" ],
        1002: [ "怪物剩余 {0}%" ],
        1003: [ "爆头射击" ],
        1004: [ "仓位已满" ],
        1005: [ "增加经验{0}点" ],
        1006: [ "等级{0}" ],
        1007: [ "领取" ],
        1008: [ "商店" ],
        1009: [ "特权" ],
        1010: [ "枪库" ],
        1011: [ "功能暂未开放" ],
        1012: [ "货币不足" ],
        1013: [ "视频观看失败，无法获得奖励" ],
        1014: [ "获得 {0}" ],
        1015: [ "第{0}关" ],
        1016: [ "今日已签到" ],
        1017: [ "设置" ],
        1018: [ "音乐音效" ],
        1019: [ "震动" ],
        1020: [ "射击滑动灵敏度" ],
        1021: [ "继续游戏" ],
        1022: [ "返回主页" ],
        1023: [ "已领取" ],
        1024: [ "任务未完成，不能领取奖励" ],
        1025: [ "任务完成，领取奖励 钻石X{0}" ],
        1026: [ "胜 利" ],
        1027: [ "你也被感染啦" ],
        1028: [ "前往战场" ],
        1029: [ "成就未完成" ],
        1030: [ "完成成就，领取奖励 钻石X{0}" ],
        1031: [ "请先解锁弓箭" ],
        1032: [ "解锁新弓箭" ],
        1033: [ "等级:{0} {1}" ],
        1034: [ "钻石 X{0}" ],
        1035: [ "获得奖励" ],
        1036: [ "购买成功" ],
        1037: [ "钻石不足" ],
        1038: [ "任务" ],
        1039: [ "登录签到" ],
        1040: [ "钻石的馈赠" ],
        1041: [ "今天已经没有观看次数啦，明天再试呗！" ],
        1042: [ "幸运转盘" ],
        1043: [ "免费次数({0} / {1})" ],
        1044: [ "自动合成" ],
        1045: [ "射速x{0}" ],
        1046: [ "{0}秒内弓箭自动合成" ],
        1047: [ "获得Buff" ],
        1048: [ "获得Buff失败" ],
        1049: [ "豪华大礼包" ],
        1050: [ "已经在使用啦！" ],
        1051: [ "所有弓箭射速翻倍" ],
        1052: [ "时间已经满啦，等下再试吧！" ],
        1053: [ "自动合成已开启！" ],
        1054: [ "存钱罐" ],
        1055: [ "金币 X{0}" ],
        1056: [ "先击杀怪物累积存款，再来领取吧！" ],
        1057: [ "射速X2 {0}秒" ],
        1058: [ "宝箱 X{0}" ],
        1059: [ "达到{0}%即可领取！" ],
        1060: [ "位置已满！" ],
        1061: [ "点击购买新武器" ],
        1062: [ "两个同等级武器可以合成更高等级的武器，拖动合成" ],
        1063: [ "将武器移动至发射台上，即可攻击来袭的怪物" ],
        1064: [ "武器已升至满级" ],
        1065: [ "{0}级可解锁" ],
        1066: [ "合成成功！" ],
        1067: [ "碎片不足！" ],
        1068: [ "领取成功！" ],
        1069: [ "关卡{0}" ]
    }, D.properties.GameText = [ "id", "chs" ], D.terrainConfig = {
        1: [ 30001 ],
        2: [ 30002 ],
        3: [ 30003 ],
        4: [ 30004 ],
        5: [ 30005 ]
    }, D.properties.terrainConfig = [ "terrainId", "modelId" ], D.shareConfig = {
        1: [ "枪枪爆头,成为真正的特工007！", "https://mmocgame.qpic.cn/wechatgame/R7CtHO6xu5h2OQUxIv1s9ebKVTxibxwdY8MxwJqeKsMky4tPSLXIlvIf3E8GtKlIl/0", "5avIYL2aRaavkRKGttJ8SA==" ]
    }, D.properties.shareConfig = [ "id", "title", "imgUrl", "imgId" ], D.roundConfig = {
        1: [ [ 1, 1, 1 ], [ 9, 2, 8 ], [ 0, 1, 0 ], [ 0, 2, 0 ], "0#3.3,0#0", "0#8,0#0", "0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        10: [ [ 1, 4, 4, 1 ], [ 10, 6, 7, 8 ], [ 0, 13, 17, 0 ], [ 0, 3, 4, 0 ], "0#4.2,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        100: [ [ 1, 1, 4, 3, 4, 2, 1, 4, 3, 4, 5, 2, 2, 4, 4, 4, 1, 3, 3, 5, 5, 2, 4, 2, 4, 1, 1, 5, 3, 2, 5, 4, 2, 3, 5, 2, 2, 4, 4, 1, 4, 5, 5, 4, 4, 5, 1 ], [ 11, 2, 6, 5, 7, 4, 2, 6, 5, 7, 3, 4, 4, 6, 6, 7, 2, 5, 5, 3, 3, 4, 6, 4, 7, 2, 2, 3, 5, 4, 3, 6, 4, 5, 3, 4, 4, 6, 6, 2, 6, 3, 3, 6, 6, 3, 8 ], [ 0, 1, 26, 4, 27, 28, 2, 13, 3, 17, 5, 11, 10, 14, 13, 17, 2, 4, 4, 9, 8, 12, 15, 11, 17, 19, 2, 9, 4, 12, 8, 15, 12, 4, 9, 12, 12, 15, 15, 19, 23, 20, 21, 24, 25, 22, 0 ], [ 0, 2, 3, 1, 4, 1, 2, 3, 1, 4, 1, 1, 1, 3, 3, 4, 2, 1, 1, 2, 2, 1, 3, 1, 4, 2, 2, 2, 1, 1, 2, 3, 1, 1, 2, 1, 1, 3, 3, 2, 3, 2, 2, 3, 3, 2, 0 ], "0#3.3,0#4.2,0#3.3,0#4.2,0#3.3,0#3.3,0#4.2,0#3.3,0#4.2,0#3.3,0#3.3,0#3.3,0#4.2,0#4.2,0#4.2,0#3.3,0#3.3,0#3.3,0#3.3,0#3.3,0#3.3,0#4.2,0#3.3,0#4.2,0#3.3,0#3.3,0#3.3,0#3.3,0#3.3,0#3.3,0#4.2,0#3.3,0#3.3,0#3.3,0#3.3,0#3.3,0#4.2,0#4.2,0#3.3,0#4,0#3.3,0#3.3,0#4,0#4,0#3.3,0#0", "0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0", "0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#2.9", "ground3.jpg", "bg/img_backGround3.png" ],
        11: [ [ 1, 1, 3, 1 ], [ 9, 2, 5, 8 ], [ 0, 2, 4, 0 ], [ 0, 2, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        12: [ [ 1, 3, 5, 1 ], [ 11, 5, 3, 8 ], [ 0, 4, 9, 0 ], [ 0, 1, 2, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        13: [ [ 1, 5, 2, 1 ], [ 12, 3, 4, 8 ], [ 0, 8, 12, 0 ], [ 0, 2, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        14: [ [ 1, 4, 2, 1 ], [ 13, 6, 4, 8 ], [ 0, 15, 11, 0 ], [ 0, 3, 1, 0 ], "0#4.2,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        15: [ [ 1, 4, 1, 1 ], [ 10, 7, 2, 8 ], [ 0, 17, 19, 0 ], [ 0, 4, 2, 0 ], "0#4.2,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        16: [ [ 1, 1, 5, 1 ], [ 9, 2, 3, 8 ], [ 0, 2, 9, 0 ], [ 0, 2, 2, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        17: [ [ 1, 3, 2, 1 ], [ 11, 5, 4, 8 ], [ 0, 4, 12, 0 ], [ 0, 1, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        18: [ [ 1, 5, 4, 1 ], [ 12, 3, 6, 8 ], [ 0, 8, 15, 0 ], [ 0, 2, 3, 0 ], "0#3.3,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        19: [ [ 1, 2, 3, 1 ], [ 13, 4, 5, 8 ], [ 0, 12, 4, 0 ], [ 0, 1, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        2: [ [ 1, 4, 1 ], [ 11, 6, 8 ], [ 0, 26, 0 ], [ 0, 3, 0 ], "0#4.2,0#0", "0#8,0#0", "0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        20: [ [ 1, 5, 2, 1 ], [ 10, 3, 4, 8 ], [ 0, 9, 12, 0 ], [ 0, 2, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        21: [ [ 1, 2, 4, 1 ], [ 9, 4, 6, 8 ], [ 0, 12, 15, 0 ], [ 0, 1, 3, 0 ], "0#3.3,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        22: [ [ 1, 4, 1, 1 ], [ 11, 6, 2, 8 ], [ 0, 15, 19, 0 ], [ 0, 3, 2, 0 ], "0#4.2,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        23: [ [ 1, 4, 5, 1 ], [ 12, 6, 3, 8 ], [ 0, 23, 20, 0 ], [ 0, 3, 2, 0 ], "0#4,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        24: [ [ 1, 5, 4, 1 ], [ 13, 3, 6, 8 ], [ 0, 21, 24, 0 ], [ 0, 2, 3, 0 ], "0#3.3,0#4,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        25: [ [ 1, 4, 5, 1 ], [ 10, 6, 3, 8 ], [ 0, 25, 22, 0 ], [ 0, 3, 2, 0 ], "0#4,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground2.jpg", "bg/img_backGround2.png" ],
        3: [ [ 1, 3, 1 ], [ 12, 5, 8 ], [ 0, 4, 0 ], [ 0, 1, 0 ], "0#3.3,0#0", "0#8,0#0", "0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        4: [ [ 1, 4, 1 ], [ 13, 7, 8 ], [ 0, 27, 0 ], [ 0, 4, 0 ], "0#4.2,0#0", "0#8,0#0", "0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        5: [ [ 1, 2, 1 ], [ 10, 4, 8 ], [ 0, 28, 0 ], [ 0, 1, 0 ], "0#3.3,0#0", "0#8,0#0", "0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        6: [ [ 1, 1, 4, 1 ], [ 9, 2, 6, 8 ], [ 0, 2, 13, 0 ], [ 0, 2, 3, 0 ], "0#3.3,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        7: [ [ 1, 3, 4, 1 ], [ 11, 5, 7, 8 ], [ 0, 3, 17, 0 ], [ 0, 1, 4, 0 ], "0#3.3,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        8: [ [ 1, 5, 2, 1 ], [ 12, 3, 4, 8 ], [ 0, 5, 11, 0 ], [ 0, 1, 1, 0 ], "0#3.3,0#3.3,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground.jpg", "bg/img_backGround.png" ],
        9: [ [ 1, 2, 4, 1 ], [ 13, 4, 6, 8 ], [ 0, 10, 14, 0 ], [ 0, 1, 3, 0 ], "0#3.3,0#4.2,0#0", "0#8,0#8,0#0", "0#0#0#2.9", "ground.jpg", "bg/img_backGround.png" ]
    }, D.properties.roundConfig = [ "roundId", "terrainId", "bgId", "monsterComposeId", "shotType", "jumpSpot", "loadSpot", "endSpot", "picture1", "picture2" ], 
    D.monsterComposeConfig = {
        1: [ [ 1 ] ],
        10: [ [ 27, 28 ] ],
        11: [ [ 27, 28 ] ],
        12: [ [ 8, 9, 10 ] ],
        13: [ [ 23, 24 ] ],
        14: [ [ 23, 24 ] ],
        15: [ [ 11, 12, 13 ] ],
        16: [ [ 25, 26 ] ],
        17: [ [ 25, 26 ] ],
        18: [ [ 14, 15, 16 ] ],
        19: [ [ 18, 1, 2 ] ],
        2: [ [ 1, 2 ] ],
        20: [ [ 5, 7, 19 ] ],
        21: [ [ 5, 19, 22 ] ],
        22: [ [ 5, 7, 19, 22 ] ],
        23: [ [ 11, 12, 13, 21 ] ],
        24: [ [ 20, 11, 12, 13 ] ],
        25: [ [ 20, 11, 12, 13, 21 ] ],
        26: [ [ 23, 24 ] ],
        27: [ [ 25, 26 ] ],
        28: [ [ 27, 28 ] ],
        3: [ [ 3, 4 ] ],
        4: [ [ 3, 4 ] ],
        5: [ [ 6, 7 ] ],
        6: [ [ 5, 7 ] ],
        7: [ [ 6, 7 ] ],
        8: [ [ 5, 17 ] ],
        9: [ [ 5, 17, 7 ] ]
    }, D.properties.monsterComposeConfig = [ "monsterComposeId", "monsterId" ], D.monsterConfig = {
        1: [ "3.7,2.356,0", "role_shoot.jpg", "shoot10", "idle2" ],
        10: [ "5.5,-0.9,-0.1", "role_shoot3.jpg", "shoot1", "idle" ],
        11: [ "3.4,2.03,0", "role_shoot4.jpg", "shoot6", "idle" ],
        12: [ "4.5,2.03,0", "role_shoot4.jpg", "shoot5", "idle" ],
        13: [ "5.6,2.03,0", "role_shoot4.jpg", "shoot4", "idle" ],
        14: [ "3.5,-1.215,1.22", "role_shoot5.jpg", "shoot3", "idle" ],
        15: [ "4.5,-1.215,1.22", "role_shoot5.jpg", "shoot2", "idle" ],
        16: [ "5.5,-1.215,1.22", "role_shoot5.jpg", "shoot1", "idle" ],
        17: [ "3.9,-0.87,-0.1", "role_shoot2.jpg", "shoot3", "idle" ],
        18: [ "1.8,0.7,-0.9", "role_shoot.jpg", "shoot3", "idle" ],
        19: [ "5.5,-2.2,-0.1", "role_shoot2.jpg", "shoot1", "idle" ],
        2: [ "5.5,0,0", "role_shoot.jpg", "shoot1", "idle" ],
        20: [ "2.5,2.03,0", "role_shoot4.jpg", "shoot6", "idle" ],
        21: [ "6.5,2.03,0", "role_shoot4.jpg", "shoot4", "idle" ],
        22: [ "3.85,-0.87,-0.1", "role_shoot2.jpg", "shoot3", "idle" ],
        23: [ "3.7,2.03,0", "role_shoot4.jpg", "shoot6", "idle" ],
        24: [ "5.3,2.03,0", "role_shoot4.jpg", "shoot4", "idle" ],
        25: [ "4,-1.215,1.22", "role_shoot5.jpg", "shoot3", "idle" ],
        26: [ "5,-1.215,1.22", "role_shoot5.jpg", "shoot1", "idle" ],
        27: [ "4,-0.9,-0.1", "role_shoot3.jpg", "shoot2", "idle" ],
        28: [ "5,-0.9,-0.1", "role_shoot3.jpg", "shoot1", "idle" ],
        3: [ "4,-1.46,0.5", "role_shoot1.jpg", "shoot2", "idle" ],
        4: [ "5,-1.46,0.5", "role_shoot1.jpg", "shoot1", "idle" ],
        5: [ "2.63,2.13,-1.02", "role_shoot2.jpg", "shoot6", "idle" ],
        6: [ "3.85,-0.87,-0.1", "role_shoot2.jpg", "shoot2", "idle" ],
        7: [ "5.87,2.356,0", "role_shoot2.jpg", "shoot9", "idle2" ],
        8: [ "3.5,-0.9,-0.1", "role_shoot3.jpg", "shoot2", "idle" ],
        9: [ "4.5,-0.9,-0.1", "role_shoot3.jpg", "shoot1", "idle" ]
    }, D.properties.monsterConfig = [ "monsterId", "position", "picture", "shootAction", "idleAction" ], 
    D.roleConfig = {
        1: [ "models/obj/obj_texture/character1.jpg", 20001, 1 ],
        2: [ "models/obj/obj_texture/player_3_mesh_1.jpg", 20002, 2 ],
        3: [ "models/obj/obj_texture/Player_10_Mesh_1.jpg", 20003, 3 ]
    }, D.properties.roleConfig = [ "roleId", "picture", "modelId", "gunId" ], D.sloganConfig = {
        1: [ "吃我一枪！" ],
        10: [ "一个人就是一支军队！" ],
        2: [ "一枪，一个！" ],
        3: [ "火力全开！" ],
        4: [ "排排站，吃子弹！" ],
        5: [ "就这点本事？" ],
        6: [ "这也太简单了叭！" ],
        7: [ "都是小角色！" ],
        8: [ "胜利的味道！" ],
        9: [ "我发飙了！" ]
    }, D.properties.sloganConfig = [ "id", "content" ], D.PrefabsPath = {
        10001: [ 2, "models/obj/enemy1", , 1, , 1 ],
        20001: [ 2, "models/obj/hero", , 1, , 1 ],
        20002: [ 2, "models/obj/hero2", , 1, , 1 ],
        20003: [ 2, "models/obj/hero3", , 1, , 1 ],
        30001: [ 2, "models/obj/ground1", , 1, , 1 ],
        30002: [ 2, "models/obj/ground2", , 1, , 1 ],
        30003: [ 2, "models/obj/ground3", , 1, , 1 ],
        30004: [ 2, "models/obj/ground4", , 1, , 1 ],
        30005: [ 2, "models/obj/ground5", , 1, , 1 ],
        40001: [ 2, "models/obj/platform1", , 1, , 1 ],
        40002: [ 2, "models/obj/platform2", , 1, , 1 ],
        40003: [ 2, "models/obj/platform3", , 1, , 1 ],
        40004: [ 2, "models/obj/platform4", , 1, , 1 ],
        40005: [ 2, "models/obj/platform5", , 1, , 1 ],
        40006: [ 2, "models/obj/platform6", , 1, , 1 ],
        40007: [ 2, "models/obj/platform7", , 1, , 1 ],
        40008: [ 2, "models/obj/platform8", , 1, , 1 ],
        40009: [ 2, "models/obj/platform9", , 1, , 1 ],
        40010: [ 2, "models/obj/platform10", , 1, , 1 ],
        40011: [ 2, "models/obj/platform11", , 1, , 1 ],
        40012: [ 2, "models/obj/platform12", , 1, , 1 ],
        40013: [ 2, "models/obj/platform13", , 1, , 1 ],
        50001: [ 2, "models/obj/bullet", , 1, , 1 ],
        50002: [ 2, "models/obj/pistol", , 2, , 1 ],
        50003: [ 2, "models/obj/gun01", , 1.8, , 1 ],
        50004: [ 2, "models/obj/gun02", , 1.8, , 1 ],
        50005: [ 2, "models/obj/gun00", , 1.5, , 1 ],
        50006: [ 2, "models/obj/gun03", , 1.6, , 1 ],
        60001: [ 3, "effect/particle/blood", , 1, , 1 ],
        60002: [ 3, "effect/particle/bullet2", , 1, , 1 ],
        60003: [ 3, "effect/particle/bullet3", , 1, , 1 ],
        60004: [ 3, "effect/particle/effect_stars", , 1, , 1 ],
        60005: [ 3, "effect/particle/bullet4", , 1, , 1 ]
    }, D.properties.PrefabsPath = [ "1", "type", "chs", "subModel", "scale", "additionalId", "modelPlayRate", "actionFile", "actionInShop", "note3", "rotation", "directional" ], 
    D.gunConfig = {
        1: [ 50001, 50005 ],
        2: [ 60002, 50004 ],
        3: [ 60003, 50003 ],
        4: [ 60005, 50006 ]
    }, D.properties.gunConfig = [ "gunId", "bulletId", "modelId" ], D.musicBasic = {
        1: [ 2, "music/ui_click.mp3", 100 ],
        10: [ 2, "music/fight_enemyHurt02.mp3", 100 ],
        11: [ 2, "music/fight_enemyHurt03.mp3", 100 ],
        12: [ 2, "music/fight_enemyHurt04.mp3", 100 ],
        2: [ 1, "music/ui_bgm.mp3", 100 ],
        3: [ 2, "music/ui_victory.mp3", 100 ],
        4: [ 2, "music/ui_gameOver.mp3", 100 ],
        5: [ 2, "music/fight_pistolShot.mp3", 100 ],
        6: [ 2, "music/fight_pistolReload.mp3", 100 ],
        7: [ 2, "music/fight_land.mp3", 100 ],
        8: [ 2, "music/fight_land.mp3", 100 ],
        9: [ 2, "music/fight_enemyHurt01.mp3", 100 ]
    }, D.properties.musicBasic = [ "ID", "type", "file", "musicPower" ], function() {
        ulee.Utils = function() {
            this._pool = Laya.Pool;
        }, (0, Laya.ClassUtils.regClass)(ulee.Utils, "ulee.Utils");
        var e = ulee.Utils.prototype;
        e.getColor = function(e) {
            return this.colorConfig[e];
        }, e.onBtnEvent = function(e, t, i) {
            null == e && console.log("控件不存在"), e.offAll(), e.on(Laya.Event.MOUSE_DOWN, t, function(e) {
                e.stopPropagation();
            }), e.on(Laya.Event.ROLL_OUT, t, function(e) {
                e.stopPropagation();
            }), e.on(Laya.Event.MOUSE_UP, t, function(e) {
                e.stopPropagation();
            }), e.on(Laya.Event.CLICK, t, function(e) {
                null != i && i.bind(t)(e), null != e.stopPropagation && e.stopPropagation();
            });
        }, e.offBtnEvent = function(e, t, i) {
            null == e && console.log("控件不存在"), e.off(Event.CLICK, t, i);
        }, e.onBtnScaleEvent = function(e, t, i) {
            null == e && console.log("控件不存在");
            var a = e.scaleX ? e.scaleX : 1, s = e.scaleY ? e.scaleY : 1;
            e.offAll(), e.anchorX = isNaN(e.anchorX) ? 0 : e.anchorX, e.anchorY = isNaN(e.anchorY) ? 0 : e.anchorY;
            var n = e.x + (.5 * e.width - e.width * e.anchorX), o = e.y + (.5 * e.height - e.height * e.anchorY);
            e.anchorX = .5, e.anchorY = .5, e.x = n, e.y = o, e.on(Laya.Event.MOUSE_DOWN, t, function(e) {
                audioManager.playSound(1), e.target.scale(.9 * a, .9 * s), e.stopPropagation();
            }), e.on(Laya.Event.ROLL_OUT, t, function(e) {
                e.currentTarget.scale(a, s), e.stopPropagation();
            }), e.on(Laya.Event.MOUSE_UP, t, function(e) {
                e.target.scale(a, s), e.stopPropagation();
            }), e.on(Laya.Event.CLICK, t, function(e) {
                null != i && i.bind(t)(e), null != e.stopPropagation && e.stopPropagation();
            });
        }, e.getString = function(t, i) {
            if (!D.GameText[t]) return t + i;
            var a = D.GameText[t].chs;
            return a ? i ? e.stringFormat(a, i) : a : "";
        }, e.getLength = function(e) {
            return e.replace(/[\u0391-\uFFE5]/g, "aa").length;
        }, e.stringFormat = function(e, t) {
            if (!e) return t;
            var i = e;
            if (t) for (var a = 0; a < t.length; a++) i = i.replaceAll("{" + a + "}", t[a]);
            return i;
        }, e.setImgBlur = function(e, t) {
            if (e) {
                t = t || 5;
                var i = new Laya.BlurFilter();
                i.strength = t, e.filters = [ i ];
            }
        }, e.setImgGlow = function(e, t, i) {
            if (e) {
                i = i || 10, t = "#ffff00";
                var a = new Laya.GlowFilter(t, i, 0, 0);
                e.filters = [ a ];
            }
        }, e.setImgColor = function(e, t) {
            var i = new Laya.ColorFilter(t);
            e.filters = [ i ];
        }, e.clearFilters = function(e) {
            e.filters = [];
        }, e.getChildDeep = function(e, t) {
            var i = e.getChildByName(t);
            if (i) return i;
            for (var a = 0; a < e._children.length; a++) if (i = utils.getChildDeep(e._children[a], t)) return i;
        }, e.listSelectEx = function(e) {
            Laya.getset(0, e, "selectedIndex", function() {
                return this._selectedIndex;
            }, function(e) {
                this._selectedIndex != e && (this._selectedIndex = e, this.changeSelectStatus(), 
                this.event("change"), this.selectHandler && this.selectHandler.runWith([ e, this.getCell(e), this ]), 
                this.startIndex = this._startIndex);
            });
        }, e.setHtmlLabel = function(e, t, i) {
            i || (e.style.fontSize = 24, e.style.font = "黑体", e.style.color = "#ffffff", e.style.align = "center"), 
            e.innerHTML = utils.getString(t);
        }, e.setResUsed = function(e) {
            for (var t = 0; t < e.length; t++) G.addResCount("img", e[t].url);
        }, e.setResUnused = function(e) {
            for (var t = 0; t < e.length; t++) G.delResCount(e[t].url);
        }, e.getTimeLine = function(e) {
            var t = this, i = this._pool.getItemByClass("TimeLine", Laya.TimeLine);
            i.reset();
            return i.on(Laya.Event.COMPLETE, this, function() {
                t._pool.recover("TimeLine", i), e && e.run();
            }), i;
        }, e.transPos = function(e, t) {
            var i = new Laya.Point();
            return e.localToGlobal(i), t.globalToLocal(i, !0);
        }, e.prompt = function(e) {
            e && (this.m_systemPrompt || (this.m_systemPrompt = window.promptUtils, this.m_systemPrompt.init()), 
            this.m_systemPrompt.prompt(e));
        }, e.movePrompt = function(e) {}, e.promptImg = function(e) {
            e && (this.m_systemPrompt || (this.m_systemPrompt = uiManager.openUI(ulee.Prompt)), 
            this.m_systemPrompt.prompt1(e));
        }, e.sendParamHttp = function(e, t, i) {
            var a = new Laya.HttpRequest();
            a._loadedSize = 0, a._totalSize = 5e6, a.once(Laya.Event.COMPLETE, this, this.onHttpCompelete, [ a, i ]);
            for (key in t) e += this.stringFormat("&{0}={1}", [ key, t[key] ]);
            a.send(e, null, "get", "text");
        }, e.onHttpCompelete = function(e, t) {
            t && t.runWith(e.data);
        }, e.formatTime = function(e, t) {
            var i = Math.floor(e / 60);
            if (e %= 60, !t || i < 60) return utils.timeNumberFormat(i) + ":" + utils.timeNumberFormat(e);
            var a = Math.floor(i / 60);
            return i %= 60, a + ":" + utils.timeNumberFormat(i) + ":" + utils.timeNumberFormat(e);
        }, e.timeNumberFormat = function(e) {
            return (e < 10 ? "0" : "") + parseInt(e);
        }, e.updateCircleHead = function(e) {
            var t = new Laya.Sprite();
            t.graphics.drawCircle(e.width / 2, e.width / 2, e.width / 2, "#ffff00"), t.pos(0, 0), 
            e.mask = t;
        }, e.listSelectEx = function(e) {
            Laya.getset(0, e, "selectedIndex", function() {
                return this._selectedIndex;
            }, function(e) {
                this._selectedIndex != e && (this._selectedIndex = e, this.changeSelectStatus(), 
                this.event("change"), this.selectHandler && this.selectHandler.runWith([ e, this.getCell(e), this ]), 
                this.startIndex = this._startIndex);
            });
        }, e.listHandler = function(e, t, i, a) {
            e && (i && (e.renderHandler = new Handler(t, i.bind(t))), a && (e.selectHandler = new Handler(t, a.bind(t))), 
            e.scrollBar && (e.scrollBar.visible = !1), e.selectEnable = !0);
        }, e.cutstr = function(e, t) {
            for (var i = "", a = 0; a < e.length; a++) if (i += e[a], a + 1 == t) {
                i += "...";
                break;
            }
            return i;
        }, e.setVector3 = function(e, t, i, a) {
            e.x = t, e.y = i, e.z = a;
        }, e.getImgUrl = function(e) {
            if (e) {
                try {
                    imgUrl = D.SpritePath[e].chs;
                } catch (t) {
                    console.error("找不到图片资源,id:" + e + "/使用临时资源替换"), imgUrl = D.SpritePath[100].chs;
                }
                return imgUrl;
            }
        }, e.rayCast = function(e, t, i) {
            for (var a = new Laya.RaycastHit(), s = 0, n = t.length; s < n; s++) {
                var o = t[s];
                if (o.enable && (o.raycast(e, a, i), -1 !== a.distance)) return !0;
            }
        }, e.getYearWeek = function(e, t, i) {
            var a = new Date(e, parseInt(t) - 1, i), s = new Date(e, 0, 1), n = Math.round((a.valueOf() - s.valueOf()) / 864e5);
            return Math.ceil((n + (s.getDay() + 1 - 1)) / 7);
        }, e.gameCoinAnimation = function(e, t, i, a, s, n) {
            this.timeLineArr = [];
            var o = 5;
            1 == t ? (o = e) > 25 && (o = 25) : e > 1e6 ? o = 30 : e > 1e5 ? o = 20 : e > 1e4 && (o = 10);
            var r = new Laya.FontClip("fnt/number1.png", "1234567890");
            r.x = i.x + 50, r.y = i.y + 18, r.alpha = 0, r.value = e, r.scale(0, 0), r.anchorX = .5, 
            r.anchorY = .5, s.addChild(r);
            var l = new Laya.TimeLine();
            l.name = "moneyAni", this.timeLineArr.push(l), l.to(r, {
                scaleX: .4,
                scaleY: .4,
                alpha: 1
            }, 300).to(r, {
                scaleX: .2,
                scaleY: .2,
                alpha: 0
            }, 400, null, 600), l.on(Laya.Event.COMPLETE, this, function() {
                n && n(), r.destroy();
            });
            for (var h = !1, d = 0; d < o; d++) this.createCoin(t, a, s, function(e) {
                var t = new Laya.TimeLine();
                this.timeLineArr.push(t), t.to(e, {
                    x: i.x,
                    y: i.y
                }, math.random(100, 400), Laya.Ease.backIn, 0), d == o && t.play(-300, !1), t.on(Laya.Event.COMPLETE, this, function() {
                    e.removeSelf(), h || (h = !0, l.play(0, !1));
                });
            }.bind(this));
        }, e.createCoin = function(e, t, i, a) {
            var s = new Laya.Image();
            1 == e ? s.skin = "common/img_diamond.png" : 2 == e && (s.skin = "common/img_coin.png"), 
            s.x = t.x, s.y = t.y, s.scale(0, 0), i.addChild(s);
            var n = new Laya.TimeLine();
            n.name = "coin", this.timeLineArr.push(n);
            var o = s.x + math.random(0, 230), r = s.y + math.random(-100, 100);
            n.addLabel("move", 0).to(s, {
                scaleX: .8,
                scaleY: .8,
                x: o,
                y: r
            }, 100, Laya.Ease.backOut, 0).play(100, !1), n.on(Laya.Event.COMPLETE, this, function() {
                a && a(s);
            });
        }, e.clearGameCoinAnimation = function() {
            if (!(null == this.timeLineArr || this.timeLineArr.length <= 0)) for (var e = 0; e < this.timeLineArr.length; e++) {
                var t = this.timeLineArr[e];
                t.name = "", t.pause(), t.destroy(), t = null;
            }
        }, e.checkPrompt = function() {
            !G.ISSHOWSIGN && dataManager.getUserData("isCanSign") ? (G.ISSHOWSIGN = !0, updateManager.timeOnce(.5, this, function() {
                uiManager.openUI("game/SignInUI.scene");
            })) : !G.ISTURNTABLE && dataManager.getUserData("turntableFreeTimes") > 0 && (G.ISTURNTABLE = !0, 
            updateManager.timeOnce(.5, this, function() {
                uiManager.openUI("game/LuckyTurntableView.scene");
            }));
        }, e.create3DFont = function(e, t, i, a) {}, e.clear3DFont = function() {}, e.randomSlogan = function() {};
    }(), window.utils = new ulee.Utils(), ulee.Event = {}, ulee.Event.ON_DATA_LOAD = 1e3, 
    ulee.Event.ON_CHANGE_DIAMOND = 1001, ulee.Event.ON_SIGN = 1002, ulee.Event.ON_CHECK_SHOP_RED = 1003, 
    ulee.Event.ON_TURNTABLE = 1004, ulee.Event.ON_GET_WEAPON = 1005, function() {
        ulee.MathUtils = function() {}, (0, Laya.ClassUtils.regClass)(ulee.MathUtils, "ulee.MathUtils");
        var e = ulee.MathUtils.prototype;
        e.random = function(e, t) {
            return Math.floor(Math.random() * (t + 1 - e) + e);
        }, e.arrayRandom = function(e) {
            return e[this.random(0, e.length - 1)];
        }, e.shiftRandom = function(e) {
            var t = this.random(0, e.length - 1), i = e[t];
            return e.removeAt(t), i;
        }, e.randomIndexByWeight = function(e, t) {
            if (!t) {
                t = 0;
                for (var i = 0; i < e.length; i++) t += e[i];
            }
            for (var a = this.random(0, t + 1), s = 0; s < e.length; s++) if ((a -= e[s]) <= 0) return s;
            return 0;
        };
    }(), window.math = new ulee.MathUtils();
    class u extends Laya.Script3D {
        constructor() {
            super(), this._tempVector3 = new Laya.Vector3(), this.yawPitchRoll = new Laya.Vector3(), 
            this.resultRotation = new Laya.Quaternion(), this.tempRotationZ = new Laya.Quaternion(), 
            this.tempRotationX = new Laya.Quaternion(), this.tempRotationY = new Laya.Quaternion(), 
            this.rotaionSpeed = 6e-5;
        }
        onAwake() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp), 
            this.camera = this.owner;
        }
        _onDestroy() {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        }
        onUpdate(e) {
            var t = Laya.timer.delta;
            if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
                this.owner.scene;
                Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-.01 * t), Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(.01 * t), 
                Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-.01 * t), Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(.01 * t), 
                Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(.01 * t), Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-.01 * t);
                var i = Laya.stage.mouseX - this.lastMouseX, a = Laya.stage.mouseY - this.lastMouseY, s = this.yawPitchRoll;
                s.x -= i * this.rotaionSpeed * t, s.y -= a * this.rotaionSpeed * t, this.updateRotation();
            }
            this.lastMouseX = Laya.stage.mouseX, this.lastMouseY = Laya.stage.mouseY;
        }
        mouseDown(e) {
            this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll), this.lastMouseX = Laya.stage.mouseX, 
            this.lastMouseY = Laya.stage.mouseY, this.isMouseDown = !0;
        }
        mouseUp(e) {
            this.isMouseDown = !1;
        }
        moveForward(e) {
            this._tempVector3.x = 0, this._tempVector3.y = 0, this._tempVector3.z = e, this.camera.transform.translate(this._tempVector3);
        }
        moveRight(e) {
            this._tempVector3.y = 0, this._tempVector3.z = 0, this._tempVector3.x = e, this.camera.transform.translate(this._tempVector3);
        }
        moveVertical(e) {
            this._tempVector3.x = this._tempVector3.z = 0, this._tempVector3.y = e, this.camera.transform.translate(this._tempVector3, !1);
        }
        updateRotation() {
            Math.abs(this.yawPitchRoll.y) < 1.5 && (Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ), 
            this.tempRotationZ.cloneTo(this.camera.transform.localRotation), this.camera.transform.localRotation = this.camera.transform.localRotation);
        }
    }
    !function() {
        ulee.CameraUtils = function() {}, (0, Laya.ClassUtils.regClass)("ulee.CameraUtils", ulee.CameraUtils);
        var e = ulee.CameraUtils.prototype;
        e.createCamera = function(e, t, i) {
            let a = new Laya.Camera(0, .1, 1e3);
            return e && a.transform.translate(e), t && a.transform.rotate(t, !0, !1), i || (a.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY), 
            a;
        }, e.controlCamera = function(e) {
            e.addComponent(u);
        }, e.setTarget = function() {};
    }(), window.cameraUtils = new ulee.CameraUtils(), function(e) {
        ulee.EventDispatcher = function() {
            this.eventDispatcher = new Laya.EventDispatcher();
        }, (0, Laya.ClassUtils.regClass)(ulee.EventDispatcher, "ulee.EventDispatcher", void 0);
        var t = ulee.EventDispatcher.prototype;
        t.addEventListen = function(e, t, i) {
            this.eventDispatcher.on(e, t, i);
        }, t.removeEventListen = function(e, t, i) {
            this.eventDispatcher.off(e, t, i);
        }, t.dispatchEvent = function(e, t) {
            var i = {
                msg: t,
                name: e
            };
            this.eventDispatcher.event(e, i), i = null;
        };
    }(), window.eventDispatcher = new ulee.EventDispatcher(), function() {
        ulee.io.DataInputStream = function(e) {
            this.arrayBuffer = e, this.index = 0, this.dv = new DataView(this.arrayBuffer);
        }, (0, Laya.ClassUtils.regClass)(ulee.io.DataInputStream, "ulee.io.DataInputStream");
        var e = ulee.io.DataInputStream.prototype;
        e.readByte = function() {
            return this.dv.getInt8(this.index++);
        }, e.readShort = function() {
            var e = this.dv.getInt16(this.index);
            return this.index += 2, e;
        }, e.readInt = function() {
            var e = this.dv.getInt32(this.index);
            return this.index += 4, e;
        }, e.readUint = function() {
            var e = this.dv.getUint32(this.index);
            return this.index += 4, e;
        }, e.readLong = function() {
            var e = this.readInt(), t = this.readUint();
            return e * Math.POW_2_32 + t;
        }, e.readFloat = function() {
            var e = this.dv.getFloat32(this.index);
            return this.index += 4, e;
        }, e.readUTF = function() {
            var e = this.readShort();
            return this.readText(e);
        }, e.readText = function(e) {
            for (var t = this.arrayBuffer.slice(this.index, this.index + e), i = new Uint8Array(t), a = "", s = e, n = 0, o = String.fromCharCode, r = 0, l = i; r < s; ) (n = l[r++]) < 128 ? 0 != n && (a += o(n)) : a += o(n < 224 ? (63 & n) << 6 | 127 & l[r++] : n < 240 ? (31 & n) << 12 | (127 & l[r++]) << 6 | 127 & l[r++] : (15 & n) << 18 | (127 & l[r++]) << 12 | l[r++] << 6 & 127 | 127 & l[r++]), 
            0;
            return this.index += e, a;
        }, e.readArrayBuffer = function(e) {
            var t = this.arrayBuffer.slice(this.index, this.index + e);
            return this.index += e, t;
        };
    }(), function() {
        ulee.ListHeightVariable = function() {}, (0, Laya.ClassUtils.regClass)(ulee.ListHeightVariable, "ulee.ListHeightVariable");
        ulee.ListHeightVariable.prototype;
        ulee.ListHeightVariable.Convert = function(e) {
            e.$renderItems = e.renderItems, e._ys = [ 0 ], e.renderItems = function() {
                for (var t = 0, i = e._cells.length; t < i; t++) e.renderItem(e._cells[t], e._startIndex + t);
                e.changeSelectStatus();
            }, e.$renderItem = e.renderItem, e.renderItem = function(t, i) {
                if (e.$renderItem(t, i), t.y = e._ys[i], e._ys.length === i + 1 && i < e.array.length) {
                    var a = t.y + t.height;
                    e._ys.push(a), e._scrollBar.setScroll(0, a - e._content.height, e._scrollBar.value);
                }
            }, e.$onScrollBarChange = e.onScrollBarChange, e.onScrollBarChange = function(t) {
                e.runCallLater(e.changeCells);
                var i, a = e._scrollBar.value, s = e.repeatY, n = 0;
                for (i = 0; i < e._ys.length && !(e._ys[i] > a); i++) n = i;
                if (n > e._startIndex) {
                    var o = n - e._startIndex, r = !0, l = e._startIndex + 1 * (s + 1);
                    e._isMoved = !0;
                } else n < e._startIndex && (o = e._startIndex - n, r = !1, l = e._startIndex - 1, 
                e._isMoved = !0);
                for (i = 0; i < o; i++) {
                    if (r) {
                        var h = e._cells.shift();
                        e._cells[e._cells.length] = h;
                        var d = l + i;
                    } else h = e._cells.pop(), e._cells.unshift(h), d = l - i;
                    e.renderItem(h, d);
                }
                e._startIndex = n, e._content.scrollRect.y = a;
            }, e.$posCell = e.posCell, e.posCell = function(t, i) {
                e._scrollBar && (t.y = e._ys[i]);
            }, e.$changeCells = e.changeCells, e.changeCells = function() {
                if (e._cellChanged = !1, e._itemRender) {
                    e.scrollBar = this.getChildByName("scrollBar");
                    var t = this._getOneCell(), i = t.width + this._spaceX || 1, a = t.height + this._spaceY || 1;
                    this._width > 0 && (this._repeatX2 = this._isVertical ? Math.round(this._width / i) : Math.ceil(this._width / i)), 
                    this._height > 0 && (this._repeatY2 = this._isVertical ? Math.ceil(this._height / a) : Math.round(this._height / a));
                    var s = this._width ? this._width : i * this.repeatX - this._spaceX, n = this._height ? this._height : a * this.repeatY - this._spaceY;
                    this._cellSize = this._isVertical ? a : i, this._cellOffset = this._isVertical ? a * Math.max(this._repeatY2, this._repeatY) - n - this._spaceY : i * Math.max(this._repeatX2, this._repeatX) - s - this._spaceX, 
                    this._isVertical && this._scrollBar ? this._scrollBar.height = n : !this._isVertical && this._scrollBar && (this._scrollBar.width = s), 
                    this.setContentSize(s, n);
                    var o = this._isVertical ? this.repeatX : this.repeatY, r = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
                    this._createItems(0, o, r), this._createdLine = r, this._array && (this.array = this._array, 
                    this.runCallLater(this.renderItems));
                }
            }, Laya.getset(0, e, "array", function() {
                return this._array;
            }, function(t) {
                this.runCallLater(this.changeCells), this._array = t || [];
                var i = this._array.length;
                if (this.totalPage = Math.ceil(i / (this.repeatX * this.repeatY)), this._selectedIndex = this._selectedIndex < i ? this._selectedIndex : i - 1, 
                this.startIndex = this._startIndex, this._scrollBar) {
                    this._scrollBar.stopScroll();
                    var a = this._isVertical ? this.repeatX : this.repeatY, s = this._isVertical ? this.repeatY : this.repeatX, n = Math.ceil(i / a);
                    (this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage) > 1 ? (this._scrollBar.scrollSize = this._cellSize, 
                    this._scrollBar.thumbPercent = s / n, this._scrollBar.setScroll(0, this._ys[this._ys.length - 1] - e._content.height, this._scrollBar.value), 
                    this._scrollBar.target = this._content) : (this._scrollBar.setScroll(0, 0, 0), this._scrollBar.target = this._content);
                }
            }), e.tweenTo = function(t, i, a) {
                if (void 0 === i && (i = 200), e._scrollBar) {
                    var s = e._ys[t];
                    Tween.to(e._scrollBar, {
                        value: s
                    }, i, null, a, 0, !0);
                } else e.startIndex = t, a && a.run();
            }, e._scrollBar && (e._scrollBar.off("change", e, e.$onScrollBarChange), e._scrollBar.on("change", e, e.onScrollBarChange));
        };
    }();
    class c extends Laya.AnimatorStateScript {
        constructor() {
            super(), this._onAniComplete = null, this._onAniStart = null;
        }
        onStateEnter() {
            this._onAniStart && this._onAniStart();
        }
        onStateUpdate() {}
        onStateExit() {
            this._onAniComplete && this._onAniComplete();
        }
        setComplete(e) {
            this._onAniComplete = e;
        }
        setStart(e) {
            this._onAniStart = e;
        }
    }
    !function() {
        ulee.Model = function(e, t, i) {
            this._modelId = 0, this._sprite = null, this.animator = null, this.avater = null, 
            this._canimators = [], this._parent = null, this._addModels = [], this._bones = {}, 
            this._loadedHandler = null, this._localPosition = new Vector3(0, 0, 0), this._localScale = new Vector3(1, 1, 1), 
            this._localRotation = new Vector3(0, 0, 0), this._localRotation2 = new Vector3(0, 0, 0), 
            this.loaded = !1, this._active = !0, this.modelConfig = null, this._alpha = 1, t && this.create(e, t, i);
        }, (0, Laya.ClassUtils.regClass)(ulee.Model, "ulee.Model");
        var e = ulee.Model.prototype;
        ulee.Model.create = function(e, t, i) {
            var a = Laya.Pool.getItem("ccModel");
            return a ? a.create(e, t, i) : a = new ulee.Model(e, t, i), a;
        }, e.prepareLoad = function(e) {
            Laya.loader.create(e, Laya.Handler.create(this, this.LoadResComplete));
        }, e.create = function(e, t, i) {
            this._parent = e, this._modelId = t, this._loadedHandler = i, this._isDestroyed = !1, 
            this._config = D.PrefabsPath[t];
            var a = this._config.chs;
            this.url = ulee.Model.fullChs(a), this.name = a.substring(a.lastIndexOf("/") + 1), 
            this.prepareLoad(this.url);
        }, ulee.Model.fullChs = function(e) {
            var t = e.substring(e.lastIndexOf("/") + 1);
            return e + "/" + t + ".lh";
        }, e.LoadResComplete = function() {
            if (!this._isDestroyed) {
                var e = Laya.Loader.getRes(this.url);
                this._sprite = Laya.Sprite3D.instantiate(e), this._sprite.$model = this, this._sprite.$name = "Model_" + this._modelId, 
                this.avater = this._sprite.getChildAt(0), this.animator = this.avater.getComponent(Laya.Animator);
                for (var t = 0; t < this._config.subModel.length; t++) {
                    var i = this._config.subModel[t];
                    if ("0" == i) break;
                    var a = this.avater.getChildByName(i);
                    if (a) {
                        var s = a.getComponentByType(Laya.Animator);
                        s && this._canimators.push(s);
                    }
                }
                Laya.timer.once(1, this, this._onAllCompleted);
            }
        }, e.setLocalPosition = function(e, t, i) {
            utils.setVector3(this._localPosition, e, t, i), this.loaded && (this._sprite.transform.localPosition = this._localPosition);
        }, e.setLocalScale = function(e, t, i) {
            void 0 === e && (e = 1), void 0 === t && (t = e), void 0 === i && (i = e), utils.setVector3(this._localScale, e, t, i), 
            this.loaded && (this._sprite.transform.localScale = this._localScale);
        }, e.setLocalRotation = function(e, t, i, a) {
            a || (a = this._sprite), this._localRotation2.x = e, this._localRotation2.y = t, 
            this._localRotation2.z = i, utils.setVector3(this._localRotation, e * Math.RAD_1_ANGLE, t * Math.RAD_1_ANGLE, i * Math.RAD_1_ANGLE);
            var s = a.transform;
            Laya.Quaternion.createFromYawPitchRoll(this._localRotation.x, this._localRotation.y, this._localRotation.z, s._localRotation), 
            s.localRotation = s._localRotation;
        }, e.setActive = function(e) {
            this._active != e && (this._active = e, this.loaded && (this._sprite.active = e));
        }, e.isActive = function() {
            return this._active;
        }, e.setAlpha = function(e) {
            this._alpha != e && (this.setAlalbedo(this._sprite, e, 1, 1, 1), this._alpha = e);
        }, e._setRenderMode = function(e, t) {
            t || (t = this._sprite);
            var i = t.meshRenderer || t.skinnedMeshRenderer || t.particleRenderer || t.ShurikenParticleRenderer;
            if (i) i.material && (i.material.renderMode = e); else {
                for (var a = 0; a < t.numChildren; a++) {
                    var s = t.getChildAt(a);
                    this._setRenderMode(e, s);
                }
                this.renderMode = e;
            }
        }, e.setAlalbedo = function(e, t, i, a, s) {
            if (e) {
                var n = e.meshRenderer || e.skinnedMeshRenderer;
                if (n) for (var o = n.materials, r = o.length - 1; r >= 0; r--) {
                    var l = o[r];
                    0 == l.cull && 1 == l.blend && 770 == l.srcBlend && 1 == l.dstBlend || (t < 1 && (l.renderMode = Laya[l.constructor.name].RENDERMODE_TRANSPARENT), 
                    l.albedoColorA = t, l.albedoColorR = i, l.albedoColorG = a, l.albedoColorB = s);
                } else for (var h = 0; h < e.numChildren; h++) {
                    var d = e.getChildAt(h);
                    this.setAlalbedo(d, t, i, a, s);
                }
            }
        }, e.setIntensity = function(e, t) {
            if (e) {
                var i = e.meshRenderer || e.skinnedMeshRenderer;
                if (i) for (var a = i.materials, s = a.length - 1; s >= 0; s--) {
                    a[s].albedoIntensity = t;
                } else for (var n = 0; n < e.numChildren; n++) {
                    var o = e.getChildAt(n);
                    this.setIntensity(o, t);
                }
            }
        }, e.receiveShadow = function() {
            for (var e = 0; e < this._sprite.numChildren; e++) {
                var t = this._sprite.getChildAt(e);
                t instanceof Laya.MeshSprite3D ? t.meshRender.receiveShadow = !0 : t instanceof Laya.SkinnedMeshSprite3D && (t.skinnedMeshRender.receiveShadow = !0);
            }
        }, e.showShashow = function(e, t) {
            t = null == t || t;
            for (var i = 0; i < e.numChildren; i++) {
                var a = e.getChildAt(i);
                a instanceof Laya.MeshSprite3D ? a.meshRender.castShadow = t : a instanceof Laya.SkinnedMeshSprite3D && (a.skinnedMeshRender.castShadow = t), 
                a.numChildren > 0 && this.showShashow(a, t);
            }
        }, e.rotate = function(e, t, i) {
            this.loaded && this._sprite.transform.rotate(e, t, i);
        }, e._onLoadedModel = function(e) {
            if (!this._isDestroyed) {
                this._sprite = Laya.Sprite3D.instantiate(e), this.avater = this._sprite.getChildAt(0), 
                this.animator = this.avater.getComponentByType(Laya.Animator);
                for (var t = 0; t < this._config.subModel.length; t++) {
                    var i = this._config.subModel[t];
                    if ("0" == i) break;
                    var a = this.avater.getChildByName(i);
                    if (a) {
                        var s = a.getComponentByType(Laya.Animator);
                        s && this._canimators.push(s);
                    }
                }
                this._loadAdds();
            }
        }, e._loadAdds = function() {
            this._isDestroyed || (this._addLoadIndex >= this._adds.length ? this._onAllCompleted() : this._addModels.push(ulee.Model.create(void 0, this._adds[this._addLoadIndex][0], Laya.Handler.create(this, this.onAddLoaded))));
        }, e.onAddLoaded = function() {
            if (!this._isDestroyed) {
                var e = this._addModels.last(), t = this._adds[this._addLoadIndex][1];
                this.bindBone(t, e._sprite), this._addLoadIndex++, this._loadAdds();
            }
        }, e._onAllCompleted = function() {
            this.loaded = !0, this._isDestroyed || (this._waitDestroy ? this.dispose() : (this._parent && this._parent.addChild(this._sprite), 
            this.setLocalPosition(0, 0, 0), this.setLocalRotation(0, 0, 0), this.setLocalScale(this._config.scale), 
            this._sprite.active = this._active, this._loadedHandler && this._loadedHandler.run()));
        }, e.getChildBeep = function(e, t) {
            if (t.name == e) return t;
            for (var i = t.numChildren, a = 0; a < i; a++) {
                var s = this.getChildBeep(e, t._childs[a]);
                if (s) return s;
            }
        }, e.bindBone = function(e, t) {
            var i = this.getBone(e);
            i && i.addChild(t);
        }, e.getBone = function(e) {
            var t = this._bones[e];
            if (!t) {
                if (e !== G.ORBIT_POINT.POINT3 || this.animator._avatarNodeMap[e]) {
                    if (!this.animator._avatarNodeMap[e]) return console.log("无该模型:" + this._modelId + "的绑点:" + e + "!"), 
                    null;
                    t = this._sprite.addChild(new Laya.Sprite3D()), this.animator.linkSprite3DToAvatarNode(e, t);
                } else t = this.avater;
                this._bones[e] = t;
            }
            return t;
        }, e.stopAnim = function(e) {
            this.setAnimSpeed(e, 0);
        }, e.setAnimSpeed = function(e, t) {
            this.animator && (this.animator.play(e), this.animator._controllerLayers[0]._statesMap[e].speed = t);
        }, e.clearAnim = function() {
            this.animator._controllerLayers[0]._statesMap = [];
        }, e.playAnim = function(e, t, i, a, s) {
            if (this.animator) {
                s ? this.animator.crossFade(e, s, 0) : this.animator.play(e);
                var n = this.animator._controllerLayers[0]._statesMap[e];

                if(!n){
                    t && i && i.call(t);
                    return;
                }
                if(n.script){

                }else{
                    n.addScript(c), n.script = n._scripts[0]
                }
                a || (a = 1), n.speed = a, 
                i && (i = i.bind(t)), n.script.setComplete(i), this.curAnim = e, this.curAnimSpeed = a;
            } else t && i && i.call(t);
        }, e.replay = function() {
            this.setActive(!1), this.setActive(!0);
        }, e.dispose = function() {
            if (!this._isDestroyed && this.loaded) {
                this._isDestroyed = !0, this.loaded = !1;
                for (var e = 0; e < this._addModels.length; e++) this._addModels[e].dispose();
                this._sprite.destroy(!0) && (this._sprite = null), this.animator = null, this.avater = null, 
                this._canimators = [], this._parent = null, this._addModels = [], this._bones = {}, 
                this._loadedHandler = null, this._active = !0, this._waitDestroy = !1, this._position = new Vector3(NaN, NaN, NaN), 
                this._localPosition = new Vector3(0, 0, 0), this._localScale = new Vector3(1, 1, 1), 
                this._localRotation = new Vector3(0, 0, 0), Laya.Pool.recover("ccModel", this);
            } else this._waitDestroy = !0;
        }, e.removeParent = function() {
            this._sprite.removeSelf();
        }, e.resetAmbientColor = function(e, t) {
            for (var i = 0; i < e.numChildren; i++) {
                var a = e.getChildAt(i);
                if (a instanceof Laya.MeshSprite3D) for (var s = a.meshRender.materials, n = 0; n < s.length; n++) {
                    (o = s[n]).ambientColor.x = t, o.ambientColor.y = t, o.ambientColor.z = t;
                } else if (a instanceof Laya.SkinnedMeshSprite3D) for (s = a.skinnedMeshRender.materials, 
                n = 0; n < s.length; n++) {
                    var o;
                    (o = s[n]).ambientColor.x = t, o.ambientColor.y = t, o.ambientColor.z = t;
                }
                a.numChildren > 0 && this.resetAmbientColor(a, t);
            }
        }, e.resetAlbedo = function(e, t) {
            for (var i = 0; i < e.numChildren; i++) {
                var a = e.getChildAt(i);
                if (a instanceof Laya.MeshSprite3D) for (var s = a.meshRender.materials, n = 0; n < s.length; n++) {
                    s[n].albedo = new Laya.Vector4(t, t, t, 1);
                } else if (a instanceof Laya.SkinnedMeshSprite3D) for (s = a.skinnedMeshRender.materials, 
                n = 0; n < s.length; n++) {
                    s[n].albedo = new Laya.Vector4(t, t, t, 1);
                }
                a.numChildren > 0 && this.resetAlbedo(a, t);
            }
        }, e.resetSpecularColor = function(e, t) {
            for (var i = 0; i < e.numChildren; i++) {
                var a = e.getChildAt(i);
                if (a instanceof Laya.MeshSprite3D) for (var s = a.meshRender.materials, n = 0; n < s.length; n++) {
                    s[n].specularColor = new Laya.Vector4(t, t, t, 1);
                } else if (a instanceof Laya.SkinnedMeshSprite3D) for (s = a.skinnedMeshRender.materials, 
                n = 0; n < s.length; n++) {
                    s[n].specularColor = new Laya.Vector4(t, t, t, 1);
                }
                a.numChildren > 0 && this.resetAlbedo(a, t);
            }
        }, e.setDisableLight = function(e) {
            for (var t = 0; t < e.numChildren; t++) {
                var i = e.getChildAt(t);
                i instanceof Laya.MeshSprite3D ? i.meshRender.sharedMaterial && i.meshRender.sharedMaterial.disableLight() : i instanceof Laya.SkinnedMeshSprite3D && i.skinnedMeshRender.sharedMaterial && i.skinnedMeshRender.sharedMaterial.disableLight(), 
                i.numChildren > 0 && this.setDisableLight(i);
            }
        }, e.setMaterial2 = function(e, t) {
            if (e instanceof Laya.MeshSprite3D) var i = e.meshRenderer; else if (e instanceof Laya.SkinnedMeshSprite3D) i = e.skinnedMeshRenderer;
            i.material = t;
        }, e.setMaterial = function(e, t, i) {
            if (t || (t = this._sprite), t instanceof Laya.MeshSprite3D) var a = t.meshRenderer; else if (t instanceof Laya.SkinnedMeshSprite3D) a = t.skinnedMeshRenderer;
            if (a) if (a.material) Laya.Texture2D.load(e, Laya.Handler.create(this, function(e) {
                a.material.albedoTexture = e, i || (i = 1), a.material.albedoIntensity = i;
            })); else {
                var s = new Laya.BlinnPhongMaterial();
                Laya.Texture2D.load(e, Laya.Handler.create(this, function(e) {
                    s.albedoTexture = e, i || (i = 1), s.albedoIntensity = i, console.log(i), this.renderMode && (s.renderMode = this.renderMode);
                })), a.material = s;
            }
            for (var n = 0; n < t.numChildren; n++) this.setMaterial(e, t._children[n], i);
        }, e.addMeshCollider = function(e, t) {
            if (e.meshFilter) {
                var i = e.addComponent(Laya.PhysicsCollider);
                let a = new Laya.MeshColliderShape();
                a.mesh = e.meshFilter.sharedMesh, i.colliderShape = a, t && t.push(i);
            }
            for (var a = e.numChildren, s = 0; s < a; s++) this.addMeshCollider(e._children[s], t);
        }, e.addBoxCollider = function(e) {
            for (var t = e.numChildren, i = [], a = 0; a < t; a++) {
                if (e._childs[a].meshFilter) {
                    var s = this._sprite.addComponent(Laya.BoxCollider);
                    s.setFromBoundBox(e._childs[a].meshFilter.sharedMesh.boundingBox), i.push(s);
                }
                var n = this.addBoxCollider(e._childs[a]);
                if (n.length > 0) for (var o = 0; o < n.length; o++) i.push(n[o]);
            }
            return i;
        }, e.getCollider = function() {
            return this._sprite._colliders;
        }, ulee.Model._setShader = function(e) {
            for (var t = 0; t < e.numChildren; t++) {
                var i = e.getChildAt(t);
                if (i instanceof Laya.MeshSprite3D) {
                    for (var a = i.meshRender.materials, s = 0; s < a.length; s++) {
                        (n = a[s]).setShaderName("CustomShader"), n.normalTexture = ulee.shader.CartoonMaterial.matCap, 
                        n._tempMatrix4x40 = new Laya.Matrix4x4();
                    }
                    i.meshRender.materials = a;
                } else if (i instanceof Laya.SkinnedMeshSprite3D) {
                    for (a = i.skinnedMeshRender.materials, s = 0; s < a.length; s++) {
                        var n;
                        (n = a[s]).setShaderName("CustomShader"), n.normalTexture = ulee.shader.CartoonMaterial.matCap, 
                        n._tempMatrix4x40 = new Laya.Matrix4x4();
                    }
                    i.skinnedMeshRender.materials = a;
                } else this._setShader(i);
            }
        }, e.addSkinComponent = function(e, t) {
            if (e instanceof Laya.MeshSprite3D) {
                var i = e.addComponent(Laya.SkinAnimations);
                i.templet = Laya.AnimationTemplet.load(t), i.player.play();
            }
            for (var a = 0, s = e._childs.length; a < s; a++) this.addSkinComponent(e._childs[a], t);
        };
    }(), window.initData = function() {
        G.dataload = function() {
            for (var e in D) if ("properties" != e) {
                var t = D[e], i = D.properties[e];
                if (i) for (var a in t) {
                    var s = t[a], n = {};
                    n[i[0]] = a;
                    for (var o = 1, r = i.length; o < r; o++) {
                        var l = s[o - 1];
                        void 0 !== l && (n[i[o]] = l);
                    }
                    t[a] = n;
                }
            }
            !function() {
                (function() {
                    var e;
                    for (var t in D.ScreenShow) {
                        var i = D.ScreenShow[t];
                        1 == t && (e = i.screenPixel), e > 10 && (i.screenPixel /= e);
                    }
                })(), function() {
                    for (var e in D.musicBasic) {
                        var t = D.musicBasic[e];
                        t.musicPower *= .01;
                    }
                }(), function() {
                    var e = [];
                    for (var t in D.PrefabsPath) {
                        var i = D.PrefabsPath[t];
                        i.subModel ? i.subModel = i.subModel.split("#") : i.subModel = e, i.actionInShop ? i.actionInShop = i.actionInShop.split("#") : i.actionInShop = e;
                    }
                }(), "undefined" != typeof addModelConfig && (addModelConfig(), function() {
                    function addHead(e, t) {
                        if (e) for (var i = 0, a = e.length; i < a; i++) e[i] = t + e[i];
                    }
                    var e;
                    for (var t in D.ModelConfig) addHead((e = D.ModelConfig[t]).resource, t), addHead(e.zipResource, t);
                }());
                D._inited = !0, eventDispatcher.dispatchEvent(ulee.Event.ON_DATA_LOAD);
            }();
        }, G.dataload();
    }, function(e) {
        ulee.UIManager = function() {
            this.scene = Laya.Scene, this._dialogList = {}, this._childList = {};
        }, (0, Laya.ClassUtils.regClass)(ulee.UIManager, "ulee.UIManager", void 0);
        var t = ulee.UIManager.prototype;
        t.openUI = function(e, t, i, a) {
            if (Laya.Scene.open(e, !1, i, a), t) {
                var s = t.url;
                this._childList[s] || (this._childList[s] = []), this._childList[s].push(e);
            }
        }, t.openDialog = function(e, t, i, a) {
            if (Laya.Scene.open(e, !1, i, a), t) {
                var s = t.url;
                this._dialogList[s] || (this._dialogList[s] = []), this._dialogList[s].push(e);
            }
        }, t.closeDialog = function(e) {
            for (var t = Laya.stage._children[1]._children, i = 0; i < t.length; i++) if (t[i].url == e) {
                t[i].close();
                break;
            }
        }, t.closeUI = function(e) {
            var t = this.getUI(e);
            if (t) {
                var i = t.url;
                if (this._dialogList[i]) for (var a = this._dialogList[i], s = 0; s < a.length; s++) this.closeDialog(a[s]);
                if (this._dialogList[i] = null, this._childList[i]) for (a = this._childList[i], 
                s = 0; s < a.length; s++) this.closeUI(a[s]);
                this._childList[i] = null, t.close();
            }
        }, t.getUI = function(e) {
            if (this._uiList = Laya.stage._children[0]._children, !this._uiList) return void console.error("未从uimanager打开任何场景");
            let t = null;
            for (let i = 0; i < this._uiList.length; i++) if ((t = this._uiList[i]).url == e) return t;
            return console.error("查无此UI=",e), null;
        };
    }(), window.uiManager = new ulee.UIManager(), function() {
        ulee.DataManager = function() {
            this._data = {}, this.init();
        }, (0, Laya.ClassUtils.regClass)(ulee.DataManager, "ulee.DataManager");
        var e = ulee.DataManager.prototype;
        e.init = function() {
            this._localData = Laya.LocalStorage, this._userData = {}, this.initData();
        }, e.initData = function() {
            var e = {
                openId: "",
                roundId: 1,
                roleId: 1,
                money: 0,
                killEnemyCnt: 0,
                bestKillEnemyCnt: 0,
                gunId: 1,
                firstLoginDate: new Date().getTime()
            };
            for (var t in e) this.getLocal(t) || this.setLocal(t, e[t]), "number" == typeof e[t] ? Number.isInteger(e[t]) ? this._userData[t] = parseInt(this.getLocal(t)) : this._userData[t] = parseFloat(this.getLocal(t)) : "boolean" == typeof e[t] ? "true" == this.getLocal(t) ? this._userData[t] = !0 : "false" == this.getLocal(t) ? this._userData[t] = !1 : this._userData[t] = !0 : this._userData[t] = this.getLocal(t);
            this.compareTime(new Date(this._userData.firstLoginDate)) && (G.OLDUSER = !0);
        }, e.compareTime = function(e, t) {
            if (t) t = t.getTime(); else {
                var i = new Date();
                t = new Date(i.getFullYear(), i.getMonth(), i.getDate()).getTime();
            }
            if (e.getTime() < t) return !0;
        }, e.getData = function(e) {
            return this._data[e];
        }, e.setData = function(e, t, i) {
            this._data[e] ? i ? this._data[e] = t : console.log("已存在数据") : this._data[e] = t;
        }, e.clearData = function() {
            this._data = {}, this.init();
        }, e.setLocal = function(e, t) {
            return this._localData.setItem(e, t), t;
        }, e.getLocal = function(e) {
            return this._localData.getItem(e);
        }, e.setUserData = function(e, t) {
            this._userData[e] = t, this.setLocal(e, t);
        }, e.getUserData = function(e) {
            return this._userData[e];
        };
    }(), function(e) {
        ulee.UpdateManager = function() {
            this.id = 0, this.totalTime = 0, this.LoopArr = {}, Laya.timer.frameLoop(1, this, this.update);
        }, (0, Laya.ClassUtils.regClass)(ulee.UpdateManager, "ulee.UpdateManager", void 0);
        var t = ulee.UpdateManager.prototype;
        t.update = function(e) {
            var t = Laya.timer.delta / 1e3;
            for (var i in this.totalTime += t, G.FPSAVERAGE = parseInt(1 / t), G.FRAME_INTERVAL = t > .03 ? .03 : t, 
            G.NOW = Laya.Browser.now(), this.LoopArr) {
                var a = this.LoopArr[i];
                a.caller ? a.type == G.ENUM_LOOP_TYPE.FRAME ? (a.frame++, a.frame == a.targetFrame && (a.func(), 
                a.isOnce ? delete this.LoopArr[i] : a.frame = 0)) : a.type == G.ENUM_LOOP_TYPE.TIME && (a.time += t, 
                a.time >= a.targetTime && (a.func(), a.isOnce ? delete this.LoopArr[i] : a.time = 0)) : console.log("warning:有方法没被移除" + a.func);
            }
        }, t.frameLoop = function(e, t, i, a) {
            var s = this.id++, n = "FL" + s, o = {
                frame: 0,
                targetFrame: e,
                func: i.bind(t, a),
                args: a,
                caller: t,
                type: G.ENUM_LOOP_TYPE.FRAME,
                id: s
            };
            return this.LoopArr[n] = o, t.$updateArr ? t.$updateArr.push(n) : t.$updateArr = [ n ], 
            n;
        }, t.frameOnce = function(e, t, i, a) {
            var s = this.id++, n = "FO" + s, o = {
                frame: 0,
                targetFrame: e,
                func: i.bind(t, a),
                args: a,
                isOnce: !0,
                caller: t,
                type: G.ENUM_LOOP_TYPE.FRAME,
                id: s
            };
            return t.$updateArr ? t.$updateArr.push(n) : t.$updateArr = [ n ], this.LoopArr[n] = o, 
            n;
        }, t.timeLoop = function(e, t, i, a) {
            var s = this.id++, n = "TL" + s, o = {
                time: 0,
                targetTime: e,
                func: i.bind(t, a),
                args: a,
                caller: t,
                type: G.ENUM_LOOP_TYPE.TIME,
                id: s
            };
            return t.$updateArr ? t.$updateArr.push(n) : t.$updateArr = [ n ], this.LoopArr[n] = o, 
            n;
        }, t.timeOnce = function(e, t, i, a) {
            var s = this.id++, n = "TO" + s, o = {
                time: 0,
                targetTime: e,
                func: i.bind(t, a),
                args: a,
                isOnce: !0,
                caller: t,
                type: G.ENUM_LOOP_TYPE.TIME,
                id: s
            };
            return t.$updateArr ? t.$updateArr.push(n) : t.$updateArr = [ n ], this.LoopArr[n] = o, 
            n;
        }, t.clear = function(e, t) {
            this.LoopArr[e] && delete this.LoopArr[e], t && t.$updateArr.remove(e);
        }, t.clearAll = function(e) {
            if (e.$updateArr) {
                for (var t = 0; t < e.$updateArr.length; t++) {
                    var i = e.$updateArr[t];
                    this.clear(i);
                }
                e.$updateArr = null;
            }
        };
    }(), function() {
        ulee.AudioManager = function() {
            this.soundManager = Laya.SoundManager, this.soundManager.autoReleaseSound = !1, 
            this.setMusicVolume(.5), this.setSoundVolume(.5), this.musicConfig = D.musicBasic, 
            this.onceSoundArr = {}, this.soundMgr = {}, this.isBGM || (this.hasChangeMusic = !0);
        }, (0, Laya.ClassUtils.regClass)(ulee.AudioManager, "ulee.AudioManager");
        var e = ulee.AudioManager.prototype;
        e.playMusic = function(e) {
            G.ISSOUND && e && (this.bgmId != e ? this.hasChangeMusic = !0 : this.hasChangeMusic = !1, 
            this.bgmId = e || this.bgmId, this.soundManager.playMusic(this.getResurl(this.bgmId), 10), 
            this.isPlaying = !0);
        }, e.stopMusic = function() {
            this.soundManager.stopMusic(), this.isPlaying = !1;
        }, e.setMusicMuted = function(e) {
            this.soundManager.musicMuted = !e, this.hasChangeMusic && (this.playMusic(), this.hasChangeMusic = !1);
        }, e.setMusicVolume = function(e) {
            this.soundManager.musicVolume = e;
        }, e.playSound = function(e, t, i) {
            G.ISSOUND && (!i && this.onceSoundArr[e] && this.stopSound(e), this._playSound(e, t, i));
        }, e._playSound = function(e, t, i) {
            if (G.NOW != this.soundMgr[e]) {
                this.soundMgr[e] = G.NOW;
                var a = this.soundManager.playSound(this.getResurl(e), 1, new Handler(this, function() {
                    t && t();
                }));
                !i && a && (this.onceSoundArr[e] = a, this.onceSoundArr[e].canRepeat = !0);
            } else updateManager.frameOnce(1, this, this._playSound.bind(this, e, t, i));
        }, e.stopSound = function(e) {
            if (this.onceSoundArr[e]) {
                if (G.NOW == this.soundMgr[e]) return void updateManager.frameOnce(10, this, this.stopSound.bind(this, e));
                if (!this.onceSoundArr[e]) return;
                this.soundMgr[e] = G.NOW;
            }
        }, e.setSoundVolume = function(e) {
            this.soundManager.soundVolume = e;
        }, e.stopAllSound = function() {
            this.soundManager.stopAllSound();
        }, e.getResurl = function(e) {
            return this.musicConfig[e].file;
        };
    }(), function() {
        ulee.LoadItem = function(e, t, i) {
            this.loaded = !1, this.loadFn = e, this.count = t, this.checkFn = i, this.loading = null;
        }, (0, Laya.ClassUtils.regClass)(ulee.LoadItem, "ulee.LoadItem");
        var e = ulee.LoadItem.prototype;
        e.onComplete = function() {
            this.loaded = !0;
        }, e.start = function() {
            this.loadFn();
        };
    }(), function() {
        ulee.ModelUtils = function() {}, (0, Laya.ClassUtils.regClass)(ulee.ModelUtils, "ulee.ModelUtils");
        var e = ulee.ModelUtils.prototype;
        e.getPosition = function(e) {
            return e.transform._localPosition;
        }, e.setLocalPosition = function(e, t, i, a) {
            utils.setVector3(e.transform._localPosition, t, i, a), e.transform.localPosition = e.transform._localPosition;
        }, e.setLocalScale = function(e, t, i, a) {
            void 0 === t && (t = 1), void 0 === i && (i = t), void 0 === a && (a = t), utils.setVector3(e.transform._localScale, t, i, a), 
            e.transform.localScale = e.transform._localScale;
        };
    }(), window.modelUtils = new ulee.ModelUtils(), function() {
        ulee.PromptUtils = function() {}, (0, Laya.ClassUtils.regClass)(ulee.PromptUtils, "ulee.PromptUtils");
        var e = ulee.PromptUtils.prototype;
        e.init = function() {
            this.bgSprite = new Laya.Image("common/img_infoBase.png"), this.bgSprite.width = Laya.stage.width - 40, 
            this.bgSprite.height = 50, this.bgSprite.anchorX = .5, this.bgSprite.anchorY = .5, 
            this.bgSprite.x = Laya.stage.width / 2, this.bgSprite.y = Laya.stage.height / 6, 
            this.textOffx = 30, this.textOffy = 15, this.tipText = new Laya.Label(), this.bgSprite.addChild(this.tipText), 
            this.tipText.width = this.bgSprite.width - 2 * this.textOffx, this.tipText.fontSize = 30, 
            this.tipText.align = "center", this.tipText.color = "#ffffff", this.tipText.y = this.textOffy, 
            this.bgSprite.zOrder = 2e3, Laya.stage.addChild(this.bgSprite), this.timeLine = new Laya.TimeLine(), 
            this.timeLine.addLabel("scale", 0).to(this.bgSprite, {
                scaleX: 1.2,
                scaleY: 1.2,
                alpha: 1
            }, 100, null, 0).addLabel("back", 0).to(this.bgSprite, {
                scaleX: 1,
                scaleY: 1,
                alpha: 1
            }, 100, null, 0).addLabel("show", 0).to(this.bgSprite, {
                alpha: 1
            }, 1e3, null, 0).addLabel("hide", 0).to(this.bgSprite, {
                alpha: 0
            }, 1e3, null, 0), this.timeLine.on(Laya.Event.COMPLETE, this, this.onComplete), 
            this.mouseThrough = !0;
        }, e.removeRes = function() {
            this.timeLine.destroy();
        }, e.onComplete = function() {
            this.visible = !1, this.mouseThrough = !0;
        }, e.prompt = function(e) {
            this.tipText.text = e, this.tipText.x = this.textOffx, this.bgSprite.height = 30 + this.textOffx, 
            this.timeLine.play(0, !1), this.visible = !0;
        }, e.prompt1 = function(e) {
            this.bgSprite.skin = e, this.bgSprite.height = null, this.bgSprite.width = null, 
            this.timeLine.play(0, !1), this.visible = !0;
        }, e.resize = function() {
            this.bgSprite && (this.bgSprite.width = Laya.stage.width - 40, this.bgSprite.height = this.tipText.contextHeight + this.textOffx, 
            this.bgSprite.x = Laya.stage.width / 2, this.bgSprite.y = Laya.stage.height / 8, 
            this.tipText && (this.tipText.style.width = this.bgSprite.width - 2 * this.textOffx));
        };
    }(), window.promptUtils = new ulee.PromptUtils(), function() {
        ulee.BattleScript = function() {
            this.$updateArr = [], this.ray = new Laya.Ray(new Laya.Vector3(0, .2, 0), new Laya.Vector3(0, 0, -1)), 
            this.outHitInfo = new Laya.HitResult(), this.point = new Laya.Vector2(), this.ray2 = new Laya.Ray(new Laya.Vector3(0, .2, 0), new Laya.Vector3(0, 0, -1)), 
            G.COLLIDERGROUP = {
                GROUND: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1,
                JUMP: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2,
                RELOAD: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3,
                ENEMY: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4,
                GROUND: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5,
                ENEMYBODY: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER6,
                ENDPOS: Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER7
            };
        }, (0, Laya.ClassUtils.regClass)("ulee.BattleScript", ulee.BattleScript);
        var e = ulee.BattleScript.prototype;
        e.initData = function() {
            this.recoverEnemy = [], this.enemy = [], this.hero = null, this.sceneModel = [], 
            this.bulletArr = [], this.curEnemyArr = null, this.heroSpeed = 2, this.gameStep = 1, 
            this.takeAim = !1, this.isDeath = !1, this.dieFallSpeed = 0, this.isStopFall = !1, 
            this.isStatGame = !1, this.gravity = 5, this.dgravity = this.gravity / 2, this.jumpSpeed = 3.5, 
            this.jumpFallTime = 2 * this.jumpSpeed / this.gravity, this.jumpRS = 360 / this.jumpFallTime, 
            this.enemyShotHero = !1, this.isCanShoot = !1, this.bulletSpeed = 5, this.unrRepeatNum = 1, 
            this.modelArr = [], this.boxArr = [], this.killCnt = 0, this.createEnemyCnt = 0, 
            this.tryTimes = 0, this.isChallengeMode = !0, this.isChallengeMode ? (this.aniSpeed1 = 1, 
            this.aniSpeed2 = .8) : (this.aniSpeed1 = .8, this.aniSpeed2 = .6);
        }, e.initScene = function(e) {
            this.touchNode = parent, this.newScene = e.addChild(new Laya.Scene3D()), this.camera = cameraUtils.createCamera(new Laya.Vector3(.5, 1.5, 9), new Laya.Vector3(0, 0, 0), !1), 
            this.newScene.addChild(this.camera);
            var t = new Laya.DirectionLight();
            this.newScene.addChild(t), t.color = new Laya.Vector3(.6, .6, .6);
            var i = t.transform.worldMatrix;
            i.setForward(new Laya.Vector3(-1, -1, -1)), t.transform.worldMatrix = i, this.pistol = ulee.Model.create(this.newScene, 50002, Handler.create(this, function() {
                this.pistol.setLocalRotation(90, 0, 0), this.pistol.setLocalPosition(0, 0, 0), this.pistol.setActive(!1), 
                this.pistol.setAnimSpeed("reload", 1.5);
            }));
            var a = this;
            this.createHero(1, function() {
                G.heroComplete = !0, a.changeGun(dataManager.getUserData("gunId"));
            });
        }, e.initRound = function(e) {
            console.log("关卡：", e), this.roundId = e;
            var t = D.roundConfig[e].terrainId, i = D.roundConfig[e].bgId, a = D.roundConfig[e].shotType, s = D.roundConfig[e].jumpSpot.split("#"), n = D.roundConfig[e].monsterComposeId, o = D.roundConfig[e].loadSpot.split("#"), r = D.roundConfig[e].endSpot.split("#");
            this.enemys = [];
            for (var l = 0, h = null, d = 0, u = null, c = 0; l < t.length; l++) {
                if (this.addGround(l, D.terrainConfig[t[l]].modelId, D.backgroundConfig[i[l]].modelId), 
                0 != a[l]) {
                    h = s[l].split(","), d = parseFloat(h[0]) + 9 * l - 5;
                    let e = this.addShootPos(d, parseFloat(h[1]), a[l]);
                    for (e.enemys = [], u = D.monsterComposeConfig[n[l]].monsterId, c = 0; c < u.length; c++) {
                        var g = D.monsterConfig[u[c]];
                        h = g.position.split(","), d = parseFloat(h[0]) + 9 * +l - 5;
                        let t = this.addEnemy(d, parseFloat(h[1]), parseFloat(h[2]), g.shootAction, g.idleAction, u[c]);
                        e.enemys.push(t), this.enemys.push(t);
                    }
                }
                if (0 != o[l] && (h = o[l].split(","), d = parseFloat(h[0]) + 9 * l - 5, this.addReloadPos(d, parseFloat(h[1]))), 
                0 != r[l]) {
                    let e = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.5, .5, .5));
                    e.transform.position = new Laya.Vector3(parseFloat(r[l]) + 9 * l - 5, 0, 0);
                    let t = e.addComponent(Laya.PhysicsCollider);
                    t.collisionGroup = G.COLLIDERGROUP.ENDPOS;
                    let i = new Laya.BoxColliderShape(.5, 0, .5);
                    t.colliderShape = i;
                    let a = new Laya.BlinnPhongMaterial();
                    e.meshRenderer.material = a, a.albedoColor = new Laya.Vector4(1, 1, 0, 1), a.renderMode = 2, 
                    a.albedoColorA = 0, this.newScene.addChild(e), this.boxArr.push(e);
                }
            }
            if (1 != this.roleId) {
                var p = this;
                this.createHero(1, function() {
                    G.heroComplete = !0, p.heroBase.transform.position = new Laya.Vector3(0, 0, 0), 
                    p.heroBase.transform.rotate(new Laya.Vector3(0, 0, 0), !1, !1), p.changeGun(dataManager.getUserData("gunId"));
                });
            } else this.hero.setLocalRotation(90, 0, 0), this.hero.playAnim("idle", this, null, 1), 
            this.heroBase.transform.position = new Laya.Vector3(0, 0, 0), this.heroBase.transform.rotate(new Laya.Vector3(0, 0, 0), !1, !1), 
            4 == battleMgr.curGunId && 4 != dataManager.getUserData("gunId") ? battleMgr.changeGun(4) : this.changeGun(dataManager.getUserData("gunId"));
            this.isChallengeMode = 100 == e, this.isChallengeMode ? (this.aniSpeed1 = 1, this.aniSpeed2 = 1) : (this.aniSpeed1 = .8, 
            this.aniSpeed2 = .6);
        }, e.createHero = function(e, t) {
            this.roleId = e;
            var i = D.roleConfig[e], a = D.gunConfig[i.gunId], s = i.modelId;
            if (!this.heroBase) {
                this.heroBase = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.5, .5, .5));
                let e = new Laya.BlinnPhongMaterial();
                this.heroBase.meshRenderer.material = e, e.renderMode = 2, e.albedoColorA = 0, this.newScene.addChild(this.heroBase), 
                this.heroBase.transform.position = new Laya.Vector3(0, 0, 0), this.heroBase.transform.rotate(new Laya.Vector3(0, 0, 0), !1, !1);
            }
            this.hero && this.hero.dispose(), this.hero = ulee.Model.create(this.heroBase, s, Handler.create(this, function() {
                this.hero.setLocalRotation(90, 0, 0), this.hero.setLocalPosition(0, .5, 0), this.shootRay = utils.getChildDeep(this.hero._sprite, "ray"), 
                this.shootRay.active = !1, this.bulletId = a.bulletId, this.hero.gun1 = ulee.Model.create(utils.getChildDeep(this.hero._sprite, "gun1"), a.modelId, Handler.create(this, function() {})), 
                this.hero.gun2 = ulee.Model.create(utils.getChildDeep(this.hero._sprite, "gun2"), a.modelId, Handler.create(this, function() {})), 
                this.resetAni(this.hero, "idle");
                let e = new g();
                Laya.Texture2D.load(i.picture, Laya.Handler.create(null, function(t) {
                    e.diffuseTexture = t;
                })), e.marginalColor = new Laya.Vector3(1, 1, 1), this.hero.setMaterial2(utils.getChildDeep(this.hero._sprite, "role"), e), 
                t && t();
            }));
        }, e.changeGun = function(e) {
            this.curGunId = e;
            var t = D.gunConfig[e];
            this.bulletId = t.bulletId, this.hero.gun1 && (this.hero.gun1.dispose(), this.hero.gun2.dispose()), 
            this.hero.gun1 = ulee.Model.create(utils.getChildDeep(this.hero._sprite, "gun1"), t.modelId, Handler.create(this, function() {})), 
            this.hero.gun2 = ulee.Model.create(utils.getChildDeep(this.hero._sprite, "gun2"), t.modelId, Handler.create(this, function() {}));
        }, e.resetAni = function(e, t) {
            var i = [ "die", "idle", "jumpbackdown", "jumpbackup", "jumpforwarddown", "jumpforwardup", "reload", "run", "shootdown1", "shootdown2", "shootup1", "shootup2" ], a = e.animator;
            a._controllerLayers[0]._statesMap = [];
            for (var s = 0, n = 0; n < i.length; n++) {
                let o = i[n], r = "models/action/" + o + ".lani";
                Laya.AnimationClip.load(r, Laya.Handler.create(this, function(n) {
                    s++;
                    let r = new Laya.AnimatorState();
                    r.name = o, r.clip = n, a._controllerLayers[0].addState(r), s == i.length && e.playAnim(t);
                }));
            }
        }, e.addGround = function(e, t, i) {
            let a = ulee.Model.create(this.newScene, t, Handler.create(this, function() {
                a.setLocalPosition(9 * e - 5, -5, 2), Laya.Texture2D.load("models/obj/obj_texture/" + D.roundConfig[this.roundId].picture1, Laya.Handler.create(null, function(e) {
                    a._sprite._children[0].meshRenderer.material.albedoTexture = e;
                }));
                let t = a._sprite.addComponent(Laya.PhysicsCollider), i = new Laya.MeshColliderShape();
                i.mesh = a._sprite._children[0].meshFilter.sharedMesh, t.colliderShape = i, t.collisionGroup = G.COLLIDERGROUP.GROUND, 
                this.modelArr.push(a);
            }));
            if (i) {
                let t = ulee.Model.create(this.newScene, i, Handler.create(this, function() {
                    t.setLocalPosition(9 * e - 5, 0, 0), this.modelArr.push(t);
                }));
            }
        }, e.addShootPos = function(e, t, i) {
            var a = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.5, .5, .5));
            a.transform.position = new Laya.Vector3(e, 0, 0);
            let s = a.addComponent(Laya.PhysicsCollider);
            s.collisionGroup = G.COLLIDERGROUP.JUMP;
            let n = new Laya.BoxColliderShape(.5, 0, .5);
            s.colliderShape = n, s.type = i, this.newScene.addChild(a);
            let o = new Laya.BlinnPhongMaterial();
            return a.meshRenderer.material = o, o.albedoColor = new Laya.Vector4(1, 0, 0, 1), 
            o.renderMode = 2, o.albedoColorA = 0, this.boxArr.push(a), s;
        }, e.addReloadPos = function(e, t) {
            var i = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(.5, .5, .5));
            i.transform.position = new Laya.Vector3(e, 0, 0);
            let a = i.addComponent(Laya.PhysicsCollider);
            a.collisionGroup = G.COLLIDERGROUP.RELOAD;
            let s = new Laya.BoxColliderShape(.5, .5, .5);
            a.colliderShape = s;
            let n = new Laya.BlinnPhongMaterial();
            i.meshRenderer.material = n, n.renderMode = 2, n.albedoColorA = 0, this.boxArr.push(i), 
            this.newScene.addChild(i);
        }, e.addEnemy = function(e, t, i, a, s, n, o) {
            var r = null;
            if (!o && this.recoverEnemy.length > 0) (r = this.recoverEnemy.pop()).model.setActive(!0), 
            r.model.playAnim(s, this, null, .3), r.model.isDeath = !1, r.model.shootAction = a, 
            r.model.setLocalPosition(0, -.5, i), Laya.Texture2D.load("models/obj/obj_texture/" + D.monsterConfig[n].picture, Laya.Handler.create(null, function(e) {
                r.model._sprite._children[0]._children[1].skinnedMeshRenderer.material.albedoTexture = e;
            })); else {
                r = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(.25, 1));
                let e = new Laya.BlinnPhongMaterial();
                r.meshRenderer.material = e, e.renderMode = 2, e.albedoColorA = 0, this.newScene.addChild(r);
                let t = ulee.Model.create(r, 10001, Laya.Handler.create(this, function() {
                    Laya.Texture2D.load("models/obj/obj_texture/" + D.monsterConfig[n].picture, Laya.Handler.create(null, function(e) {
                        t._sprite._children[0]._children[1].skinnedMeshRenderer.material.albedoTexture = e;
                    })), t.setLocalPosition(0, -.5, i), t.setLocalRotation(math.random(-10, 10), 0, 0), 
                    t.playAnim(s, this, null, .3), r.model = t, t.shootAction = a, o && o(r);
                }));
                this.createEnemyCnt++;
            }
            r.transform.position = new Laya.Vector3(e, t + .5, 0);
            let l = r.addComponent(Laya.PhysicsCollider), h = new Laya.CapsuleColliderShape(.25, 1);
            return l.colliderShape = h, l.collisionGroup = G.COLLIDERGROUP.ENEMY, r;
        }, e.test = function() {
            this.ray1 = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), 
            this.point1 = new Laya.Vector2(), this.outHitResult1 = new Laya.HitResult(), this.point1.x = Laya.MouseManager.instance.mouseX, 
            this.point1.y = Laya.MouseManager.instance.mouseY, this.camera.viewportPointToRay(this.point1, this.ray1), 
            this.newScene.physicsSimulation.rayCast(this.ray1, this.outHitResult1), this.outHitResult1.succeeded && console.log("!!!!!!");
        }, e.startGame = function() {
            this.isStatGame || (this.updateKey = updateManager.frameLoop(1, this, this.loop), 
            this.hero.playAnim("run", this, null, 1.2, .2), this.isStatGame = !0, utils.create3DFont(this.newScene, utils.randomSlogan(), this.hero.avater.transform.position), 
            sdkUtils.isWX && wx.aldStage.onStart({
                stageId: this.roundId + "",
                stageName: "第" + this.roundId + "关"
            }), audioManager.playMusic(2));
        }, e.pauseGame = function() {
            this.updateKey && (updateManager.clear(this.updateKey, this), this.updateKey = null, 
            this.hero.setAnimSpeed(this.hero.curAnim, 0), audioManager.stopMusic());
        }, e.resumeGame = function() {
            this.updateKey = updateManager.frameLoop(1, this, this.loop), this.hero.setAnimSpeed(this.hero.curAnim, this.hero.curAnimSpeed), 
            audioManager.playMusic(2);
        }, e.restartGame = function(e) {
            this.updateKey && (updateManager.clear(this.updateKey, this), this.updateKey = null);
            for (var t = 0; t < this.modelArr.length; t++) this.modelArr[t].dispose();
            this.modelArr = [];
            for (t = 0; t < this.boxArr.length; t++) this.boxArr[t].destroy();
            this.boxArr = [];
            for (t = 0; t < this.bulletArr.length; t++) this.bulletArr[t].dispose();
            this.bulletArr = [];
            for (t = 0; t < this.enemys.length; t++) this.enemys[t]._components[0] && (this.enemys[t].model.setActive(!1), 
            this.recoverEnemy.push(this.enemys[t]), this.enemys[t]._components[0].destroy());
            this.initRound(e), uiManager.getUI("game/MainView.scene").reload(), this.enemyBullet && (this.enemyBullet.dispose(), 
            this.enemyBullet = null), modelUtils.setLocalPosition(this.camera, .5, 1.5, 9), 
            this.killCnt = 0, this.isStatGame = !1, this.isDeath = !1, this.isStopFall = !1, 
            this.takeAim = !1, this.isJump = !1, this.shootRay.active = !1, this.enemyShotHero = !1, 
            audioManager.stopMusic();
        }, e.endGame = function() {
            updateManager.clear(this.updateKey, this), 
            this.updateKey = null,
            console.log("endGame");
            uiManager.openUI("game/AccountView.scene", null, {
                success: !0
            }), 
            audioManager.stopMusic(), 4 == battleMgr.curGunId && 4 != dataManager.getUserData("gunId") ? this.tryTimes++ : this.tryTimes = 0, 
            this.tryTimes > 2 && (console.log("试用到达上限"), battleMgr.curGunId = 1);
        }, e.loop = function() {
            var e = G.FRAME_INTERVAL;
            this.heroMove(e), this.bulletMove(e);
        }, e.heroMove = function(e) {
            let t = modelUtils.getPosition(this.heroBase);
            if (this.isDeath) {
                let t = this.hero._localRotation2;
                if (0 != t.y && (t.y >= 180 ? (t.y += 2, t.y > 360 && (t.y = 0)) : (t.y -= 2, t.y < 0 && (t.y = 0)), 
                this.hero.setLocalRotation(t.x, t.y, t.z)), !this.isStopFall) {
                    let t = modelUtils.getPosition(this.heroBase);
                    this.ray.origin = utils.getChildDeep(this.hero._sprite, "origin").transform.position;
                    utils.getChildDeep(this.hero._sprite, "dir").transform.position;
                    if (this.ray.direction.x = 0, this.ray.direction.y = -1, this.ray.direction.z = 0, 
                    this.newScene.physicsSimulation.rayCast(this.ray, this.outHitInfo, 2, G.COLLIDERGROUP.GROUND), 
                    this.outHitInfo.succeeded) this.outHitInfo.collider.collisionGroup == G.COLLIDERGROUP.GROUND && (this.outHitInfo.point.y < t.y ? (this.dieFallSpeed += 3 * e, 
                    t.y -= this.dieFallSpeed * e, t.y < this.outHitInfo.point.y && (t.y = this.outHitInfo.point.y, 
                    this.isStopFall = !0), modelUtils.setLocalPosition(this.heroBase, t.x, t.y, t.z)) : (t.y = this.outHitInfo.point.y, 
                    modelUtils.setLocalPosition(this.heroBase, t.x, t.y, t.z), this.isStopFall = !0)); else this.dieFallSpeed += 3 * e, 
                    t.y -= this.dieFallSpeed * e, 270 == this.hero._localRotation2.x ? t.x += .01 : t.x -= .01, 
                    modelUtils.setLocalPosition(this.heroBase, t.x, t.y, t.z), t.y < -5 && (this.isStopFall = !0);
                }
            } else {
                if (this.isJump) if (this.clearAll ? e *= .8 : this.isChallengeMode ? e *= .4 : e *= .2, 
                this.takeAim) {
                    this.jumpTime += e;
                    var i = t.x + this.heroSpeed * e, a = this.hero._localRotation2;
                    if (1 == this.jumpType) {
                        var s = this.jumpSpeed * this.jumpTime - this.dgravity * this.jumpTime * this.jumpTime;
                        a.y += this.jumpRS * e, s < 0 && (this.takeAim = !1, this.isJump = !1, a.y = 0, 
                        s = 0, audioManager.playSound(8), this.hero.playAnim("jumpforwarddown", this, function() {
                            console.log("落地"), this.hero.playAnim("run", this, null, 1.2, .2), G.ISVIBRATE && sdkUtils && sdkUtils.startVibrate();
                        })), this.hero.setLocalRotation(a.x, a.y, a.z);
                    } else if (2 == this.jumpType) {
                        s = this.jumpSpeed * this.jumpTime - this.dgravity * this.jumpTime * this.jumpTime;
                        a.y += this.jumpRS * e, s < 0 && (this.takeAim = !1, this.isJump = !1, a.y = 0, 
                        s = 0, audioManager.playSound(8), this.hero.playAnim("jumpbackdown", this, function() {
                            console.log("落地"), this.hero.playAnim("run", this, null, 1.2, .2), G.ISVIBRATE && sdkUtils && sdkUtils.startVibrate();
                        })), this.hero.setLocalRotation(a.x, a.y, a.z);
                    } else s = 0;
                } else i = t.x + this.heroSpeed * e, s = 0; else {
                    if (this.isChallengeMode) i = t.x + this.heroSpeed * e * 1.8; else i = t.x + this.heroSpeed * e * 1.2;
                    s = 0;
                }
                modelUtils.setLocalPosition(this.heroBase, i, s, 0), modelUtils.setLocalPosition(this.camera, i + .5, 1.5, 9), 
                this.checkCollider();
            }
        }, e.bulletMove = function(e) {
            let t = modelUtils.getPosition(this.heroBase);
            for (var i = 0, a = 0, s = 0, n = 0, o = null; i < this.bulletArr.length; i++) if ((o = this.bulletArr[i]).target) {
                let t = o._localPosition;
                if (!this.isDeath && (o.time -= e, o.time <= 0)) {
                    G.ISVIBRATE && sdkUtils && sdkUtils.startVibrate(), audioManager.playSound(math.random(9, 12));
                    var r = o.target.owner.model, l = o.target.owner;
                    o.speedX < 0 ? (this.createBlood(o.target.owner.transform._position, 0), r.playAnim("die2", this, function() {
                        r.setActive(!1), this.recoverEnemy.push(l);
                    }, .7, 1)) : (this.createBlood(o.target.owner.transform._position, 180), r.playAnim("die", this, function() {
                        r.setActive(!1), this.recoverEnemy.push(l);
                    }, .7, 1)), o.target.owner.model.isDeath = !0, o.target.owner._components[0].destroy(), 
                    this.killCnt++, uiManager.getUI("game/MainView.scene").setChallengeKill(this.killCnt), 
                    this.clearAll = !0;
                    for (var h = 0; h < this.curEnemyArr.length; h++) {
                        this.curEnemyArr[h].model.isDeath || (this.clearAll = !1);
                    }
                    this.clearAll && (console.log("清理完毕"), this.shootRay.active = !1, 3 != this.jumpType && 4 != this.jumpType || this.hero.setAnimSpeed(this.hero.curAnim, .8)), 
                    o.target = null;
                    continue;
                }
                a = e * o.speedX, s = e * o.speedY, n = e * o.speedZ, t.x += a, t.y += s, t.z += n, 
                o.setLocalPosition(t.x, t.y, t.z);
            } else {
                let r = o._localPosition;
                if (a = e * o.speedX * this.bulletSpeed, s = e * o.speedY * this.bulletSpeed, n = e * o.speedZ * this.bulletSpeed, 
                Math.sqrt(a * a + s * s + n * n), r.x += a, r.y += s, r.z += n, r.x > t.x + 5 || r.x < t.x - 5 || r.y > t.y + 20 || r.y < t.y - 6) {
                    o.dispose(), this.bulletArr.removeAt(i), i--;
                    continue;
                }
                o.setLocalPosition(r.x, r.y, r.z);
            }
            if (this.enemyBullet) {
                let t = (o = this.enemyBullet)._localPosition;
                if (!this.isDeath) {
                    let e = this.heroBase.transform._localPosition, i = e.x - t.x, a = e.y + .2 - t.y;
                    if (Math.abs(i) < .5 && Math.abs(a) < .5) this.isDeath = !0, i > 0 ? (this.createBlood(this.heroBase.transform._localPosition, 180), 
                    this.die(270)) : (this.createBlood(this.heroBase.transform._localPosition, 0), this.die(90)); else {
                        let e = 0 != i ? Math.abs(i) / i : 1, t = 0 != a ? Math.abs(a) / a : 1;
                        Math.abs(a) > Math.abs(i) ? (i = Math.abs(i / a), a = 1) : (a = Math.abs(a / i), 
                        i = 1), o.speedX = i * e, o.speedY = a * t;
                    }
                }
                a = e * o.speedX * this.bulletSpeed * 1.2, s = e * o.speedY * this.bulletSpeed * 1.2, 
                t.x += a, t.y += s, t.z *= .8, o.setLocalPosition(t.x, t.y, t.z);
            }
        }, e.checkCollider = function() {
            if (this.isJump) {
                if (this.takeAim && this.curEnemyArr) {
                    var e = null;
                    this.out = [];
                    for (var t = 0; t < this.curEnemyArr.length; t++) if (!this.curEnemyArr[t].isDeath) {
                        e = utils.getChildDeep(this.hero._sprite, "origin").transform.position, this.ray.origin.x = e.x, 
                        this.ray.origin.y = e.y, this.ray.origin.z = 0;
                        var i = utils.getChildDeep(this.hero._sprite, "dir").transform.position;
                        this.ray.direction.x = i.x - this.ray.origin.x, this.ray.direction.y = i.y - this.ray.origin.y, 
                        this.ray.direction.z = 0;
                        var a = [];
                        this.newScene.physicsSimulation.rayCastAll(this.ray, a, 3, G.COLLIDERGROUP.ENEMY, G.COLLIDERGROUP.ENEMY);
                        for (var s = 0; s < a.length; s++) a[s].collider.point = a[s].point, this.out.push(a[s].collider);
                    }
                    if (this.out = [ ...new Set(this.out) ], this.bkOut) for (var n = 0, o = null, r = !1, l = 0; n < this.bkOut.length; n++) if (r = !1, 
                    (o = this.bkOut[n]).owner) {
                        if (this.out.length > 0) for (l = 0; l < this.out.length; l++) if (o == this.out[l]) {
                            r = !0;
                            break;
                        }
                        r || o.isDeath || this.enemyShot(o.owner);
                    }
                    for (s = 0, o = null, r = !1; s < this.out.length; s++) {
                        if (!(o = this.out[s]).index) if (o.index = this.unrRepeatNum++, o.owner.model.playAnim(o.owner.model.shootAction, this, null, .4, 1), 
                        console.log("射击到新的敌人", o.index), 1 == dataManager.getUserData("roundId")) uiManager.getUI("game/MainView.scene").showGuide(!0), 
                        this.pauseGame();
                    }
                    this.bkOut = this.out, this.bkOut = this.bkOut.sort(function(e, t) {
                        return e.index - t.index;
                    });
                }
            } else if (this.ray.origin = utils.getChildDeep(this.hero._sprite, "origin").transform.position, 
            this.ray.direction.x = 0, this.ray.direction.y = -1, this.ray.direction.z = 0, this.newScene.physicsSimulation.rayCast(this.ray, this.outHitInfo, 1), 
            this.outHitInfo.succeeded) {
                var h = this.outHitInfo.collider;
                h._collisionGroup == G.COLLIDERGROUP.JUMP ? (this.curEnemyArr = h.enemys, this.clearAll = !1, 
                this.startJump(h.type), h.owner.destroy()) : h._collisionGroup == G.COLLIDERGROUP.RELOAD ? (this.reload(), 
                h.owner.destroy()) : h._collisionGroup == G.COLLIDERGROUP.ENDPOS && (
                    25 == this.roundId ? (
                        // dataManager.setUserData("roundId", math.random(22, 25) ), 
                    utils.prompt("Congratulations, you have passed all levels!")) : 100 == this.roundId || dataManager.setUserData("roundId", this.roundId + 1), 
                    this.endGame(), this.hero.playAnim("idle", this, null, 1, .2));
            }
        }, e.startJump = function(e) {
            var t = this;
            this.jumpType = e, this.isJump = !0, this.jumpTime = 0, 1 == e ? (audioManager.playSound(7), 
            this.hero.playAnim("jumpforwardup", this, function() {
                t.takeAim = !0, console.log("开始射线"), this.shootRay.active = !0;
            }, this.aniSpeed1)) : 2 == e ? (audioManager.playSound(7), this.hero.playAnim("jumpbackup", this, function() {
                t.takeAim = !0, this.shootRay.active = !0, console.log("开始射线");
            }, this.aniSpeed1)) : 3 == e ? this.hero.playAnim("shootup1", this, function() {
                t.takeAim = !0, t.shootRay.active = !0, console.log("开始射线"), t.hero.playAnim("shootup2", this, function() {
                    t.shootRay.active = !1, t.hero.playAnim("run", this, null, 1.2, .2), t.takeAim = !1, 
                    t.isJump = !1;
                }, .2);
            }, this.aniSpeed2, .2) : 4 == e && this.hero.playAnim("shootdown1", this, function() {
                t.takeAim = !0, t.shootRay.active = !0, console.log("开始射线"), t.hero.playAnim("shootdown2", this, function() {
                    t.shootRay.active = !1, t.hero.playAnim("run", this, null, 1.2, .2), t.takeAim = !1, 
                    t.isJump = !1;
                }, .2);
            }, this.aniSpeed2, .2), console.log("起跳");
        }, e.reload = function() {
            var e = this;
            this.hero.playAnim("reload", this, function() {
                e.hero.playAnim("run", this, null, 1.2, .2), this.pistol.replay();
                let t = modelUtils.getPosition(this.heroBase);
                this.pistol.setLocalPosition(t.x, t.y, t.z);
            }, 1, .2), uiManager.getUI("game/MainView.scene").reload(), audioManager.playSound(6), 
            utils.create3DFont(this.newScene, utils.randomSlogan(), this.hero.avater.transform.position);
        }, e.die = function(e) {
            this.shootRay.active = !1, 
            this.hero.setLocalRotation(e, 0, 0), 
            this.hero.playAnim("die", this, function() {
                updateManager.timeOnce(.3, this, function() {
                    uiManager.openUI("game/AccountView.scene", null, {
                        success: !1
                    });
                });
            }, .5, .2), G.ISVIBRATE && sdkUtils && sdkUtils.startVibrate(!0), audioManager.playSound(9), 
            battleMgr.curGunId = 1;
        }, e.shot = function(e) {
            if (this.shootRay.active) {
                G.ISVIBRATE && sdkUtils && sdkUtils.startVibrate(), e && e();
                var t = ulee.Model.create(this.newScene, this.bulletId, Handler.create(this, function() {
                    if (t.target && t.target.owner && !t.target.isBeShot) {
                        var e = utils.getChildDeep(this.hero._sprite, "origin").transform.position;
                        t.setLocalPosition(e.x, e.y, e.z);
                        t.target.owner.transform._position;
                        var i = t.target.owner.model._localPosition;
                        console.log("子弹瞄准敌人"), t.target.isBeShot = !0, t.target.point.z = i.z, console.log(t.target.point.z);
                        var a = Laya.Vector3.distance(t.target.point, e) / this.bulletSpeed;
                        t.time = a, t.speedX = (t.target.point.x - e.x) / a, t.speedY = (t.target.point.y - e.y) / a, 
                        t.speedZ = (t.target.point.z - e.z) / a, t._sprite.transform.lookAt(t.target.point, new Laya.Vector3(-1, 0, 0));
                    } else {
                        console.log("子弹空目标"), t.target = null;
                        e = utils.getChildDeep(this.hero._sprite, "origin").transform.position;
                        var s = utils.getChildDeep(this.hero._sprite, "dir").transform.position;
                        t.setLocalPosition(e.x, e.y, e.z);
                        var n = s.x - e.x, o = s.y - e.y;
                        t._sprite.transform.lookAt(new Laya.Vector3(s.x, s.y, 0), new Laya.Vector3(-1, 0, 0)), 
                        t.speedX = n, t.speedY = o, t.speedZ = 0;
                    }
                    this.bulletArr.push(t);
                }));
                this.bkOut && this.bkOut.length > 0 ? (this.bkOut[0].isDeath = !0, t.target = this.bkOut[0]) : t.target = null;
            }
        }, e.enemyShot = function(e) {
            if (console.log(e), !this.enemyShotHero) {
                audioManager.playSound(5), G.enemy = e;
                var t = ulee.Model.create(this.newScene, 50001, Handler.create(this, function() {
                    var i = utils.getChildDeep(e, "Bip001 R Hand").transform.position;
                    t.setLocalPosition(i.x, i.y, i.z + .2), this.enemyBullet = t;
                }));
                this.enemyShotHero = !0;
            }
        }, e.createBlood = function(e, t) {
            var i = ulee.Model.create(this.newScene, 60001, Handler.create(this, function() {
                i.setLocalPosition(e.x, e.y, e.z + .2), i.setLocalRotation(0, 0, t), i._setRenderMode(0, i._sprite), 
                updateManager.timeOnce(2, this, function() {
                    i.dispose();
                });
            }));
        };
    }(), window.battleMgr = new ulee.BattleScript();
    class g extends Laya.Material {
        constructor() {
            super(), this.setShaderName("CustomShader");
        }
        get diffuseTexture() {
            return this._shaderValues.getTexture(g.DIFFUSETEXTURE);
        }
        set diffuseTexture(e) {
            this._shaderValues.setTexture(g.DIFFUSETEXTURE, e);
        }
        set marginalColor(e) {
            this._shaderValues.setVector(g.MARGINALCOLOR, e);
        }
    }
    g.DIFFUSETEXTURE = Laya.Shader3D.propertyNameToID("u_texture"), g.MARGINALCOLOR = Laya.Shader3D.propertyNameToID("u_marginalColor"), 
    function() {
        
    }(), function() {
        ulee.SdkUtils = function() {
            this.initData();
        }, (0, Laya.ClassUtils.regClass)(ulee.SdkUtils, "ulee.SdkUtils");
        var e = ulee.SdkUtils.prototype;
        e.initData = function() {
            this.isVivo = !1, console.log("初始化sdk"), this.isVivo && (this.systemInfoSync = qg.getSystemInfoSync(), 
            this.hasBanner = !1, this.hasVideo = !1, this.hasNative = !1, this.hasInterstitial = !1, 
            this.isShowBanner = !1, this.bannerId = "474eb6200b5f45f09ace44f8c49e34b3", this.videoId = "e77d1eb46e684d528018bf0a6df96902", 
            this.interstitial = "", this.systemInfoSync.platformVersionCode >= 1031 && (this.hasBanner = !0, 
            this.hasInterstitial = !0), this.systemInfoSync.platformVersionCode >= 1041 && (this.hasVideo = !0), 
            this.systemInfoSync.platformVersionCode >= 1053 && (this.hasNative = !0));
        }, e.showAD = function(e) {
            this.isVivo && this.showBanner(e);
        }, e.showVideoAD = function(e, t) {
            this.showVideo(e, t)
        }, e.showBanner = function(e) {
            var t = this;
            if (e) {
                if (this.adCreateTime && new Date().getTime() - this.adCreateTime < 1e4) return void utils.prompt("广告加载频繁,请10s后再试");
                this.adCreateTime = new Date().getTime(), this.bannerAd = qg.createBannerAd({
                    posId: this.bannerId,
                    style: {}
                });
                var i = this.bannerAd.show();
                i && i.then(function() {
                    console.log("banner广告展示成功"), t.isShowBanner = !0;
                }).catch(function(e) {
                    console.log("banner广告错误：", e), e.data && "new user screened ads types" == e.data.errMsg && (G.isNewUser = !0);
                }), this.bannerAd.onLoad(function() {
                    console.log("加载完毕banner广告");
                }), this.bannerAd.onClose(function() {
                    console.log("banner关闭"), t.isShowBanner = !1, t.bannerAd.destroy(), t.bannerAd = null;
                }), this.bannerAd.onError(function(e) {
                    console.log("banner错误：", e);
                });
            } else console.log("隐藏BANNER广告", this.isShowBanner), this.isShowBanner && (this.isShowBanner = !1, 
            this.bannerAd.destroy(), this.bannerAd = null);
        }, e.showInterstitial = function(e, t) {}, 
        e.showVideo = function(e, t)
        {
            platform.getInstance().showReward(e,t);
        }, 
        e.showInterstitialAd = function() {},
        e.showNativeAd = function(e) {
           
        }, e.startVibrate = function(e) {
            this.isVivo && 0 != G.vibration && (e ? qg.vibrateLong() : qg.vibrateShort());
        };
    }();
    new class {
        constructor() {
            window.Laya3D ? Laya3D.init(d.width, d.height) : Laya.init(d.width, d.height, Laya.WebGL), 
            Laya.stage.bgColor = "#B0E0E6", Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), 
            Laya.stage.scaleMode = d.scaleMode, Laya.stage.screenMode = d.screenMode, Laya.stage.alignV = d.alignV, 
            Laya.stage.alignH = d.alignH, Laya.URL.exportSceneToJson = d.exportSceneToJson, 
            (d.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(), 
            d.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(), d.stat && Laya.Stat.show(), 
            Laya.alertGlobalError = !0, 
            Laya.stage._setScreenSize = Laya.stage.setScreenSize, 
            Laya.stage.setScreenSize = function(e, t, i)
             {
                if (!Laya.stage._isInputting()) {
                    var a = function() {
                        if (G.SCREEN_MODE == G.SCREEN_MODETYPE.H) {
                            var e = {}, t = Laya.Browser.clientWidth * Laya.Browser.pixelRatio, i = Laya.Browser.clientHeight * Laya.Browser.pixelRatio, a = 1559 / 854, s = 1559 / 720, n = o = Laya.Browser.onPC ? i / t : i > t ? i / t : t / i;
                            o > 1559 / 720 ? (e.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, e.height = 720, e.width = 1559, 
                            G.ratio = Laya.Browser.clientWidth / Laya.stage.width) : o < 1559 / 720 ? (e.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, 
                            e.height = 854, e.width = 1559, G.ratio = Laya.Browser.clientHeight / Laya.stage.height) : (e.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT, 
                            e.height = 720, e.width = 1559, G.ratio = Laya.Browser.clientWidth / Laya.stage.width), 
                            e.trueRate = n;
                        } else {
                            var o;
                            e = {}, t = Laya.Browser.clientWidth * Laya.Browser.pixelRatio, i = Laya.Browser.clientHeight * Laya.Browser.pixelRatio, 
                            a = 1559 / 854, s = 1559 / 720, n = o = Laya.Browser.onPC ? i / t : i > t ? i / t : t / i, 
                            o > s ? (e.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, e.height = 1559, e.width = 720, 
                            G.ratio = Laya.Browser.clientWidth / Laya.stage.width) : o < a ? (e.scaleMode = Laya.Stage.SCALE_FIXED_AUTO, 
                            e.height = 1559, e.width = 854, G.ratio = Laya.Browser.clientHeight / Laya.stage.height) : (e.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT, 
                            e.height = 1559, e.width = 854, G.ratio = Laya.Browser.clientWidth / Laya.stage.width), 
                            e.trueRate = n;
                        }
                        return e;
                    }();
                    this._scaleMode = a.scaleMode, this.designHeight = a.height, this.designWidth = a.width, 
                    this._setScreenSize(e, t), i || Laya.timer.once(2e3, null, function() {
                        Laya.stage.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, Laya.Browser.clientHeight * Laya.Browser.pixelRatio, !0);
                    });
                }
            }, Laya.stage._changeCanvasSize(), 
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            window.updateManager = new ulee.UpdateManager(), 
            window.uiManager = new ulee.UIManager(), 
            window.audioManager = new ulee.AudioManager(), 
            window.bondSDK ? window.sdkUtils = new ulee.WxUtils() : (
                window.sdkUtils = new ulee.SdkUtils(), 
                window.bondSDK = null), 
            eventDispatcher.addEventListen(ulee.Event.ON_DATA_LOAD, this, function() {
                window.dataManager = new ulee.DataManager(), 
                battleMgr.initData(), 
                d.startScene && uiManager.openUI(d.startScene);
            }), 
            initData(), 
            this.initShader();
        }
        initShader() {
            let e = {
                a_Position: Laya.VertexMesh.MESH_POSITION0,
                a_Normal: Laya.VertexMesh.MESH_NORMAL0,
                a_Texcoord: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
                a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
                a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0
            }, t = {
                u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
                u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
                u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
                u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
                u_texture: Laya.Shader3D.PERIOD_MATERIAL,
                u_marginalColor: Laya.Shader3D.PERIOD_MATERIAL,
                "u_SunLight.color": Laya.Shader3D.PERIOD_SCENE
            }, 
            i = Laya.Shader3D.add("CustomShader"),
            a = new Laya.SubShader(e, t);
            i.addSubShader(a), 
            a.addShaderPass('\n        #include "Lighting.glsl";\n        attribute vec4 a_Position;\n        attribute vec2 a_Texcoord;\n        attribute vec3 a_Normal;\n        uniform mat4 u_MvpMatrix;\n        uniform mat4 u_WorldMat;\n        varying vec2 v_Texcoord;\n        varying vec3 v_Normal;\n        #ifdef BONE\n            attribute vec4 a_BoneIndices;\n            attribute vec4 a_BoneWeights;\n            const int c_MaxBoneCount = 24;\n            uniform mat4 u_Bones[c_MaxBoneCount];\n        #endif\n        #if defined(DIRECTIONLIGHT)\n            varying vec3 v_PositionWorld;\n        #endif\n        void main()\n        {\n            #ifdef BONE\n                mat4 skinTransform=mat4(0.0);\n                skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n                skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n                skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n                skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n                vec4 position = skinTransform * a_Position;\n                gl_Position=u_MvpMatrix * position;\n                mat3 worldMat=mat3(u_WorldMat * skinTransform);\n            #else\n                gl_Position=u_MvpMatrix * a_Position;\n                mat3 worldMat=mat3(u_WorldMat);\n            #endif\n\n            v_Texcoord=a_Texcoord;\n            v_Normal=worldMat*a_Normal;\n\n            #if defined(DIRECTIONLIGHT)\n                #ifdef BONE\n                    v_PositionWorld=(u_WorldMat*position).xyz;\n                #else\n                    v_PositionWorld=(u_WorldMat*a_Position).xyz;\n                #endif\n            #endif\n            gl_Position=remapGLPositionZ(gl_Position);\n        }', '\n        #ifdef FSHIGHPRECISION\n            precision highp float;\n        #else\n            precision mediump float;\n        #endif\n        #include "Lighting.glsl";\n        varying vec2 v_Texcoord;\n        uniform sampler2D u_texture;\n        uniform vec3 u_marginalColor;\n        varying vec3 v_Normal;\n\n        #if defined(DIRECTIONLIGHT)\n            uniform vec3 u_CameraPos;\n            varying vec3 v_PositionWorld;\n            uniform DirectionLight u_SunLight;\n        #endif\n\n\n        void main()\n        {\n            gl_FragColor=texture2D(u_texture,v_Texcoord);\n            vec3 normal=normalize(v_Normal);\n            vec3 toEyeDir = normalize(u_CameraPos-v_PositionWorld);\n            float Rim = 1.0 - max(0.0,dot(toEyeDir, normal));\n            vec3 lightColor = u_SunLight.color;\n            vec3 Emissive = 3.0 * lightColor * u_marginalColor * pow(Rim,3.0);\n            gl_FragColor = texture2D(u_texture, v_Texcoord) + vec4(Emissive,1.0);\n        }');
        }
    }();
}();