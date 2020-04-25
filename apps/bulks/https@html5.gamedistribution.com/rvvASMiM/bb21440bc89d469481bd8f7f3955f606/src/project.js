__require = function e(t, i, n) {
    function a(s, l) {
        if (!i[s]) {
            if (!t[s]) {
                var r = s.split("/");
                if (r = r[r.length - 1], !t[r]) {
                    var c = "function" == typeof __require && __require;
                    if (!l && c) return c(r, !0);
                    if (o) return o(r, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
            }
            var d = i[s] = {
                exports: {}
            };
            t[s][0].call(d.exports, function(e) {
                return a(t[s][1][e] || e)
            }, d, d.exports, e, t, i, n)
        }
        return i[s].exports
    }
    for (var o = "function" == typeof __require && __require, s = 0; s < n.length; s++) a(n[s]);
    return a
}({
    AchievementItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e58d0exiXRAhJmDq1b22Rjp", "AchievementItem");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                achievementData: null,
                parentNode: null
            },
            onDestroy: function() {
                this.isInit = null, this.parentNode = null, this.achievementData = null
            },
            destroyNode: function() {
                this.node.getChildByName("getrewardbtn").off(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this), this.node.getChildByName("sharelightbtn").off(cc.Node.EventType.TOUCH_END, this.clickShareFun, this), this.node.destroy()
            },
            initialize: function(e) {
                1 != this.isInit && (this.isInit = !0, this.achievementData = e, this.parentNode = e.parentNode, this.initUI())
            },
            initUI: function() {
                this.node.getChildByName("achievementtxt").getComponent(cc.Label).string = this.achievementData.des;
                var e = new n;
                e.loadSaveData(this.achievementData.diamond);
                var t = e.getNumText();
                this.node.getChildByName("achievementiconsp").getChildByName("diamondcount").getComponent(cc.Label).string = t;
                0 == this.achievementData.getType ? (this.node.getChildByName("getrewardbtn").active = !1, this.node.getChildByName("graybtn").active = !0, this.node.getChildByName("sharelightbtn").active = !1, this.node.getChildByName("sharedarkbtn").active = !0) : 1 == this.achievementData.getType ? (this.node.getChildByName("getrewardbtn").active = !0, this.node.getChildByName("graybtn").active = !1, this.node.getChildByName("sharelightbtn").active = !0, this.node.getChildByName("sharedarkbtn").active = !1) : this.setHasRewardState(), this.node.getChildByName("getrewardbtn").on(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this), this.node.getChildByName("sharelightbtn").on(cc.Node.EventType.TOUCH_END, this.clickShareFun, this), this.setPerText();

                if(gameSDKName == faceBookSDKTest){
                    this.node.getChildByName("sharedarkbtn").active = false;
                    this.node.getChildByName("sharelightbtn").active = false;
                }
            },
            clickGetRewardFun: function() {
                this.getReward(1), this.changeToHasRewardState();

                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
            },
            clickShareFun: function() {
                this.advGetRewardFun()
            },
            advGetRewardFun: function() {
                var e = this;
                gameSDK.newCreateInterstitialAd(advCode8, function() {
                    e.changeToShareState()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })
            },
            changeToShareState: function() {
                if (this.getReward(2), this.node) {
                    var e = this.setShareState();
                    this.getRewardAction(e)
                }
            },
            changeToHasRewardState: function() {
                var e = this.setHasRewardState();
                this.getRewardAction(e)
            },
            setShareState: function() {
                this.node.getChildByName("getrewardbtn").off(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this), this.node.getChildByName("sharelightbtn").off(cc.Node.EventType.TOUCH_END, this.clickShareFun, this);
                var e = this.node.getChildByName("sharelightbtn"),
                    t = e.getComponent(cc.Sprite);
                return this.node.getChildByName("getrewardbtn").active = !1, t.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "yilingquimg"), e.getComponent(cc.Button)._destroyImmediate(), e.x -= 45, this.node.getChildByName("obtain").active = !1, this.node.getChildByName("double").active = !1, e
            },
            setHasRewardState: function() {
                this.node.getChildByName("getrewardbtn").off(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this), this.node.getChildByName("sharelightbtn").off(cc.Node.EventType.TOUCH_END, this.clickShareFun, this);
                var e = this.node.getChildByName("getrewardbtn"),
                    t = e.getComponent(cc.Sprite);
                return this.node.getChildByName("sharelightbtn").active = !1, t.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "yilingquimg"), e.getComponent(cc.Button) && e.getComponent(cc.Button)._destroyImmediate(), e.x += 35, this.node.getChildByName("obtain").active = !1, this.node.getChildByName("double").active = !1, e
            },
            getRewardAction: function(e) {
                e.scaleX = 3, e.scaleY = 3, e.opacity = 150, e.runAction(cc.sequence(cc.spawn(cc.scaleTo(.13, 1, 1), cc.fadeIn(.13)), cc.callFunc(function() {
                    mainSceneContol.gamePlayLayerComponent.addRewardParticle(2)
                })))
            },
            getReward: function(e) {
                e && 2 == e ? (heroData.addAchievementDiamond(this.achievementData), heroData.addAchievementDiamond(this.achievementData)) : heroData.addAchievementDiamond(this.achievementData), mainSceneContol.helpGoldLayerComponent.refreshGold()
            },
            setPerText: function() {
                var e = mainSceneContol.gamePlayLayerComponent.achievement(this.achievementData.achievementID);
                this.node.getChildByName("perlabeltxt").getComponent(cc.Label).string = e.perStr, this.node.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = e.perCount
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    AchievementLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "21111D/oARL47Q3rMYQnnHm", "AchievementLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                moveLayer: null,
                lastMoveLayerY: null,
                isAction: null,
                curData: null
            },
            onDestroy: function() {
                this.isInit = null, this.moveLayer = null, this.lastMoveLayerY = null, this.isAction = null, this.curData = null
            },
            destroyNode: function() {
                for (var e = this.moveLayer.children, t = 0; t < e.length; t++) e[t].getComponent("AchievementItem").destroyNode();
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0;
                    var e = this.node.getChildByName("achievementscv").getComponent(cc.ScrollView);
                    this.moveLayer = e.content, this.isAction = !1, this.curData = [], this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.initData()
                }
            },
            initData: function() {
                var e = 0;
                for (var t in heroData.achievementDataList) {
                    if (-1 != heroData.achievementDataList[t]) 1 == mainSceneContol.gamePlayLayerComponent.achievement(t).result && (heroData.achievementDataList[t] = 1);
                    var i = gameConfigData.achievementConfig[t];
                    i.getType = heroData.achievementDataList[t], i.parentNode = this, i.isAdd = !1;
                    var n = {
                        itemObj: i
                    };
                    this.curData.push(n), e++
                }
                this.moveLayer.height = 140 * e, this.curData.sort(function(e, t) {
                    return e.itemObj.getType < t.itemObj.getType ? 1 : e.itemObj.getType === t.itemObj.getType ? 0 : -1
                });
                for (var a = 0; a < this.curData.length; a++) this.curData[a].y = -70 - 140 * a
            },
            update: function() {
                if (null != this.moveLayer && this.curData.length > 0 && this.moveLayer.y != this.lastMoveLayerY) {
                    this.lastMoveLayerY = this.moveLayer.y;
                    for (var e = 0; e < this.curData.length; e++) {
                        var t = this.curData[e],
                            i = t.y + this.moveLayer.y;
                        if (i <= 580 && i >= -545) {
                            if (!t.achievementItem) {
                                var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.achievement_item_prefab);
                                t.achievementItem = n, n.addComponent("AchievementItem").initialize(this.curData[e].itemObj), this.moveLayer.addChild(n), n.y = t.y
                            }
                            t.achievementItem.active = !0
                        } else t.achievementItem && (t.achievementItem.active = !1)
                    }
                }
            },
            resetY: function() {
                for (var e = this.moveLayer.children, t = 0; t < e.length; t++) {
                    var i = e[t].y + this.moveLayer.y;
                    e[t].active = i <= 580 && i >= -545
                }
            },
            refreshAchievementscv: function(e) {
                this.isAction = !0;
                for (var t = this, i = this.moveLayer.children, n = !1, a = 0; a < i.length; a++) {
                    var o = i[a];
                    o.y < e && (!0 === o.active ? o.runAction(cc.sequence(cc.moveBy(.2, 0, 140), cc.callFunc(function() {
                        t.isAction = !1, !1 === n && (n = !0, t.moveLayer.height -= 140)
                    }))) : o.y += 140)
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    AdvAddFishLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2b8dals0c5I8bNZeCl+Rw/u", "AdvAddFishLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isDestroy: null
            },
            onDestroy: function() {
                this.isInit = null, this.isDestroy = !0
            },
            destroyNode: function() {
                this.isDestroy = !0, this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isDestroy = !1, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.node.getChildByName("getnumart").active = !1, this.node.getChildByName("outlinebgsp").getChildByName("sharedoubledes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.englishimgp_plist, "freefish"), this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").active = !0, this.node.getChildByName("sharedoublebtn").getChildByName("btning").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.englishimgp_plist, "obtain"), this.node.getChildByName("sharedoublebtn").getChildByName("btning").x += 20, this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()), this.isInit = !0)
            },
            showFish: function(e, t) {
                var i = gameConfigData.fishConfig[t];
                this.node.getChildByName("batchgolds").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + i.icon), this.node.getChildByName("batchgolds").scaleX = 2, this.node.getChildByName("batchgolds").scaleY = 2;
                var n = this;
                mainSceneContol.gamePlayLayerComponent.loadAFish(i.icon, function() {
                    if (0 == n.isDestroy) {
                        n.node.getChildByName("batchgolds").getComponent(cc.Sprite)._destroyImmediate();
                        var e = "spine/" + gameConfigData.configureTable.spine + i.icon + "/" + gameConfigData.configureTable.spine + i.icon,
                            t = engine.gameMemoryManagement.getSpine(e),
                            a = n.node.getChildByName("batchgolds").addComponent(sp.Skeleton);
                        a.skeletonData = t, a.animation = gameConfigData.configureTable.animation, a.timeScale = i.timeScale
                    }
                })
            },
            clickWatchbtnFun: function() {
                mainSceneContol.mainRightLayerComponent.lookAdvertisement(), this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    BgLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7aa29dCoF5MIJduuUgy3Vnh", "BgLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.cloudFun(), this.isInit = !0)
            },
            cloudFun: function() {
                if ("2" == gameConfigData.configureTable.config) {
                    var e = this.node.getChildByName("cloudimg1sp"),
                        t = this.node.getChildByName("cloudimg2sp");
                    e.stopAllActions(), t.stopAllActions(), e.x = -160, t.x = 160, t.scaleX = -1;
                    e.runAction(cc.sequence(cc.moveBy(24, 720, 0), cc.scaleBy(.1, -1, 1), cc.moveBy(1120 / 30, -1120, 0), cc.scaleBy(.1, -1, 1), cc.moveBy(400 / 30, 400, 0)).repeatForever()), t.runAction(cc.sequence(cc.moveBy(24, -720, 0), cc.scaleBy(.1, -1, 1), cc.moveBy(1120 / 30, 1120, 0), cc.scaleBy(.1, -1, 1), cc.moveBy(400 / 30, -400, 0)).repeatForever())
                }
            }
        }), cc._RF.pop()
    }, {}],
    CollectLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5b5d9ZMQbVM7qFlONqHEL4t", "CollectLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                dataArr: null,
                fishNodeObj: null,
                pageView: null
            },
            onDestroy: function() {
                this.isInit = null, this.dataArr = null, this.fishNodeObj = null, this.pageView = null
            },
            destroyNode: function() {
                this.node.getChildByName("collectpageview").getComponent(cc.PageView).node.off("page-turning", this.turnPageUpdate, this), this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("turnleftbtn").off(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("turnrightbtn").off(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("invitebtn").off(cc.Node.EventType.TOUCH_END, this.clickInvitebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    for (var e in this.isInit = !0, this.dataArr = [], this.fishNodeObj = new Object, this.curPage = 0, this.pageView = this.node.getChildByName("collectpageview").getComponent(cc.PageView), heroData.haveFish) {
                        var t = new Object;
                        t.fishID = e, t.haveNum = heroData.haveFish[e], t.isAdd = !1, t.fishlv = parseInt(gameConfigData.fishConfig[e].level), this.dataArr.push(t);
                        var i = new cc.Node;
                        i.width = 500, i.height = 250, this.pageView.addPage(i)
                    }
                    this.dataArr.sort(function(e, t) {
                        return e.fishlv - t.fishlv
                    }), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("turnleftbtn").on(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("turnrightbtn").on(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("invitebtn").on(cc.Node.EventType.TOUCH_END, this.clickInvitebtnFun, this), this.pageView.node.on("page-turning", this.turnPageUpdate, this), this.turnPageUpdate()
                }
            },
            clickInvitebtnFun: function() {
                gameSDK.logEvent("tujian_share_dianji", 1, {
                    tujian_share_dianji: "tujian_share_dianji"
                });
                var e = mainBgSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("tujian_share_dianji_chenggong", 1, {
                        tujian_share_dianji_chenggong: "tujian_share_dianji_chenggong"
                    })
                }, function() {
                    gameSDK.logEvent("tujian_share_dianji_shibai", 1, {
                        tujian_share_dianji_shibai: "tujian_share_dianji_shibai"
                    })
                }, e)
            },
            turnPageUpdate: function() {
                this.addNextPage(), this.updateTurnBtn(), this.showPageInfo()
            },
            clickLeftbtnFun: function() {
                var e = this.pageView.getCurrentPageIndex();
                this.pageView.scrollToPage(e - 1)
            },
            clickRightbtnFun: function() {
                var e = this.pageView.getCurrentPageIndex();
                this.pageView.scrollToPage(e + 1)
            },
            addNextPage: function() {
                var e = [],
                    t = this.pageView.getCurrentPageIndex();
                if (t > 0) {
                    var i = t - 1;
                    e.push(i)
                }
                if (e.push(t), t < this.dataArr.length - 1) {
                    var n = t + 1;
                    e.push(n)
                }
                for (var a = 0; a < e.length; a++)
                    if (!this.pageView.getPages()[e[a]].fishSprite) {
                        var o = new cc.Node;
                        this.pageView.getPages()[e[a]].addChild(o), this.pageView.getPages()[e[a]].fishSprite = o;
                        var s = this.dataArr[e[a]].fishID,
                            l = gameConfigData.fishConfig[s];
                        o.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + l.icon.toString()), o.fishID = s, o.haveNum = this.dataArr[e[a]].haveNum, this.fishNodeObj[e[a]] = o
                    } for (var r = 0; r < this.pageView.getPages().length; r++) this.pageView.getPages()[r].fishSprite && (this.pageView.getPages()[r].fishSprite.active = !(r < t - 1) && !(r > t + 1))
            },
            showPageInfo: function() {
                var e = this.pageView.getCurrentPageIndex(),
                    t = this.dataArr[e];
                this.node.getChildByName("collectbgsp").getChildByName("needtxt").getComponent(cc.Label).string = "Number of possession: " + t.haveNum, this.node.getChildByName("destxtbgsp").getChildByName("destxt").getComponent(cc.Label).string = gameConfigData.fishConfig[t.fishID].con
            },
            updateTurnBtn: function() {
                var e = this.node.getChildByName("turnleftbtn"),
                    t = this.node.getChildByName("turnrightbtn"),
                    i = this.pageView.getCurrentPageIndex();
                e.active = 0 != i, i == this.dataArr.length - 1 ? t.active = !1 : t.active = !0
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    CrabNode: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cb81dlzk3hHzI9MCRy8NH1P", "CrabNode");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                particlePool: null,
                firstClickBox: null,
                boxActionTimes: null,
                currentGold: null,
                isTouch: null,
                numCalculate: null,
                fingerNode: null,
                isStopFirstCrab: null
            },
            onDestroy: function() {
                this.isInit = null, this.particlePool = null, this.firstClickBox = null, this.boxActionTimes = null, this.currentGold = null, this.isTouch = null, this.numCalculate = null, this.fingerNode = null, this.isStopFirstCrab = null
            },
            destroyNode: function() {
                this.node.off(cc.Node.EventType.TOUCH_START, this.touchFishBegin.bind(this), this), this.node.off(cc.Node.EventType.TOUCH_END, this.touchFishEnd.bind(this), this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchFishCancel.bind(this), this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isTouch = !1, this.firstClickBox = 0, this.boxActionTimes = new cc.Node, this.currentGold = [0], this.particlePool = new cc.NodePool;
                    for (var e = 0; e < 5; e++) {
                        var t = new cc.Node,
                            i = t.addComponent(cc.ParticleSystem),
                            n = engine.gameMemoryManagement.getParticle(particleAsset.gold_particle_asset);
                        i.file = n, i.resetSystem(), this.particlePool.put(t)
                    }
                    if (this.addParticle(-2e3, -2e3), 0 == heroData.isFirstCrab) this.fingerNode = new cc.Node, this.node.addChild(this.fingerNode, 10), this.fingerNode.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), this.fingerNode.x = 25, "1" == gameConfigData.configureTable.config ? this.fingerNode.y = 22 : this.fingerNode.y = -10, this.fingerNode.runAction(cc.sequence(cc.spawn(cc.moveBy(.5, 30, 30), cc.scaleTo(.5, 1.2)), cc.spawn(cc.moveBy(.5, -30, -30), cc.scaleTo(.5, 1))).repeatForever());
                    this.node.on(cc.Node.EventType.TOUCH_START, this.touchFishBegin.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_END, this.touchFishEnd.bind(this), this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchFishCancel.bind(this), this), this.isInit = !0
                }
            },
            addParticle: function(e, t) {
                var i = this;
                if (this.particlePool.size() > 0) {
                    var n = this.particlePool.get();
                    n.x = e, n.y = t, n.zIndex = 102, this.node.addChild(n), n.getComponent(cc.ParticleSystem).resetSystem(), this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                        i.particlePool.put(n)
                    })))
                }
            },
            getNumFun: function() {
                heroData.shopData.refreshLastFishFun();
                var e = heroData.gamePlayData.baseProductionPer();
                if (!0 === mainSceneContol.mainRightLayerComponent.isSpeedUp) {
                    var t = new n;
                    t.loadSaveData([2]), e.multiplicationNum(t)
                }
                "0" != mainSceneContol.helpGoldLayerComponent.productionPer && (this.currentGold = e.getSaveData()), this.numCalculate = new n, this.numCalculate.loadSaveData(this.currentGold);
                var i = new n;
                gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].crabGold ? i.loadSaveData([gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].crabGold]) : i.loadSaveData([gameConfigData.boxAddGoldRate]), this.numCalculate.multiplicationNum(i)
            },
            stopFirstCrabFun: function() {
                1 == this.isStopFirstCrab && (this.isStopFirstCrab = 2, this.fingerNode.stopAllActions(), this.fingerNode.destroy())
            },
            crabGetReward: function() {
                var e = this;
                "0" != mainSceneContol.helpGoldLayerComponent.productionPer && this.getNumFun();
                var t = new cc.Node,
                    i = t.addComponent("GameArtWord");
                i.fontSpriteAtlas = engine.gameMemoryManagement.getSpriteAtlas(mustLoadImage.publicimg01_plist), i.fontName = "fnttype3", i.styleType = ArtWordStyleType.middle, i.setString("+" + this.numCalculate.getNumText()), this.node.addChild(t), t.scaleX = .1, t.scaleY = .1, t.x = 0, t.y = 80, t.runAction(cc.sequence(cc.scaleTo(.2, 1.6), cc.scaleTo(.2, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                    t.stopAllActions();
                    var i = e.node.convertToNodeSpaceAR(cc.p(mainSceneContol.topUIX, engine.gameAdapterInfo.getPercentageY(.95)));
                    t.runAction(cc.sequence(cc.moveTo(.2, i.x, i.y), cc.callFunc(function() {
                        heroData.gamePlayData.addGold(e.numCalculate), mainSceneContol.helpGoldLayerComponent.refreshGold(), t.destroy()
                    })))
                })));
                var n = new cc.Node;
                n.runAction(cc.sequence(cc.callFunc(function() {
                    e.addParticle(0, 100)
                }), cc.delayTime(.1), cc.callFunc(function() {
                    e.addParticle(0, 100)
                }), cc.delayTime(.1), cc.callFunc(function() {
                    e.addParticle(0, 100)
                }), cc.delayTime(.1), cc.callFunc(function() {
                    e.addParticle(0, 100)
                }), cc.delayTime(.1), cc.callFunc(function() {
                    e.boxActionTimes.stopAllActions(), e.node.crabSpine.loop = !0, e.node.crabSpine.animation = "walk1", n.destroy()
                }))), e.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.node.crabSpine.timeScale = .7
                }), cc.moveTo(2, engine.gameAdapterInfo.getPercentageX(1.3), e.node.PercentageY), cc.callFunc(function() {
                    e.node.active = !1, mainSceneContol.gamePlayLayerComponent.crabMoveFun()
                })))
            },
            touchFishBegin: function() {
                var e = this;
                if (1 == this.isTouch) {
                    if (e.isTouch = !1, e.node.stopAllActions(), 0 == this.firstClickBox) {
                        this.firstClickBox = 1, gameSDK.logEvent("crabClick", 1, {
                            crabClick: "crabClick"
                        });
                        var t = this.node.crabSpine.getComponent(sp.Skeleton);
                        t.loop = !1, t.animation = "walk2", this.boxActionTimes.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                            t.loop = !0, t.animation = "walk3"
                        })))
                    }
                    0 == heroData.isFirstCrab ? (heroData.isFirstCrabFun(), this.isStopFirstCrab = 1, e.stopFirstCrabFun(), e.crabGetReward()) : gameSDK.newCreateInterstitialAd(advCode14, function() {
                        e.crabGetReward()
                    }, function() {
                        e.crabGetReward()
                    })
                }
            },
            touchFishEnd: function() {},
            touchFishCancel: function() {}
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    DoubleRewardLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cfdd7YOFElDaKKcp9gCXJPF", "DoubleRewardLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                numCalculate: null,
                singleReward: null,
                doubleReward: null,
                rewardType: null
            },
            onDestroy: function() {
                this.isInit = null, this.numCalculate = null, this.singleReward = null, this.doubleReward = null, this.rewardType = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").off(cc.Node.EventType.TOUCH_END, this.clickAdvbtnFun, this), this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").on(cc.Node.EventType.TOUCH_END, this.clickAdvbtnFun, this), this.rewardType = 1, e && (this.rewardType = e), this.singleReward = new n, this.singleReward.loadSaveData(this.numCalculate.getSaveData());
                    var t = new n;
                    t.loadSaveData([2]), this.doubleReward = new n, this.doubleReward.loadSaveData(this.numCalculate.getSaveData()), this.doubleReward.multiplicationNum(t), this.node.getChildByName("getnumart").getComponent("GameArtWord").setString("+" + this.doubleReward.getNumText(1)), this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").active = !1, 2 == this.rewardType && (this.node.getChildByName("batchgolds").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "batchdiamonds")), this.node.getChildByName("outlinebgsp").getChildByName("sharedoubledes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "winthegrandprize"), this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg"), this.node.getChildByName("sharedoublebtn").getChildByName("btning").x += 20, this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()), this.isInit = !0
                }
            },
            addSingleReward: function() {
                2 == this.rewardType ? heroData.gamePlayData.addDiamond(this.singleReward) : heroData.gamePlayData.addGold(this.singleReward), mainSceneContol.gamePlayLayerComponent.addRewardParticle(this.rewardType), this.destroyNode()
            },
            addDoubleReward: function() {
                2 == this.rewardType ? heroData.gamePlayData.addDiamond(this.doubleReward) : heroData.gamePlayData.addGold(this.doubleReward), mainSceneContol.gamePlayLayerComponent.addRewardParticle(this.rewardType), this.destroyNode()
            },
            advGetRewardFun: function() {
                var e = this;
                gameSDK.newCreateInterstitialAd(advCode6, function() {
                    e.addDoubleReward()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })
            },
            clickAdvbtnFun: function() {
                this.advGetRewardFun()
            },
            clickClosebtnFun: function() {
                this.addSingleReward()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    Engine: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b6184lKMoNL6Yciw4+ibWlu", "Engine");
        var n = e("GameSound"),
            a = e("GameTime"),
            o = e("GameData"),
            s = e("HttpControl"),
            l = e("GameAdapterInfo"),
            r = e("GameLog"),
            c = e("GameBackgroundLoad"),
            d = e("GameMemoryManagement");
        window.engineGlobal = {
            gameSaveDataKey: "idlefish1010",
            gameFrame: 60,
            playEffectMinTime: 300,
            loadSoundDic: new Object,
            gamelanguage: "english",
            gameWidth: 720,
            gameHeigh: 1280,
            viewGameWidth: 720,
            viewGameHeigh: 1280
        }, window.initEngine = function() {
            null == window.engine && (window.engine = new h, engine.initialize())
        }, window.versionUrl = function(e) {
            return e
        };
        var h = cc.Class({
            properties: {
                isInit: null,
                gameSound: null,
                gameTime: null,
                gameData: null,
                userData: null,
                httpControl: null,
                gameAdapterInfo: null,
                gameBackgroundLoad: null,
                gameMemoryManagement: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.gameSound = new n, this.gameSound.initialize(), this.gameTime = new a, this.gameTime.initialize(), this.gameData = new o, this.gameData.initialize(), this.httpControl = new s, this.httpControl.initialize(), this.gameAdapterInfo = new l, this.gameAdapterInfo.initialize(), this.gameLog = new r, this.gameLog.initialize(), this.gameBackgroundLoad = new c, this.gameBackgroundLoad.initialize(), this.gameMemoryManagement = new d, this.gameMemoryManagement.initialize(), window.ccLog = function(e) {
                    0 == cc.sys.isMobile && console.log(e)
                })
            }
        });
        cc._RF.pop()
    }, {
        GameAdapterInfo: "GameAdapterInfo",
        GameBackgroundLoad: "GameBackgroundLoad",
        GameData: "GameData",
        GameLog: "GameLog",
        GameMemoryManagement: "GameMemoryManagement",
        GameSound: "GameSound",
        GameTime: "GameTime",
        HttpControl: "HttpControl"
    }],
    EvolutionBuildLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ff5bf8HIYVLcInAonGgrxiT", "EvolutionBuildLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                curUnlockID: null,
                consume: null
            },
            onDestroy: function() {
                this.isInit = null, this.curUnlockID = null, this.consume = null
            },
            destroyNode: function() {
                this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickBuildbtnFun, this), this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.curUnlockID = e, this.node.getChildByName("scaleimg1sp").getChildByName("bgimgsp").getChildByName("building" + (e - 1e3) + "sp").active = !0, this.node.getChildByName("scaleimg1sp").getChildByName("desbgsp").getChildByName("profitart").getComponent("GameArtWord").setString("x" + gameConfigData.transformationList[e].value), this.consume = [0], heroData.transformationData[e].unlock < gameConfigData.transformationList[e].consume.length ? this.consume = gameConfigData.transformationList[e].consume[heroData.transformationData[e].unlock] : this.consume = gameConfigData.transformationList[e].consume[gameConfigData.transformationList[e].consume.length - 1];
                    var t = new n;
                    if (t.loadSaveData(this.consume), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").getChildByName("goldnumart").getComponent("GameArtWord").setString(t.getNumText()), guideTurnNoviceLayer) {
                        var i = this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").convertToWorldSpaceAR(cc.v2(0, 0));
                        mainSceneContol.addGuideTurnNoviceFun(i.x, i.y, gameConfigData.transformationConfig.evolNoviceTxt[2], "evolution")
                    }
                    this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickBuildbtnFun, this), this.isInit = !0
                }
            },
            clickBuildbtnFun: function() {
                guideTurnNoviceLayer && (guideTurnNoviceLayer.destroy(), guideTurnNoviceLayer = null, gameConfigData.isUnderwayNovice = !1);
                var e = gameConfigData.transformationList[this.curUnlockID],
                    t = new n;
                if (t.loadSaveData(this.consume), heroData.evolMoney.comparisonSize(t)) {
                    heroData.transformationData[this.curUnlockID].unlock += 1, heroData.transformationProfitFun(e.type), heroData.evolMoney.subNum(t), null != mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent && mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent.refreshUI(), mainSceneContol.mainEvolutionLayerComponent.btnShowFun();
                    var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.evolution_complete_tips_prefab);
                    engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), i.addComponent("EvolutionCompleteLayer").initialize(this.curUnlockID)
                } else {
                    var a = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.evolution_not_tips_prefab);
                    engine.gameAdapterInfo.addSceneNode(a, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex);
                    a.addComponent("EvolutionNotLayer");
                    a.scaleX = 0, a.scaleY = 0, a.runAction(cc.sequence(cc.scaleTo(.2, 1.2, 1.2), cc.scaleTo(.15, .9, .9), cc.scaleTo(.1, 1, 1)))
                }
                this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    EvolutionCompleteLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "40f2dZvCONOm5tqabUrsdNH", "EvolutionCompleteLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
            },
            initialize: function(e) {
                1 != this.isInit && (this.node.getChildByName("buildnode").getChildByName("building" + (e - 1e3) + "sp").active = !0, this.node.getChildByName("profitart").getComponent("GameArtWord").setString("x" + gameConfigData.transformationList[e].value), this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("masknode").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.isInit = !0)
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    EvolutionLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e88cdvZamNK4bEzKis295QU", "EvolutionLayer");
        e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                itemList: null,
                curUnlockID: null,
                isClick: null,
                curUnlockBtn: null
            },
            onDestroy: function() {
                this.isInit = null, this.itemList = null, this.curUnlockID = null, this.isClick = null, this.curUnlockBtn = null
            },
            destroyNode: function() {
                this.node.getChildByName("backbtn").off(cc.Node.EventType.TOUCH_END, this.clickBackbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building1node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building2node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building3node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building4node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building5node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building6node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    for (var e in this.isClick = !0, this.itemList = new Object, gameConfigData.transformationList) {
                        var t = gameConfigData.transformationList[e];
                        if (this.node.getChildByName("evolutionBgsp").getChildByName("building" + (t.id - 1e3) + "node")) {
                            var i = this.node.getChildByName("evolutionBgsp").getChildByName("building" + (t.id - 1e3) + "node");
                            i.data = cloneObjFun(t), this.itemList[i.data.id] = i
                        }
                    }
                    this.curUnlockID = 0, this.refreshUI(), this.node.getChildByName("backbtn").on(cc.Node.EventType.TOUCH_END, this.clickBackbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building1node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building2node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building3node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building4node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building5node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.node.getChildByName("evolutionBgsp").getChildByName("building6node").getChildByName("squarebubblesp").getChildByName("sellimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolbtnFun, this), this.isInit = !0
                }
            },
            refreshUnlockID: function() {
                var e = heroData.getEvolutionIDFun();
                e && (this.curUnlockID = e)
            },
            refreshUI: function() {
                for (var e in this.refreshUnlockID(), this.itemList) {
                    var t = this.itemList[e],
                        i = heroData.transformationData[t.data.id].unlock;
                    t.getChildByName("squarebubblesp").active = !1, i > 0 && t.data.id < this.curUnlockID || 0 == this.curUnlockID ? t.getChildByName("buildingsp").opacity = 255 : (t.getChildByName("buildingsp").opacity = 155, t.data.id == this.curUnlockID && (this.curUnlockBtn = t.getChildByName("squarebubblesp"), t.getChildByName("squarebubblesp").active = !0, t.getChildByName("squarebubblesp").stopAllActions(), t.getChildByName("squarebubblesp").initY ? t.getChildByName("squarebubblesp").y = t.getChildByName("squarebubblesp").initY : t.getChildByName("squarebubblesp").initY = t.getChildByName("squarebubblesp").y, t.getChildByName("squarebubblesp").runAction(cc.sequence(cc.moveBy(1, 0, 15), cc.moveBy(1, 0, -15)).repeatForever())))
                }
                this.node.getChildByName("mianfloorimgsp").getChildByName("profitart").getComponent("GameArtWord").setString("x" + (gameConfigData.transformationProfit.basicGoldProfit - gameConfigData.transformationInitProfit.basicGoldProfit)), this.node.getChildByName("evolfloorsp").getChildByName("evolcountart").getComponent("GameArtWord").setString(heroData.evolMoney.getNumText())
            },
            clickEvolbtnFun: function() {
                if (0 != this.isClick && (guideTurnNoviceLayer && this.refreshUI(), 0 != this.curUnlockID)) {
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.evolution_build_tips_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), e.addComponent("EvolutionBuildLayer").initialize(this.curUnlockID)
                }
            },
            clickBackbtnFun: function() {
                0 != this.isClick && (this.isClick = !1, mainSceneContol.mainEvolutionLayerComponent.layerBackFun())
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    EvolutionNotLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9332dKl/+RFroALjVVEkesC", "EvolutionNotLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickOkbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (null != mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent && (mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent.isClick = !1), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickOkbtnFun, this), this.isInit = !0)
            },
            clickOkbtnFun: function() {
                null != mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent && (mainSceneContol.mainEvolutionLayerComponent.evolutionLayerComponent.isClick = !0), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    FaceBookIAD: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4b37eZjJBpPFZP5NHJibO2F", "FaceBookIAD");
        cc.Class({
            extends: cc.Component,
            properties: {
                ADIDArr: null,
                preLoadArr: [],
                loadedAd: null,
                preLoadRunning: !1,
                retryTime: 3e4,
                retryCount: 0,
                stopRetry: !1,
                stopBeHandle: !1,
                hasRemoveAD: !1,
                isShowTooManyError: !1,
                isInit: null
            },
            initialize: function() {
                ccLog("插屏初始化"), this.ADIDArr = ["2246661838950056_2294013027548270", "2246661838950056_2294012714214968", "2246661838950056_2309285012687738", "2246661838950056_2309284782687761", "2246661838950056_2309279402688299", "2246661838950056_2337933456489560", "2246661838950056_2337933769822862", "2246661838950056_2337933833156189", "2246661838950056_2337933869822852", "2246661838950056_2337933923156180"]
            },
            startPreLoad: function() {
                1 != this.isInit && (this.isInit = !0, this.hasRemoveAD || (setInterval(this.checkHasAd.bind(this), this.retryTime), this.checkHasAd()))
            },
            checkHasAd: function() {
                this.stopBeHandle ? this.stopBeHandle = !1 : null != this.loadedAd || this.stopRetry || this.preLoadAd()
            },
            preLoadAd: function() {
                if (gameSDKName != faceBookSDKTest) {
                    if (!this.preLoadRunning && !this.loadedAd) {
                        this.preLoadRunning = !0, 0 == this.preLoadArr.length && (this.preLoadArr = this.ADIDArr.slice(), this.preLoadArr.sort(function(e, t) {
                            return Math.random() - .5
                        })), Math.random() > .5 ? this.currentShowADID = this.preLoadArr.shift() : this.currentShowADID = this.preLoadArr.pop(), console.log("触发预加载", this.currentShowADID);
                        var e, t = this;
                        FBInstant.getInterstitialAdAsync(t.currentShowADID).then(function(i) {
                            return console.log("ready pre load AD", t.currentShowADID), (e = i).loadAsync()
                        }).then(function() {
                            t.loadedAd = e, t.preLoadRunning = !1
                        }).catch(function(e) {
                            console.log("Rewarded video failed to preload: " + e.message), console.log("code", e.code), "ADS_NO_FILL" == e.code && (console.log("no fill:", t.currentShowADID.slice(-4)), gameSDK.logEvent("AD_PRELOAD_FAIL", 1, {
                                preload_fail: t.currentShowADID.slice(-4)
                            })), "ADS_NO_FILL" == e.code && (t.isShowTooManyError = !0), t.preLoadRunning = !1, t.retryCount++, t.retryCount >= 3 && (t.stopRetry = !0, t.stopBeHandle = !0)
                        })
                    }
                } else ccLog("预加载广告")
            },
            checkNeedSkipIAD: function() {
                return null == this.loadedAd && 1 == this.isShowTooManyError
            },
            showAd: function(e, t, i) {
                if (this.hasRemoveAD) return ccLog("购买了无广告，插屏直接成功"), void(null != e && e());
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        ccLog("播放插屏"), null != e && e();
                        break;
                    case faceBookSDK:
                        var n = this;
                        n.stopRetry = !1, n.loadedAd ? n.loadedAd.showAsync().then(function() {
                            console.log("InterstitialAd广告显示成功"), null != e && e(), n.loadedAd = null, n.stopBeHandle = !0
                        }).catch(function(e) {
                            n.loadedAd = null, console.log("InterstitialAd广告显示失败"), console.log(e.code, e.message), n.stopBeHandle = !0, gameSDK.logEvent("AD_SHOW_FAIL", 1, {
                                AD_SHOW_FAIL: n.currentShowADID.slice(-4)
                            }), null != t && t()
                        }) : (console.log("RewardedVideo广告未加载好"), null != i && i())
                }
            }
        });
        cc._RF.pop()
    }, {}],
    FaceBookSDK: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "03827vRy5NK2ahVWFyDLwug", "FaceBookSDK");
        var n = e("GameCustomImage"),
            a = e("GameSDK"),
            o = e("FaceBookIAD");
        window.sdkPortEm = cc.Enum({
            ios: "IOS",
            android: "ANDROID",
            web: "WEB",
            mobileWeb: "MOBILE_WEB"
        }), window.fbSaveDataKey = "idlefish134";
        cc.Class({
            extends: a,
            properties: {
                interstitialAd: null,
                tryAgainTimes: null,
                fbIAD: null,
                playAD_time: null,
                isAD_Loading: null,
                ADIDArr: null,
                randomADArr: null,
                currentShowADID: null
            },
            initialize: function() {
                this._super(), this.tryAgainTimes = 0, this.playAD_time = 0, this.isAD_Loading = !1, this.ADIDArr = ["2246661838950056_2294013027548270", "2246661838950056_2294012714214968", "2246661838950056_2309285012687738", "2246661838950056_2309284782687761", "2246661838950056_2309279402688299", "2246661838950056_2337933456489560", "2246661838950056_2337933769822862", "2246661838950056_2337933833156189", "2246661838950056_2337933869822852", "2246661838950056_2337933923156180"], this.randomADArr = [], this.currentShowADID = null, this.fbIAD = new o, this.fbIAD.initialize()
            },
            getPlayInfo: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("获取用户登录信息调用:FBInstant.initializeAsync函数"), this.sdkPlayInfo.playerID = facebookPlayerid, ccLog("获取用户登录信息:FBInstant.initializeAsync回调:", this.sdkPlayInfo.id), this.getUserData(e);
                        break;
                    case faceBookSDKTest:
                        createTestPlayer(), this.getUserData(e)
                }
            },
            getUserData: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var t = this;
                        this.logEvent("getDataAsync", 1, {
                            getDataAsync: "getDataAsync"
                        }), FBInstant.player.getDataAsync([fbSaveDataKey]).then(function(i) {
                            t.logEvent("getDataAsyncOK", 1, {
                                getDataAsyncOK: "getDataAsyncOK"
                            }), ccLog("取到FB的数据:"), ccLog(i), null == i[fbSaveDataKey] ? e(null) : e(i[fbSaveDataKey])
                        });
                        break;
                    case faceBookSDKTest:
                        var i = null;
                        try {
                            i = JSON.parse(cc.sys.localStorage.getItem(engineGlobal.gameSaveDataKey))
                        } catch (e) {}
                        ccLog("取到缓存数据:"), ccLog(i), e(null == i ? null : i[fbSaveDataKey])
                }
            },
            saveUserData: function(e, t) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        FBInstant.player.setDataAsync(e).then(function() {
                            null != t && t()
                        })
                }
            },
            startGame: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var t = this;
                        ccLog("获取游戏isFirstStartGame属性，如果true则调用FBInstant.startGameAsync方法" + this.isFirstStartGame), 1 == this.isFirstStartGame ? (this.isFirstStartGame = !1, FBInstant.startGameAsync().then(function() {
                            t.sdkPlayInfo.name = FBInstant.player.getName(), t.sdkPlayInfo.photo = FBInstant.player.getPhoto(), t.sdkPlayInfo.entryPointData = FBInstant.getEntryPointData(), ccLog("FBInstant.startGameAsync回调。玩家 name=" + t.sdkPlayInfo.name + "photo=" + t.sdkPlayInfo.photo), t.sdkPort = FBInstant.getPlatform(), ccLog(t.sdkPort), null != e && e()
                        })) : null != e && (ccLog("callfun"), e());
                        break;
                    case faceBookSDKTest:
                        1 == this.isFirstStartGame ? (this.isFirstStartGame = !1, null != e && e()) : null != e && e()
                }
            },
            getfriendsList: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var t = this;
                        ccLog(" 获取好友列表, 调用FBInstant.player.getConnectedPlayersAsync方法。");
                        FBInstant.player.getConnectedPlayersAsync().then(function(i) {
                            for (var n = 0; n < i.length; n++) {
                                var a = i[n],
                                    o = new Object;
                                o.name = a.getName(), o.playerID = a.getID(), o.photo = a.getPhoto(), t.sdkPlayInfo.friendsList[o.playerID] = o, ccLog(" 获取玩家好友列表:名字" + o.name + "玩家id:" + o.playerID + " 玩家头像：" + o.photo)
                            }
                            ccLog("FBInstant.player.getConnectedPlayersAsync回调处理完毕。"), null != e && e()
                        });
                        break;
                    case faceBookSDKTest:
                        return setFriendsList(), void(null != e && e())
                }
            },
            setLoadingProgress: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        FBInstant.setLoadingProgress(e);
                        break;
                    case faceBookSDKTest:
                }
            },
            sendFaceBookFriend: function(e, t, i) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var a = getSendFriendData();
                        null == i.text && (i.text = a.text), null == i.template && (i.template = a.template), ccLog("调用FBInstant.context.chooseAsync方法"), FBInstant.context.chooseAsync({
                            filters: ["NEW_CONTEXT_ONLY"]
                        }).then(function() {
                            ccLog("调用FBInstant.context.chooseAsync方法回调");
                            var a = new n;
                            a.initialize(i), a.drawCompleteFun = function(n) {
                                ccLog("好友图片加载完成，调用FBInstant.updateAsync方法，邀请好友"), FBInstant.updateAsync({
                                    action: "CUSTOM",
                                    cta: "Play",
                                    template: i.template,
                                    image: n,
                                    text: i.text,
                                    data: i.data,
                                    strategy: "LAST",
                                    notification: "PUSH"
                                }).then(function() {
                                    null != e && (ccLog("邀请好友回调"), e())
                                }).catch(function(e) {
                                    ccLog("邀请好友失败1。"), ccLog(e), null != t && t()
                                })
                            }, gameSDK.logEvent("share_chenggong", 1, {
                                share_chenggong: "share_chenggong"
                            })
                        }).catch(function(e) {
                            ccLog("邀请好友失败2。"), ccLog(e), null != t && t()
                        });
                        break;
                    case faceBookSDKTest:
                        ccLog("邀请好友。"), null != e && e();
                        var o = new n;
                        o.initialize(i), o.drawCompleteFun = function(e) {
                            ccLog(e)
                        }
                }
            },
            shareGame: function(e, t) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        (i = new n).initialize(t), i.drawCompleteFun = function(i) {
                            var n = new Image;
                            n.crossOrigin = "anonymous", n.src = i, n.onload = function() {
                                FBInstant.shareAsync({
                                    intent: "SHARE",
                                    image: i,
                                    text: t.text,
                                    data: t.data
                                }).then(function() {
                                    null != e && e()
                                }).catch(function(e) {
                                    ccLog("分享失败。"), ccLog(e)
                                })
                            }
                        };
                        break;
                    case faceBookSDKTest:
                        var i;
                        null != e && e(), (i = new n).initialize(t), i.drawCompleteFun = function(e) {
                            ccLog(e)
                        }
                }
            },
            showRewardVideoAd: function(e, t) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var i = null;
                        networkingMaskFun(1), FBInstant.getRewardedVideoAsync(e).then(function(e) {
                            return ccLog("RewardedVideo开始加载"), (i = e).loadAsync()
                        }).then(function() {
                            return ccLog("RewardedVideo加载成功回调"), i.showAsync()
                        }).then(function() {
                            ccLog("RewardedVideo广告显示成功"), networkingMaskFun(2), null != t && t()
                        }).catch(function() {
                            networkingMaskFun(2), promptBoxFun(3), createGameSureTitleWindow(), ccLog("RewardedVideo广告显示失败")
                        });
                        break;
                    case faceBookSDKTest:
                        null != t && t()
                }
            },
            appointFaceBookFriend: function(e, t, i) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        ccLog("调用appointFaceBookFriend方法,邀请指定玩家id：" + i.playerID), FBInstant.context.createAsync(i.playerID).then(function() {
                            ccLog("appointFaceBookFriend方法回调"), null == i.data && (i.data = {});
                            var t = new n;
                            t.initialize(i), t.drawCompleteFun = function(t) {
                                ccLog("邀请指定玩家图片加载完成，调用FBInstant.updateAsync方法"), FBInstant.updateAsync({
                                    action: "CUSTOM",
                                    cta: "Play",
                                    template: i.updateAsyncTemplate,
                                    image: t,
                                    text: i.updateAsyncText,
                                    data: i.data,
                                    strategy: "LAST",
                                    notification: "PUSH"
                                }).then(function() {
                                    ccLog("指定好友邀请成功！")
                                }).catch(function(e) {
                                    ccLog("指定邀请好友失败"), ccLog(e)
                                }), null != e && (ccLog("指定好友回调！"), e())
                            }, gameSDK.logEvent("share_chenggong", 1, {
                                share_chenggong: "share_chenggong"
                            })
                        }).catch(function(t) {
                            "SAME_CONTEXT" == t.code && null != e && (ccLog("已经邀请过，直接进对战"), e())
                        });
                        break;
                    case faceBookSDKTest:
                        null != e && e();
                        var a = new n;
                        a.initialize(i), a.drawCompleteFun = function(e) {
                            var t = new Image;
                            t.crossOrigin = "anonymous", t.src = e, t.onload = function() {
                                ccLog(e)
                            }
                        }
                }
            },
            logEvent: function(e, t, i) {
                switch (ccLog("打点" + e), gameSDKName) {
                    case faceBookSDK:
                        FBInstant.logEvent(e, t, i);
                        break;
                    case faceBookSDKTest:
                }
            },
            goToOtherGame: function(e) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        FBInstant.switchGameAsync(e).then(function() {
                            ccLog("跳转其他游戏成功")
                        }).catch(function(e) {
                            null != e && (ccLog("跳转其他游戏失败，失败编码为:"), ccLog(e))
                        });
                        break;
                    case faceBookSDKTest:
                        ccLog("跳转成功。")
                }
            },
            setScoreAsync: function(e, t, i, n) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        FBInstant.getLeaderboardAsync(e).then(function(e) {
                            return ccLog("添加自己排行榜。"), e.setScoreAsync(t, i)
                        }).then(function(e) {
                            if (null != n)
                                if (null != e) {
                                    var t = new Object;
                                    t.playerID = e.getPlayer().getID(), t.photo = e.getPlayer().getPhoto(), t.name = e.getPlayer().getName(), t.score = e.getScore(), t.rank = e.getRank(), t.data = e.getExtraData(), n(e)
                                } else n(e)
                        }).catch(function(e) {
                            ccLog("上传排行失败。"), ccLog(e), null != n && n(null)
                        });
                        break;
                    case faceBookSDKTest:
                        null != n && n()
                }
            },
            getPlayerEntryAsync: function(e, t) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        FBInstant.getLeaderboardAsync(e).then(function(e) {
                            return e.getPlayerEntryAsync()
                        }).then(function(e) {
                            if (ccLog("getPlayerEntryAsync获取自己排行榜成功："), ccLog(e), null != t)
                                if (null != e) {
                                    var i = new Object;
                                    i.playerID = e.getPlayer().getID(), i.photo = e.getPlayer().getPhoto(), i.name = e.getPlayer().getName(), i.score = e.getScore(), i.rank = e.getRank(), i.data = e.getExtraData(), t(i)
                                } else t(e)
                        });
                        break;
                    case faceBookSDKTest:
                        var i = getMyRankData();
                        null != t && t(i)
                }
            },
            getEntriesAsyncInfo: function(e, t, i, n) {
                switch (null == n && (n = []), gameSDKName) {
                    case faceBookSDK:
                        if (t.length <= 0) return void(null != i && i(n));
                        var a = t.shift(),
                            o = this;
                        FBInstant.getLeaderboardAsync(e).then(function(e) {
                            return e.getEntriesAsync(a.count, a.beginNum)
                        }).then(function(a) {
                            ccLog("getEntriesAsync获取世界排行榜成功："), ccLog(a);
                            for (var s = 0; s < a.length; s++) {
                                var l = new Object;
                                l.playerID = a[s].getPlayer().getID(), l.photo = a[s].getPlayer().getPhoto(), l.name = a[s].getPlayer().getName(), l.score = a[s].getScore(), l.rank = a[s].getRank(), l.data = a[s].getExtraData(), n.push(l)
                            }
                            o.getEntriesAsyncInfo(e, t, i, n)
                        });
                        break;
                    case faceBookSDKTest:
                        var s = getLocalRankData(e);
                        null != i && i(s)
                }
            },
            getConnectedPlayerEntriesAsync: function(e, t, i, n) {
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        var a = getLocalRankData(e);
                        null != n && n(a);
                        break;
                    case faceBookSDK:
                        FBInstant.getLeaderboardAsync(e).then(function(e) {
                            return e.getConnectedPlayerEntriesAsync(t, i)
                        }).then(function(e) {
                            ccLog("getEntriesAsync获取好友排行榜成功："), ccLog(e);
                            for (var t = [], i = 0; i < e.length; i++) {
                                var a = new Object;
                                a.playerID = e[i].getPlayer().getID(), a.photo = e[i].getPlayer().getPhoto(), a.name = e[i].getPlayer().getName(), a.score = e[i].getScore(), a.rank = e[i].getRank(), a.data = e[i].getExtraData(), ccLog(a.data), t.push(a)
                            }
                            null != n && n(t)
                        })
                }
            },
            getPlayGamePlayer: function(e, t, i, n) {
                switch (gameSDKName) {
                    case faceBookSDK:
                        var a = (new Date).getTime();
                        this.setScoreAsync(e, a, t, function(t) {
                            var a = t.getRank() - parseInt(i / 2);
                            a <= 0 && (a = 0), FBInstant.getLeaderboardAsync(e).then(function(e) {
                                return e.getEntriesAsync(i, a)
                            }).then(function(e) {
                                ccLog("获取当前玩游戏的玩家");
                                for (var t = [], i = 0; i < e.length; i++) {
                                    var a = new Object;
                                    a.playerID = e[i].getPlayer().getID(), a.photo = e[i].getPlayer().getPhoto(), a.name = e[i].getPlayer().getName(), a.score = e[i].getScore(), a.rank = e[i].getRank(), a.data = e[i].getExtraData(), t.push(a)
                                }
                                ccLog(t), null != n && n(t)
                            })
                        });
                        break;
                    case faceBookSDKTest:
                        t = getLocalRankData(e);
                        null != n && n(t)
                }
            },
            createShortcut: function(e) {
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        ccLog("创建桌面快捷方式。"), null != e && e(null);
                        break;
                    case faceBookSDK:
                        ccLog("创建桌面快捷方式sdk。"), FBInstant.player.getDataAsync(["shortcut"]).then(function(t) {
                            ccLog("获取到的data。", t), null != t && null != t.shortcut && 1 == t.shortcut || FBInstant.canCreateShortcutAsync().then(function(t) {
                                ccLog("........创建值canCreateShortcut：" + t), ccLog(t), t && FBInstant.createShortcutAsync().then(function() {
                                    FBInstant.player.setDataAsync({
                                        shortcut: 1
                                    }).then(function() {}), ccLog("创建成功。"), null != e && e(null)
                                }).catch(function(e) {
                                    ccLog("创建失败。"), ccLog(e)
                                })
                            }).catch(function(e) {
                                ccLog("不可以创建。"), ccLog(e)
                            })
                        }).catch(function(e) {
                            ccLog("获取数据失败。"), ccLog(e)
                        })
                }
            },
            requestInterstitialAd: function(e, t) {
                var i = this;
                this.interstitialAd = null, FBInstant.getInterstitialAdAsync(e).then(function(e) {
                    return ccLog("InterstitialAd开始加载"), i.interstitialAd = e, i.interstitialAd.loadAsync()
                }).then(function() {
                    ccLog("InterstitialAd加载成功回调"), null != t && t()
                }).catch(function(e) {
                    ccLog("InterstitialAd加载失败", e), ccLog(e), networkingMaskFun(2), i.interstitialAd = null
                })
            },
            showInterstitialAd: function(e, t) {
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        null != t && t();
                        break;
                    case faceBookSDK:
                        var i = this;
                        networkingMaskFun(1), null == this.interstitialAd ? this.requestInterstitialAd(e, function() {
                            i.showInterstitialAd(e, t)
                        }) : this.interstitialAd.showAsync().then(function() {
                            ccLog("InterstitialAd广告显示成功"), networkingMaskFun(2), null != t && t(), i.interstitialAd = null
                        }).catch(function(e) {
                            ccLog("InterstitialAd广告显示失败"), ccLog(e), networkingMaskFun(2)
                        })
                }
            },
            newCreateInterstitialAd: function(e, t, i, n) {
                var a = this;
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        null != t && t();
                        break;
                    case faceBookSDK:
                        if (1 == this.isAD_Loading) return void ccLog("正在加载!");
                        var o = engine.gameTime.getLocalTime();
                        if (ccLog("插屏时间" + (o - this.playAD_time)), o - this.playAD_time < 35e3) return void(null != n ? n() : null != t && t());
                        0 == this.randomADArr.length && (this.randomADArr = this.ADIDArr.slice(), this.randomADArr.sort(function(e, t) {
                            return Math.random() - .5
                        })), Math.random() > .5 ? this.currentShowADID = this.randomADArr.shift() : this.currentShowADID = this.randomADArr.pop(), networkingMaskFun(1), this.isAD_Loading = !0;
                        var s = null;
                        FBInstant.getInterstitialAdAsync(a.currentShowADID).then(function(e) {
                            return ccLog("InterstitialAd开始加载"), (s = e).loadAsync()
                        }).then(function() {
                            ccLog("InterstitialAd加载成功回调"), s.showAsync().then(function() {
                                ccLog("InterstitialAd广告显示成功"), networkingMaskFun(2), a.isAD_Loading = !1, a.playAD_time = engine.gameTime.getLocalTime(), null != t && t()
                            }).catch(function(e) {
                                ccLog("InterstitialAd广告显示失败"), ccLog(e), a.isAD_Loading = !1, a.playAD_time = engine.gameTime.getLocalTime(), networkingMaskFun(2), null != i && i()
                            })
                        }).catch(function(e) {
                            ccLog("InterstitialAd加载失败", e), ccLog(e), a.isAD_Loading = !1, a.playAD_time = engine.gameTime.getLocalTime(), networkingMaskFun(2), null != i && i()
                        })
                }
            },
            canSubscribeBotAsync: function(e) {
                var t = this;
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        null != e && e();
                        break;
                    case faceBookSDK:
                        ccLog("调用canSubscribeBotAsync。"), FBInstant.player.canSubscribeBotAsync().then(function(i) {
                            ccLog("调用canSubscribeBotAsync成功。"), ccLog(i), 1 == i ? (t.logEvent("new2_meiyouxuanzedingyue", 1, {
                                new2_meiyouxuanzedingyue: "new2_meiyouxuanzedingyue"
                            }), null != e && e()) : t.logEvent("new2_yijingxuanzedingyue", 1, {
                                new2_yijingxuanzedingyue: "new2_yijingxuanzedingyue"
                            })
                        }).catch(function(i) {
                            ccLog("调用canSubscribeBotAsync失败。"), ccLog(i.message), 1 == isFirstEnterGame ? (t.logEvent("new2_aotuopen_toofast", 1, {
                                new2_aotuopen_toofast: "new2_aotuopen_toofast"
                            }), t.tryAgainTimes++, t.tryAgainTimes < 4 ? setTimeout(function() {
                                t.canSubscribeBotAsync(e)
                            }, 100) : t.logEvent("new2_try3fail", 1, {
                                new2_try3fail: "new2_try3fail"
                            })) : t.logEvent("new2_yijingxuanzedingyue", 1, {
                                new2_yijingxuanzedingyue: "new2_yijingxuanzedingyue"
                            })
                        })
                }
            },
            subscribeBotAsync: function(e, t) {
                var i = this;
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        null != e && e();
                        break;
                    case faceBookSDK:
                        ccLog("调用subscribeBotAsync。"), FBInstant.player.subscribeBotAsync().then(function() {
                            i.logEvent("new2_dingyuedakai", 1, {
                                new2_dingyuedakai: "new2_dingyuedakai"
                            }), ccLog("订阅Bot。"), null != e && e()
                        }).catch(function(e) {
                            i.logEvent("new2_dingyueguanbi", 1, {
                                new2_dingyueguanbi: "new2_dingyueguanbi"
                            }), ccLog("取消订阅Bot。"), null != t && t()
                        })
                }
            },
            sendMessengerRobot: function(e) {
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        null != e && e();
                        break;
                    case faceBookSDK:
                        FBInstant.setSessionData(getBotData())
                }
            },
            getMessengerRobot: function(e) {
                switch (gameSDKName) {
                    case faceBookSDKTest:
                        return null != e && e(null), null;
                    case faceBookSDK:
                        var t = FBInstant.getEntryPointData();
                        return null != e && e(t), t
                }
            },
            isCanPay: function() {
                var e = !0;
                switch (gameSDKName) {
                    case faceBookSDK:
                        e = this.sdkPort != sdkPortEm.ios && cc.sys.os !== cc.sys.OS_IOS;
                        break;
                    case faceBookSDKTest:
                        e = !0
                }
                return e
            }
        });
        cc._RF.pop()
    }, {
        FaceBookIAD: "FaceBookIAD",
        GameCustomImage: "GameCustomImage",
        GameSDK: "GameSDK"
    }],
    FaceBookSaveData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ddf00VG35RF7LkFpw25Ids/", "FaceBookSaveData");
        cc.Class({
            properties: {},
            initialize: function() {
                1 != this.isInit && (this.isInit = !0)
            },
            save: function(e) {
                gameSDK.saveUserData(e)
            }
        });
        cc._RF.pop()
    }, {}],
    FacebookSDKTestData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d092dUNp7lD97h/UUuqr00d", "FacebookSDKTestData"), window.idlefishUsedGoldRank = "idlefishUsedGoldRank", window.advCode1 = "2246661838950056_2263393360610237", window.advCode2 = "2246661838950056_2276604265955813", window.advCode3 = "2246661838950056_2276604565955783", window.advCode4 = "2246661838950056_2280726648876908", window.advCode5 = "2246661838950056_2294013027548270", window.advCode6 = "2246661838950056_2294012714214968", window.advCode7 = "2246661838950056_2309285012687738", window.advCode8 = "2246661838950056_2309284782687761", window.advCode9 = "2246661838950056_2309279402688299", window.advCode10 = "2246661838950056_2337933456489560", window.advCode11 = "2246661838950056_2337933769822862", window.advCode12 = "2246661838950056_2337933833156189", window.advCode13 = "2246661838950056_2337933869822852", window.advCode14 = "2246661838950056_2337933923156180", window.botData = null, window.getBotData = function() {
            return null == botData && (botData = new Object), botData
        }, window.createTestPlayer = function() {
            gameSDK.sdkPlayInfo.playerID = "12342", gameSDK.sdkPlayInfo.name = "ID:" + gameSDK.sdkPlayInfo.playerID, gameSDK.sdkPlayInfo.photo = cc.url.raw("resources/headimg/headimg2.png")
        }, window.setFriendsList = function() {}, window.addLoadingCircle = function() {}, window.removeLoadingCircle = function() {}, window.createGameSureTitleWindow = function() {}, window.getLocalRankData = function() {
            return []
        }, window.getGolRankTestData = function() {
            return [{
                playerID: "1831188487010701",
                photo: "",
                name: "McCauley",
                score: 1165513,
                rank: 1,
                data: ""
            }, {
                playerID: "1831188487010702",
                photo: "",
                name: "Alexandria",
                score: 123456,
                rank: 2,
                data: ""
            }, {
                playerID: "1831188487010703",
                photo: "",
                name: "Fairy",
                score: 123456,
                rank: 3,
                data: ""
            }, {
                playerID: "1831188487010704",
                photo: "",
                name: "Pamela",
                score: 123456,
                rank: 4,
                data: ""
            }, {
                playerID: "1831188487010705",
                photo: "",
                name: "Sammie",
                score: 123456,
                rank: 5,
                data: ""
            }, {
                playerID: "1831188487010706",
                photo: "",
                name: "Teague",
                score: 123456,
                rank: 6,
                data: ""
            }, {
                playerID: "1831188487010707",
                photo: "",
                name: "Callie",
                score: 123456,
                rank: 7,
                data: ""
            }]
        }, window.getMyRankData = function() {
            return {
                playerID: "1831188487010701",
                photo: "../../../https@platform-lookaside.fbsbx.com/platform/instantgames/profile_pic.jpg@igpid=1831188487010701&height=256&width=256&ext=1544943966&hash=AeSbDmWN4UPl_w57",
                name: "Mr Right",
                score: 1165513,
                rank: 1,
                data: ""
            }
        }, window.getSendFriendData = function() {
            var e = new Object;
            return e.text = "Come and play together", e.template = "play_turn", e
        }, cc._RF.pop()
    }, {}],
    FishNode: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7045cB/ysNPOqPED31JqfZx", "FishNode");
        var n = e("NumCalculate"),
            a = e("LoadControl");
        cc.Class({
            extends: cc.Node,
            properties: {
                fishData: null,
                gridMaxX: null,
                gridMaxY: null,
                tileMapLayerData: null,
                fishNode: null,
                fishUpdateSp: null,
                fishSprite: null,
                fishSpineNode: null,
                fishShadow: null,
                state: null,
                fishGoldPrefab: null,
                fishGoldParticle: null,
                fishGoldBarPrefab: null,
                clickSpineNode: null,
                clickSpineSkeleton: null,
                accelerateNode: null,
                accelerateSkeleton: null,
                numCalculate: null,
                skeleton: null,
                lock: null,
                fishSkeletonNode: null,
                isGoldEgg: null
            },
            destroy: function() {
                this._super(), this.fishNode && (0 == cc.sys.isMobile ? this.fishNode.off(cc.Node.EventType.MOUSE_DOWN, this.touchFishBegin.bind(this), this) : this.fishNode.off(cc.Node.EventType.TOUCH_START, this.touchFishBegin.bind(this), this), this.fishNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchFishMove, this), this.fishNode.off(cc.Node.EventType.TOUCH_END, this.touchFishEnd, this), this.fishNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchFishCancel, this)), this.fishSpineNode && this.fishSpineNode.off(cc.Node.EventType.TOUCH_START, this.touchFishSpineBegin, this), this.fishData = null, this.gridMaxX = null, this.gridMaxY = null, this.tileMapLayerData = null, this.fishNode = null, this.fishUpdateSp = null, this.fishSprite = null, this.fishSpineNode = null, this.fishShadow = null, this.state = null, this.fishGoldPrefab = null, this.fishGoldParticle = null, this.fishGoldBarPrefab = null, this.clickSpineNode = null, this.clickSpineSkeleton = null, this.accelerateNode = null, this.accelerateSkeleton = null, this.numCalculate = null, this.skeleton = null, this.lock = null, this.fishSkeletonNode = null, this.isGoldEgg = null
            },
            initialize: function(e) {
                var t = this;
                this.zIndex = 100, this.fishData = e, this.isGoldEgg = !1, this.fishNode = new cc.Node, this.fishNode.setContentSize(170, 160), this.addChild(this.fishNode), this.fishUpdateSp = new cc.Node, this.fishUpdateSp.addComponent(cc.Sprite), this.fishUpdateSp.active = !0, this.fishNode.addChild(this.fishUpdateSp), this.fishSprite = new cc.Node, this.fishSprite.addComponent(cc.Sprite), this.fishSprite.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + this.fishData.icon), this.fishSprite.active = !0, this.fishNode.addChild(this.fishSprite), this.fishSpineNode = new cc.Node, this.fishSpineNode.active = !1, this.fishSpineNode.setContentSize(165, 160), this.addChild(this.fishSpineNode), this.fishSpineSprite = new cc.Node, this.fishSpineSprite.addComponent(cc.Sprite), this.fishSpineSprite.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + this.fishData.icon), this.fishSpineNode.addChild(this.fishSpineSprite), this.fishSkeletonNode = new cc.Node, this.fishSpineNode.addChild(this.fishSkeletonNode);
                var i = 1;
                this.fishData.spineScale && (i = this.fishData.spineScale), this.fishSkeletonNode.scaleX = i, this.fishSkeletonNode.scaleY = i, this.skeleton = {}, this.loadAFish(this.fishData.icon, function() {
                    if (t.fishSpineSprite) {
                        t.fishSpineSprite.destroy(), t.skeleton = t.fishSkeletonNode.addComponent(sp.Skeleton);
                        var e = "spine/" + gameConfigData.configureTable.spine + t.fishData.icon + "/" + gameConfigData.configureTable.spine + t.fishData.icon,
                            i = engine.gameMemoryManagement.getSpine(e);
                        t.skeleton.skeletonData = i, t.skeleton.animation = gameConfigData.configureTable.animation, t.skeleton.timeScale = t.fishData.timeScale, t.skeleton.loop = !1, t.skeleton.setCompleteListener(function() {
                            var e = i._skeletonJson.animations;
                            t.skeleton && (e[gameConfigData.configureTable.animation + 2] && t.skeleton.animation == gameConfigData.configureTable.animation ? t.skeleton.animation = gameConfigData.configureTable.animation + 2 : e[gameConfigData.configureTable.animation + 3] && t.skeleton.animation == gameConfigData.configureTable.animation + 2 ? t.skeleton.animation = gameConfigData.configureTable.animation + 3 : t.skeleton.animation = gameConfigData.configureTable.animation)
                        })
                    }
                }), this.gridMaxX = gameConfigData.gridConfigData.gridMaxX, this.gridMaxY = gameConfigData.gridConfigData.gridMaxY, this.tileMapLayerData = heroData.gamePlayData.tileMapLayerData, this.clickSpineNode = new cc.Node, this.clickSpineNode.active = !1, this.clickSpineNode.x = engine.gameAdapterInfo.getPercentageX(0), this.clickSpineNode.y = engine.gameAdapterInfo.getPercentageY(0), mainSceneContol.mainLayer.addChild(this.clickSpineNode), this.clickSpineNode.zIndex = UIzIndexInfo.UIFingerIndex, this.clickSpineSkeleton = this.clickSpineNode.addComponent(sp.Skeleton);
                var n = engine.gameMemoryManagement.getSpine(mustSpine.click_spine);
                t.clickSpineSkeleton.skeletonData = n, t.clickSpineSkeleton.loop = !1, this.accelerateNode = new cc.Node, this.accelerateNode.scaleX = 1.2, this.accelerateNode.scaleY = 1.2, this.accelerateNode.active = !1, this.fishSpineNode.addChild(this.accelerateNode), this.accelerateSkeleton = this.accelerateNode.addComponent(sp.Skeleton);
                n = engine.gameMemoryManagement.getSpine(mustSpine.accelerate_spine);
                this.accelerateSkeleton.skeletonData = n, this.accelerateSkeleton.animation = "animation", this.accelerateNode.rotation = 180, this.accelerateNode.x = this.x, this.accelerateNode.y = this.y
            },
            addFishTouchListeners: function() {
                0 == cc.sys.isMobile ? this.fishNode.on(cc.Node.EventType.MOUSE_DOWN, this.touchFishBegin.bind(this), this) : this.fishNode.on(cc.Node.EventType.TOUCH_START, this.touchFishBegin.bind(this), this), this.fishNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchFishMove.bind(this), this), this.fishNode.on(cc.Node.EventType.TOUCH_END, this.touchFishEnd.bind(this), this), this.fishNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchFishCancel.bind(this), this), this.fishSpineNode.on(cc.Node.EventType.TOUCH_START, this.touchFishSpineBegin.bind(this), this)
            },
            touchFishSpineBegin: function(e) {
                e.touch.getDelta();
                this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).progress += this.fishData.touchBarSpeed / 100, this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).theProgressValue += this.fishData.touchBarSpeed / 100, this.clickSpineNode.x = this.x, this.clickSpineNode.y = this.y, this.clickSpineNode.active = !0, this.clickSpineSkeleton.setAnimation(0, "click", !1), this.touchMoveFish(e.touch.getLocation().x)
            },
            deleteFishGoldPrefab: function() {
                this.fishGoldPrefab && (this.fishGoldPrefab.stopAllActions(), this.fishGoldPrefab.destroy(), this.fishGoldPrefab = null)
            },
            deleteClickSpineNodePrefab: function() {
                this.clickSpineNode && (this.clickSpineNode.destroy(), this.clickSpineNode = null)
            },
            updateFishGoldParticle: function() {
                this.fishGoldParticle || (this.fishGoldParticle = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.addgold_particle_prefab), this.fishGoldParticle.scaleX = .8, this.fishGoldParticle.scaleY = .8, this.fishGoldParticle.y = 30, this.addChild(this.fishGoldParticle))
            },
            restartFishGoldParticle: function() {
                this.fishGoldParticle && this.fishGoldParticle.getComponent(cc.ParticleSystem).resetSystem()
            },
            updateFishGoldPrefab: function() {
                this.fishGoldPrefab || (this.fishGoldPrefab = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fish_addGold_prefab), this.addChild(this.fishGoldPrefab)), this.numCalculate = new n, this.numCalculate.loadSaveData(this.fishData.addGold);
                var e = new n;
                e.loadSaveData([heroData.goldMul]), this.numCalculate.multiplicationNum(e), this.setGoldFun(this.numCalculate);
                var t = this.numCalculate.getNumText();
                this.fishGoldPrefab.getChildByName("addGoldArt").getComponent("GameArtWord").setString(t)
            },
            setZIndex: function() {},
            playSameFishAnimation: function() {
                this.x, this.y;
                this.stopSameFishAnimation();
                var e = cc.sequence(cc.scaleTo(.15, .95, 1.05), cc.scaleTo(.15, 1.05, .95), cc.delayTime(.6)).repeatForever();
                this.sameAction = e, this.runAction(e)
            },
            stopSameFishAnimation: function() {
                this.sameAction && (this.stopAction(this.sameAction), this.sameAction = null), this.scaleX = 1, this.scaleY = 1
            },
            touchFishBegin: function(e) {
                this.lock || (this.startX = this.x, this.startY = this.y, this.zIndex = 1e3, this.scaleX = 1.08, this.scaleY = 1.08, heroData.gamePlayData.playAllSameFishAnimation(this), "3" != heroData.noviceGuidance && "4" != heroData.noviceGuidance || (gameConfigData.noviceNode.fishShadow && (gameConfigData.noviceNode.fishShadow.stopAllActions(), gameConfigData.noviceNode.fishShadow.destroy(), gameConfigData.noviceNode.fishShadow = null), gameConfigData.noviceNode.fingerNode && (gameConfigData.noviceNode.fingerNode.stopAllActions(), gameConfigData.noviceNode.fingerNode.opacity = 0), gameConfigData.noviceNode.txtNode && (gameConfigData.noviceNode.txtNode.opacity = 0)))
            },
            touchFishCancel: function(e) {
                0 !== this.state || this.lock || (this.x = this.startX, this.y = this.startY, heroData.gamePlayData.stopAllSameFishAnimation(this))
            },
            touchFishMove: function(e) {
                if (0 === this.state && !this.lock) {
                    var t = e.touch.getDelta();
                    this.x += t.x, this.y += t.y, this.checkInRubbish() ? mainSceneContol.recoveryLayerComponent.updateCanState() : mainSceneContol.recoveryLayerComponent.updateCanNotState()
                }
            },
            touchFishEnd: function(e) {
                var t = this;
                if (this.zIndex = 100, this.scaleX = 1, this.scaleY = 1, 0 === this.state && !this.lock) {
                    heroData.gamePlayData.stopAllSameFishAnimation(this);
                    var i = this.tileMapLayerData.getGridPointByScenePoint(this.x, this.y);
                    if (i.x >= 0 && i.x < this.gridMaxX && i.y >= 0 && i.y < this.gridMaxY && (i.x !== this.gridX || i.y !== this.gridY)) {
                        var a = this.tileMapLayerData.getGridInfoByGridPoint(i.x, i.y);
                        if (a)
                            if (1 == a.lock) this.x = this.startX, this.y = this.startY;
                            else if (this.fishData.level == a.fishData.level)
                            if (1 == a.state && a.backFish(), this.fishData.nextFishID && a.fishData.nextFishID) this.lock = !0, a.lock = !0, heroData.gamePlayData.combineFish(this, a), engine.gameSound.playEffect(soundurl.combineFishSound), "3" == heroData.noviceGuidance && (heroData.noviceGuidance = "4", addNoviceLayerFun());
                            else {
                                var o = engine.gameData.dataDic.language;
                                mainSceneContol.gamePlayLayerComponent.popNotice(o[1005].content), this.x = this.startX, this.y = this.startY
                            }
                        else 0 == a.state && (null == heroData.noviceGuidance || heroData.noviceGuidance >= gameConfigData.noviceMaxTimes) ? heroData.gamePlayData.changeFish(this, a) : (this.x = this.startX, this.y = this.startY);
                        else null == heroData.noviceGuidance || heroData.noviceGuidance >= gameConfigData.noviceMaxTimes ? heroData.gamePlayData.chFish(this, i.x, i.y) : (this.x = this.startX, this.y = this.startY)
                    } else if (this.checkInRubbish() && (null == heroData.noviceGuidance || heroData.noviceGuidance >= gameConfigData.noviceMaxTimes)) this.runAction(cc.sequence(cc.spawn(cc.scaleTo(.1, 0, 0), cc.moveTo(.1, mainSceneContol.recoveryLayerComponent.node.x, mainSceneContol.recoveryLayerComponent.node.y)), cc.callFunc(function() {
                        var e = new cc.Node,
                            i = e.addComponent(cc.ParticleSystem),
                            n = engine.gameMemoryManagement.getParticle(particleAsset.bubble_particle_asset);
                        i.file = n, i.resetSystem(), i.autoRemoveOnFinish = !0, e.x = t.x, e.y = t.y, e.zIndex = UIzIndexInfo.UIEffectIndex2, mainSceneContol.mainLayer.addChild(e, UIzIndexInfo.UIEffectIndex2), heroData.gamePlayData.deleteFish(t)
                    })));
                    else if (this.y > engine.gameAdapterInfo.getPercentageY(.4) && "3" != heroData.noviceGuidance) {
                        this.x = 160 + 400 * Math.random(), this.y = 750 + 200 * Math.random(), heroData.gamePlayData.moveFish(this), heroData.shopData.refreshLastFishFun();
                        var s = gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level;
                        if (s >= gameConfigData.transformationConfig.minFishLevel && 1 == heroData.isTransformNovice) {
                            heroData.isTransformNovice = 0, ccLog("蜕变新手引导"), heroData.saveHeroData();
                            var l = new n;
                            l.loadSaveData([50]), heroData.evolMoney.addNum(l);
                            var r = mainSceneContol.mainEvolutionLayerComponent.node.x,
                                c = mainSceneContol.mainEvolutionLayerComponent.node.y;
                            mainSceneContol.addGuideTurnNoviceFun(r, c, gameConfigData.transformationConfig.evolNoviceTxt[0], "evolution"), gameConfigData.isUnderwayNovice = !0
                        } else if (s >= gameConfigData.openFishingLevel && 0 == heroData.usedFishing) {
                            heroData.usedFishing = 1, ccLog("捕鱼新手引导"), heroData.saveHeroData(), guideTurnNoviceLayer && (guideTurnNoviceLayer.destroy(), guideTurnNoviceLayer = null), guideTurnNoviceLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.novice_layer_prefab), engine.gameAdapterInfo.addSceneNode(guideTurnNoviceLayer, engineGlobal.gameWidth / 2, engineGlobal.gameHeigh / 2, UIzIndexInfo.UINovicezIndex);
                            var d = guideTurnNoviceLayer.addComponent("NoviceLayer");
                            d.initialize("fishing"), d.resetLayer(290, 75, "click here"), gameConfigData.isUnderwayNovice = !0
                        }
                    } else this.x = this.startX, this.y = this.startY
                }
            },
            addGold: function() {
                var e = this;
                heroData.gamePlayData.addGold(this.numCalculate);
                var t = 1,
                    i = this.fishData.barSpeed;
                if (!0 === mainSceneContol.mainRightLayerComponent.isSpeedUp && (t = 1.2, i /= 2), i > .5 && (i = .5), i < .3 && (i = .3), !this.fishGoldPrefab.fishGoldPrefabAction) {
                    this.restartFishGoldParticle(), this.fishGoldPrefab.opacity = 255, this.fishGoldPrefab.scaleX = 0, this.fishGoldPrefab.scaleY = 0;
                    var n = cc.sequence(cc.spawn(cc.scaleTo(.2, t), cc.moveBy(.2, cc.p(0, 70))), cc.spawn(cc.scaleTo(i, 1.4 * t), cc.moveBy(i, cc.p(0, 60)), cc.fadeTo(i, 0)), cc.callFunc(function() {
                        e.fishGoldPrefab.x = -55, e.fishGoldPrefab.y = 0, e.fishGoldPrefab.fishGoldPrefabAction = null
                    }));
                    this.fishGoldPrefab.fishGoldPrefabAction = n, this.fishGoldPrefab.runAction(n)
                }
            },
            deleteFish: function() {
                this.deleteFishShadow(), this.deleteClickSpineNodePrefab(), mainSceneContol.recoveryLayerComponent.updateCanNotState(), this.destroy()
            },
            deleteFishShadow: function() {
                this.fishShadow && (this.fishShadow.destroy(), this.fishShadow = null)
            },
            checkInRubbish: function() {
                return this.x > mainSceneContol.recoveryLayerComponent.node.x - 50 && this.x < mainSceneContol.recoveryLayerComponent.node.x + 50 && this.y > mainSceneContol.recoveryLayerComponent.node.y - 50 && this.y < mainSceneContol.recoveryLayerComponent.node.y + 50
            },
            getFishAngle: function(e, t) {
                var i = Math.atan((e.x - t.x) / (e.y - t.y)) / Math.PI * 180;
                return e.y < t.y && (e.x < t.x ? i -= 180 : i += 180), i
            },
            getNewPoint: function(e, t) {
                var i = (e = -1 * e + 90) * Math.PI / 180,
                    n = Math.cos(i) * t,
                    a = Math.sin(i) * t;
                return cc.v2(n, a)
            },
            moveBySpeed: function(e, t, i) {
                var n = Math.abs(e.x - this.x),
                    a = Math.abs(e.y - this.y),
                    o = Math.abs(Math.sqrt(n * n + a * a) / t);
                100 == this.zIndex ? o *= 2 : 200 == this.zIndex && (o *= 1.5), this.runAction(cc.sequence(cc.moveTo(o, e), cc.callFunc(function() {
                    i()
                })))
            },
            startMoveFish: function(e, t) {
                this.fishShadow.getChildByName("zhaohui").active = !0, this.fishSpineNode.active = !0, this.fishSprite.active = !1, this.moveFish(e, t), this.addFishGold(), "4" == heroData.noviceGuidance && (heroData.noviceGuidance = "5", addNoviceLayerFun()), this.initSimulation3d(), this.resetSimulation3d()
            },
            pushStartMoveFish: function(e, t) {
                this.startMoveFish(e, t), this.initSimulation3d(1)
            },
            addFishGold: function() {
                var e = this;
                "1" == gameConfigData.configureTable.config ? (this.updateFishGoldPrefab(), this.updateFishGoldParticle()) : "2" == gameConfigData.configureTable.config && (this.updateGoldEggPrefab(), this.isGoldEgg = !1), this.updateGoldBar(), this.fishGoldBarPrefab.active = !0, this.fishGoldPrefab.opacity = 0, this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).theProgressValue = 0, this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = 0, this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).update = function(t) {
                    var i = e.fishData.barSpeed,
                        n = t / i;
                    !0 === mainSceneContol.mainRightLayerComponent.isSpeedUp ? (e.accelerateNode.active = !0, n *= 2) : e.accelerateNode.active = !1, e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).theProgressValue += n, e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).theProgressValue >= 1 && (e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).theProgressValue = 0, "1" == gameConfigData.configureTable.config ? (e.updateFishGoldPrefab(), e.addGold()) : "2" == gameConfigData.configureTable.config && (e.updateGoldEggPrefab(), e.addGoldEgg()));
                    var a = t / (i < .2 ? .2 : i);
                    1 == mainSceneContol.mainRightLayerComponent.isSpeedUp ? (e.accelerateNode.active = !0, a *= 2) : e.accelerateNode.active = !1, e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).progress += a, e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).progress >= 1 && (e.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = 0)
                }
            },
            updateGoldEggPrefab: function() {
                this.fishGoldPrefab || (this.fishGoldPrefab = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fish_addGold_prefab), mainSceneContol.effectLayer.addChild(this.fishGoldPrefab), this.fishGoldPrefab.getChildByName("eggspine").getComponent(sp.Skeleton).loop = !1, this.fishGoldPrefab.getChildByName("getspine").getComponent(sp.Skeleton).loop = !1, this.fishGoldPrefab.getChildByName("eggspine").getComponent(sp.Skeleton).timeScale = .5, this.fishGoldPrefab.getChildByName("getspine").getComponent(sp.Skeleton).timeScale = .2), this.numCalculate = new n, this.numCalculate.loadSaveData(this.fishData.addGold), this.setGoldFun(this.numCalculate)
            },
            setGoldFun: function(e) {
                if (gameConfigData.transformationProfit.basicGoldProfit > 1) {
                    var t = new n;
                    t.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), this.numCalculate.multiplicationNum(t)
                }
            },
            addGoldEgg: function() {
                var e = this;
                heroData.gamePlayData.addGold(this.numCalculate);
                var t = function(e, t) {
                        switch (arguments.length) {
                            case 1:
                                return parseInt(Math.random() * e + 1, 10);
                            case 2:
                                return parseInt(Math.random() * (t - e + 1) + e, 10);
                            default:
                                return 0
                        }
                    },
                    i = this.x,
                    n = this.y,
                    a = engine.gameAdapterInfo.getPercentageY(.44),
                    o = 30,
                    s = 1,
                    l = mainSceneContol.topUIX - engine.gameAdapterInfo.getPercentageX(.02),
                    r = i + 2 * (o = i < engine.gameAdapterInfo.getPercentageX(.1) || i >= engine.gameAdapterInfo.getPercentageX(.5) && i < engine.gameAdapterInfo.getPercentageX(.9) ? 30 : -30);
                s = r < l ? -1 : 1;
                var c = t(50, 100),
                    d = t(-100, 200),
                    h = t(150, 300) * s,
                    g = [cc.v2(r, n + c), cc.v2(r + h, engine.gameAdapterInfo.getTopY(50) + d), cc.v2(l, engine.gameAdapterInfo.getTopY(50))],
                    u = +(t(3, 8) / 10).toFixed(1);
                if (1 == this.isGoldEgg) {
                    var m = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fish_addGold_prefab);
                    mainSceneContol.effectLayer.addChild(m), m.getChildByName("eggspine").active = !1, m.getChildByName("smlgoldimgsp").active = !0;
                    var f = e.numCalculate.getNumText();
                    m.getChildByName("smlgoldimgsp").getChildByName("addGoldArt").getComponent("GameArtWord").setString(f), m.x = this.x, m.y = this.y, m.runAction(cc.sequence(cc.spawn(cc.scaleTo(.24, 1), cc.moveTo(.24, cc.p(i, a))), cc.callFunc(function() {
                        m.runAction(cc.sequence(cc.moveBy(.1, o, 30), cc.moveBy(.1, o, -30), cc.delayTime(u), cc.callFunc(function() {
                            m.getChildByName("smlgoldimgsp").getChildByName("addGoldArt").active = !1
                        }), cc.spawn(cc.bezierTo(1, g), cc.rotateBy(1, 720)), cc.callFunc(function() {
                            m.destroy()
                        })))
                    })))
                } else {
                    e.fishGoldPrefab.stopAllActions(), e.fishGoldPrefab.getChildByName("smlgoldimgsp").stopAllActions(), e.fishGoldPrefab.getChildByName("eggspine").active = !0, e.fishGoldPrefab.getChildByName("smlgoldimgsp").active = !1, e.fishGoldPrefab.opacity = 255, e.fishGoldPrefab.getChildByName("eggspine").getComponent(sp.Skeleton).animation = "default", e.fishGoldPrefab.getChildByName("eggspine").scaleX = .8, e.fishGoldPrefab.getChildByName("eggspine").scaleY = .8, e.fishGoldPrefab.scaleX = .1, e.fishGoldPrefab.scaleY = .1, e.fishGoldPrefab.x = i, e.fishGoldPrefab.y = n;
                    this.isGoldEgg = !0, e.fishGoldPrefab.runAction(cc.sequence(cc.spawn(cc.scaleTo(.24, 1), cc.moveTo(.24, cc.p(i, a))), cc.callFunc(function() {
                        e.fishGoldPrefab.getChildByName("eggspine").getComponent(sp.Skeleton).animation = "sway"
                    }), cc.delayTime(.6), cc.callFunc(function() {
                        e.fishGoldPrefab.getChildByName("eggspine").getComponent(sp.Skeleton).animation = "open"
                    }), cc.delayTime(.7), cc.callFunc(function() {
                        e.fishGoldPrefab.getChildByName("eggspine").active = !1, e.fishGoldPrefab.getChildByName("smlgoldimgsp").active = !0, e.fishGoldPrefab.getChildByName("smlgoldimgsp").getChildByName("addGoldArt").active = !0;
                        var t = e.numCalculate.getNumText();
                        e.fishGoldPrefab.getChildByName("smlgoldimgsp").getChildByName("addGoldArt").getComponent("GameArtWord").setString(t), e.fishGoldPrefab.runAction(cc.sequence(cc.moveBy(.1, o, 30), cc.moveBy(.1, o, -30), cc.delayTime(u), cc.callFunc(function() {
                            e.fishGoldPrefab.getChildByName("smlgoldimgsp").getChildByName("addGoldArt").active = !1
                        }), cc.spawn(cc.bezierTo(1, g), cc.rotateBy(1, 720 * -s)), cc.callFunc(function() {
                            e.fishGoldPrefab.getChildByName("smlgoldimgsp").active = !1, e.isGoldEgg = !1
                        })))
                    })))
                }
            },
            updateGoldBar: function() {
                this.fishGoldBarPrefab || (this.fishGoldBarPrefab = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.addgoldprogress_prefab), this.fishGoldBarPrefab.y = -50, this.fishGoldBarPrefab.getChildByName("progressBar").getComponent(cc.ProgressBar).update = function() {}, this.fishGoldBarPrefab.getChildByName("progressBar").opacity = 0, this.addChild(this.fishGoldBarPrefab))
            },
            moveFish: function(e, t, i) {
                var n = this;
                this.stopAllActions(), this.fishShadowNode = new cc.Node, this.addChild(this.fishShadowNode), this.fishShadow.on(cc.Node.EventType.TOUCH_START, this.touchShadowFishBegin, this);
                var a = engine.gameAdapterInfo.getPercentageX(1),
                    o = engine.gameAdapterInfo.getPercentageY(1);
                e > a && (e = a), e < 0 && (e = 0), this.x = e, this.y = t;
                var s, l = this.y - .2 * o + .4 * Math.random() * o;
                l >= .85 * o && (l = .85 * o, 300 == this.zIndex ? l = .75 * o : 200 == this.zIndex && (l = .8 * o)), l < .55 * o && (l = .55 * o, 100 == this.zIndex ? l = .65 * o : 200 == this.zIndex && (l = .6 * o)), s = e < 150 ? e + 100 + Math.random() * a : e > 1130 ? e - 100 - Math.random() * a : Math.random() > .5 ? e + 100 + Math.random() * a : e - 100 - Math.random() * a, l < .65 * o ? (s > .7 * a && (s = .7 * a), s < .3 * a && (s = .3 * a)) : l < .8 * o ? (s > .85 * a && (s = .85 * a), s < .15 * a && (s = .15 * a)) : (s > .75 * a && (s = .75 * a), s < .15 * a && (s = .15 * a));
                var r;
                if (t < l ? t - l < -150 && (l = t + 150) : t - l > 150 && (l = t - 150), e < s) {
                    e - s > -100 && (s = e + 100);
                    var c = this.getFishAngle({
                        x: e,
                        y: t
                    }, {
                        x: s,
                        y: l
                    });
                    this.fishSpineNode.scaleX = -1, "fish" != gameConfigData.configureTable.spine || "1011" != this.fishData.fishID && "1008" != this.fishData.fishID ? this.fishSpineNode.rotation = c + 90 : this.fishSpineNode.rotation = 0
                } else {
                    e - s < 100 && (s = e - 100);
                    c = this.getFishAngle({
                        x: e,
                        y: t
                    }, {
                        x: s,
                        y: l
                    });
                    this.fishSpineNode.scaleX = 1, "fish" != gameConfigData.configureTable.spine || "1011" != this.fishData.fishID && "1008" != this.fishData.fishID ? this.fishSpineNode.rotation = c - 90 : this.fishSpineNode.rotation = 0
                }!0 === mainSceneContol.mainRightLayerComponent.isSpeedUp ? (this.skeleton.timeScale = 2 * this.fishData.timeScale, r = 2 * this.fishData.speed) : (this.skeleton.timeScale = this.fishData.timeScale, r = this.fishData.speed), this.moveBySpeed(cc.v2(s, l), r, function() {
                    n.moveFish(n.x, n.y)
                })
            },
            touchMoveFish: function(e) {
                var t, i = this;
                engine.gameAdapterInfo.getPercentageX(1), engine.gameAdapterInfo.getPercentageY(1);
                t = -1 == this.fishSpineNode.scaleX ? this.getNewPoint(this.rotation + 90, 80) : this.getNewPoint(this.rotation - 90, 80), t = -1 == this.fishSpineNode.scaleX ? this.getNewPoint(this.rotation + 90, 70) : this.getNewPoint(this.rotation - 90, 70), this.runAction(cc.sequence(cc.moveBy(.5, t), cc.callFunc(function() {
                    i.moveFish(i.x, i.y, e)
                })))
            },
            stopMoveFish: function() {
                this.fishShadow.off(cc.Node.EventType.TOUCH_START, this.touchShadowFishBegin, this), this.stopAllActions(), this.fishSpineNode.active = !1, this.fishGoldBarPrefab && (this.fishGoldBarPrefab.active = !1), this.fishSprite.active = !0, this.fishSpineNode.scaleX = 1, this.fishSpineNode.rotation = 0
            },
            createShadow: function() {
                this.fishShadow = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fish_shadow_prefab), this.fishShadow.getChildByName("fishSp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + this.fishData.icon), mainSceneContol.gamePlayLayerComponent.addFish(this.fishShadow), this.fishShadow.zIndex = 200, this.fishShadow.x = this.x, this.fishShadow.y = this.y, this.fishShadow.setContentSize(160, 160), this.fishShadow.getChildByName("fishSp").opacity = 60, this.createLvNum(this.fishShadow), this.fishShadow.getChildByName("zhaohui").active = !1
            },
            createLvNum: function(e) {
                this.fishShadow.getChildByName("lvbgimg").getChildByName("lvart").getComponent("GameArtWord").setString(String(this.fishData.level))
            },
            touchShadowFishBegin: function(e) {
                var t = this;
                this.stopAllActions(), this.fishShadow.getChildByName("zhaohui").active = !1, this.runAction(cc.sequence(cc.moveTo(.1, t.fishShadow.x, t.fishShadow.y), cc.callFunc(function() {
                    var e = new cc.Node,
                        i = e.addComponent(cc.ParticleSystem);
                    if (1 == gameConfigData.configureTable.config) {
                        var n = engine.gameMemoryManagement.getParticle(particleAsset.bubble_particle_asset);
                        i.file = n, i.resetSystem(), i.autoRemoveOnFinish = !0
                    }
                    gameConfigData.configureTable.config, e.x = t.fishShadow.x, e.y = t.fishShadow.y, e.zIndex = UIzIndexInfo.UIEffectIndex2, mainSceneContol.mainLayer.addChild(e, UIzIndexInfo.UIEffectIndex2), heroData.gamePlayData.backFish(t), t.zIndex = 100, t.deleteFishGoldPrefab()
                })))
            },
            backFish: function() {
                this.stopAllActions(), this.fishShadow.getChildByName("zhaohui").active = !1, this.x = this.fishShadow.x, this.y = this.fishShadow.y, heroData.gamePlayData.backFish(this), this.zIndex = 100, this.deleteFishGoldPrefab()
            },
            loadAFish: function(e, t) {
                var i = this,
                    n = "spine/" + gameConfigData.configureTable.spine + e + "/" + gameConfigData.configureTable.spine + e;
                if (null == engine.gameMemoryManagement.getSpine(n)) {
                    var o = new a,
                        s = new Object;
                    s.resources = [{
                        url: n,
                        restype: LoadStyleType.spine
                    }], o.initialize(s), o.load(), this.fishUpdateSp.getComponent(cc.Sprite).update = function(e) {
                        null != engine.gameMemoryManagement.getSpine(n) && (t(), i.fishUpdateSp.getComponent(cc.Sprite).update = function(e) {})
                    }
                } else t()
            },
            resetSimulation3d: function() {
                var e = this;
                e.fishSkeletonNode.stopAllActions(), e.fishSkeletonNode.runAction(cc.sequence(cc.delayTime(8 + 10 * Math.random()), cc.callFunc(function() {
                    if (1 == e.state) {
                        var t, i, n, a, o = parseInt(1 + 4 * Math.random());
                        1 == o || 2 == o ? (t = 255, i = 1, a = 300, n = -50) : 3 == o ? (t = 235, i = .87, a = 200, n = -40) : 4 == o && (t = 220, i = .82, a = 100, n = -30), e.fishGoldBarPrefab.runAction(cc.spawn(cc.moveTo(6, 0, n), cc.scaleTo(6, i, i))), e.fishSkeletonNode.runAction(cc.spawn(cc.tintTo(6, t, t, 255, 100), cc.scaleTo(6, i * e.fishData.spineScale, i * e.fishData.spineScale)));
                        var s = parseInt((a - e.zIndex) / 6);
                        e.fishSkeletonNode.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex += s
                        }), cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex += s
                        }), cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex += s
                        }), cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex += s
                        }), cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex += s
                        }), cc.delayTime(1), cc.callFunc(function() {
                            e.zIndex = a, e.moveFish(e.x, e.y)
                        })))
                    }
                })).repeatForever())
            },
            initSimulation3d: function(e) {
                var t, i, n, a, o;
                (this.updateGoldBar(), 1 == this.state && this.fishGoldBarPrefab) && (1 == (t = e || parseInt(1 + 4 * Math.random())) || 2 == t ? (i = 255, n = 1, o = 300, a = -50) : 3 == t ? (i = 235, n = .87, o = 200, a = -40) : 4 == t && (i = 220, n = .82, o = 100, a = -30), this.fishGoldBarPrefab.y = a, this.fishGoldBarPrefab.scaleX = n, this.fishGoldBarPrefab.scaleY = n, this.fishSkeletonNode.color = cc.color(i, i, 255), this.fishSkeletonNode.opacity = 255, this.fishSkeletonNode.scaleX = n * this.fishData.spineScale, this.fishSkeletonNode.scaleY = n * this.fishData.spineScale, this.zIndex = o, this.moveFish(this.x, this.y))
            }
        });
        cc._RF.pop()
    }, {
        LoadControl: "LoadControl",
        NumCalculate: "NumCalculate"
    }],
    FishVariationLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "dedffA7R5RIBrCfCWjdXnJd", "FishVariationLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                fishID: null,
                betterFishID: null,
                callFun: null
            },
            onDestroy: function() {
                this.isInit = null, this.fishID = null, this.betterFishID = null, this.callFun = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("mutationbtn").off(cc.Node.EventType.TOUCH_END, this.clickMutationbtnFun, this), this.node.destroy()
            },
            onLoad: function() {},
            initialize: function(e, t) {
                if (1 != this.isInit) {
                    this.isInit = !0, this.fishID = e, this.callFun = t;
                    for (var i = this.fishID, n = gameConfigData.variationAddLv; n > 0;) {
                        var a = gameConfigData.fishConfig[i].nextFishID;
                        null == gameConfigData.fishConfig[i] ? n = 0 : (i = a, n--)
                    }
                    this.betterFishID = i;
                    var o = gameConfigData.fishConfig[this.fishID],
                        s = gameConfigData.fishConfig[this.betterFishID];
                    this.node.getChildByName("smlfishsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + o.icon.toString()), this.node.getChildByName("bigfishsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + s.icon.toString()), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("mutationbtn").on(cc.Node.EventType.TOUCH_END, this.clickMutationbtnFun, this)
                }
            },
            clickMutationbtnFun: function() {
                null != this.callFun && this.callFun(this.betterFishID), this.destroyNode()
            },
            clickClosebtnFun: function() {
                null != this.callFun && this.callFun(this.fishID), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    FishingLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "60448Ra4SpCGLcVUSU59PrK", "FishingLayer");
        var n = e("NumCalculate"),
            a = e("FishingNode");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isInitData: null,
                userData: null,
                bulletList: [],
                fishList: [],
                maxFishID: null,
                shotMaxTimes: null,
                shotGold: null,
                shotProfitLayer: null,
                shotFishMask: null,
                turntableLayer: null,
                updateTimes: null,
                upuiComponent: null,
                bulletSpeed: null,
                fishingUpLayer: null,
                isStartGame: null
            },
            onDestroy: function() {
                this.isInit = null, this.isInitData = null, this.userData = null, this.bulletList = null, this.fishList = null, this.maxFishID = null, this.shotMaxTimes = null, this.shotGold = null, this.shotProfitLayer = null, this.shotFishMask = null, this.turntableLayer = null, this.updateTimes = null, this.upuiComponent = null, this.bulletSpeed = null, this.fishingUpLayer = null, this.isStartGame = null
            },
            destroyNode: function() {
                this.node.off(cc.Node.EventType.TOUCH_START, this.touchBgBegin.bind(this), this), null != this.shotFishMask && this.shotFishMask.destroy(), this.upuiComponent.destroyNode(), this.node.destroy()
            },
            initialize: function(e, t) {
                1 != this.isInit && (this.turntableLayer = e, this.bulletList = [], this.fishList = [], this.isStartGame = !1, this.updateTimes = 0, this.bulletSpeed = 1e3, this.shotGold = new n, this.shotGold.loadSaveData([0]), this.node.getChildByName("batteryimgsp").zIndex = 10, this.node.getChildByName("batteryimgsp").getChildByName("cannonskeleton").getComponent(sp.Skeleton).timeScale = .7, this.shotMaxTimes = gameConfigData.shotMaxTimes, this.refreshShotTimesFun(), this.fishingUpLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fishing_upui_prefab), this.fishingUpLayer.y = 557, this.upuiComponent = this.fishingUpLayer.addComponent("FishingUpBg"), this.upuiComponent.initialize(t), this.node.addChild(this.fishingUpLayer, 11), guideTurnNoviceLayer && (guideTurnNoviceLayer.destroy(), guideTurnNoviceLayer = null, this.showFinger(), gameConfigData.isUnderwayNovice = !1), this.isInit = !0)
            },
            initData: function(e) {
                1 != this.isInitData && (this.upuiComponent.initData(e), this.userData = e, e && e.data && e.data.lastFishID ? this.maxFishID = e.data.lastFishID : this.maxFishID = "1015", this.createFishFun(), this.startFishingFun(), heroData.shopData.refreshLastFishFun(), this.isInitData = !0)
            },
            refreshLayerFun: function(e, t) {
                this.turntableLayer.getComponent("TurntableLayer").createShotFishFun(e, t), this.destroyNode()
            },
            closeUILayerFun: function() {
                this.fishingUpLayer.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = !1, this.fishingUpLayer.getChildByName("fishingUi1sp").getChildByName("friends3btn").active = !0, this.fishingUpLayer.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = !1, this.fishingUpLayer.getChildByName("fishingUi1sp").getChildByName("revenge3btn").active = !0
            },
            shotFishMaskFun: function(e) {
                e && 1 == e ? null == this.shotFishMask ? (this.shotFishMask = new cc.Node, this.shotFishMask.width = engine.gameAdapterInfo.getPercentageX(1), this.shotFishMask.height = engine.gameAdapterInfo.getPercentageY(1), engine.gameAdapterInfo.addSceneNode(this.shotFishMask, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), this.shotFishMask.addComponent(cc.BlockInputEvents)) : this.shotFishMask.active = !0 : e && 2 == e && null != this.shotFishMask && (this.shotFishMask.active = !1)
            },
            randomNum: function(e, t) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * e + 1, 10);
                    case 2:
                        return parseInt(Math.random() * (t - e + 1) + e, 10);
                    default:
                        return 0
                }
            },
            createFishFun: function() {
                for (var e = engine.gameAdapterInfo.getPercentageX(1), t = engine.gameAdapterInfo.getPercentageY(1), i = engine.gameAdapterInfo.getPercentageX(1) / 2, n = engine.gameAdapterInfo.getPercentageY(1) / 2, o = this.randomNum(gameConfigData.shotFishNum[0], gameConfigData.shotFishNum[1]), s = 0; s < o; s++) {
                    var l = "1001";
                    if (0 == s) l = this.maxFishID;
                    else {
                        var r = parseInt(this.maxFishID) - 1e3,
                            c = this.randomNum(1, r);
                        l = String(c + 1e3)
                    }
                    var d = Math.random() * e - i,
                        h = Math.random() * t - n;
                    d > .9 * i ? d = .9 * i : d < -.9 * i && (d = -.9 * i), h > .6 * n ? h = .6 * n : h < .1 * -n && (h = .1 * -n);
                    var g = new a;
                    this.node.addChild(g), this.fishList.push(g), g.initialize(l, d, h)
                }
            },
            showFinger: function() {
                var e = new cc.Node;
                e.y = 200, this.node.addChild(e, 10), e.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), e.runAction(cc.sequence(cc.spawn(cc.moveBy(.5, 20, 20), cc.scaleTo(.5, 1.2)), cc.spawn(cc.moveBy(.5, -20, -20), cc.scaleTo(.5, 1)), cc.spawn(cc.moveBy(.5, 20, 20), cc.scaleTo(.5, 1.2)), cc.spawn(cc.moveBy(.5, -20, -20), cc.scaleTo(.5, 1)), cc.callFunc(function() {
                    e.destroy()
                })))
            },
            refreshShotTimesFun: function() {
                this.node.getChildByName("batteryimgsp").getChildByName("shotTimestxt").getComponent("GameArtWord").setString(this.shotMaxTimes.toString()), this.shotMaxTimes <= 0 && (this.node.getChildByName("batteryimgsp").getChildByName("cannonskeleton").getComponent(sp.Skeleton).animation = "fire")
            },
            startFishingFun: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, this.touchBgBegin.bind(this), this)
            },
            touchBgBegin: function(e) {
                var t = this.node.getChildByName("batteryimgsp"),
                    i = this.getAngle({
                        x: t.x,
                        y: t.y
                    }, {
                        x: e.touch.getLocation().x - 360,
                        y: e.touch.getLocation().y - 640
                    }) + 180;
                i >= 65 && i < 180 ? i = 65 : i >= 180 && i < 295 && (i = 295), t.rotation = i, this.shotMaxTimes > 0 && (this.node.getChildByName("batteryimgsp").getChildByName("cannonskeleton").getComponent(sp.Skeleton).animation = "fill", this.shot(i))
            },
            shot: function(e) {
                this.shotMaxTimes -= 1, 0 == this.isStartGame && (this.closeUILayerFun(), this.isStartGame = !0), this.refreshShotTimesFun();
                var t = this.node.getChildByName("batteryimgsp"),
                    i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fishing_shell_prefab);
                i.rotation = e, this.bulletList.push(i), this.node.addChild(i), i.x = t.x, i.y = t.y, i.type = 1, i.netCom = !1, i.rebound = 0;
                var n = this.getNewPoint({
                    x: i.x,
                    y: i.y
                }, i.rotation, 2e3);
                this.moveBySpeed(i, n, this.bulletSpeed, function() {})
            },
            getAngle: function(e, t) {
                var i = Math.atan((e.x - t.x) / (e.y - t.y)) / Math.PI * 180;
                return e.y < t.y && (e.x < t.x ? i -= 180 : i += 180), i
            },
            getNewPoint: function(e, t, i) {
                var n = (t = -1 * t + 90) * Math.PI / 180,
                    a = Math.cos(n) * i,
                    o = Math.sin(n) * i;
                return cc.p(e.x + a, e.y + o)
            },
            backMainLayerFun: function() {
                this.shotFishMaskFun(1), mainSceneContol.mainLayer.active = !0, mainSceneContol.bgLayer.active = !0, this.turntableLayer.destroy(), this.destroyNode()
            },
            update: function() {
                if (1 == this.isInit && 1 == this.isInitData) {
                    var e = this;
                    if (this.updateTimes += 1, this.updateTimes >= 6)
                        if (this.updateTimes = 0, 0 == this.fishList.length || this.shotMaxTimes <= 0 && 0 == this.bulletList.length) {
                            if (null == this.shotProfitLayer) {
                                this.isInitData = !1;
                                var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revengeend_prefab);
                                engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), t.addComponent("ShotProfitLayer").initialize(this.userData, this.shotGold, function() {
                                    e.backMainLayerFun()
                                })
                            }
                        } else {
                            for (var i = !1, a = 0; a < this.bulletList.length; a++)(function(t) {
                                var a = e.bulletList[t],
                                    o = 100;
                                if (0 == a.rebound && (o = 0), a.y >= 440 || a.y < -640 || a.x < -360 - o || a.x > 360 + o)
                                    if (a.stopAllActions(), 0 == a.rebound) {
                                        a.y < -640 ? (e.bulletList[t] = null, a.destroy(), i = !0) : a.y > 440 ? (a.rotation > 0 && a.rotation < 90 ? a.rotation = 180 - a.rotation : a.rotation > 270 && a.rotation < 360 && (a.rotation = 360 - a.rotation + 180), a.y = 439) : a.x < -330 ? (a.rotation = 360 - a.rotation, a.x = -330) : a.x > 330 && (a.rotation = 360 - a.rotation, a.x = 330);
                                        var s = e.getNewPoint({
                                            x: a.x,
                                            y: a.y
                                        }, a.rotation, 2e3);
                                        e.moveBySpeed(a, s, e.bulletSpeed, function() {})
                                    } else e.bulletList[t] = null, a.destroy(), i = !0;
                                else {
                                    for (var l = !1, r = 0; r < e.fishList.length; r++) {
                                        if (2 == a.type && 1 == a.netCom) {
                                            a.stopAllActions(), e.bulletList[t] = null, a.destroy(), i = !0;
                                            break
                                        }
                                        if (1 == e.checkCol(a, e.fishList[r], gameConfigData.shotFishConfig[e.fishList[r].fishData.fishID].shotFishScale)) {
                                            var c = e.fishList[r],
                                                d = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.addgold_particle_prefab);
                                            d.scaleX = .4, d.scaleY = .4, d.x = c.x, d.y = c.y, e.node.addChild(d), d.getComponent(cc.ParticleSystem).autoRemoveOnFinish = !0;
                                            var h = new n;
                                            if (h.loadSaveData(gameConfigData.shotFishConfig[heroData.shopData.lastBuyFishID].shotFishGold), gameConfigData.transformationProfit.basicGoldProfit > 1) {
                                                var g = new n;
                                                g.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), h.multiplicationNum(g)
                                            }
                                            e.shotGold.addNum(h),
                                                function(t, i, n) {
                                                    var a = new cc.Node,
                                                        o = a.addComponent("GameArtWord");
                                                    o.fontSpriteAtlas = engine.gameMemoryManagement.getSpriteAtlas(mustLoadImage.publicimg01_plist), o.fontName = "fnttype3", o.styleType = ArtWordStyleType.middle, o.setString(n), e.node.addChild(a), a.scaleX = .1, a.scaleY = .1, a.x = t, a.y = i + 25, a.runAction(cc.sequence(cc.scaleTo(.2, 1.6), cc.scaleTo(.15, 1.4), cc.scaleTo(.1, 1.5), cc.delayTime(.1), cc.callFunc(function() {
                                                        a.stopAllActions(), a.destroy()
                                                    })))
                                                }(c.x, c.y, h.getNumText(1)), e.fishList[r] = null, c.destroy(), l = !0, 1 == a.type && (a.stopAllActions(), a.getChildByName("bulletimgsp").active = !1, a.getChildByName("webskeleton").active = !0, a.runAction(cc.sequence(cc.scaleTo(.5, 2, 2), cc.callFunc(function() {
                                                    a.netCom = !0
                                                }))), a.type = 2)
                                        }
                                    }
                                    if (1 == l)
                                        for (var u = [], m = 0, f = 0; f < e.fishList.length; f++)
                                            if (null != e.fishList[f] ? u.push(e.fishList[f]) : m += 1, f >= e.fishList.length - 1) {
                                                e.fishList = u;
                                                for (var p = 0; p < m; p++) e.createAddedFishFun()
                                            }
                                }
                            })(a);
                            if (1 == i)
                                for (var o = [], s = 0; s < this.bulletList.length; s++) null != this.bulletList[s] && o.push(this.bulletList[s]), s >= this.bulletList.length - 1 && (this.bulletList = o)
                        }
                }
            },
            createAddedFishFun: function() {
                var e = this.randomNum(engine.gameAdapterInfo.getPercentageY(-.05), engine.gameAdapterInfo.getPercentageY(.3)),
                    t = parseInt(this.maxFishID) - 1e3,
                    i = this.randomNum(1, t),
                    n = String(i + 1e3),
                    o = new a;
                this.node.addChild(o), this.fishList.push(o), o.initialize(n, engine.gameAdapterInfo.getPercentageX(.6 * (Math.random() > .5 ? -1 : 1)), e)
            },
            checkCol: function(e, t, i) {
                var n = Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y)),
                    a = 50;
                i && (a = i);
                var o = 30,
                    s = 45 * e.scaleX;
                return s > o && (o = s), n < o + .7 * a
            },
            showRevengeList: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revenge_prefab);
                this.node.addChild(e, 100);
                e.addComponent("TurntableRevengeLayer")
            },
            showFriendList: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revenge_prefab);
                this.node.addChild(e, 100);
                e.addComponent("TurntableFriendLayer")
            },
            moveBySpeed: function(e, t, i, n) {
                var a = Math.abs(t.x - e.x),
                    o = Math.abs(t.y - e.y),
                    s = Math.abs(Math.sqrt(a * a + o * o) / i);
                e.runAction(cc.sequence(cc.moveTo(s, t), cc.callFunc(function() {
                    n()
                })))
            }
        }), cc._RF.pop()
    }, {
        FishingNode: "FishingNode",
        NumCalculate: "NumCalculate"
    }],
    FishingNode: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aec04fLZp1GB4RK+o3fO3eT", "FishingNode");
        cc.Class({
            extends: cc.Node,
            properties: {
                fishData: null,
                fishSpineNode: null,
                fishSpineSprite: null,
                fishSkeletonNode: null,
                skeleton: null
            },
            destroy: function() {
                this._super(), this.fishData = null, this.fishSpineNode = null, this.fishSpineSprite = null, this.fishSkeletonNode = null, this.skeleton = null
            },
            initialize: function(e, t, i) {
                this.fishData = e ? gameConfigData.fishConfig[e] : gameConfigData.fishConfig[1001], this.createFishFun(), this.startMoveFish(t, i)
            },
            deleteFish: function() {
                this.destroy()
            },
            getFishAngle: function(e, t) {
                var i = Math.atan((e.x - t.x) / (e.y - t.y)) / Math.PI * 180;
                return e.y < t.y && (e.x < t.x ? i -= 180 : i += 180), i
            },
            createFishFun: function() {
                var e = this;
                this.fishSpineNode = new cc.Node, this.fishSpineNode.setContentSize(165, 160), this.addChild(this.fishSpineNode), this.fishSpineSprite = new cc.Node, this.fishSpineSprite.addComponent(cc.Sprite), this.fishSpineSprite.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + this.fishData.icon), this.fishSpineNode.addChild(this.fishSpineSprite), this.fishSkeletonNode = new cc.Node, this.fishSpineNode.addChild(this.fishSkeletonNode);
                var t = 1;
                this.fishData.spineScale && (t = this.fishData.spineScale), this.fishSkeletonNode.scaleX = t, this.fishSkeletonNode.scaleY = t;
                var i = "spine/" + gameConfigData.configureTable.spine + e.fishData.icon + "/" + gameConfigData.configureTable.spine + e.fishData.icon;
                mainSceneContol.loadRes([{
                    url: i,
                    restype: LoadStyleType.spine
                }], function() {
                    if (e.fishSpineSprite) {
                        e.fishSpineSprite.destroy(), e.skeleton = e.fishSkeletonNode.addComponent(sp.Skeleton);
                        var t = i,
                            n = engine.gameMemoryManagement.getSpine(t);
                        e.skeleton.skeletonData = n, e.skeleton.animation = gameConfigData.configureTable.animation, e.skeleton.timeScale = e.fishData.timeScale, e.skeleton.loop = !1, e.skeleton.setCompleteListener(function() {
                            var t = n._skeletonJson.animations;
                            e.skeleton && (t[gameConfigData.configureTable.animation + 2] && e.skeleton.animation == gameConfigData.configureTable.animation ? e.skeleton.animation = gameConfigData.configureTable.animation + 2 : t[gameConfigData.configureTable.animation + 3] && e.skeleton.animation == gameConfigData.configureTable.animation + 2 ? e.skeleton.animation = gameConfigData.configureTable.animation + 3 : e.skeleton.animation = gameConfigData.configureTable.animation)
                        })
                    }
                })
            },
            startMoveFish: function(e, t) {
                this.moveFish(e, t)
            },
            moveBySpeed: function(e, t, i) {
                var n = Math.abs(e.x - this.x),
                    a = Math.abs(e.y - this.y),
                    o = Math.abs(Math.sqrt(n * n + a * a) / t);
                this.runAction(cc.sequence(cc.moveTo(o, e), cc.callFunc(function() {
                    i()
                })))
            },
            moveFish: function(e, t) {
                var i = this;
                this.stopAllActions();
                var n = engine.gameAdapterInfo.getPercentageX(1),
                    a = engine.gameAdapterInfo.getPercentageY(1),
                    o = engine.gameAdapterInfo.getPercentageX(1) / 2,
                    s = engine.gameAdapterInfo.getPercentageY(1) / 2;
                this.x = e, this.y = t;
                var l, r, c = this.y - .2 * a + .4 * Math.random() * a;
                if (c > .6 * s && (c = .6 * s), c < -.1 * s && (c = -.1 * s), (l = e < 150 - o ? e + 100 + Math.random() * n : e > o - 150 ? e - 100 - Math.random() * n : Math.random() > .5 ? e + 100 + Math.random() * n : e - 100 - Math.random() * n) > .9 * o && (l = .9 * o), l < -.9 * o && (l = -.9 * o), e < l) {
                    var d = this.getFishAngle({
                        x: e,
                        y: t
                    }, {
                        x: l,
                        y: c
                    });
                    null != this.fishSpineNode && (this.fishSpineNode.scaleX = -1), "fish" != gameConfigData.configureTable.spine || !this.fishData || "1011" != this.fishData.fishID && "1008" != this.fishData.fishID ? this.fishSpineNode.rotation = d + 90 : this.fishSpineNode.rotation = 0
                } else {
                    d = this.getFishAngle({
                        x: e,
                        y: t
                    }, {
                        x: l,
                        y: c
                    });
                    null != this.fishSpineNode && (this.fishSpineNode.scaleX = 1), "fish" != gameConfigData.configureTable.spine || "1011" != this.fishData.fishID && "1008" != this.fishData.fishID ? this.fishSpineNode.rotation = d - 90 : this.fishSpineNode.rotation = 0
                }
                null != this.skeleton && (this.skeleton.timeScale = this.fishData.timeScale), r = this.fishData.speed, this.moveBySpeed(cc.v2(l, c), r, function() {
                    i.moveFish(i.x, i.y)
                })
            }
        });
        cc._RF.pop()
    }, {}],
    FishingUpBg: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "98652xpHJZIcoX9vGnDgVfg", "FishingUpBg");
        var n = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                revengeLayerComponent: null,
                friendLayerComponent: null,
                revengeLayer: null,
                friendLayer: null,
                photo: null
            },
            onDestroy: function() {
                this.isInit = null, this.revengeLayerComponent = null, this.friendLayerComponent = null, this.revengeLayer = null, this.friendLayer = null, this.photo = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function(e) {
                1 != this.isInit && (this.node.getChildByName("fishingUi1sp").getChildByName("revengebtn").on(cc.Node.EventType.TOUCH_START, this.showRevengeList, this), this.node.getChildByName("fishingUi1sp").getChildByName("friendsbtn").on(cc.Node.EventType.TOUCH_START, this.showFriendList, this), 0 == e && (this.node.getChildByName("fishingUi1sp").getChildByName("friends3btn").active = !0, this.node.getChildByName("fishingUi1sp").getChildByName("revenge3btn").active = !0, this.node.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("friends2btn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("revenge2btn").active = !1), this.node.y += 200, this.node.runAction(cc.sequence(cc.moveBy(.4, 0, -210), cc.moveBy(.1, 0, 10), cc.callFunc(function() {}))), this.isInit = !0);

                if(gameSDKName == faceBookSDKTest){
                    this.node.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = false;
                    this.node.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = false;
                    this.node.getChildByName("fishingUi1sp").getChildByName("friends2btn").active = false;
                    this.node.getChildByName("fishingUi1sp").getChildByName("revenge2btn").active = false;
                    this.node.getChildByName("fishingUi1sp").getChildByName("friends3btn").active = false;
                    this.node.getChildByName("fishingUi1sp").getChildByName("revenge3btn").active = false;
                }
            },
            initData: function(e) {
                this.photo = new n, this.photo.loadImage(e.photo, null, 105, 105), this.node.getChildByName("fishingUi1sp").getChildByName("playericonnode").addChild(this.photo), this.node.getChildByName("fishingUi1sp").getChildByName("nametxt").getComponent(cc.Label).string = e.name
            },
            showRevengeList: function(e) {
                this.revengeLayer ? this.revengeLayer.active = !0 : (this.revengeLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revenge_prefab), this.revengeLayerComponent = this.revengeLayer.addComponent("TurntableRevengeLayer"), this.revengeLayerComponent.initialize("revenge"), this.node.addChild(this.revengeLayer, -1)), this.friendLayer && (this.friendLayer.y = 1100, this.friendLayer.active = !1), this.revengeLayer.y = -640, this.revengeLayer.getChildByName("rankbgsp").runAction(cc.moveTo(.1, 0, 150)), this.node.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("revenge2btn").active = !0, this.node.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = !0, this.node.getChildByName("fishingUi1sp").getChildByName("friends2btn").active = !1
            },
            showFriendList: function(e) {
                this.friendLayer ? this.friendLayer.active = !0 : (this.friendLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revenge_prefab), this.friendLayerComponent = this.friendLayer.addComponent("TurntableRevengeLayer"), this.friendLayerComponent.initialize("friends"), this.node.addChild(this.friendLayer, -1)), this.revengeLayer && (this.revengeLayer.y = 1100, this.revengeLayer.active = !1), this.friendLayer.y = -640, this.friendLayer.getChildByName("rankbgsp").runAction(cc.moveTo(.1, 0, 150)), this.node.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = !0, this.node.getChildByName("fishingUi1sp").getChildByName("revenge2btn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = !1, this.node.getChildByName("fishingUi1sp").getChildByName("friends2btn").active = !0
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage"
    }],
    FreegoldLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "596f4lViBlODYT3XcjbonRA", "FreegoldLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                freeGoldNum: null,
                numCalculate: null,
                watchType: null,
                isButton: null,
                rewardWayType: ""
            },
            onDestroy: function() {
                this.isInit = null, this.freeGoldNum = null, this.numCalculate = null, this.watchType = null, this.isButton = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    if (null == this.freeGoldNum && (this.freeGoldNum = [0, 2]), this.watchType = 1, e && (this.watchType = e), this.numCalculate = new n, this.numCalculate.loadSaveData(this.freeGoldNum), gameConfigData.transformationProfit.basicGoldProfit > 1) {
                        var t = new n;
                        t.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), this.numCalculate.multiplicationNum(t)
                    }
                    this.setRewardWay();
                    this.node.getChildByName("getnumart").getComponent("GameArtWord").setString("+" + this.numCalculate.getNumText());
                    this.node.getChildByName("outlinebgsp").getChildByName("sharedoubledes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.englishimgp_plist, "Freegoldcoin");
                    this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").active = !1 ;
                    2 == this.watchType ? this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, getRewardWayName[this.rewardWayType]) : this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg"), this.node.getChildByName("sharedoublebtn").getChildByName("btning").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.englishimgp_plist, "obtain2"), this.node.getChildByName("sharedoublebtn").getChildByName("btning").x += 20, this.isButton = !0, this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.isInit = !0
                }
            },
            setRewardWay: function() {
                var e = gameConfigData.getRewardWayConfig[0];
                gameConfigData.getRewardWayConfig[heroData.rewardWayData.getRewardTimes] || (heroData.rewardWayData.getRewardTimes = 0, heroData.saveHeroData()), e = gameConfigData.getRewardWayConfig[heroData.rewardWayData.getRewardTimes];
                this.rewardWayType = "none";
            },
            clickWatchbtnFun: function() {
                if (1 == this.isButton) switch (this.watchType) {
                    case 1:
                        this.advSpeedUpFun();
                        break;
                    case 2:
                        this.advLackGoldFun()
                }
            },
            advSpeedUpFun: function() {
                var e = this;
                gameSDK.logEvent("freeGoldGiftShare", 1, {
                    freeGoldGiftShare: "freeGoldGiftShare"
                }), 1 == cc.sys.isMobile ? gameSDK.showRewardVideoAd(advCode2, function() {
                    e.advLimitFun()
                }) : gameSDK.newCreateInterstitialAd(advCode10, function() {
                    e.advLimitFun()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })
            },
            advLimitFun: function() {
                this.addGoldFun(), heroData.freeGoldTimeFun(), mainSceneContol.treasureBoxLayerComponent.isFreeGold = !0
            },
            advLackGoldFun: function() {
                var e = this;
                if (gameSDK.logEvent("freeGoldShare", 1, {
                        freeGoldShare: "freeGoldShare"
                    }), "share" == this.rewardWayType) {
                    gameSDK.logEvent("jinbibuzu_share_dianji", 1, {
                        jinbibuzu_share_dianji: "jinbibuzu_share_dianji"
                    });
                    var t = mainSceneContol.getShareData();
                    gameSDK.sendFaceBookFriend(function() {
                        gameSDK.logEvent("jinbibuzu_share_dianji_chenggong", 1, {
                            jinbibuzu_share_dianji_chenggong: "jinbibuzu_share_dianji_chenggong"
                        }), e.addGoldFun()
                    }, function() {
                        gameSDK.logEvent("jinbibuzu_share_dianji_shibai", 1, {
                            jinbibuzu_share_dianji_shibai: "jinbibuzu_share_dianji_shibai"
                        })
                    }, t)
                } else "watch" == this.rewardWayType && gameSDK.newCreateInterstitialAd(advCode5, function() {
                    e.addGoldFun()
                }, function() {
                    e.addGoldFun()
                })
            },
            addGoldFun: function() {
                heroData.rewardWayData.getRewardTimes += 1, heroData.gamePlayData.addedGold(this.numCalculate), mainSceneContol.gamePlayLayerComponent.addRewardParticle(1), this.destroyNode()
            
                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    GameAdapterInfo: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "73069871FJBm76rcBKZP1DT", "GameAdapterInfo");
        cc.Class({
            properties: {
                isInit: null
            },
            initialize: function(e) {
                1 != this.isInit && (this.isInit = !0)
            },
            getPercentageX: function(e) {
                return Math.floor(engineGlobal.viewGameWidth * e)
            },
            getPercentageY: function(e) {
                return Math.floor(engineGlobal.viewGameHeigh * e)
            },
            getTopY: function(e) {
                return engineGlobal.viewGameHeigh - e
            },
            getEndY: function(e) {
                return e
            },
            getLeftX: function(e) {
                return e
            },
            getRightX: function(e) {
                return engineGlobal.viewGameWidth - e
            },
            addSceneNode: function(e, t, i, n) {
                e.x = t, e.y = i, cc.director.getScene().addChild(e), null != n && (e.zIndex = n)
            }
        });
        cc._RF.pop()
    }, {}],
    GameAnimation: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "eb816YvliVAbZAB9FfBlUb8", "GameAnimation");
        cc.Class({
            extends: cc.Node,
            properties: {
                frameIndex: null,
                lastFrameTime: null,
                frameIntervalTime: null,
                isInit: null,
                playCount: null,
                curPlayCount: null,
                isStop: null,
                isRemoveFromComplete: null,
                frameFun: null,
                frameCompleteFun: null,
                playFrameIndex: null,
                fromFrameIndex: null,
                imgeData: null,
                animationSprite: null
            },
            destroy: function() {
                this.frameIndex = null, this.lastFrameTime = null, this.frameIntervalTime = null, this.isInit = null, this.playCount = null, this.curPlayCount = null, this.isStop = null, this.isRemoveFromComplete = null, this.frameFun = null, this.frameCompleteFun = null, this.playFrameIndex = null, this.fromFrameIndex = null, this.imgeData = null, this.animationSprite = null, this._super()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.lastFrameTime = 0, this.playCount = 1, this.isRemoveFromComplete = !0, this.frameIndex = 0, this.imgeData = [], this.animationSprite = this.addComponent(cc.Sprite);
                    var e = this;
                    this.animationSprite.update = function(t) {
                        e.playFrame()
                    }
                }
            },
            addImgeData: function(e, t) {
                var i = new Object;
                i.spriteAtlasURL = e, i.pngName = t, this.imgeData.push()
            },
            setImgeData: function(e) {
                this.imgeData = e
            },
            playFrame: function() {
                if (1 != this.isStop && engine.gameTime.getLocalTime() - this.lastFrameTime > this.frameIntervalTime) {
                    if (this.frameIndex > this.playFrameIndex)
                        if (this.curPlayCount++, -1 == this.playCount) this.frameIndex = this.fromFrameIndex;
                        else {
                            if (!(this.curPlayCount < this.playCount)) return this.gotoAndStop(this.playFrameIndex), null != this.frameCompleteFun && this.frameCompleteFun(), void(1 == this.isRemoveFromComplete && this.destroy());
                            this.frameIndex = this.fromFrameIndex
                        } this.lastFrameTime = engine.gameTime.getLocalTime(this.frameIndex), this.setBitmapInfo(this.frameIndex), null != this.frameFun && this.frameFun(this.frameIndex), this.frameIndex++
                }
            },
            play: function() {
                this.fromFrameIndex = 0, this.playFrameIndex = this.imgeData.length - 1
            },
            setBitmapInfo: function(e) {
                var t = this.imgeData[this.frameIndex];
                this.animationSprite.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(t.spriteAtlasURL, t.pngName)
            },
            setFrameIntervalTime: function(e) {
                this.frameIntervalTime = parseInt(1e3 / e)
            },
            gotoAndPlay: function(e) {
                this.isStop = !1, this.lastFrameTime = 0, this.frameIndex = e, this.setBitmapInfo(this.frameIndex)
            },
            fromFrameIndexToPlayFrameIndex: function(e, t) {
                this.isStop = !1, this.fromFrameIndex = e, this.frameIndex = e, this.lastFrameTime = 0, this.setBitmapInfo(this.frameIndex), this.playFrameIndex = t
            },
            gotoAndStop: function(e) {
                this.isStop = !0, this.lastFrameTime = 0, this.frameIndex = e, this.setBitmapInfo(this.frameIndex)
            },
            setIsStop: function(e) {
                this.isStop = e
            }
        });
        cc._RF.pop()
    }, {}],
    GameArtWord: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f3069qP0yBJe62ToQ2y8pM9", "GameArtWord"), window.ArtWordStyleType = cc.Enum({
            middle: 0,
            left: 1,
            right: 2
        }), cc.Class({
            extends: cc.Component,
            properties: {
                _text: "",
                _styleType: ArtWordStyleType.middle,
                _txtWidth: 0,
                _indentationWidth: 0,
                _txtHight: 0,
                _fontName: "",
                _txtNode: null,
                _fontSpriteAtlas: null,
                _stringSize: null,
                _isInit: null,
                styleType: {
                    type: ArtWordStyleType,
                    set: function(e) {
                        this._styleType = e, this.refreshString()
                    },
                    get: function() {
                        return this._styleType
                    }
                },
                txtWidth: {
                    set: function(e) {
                        this._txtWidth = e, this.refreshString()
                    },
                    get: function() {
                        return this._txtWidth
                    }
                },
                indentationWidth: {
                    set: function(e) {
                        this._indentationWidth = e, this.refreshString()
                    },
                    get: function() {
                        return this._indentationWidth
                    }
                },
                txtHight: {
                    set: function(e) {
                        this._txtHight = e, this.refreshString()
                    },
                    get: function() {
                        return this._txtHight
                    }
                },
                fontName: {
                    set: function(e) {
                        this._fontName = e, this.refreshString()
                    },
                    get: function() {
                        return this._fontName
                    }
                },
                fontSpriteAtlas: {
                    type: cc.SpriteAtlas,
                    set: function(e) {
                        this._fontSpriteAtlas = e, this.refreshString()
                    },
                    get: function() {
                        return this._fontSpriteAtlas
                    }
                },
                text: {
                    set: function(e) {
                        this.setString(e)
                    },
                    get: function() {
                        return this._text
                    }
                }
            },
            initialize: function() {
                1 != this._isInit && (this._isInit = !0, this.node.destroyAllChildren())
            },
            onDestroy: function() {},
            onLoad: function() {
                this.initialize(), this.refreshString()
            },
            refreshString: function() {
                var e = this._text;
                this._text = "", this.setString(e)
            },
            setString: function(e) {
                if (e != this._text) {
                    null != this._txtNode && (this._txtNode.destroy(), this._txtNode = null), null == this._stringSize && (this._stringSize = new cc.Size), this._text = e, this._txtNode = new cc.Node, this.node.addChild(this._txtNode);
                    for (var t = 0, i = 0; i < e.length; i++) {
                        var n = e[i],
                            a = new cc.Node;
                        switch (a.addComponent(cc.Sprite).spriteFrame = this.fontSpriteAtlas.getSpriteFrame(this.fontName + "_" + n), this.styleType) {
                            case ArtWordStyleType.middle:
                            case ArtWordStyleType.left:
                            case ArtWordStyleType.right:
                                a.setAnchorPoint(0, .5)
                        }
                        a.x = t;
                        var o = a.getContentSize();
                        a.x = t, null != o && null != o.width && 0 != o.width ? t = t + o.width + this._indentationWidth : t += this.txtWidth, this._txtNode.addChild(a)
                    }
                    switch (this._stringSize.width = t, this.styleType) {
                        case ArtWordStyleType.middle:
                            this._txtNode.x = -t / 2;
                            break;
                        case ArtWordStyleType.right:
                            this._txtNode.x = -t
                    }
                }
            }
        }), cc._RF.pop()
    }, {}],
    GameBackgroundLoad: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4a853P6tmRN5poJmHCrItBw", "GameBackgroundLoad");
        cc.Class({
            properties: {
                loadArr: null,
                isLoad: null,
                loadCountDic: null,
                isInit: null,
                analysisFun: null
            },
            initialize: function(e) {
                1 != this.isInit && (this.isInit = !0, this.loadArr = [], this.isLoad = !1, this.loadCountDic = new Object)
            },
            addLoadRes: function(e) {
                null == e && cc.error(".....要加载的资源是空..."), this.loadArr.push(e), this.loadRes()
            },
            loadRes: function() {
                if (0 == this.isLoad && this.loadArr.length > 0) {
                    var e = this,
                        t = this.loadArr[0];
                    null == cc.loader.getRes(t) && this.isCanLoad(t) ? (this.isLoad = !0, cc.loader.loadResArray([t], null, function() {
                        e.isLoad = !1, e.analysisFun(t), e.loadRes()
                    })) : (this.loadArr.shift(), this.loadRes())
                }
            },
            isCanLoad: function(e) {
                return null == this.loadCountDic[e] && (this.loadCountDic[e] = 0), this.loadCountDic[e] = this.loadCountDic[e] + 1, !(this.loadCountDic[e] > 10)
            }
        });
        cc._RF.pop()
    }, {}],
    GameConfigData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a14644fLDZMTqtmlVFtM9IJ", "GameConfigData");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                shopFishConfig: null,
                achievementConfig: null,
                mainGridConfig: null,
                speedUpTime: null,
                saveDataCD: null,
                outLineGetGold: null,
                advertisementTime: null,
                noviceNode: null,
                noviceDate: null,
                upMaxTimes: null,
                shopVariationPro: null,
                variationAddLv: null,
                variationTypeEm: null,
                configureTable: null,
                advMaxTimes: null,
                boxAddGoldRate: null,
                boxAddGoldMaxTimes: null,
                turntableMaxTimes: null,
                turntableWaitMaxTimes: null,
                initTurntableWaitMaxTimes: null,
                turntableIntervalTime: null,
                turntableRefTimes: null,
                initTurntableRefTimes: null,
                turntableAdvRefTimes: null,
                freeGoldWaitTime: null,
                newFishShareDiamond: null,
                boxLowestLayerNum: null,
                boxIntervalTime: null,
                maxInvitationNum: null,
                invitationConfig: null,
                firstLoadingPage: null,
                firstMainScene: null,
                noviceMaxTimes: null,
                openFreeLevel: null,
                shotMaxTimes: null,
                initShotMaxTimes: null,
                shotFishNum: null,
                shotFishConfig: null,
                transformationConfig: null,
                transformationValue: null,
                transformationList: null,
                transformationText: null,
                transformationProfit: null,
                transformationInitProfit: null,
                openFishingLevel: null,
                openGuessLevel: null,
                isUnderwayNovice: null,
                highestFishLevel: null,
                getRewardWayConfig: [],
                tipsTxtConfig: null
            },
            onDestroy: function() {
                this.isInit = null, this.shopFishConfig = null, this.achievementConfig = null, this.mainGridConfig = null, this.speedUpTime = null, this.saveDataCD = null, this.outLineGetGold = null, this.advertisementTime = null, this.noviceNode = null, this.noviceDate = null, this.upMaxTimes = null, this.shopVariationPro = null, this.variationAddLv = null, this.variationTypeEm = null, this.configureTable = null, this.advMaxTimes = null, this.boxAddGoldRate = null, this.boxAddGoldMaxTimes = null, this.turntableMaxTimes = null, this.turntableWaitMaxTimes = null, this.initTurntableWaitMaxTimes = null, this.turntableIntervalTime = null, this.turntableRefTimes = null, this.initTurntableRefTimes = null, this.turntableAdvRefTimes = null, this.freeGoldWaitTime = null, this.newFishShareDiamond = null, this.boxLowestLayerNum = null, this.boxIntervalTime = null, this.maxInvitationNum = null, this.invitationConfig = null, this.firstLoadingPage = null, this.firstMainScene = null, this.noviceMaxTimes = null, this.openFreeLevel = null, this.shotMaxTimes = null, this.initShotMaxTimes = null, this.shotFishNum = null, this.shotFishConfig = null, this.transformationConfig = null, this.transformationValue = null, this.transformationList = null, this.transformationText = null, this.transformationProfit = null, this.transformationInitProfit = null, this.openFishingLevel = null, this.openGuessLevel = null, this.isUnderwayNovice = null, this.highestFishLevel = null, this.getRewardWayConfig = null, this.tipsTxtConfig = null
            },
            initialize: function() {
                1 != this.isInit && (this.configureTableFun(), this.initGlobalData(), this.initializeShopFishData(), this.initializeFishData(), this.initMainGridConfig(), this.initAdvertisementTime(), this.initializeFishTankData(), this.initNoviceLayer(), this.initActionConfig(), this.initVariationConfig(), this.initOpenFreeLevel(), this.initBoxAddGoldFun(), this.initTurntable(), this.initAddDiamond(), this.initInvitation(), this.initGetInto(), this.initFishingLayer(), this.initTransformationConfig(), this.initGetRewardWayConfig(), this.initTipsTxtConfig(), this.initUnderwayNovice(), this.isInit = !0)
            },
            initTipsTxtConfig: function() {
                this.tipsTxtConfig = new Object, this.tipsTxtConfig.advFail1 = "Failed, try again later"
            },
            initGetRewardWayConfig: function() {
                this.getRewardWayConfig = ["share", "watch"]
            },
            initUnderwayNovice: function() {
                this.isUnderwayNovice = !1
            },
            initGlobalData: function() {
                "2" == this.configureTable.config && (idlefishUsedGoldRank = "megrebirdUsedGoldRank", advCode1 = "1296780957130469_1340842986057599", advCode2 = "1296780957130469_1329683847173513", advCode3 = "1296780957130469_1340842919390939", advCode4 = "1296780957130469_1340843066057591", localServerUrl = "../../../https@candy.9191youxi.com_3A8080/merge_bird", lineServerUrl = "../../../https@candy.9191youxi.com_3A8080/merge_bird")
            },
            initTransformationConfig: function() {
                var e = this;
                this.transformationConfig = new Object, this.transformationConfig.basicDiamondReward = 100, this.transformationConfig.basicRewardRate = 2, this.transformationConfig.maxUpgrade = 18, this.transformationConfig.minFishLevel = 13, this.transformationConfig.minUseLevel = 20, this.transformationConfig.guideTurnNoviceTxt = ["please click here", "click to sell fish", "please click here", "please click here", "buy new decorations"], this.transformationConfig.evolNoviceTxt = ["please click here", "buy new decorations", "please click here"], this.transformationConfig.minFirstMoney = 50, this.transformationProfit = new Object, this.transformationInitProfit = new Object, this.transformationProfit.basicGoldProfit = 1, this.transformationInitProfit.basicGoldProfit = this.transformationProfit.basicGoldProfit, this.transformationList = new Object, this.transformationList[1001] = {
                    id: "1001",
                    value: 5,
                    consume: ["50.00", "6400000.00", "26214400000.00"],
                    type: "basicGoldProfit"
                }, this.transformationList[1002] = {
                    id: "1002",
                    value: 5,
                    consume: ["1000.00", "25600000.00", "104857600000.00"],
                    type: "basicGoldProfit"
                }, this.transformationList[1003] = {
                    id: "1003",
                    value: 5,
                    consume: ["20000.00", "102400000.00", "419430400000.00"],
                    type: "basicGoldProfit"
                }, this.transformationList[1004] = {
                    id: "1004",
                    value: 5,
                    consume: ["100000.00", "409600000.00", "1677721600000.00"],
                    type: "basicGoldProfit"
                }, this.transformationList[1005] = {
                    id: "1005",
                    value: 5,
                    consume: ["400000.00", "1638400000.00", "6710886400000.00"],
                    type: "basicGoldProfit"
                }, this.transformationList[1006] = {
                    id: "1006",
                    value: 5,
                    consume: ["1600000.00", "6553600000.00", "26843545600000.00"],
                    type: "basicGoldProfit"
                }, this.transformationConfig.minFirstMoney = parseInt(this.transformationList[1001].consume);
                var t = function(e) {
                    for (var t = e.toString(), i = t.substring(0, t.indexOf(".")), n = [], a = 0; a < Math.ceil(i.length / 3); a++) {
                        var o = i.substring(i.length - 3 * (a + 1), i.length - 3 * a);
                        n.push(parseInt(o))
                    }
                    return n
                };
                for (var i in this.transformationList)
                    for (var n = 0; n < e.transformationList[i].consume.length; n++)(function(i, n) {
                        e.transformationList[i].consume[n] = t(e.transformationList[i].consume[n])
                    })(i, n)
            },
            initFishingLayer: function() {
                if (this.shotMaxTimes = 15, this.initShotMaxTimes = this.shotMaxTimes, this.shotFishNum = [8, 8], this.openFishingLevel = 10, this.openGuessLevel = 100, this.shotFishConfig = new Object, "1" == this.configureTable.config) {
                    for (var e = [{
                            fishID: 1001,
                            level: 1,
                            shotFishGold: "166.67 ",
                            shotFishScale: 50,
                            guessWinGold: "2500.00 ",
                            guessFailGold: "1250.00 "
                        }, {
                            fishID: 1002,
                            level: 2,
                            shotFishGold: "336.70 ",
                            shotFishScale: 50,
                            guessWinGold: "5050.51 ",
                            guessFailGold: "2525.25 "
                        }, {
                            fishID: 1003,
                            level: 3,
                            shotFishGold: "680.27 ",
                            shotFishScale: 50,
                            guessWinGold: "10204.08 ",
                            guessFailGold: "5102.04 "
                        }, {
                            fishID: 1004,
                            level: 4,
                            shotFishGold: "1374.57 ",
                            shotFishScale: 50,
                            guessWinGold: "20618.56 ",
                            guessFailGold: "10309.28 "
                        }, {
                            fishID: 1005,
                            level: 5,
                            shotFishGold: "2777.78 ",
                            shotFishScale: 50,
                            guessWinGold: "41666.67 ",
                            guessFailGold: "20833.33 "
                        }, {
                            fishID: 1006,
                            level: 6,
                            shotFishGold: "5614.04 ",
                            shotFishScale: 50,
                            guessWinGold: "84210.53 ",
                            guessFailGold: "42105.26 "
                        }, {
                            fishID: 1007,
                            level: 7,
                            shotFishGold: "11347.52 ",
                            shotFishScale: 50,
                            guessWinGold: "170212.77 ",
                            guessFailGold: "85106.38 "
                        }, {
                            fishID: 1008,
                            level: 8,
                            shotFishGold: "22939.07 ",
                            shotFishScale: 50,
                            guessWinGold: "344086.02 ",
                            guessFailGold: "172043.01 "
                        }, {
                            fishID: 1009,
                            level: 9,
                            shotFishGold: "46376.81 ",
                            shotFishScale: 50,
                            guessWinGold: "695652.17 ",
                            guessFailGold: "347826.09 "
                        }, {
                            fishID: 1010,
                            level: 10,
                            shotFishGold: "93772.89 ",
                            shotFishScale: 50,
                            guessWinGold: "1406593.41 ",
                            guessFailGold: "703296.70 "
                        }, {
                            fishID: 1011,
                            level: 11,
                            shotFishGold: "303407.41 ",
                            shotFishScale: 50,
                            guessWinGold: "4551111.11 ",
                            guessFailGold: "2275555.56 "
                        }, {
                            fishID: 1012,
                            level: 12,
                            shotFishGold: "843745.32 ",
                            shotFishScale: 50,
                            guessWinGold: "12656179.78 ",
                            guessFailGold: "6328089.89 "
                        }, {
                            fishID: 1013,
                            level: 13,
                            shotFishGold: "2172121.21 ",
                            shotFishScale: 50,
                            guessWinGold: "32581818.18 ",
                            guessFailGold: "16290909.09 "
                        }, {
                            fishID: 1014,
                            level: 14,
                            shotFishGold: "5335785.44 ",
                            shotFishScale: 50,
                            guessWinGold: "80036781.61 ",
                            guessFailGold: "40018390.80 "
                        }, {
                            fishID: 1015,
                            level: 15,
                            shotFishGold: "12700775.19 ",
                            shotFishScale: 50,
                            guessWinGold: "190511627.91 ",
                            guessFailGold: "95255813.95 "
                        }, {
                            fishID: 1016,
                            level: 16,
                            shotFishGold: "29555450.98 ",
                            shotFishScale: 50,
                            guessWinGold: "443331764.71 ",
                            guessFailGold: "221665882.35 "
                        }, {
                            fishID: 1017,
                            level: 17,
                            shotFishGold: "67616507.94 ",
                            shotFishScale: 50,
                            guessWinGold: "1014247619.05 ",
                            guessFailGold: "507123809.52 "
                        }, {
                            fishID: 1018,
                            level: 18,
                            shotFishGold: "152654136.55 ",
                            shotFishScale: 50,
                            guessWinGold: "2289812048.19 ",
                            guessFailGold: "1144906024.10 "
                        }, {
                            fishID: 1019,
                            level: 19,
                            shotFishGold: "341000325.20 ",
                            shotFishScale: 50,
                            guessWinGold: "5115004878.05 ",
                            guessFailGold: "2557502439.02 "
                        }, {
                            fishID: 1020,
                            level: 20,
                            shotFishGold: "755147325.10 ",
                            shotFishScale: 50,
                            guessWinGold: "11327209876.54 ",
                            guessFailGold: "5663604938.27 "
                        }, {
                            fishID: 1021,
                            level: 21,
                            shotFishGold: "1660245333.33 ",
                            shotFishScale: 50,
                            guessWinGold: "24903680000.00 ",
                            guessFailGold: "12451840000.00 "
                        }, {
                            fishID: 1022,
                            level: 22,
                            shotFishGold: "3627984472.57 ",
                            shotFishScale: 50,
                            guessWinGold: "54419767088.61 ",
                            guessFailGold: "27209883544.30 "
                        }, {
                            fishID: 1023,
                            level: 23,
                            shotFishGold: "8346014780.01 ",
                            shotFishScale: 50,
                            guessWinGold: "125190221700.21 ",
                            guessFailGold: "62595110850.11 "
                        }, {
                            fishID: 1024,
                            level: 24,
                            shotFishGold: "19613134733.03 ",
                            shotFishScale: 50,
                            guessWinGold: "294197020995.50 ",
                            guessFailGold: "147098510497.75 "
                        }, {
                            fishID: 1025,
                            level: 25,
                            shotFishGold: "45903081290.08 ",
                            shotFishScale: 100,
                            guessWinGold: "688546219351.18 ",
                            guessFailGold: "344273109675.59 "
                        }, {
                            fishID: 1026,
                            level: 26,
                            shotFishGold: "107045985568.46 ",
                            shotFishScale: 50,
                            guessWinGold: "1605689783526.95 ",
                            guessFailGold: "802844891763.47 "
                        }, {
                            fishID: 1027,
                            level: 27,
                            shotFishGold: "248831423057.26 ",
                            shotFishScale: 50,
                            guessWinGold: "3732471345858.86 ",
                            guessFailGold: "1866235672929.43 "
                        }, {
                            fishID: 1028,
                            level: 28,
                            shotFishGold: "576755691300.57 ",
                            shotFishScale: 50,
                            guessWinGold: "8651335369508.58 ",
                            guessFailGold: "4325667684754.29 "
                        }, {
                            fishID: 1029,
                            level: 29,
                            shotFishGold: "1333380954125.39 ",
                            shotFishScale: 100,
                            guessWinGold: "20000714311880.80 ",
                            guessFailGold: "10000357155940.40 "
                        }, {
                            fishID: 1030,
                            level: 30,
                            shotFishGold: "3075378652256.95 ",
                            shotFishScale: 50,
                            guessWinGold: "46130679783854.20 ",
                            guessFailGold: "23065339891927.10 "
                        }, {
                            fishID: 1031,
                            level: 31,
                            shotFishGold: "7078102251963.68 ",
                            shotFishScale: 50,
                            guessWinGold: "106171533779455.00 ",
                            guessFailGold: "53085766889727.60 "
                        }, {
                            fishID: 1032,
                            level: 32,
                            shotFishGold: "16258817231716.60 ",
                            shotFishScale: 50,
                            guessWinGold: "243882258475749.00 ",
                            guessFailGold: "121941129237874.00 "
                        }, {
                            fishID: 1033,
                            level: 33,
                            shotFishGold: "37280780920048.70 ",
                            shotFishScale: 50,
                            guessWinGold: "559211713800731.00 ",
                            guessFailGold: "279605856900365.00 "
                        }, {
                            fishID: 1034,
                            level: 34,
                            shotFishGold: "85342760646706.20 ",
                            shotFishScale: 50,
                            guessWinGold: "1280141409700590.00 ",
                            guessFailGold: "640070704850296.00 "
                        }, {
                            fishID: 1035,
                            level: 35,
                            shotFishGold: "195069167192471.00 ",
                            shotFishScale: 50,
                            guessWinGold: "2926037507887070.00 ",
                            guessFailGold: "1463018753943530.00 "
                        }, {
                            fishID: 1036,
                            level: 36,
                            shotFishGold: "445245374116816.00 ",
                            shotFishScale: 50,
                            guessWinGold: "6678680611752230.00 ",
                            guessFailGold: "3339340305876120.00 "
                        }, {
                            fishID: 1037,
                            level: 37,
                            shotFishGold: "1014944876902430.00 ",
                            shotFishScale: 50,
                            guessWinGold: "15224173153536400.00 ",
                            guessFailGold: "7612086576768210.00 "
                        }, {
                            fishID: 1038,
                            level: 38,
                            shotFishGold: "2310769847645300.00 ",
                            shotFishScale: 50,
                            guessWinGold: "34661547714679400.00 ",
                            guessFailGold: "17330773857339700.00 "
                        }, {
                            fishID: 1039,
                            level: 39,
                            shotFishGold: "5255054125431550.00 ",
                            shotFishScale: 50,
                            guessWinGold: "78825811881473200.00 ",
                            guessFailGold: "39412905940736600.00 "
                        }, {
                            fishID: 1040,
                            level: 40,
                            shotFishGold: "11938112089295600.00 ",
                            shotFishScale: 120,
                            guessWinGold: "179071681339434000.00 ",
                            guessFailGold: "89535840669716900.00 "
                        }, {
                            fishID: 1041,
                            level: 41,
                            shotFishGold: "27093231225811900.00 ",
                            shotFishScale: 50,
                            guessWinGold: "406398468387178000.00 ",
                            guessFailGold: "203199234193589000.00 "
                        }, {
                            fishID: 1042,
                            level: 42,
                            shotFishGold: "61429754881381600.00 ",
                            shotFishScale: 50,
                            guessWinGold: "921446323220724000.00 ",
                            guessFailGold: "460723161610362000.00 "
                        }, {
                            fishID: 1043,
                            level: 43,
                            shotFishGold: "139159682345150000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "2087395235177240000.00 ",
                            guessFailGold: "1043697617588620000.00 "
                        }, {
                            fishID: 1044,
                            level: 44,
                            shotFishGold: "314982588692772000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "4724738830391570000.00 ",
                            guessFailGold: "2362369415195790000.00 "
                        }, {
                            fishID: 1045,
                            level: 45,
                            shotFishGold: "712390527697670000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "10685857915465100000.00 ",
                            guessFailGold: "5342928957732530000.00 "
                        }, {
                            fishID: 1046,
                            level: 46,
                            shotFishGold: "1610002592596730000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "24150038888951000000.00 ",
                            guessFailGold: "12075019444475500000.00 "
                        }, {
                            fishID: 1047,
                            level: 47,
                            shotFishGold: "3636041253368910000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "54540618800533600000.00 ",
                            guessFailGold: "27270309400266800000.00 "
                        }, {
                            fishID: 1048,
                            level: 48,
                            shotFishGold: "8206168966655000000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "123092534499825000000.00 ",
                            guessFailGold: "61546267249912500000.00 "
                        }, {
                            fishID: 1049,
                            level: 49,
                            shotFishGold: "18508703786976500000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "277630556804647000000.00 ",
                            guessFailGold: "138815278402324000000.00 "
                        }, {
                            fishID: 1050,
                            level: 50,
                            shotFishGold: "41720438864086400000.00 ",
                            shotFishScale: 50,
                            guessWinGold: "625806582961295000000.00 ",
                            guessFailGold: "312903291480648000000.00 "
                        }], t = 0; t < e.length; t++)
                        for (var i in this.shotFishConfig[e[t].fishID] = e[t], e[t])
                            if ("shotFishGold" == i || "guessWinGold" == i || "guessFailGold" == i) {
                                for (var n = e[t][i].toString(), a = n.substring(0, n.indexOf(".")), o = [], s = 0; s < Math.ceil(a.length / 3); s++) {
                                    var l = a.substring(a.length - 3 * (s + 1), a.length - 3 * s);
                                    o.push(parseInt(l))
                                }
                                e[t][i] = o
                            }
                } else this.configureTable.config
            },
            initGetInto: function() {
                this.firstLoadingPage = !1, this.firstMainScene = !1
            },
            initInvitation: function() {
                this.maxInvitationNum = 30, this.invitationConfig = [], this.invitationConfig = [{
                    index: 1,
                    getdiamond: [30],
                    txt: "Successfully invited first friends"
                }, {
                    index: 2,
                    getdiamond: [40],
                    txt: "Successfully invited second friends."
                }, {
                    index: 3,
                    getdiamond: [50],
                    txt: "Successfully invited third friends."
                }, {
                    index: 4,
                    getdiamond: [60],
                    txt: "Successfully invited fourth friends."
                }, {
                    index: 5,
                    getdiamond: [70],
                    txt: "Successfully invited fifth friends."
                }, {
                    index: 6,
                    getdiamond: [80],
                    txt: "Successfully invited sixth friends."
                }, {
                    index: 7,
                    getdiamond: [90],
                    txt: "Successfully invited seventh friends."
                }, {
                    index: 8,
                    getdiamond: [110],
                    txt: "Successfully invited eighth friends."
                }, {
                    index: 9,
                    getdiamond: [120],
                    txt: "Successfully invited ninth friends."
                }, {
                    index: 10,
                    getdiamond: [130],
                    txt: "Successfully invited tenth friends."
                }, {
                    index: 11,
                    getdiamond: [140],
                    txt: "Successfully invited eleventh friends."
                }, {
                    index: 12,
                    getdiamond: [150],
                    txt: "Successfully invited twelfth friends."
                }, {
                    index: 13,
                    getdiamond: [160],
                    txt: "Successfully invited thirteenth friends."
                }, {
                    index: 14,
                    getdiamond: [170],
                    txt: "Successfully invited fourteenth friends."
                }, {
                    index: 15,
                    getdiamond: [180],
                    txt: "Successfully invited fifteenth friends."
                }, {
                    index: 16,
                    getdiamond: [30],
                    txt: "Successfully invited sixteenth friends."
                }, {
                    index: 17,
                    getdiamond: [40],
                    txt: "Successfully invited seventeenth friends"
                }, {
                    index: 18,
                    getdiamond: [50],
                    txt: "Successfully invited eighteenth friends."
                }, {
                    index: 19,
                    getdiamond: [60],
                    txt: "Successfully invited nineteenth friends."
                }, {
                    index: 20,
                    getdiamond: [70],
                    txt: "Successfully invited twentieth friends"
                }, {
                    index: 21,
                    getdiamond: [80],
                    txt: "Successfully invited twenty-first friends."
                }, {
                    index: 22,
                    getdiamond: [90],
                    txt: "Successfully invited twenty-second friends."
                }, {
                    index: 23,
                    getdiamond: [110],
                    txt: "Successfully invited twenty-third friends."
                }, {
                    index: 24,
                    getdiamond: [120],
                    txt: "Successfully invited twenty-fourth friends."
                }, {
                    index: 25,
                    getdiamond: [130],
                    txt: "Successfully invited twenty-fifth friends."
                }, {
                    index: 26,
                    getdiamond: [140],
                    txt: "Successfully invited twenty-sixth friends. "
                }, {
                    index: 27,
                    getdiamond: [150],
                    txt: "Successfully invited twenty-seventh friends."
                }, {
                    index: 28,
                    getdiamond: [160],
                    txt: "Successfully invited twenty-eighth friends."
                }, {
                    index: 29,
                    getdiamond: [170],
                    txt: "Successfully invited twenty-ninth friends."
                }, {
                    index: 30,
                    getdiamond: [180],
                    txt: "Successfully invited thirtieth friends."
                }]
            },
            initAddDiamond: function() {
                this.newFishShareDiamond = [10]
            },
            initBoxAddGoldFun: function() {
                this.boxAddGoldRate = 1, this.boxAddGoldMaxTimes = 0, this.boxIntervalTime = 40
            },
            configureTableFun: function() {
                this.configureTable = new Object;
                var e = "";
                "fish" == (e = -1 != fbSaveDataKey.indexOf("bird") ? "bird" : "fish") ? (this.configureTable.spine = "fish", this.configureTable.config = "1", this.configureTable.animation = "swim", this.configureTable.crab = "crab") : "bird" == e && (this.configureTable.spine = "bird", this.configureTable.config = "2", this.configureTable.animation = "fly", this.configureTable.crab = "ladybug")
            },
            initTurntable: function() {
                this.turntableWaitMaxTimes = 10, this.initTurntableWaitMaxTimes = this.turntableWaitMaxTimes, this.turntableMaxTimes = 100, this.turntableIntervalTime = 18e5, this.turntableRefTimes = 10, this.initTurntableRefTimes = this.turntableRefTimes, this.turntableAdvRefTimes = 10, this.turntableData = new Object, this.turntableData[1001] = {
                    type: 1,
                    probability: 20,
                    count: [1],
                    multipleRate: 2.5
                }, this.turntableData[1002] = {
                    type: 3,
                    probability: 15
                }, this.turntableData[1003] = {
                    type: 2,
                    probability: 3,
                    count: [50],
                    double: !0
                }, this.turntableData[1004] = {
                    type: 1,
                    probability: 15,
                    count: [2],
                    multipleRate: 2.5
                }, this.turntableData[1005] = {
                    type: 4,
                    probability: 9,
                    count: 150
                }, this.turntableData[1006] = {
                    type: 1,
                    probability: 15,
                    count: [3],
                    multipleRate: 2.5,
                    double: !0
                }, this.turntableData[1007] = {
                    type: 5,
                    probability: 15
                }, this.turntableData[1008] = {
                    type: 1,
                    probability: 8,
                    count: [4],
                    multipleRate: 2.5,
                    double: !0
                }
            },
            initMainGridConfig: function() {
                this.gridConfigData = {}, this.gridConfigData.gridWidth = 170, this.gridConfigData.gridHeight = 120, this.gridConfigData.offsetX = 24, this.gridConfigData.offsetY = 160, this.gridConfigData.gridMaxX = 4, this.gridConfigData.gridMaxY = 3, this.gridConfigData.defaultGridValue = null
            },
            initAdvertisementTime: function() {
                this.advertisementTime = 60
            },
            initializeFishData: function() {
                if (this.fishConfig = new Object, "1" == this.configureTable.config) {
                    for (var e = [{
                            fishID: 1001,
                            nextFishID: 1002,
                            unlockNeed: null,
                            icon: 1,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 0,
                            level: 1,
                            freeGold: "200000.00 ",
                            paFreeGold: "66666.67 ",
                            turntableGold: "333.33 ",
                            crabGold: 6.666666667,
                            barSpeed: 1,
                            priceAdd: .07,
                            gold: "100.00 ",
                            diamond: "5.00 ",
                            addGold: "66.67 ",
                            con: "Amphiprioninae,Size:10-12cm,Suitable water temperature:26-27℃"
                        }, {
                            fishID: 1002,
                            nextFishID: 1003,
                            unlockNeed: 1004,
                            icon: 5,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 2,
                            freeGold: "410774.41 ",
                            paFreeGold: "121212.12 ",
                            turntableGold: "673.40 ",
                            crabGold: 7.533333333,
                            barSpeed: .99,
                            priceAdd: .08,
                            gold: "1000.00 ",
                            diamond: "5.50 ",
                            addGold: "133.33 ",
                            con: "Blackfin coralfish Latin name:Chelmon muelleri Distribution:Pacific Ocean"
                        }, {
                            fishID: 1003,
                            nextFishID: 1004,
                            unlockNeed: 1007,
                            icon: 8,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .8,
                            speed: 80,
                            unlockCount: 1,
                            level: 3,
                            freeGold: "843537.41 ",
                            paFreeGold: "217687.07 ",
                            turntableGold: "1360.54 ",
                            crabGold: 8.512666667,
                            barSpeed: .98,
                            priceAdd: .09,
                            gold: "4000.00 ",
                            diamond: "6.05 ",
                            addGold: "266.67 ",
                            con: "English name: Scooter DragonetScientific name: Neosynchiropus ocellatus Temperament: Moderate Main origin: Philippines"
                        }, {
                            fishID: 1004,
                            nextFishID: 1005,
                            unlockNeed: 1008,
                            icon: 7,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .4,
                            speed: 70,
                            unlockCount: 1,
                            level: 4,
                            freeGold: "1731958.76 ",
                            paFreeGold: "384879.73 ",
                            turntableGold: "2749.14 ",
                            crabGold: 9.619313333,
                            barSpeed: .97,
                            priceAdd: .095,
                            gold: "10000.00 ",
                            diamond: "6.66 ",
                            addGold: "533.33 ",
                            con: "Double-bandedDwarfCichlid.Lives in Peru,Columbia.Size:8-10cm."
                        }, {
                            fishID: 1005,
                            nextFishID: 1006,
                            unlockNeed: 1009,
                            icon: 19,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 1,
                            level: 5,
                            freeGold: "3555555.56 ",
                            paFreeGold: "666666.67 ",
                            turntableGold: "5555.56 ",
                            crabGold: 10.86982407,
                            barSpeed: .96,
                            priceAdd: .1,
                            gold: "47760.00 ",
                            diamond: "7.32 ",
                            addGold: "1066.67 ",
                            con: "Latin name:Poecilia reticulata Good-natured,could live with other small/medium body tropical fishes,lively with short life"
                        }, {
                            fishID: 1006,
                            nextFishID: 1007,
                            unlockNeed: 1010,
                            icon: 15,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .6,
                            speed: 75,
                            unlockCount: 1,
                            level: 6,
                            freeGold: "7298245.61 ",
                            paFreeGold: "1122807.02 ",
                            turntableGold: "11228.07 ",
                            crabGold: 12.2829012,
                            barSpeed: .95,
                            priceAdd: .17,
                            gold: "143280.00 ",
                            diamond: "8.05 ",
                            addGold: "2133.33 ",
                            con: "Hermit-crab,latin name:Paguridae,lives in coast of subtropics,found in crack of rocks at the coast and sandy beach"
                        }, {
                            fishID: 1007,
                            nextFishID: 1008,
                            unlockNeed: 1011,
                            icon: 17,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 7,
                            freeGold: "14978723.40 ",
                            paFreeGold: "2042553.19 ",
                            turntableGold: "22695.04 ",
                            crabGold: 13.87967835,
                            barSpeed: .94,
                            priceAdd: .17,
                            gold: "387475.05 ",
                            diamond: "8.86 ",
                            addGold: "4266.67 ",
                            con: "Puffer fishes.Tetraodontidae.Lives in warm temperate zone and tropic.Some species live in rivers."
                        }, {
                            fishID: 1008,
                            nextFishID: 1009,
                            unlockNeed: 1012,
                            icon: 16,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: .8,
                            timeScale: .5,
                            speed: 70,
                            unlockCount: 1,
                            level: 8,
                            freeGold: "30738351.25 ",
                            paFreeGold: "3670250.90 ",
                            turntableGold: "45878.14 ",
                            crabGold: 15.68403654,
                            barSpeed: .93,
                            priceAdd: .17,
                            gold: "1051518.36 ",
                            diamond: "9.74 ",
                            addGold: "8533.33 ",
                            con: "Delphinidae,odontocetes.its body like a spindle;spiracle like a crescent."
                        }, {
                            fishID: 1009,
                            nextFishID: 1010,
                            unlockNeed: 1013,
                            icon: 26,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .2,
                            speed: 80,
                            unlockCount: 1,
                            level: 9,
                            freeGold: "63072463.77 ",
                            paFreeGold: "6492753.62 ",
                            turntableGold: "92753.62 ",
                            crabGold: 17.72296129,
                            barSpeed: .92,
                            priceAdd: .17,
                            gold: "2863521.93 ",
                            diamond: "10.72 ",
                            addGold: "17066.67 ",
                            con: "Nautiloidea,marine molluscs.2 genus,6 species.Owns curly shell like pearl."
                        }, {
                            fishID: 1010,
                            nextFishID: 1011,
                            unlockNeed: 1014,
                            icon: 10,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .3,
                            speed: 75,
                            unlockCount: 1,
                            level: 10,
                            freeGold: "129406593.41 ",
                            paFreeGold: "11252747.25 ",
                            turntableGold: "187545.79 ",
                            crabGold: 20.02694625,
                            barSpeed: .91,
                            priceAdd: .17,
                            gold: "7825141.82 ",
                            diamond: "11.79 ",
                            addGold: "34133.33 ",
                            con: "Melanotaenia maccullochi lives in north of Australia.Size:6-8cm.Temp:22-26℃"
                        }, {
                            fishID: 1011,
                            nextFishID: 1012,
                            unlockNeed: 1015,
                            icon: 11,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 11,
                            freeGold: "265481481.48 ",
                            paFreeGold: "22755555.56 ",
                            turntableGold: "606814.81 ",
                            crabGold: 22.63044927,
                            barSpeed: .9,
                            priceAdd: .17,
                            gold: "21458006.09 ",
                            diamond: "12.97 ",
                            addGold: "68266.67 ",
                            con: "hippocampus,Syngnathoidei,samll marine animal.Size:5-30cm"
                        }, {
                            fishID: 1012,
                            nextFishID: 1013,
                            unlockNeed: 1016,
                            icon: 12,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .6,
                            speed: 75,
                            unlockCount: 1,
                            level: 12,
                            freeGold: "544599250.94 ",
                            paFreeGold: "46022471.91 ",
                            turntableGold: "1687490.64 ",
                            crabGold: 25.57240767,
                            barSpeed: .89,
                            priceAdd: .17,
                            gold: "59045830.29 ",
                            diamond: "14.27 ",
                            addGold: "136533.33 ",
                            con: "English name: Scooter Dragonet Scientific name: Neosynchiropus ocellatusTemperament: ModerateMain origin: Philippines"
                        }, {
                            fishID: 1013,
                            nextFishID: 1014,
                            unlockNeed: 1017,
                            icon: 31,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 13,
                            freeGold: "1117090909.09 ",
                            paFreeGold: "93090909.09 ",
                            turntableGold: "4344242.42 ",
                            crabGold: 28.89682067,
                            barSpeed: .88,
                            priceAdd: .17,
                            gold: "163038062.30 ",
                            diamond: "15.69 ",
                            addGold: "273066.67 ",
                            con: "Pseudochromis porphyreus.Lives in south China,Taiwan,Philippines and coral reef zone of Pacific."
                        }, {
                            fishID: 1014,
                            nextFishID: 1015,
                            unlockNeed: 1018,
                            icon: 14,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .8,
                            speed: 70,
                            unlockCount: 1,
                            level: 14,
                            freeGold: "2291249042.15 ",
                            paFreeGold: "188321839.08 ",
                            turntableGold: "10671570.88 ",
                            crabGold: 32.65340735,
                            barSpeed: .87,
                            priceAdd: .17,
                            gold: "451737102.78 ",
                            diamond: "17.26 ",
                            addGold: "546133.33 ",
                            con: "Geophagus jurupari,latin name:Placidochromis phenochilus,Perciformes,Family Cichlidae,Placidochromis,freshwater fish"
                        }, {
                            fishID: 1015,
                            nextFishID: 1016,
                            unlockNeed: 1019,
                            icon: 32,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .4,
                            speed: 80,
                            unlockCount: 1,
                            level: 15,
                            freeGold: "4699286821.71 ",
                            paFreeGold: "381023255.81 ",
                            turntableGold: "25401550.39 ",
                            crabGold: 36.89835031,
                            barSpeed: .86,
                            priceAdd: .17,
                            gold: "1255962009.58 ",
                            diamond: "18.99 ",
                            addGold: "1092266.67 ",
                            con: "Ostracion cubicus lives in tropic zone of India,Pacific.Max size:45cm."
                        }, {
                            fishID: 1016,
                            nextFishID: 1017,
                            unlockNeed: 1020,
                            icon: 4,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .4,
                            speed: 70,
                            unlockCount: 1,
                            level: 16,
                            freeGold: "9637647058.82 ",
                            paFreeGold: "771011764.71 ",
                            turntableGold: "59110901.96 ",
                            crabGold: 41.69513585,
                            barSpeed: .85,
                            priceAdd: .17,
                            gold: "3503951983.25 ",
                            diamond: "20.89 ",
                            addGold: "2184533.33 ",
                            con: "Rajiformes,Chondrichthyes.Lives in most watershed of the world"
                        }, {
                            fishID: 1017,
                            nextFishID: 1018,
                            unlockNeed: 1021,
                            icon: 6,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 1,
                            level: 17,
                            freeGold: "19764825396.83 ",
                            paFreeGold: "1560380952.38 ",
                            turntableGold: "135233015.87 ",
                            crabGold: 47.11550351,
                            barSpeed: .84,
                            priceAdd: .17,
                            gold: "9809063294.82 ",
                            diamond: "22.97 ",
                            addGold: "4369066.67 ",
                            con: "Pterois volitans,size:25-40cm,distribution:Indian Ocean,the Pacific,the Atlantic"
                        }, {
                            fishID: 1018,
                            nextFishID: 1019,
                            unlockNeed: 1022,
                            icon: 18,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 18,
                            freeGold: "40532305220.88 ",
                            paFreeGold: "3158361445.78 ",
                            turntableGold: "305308273.09 ",
                            crabGold: 53.24051897,
                            barSpeed: .83,
                            priceAdd: .17,
                            gold: "27553796950.96 ",
                            diamond: "25.27 ",
                            addGold: "8738133.33 ",
                            con: "Rajah Cichlasoma.The original is controversial, but in a way, it lives in Malaysia,Thailand and Taiwan"
                        }, {
                            fishID: 1019,
                            nextFishID: 1020,
                            unlockNeed: 1023,
                            icon: 22,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 19,
                            freeGold: "83118829268.29 ",
                            paFreeGold: "6393756097.56 ",
                            turntableGold: "682000650.41 ",
                            crabGold: 60.16178643,
                            barSpeed: .82,
                            priceAdd: .17,
                            gold: "77663438239.29 ",
                            diamond: "27.80 ",
                            addGold: "17476266.67 ",
                            con: "Betta splendens,its body like a spindle.Size:5-6cm"
                        }, {
                            fishID: 1020,
                            nextFishID: 1021,
                            unlockNeed: 1024,
                            icon: 20,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .3,
                            speed: 80,
                            unlockCount: 1,
                            level: 20,
                            freeGold: "170447539094.65 ",
                            paFreeGold: "12945382716.05 ",
                            turntableGold: "1510294650.21 ",
                            crabGold: 67.98281867,
                            barSpeed: .81,
                            priceAdd: .17,
                            gold: "219649225464.16 ",
                            diamond: "30.58 ",
                            addGold: "34952533.33 ",
                            con: "Poecilia latipinna.Temperature:22℃一24℃"
                        }, {
                            fishID: 1021,
                            nextFishID: 1022,
                            unlockNeed: 1025,
                            icon: 21,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 21,
                            freeGold: "349525333333.33 ",
                            paFreeGold: "26214400000.00 ",
                            turntableGold: "3320490666.67 ",
                            crabGold: 76.8205851,
                            barSpeed: .8,
                            priceAdd: .17,
                            gold: "623328883073.96 ",
                            diamond: "33.64 ",
                            addGold: "69905066.67 ",
                            con: "Double-bandedDwarfCichlid.Lives in Peru,Columbia.Size:8-10cm."
                        }, {
                            fishID: 1022,
                            nextFishID: 1023,
                            unlockNeed: 1026,
                            icon: 3,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 1,
                            level: 22,
                            freeGold: "716748151898.73 ",
                            paFreeGold: "53092455696.20 ",
                            turntableGold: "7255968945.15 ",
                            crabGold: 86.80726116,
                            barSpeed: .79,
                            priceAdd: .17,
                            gold: "1774908216923.66 ",
                            diamond: "37.00 ",
                            addGold: "139810133.33 ",
                            con: "MexicoSuitable water temperature:22-26℃"
                        }, {
                            fishID: 1023,
                            nextFishID: 1024,
                            unlockNeed: 1027,
                            icon: 2,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 23,
                            freeGold: "1555393663548.11 ",
                            paFreeGold: "113809292454.74 ",
                            turntableGold: "16692029560.03 ",
                            crabGold: 98.09220511,
                            barSpeed: .737075841,
                            priceAdd: .19,
                            gold: "5071099608194.79 ",
                            diamond: "40.70 ",
                            addGold: "279620266.67 ",
                            con: "Mikrogeophagus ramirezi.Lives in Olivia Rio Orinoco of Venezuela.Size:6-9cm"
                        }, {
                            fishID: 1024,
                            nextFishID: 1025,
                            unlockNeed: 1028,
                            icon: 24,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 24,
                            freeGold: "3463596133705.92 ",
                            paFreeGold: "250380443400.43 ",
                            turntableGold: "39226269466.07 ",
                            crabGold: 110.8441918,
                            barSpeed: .670068947,
                            priceAdd: .2,
                            gold: "14910350016822.10 ",
                            diamond: "44.77 ",
                            addGold: "559240533.33 ",
                            con: "Paracheirodon axelrodi.Size:4-5cm.A green stripe and a red one in two sides of the body."
                        }, {
                            fishID: 1025,
                            nextFishID: 1026,
                            unlockNeed: 1029,
                            icon: 25,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 25,
                            freeGold: "7711717656733.18 ",
                            paFreeGold: "550836975480.94 ",
                            turntableGold: "91806162580.16 ",
                            crabGold: 125.2539367,
                            barSpeed: .609153588,
                            priceAdd: .25,
                            gold: "44462663750163.50 ",
                            diamond: "49.25 ",
                            addGold: "1118481066.67 ",
                            con: "Ctenopoma acutirostre,size:15cm.Provenance:Congo River of middle of the Africa."
                        }, {
                            fishID: 1026,
                            nextFishID: 1027,
                            unlockNeed: 1030,
                            icon: 9,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 26,
                            freeGold: "17167752402489.40 ",
                            paFreeGold: "1211841346058.07 ",
                            turntableGold: "214091971136.93 ",
                            crabGold: 141.5369485,
                            barSpeed: .553775989,
                            priceAdd: .26,
                            gold: "132752810339774.00 ",
                            diamond: "54.17 ",
                            addGold: "2236962133.33 ",
                            con: "Puffer fishes.Tetraodontidae.Lives in warm temperate zone and tropic.Some species live in rivers."
                        }, {
                            fishID: 1027,
                            nextFishID: 1028,
                            unlockNeed: 1031,
                            icon: 27,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 85,
                            unlockCount: 1,
                            level: 27,
                            freeGold: "38213397112364.50 ",
                            paFreeGold: "2666050961327.76 ",
                            turntableGold: "497662846114.52 ",
                            crabGold: 159.9367518,
                            barSpeed: .503432717,
                            priceAdd: .27,
                            gold: "396930902915924.00 ",
                            diamond: "59.59 ",
                            addGold: "4473924266.67 ",
                            con: "Chelonia mydas,lives in the Atlantic, the Pacific"
                        }, {
                            fishID: 1028,
                            nextFishID: 1029,
                            unlockNeed: 1032,
                            icon: 28,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .4,
                            speed: 80,
                            unlockCount: 1,
                            level: 28,
                            freeGold: "85047025666355.50 ",
                            paFreeGold: "5865312114921.07 ",
                            turntableGold: "1153511382601.14 ",
                            crabGold: 180.7285295,
                            barSpeed: .457666107,
                            priceAdd: .28,
                            gold: "1188721764906470.00 ",
                            diamond: "65.55 ",
                            addGold: "8947848533.33 ",
                            con: "Hemigrammusocellifer,size:4-5cm.Lives in group,eats animal bait.Temperature:22℃一24℃"
                        }, {
                            fishID: 1029,
                            nextFishID: 1030,
                            unlockNeed: 1033,
                            icon: 29,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: .8,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 29,
                            freeGold: "189254070908120.00 ",
                            paFreeGold: "12903686652826.40 ",
                            turntableGold: "2666761908250.78 ",
                            crabGold: 204.2232383,
                            barSpeed: .416060097,
                            priceAdd: .29,
                            gold: "3566165294719410.00 ",
                            diamond: "72.10 ",
                            addGold: "17895697066.67 ",
                            con: "Xiphias gladius,common fish lives in tropic,subtropic,named for its sword maxillary."
                        }, {
                            fishID: 1030,
                            nextFishID: 1031,
                            unlockNeed: 1034,
                            icon: 30,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 85,
                            unlockCount: 1,
                            level: 30,
                            freeGold: "421090307770567.00 ",
                            paFreeGold: "28388110636218.00 ",
                            turntableGold: "6150757304513.90 ",
                            crabGold: 230.7722593,
                            barSpeed: .378236452,
                            priceAdd: .3,
                            gold: "10718466409808700.00 ",
                            diamond: "79.32 ",
                            addGold: "35791394133.33 ",
                            con: "Labidochromis caeruleus,size:8-13cm. Color:lemon yellow,a black stripe on the back extends to tail."
                        }, {
                            fishID: 1031,
                            nextFishID: 1032,
                            unlockNeed: 1035,
                            icon: 13,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 31,
                            freeGold: "936807650995193.00 ",
                            paFreeGold: "62453843399679.60 ",
                            turntableGold: "14156204503927.40 ",
                            crabGold: 260.772653,
                            barSpeed: .34385132,
                            priceAdd: .31,
                            gold: "32279073841846900.00 ",
                            diamond: "87.25 ",
                            addGold: "71582788266.67 ",
                            con: "S. aequifasciata.Size:20cm.Has short tail"
                        }, {
                            fishID: 1032,
                            nextFishID: 1033,
                            unlockNeed: 1036,
                            icon: 23,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .6,
                            speed: 85,
                            unlockCount: 1,
                            level: 32,
                            freeGold: "2083876574769310.00 ",
                            paFreeGold: "137398455479295.00 ",
                            turntableGold: "32517634463433.20 ",
                            crabGold: 294.6730979,
                            barSpeed: .312592109,
                            priceAdd: .32,
                            gold: "97411071727173500.00 ",
                            diamond: "95.97 ",
                            addGold: "143165576533.33 ",
                            con: "Leedsichthys problematicus.En extinct huge Leedsichthys fish.Lives in the middle of theJurassic period"
                        }, {
                            fishID: 1033,
                            nextFishID: 1034,
                            unlockNeed: 1037,
                            icon: 33,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 1,
                            level: 33,
                            freeGold: "4634907898168220.00 ",
                            paFreeGold: "302276602054449.00 ",
                            turntableGold: "74561561840097.50 ",
                            crabGold: 332.9806007,
                            barSpeed: .284174644,
                            priceAdd: .33,
                            gold: "294598912637751000.00 ",
                            diamond: "105.57 ",
                            addGold: "286331153066.67 ",
                            con: "Chrysiptera parasema lives in Philippines and South China Sea.Temp:26-27℃"
                        }, {
                            fishID: 1034,
                            nextFishID: 1035,
                            unlockNeed: 1038,
                            icon: 34,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .4,
                            speed: 85,
                            unlockCount: 1,
                            level: 34,
                            freeGold: "10307632130056700.00 ",
                            paFreeGold: "665008524519788.00 ",
                            turntableGold: "170685521293412.00 ",
                            crabGold: 376.2680788,
                            barSpeed: .258340586,
                            priceAdd: .34,
                            gold: "892939462788214000.00 ",
                            diamond: "116.13 ",
                            addGold: "572662306133.33 ",
                            con: "Aphyosemion australe lives in Gabon and Cape Lopez.Temp:22-27℃"
                        }, {
                            fishID: 1035,
                            nextFishID: 1036,
                            unlockNeed: 1039,
                            icon: 35,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .7,
                            speed: 80,
                            unlockCount: 1,
                            level: 35,
                            freeGold: "22920627145115400.00 ",
                            paFreeGold: "1463018753943530.00 ",
                            turntableGold: "390138334384942.00 ",
                            crabGold: 425.182929,
                            barSpeed: .234855078,
                            priceAdd: .35,
                            gold: "2712750087950580000.00 ",
                            diamond: "127.74 ",
                            addGold: "1145324612266.67 ",
                            con: "Pterophyllum aitum lives in upstream in Orinoco and Rio Negro of Brazil"
                        }, {
                            fishID: 1036,
                            nextFishID: 1037,
                            unlockNeed: 1040,
                            icon: 36,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 90,
                            unlockCount: 1,
                            level: 36,
                            freeGold: "50961819929033100.00 ",
                            paFreeGold: "3218641258675780.00 ",
                            turntableGold: "890490748233631.00 ",
                            crabGold: 480.4567098,
                            barSpeed: .213504616,
                            priceAdd: .36,
                            gold: "8260761558146270000.00 ",
                            diamond: "140.51 ",
                            addGold: "2290649224533.33 ",
                            con: "Centropyge aurantia lives in west of the Pacific,including Australia,Solomon Islands,Indonesia."
                        }, {
                            fishID: 1037,
                            nextFishID: 1038,
                            unlockNeed: 1041,
                            icon: 37,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 37,
                            freeGold: "113296172305387000.00 ",
                            paFreeGold: "7081010769086710.00 ",
                            turntableGold: "2029889753804860.00 ",
                            crabGold: 542.916082,
                            barSpeed: .194095106,
                            priceAdd: .37,
                            gold: "25215974656241400000.00 ",
                            diamond: "154.56 ",
                            addGold: "4581298449066.67 ",
                            con: "Choerodon fasciata,lives in South China Sea,Taiwan,Philippines.Temp:27-28℃"
                        }, {
                            fishID: 1038,
                            nextFishID: 1039,
                            unlockNeed: 1042,
                            icon: 38,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 38,
                            freeGold: "251847949687184000.00 ",
                            paFreeGold: "15578223691990800.00 ",
                            turntableGold: "4621539695290590.00 ",
                            crabGold: 613.4951727,
                            barSpeed: .176450096,
                            priceAdd: .38,
                            gold: "77160882448098400000.00 ",
                            diamond: "170.02 ",
                            addGold: "9162596898133.33 ",
                            con: "Coral-red dwarf pencilfishLatin:Nannostomus mortenthaleriLives in The Amazon River of South America.Size:2-3cm.Good-natured.Temp:24 - 26℃"
                        }, {
                            fishID: 1039,
                            nextFishID: 1040,
                            unlockNeed: 1043,
                            icon: 39,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .3,
                            speed: 90,
                            unlockCount: 1,
                            level: 39,
                            freeGold: "559777504665534000.00 ",
                            paFreeGold: "34272092122379700.00 ",
                            turntableGold: "10510108250863100.00 ",
                            crabGold: 693.2495452,
                            barSpeed: .160409178,
                            priceAdd: .39,
                            gold: "236702354098136000000.00 ",
                            diamond: "187.02 ",
                            addGold: "18325193796266.70 ",
                            con: "Genicanthus watanabei lives in coral reef zone of the middle/west Pacific,including Tuamoto Island,Ryukyu Islands and austral Islands."
                        }, {
                            fishID: 1040,
                            nextFishID: 1041,
                            unlockNeed: 1044,
                            icon: 40,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 40,
                            freeGold: "1244076944042380000.00 ",
                            paFreeGold: "75398602669235300.00 ",
                            turntableGold: "23876224178591200.00 ",
                            crabGold: 783.371986,
                            barSpeed: .145826526,
                            priceAdd: .4,
                            gold: "727961182717809000000.00 ",
                            diamond: "205.72 ",
                            addGold: "36650387592533.30 ",
                            con: "Melanotaenia maccullochi lives in north of Australia.Size:6-8cm.Temp:22-26℃"
                        }, {
                            fishID: 1041,
                            nextFishID: 1042,
                            unlockNeed: 1045,
                            icon: 41,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 70,
                            unlockCount: 1,
                            level: 41,
                            freeGold: "2764615431205290000.00 ",
                            paFreeGold: "165876925872318000.00 ",
                            turntableGold: "54186462451623700.00 ",
                            crabGold: 885.2103442,
                            barSpeed: .132569569,
                            priceAdd: .42,
                            gold: "2244546980046570000000.00 ",
                            diamond: "226.30 ",
                            addGold: "73300775185066.70 ",
                            con: "Pseudochromis porphyreus.Lives in south China,Taiwan,Philippines and coral reef zone of Pacific."
                        }, {
                            fishID: 1042,
                            nextFishID: 1043,
                            unlockNeed: 1046,
                            icon: 42,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 42,
                            freeGold: "6142975488138160000.00 ",
                            paFreeGold: "364929236919099000.00 ",
                            turntableGold: "122859509762763000.00 ",
                            crabGold: 1000.287689,
                            barSpeed: .12051779,
                            priceAdd: .44,
                            gold: "6938683339938540000000.00 ",
                            diamond: "248.93 ",
                            addGold: "146601550370133.00 ",
                            con: "Datnioides microlepis.Lives in rivers of Thailand.Also found in Sumatra.Size:45-50cm.Timid.Temp:23 - 27 ℃"
                        }, {
                            fishID: 1043,
                            nextFishID: 1044,
                            unlockNeed: 1047,
                            icon: 43,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 90,
                            unlockCount: 1,
                            level: 43,
                            freeGold: "13648353460774300000.00 ",
                            paFreeGold: "802844321222017000.00 ",
                            turntableGold: "278319364690299000.00 ",
                            crabGold: 1130.325089,
                            barSpeed: .109561627,
                            priceAdd: .46,
                            gold: "21506266415209400000000.00 ",
                            diamond: "273.82 ",
                            addGold: "293203100740267.00 ",
                            con: "Fundulopanchax gardner lives in Africa.Size:6.5-7.5cm.Good-natured.Temp:22.0 _25EF_25BD_259E 25.0 _25E2_2584_2583"
                        }, {
                            fishID: 1044,
                            nextFishID: 1045,
                            unlockNeed: 1048,
                            icon: 44,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .4,
                            speed: 80,
                            unlockCount: 1,
                            level: 44,
                            freeGold: "30320753864818200000.00 ",
                            paFreeGold: "1766257506688440000.00 ",
                            turntableGold: "629965177385543000.00 ",
                            crabGold: 1277.26735,
                            barSpeed: .099601479,
                            priceAdd: .48,
                            gold: "66834858705727500000000.00 ",
                            diamond: "301.20 ",
                            addGold: "586406201480533.00 ",
                            con: "Pseudochromis porphyreus.Lives in south China,Taiwan,Philippines and coral reef zone of Pacific"
                        }, {
                            fishID: 1045,
                            nextFishID: 1046,
                            unlockNeed: 1049,
                            icon: 45,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 45,
                            freeGold: "67353286255052500000.00 ",
                            paFreeGold: "3885766514714560000.00 ",
                            turntableGold: "1424781055395340000.00 ",
                            crabGold: 1443.312106,
                            barSpeed: .090546799,
                            priceAdd: .5,
                            gold: "208257419727046000000000.00 ",
                            diamond: "331.32 ",
                            addGold: "1172812402961070.00 ",
                            con: "Chrysiptera parasema lives in Philippines and South China Sea.Temp:26-27℃"
                        }, {
                            fishID: 1046,
                            nextFishID: 1047,
                            unlockNeed: 1050,
                            icon: 46,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 46,
                            freeGold: "149602010816511000000.00 ",
                            paFreeGold: "8548686332372040000.00 ",
                            turntableGold: "3220005185193470000.00 ",
                            crabGold: 1630.942679,
                            barSpeed: .082315272,
                            priceAdd: .52,
                            gold: "650677450415477000000000.00 ",
                            diamond: "364.45 ",
                            addGold: "2345624805922130.00 ",
                            con: "Double-bandedDwarfCichlid.Lives in Peru,Columbia.Size:8-10cm"
                        }, {
                            fishID: 1047,
                            nextFishID: 1048,
                            unlockNeed: 1050,
                            icon: 47,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 1,
                            level: 47,
                            freeGold: "332258942118193000000.00 ",
                            paFreeGold: "18807109931218500000.00 ",
                            turntableGold: "7272082506737820000.00 ",
                            crabGold: 1842.965228,
                            barSpeed: .074832066,
                            priceAdd: .54,
                            gold: "2038479498230190000000000.00 ",
                            diamond: "400.90 ",
                            addGold: "4691249611844270.00 ",
                            con: "Cyclopteridae lives in East China Sea."
                        }, {
                            fishID: 1048,
                            nextFishID: 1049,
                            unlockNeed: 1050,
                            icon: 48,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: 1,
                            timeScale: .4,
                            speed: 85,
                            unlockCount: 1,
                            level: 48,
                            freeGold: "737865612968139000000.00 ",
                            paFreeGold: "41375641848680700000.00 ",
                            turntableGold: "16412337933310000000.00 ",
                            crabGold: 2082.550707,
                            barSpeed: .068029151,
                            priceAdd: .56,
                            gold: "6403670014440320000000000.00 ",
                            diamond: "440.99 ",
                            addGold: "9382499223688530.00 ",
                            con: "Dinosaur pisces is an old kind fish.It is a living fossil like arowana."
                        }, {
                            fishID: 1049,
                            nextFishID: 1050,
                            unlockNeed: 1050,
                            icon: 49,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: .8,
                            timeScale: .9,
                            speed: 80,
                            unlockCount: 1,
                            level: 49,
                            freeGold: "1638475417207760000000.00 ",
                            paFreeGold: "91026412067097500000.00 ",
                            turntableGold: "37017407573953000000.00 ",
                            crabGold: 2353.282299,
                            barSpeed: .061844682,
                            priceAdd: .58,
                            gold: "20171560545486900000000000.00 ",
                            diamond: "485.09 ",
                            addGold: "18764998447377100.00 ",
                            con: "Balaenoptera musculus.Mammalia in the sea.Belongs to Mysticeti.4 subspecies."
                        }, {
                            fishID: 1050,
                            unlockNeed: 1050,
                            icon: 50,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: .8,
                            timeScale: .2,
                            speed: 90,
                            unlockCount: 1,
                            level: 50,
                            freeGold: "3638022268948330000000.00 ",
                            paFreeGold: "200258106547615000000.00 ",
                            turntableGold: "83440877728172700000.00 ",
                            crabGold: 2659.208998,
                            barSpeed: .056222438,
                            priceAdd: .6,
                            gold: "63715235909677900000000000.00 ",
                            diamond: "533.59 ",
                            addGold: "37529996894754100.00 ",
                            con: "Shark.Lives in tropic,subtropic sea."
                        }], t = 0; t < e.length; t++)
                        for (var i in this.fishConfig[e[t].fishID] = e[t], e[t])
                            if ("freeGold" == i || "paFreeGold" == i || "turntableGold" == i || "gold" == i || "diamond" == i || "addGold" == i) {
                                for (var n = (l = e[t][i].toString()).substring(0, l.indexOf(".")), a = [], o = 0; o < Math.ceil(n.length / 3); o++) {
                                    var s = n.substring(n.length - 3 * (o + 1), n.length - 3 * o);
                                    a.push(parseInt(s))
                                }
                                e[t][i] = a
                            }
                } else if ("2" == this.configureTable.config)
                    for (e = [{
                            fishID: 1001,
                            nextFishID: 1002,
                            unlockNeed: null,
                            icon: 1,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .6,
                            speed: 80,
                            unlockCount: 0,
                            level: 1,
                            freeGold: "300000.00 ",
                            paFreeGold: "125000.00 ",
                            turntableGold: "25000.00 ",
                            crabGold: 10,
                            barSpeed: 4,
                            priceAdd: .07,
                            gold: "100.00 ",
                            diamond: "5.00 ",
                            addGold: "300.00 ",
                            con: "Gold coin generation speed 4S"
                        }, {
                            fishID: 1002,
                            nextFishID: 1003,
                            unlockNeed: 1004,
                            icon: 4,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .8,
                            speed: 110,
                            unlockCount: 1,
                            level: 2,
                            freeGold: "616161.62 ",
                            paFreeGold: "242424.24 ",
                            turntableGold: "48484.85 ",
                            crabGold: 11.3,
                            barSpeed: 3.99,
                            priceAdd: .08,
                            gold: "200.00 ",
                            diamond: "5.50 ",
                            addGold: "606.06 ",
                            con: "Gold coin generation speed 3.99S"
                        }, {
                            fishID: 1003,
                            nextFishID: 1004,
                            unlockNeed: 1007,
                            icon: 13,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .8,
                            speed: 170,
                            unlockCount: 1,
                            level: 3,
                            freeGold: "1265306.12 ",
                            paFreeGold: "448979.59 ",
                            turntableGold: "93877.55 ",
                            crabGold: 12.769,
                            barSpeed: 3.98,
                            priceAdd: .09,
                            gold: "800.00 ",
                            diamond: "6.05 ",
                            addGold: "1224.49 ",
                            con: "Gold coin generation speed 3.98S"
                        }, {
                            fishID: 1004,
                            nextFishID: 1005,
                            unlockNeed: 1008,
                            icon: 9,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .7,
                            speed: 150,
                            unlockCount: 1,
                            level: 4,
                            freeGold: "2597938.14 ",
                            paFreeGold: "824742.27 ",
                            turntableGold: "181443.30 ",
                            crabGold: 14.42897,
                            barSpeed: 3.97,
                            priceAdd: .095,
                            gold: "5800.00 ",
                            diamond: "6.66 ",
                            addGold: "2474.23 ",
                            con: "Gold coin generation speed 3.97S"
                        }, {
                            fishID: 1005,
                            nextFishID: 1006,
                            unlockNeed: 1009,
                            icon: 24,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .8,
                            speed: 70,
                            unlockCount: 1,
                            level: 5,
                            freeGold: "5333333.33 ",
                            paFreeGold: "1500000.00 ",
                            turntableGold: "350000.00 ",
                            crabGold: 16.3047361,
                            barSpeed: 3.96,
                            priceAdd: .1,
                            gold: "47760.00 ",
                            diamond: "7.32 ",
                            addGold: "5000.00 ",
                            con: "Gold coin generation speed 3.96S"
                        }, {
                            fishID: 1006,
                            nextFishID: 1007,
                            unlockNeed: 1010,
                            icon: 27,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .6,
                            speed: 120,
                            unlockCount: 1,
                            level: 6,
                            freeGold: "10947368.42 ",
                            paFreeGold: "2694736.84 ",
                            turntableGold: "673684.21 ",
                            crabGold: 18.42435179,
                            barSpeed: 3.95,
                            priceAdd: .105,
                            gold: "127041.00 ",
                            diamond: "8.05 ",
                            addGold: "10105.26 ",
                            con: "Gold coin generation speed 3.95S"
                        }, {
                            fishID: 1007,
                            nextFishID: 1008,
                            unlockNeed: 1011,
                            icon: 28,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .5,
                            speed: 130,
                            unlockCount: 1,
                            level: 7,
                            freeGold: "22468085.11 ",
                            paFreeGold: "4765957.45 ",
                            turntableGold: "1293617.02 ",
                            crabGold: 20.81951753,
                            barSpeed: 3.94,
                            priceAdd: .11,
                            gold: "339199.47 ",
                            diamond: "8.86 ",
                            addGold: "20425.53 ",
                            con: "Gold coin generation speed 3.94S"
                        }, {
                            fishID: 1008,
                            nextFishID: 1009,
                            unlockNeed: 1012,
                            icon: 29,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: .8,
                            timeScale: .5,
                            speed: 125,
                            unlockCount: 1,
                            level: 8,
                            freeGold: "46107526.88 ",
                            paFreeGold: "8258064.52 ",
                            turntableGold: "2477419.35 ",
                            crabGold: 23.5260548,
                            barSpeed: 3.93,
                            priceAdd: .115,
                            gold: "909054.58 ",
                            diamond: "9.74 ",
                            addGold: "41290.32 ",
                            con: "Gold coin generation speed 3.93S"
                        }, {
                            fishID: 1009,
                            nextFishID: 1010,
                            unlockNeed: 1013,
                            icon: 30,
                            touchBarSpeed: 10,
                            spineScale: 1,
                            scale: 1,
                            timeScale: .6,
                            speed: 120,
                            unlockCount: 1,
                            level: 9,
                            freeGold: "94608695.65 ",
                            paFreeGold: "15304347.83 ",
                            turntableGold: "4730434.78 ",
                            crabGold: 26.58444193,
                            barSpeed: 3.92,
                            priceAdd: .12,
                            gold: "2445356.82 ",
                            diamond: "10.72 ",
                            addGold: "83478.26 ",
                            con: "Gold coin generation speed 2.92S"
                        }, {
                            fishID: 1010,
                            nextFishID: 1011,
                            unlockNeed: 1014,
                            icon: 10,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .8,
                            speed: 145,
                            unlockCount: 1,
                            level: 10,
                            freeGold: "194109890.11 ",
                            paFreeGold: "28131868.13 ",
                            turntableGold: "9002197.80 ",
                            crabGold: 30.04041938,
                            barSpeed: 3.91,
                            priceAdd: .125,
                            gold: "6602463.41 ",
                            diamond: "11.79 ",
                            addGold: "168791.21 ",
                            con: "Gold coin generation speed 2.910S"
                        }, {
                            fishID: 1011,
                            nextFishID: 1012,
                            unlockNeed: 1015,
                            icon: 31,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: 1,
                            speed: 128,
                            unlockCount: 1,
                            level: 11,
                            freeGold: "398222222.22 ",
                            paFreeGold: "56888888.89 ",
                            turntableGold: "17066666.67 ",
                            crabGold: 33.9456739,
                            barSpeed: 3.9,
                            priceAdd: .13,
                            gold: "17892675.85 ",
                            diamond: "12.97 ",
                            addGold: "341333.33 ",
                            con: "Gold coin generation speed 3.90S"
                        }, {
                            fishID: 1012,
                            nextFishID: 1013,
                            unlockNeed: 1016,
                            icon: 12,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: 1.1,
                            speed: 125,
                            unlockCount: 1,
                            level: 12,
                            freeGold: "816898876.40 ",
                            paFreeGold: "115056179.78 ",
                            turntableGold: "32215730.34 ",
                            crabGold: 38.35861151,
                            barSpeed: 3.89,
                            priceAdd: .135,
                            gold: "48668078.30 ",
                            diamond: "14.27 ",
                            addGold: "690337.08 ",
                            con: "Gold coin generation speed 3.89S"
                        }, {
                            fishID: 1013,
                            nextFishID: 1014,
                            unlockNeed: 1017,
                            icon: 22,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .6,
                            speed: 160,
                            unlockCount: 1,
                            level: 13,
                            freeGold: "1675636363.64 ",
                            paFreeGold: "232727272.73 ",
                            turntableGold: "60509090.91 ",
                            crabGold: 43.345231,
                            barSpeed: 3.88,
                            priceAdd: .14,
                            gold: "132863853.76 ",
                            diamond: "15.69 ",
                            addGold: "1396363.64 ",
                            con: "Gold coin generation speed 3.88S"
                        }, {
                            fishID: 1014,
                            nextFishID: 1015,
                            unlockNeed: 1018,
                            icon: 14,
                            touchBarSpeed: 10,
                            spineScale: 1.1,
                            scale: 1,
                            timeScale: .8,
                            speed: 171,
                            unlockCount: 1,
                            level: 14,
                            freeGold: "3436873563.22 ",
                            paFreeGold: "470804597.70 ",
                            turntableGold: "112993103.45 ",
                            crabGold: 48.98011103,
                            barSpeed: 3.87,
                            priceAdd: .145,
                            gold: "364046959.30 ",
                            diamond: "17.26 ",
                            addGold: "2824827.59 ",
                            con: "Gold coin generation speed 3.87S"
                        }, {
                            fishID: 1015,
                            nextFishID: 1016,
                            unlockNeed: 1019,
                            icon: 15,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .6,
                            speed: 132,
                            unlockCount: 1,
                            level: 15,
                            freeGold: "7048930232.56 ",
                            paFreeGold: "952558139.53 ",
                            turntableGold: "209562790.70 ",
                            crabGold: 55.34752547,
                            barSpeed: 3.86,
                            priceAdd: .15,
                            gold: "1001129138.07 ",
                            diamond: "18.99 ",
                            addGold: "5715348.84 ",
                            con: "Gold coin generation speed 3.86S"
                        }, {
                            fishID: 1016,
                            nextFishID: 1017,
                            unlockNeed: 1020,
                            icon: 16,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .5,
                            speed: 123,
                            unlockCount: 1,
                            level: 16,
                            freeGold: "14456470588.24 ",
                            paFreeGold: "1927529411.76 ",
                            turntableGold: "385505882.35 ",
                            crabGold: 62.54270378,
                            barSpeed: 3.85,
                            priceAdd: .155,
                            gold: "2763116421.08 ",
                            diamond: "20.89 ",
                            addGold: "11565176.47 ",
                            con: "Gold coin generation speed 3.85S"
                        }, {
                            fishID: 1017,
                            nextFishID: 1018,
                            unlockNeed: 1021,
                            icon: 17,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .6,
                            speed: 164,
                            unlockCount: 1,
                            level: 17,
                            freeGold: "29647238095.24 ",
                            paFreeGold: "3900952380.95 ",
                            turntableGold: "702171428.57 ",
                            crabGold: 70.67325527,
                            barSpeed: 3.84,
                            priceAdd: .16,
                            gold: "7653832486.38 ",
                            diamond: "22.97 ",
                            addGold: "23405714.29 ",
                            con: "Gold coin generation speed 3.84S"
                        }, {
                            fishID: 1018,
                            nextFishID: 1019,
                            unlockNeed: 1022,
                            icon: 18,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .7,
                            speed: 125,
                            unlockCount: 1,
                            level: 18,
                            freeGold: "60798457831.33 ",
                            paFreeGold: "7895903614.46 ",
                            turntableGold: "1263344578.31 ",
                            crabGold: 79.86077845,
                            barSpeed: 3.83,
                            priceAdd: .165,
                            gold: "21277654312.13 ",
                            diamond: "25.27 ",
                            addGold: "47375421.69 ",
                            con: "Gold coin generation speed 3.83S"
                        }, {
                            fishID: 1019,
                            nextFishID: 1020,
                            unlockNeed: 1023,
                            icon: 19,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .6,
                            speed: 186,
                            unlockCount: 1,
                            level: 19,
                            freeGold: "124678243902.44 ",
                            paFreeGold: "15984390243.90 ",
                            turntableGold: "2237814634.15 ",
                            crabGold: 90.24267965,
                            barSpeed: 3.82,
                            priceAdd: .17,
                            gold: "59364655530.85 ",
                            diamond: "27.80 ",
                            addGold: "95906341.46 ",
                            con: "Gold coin generation speed 3.82S"
                        }, {
                            fishID: 1020,
                            nextFishID: 1021,
                            unlockNeed: 1024,
                            icon: 20,
                            touchBarSpeed: 10,
                            spineScale: 1.2,
                            scale: 1,
                            timeScale: .5,
                            speed: 127,
                            unlockCount: 1,
                            level: 20,
                            freeGold: "255671308641.98 ",
                            paFreeGold: "32363456790.12 ",
                            turntableGold: "3883614814.81 ",
                            crabGold: 101.974228,
                            barSpeed: 3.81,
                            priceAdd: .175,
                            gold: "166221035486.39 ",
                            diamond: "30.58 ",
                            addGold: "194180740.74 ",
                            con: "Gold coin generation speed 3.81S"
                        }, {
                            fishID: 1021,
                            nextFishID: 1022,
                            unlockNeed: 1025,
                            icon: 21,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .6,
                            speed: 128,
                            unlockCount: 1,
                            level: 21,
                            freeGold: "524288000000.00 ",
                            paFreeGold: "65536000000.00 ",
                            turntableGold: "7864320000.00 ",
                            crabGold: 115.2308776,
                            barSpeed: 3.8,
                            priceAdd: .18,
                            gold: "467081109716.75 ",
                            diamond: "33.64 ",
                            addGold: "393216000.00 ",
                            con: "Gold coin generation speed 3.8S"
                        }, {
                            fishID: 1022,
                            nextFishID: 1023,
                            unlockNeed: 1026,
                            icon: 6,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .6,
                            speed: 160,
                            unlockCount: 1,
                            level: 22,
                            freeGold: "1075122227848.10 ",
                            paFreeGold: "132731139240.51 ",
                            turntableGold: "15927736708.86 ",
                            crabGold: 130.2108917,
                            barSpeed: 3.79,
                            priceAdd: .185,
                            gold: "1317168729401.25 ",
                            diamond: "37.00 ",
                            addGold: "796386835.44 ",
                            con: "Gold coin generation speed 3.79S"
                        }, {
                            fishID: 1023,
                            nextFishID: 1024,
                            unlockNeed: 1027,
                            icon: 23,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .7,
                            speed: 110,
                            unlockCount: 1,
                            level: 23,
                            freeGold: "2333090495322.17 ",
                            paFreeGold: "284523231136.85 ",
                            turntableGold: "34142787736.42 ",
                            crabGold: 147.1383077,
                            barSpeed: 3.737075841,
                            priceAdd: .19,
                            gold: "3727587504205.52 ",
                            diamond: "40.70 ",
                            addGold: "1707139386.82 ",
                            con: "Gold coin generation speed 3.737S"
                        }, {
                            fishID: 1024,
                            nextFishID: 1025,
                            unlockNeed: 1028,
                            icon: 5,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .6,
                            speed: 150,
                            unlockCount: 1,
                            level: 24,
                            freeGold: "5195394200558.88 ",
                            paFreeGold: "625951108501.07 ",
                            turntableGold: "75114133020.13 ",
                            crabGold: 166.2662877,
                            barSpeed: 3.670068947,
                            priceAdd: .195,
                            gold: "10586348511943.70 ",
                            diamond: "44.77 ",
                            addGold: "3755706651.01 ",
                            con: "Gold coin generation speed 3.67S"
                        }, {
                            fishID: 1025,
                            nextFishID: 1026,
                            unlockNeed: 1029,
                            icon: 25,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .7,
                            speed: 120,
                            unlockCount: 1,
                            level: 25,
                            freeGold: "11567576485099.80 ",
                            paFreeGold: "1377092438702.35 ",
                            turntableGold: "165251092644.28 ",
                            crabGold: 187.8809051,
                            barSpeed: 3.609153588,
                            priceAdd: .2,
                            gold: "30171093259039.50 ",
                            diamond: "49.25 ",
                            addGold: "11016739509.62 ",
                            con: "Gold coin generation speed 3.609S"
                        }, {
                            fishID: 1026,
                            nextFishID: 1027,
                            unlockNeed: 1030,
                            icon: 26,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 80,
                            unlockCount: 1,
                            level: 26,
                            freeGold: "25751628603734.00 ",
                            paFreeGold: "3029603365145.18 ",
                            turntableGold: "363552403817.42 ",
                            crabGold: 212.3054227,
                            barSpeed: 3.553775989,
                            priceAdd: .205,
                            gold: "86289326720853.00 ",
                            diamond: "54.17 ",
                            addGold: "24236826921.16 ",
                            con: "Gold coin generation speed 3.554S"
                        }, {
                            fishID: 1027,
                            nextFishID: 1028,
                            unlockNeed: 1031,
                            icon: 2,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .5,
                            speed: 90,
                            unlockCount: 1,
                            level: 27,
                            freeGold: "57320095668546.80 ",
                            paFreeGold: "6665127403319.40 ",
                            turntableGold: "799815288398.33 ",
                            crabGold: 239.9051277,
                            barSpeed: 3.503432717,
                            priceAdd: .21,
                            gold: "247650367688848.00 ",
                            diamond: "59.59 ",
                            addGold: "53321019226.56 ",
                            con: "Gold coin generation speed 3.503S"
                        }, {
                            fishID: 1028,
                            nextFishID: 1029,
                            unlockNeed: 1032,
                            icon: 7,
                            touchBarSpeed: 10,
                            spineScale: 1.3,
                            scale: 1,
                            timeScale: .8,
                            speed: 110,
                            unlockCount: 1,
                            level: 28,
                            freeGold: "127570538499533.00 ",
                            paFreeGold: "14663280287302.70 ",
                            turntableGold: "1759593634476.32 ",
                            crabGold: 271.0927943,
                            barSpeed: 3.457666107,
                            priceAdd: .215,
                            gold: "713233058943883.00 ",
                            diamond: "65.55 ",
                            addGold: "117306242298.42 ",
                            con: "Gold coin generation speed 3.458S"
                        }, {
                            fishID: 1029,
                            nextFishID: 1030,
                            unlockNeed: 1033,
                            icon: 8,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: .8,
                            timeScale: .5,
                            speed: 130,
                            unlockCount: 1,
                            level: 29,
                            freeGold: "283881106362180.00 ",
                            paFreeGold: "32259216632065.90 ",
                            turntableGold: "3871105995847.91 ",
                            crabGold: 306.3348575,
                            barSpeed: 3.416060097,
                            priceAdd: .22,
                            gold: "2061243540347820.00 ",
                            diamond: "72.10 ",
                            addGold: "258073733056.53 ",
                            con: "Gold coin generation speed 3.416S"
                        }, {
                            fishID: 1030,
                            nextFishID: 1031,
                            unlockNeed: 1034,
                            icon: 3,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .9,
                            speed: 120,
                            unlockCount: 1,
                            level: 30,
                            freeGold: "631635461655850.00 ",
                            paFreeGold: "70970276590545.00 ",
                            turntableGold: "8516433190865.39 ",
                            crabGold: 346.158389,
                            barSpeed: 3.378236452,
                            priceAdd: .22,
                            gold: "5977606267008680.00 ",
                            diamond: "79.32 ",
                            addGold: "567762212724.36 ",
                            con: "Gold coin generation speed 3.378S"
                        }, {
                            fishID: 1031,
                            nextFishID: 1032,
                            unlockNeed: 1035,
                            icon: 11,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .8,
                            speed: 125,
                            unlockCount: 1,
                            level: 31,
                            freeGold: "1405211476492790.00 ",
                            paFreeGold: "156134608499199.00 ",
                            turntableGold: "18736153019903.90 ",
                            crabGold: 391.1589796,
                            barSpeed: 3.34385132,
                            priceAdd: .22,
                            gold: "17394834236995300.00 ",
                            diamond: "87.25 ",
                            addGold: "1249076867993.59 ",
                            con: "Gold coin generation speed 3.344S"
                        }, {
                            fishID: 1032,
                            nextFishID: 1033,
                            unlockNeed: 1036,
                            icon: 32,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .6,
                            speed: 115,
                            unlockCount: 1,
                            level: 32,
                            freeGold: "3125814862153960.00 ",
                            paFreeGold: "343496138698238.00 ",
                            turntableGold: "41219536643788.50 ",
                            crabGold: 442.0096469,
                            barSpeed: 3.312592109,
                            priceAdd: .22,
                            gold: "50792915972026000.00 ",
                            diamond: "95.97 ",
                            addGold: "2747969109585.90 ",
                            con: "Gold coin generation speed 3.313S"
                        }, {
                            fishID: 1033,
                            nextFishID: 1034,
                            unlockNeed: 1037,
                            icon: 33,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .6,
                            speed: 110,
                            unlockCount: 1,
                            level: 33,
                            freeGold: "6952361847252330.00 ",
                            paFreeGold: "755691505136123.00 ",
                            turntableGold: "90682980616334.70 ",
                            crabGold: 499.470901,
                            barSpeed: 3.284174644,
                            priceAdd: .22,
                            gold: "148823243798036000.00 ",
                            diamond: "105.57 ",
                            addGold: "6045532041088.98 ",
                            con: "Gold coin generation speed 3.28S"
                        }, {
                            fishID: 1034,
                            nextFishID: 1035,
                            unlockNeed: 1038,
                            icon: 34,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .7,
                            speed: 175,
                            unlockCount: 1,
                            level: 34,
                            freeGold: "15461448195085100.00 ",
                            paFreeGold: "1662521311299470.00 ",
                            turntableGold: "199502557355936.00 ",
                            crabGold: 564.4021181,
                            barSpeed: 3.258340586,
                            priceAdd: .22,
                            gold: "437540336766223000.00 ",
                            diamond: "116.13 ",
                            addGold: "13300170490395.80 ",
                            con: "Gold coin generation speed 3.26S"
                        }, {
                            fishID: 1035,
                            nextFishID: 1036,
                            unlockNeed: 1039,
                            icon: 35,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .7,
                            speed: 115,
                            unlockCount: 1,
                            level: 35,
                            freeGold: "34380940717673100.00 ",
                            paFreeGold: "3657546884858840.00 ",
                            turntableGold: "438905626183060.00 ",
                            crabGold: 637.7743935,
                            barSpeed: 3.234855078,
                            priceAdd: .22,
                            gold: "1290743993460350000.00 ",
                            diamond: "127.74 ",
                            addGold: "29260375078870.70 ",
                            con: "Gold coin generation speed 3.23S"
                        }, {
                            fishID: 1036,
                            nextFishID: 1037,
                            unlockNeed: 1040,
                            icon: 36,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 75,
                            unlockCount: 1,
                            level: 36,
                            freeGold: "76442729893549700.00 ",
                            paFreeGold: "8046603146689440.00 ",
                            turntableGold: "965592377602733.00 ",
                            crabGold: 720.6850647,
                            barSpeed: 3.213504616,
                            priceAdd: .22,
                            gold: "3820602220642640000.00 ",
                            diamond: "140.51 ",
                            addGold: "64372825173515.50 ",
                            con: "Gold coin generation speed 3.21S"
                        }, {
                            fishID: 1037,
                            nextFishID: 1038,
                            unlockNeed: 1041,
                            icon: 37,
                            touchBarSpeed: 10,
                            spineScale: 1.4,
                            scale: 1,
                            timeScale: .5,
                            speed: 200,
                            unlockCount: 1,
                            level: 37,
                            freeGold: "169944258458081000.00 ",
                            paFreeGold: "17702526922716800.00 ",
                            turntableGold: "2124303230726010.00 ",
                            crabGold: 814.3741231,
                            barSpeed: 3.194095106,
                            priceAdd: .22,
                            gold: "11347188595308600000.00 ",
                            diamond: "154.56 ",
                            addGold: "141620215381734.00 ",
                            con: "Gold coin generation speed 3.19S"
                        }, {
                            fishID: 1038,
                            nextFishID: 1039,
                            unlockNeed: 1042,
                            icon: 38,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .5,
                            speed: 135,
                            unlockCount: 1,
                            level: 38,
                            freeGold: "377771924530776000.00 ",
                            paFreeGold: "38945559229976900.00 ",
                            turntableGold: "4673467107597230.00 ",
                            crabGold: 920.2427591,
                            barSpeed: 3.176450096,
                            priceAdd: .22,
                            gold: "33814622014019500000.00 ",
                            diamond: "170.02 ",
                            addGold: "311564473839815.00 ",
                            con: "Gold coin generation speed 3.18S"
                        }, {
                            fishID: 1039,
                            nextFishID: 1040,
                            unlockNeed: 1043,
                            icon: 39,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .8,
                            speed: 145,
                            unlockCount: 1,
                            level: 39,
                            freeGold: "839666256998302000.00 ",
                            paFreeGold: "85680230305949200.00 ",
                            turntableGold: "10281627636713900.00 ",
                            crabGold: 1039.874318,
                            barSpeed: 3.160409178,
                            priceAdd: .22,
                            gold: "101105719821918000000.00 ",
                            diamond: "187.02 ",
                            addGold: "685441842447593.00 ",
                            con: "Gold coin generation speed 3.16S"
                        }, {
                            fishID: 1040,
                            nextFishID: 1041,
                            unlockNeed: 1044,
                            icon: 40,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .7,
                            speed: 115,
                            unlockCount: 1,
                            level: 40,
                            freeGold: "1866115416063570000.00 ",
                            paFreeGold: "188496506673088000.00 ",
                            turntableGold: "22619580800770600.00 ",
                            crabGold: 1175.057979,
                            barSpeed: 3.145826526,
                            priceAdd: .22,
                            gold: "303317159465753000000.00 ",
                            diamond: "205.72 ",
                            addGold: "1507972053384710.00 ",
                            con: "Gold coin generation speed 3.15S"
                        }, {
                            fishID: 1041,
                            nextFishID: 1042,
                            unlockNeed: 1045,
                            icon: 41,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .6,
                            speed: 165,
                            unlockCount: 1,
                            level: 41,
                            freeGold: "4146923146807940000.00 ",
                            paFreeGold: "414692314680794000.00 ",
                            turntableGold: "49763077761695300.00 ",
                            crabGold: 1327.815516,
                            barSpeed: 3.132569569,
                            priceAdd: .22,
                            gold: "912984649991913000000.00 ",
                            diamond: "226.30 ",
                            addGold: "3317538517446350.00 ",
                            con: "Gold coin generation speed 3.13S"
                        }, {
                            fishID: 1042,
                            nextFishID: 1043,
                            unlockNeed: 1046,
                            icon: 42,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .8,
                            speed: 155,
                            unlockCount: 1,
                            level: 42,
                            freeGold: "9214463232207240000.00 ",
                            paFreeGold: "912323092297747000.00 ",
                            turntableGold: "109478771075730000.00 ",
                            crabGold: 1500.431533,
                            barSpeed: 3.12051779,
                            priceAdd: .22,
                            gold: "2757213642975570000000.00 ",
                            diamond: "248.93 ",
                            addGold: "7298584738381970.00 ",
                            con: "Gold coin generation speed 3.12S"
                        }, {
                            fishID: 1043,
                            nextFishID: 1044,
                            unlockNeed: 1047,
                            icon: 43,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .9,
                            speed: 115,
                            unlockCount: 1,
                            level: 43,
                            freeGold: "20472530191161400000.00 ",
                            paFreeGold: "2007110803055040000.00 ",
                            turntableGold: "240853296366605000.00 ",
                            crabGold: 1695.487633,
                            barSpeed: 3.109561627,
                            priceAdd: .22,
                            gold: "8354357338215940000000.00 ",
                            diamond: "273.82 ",
                            addGold: "16056886424440300.00 ",
                            con: "Gold coin generation speed 3.11S"
                        }, {
                            fishID: 1044,
                            nextFishID: 1045,
                            unlockNeed: null,
                            icon: 44,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .6,
                            speed: 95,
                            unlockCount: 1,
                            level: 44,
                            freeGold: "45481130797227300000.00 ",
                            paFreeGold: "4415643766721100000.00 ",
                            turntableGold: "529877252006531000.00 ",
                            crabGold: 1915.901025,
                            barSpeed: 3.099601479,
                            priceAdd: .22,
                            gold: "25397246308176400000000.00 ",
                            diamond: "301.20 ",
                            addGold: "35325150133768800.00 ",
                            con: "Gold coin generation speed 3.1S"
                        }, {
                            fishID: 1045,
                            nextFishID: 1046,
                            unlockNeed: null,
                            icon: 45,
                            touchBarSpeed: 10,
                            spineScale: 1.5,
                            scale: 1,
                            timeScale: .8,
                            speed: 135,
                            unlockCount: 1,
                            level: 45,
                            freeGold: "101029929382579000000.00 ",
                            paFreeGold: "9714416286786410000.00 ",
                            turntableGold: "1165729954414370000.00 ",
                            crabGold: 2164.968158,
                            barSpeed: 3.090546799,
                            priceAdd: .22,
                            gold: "77461601239937700000000.00 ",
                            diamond: "331.32 ",
                            addGold: "77715330294291300.00 ",
                            con: "Gold coin generation speed 3.09S"
                        }, {
                            fishID: 1046,
                            nextFishID: 1047,
                            unlockNeed: null,
                            icon: 46,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: 1,
                            timeScale: .6,
                            speed: 90,
                            unlockCount: 1,
                            level: 46,
                            freeGold: "224403016224766000000.00 ",
                            paFreeGold: "21371715830930100000.00 ",
                            turntableGold: "2564605899711610000.00 ",
                            crabGold: 2446.414019,
                            barSpeed: 3.082315272,
                            priceAdd: .22,
                            gold: "237032499794209000000000.00 ",
                            diamond: "364.45 ",
                            addGold: "170973726647441000.00 ",
                            con: "Gold coin generation speed 3.08S"
                        }, {
                            fishID: 1047,
                            unlockNeed: null,
                            icon: 47,
                            touchBarSpeed: 10,
                            spineScale: 1.6,
                            scale: 1,
                            timeScale: .7,
                            speed: 90,
                            unlockCount: 1,
                            level: 47,
                            freeGold: "498388413177290000000.00 ",
                            paFreeGold: "47017774828046200000.00 ",
                            turntableGold: "5642132979365550000.00 ",
                            crabGold: 2764.447841,
                            barSpeed: 3.074832066,
                            priceAdd: .22,
                            gold: "727689774368218000000000.00 ",
                            diamond: "400.90 ",
                            addGold: "376142198624370000.00 ",
                            con: "Gold coin generation speed 3.07S"
                        }], t = 0; t < e.length; t++)
                        for (var i in this.fishConfig[e[t].fishID] = e[t], e[t])
                            if ("freeGold" == i || "paFreeGold" == i || "turntableGold" == i || "gold" == i || "diamond" == i || "addGold" == i) {
                                var l;
                                for (n = (l = e[t][i].toString()).substring(0, l.indexOf(".")), a = [], o = 0; o < Math.ceil(n.length / 3); o++) {
                                    s = n.substring(n.length - 3 * (o + 1), n.length - 3 * o);
                                    a.push(parseInt(s))
                                }
                                e[t][i] = a
                            } for (var r in this.highestFishLevel = 1, this.fishConfig) this.highestFishLevel < this.fishConfig[r].level && (this.highestFishLevel = this.fishConfig[r].level)
            },
            initActionConfig: function() {
                this.speedUpTime = 12e4, this.saveDataCD = 2e3, this.freeGoldWaitTime = 3e5, this.outLineGetGold = 5, this.upMaxTimes = 5, this.advMaxTimes = 0
            },
            initVariationConfig: function() {
                this.shopVariationPro = .15, this.variationAddLv = 2, this.variationTypeEm = cc.Enum({
                    combine: 1,
                    shopBuy: 2
                })
            },
            initOpenFreeLevel: function() {
                this.openFreeLevel = 7
            },
            getVariationTimes: function() {
                return this.getRandomInt(6, 8)
            },
            getRandomInt: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            },
            initializeShopFishData: function() {
                this.achievementConfig = new Object, "1" == this.configureTable.config ? (this.achievementConfig[1001] = {
                    achievementID: "1001",
                    diamond: [5],
                    des: "50 fish, the comprehensive level is 3.",
                    conditionType: "2",
                    fishID: "1003",
                    conditionCount: [50]
                }, this.achievementConfig[1002] = {
                    achievementID: "1002",
                    diamond: [10],
                    des: "100 fish, with a combined level of 3",
                    conditionType: "2",
                    fishID: "1003",
                    conditionCount: [100]
                }, this.achievementConfig[1003] = {
                    achievementID: "1003",
                    diamond: [5],
                    des: "50 fish, with a combined level of 5",
                    conditionType: "2",
                    fishID: "1005",
                    conditionCount: [50]
                }, this.achievementConfig[1004] = {
                    achievementID: "1004",
                    diamond: [10],
                    des: "100 fish, with a combined level of 5",
                    conditionType: "2",
                    fishID: "1005",
                    conditionCount: [100]
                }, this.achievementConfig[1005] = {
                    achievementID: "1005",
                    diamond: [5],
                    des: "50 fish, with a combined level of 6",
                    conditionType: "2",
                    fishID: "1006",
                    conditionCount: [50]
                }, this.achievementConfig[1006] = {
                    achievementID: "1006",
                    diamond: [10],
                    des: "100 fish, with a combined level of 6",
                    conditionType: "2",
                    fishID: "1006",
                    conditionCount: [100]
                }, this.achievementConfig[1007] = {
                    achievementID: "1007",
                    diamond: [5],
                    des: "50 fish, with a combined level of 7",
                    conditionType: "2",
                    fishID: "1007",
                    conditionCount: [50]
                }, this.achievementConfig[1008] = {
                    achievementID: "1008",
                    diamond: [10],
                    des: "100 fish, with a combined level of 7",
                    conditionType: "2",
                    fishID: "1007",
                    conditionCount: [100]
                }, this.achievementConfig[1009] = {
                    achievementID: "1009",
                    diamond: [5],
                    des: "50 fish, with a combined level of 9",
                    conditionType: "2",
                    fishID: "1009",
                    conditionCount: [50]
                }, this.achievementConfig[1010] = {
                    achievementID: "1010",
                    diamond: [10],
                    des: "100 fish, with a combined level of 9",
                    conditionType: "2",
                    fishID: "1009",
                    conditionCount: [100]
                }, this.achievementConfig[1011] = {
                    achievementID: "1011",
                    diamond: [10],
                    des: "100 fish, with a combined level of 10.",
                    conditionType: "2",
                    fishID: "1010",
                    conditionCount: [100]
                }, this.achievementConfig[1012] = {
                    achievementID: "1012",
                    diamond: [5],
                    des: "20 fish, with a combined level of 11",
                    conditionType: "2",
                    fishID: "1011",
                    conditionCount: [20]
                }, this.achievementConfig[1013] = {
                    achievementID: "1013",
                    diamond: [5],
                    des: "20 fish, with a combined level of 15",
                    conditionType: "2",
                    fishID: "1015",
                    conditionCount: [20]
                }, this.achievementConfig[1014] = {
                    achievementID: "1014",
                    diamond: [5],
                    des: "25 fish, with a combined level of 16",
                    conditionType: "2",
                    fishID: "1016",
                    conditionCount: [25]
                }, this.achievementConfig[1015] = {
                    achievementID: "1015",
                    diamond: [5],
                    des: "25 fish, with a combined level of 17",
                    conditionType: "2",
                    fishID: "1017",
                    conditionCount: [25]
                }, this.achievementConfig[1016] = {
                    achievementID: "1016",
                    diamond: [5],
                    des: "15 fish, with a combined level of 18",
                    conditionType: "2",
                    fishID: "1018",
                    conditionCount: [15]
                }, this.achievementConfig[1017] = {
                    achievementID: "1017",
                    diamond: [5],
                    des: "15 fish, with a combined level of 20",
                    conditionType: "2",
                    fishID: "1020",
                    conditionCount: [15]
                }, this.achievementConfig[1018] = {
                    achievementID: "1018",
                    diamond: [5],
                    des: "15 fish, with a combined level of 24",
                    conditionType: "2",
                    fishID: "1024",
                    conditionCount: [15]
                }, this.achievementConfig[1019] = {
                    achievementID: "1019",
                    diamond: [5],
                    des: "Earn 100K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 100]
                }, this.achievementConfig[1020] = {
                    achievementID: "1020",
                    diamond: [5],
                    des: "Earn400K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 400]
                }, this.achievementConfig[1021] = {
                    achievementID: "1021",
                    diamond: [5],
                    des: "Earn 800K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 800]
                }, this.achievementConfig[1022] = {
                    achievementID: "1022",
                    diamond: [5],
                    des: "Earn 2000K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 2]
                }, this.achievementConfig[1023] = {
                    achievementID: "1023",
                    diamond: [10],
                    des: "Earn 8000K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 8]
                }, this.achievementConfig[1024] = {
                    achievementID: "1024",
                    diamond: [10],
                    des: "Earn 3B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 3]
                }, this.achievementConfig[1025] = {
                    achievementID: "1025",
                    diamond: [10],
                    des: "Earn 10B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 10]
                }, this.achievementConfig[1026] = {
                    achievementID: "1026",
                    diamond: [10],
                    des: "Earn 15B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 15]
                }, this.achievementConfig[1027] = {
                    achievementID: "1027",
                    diamond: [10],
                    des: "Earn 60B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 60]
                }, this.achievementConfig[1028] = {
                    achievementID: "1028",
                    diamond: [10],
                    des: "Earn 80B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 80]
                }, this.achievementConfig[1029] = {
                    achievementID: "1029",
                    diamond: [10],
                    des: "Earn 100B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 100]
                }, this.achievementConfig[1030] = {
                    achievementID: "1030",
                    diamond: [10],
                    des: "Earn 300B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 300]
                }, this.achievementConfig[1031] = {
                    achievementID: "1031",
                    diamond: [10],
                    des: "Earn 600B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 600]
                }, this.achievementConfig[1032] = {
                    achievementID: "1032",
                    diamond: [10],
                    des: "Earn 900B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 900]
                }, this.achievementConfig[1033] = {
                    achievementID: "1033",
                    diamond: [10],
                    des: "Earn 1200B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 12]
                }, this.achievementConfig[1034] = {
                    achievementID: "1034",
                    diamond: [10],
                    des: "Earn 2400B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 24]
                }, this.achievementConfig[1035] = {
                    achievementID: "1035",
                    diamond: [10],
                    des: "Earn 5000B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 50]
                }) : (this.achievementConfig[1001] = {
                    achievementID: "1001",
                    diamond: [5],
                    des: "50 bird, the comprehensive level is 3.",
                    conditionType: "2",
                    fishID: "1003",
                    conditionCount: [50]
                }, this.achievementConfig[1002] = {
                    achievementID: "1002",
                    diamond: [10],
                    des: "100 bird, with a combined level of 3",
                    conditionType: "2",
                    fishID: "1003",
                    conditionCount: [100]
                }, this.achievementConfig[1003] = {
                    achievementID: "1003",
                    diamond: [5],
                    des: "50 bird, with a combined level of 5",
                    conditionType: "2",
                    fishID: "1005",
                    conditionCount: [50]
                }, this.achievementConfig[1004] = {
                    achievementID: "1004",
                    diamond: [10],
                    des: "100 bird, with a combined level of 5",
                    conditionType: "2",
                    fishID: "1005",
                    conditionCount: [100]
                }, this.achievementConfig[1005] = {
                    achievementID: "1005",
                    diamond: [5],
                    des: "50 bird, with a combined level of 6",
                    conditionType: "2",
                    fishID: "1006",
                    conditionCount: [50]
                }, this.achievementConfig[1006] = {
                    achievementID: "1006",
                    diamond: [10],
                    des: "100 bird, with a combined level of 6",
                    conditionType: "2",
                    fishID: "1006",
                    conditionCount: [100]
                }, this.achievementConfig[1007] = {
                    achievementID: "1007",
                    diamond: [5],
                    des: "50 bird, with a combined level of 7",
                    conditionType: "2",
                    fishID: "1007",
                    conditionCount: [50]
                }, this.achievementConfig[1008] = {
                    achievementID: "1008",
                    diamond: [10],
                    des: "100 bird, with a combined level of 7",
                    conditionType: "2",
                    fishID: "1007",
                    conditionCount: [100]
                }, this.achievementConfig[1009] = {
                    achievementID: "1009",
                    diamond: [5],
                    des: "50 bird, with a combined level of 9",
                    conditionType: "2",
                    fishID: "1009",
                    conditionCount: [50]
                }, this.achievementConfig[1010] = {
                    achievementID: "1010",
                    diamond: [10],
                    des: "100 bird, with a combined level of 9",
                    conditionType: "2",
                    fishID: "1009",
                    conditionCount: [100]
                }, this.achievementConfig[1011] = {
                    achievementID: "1011",
                    diamond: [10],
                    des: "100 bird, with a combined level of 10.",
                    conditionType: "2",
                    fishID: "1010",
                    conditionCount: [100]
                }, this.achievementConfig[1012] = {
                    achievementID: "1012",
                    diamond: [5],
                    des: "20 bird, with a combined level of 11",
                    conditionType: "2",
                    fishID: "1011",
                    conditionCount: [20]
                }, this.achievementConfig[1013] = {
                    achievementID: "1013",
                    diamond: [5],
                    des: "20 bird, with a combined level of 15",
                    conditionType: "2",
                    fishID: "1015",
                    conditionCount: [20]
                }, this.achievementConfig[1014] = {
                    achievementID: "1014",
                    diamond: [5],
                    des: "25 bird, with a combined level of 16",
                    conditionType: "2",
                    fishID: "1016",
                    conditionCount: [25]
                }, this.achievementConfig[1015] = {
                    achievementID: "1015",
                    diamond: [5],
                    des: "25 bird, with a combined level of 17",
                    conditionType: "2",
                    fishID: "1017",
                    conditionCount: [25]
                }, this.achievementConfig[1016] = {
                    achievementID: "1016",
                    diamond: [5],
                    des: "15 bird, with a combined level of 18",
                    conditionType: "2",
                    fishID: "1018",
                    conditionCount: [15]
                }, this.achievementConfig[1017] = {
                    achievementID: "1017",
                    diamond: [5],
                    des: "15 bird, with a combined level of 20",
                    conditionType: "2",
                    fishID: "1020",
                    conditionCount: [15]
                }, this.achievementConfig[1018] = {
                    achievementID: "1018",
                    diamond: [5],
                    des: "15 bird, with a combined level of 24",
                    conditionType: "2",
                    fishID: "1024",
                    conditionCount: [15]
                }, this.achievementConfig[1019] = {
                    achievementID: "1019",
                    diamond: [5],
                    des: "Earn 100K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 100]
                }, this.achievementConfig[1020] = {
                    achievementID: "1020",
                    diamond: [5],
                    des: "Earn400K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 400]
                }, this.achievementConfig[1021] = {
                    achievementID: "1021",
                    diamond: [5],
                    des: "Earn 800K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 800]
                }, this.achievementConfig[1022] = {
                    achievementID: "1022",
                    diamond: [5],
                    des: "Earn 2000K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 2]
                }, this.achievementConfig[1023] = {
                    achievementID: "1023",
                    diamond: [10],
                    des: "Earn 8000K gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 8]
                }, this.achievementConfig[1024] = {
                    achievementID: "1024",
                    diamond: [10],
                    des: "Earn 3B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 3]
                }, this.achievementConfig[1025] = {
                    achievementID: "1025",
                    diamond: [10],
                    des: "Earn 10B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 10]
                }, this.achievementConfig[1026] = {
                    achievementID: "1026",
                    diamond: [10],
                    des: "Earn 15B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 15]
                }, this.achievementConfig[1027] = {
                    achievementID: "1027",
                    diamond: [10],
                    des: "Earn 60B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 60]
                }, this.achievementConfig[1028] = {
                    achievementID: "1028",
                    diamond: [10],
                    des: "Earn 80B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 80]
                }, this.achievementConfig[1029] = {
                    achievementID: "1029",
                    diamond: [10],
                    des: "Earn 100B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 100]
                }, this.achievementConfig[1030] = {
                    achievementID: "1030",
                    diamond: [10],
                    des: "Earn 300B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 300]
                }, this.achievementConfig[1031] = {
                    achievementID: "1031",
                    diamond: [10],
                    des: "Earn 600B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 600]
                }, this.achievementConfig[1032] = {
                    achievementID: "1032",
                    diamond: [10],
                    des: "Earn 900B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 900]
                }, this.achievementConfig[1033] = {
                    achievementID: "1033",
                    diamond: [10],
                    des: "Earn 1200B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 12]
                }, this.achievementConfig[1034] = {
                    achievementID: "1034",
                    diamond: [10],
                    des: "Earn 2400B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 24]
                }, this.achievementConfig[1035] = {
                    achievementID: "1035",
                    diamond: [10],
                    des: "Earn 5000B gold coins",
                    conditionType: "1",
                    conditionCount: [0, 0, 0, 0, 50]
                })
            },
            initNoviceLayer: function() {
                this.noviceDate = new Object, "1" == this.configureTable.config ? (this.noviceDate[1] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Buying fish"
                }, this.noviceDate[2] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Repurchase"
                }, this.noviceDate[3] = {
                    fingerPos: {
                        x: -250,
                        y: -182.5
                    },
                    width: 50,
                    height: 50,
                    txt: "Merge a new fish"
                }, this.noviceDate[4] = {
                    fingerPos: {
                        x: -250,
                        y: -302.5
                    },
                    width: 50,
                    height: 50,
                    txt: "Use it to earn gold coins"
                }, this.noviceDate[5] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Buy another fish"
                }, this.noviceDate[6] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Continue"
                }, this.noviceMaxTimes = 7) : (this.noviceDate[1] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Buying bird"
                }, this.noviceDate[2] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Repurchase"
                }, this.noviceDate[3] = {
                    fingerPos: {
                        x: -250,
                        y: -182.5
                    },
                    width: 50,
                    height: 50,
                    txt: "Merge a new bird"
                }, this.noviceDate[4] = {
                    fingerPos: {
                        x: -250,
                        y: -302.5
                    },
                    width: 50,
                    height: 50,
                    txt: "Use it to earn gold coins"
                }, this.noviceDate[5] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Buy another bird"
                }, this.noviceDate[6] = {
                    fingerPos: {
                        x: 45,
                        y: -555
                    },
                    width: 140,
                    height: 50,
                    txt: "Continue"
                }, this.noviceMaxTimes = 7)
            },
            initializeFishTankData: function() {
                this.fishtankConfig = new Object, this.fishtankConfig[1001] = {
                    fishtankID: "1001",
                    lv: {
                        1: [0, 100],
                        2: [0, 0, 1],
                        3: [0, 0, 2],
                        4: [0, 500, 3],
                        5: [0, 0, 5],
                        6: [0, 0, 0, 1],
                        7: [0, 500, 0, 1],
                        8: [0, 0, 0, 2],
                        9: [0, 0, 0, 3],
                        10: [0, 0, 0, 5],
                        11: [0, 0, 0, 10],
                        12: [0, 0, 0, 20],
                        13: [0, 0, 0, 40],
                        14: [0, 0, 0, 60],
                        15: [0, 0, 0, 80]
                    },
                    reward: {
                        1: .05,
                        2: .1,
                        3: .15,
                        4: .2,
                        5: .25,
                        6: .3,
                        7: .35,
                        8: .4,
                        9: .45,
                        10: .5,
                        11: .5,
                        12: .6,
                        13: .65,
                        14: .7,
                        15: .75
                    },
                    maxLv: 15,
                    des: "Offline gold increased by --%",
                    bgUrl: "illustratedbgimg1",
                    unlockbgUrl: "illustratedbgimg1_g",
                    bgIndex: 1
                }, this.fishtankConfig[1002] = {
                    fishtankID: "1002",
                    lv: {
                        1: [0, 100],
                        2: [0, 0, 1],
                        3: [0, 0, 2],
                        4: [0, 500, 3],
                        5: [0, 0, 5],
                        6: [0, 0, 0, 1],
                        7: [0, 500, 0, 1],
                        8: [0, 0, 0, 2],
                        9: [0, 0, 0, 3],
                        10: [0, 0, 0, 5],
                        11: [0, 0, 0, 10],
                        12: [0, 0, 0, 20],
                        13: [0, 0, 0, 40],
                        14: [0, 0, 0, 60],
                        15: [0, 0, 0, 80]
                    },
                    reward: {
                        1: .05,
                        2: .1,
                        3: .15,
                        4: .2,
                        5: .25,
                        6: .3,
                        7: .35,
                        8: .4,
                        9: .45,
                        10: .5,
                        11: .5,
                        12: .6,
                        13: .65,
                        14: .7,
                        15: .75
                    },
                    maxLv: 15,
                    des: "Offline gold increased by --%",
                    bgUrl: "illustratedbgimg2",
                    unlockbgUrl: "illustratedbgimg2_g",
                    bgIndex: 2
                }
            }
        });
        cc._RF.pop()
    }, {}],
    GameCustomImage: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0467bf93c1KS7od8yW9Mqmv", "GameCustomImage");
        e("TileMapLayerData");
        cc.Class({
            properties: {
                width: null,
                height: null,
                pngData: null,
                fontData: null,
                drawFun: null,
                drawCompleteFun: null
            },
            initialize: function(e) {
                null != e.pngData ? this.pngData = e.pngData : this.pngData = [], null != e.fontData ? this.fontData = e.fontData : this.fontData = [], this.width = e.width, this.height = e.height, this.getBase64Image(e)
            },
            getBase64Image: function(e) {
                for (var t = this, i = 0; i < this.pngData.length; i++) {
                    var n = this.pngData[i],
                        a = new Image;
                    n.playImage = a, a.crossOrigin = "anonymous", a.imgHeight = n.imgHeight, a.imgWidth = n.imgWidth, a.src = n.url, a.isLoad = !1, a.onload = function() {
                        this.width = this.imgWidth, this.height = this.imgHeight, this.isLoad = !0, t.drawImage()
                    }
                }
            },
            drawImage: function() {
                for (var e = 0; e < this.pngData.length; e++) {
                    if (1 != (n = this.pngData[e]).playImage.isLoad) return
                }
                if (null == this.drawFun) {
                    var t = document.createElement("canvas");
                    t.width = this.width, t.height = this.height;
                    for (var i = 0; i < this.pngData.length; i++) {
                        var n = this.pngData[i],
                            a = t.getContext("2d");
                        a.drawImage(n.playImage, n.posX, n.posY, n.playImage.width, n.playImage.height)
                    }
                    for (var o = 0; o < this.fontData.length; o++) {
                        var s = this.fontData[o];
                        a.font = s.font, a.lineWidth = s.lineWidth, a.fillStyle = s.fillStyle, a.textAlign = s.textAlign, a.strokeStyle = s.strokeStyle, a.strokeText(s.des.toString(), s.posX, s.posY), a.fillText(s.des.toString(), s.posX, s.posY)
                    }
                    var l = t.toDataURL("image/png");
                    null != this.drawCompleteFun && this.drawCompleteFun(l)
                } else this.drawFun()
            }
        }), cc._RF.pop()
    }, {
        TileMapLayerData: "TileMapLayerData"
    }],
    GameData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "19b14r8Sa1BtodcbStZNq3+", "GameData");
        cc.Class({
            properties: {
                isInit: null,
                dataDic: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.dataDic = new Object)
            },
            analysisJsonData: function(e, t) {
                if (null == this.dataDic[e]) {
                    var i = cc.loader.getRes(t);
                    if (null != i) {
                        i = i.json;
                        for (var n = new Object, a = 1; a < i.length; a++) {
                            for (var o = new Object, s = 0; s < i[a].length; s++) "null" != i[a][s] ? o[i[0][s]] = i[a][s] : o[i[0][s]] = "";
                            n[i[a][0]] = o
                        }
                        this.dataDic[e] = n
                    } else ccLog("配置的" + e + "JSON文件缺失")
                } else ccLog("配置的" + e + "JSON文件已经被初始化了")
            }
        });
        cc._RF.pop()
    }, {}],
    GameExternalImage: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "07144c+Ue5FGIIA4dAqq04C", "GameExternalImage");
        cc.Class({
            extends: cc.Node,
            properties: {
                animationSprite: null
            },
            loadImage: function(e, t, i, n) {
                this.animationSprite = this.addComponent(cc.Sprite), null != t && (this.animationSprite.spriteFrame = t);
                var a = engine.gameMemoryManagement.getExternalImage(e);
                if (null == a) {
                    loadExternalImage(e);
                    var o = this;
                    this.animationSprite.update = function(t) {
                        var a = engine.gameMemoryManagement.getExternalImage(e);
                        null != a && (o.animationSprite.update = function(e) {}, o.animationSprite.spriteFrame = a, null != i && o.setScaleX(i / o.getContentSize().width), null != n && o.setScaleY(n / o.getContentSize().height))
                    }
                } else this.animationSprite.spriteFrame = a, null != i && this.setScaleX(i / this.getContentSize().width), null != n && this.setScaleY(n / this.getContentSize().height)
            },
            destroy: function() {
                this._super()
            }
        });
        cc._RF.pop()
    }, {}],
    GameGlobal: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "165bdHMdaBDwreDygqoTHEU", "GameGlobal");
        e("GameSDK");
        var n = e("FaceBookSDK"),
            a = e("LoginFaceBookSDK"),
            o = e("GameConfigData");
        window.faceBookSDK = "FaceBookSDK", window.faceBookSDKTest = "FaceBookSDKTest", window.faceBookSaveData = "faceBookSaveData", window.faceBookTsetSaveData = "faceBookTsetSaveData", window.userDataSaveType = "", window.localServerUrl = "", window.lineServerUrl = "", window.errorServerUrl = "", "undefined" != typeof FBInstant ? window.gameSDKName = faceBookSDK : window.gameSDKName = faceBookSDKTest, window.gameSDK = null, window.gameVersions = "20190215_v1", window.scriptGlobal = {}, window.UIzIndexInfo = {
            UIBgimgzIndex: -1,
            UITipsIndex: 10,
            UIBoxIndex: 100,
            UIFullScreenIndex: 101,
            UIBottomzIndex: 1e3,
            UIFingerIndex: 1001,
            UIMiddlezIndex: 2e3,
            UITopzIndex: 3e3,
            UIConfirmzIndex: 4e3,
            UIEffectIndex: 5e3,
            UIEffectIndex2: 5100,
            UIShotFishIndex: 5200,
            UIBoxIndex2: 5300,
            UIShotStopIndex: 5400,
            UINovicezIndex: 6e3,
            UILoadzIndex: 7e3,
            UIMessageIndex: 8e3
        }, window.gamePlayDataInfo = {}, window.heroData = null, window.gameConfigData = null, window.initGame = function() {
            gameConfigData = new o, gameConfigData.initialize()
        }, window.initGameSDK = function() {
            switch (window.gameSDKName) {
                case faceBookSDKTest:
                    scriptGlobal.LoginJS = a, userDataSaveType = faceBookTsetSaveData, errorServerUrl = localServerUrl, gameSDK = new n, gameSDK.initialize();
                    break;
                case faceBookSDK:
                    scriptGlobal.LoginJS = a, userDataSaveType = faceBookSaveData, errorServerUrl = lineServerUrl, gameSDK = new n, gameSDK.initialize()
            }
        }, cc._RF.pop()
    }, {
        FaceBookSDK: "FaceBookSDK",
        GameConfigData: "GameConfigData",
        GameSDK: "GameSDK",
        LoginFaceBookSDK: "LoginFaceBookSDK"
    }],
    GameLanguageSprite: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e6278RpzJpDvL61p0PmXdir", "GameLanguageSprite"), cc.Class({
            extends: cc.Component,
            properties: {
                _language: "",
                _englishURL: null,
                _englishX: "",
                _englishY: "",
                _chineseURL: null,
                _chineseX: "",
                _chineseY: "",
                language: {
                    set: function(e) {
                        this._language = e, this.refreshSprite()
                    },
                    get: function() {
                        return this.refreshSprite(), engineGlobal.gamelanguage
                    }
                },
                englishURL: {
                    type: cc.SpriteFrame,
                    set: function(e) {
                        this._englishURL = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._englishURL
                    }
                },
                englishX: {
                    set: function(e) {
                        this._englishX = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._englishX
                    }
                },
                englishY: {
                    set: function(e) {
                        this._englishY = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._englishY
                    }
                },
                chineseURL: {
                    type: cc.SpriteFrame,
                    set: function(e) {
                        this._chineseURL = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._chineseURL
                    }
                },
                chineseX: {
                    set: function(e) {
                        this._chineseX = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._chineseX
                    }
                },
                chineseY: {
                    set: function(e) {
                        this._chineseY = e, this.refreshSprite()
                    },
                    get: function() {
                        return this._chineseY
                    }
                }
            },
            onLoad: function() {
                this.refreshSprite()
            },
            refreshSprite: function() {
                switch (engineGlobal.gamelanguage) {
                    case "english":
                        this.node.getComponent(cc.Sprite).spriteFrame = this._englishURL, "" != this._englishX && (this.node.x = this._englishX), "" != this._englishY && (this.node.y = this._englishY);
                        break;
                    case "chinese":
                        this.node.getComponent(cc.Sprite).spriteFrame = this._chineseURL, "" != this._chineseX && (this.node.x = this._chineseX), "" != this._chineseY && (this.node.y = this._chineseY)
                }
            }
        }), cc._RF.pop()
    }, {}],
    GameLog: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "da603n+wqNMb6NFRoz1BV7y", "GameLog");
        cc.Class({
            properties: {
                isInit: null,
                bugLimitCount: null
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.bugLimitCount = 0;
                    var e = this;
                    window.onerror = function(t, i, n, a, o) {
                        if (null != o && null != o.stack && e.bugLimitCount <= 10) {
                            e.bugLimitCount++;
                            var s = o.stack.toString();
                            e.bugInfoHttp(s)
                        }
                    }
                }
            },
            bugInfoHttp: function(e) {
                /*var t = new Date,
                    i = t.getFullYear() + "." + (t.getMonth() + 1) + "." + t.getDate(),
                    n = new Object,
                    a = "0";
                "undefined" != typeof gameSDK && null != gameSDK && null != gameSDK.sdkPlayInfo && null != gameSDK.sdkPlayInfo.playerID && (a = gameSDK.sdkPlayInfo.playerID), n.playerid = a, n.emsg = (" 版本号：" + gameVersions).replace(/\|/g, " "), n.date = i, n.emsg2 = e.replace(/\|/g, " ");
                var o = errorServerUrl + "@opcode=90001";
                ccLog(o);
                var s = JSON.stringify(n),
                    l = new XMLHttpRequest;
                l.open("POST", o), l.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), l.send(s), ccLog("发送给服务器错误信息：" + s)
                */
            }
        });
        cc._RF.pop()
    }, {}],
    GameMemoryManagement: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "06b8dW8esVBwZXQ4rUqX7Mc", "GameMemoryManagement");
        cc.Class({
            properties: {
                isInit: null,
                spriteAtlassDic: null,
                spriteFrameDic: null,
                prefabDic: null,
                jsonDic: null,
                spineDic: null,
                externalImageDic: null,
                soundDic: null,
                particleDic: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.spriteFrameDic = new Object, this.spriteAtlassDic = new Object, this.prefabDic = new Object, this.jsonDic = new Object, this.spineDic = new Object, this.externalImageDic = new Object, this.fntDic = new Object, this.soundDic = new Object, this.particleDic = new Object)
            },
            addExternalImage: function(e, t) {
                this.externalImageDic[e] = t
            },
            getExternalImage: function(e) {
                return this.externalImageDic[e]
            },
            addPrefabDic: function(e, t) {
                this.prefabDic[e] = t, cc.instantiate(t)
            },
            getPrefab: function(e) {
                var t = this.prefabDic[e];
                return null == t ? (ccLog("预制件：" + e + "没有被加载！"), null) : cc.instantiate(t)
            },
            addSoundDic: function(e, t) {
                this.soundDic[e] = t
            },
            getSound: function(e) {
                return this.soundDic[e]
            },
            addSpine: function(e, t) {
                this.spineDic[e] = t
            },
            getSpine: function(e) {
                var t = this.spineDic[e];
                return null == t ? (ccLog("spine：" + e + "没有被加载！"), null) : t
            },
            addSpriteAtlasDic: function(e, t) {
                if (null == this.spriteFrameDic[e]) {
                    this.spriteAtlassDic[e] = t, this.spriteFrameDic[e] = new Object;
                    for (var i = t.getSpriteFrames(), n = 0; n < i.length; n++) this.spriteFrameDic[e][i[n].name] = i[n]
                }
            },
            getSpriteAtlas: function(e) {
                return this.spriteAtlassDic[e]
            },
            getSpriteFrame: function(e, t) {
                var i = this.spriteFrameDic[e];
                if (null != i) {
                    var n = i[t];
                    return null == n && ccLog("图片名字" + t + "不对！"), n
                }
                return ccLog("合图文件" + e + "没有被加载！"), null
            },
            addJsonDic: function(e) {
                var t = cc.loader.getRes(e);
                null != t && (this.jsonDic[e] = t)
            },
            addparticleDic: function(e, t) {
                null == this.particleDic[e] && (this.particleDic[e] = t)
            },
            getParticle: function(e) {
                var t = this.particleDic[e];
                return null == t ? (ccLog("particle：" + e + "没有被加载！"), null) : t
            },
            isExistRes: function(e) {
                return null != this.prefabDic[e] || (null != this.spriteAtlassDic[e] || null != this.jsonDic[e])
            }
        });
        cc._RF.pop()
    }, {}],
    GamePlayData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "68c3ahXaNVJ777b+v+ECtc4", "GamePlayData");
        var n = e("FishNode"),
            a = e("TileMapLayerData"),
            o = e("NumCalculate");
        cc.Class({
            properties: {
                isInit: null,
                tileMapLayerData: null,
                speedUpGoldNum: null,
                submitData: null
            },
            onDestroy: function() {
                this.isInit = null, this.tileMapLayerData = null, this.speedUpGoldNum = null, this.submitData = null
            },
            initialize: function() {
                1 != this.isInit && (this.tileMapLayerData = new a, this.tileMapLayerData.initialize(gameConfigData.gridConfigData), this.speedUpGoldNum = new o, this.speedUpGoldNum.numArr = [0], heroData.shopData.refreshLastFishFun(), this.submitData = {
                    lastFishID: heroData.shopData.lastBuyFishID,
                    attackTable: heroData.attackTable
                }, this.isInit = !0)
            },
            initFish: function() {
                for (var e = 0; e < gameConfigData.gridConfigData.gridMaxX; e++)
                    for (var t = 0; t < gameConfigData.gridConfigData.gridMaxY; t++) {
                        var i = heroData.mainFishList[e][t];
                        if (null != i) {
                            var a = new n,
                                o = gameConfigData.fishConfig[i.fishID];
                            if (a.state = i.state, a.initialize(o), a.addFishTouchListeners(), this.tileMapLayerData.setGridInfo(e, t, a, !0), mainSceneContol.gamePlayLayerComponent.addFish(a), a.createShadow(), 1 === a.state) {
                                var s = engine.gameAdapterInfo.getPercentageY(1),
                                    l = engine.gameAdapterInfo.getPercentageX(1);
                                a.startMoveFish(l * Math.random(), .5 * s + .35 * s * Math.random())
                            } else a.stopMoveFish()
                        }
                    }
            },
            addGold: function(e) {
                heroData.hasGold.addNum(e), heroData.gold.addNum(e), mainSceneContol.helpGoldLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.refreshGold(), heroData.saveHeroData(), mainSceneContol.mainDownLayerComponent.shopLayerComponent && mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshGold(), this.addSpeedUpGold(e)
            },
            addSpeedUpGold: function(e) {
                !0 === mainSceneContol.mainRightLayerComponent.isSpeedUp && this.speedUpGoldNum.addNum(e)
            },
            addedGold: function(e) {
                heroData.hasGold.addNum(e), heroData.gold.addNum(e), heroData.saveHeroData(), mainSceneContol.helpGoldLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.shopLayerComponent && mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshGold()
            },
            subGold: function(e) {
                var t = heroData.gold.subNum(e);
                return t && (heroData.usedGold.addNum(e), mainSceneContol.gamePlayLayerComponent.submitMyScore(), heroData.saveHeroData()), t
            },
            addDiamond: function(e) {
                var t = heroData.diamond.addNum(e);
                return heroData.saveHeroData(), mainSceneContol.mainDownLayerComponent.shopLayerComponent && mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshDiamond(), t
            },
            subDiamond: function(e) {
                var t = heroData.diamond.subNum(e);
                return heroData.saveHeroData(), t
            },
            playAllSameFishAnimation: function(e) {
                for (var t = 0; t < heroData.mainFishList.length; t++)
                    for (var i = 0; i < heroData.mainFishList[t].length; i++) {
                        var n = heroData.gamePlayData.tileMapLayerData.gridArr[t][i];
                        0 == e.state && n && 0 == n.state && n.fishData.fishID == e.fishData.fishID && e != n && n.playSameFishAnimation()
                    }
            },
            stopAllSameFishAnimation: function(e) {
                for (var t = 0; t < heroData.mainFishList.length; t++)
                    for (var i = 0; i < heroData.mainFishList[t].length; i++) {
                        var n = heroData.gamePlayData.tileMapLayerData.gridArr[t][i];
                        n && 0 == n.state && n.fishData.fishID == e.fishData.fishID && e != n && n.stopSameFishAnimation()
                    }
            },
            addFish: function(e, t, i) {
                engine.gameSound.playEffect(soundurl.buyFishSound), heroData.updateHaveFish(i, 1);
                var a = new n;
                return a.state = 0, a.initialize(gameConfigData.fishConfig[i]), this.tileMapLayerData.setGridInfo(e, t, a, !0), mainSceneContol.gamePlayLayerComponent.addFish(a), a.createShadow(), a.fishShadow.active = !1, heroData.mainFishList[e][t] = {
                    fishID: i,
                    state: 0
                }, heroData.saveHeroData(), a.scaleX = 0, a.scaleY = 0, a
            },
            deleteFish: function(e) {
                this.tileMapLayerData.setGridInfo(e.gridX, e.gridY, null), heroData.mainFishList[e.gridX][e.gridY] = null, e.deleteFish(), heroData.saveHeroData()
            },
            chFish: function(e, t, i) {
                var n = e.gridX,
                    a = e.gridY;
                this.tileMapLayerData.setGridInfo(t, i, e, !0), this.tileMapLayerData.setGridInfo(n, a, null), e.fishShadow.x = e.x, e.fishShadow.y = e.y, heroData.mainFishList[n][a] = null, heroData.mainFishList[e.gridX][e.gridY] = {
                    fishID: e.fishData.fishID,
                    state: 0
                }, heroData.saveHeroData()
            },
            changeFish: function(e, t) {
                var i = e.gridX,
                    n = e.gridY,
                    a = t.gridX,
                    o = t.gridY;
                this.tileMapLayerData.setGridInfo(i, n, null), this.tileMapLayerData.setGridInfo(a, o, null), this.tileMapLayerData.setGridInfo(a, o, e, !0), this.tileMapLayerData.setGridInfo(i, n, t, !0), e.fishShadow.x = e.x, e.fishShadow.y = e.y, t.fishShadow.x = t.x, t.fishShadow.y = t.y, heroData.mainFishList[a][o] = {
                    fishID: e.fishData.fishID,
                    state: 0
                }, heroData.mainFishList[i][n] = {
                    fishID: t.fishData.fishID,
                    state: 0
                }, heroData.saveHeroData()
            },
            combineFish: function(e, t) {
                var i = this,
                    n = e.gridX,
                    a = e.gridY,
                    o = t.gridX,
                    s = t.gridY,
                    l = e.fishData.fishID;
                e.deleteFishShadow(), t.deleteFishShadow(), mainSceneContol.gamePlayLayerComponent.combineFish(e, t, function() {
                    var r = e.fishData.nextFishID;
                    i.tileMapLayerData.setGridInfo(n, a, null), i.tileMapLayerData.setGridInfo(o, s, null), heroData.mainFishList[n][a] = null, heroData.mainFishList[o][s] = null, e.deleteFish(), t.deleteFish();
                    var c = function() {
                        for (var e in gameConfigData.fishConfig)
                            if (parseInt(gameConfigData.fishConfig[e].unlockNeed) == parseInt(r)) {
                                (function(e) {
                                    heroData.updateShopFishList(gameConfigData.fishConfig[e].unlockNeed), heroData.updateShopFishList(gameConfigData.fishConfig[e].fishID)
                                })(e);
                                break
                            } for (var t in heroData.shopFishPriceList)
                            if (parseInt(r) == parseInt(heroData.shopFishPriceList[t].fishID)) {
                                (function(e) {
                                    heroData.shopFishPriceList[e].unlockCount += 1, heroData.totalRecordList[e].unlockCount += 1
                                })(t);
                                break
                            } heroData.saveHeroData()
                    };
                    if (1 == mainSceneContol.isGetVariation(r, gameConfigData.variationTypeEm.combine)) {
                        mainSceneContol.getVariationChange(r, function(e) {
                            var t = heroData.gamePlayData.addFish(o, s, e);
                            mainSceneContol.gamePlayLayerComponent.addFishAnimate(t, !0), e == r && c()
                        })
                    } else {
                        c();
                        var d = heroData.gamePlayData.addFish(o, s, r);
                        mainSceneContol.gamePlayLayerComponent.addFishAnimate(d, !1);
                        var h = heroData.totalRecordList[d.fishData.fishID];
                        if (h && 1 == h.unlockCount && d.fishData.fishID > "1002") {
                            mainSceneContol.mainDownLayerComponent.refreshGold();
                            var g = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.new_category_prefab);
                            engine.gameAdapterInfo.addSceneNode(g, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                            var u = g.addComponent("NewCategoryLayer"),
                                m = heroData.gamePlayData.tileMapLayerData.gridArr[o][s];
                            u.addPositionFun(m.x, m.y);
                            var f = gameConfigData.fishConfig[d.fishData.fishID].nextFishID;
                            u.showFish(l, d.fishData.fishID, f), gameSDK.logEvent("fishLevel", 1, {
                                fishLevel: d.fishData.level
                            })
                        }
                        //d.fishData.level >= gameConfigData.transformationConfig.minUseLevel && mainSceneContol.mainTransformationLayerComponent.btnShowFun()
                    }
                })
            },
            moveFish: function(e) {
                var t = e.gridX,
                    i = e.gridY;
                e.state = 1, heroData.mainFishList[t][i].state = 1, e.pushStartMoveFish(e.x, e.y), this.refreshProductionPer(), heroData.saveHeroData()
            },
            backFish: function(e) {
                var t = e.gridX,
                    i = e.gridY;
                heroData.mainFishList[t][i].state = 0, e.stopMoveFish(), e.state = 0, this.tileMapLayerData.setGridInfo(t, i, e, !0), this.refreshProductionPer(), heroData.saveHeroData()
            },
            offLineAdd: function() {
                var e = heroData.curFishTankInfo.curFishTankType,
                    t = heroData.curFishTankInfo.curFishTankLv,
                    i = gameConfigData.fishtankConfig[e].reward[t],
                    n = this.refreshProductionPer(),
                    a = new o;
                return a.loadSaveData([1 + i]), n.multiplicationNum(a), n
            },
            refreshProductionPer: function() {
                var e = this.baseProductionPer(),
                    t = new o;
                if (t.loadSaveData([heroData.goldMul]), e.multiplicationNum(t), !0 === mainSceneContol.mainRightLayerComponent.isSpeedUp) {
                    var i = new o;
                    i.loadSaveData([2]), e.multiplicationNum(i)
                }
                var n = e.getNumText();
                return mainSceneContol.helpGoldLayerComponent && mainSceneContol.helpGoldLayerComponent.refreshProductionPer(n, e.getSaveData()), e
            },
            baseProductionPer: function() {
                var e = new o;
                e.loadSaveData([0]);
                for (var t = 0; t < heroData.mainFishList.length; t++)
                    for (var i = 0; i < heroData.mainFishList[t].length; i++) {
                        var n = heroData.gamePlayData.tileMapLayerData.gridArr[t][i];
                        if (n && 1 === n.state) {
                            1 == mainSceneContol.mainRightLayerComponent.isSpeedUp ? (n.skeleton.timeScale = 2 * n.fishData.timeScale, "1" == gameConfigData.configureTable.config ? (n.fishGoldPrefab.scaleX = 1.4, n.fishGoldPrefab.scaleY = 1.4) : "2" == gameConfigData.configureTable.config && (n.fishGoldPrefab.scaleX = 1, n.fishGoldPrefab.scaleY = 1)) : (n.skeleton.timeScale = n.fishData.timeScale, n.fishGoldPrefab.scaleX = 1, n.fishGoldPrefab.scaleY = 1);
                            var a = new o;
                            a.loadSaveData(n.fishData.addGold);
                            var s = new o;
                            s.loadSaveData([1 / n.fishData.barSpeed]), a.multiplicationNum(s), e.addNum(a)
                        }
                    }
                if (gameConfigData.transformationProfit.basicGoldProfit > 1) {
                    var l = new o;
                    l.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), e.multiplicationNum(l)
                }
                return e
            },
            checkAdvertisement: function() {
                var e = heroData.advertisementOverTime;
                if (!e) return 0;
                var t = e,
                    i = (new Date).getTime(),
                    n = parseInt(gameConfigData.advertisementTime - (i - t) / 1e3);
                return n < 0 && (n = 0), n
            },
            saveAdvertisementTime: function() {
                var e = new Date;
                heroData.advertisementOverTime = e.getTime(), heroData.saveHeroData()
            },
            allFishSpeedUp: function() {
                for (var e = 0; e < heroData.mainFishList.length; e++)
                    for (var t = 0; t < heroData.mainFishList[e].length; t++) {
                        var i = heroData.gamePlayData.tileMapLayerData.gridArr[e][t];
                        i && 1 === i.state && i.moveFish(i.x, i.y)
                    }
            },
            addAttackInfo: function(e) {
                var t, i = 0,
                    n = [];
                for (var a in heroData.attackTable) n.push(a), t = a, i++;
                ccLog("复仇超过12删除"), ccLog(JSON.stringify(heroData.attackTable)), i > 12 && delete heroData.attackTable[t], ccLog(JSON.stringify(heroData.attackTable));
                var o = heroData.attackTable[e.playerID];
                o ? o >= 99 ? heroData.attackTable[e.playerID] = 99 : heroData.attackTable[e.playerID] += 1 : heroData.attackTable[e.playerID] = 1, heroData.saveHeroData()
            }
        });
        cc._RF.pop()
    }, {
        FishNode: "FishNode",
        NumCalculate: "NumCalculate",
        TileMapLayerData: "TileMapLayerData"
    }],
    GamePlayLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3adfblpi75G/pav5JU5Y0co", "GamePlayLayer");
        e("FishNode");
        var n = e("LoadControl"),
            a = e("NumCalculate");
        e("FaceBookSDK");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                notice: null,
                notice2: null,
                updateNode: null,
                starsParticlePool: null,
                bubbleParticlePool: null,
                boxAddGoldNode: null,
                crabTimeNode: null,
                isSubmitting: null
            },
            onDestroy: function() {
                this.notice.destroy(), this.notice2.destroy(), this.isInit = null, this.notice = null, this.notice2 = null, this.updateNode = null, this.starsParticlePool.clear(), this.starsParticlePool = null, this.bubbleParticlePool.clear(), this.bubbleParticlePool = null, this.boxAddGoldNode = null, this.crabTimeNode = null, this.isSubmitting = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    var e = this;
                    this.updateNode = new cc.Node, this.updateNode.addComponent(cc.Sprite), this.node.addChild(this.updateNode), this.notice = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang_prefab), engine.gameAdapterInfo.addSceneNode(this.notice, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.6), UIzIndexInfo.UIEffectIndex), this.notice.active = !1, this.notice2 = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang2_prefab), engine.gameAdapterInfo.addSceneNode(this.notice2, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.6), UIzIndexInfo.UIEffectIndex), this.notice2.active = !1;
                    var t = gameConfigData.gridConfigData.gridMaxX * gameConfigData.gridConfigData.gridMaxY / 2;
                    this.starsParticlePool = new cc.NodePool;
                    for (var i = 0; i < t; i++) {
                        var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.combineStars_particle_prefab);
                        this.starsParticlePool.put(n)
                    }
                    this.bubbleParticlePool = new cc.NodePool;
                    for (var a = 0; a < t; a++) {
                        n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.deleteFish_particle_prefab);
                        this.bubbleParticlePool.put(n)
                    }
                    this.crabTimeNode = new cc.Node, this.node.addChild(this.crabTimeNode), this.loadACrab(function() {
                        e.boxAddGoldNode = e.runCrab(), e.boxAddGoldNode.crabComponent = e.boxAddGoldNode.addComponent("CrabNode"), e.boxAddGoldNode.active = !1, e.crabMoveFun()
                    }), this.isSubmitting = !1, this.isInit = !0
                }
            },
            loadACrab: function(e) {
                var t = "spine/" + gameConfigData.configureTable.crab + "/" + gameConfigData.configureTable.crab;
                if (null == engine.gameMemoryManagement.getSpine(t)) {
                    var i = new n,
                        a = new Object;
                    a.resources = [{
                        url: t,
                        restype: LoadStyleType.spine
                    }], a.completeCallback = function() {
                        e()
                    }, i.initialize(a), i.load()
                } else e()
            },
            runCrab: function() {
                var e = new cc.Node;
                e.x = engine.gameAdapterInfo.getPercentageX(-.1), e.y = engine.gameAdapterInfo.getPercentageY(.46), mainSceneContol.mainLayer.addChild(e), e.zIndex = UIzIndexInfo.UIFingerIndex;
                var t = new cc.Node,
                    i = "spine/" + gameConfigData.configureTable.crab + "/" + gameConfigData.configureTable.crab,
                    n = t.addComponent(sp.Skeleton),
                    a = engine.gameMemoryManagement.getSpine(i);
                n.skeletonData = a, n.loop = !0, n.animation = "walk1", n.timeScale = .4, t.x = 0, t.y = -93, e.addChild(t), e.crabSpine = n, e.width = 137, e.height = 186;
                return e.PercentageY = engine.gameAdapterInfo.getPercentageY(.46), t.scaleX = .8, t.scaleY = .8, "2" == gameConfigData.configureTable.config && (t.scaleX = -.8, e.PercentageY = engine.gameAdapterInfo.getPercentageY(.485)), e.y = e.PercentageY, e
            },
            crabMoveFun: function() {
                var e = this;
                if (heroData.currentBoxTimes >= gameConfigData.boxAddGoldMaxTimes && 0 != gameConfigData.boxAddGoldMaxTimes);
                else {
                    Math.random();
                    var t = e.boxAddGoldNode.getComponent("CrabNode");
                    e.boxAddGoldNode.crabSpine.animation = "walk1";
                    var i = gameConfigData.boxIntervalTime + 20 * Math.random(),
                        n = !1;
                    0 == heroData.isStartCrab && (i = 1), e.crabTimeNode.runAction(cc.sequence(cc.delayTime(i), cc.callFunc(function() {
                        e.boxAddGoldNode.active = !0, e.boxAddGoldNode.x = engine.gameAdapterInfo.getPercentageX(-.4), t.update = function() {
                            0 == heroData.isStartCrab && (n = heroData.gold.comparisonSize(heroData.shopData.fishPriceObj[heroData.shopData.lastFishID()[0]])), "0" != mainSceneContol.helpGoldLayerComponent.productionPer && cc.director.getScene().children.length <= gameConfigData.boxLowestLayerNum && 0 == n && (t.update = function() {}, heroData.currentBoxTimes += 1, e.boxAddGoldNode.crabSpine.timeScale = .4, t.firstClickBox = 0, t.numCalculate = null, t.getNumFun(), t.isTouch = !0, heroData.isStartCrabFun(), gameSDK.logEvent("crabAppears", 1, {
                                crabAppears: "crabAppears"
                            }), e.boxAddGoldNode.runAction(cc.sequence(cc.moveTo(2.5, engine.gameAdapterInfo.getPercentageX(.15), e.boxAddGoldNode.PercentageY), cc.moveTo(8, engine.gameAdapterInfo.getPercentageX(.82), e.boxAddGoldNode.PercentageY), cc.callFunc(function() {
                                e.boxAddGoldNode.crabSpine.animation = "walk1", t.isTouch = !1
                            }), cc.moveTo(2, engine.gameAdapterInfo.getPercentageX(1.3), e.boxAddGoldNode.PercentageY), cc.callFunc(function() {
                                e.boxAddGoldNode.active = !1, e.crabMoveFun()
                            }))))
                        }
                    })))
                }
            },
            addFish: function(e) {
                this.node.addChild(e)
            },
            combineFish: function(e, t, i) {
                var n = this,
                    a = t.gridX,
                    o = t.gridY,
                    s = heroData.gamePlayData.tileMapLayerData.getScenePointByGridPoint(a, o);
                e.x = s.x - 10, e.y = s.y, t.x = s.x + 10, t.y = s.y, e.runAction(cc.sequence(cc.moveTo(.15, cc.v2(s.x - 60, s.y)), cc.moveTo(.05, cc.v2(s.x, s.y)))), t.runAction(cc.sequence(cc.moveTo(.15, cc.v2(s.x + 60, s.y)), cc.moveTo(.05, cc.v2(s.x, s.y)), cc.callFunc(function() {
                    n.addStarsParticle(s.x, s.y), i()
                })))
            },
            addStarsParticle: function(e, t) {
                var i = this;
                if (this.starsParticlePool.size() > 0) {
                    var n = this.starsParticlePool.get();
                    n.x = e, n.y = t, n.zIndex = 102, this.node.addChild(n), n.getComponent(cc.ParticleSystem).resetSystem(), this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                        i.starsParticlePool.put(n)
                    })))
                }
            },
            addBubbleParticle: function(e, t) {
                var i = this;
                if (this.bubbleParticlePool.size() > 0) {
                    var n = this.bubbleParticlePool.get();
                    n.x = e, n.y = t, n.zIndex = 102, this.node.addChild(n), n.getComponent(cc.ParticleSystem).resetSystem(), this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                        i.bubbleParticlePool.put(n)
                    })))
                }
            },
            popNotice: function(e, t) {
                var i = this;
                this.notice.stopAllActions(), this.notice.active = !0, this.notice.scaleX = 0, this.notice.scaleY = 0, t || (t = engine.gameAdapterInfo.getPercentageY(.6)), this.notice.y = t, this.notice.getChildByName("noticetxt").getComponent(cc.Label).string = e, this.notice.runAction(cc.sequence(cc.scaleTo(.2, 1.05, 1.05), cc.scaleTo(.12, .98, .98), cc.scaleTo(.12, 1, 1), cc.delayTime(1.2), cc.scaleTo(.12, 0, 0), cc.callFunc(function() {
                    i.notice.active = !1
                })))
            },
            popNotice2: function(e, t) {
                var i = this;
                this.notice2.stopAllActions(), this.notice2.active = !0, this.notice2.scaleX = 0, this.notice2.scaleY = 0, this.notice2.runAction(cc.sequence(cc.scaleTo(.2, 1.05, 1.05), cc.scaleTo(.12, .98, .98), cc.scaleTo(.12, 1, 1), cc.delayTime(3.2), cc.scaleTo(.12, 0, 0), cc.callFunc(function() {
                    i.notice2.active = !1
                })))
            },
            achievement: function(e) {
                var t = gameConfigData.achievementConfig[e];
                if ("1" == t.conditionType) {
                    var i = new a;
                    if (i.loadSaveData(t.conditionCount), heroData.hasGold.comparisonSize(i)) {
                        var n = i.getNumText();
                        return {
                            result: !0,
                            perStr: o = heroData.hasGold.getNumText() + "/" + n,
                            perCount: 1
                        }
                    }
                    var o = heroData.hasGold.getNumText() + "/" + i.getNumText(),
                        s = 0;
                    heroData.hasGold.numArr[i.numArr.length - 1] && (s += 1e3 * heroData.hasGold.numArr[i.numArr.length - 1]), heroData.hasGold.numArr[i.numArr.length - 2] && (s += heroData.hasGold.numArr[i.numArr.length - 2]);
                    var l = 0;
                    return i.numArr[i.numArr.length - 1] && (l += 1e3 * i.numArr[i.numArr.length - 1]), i.numArr[i.numArr.length - 2] && (l += i.numArr[i.numArr.length - 2]), {
                        result: !1,
                        perStr: o,
                        perCount: s / l
                    }
                }
                if ("2" == t.conditionType) {
                    if (heroData.shopFishPriceList[t.fishID]) {
                        var r = heroData.totalRecordList[t.fishID].unlockCount;
                        return r >= t.conditionCount ? {
                            result: !0,
                            perStr: o = (r = t.conditionCount[0]) + "/" + t.conditionCount,
                            perCount: 1
                        } : {
                            result: !1,
                            perStr: o = r + "/" + t.conditionCount,
                            perCount: r / t.conditionCount
                        }
                    }
                    return {
                        result: !1,
                        perStr: o = "0/" + t.conditionCount,
                        perCount: 0
                    }
                }
            },
            addFishAnimate: function(e, t) {
                var i = this;
                if (t) {
                    e.lock = !0;
                    var n = e.x,
                        a = e.y;
                    if (e.x = engine.gameAdapterInfo.getPercentageX(.5), e.y = engine.gameAdapterInfo.getPercentageY(.5), "1" == gameConfigData.configureTable.config) {
                        var o = new cc.Node;
                        o.addComponent(cc.Sprite), o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.publicimg01_plist, "bubbleimg"), mainSceneContol.mainLayer.addChild(o), o.scaleX = 0, o.scaleY = 0, o.x = engine.gameAdapterInfo.getPercentageX(.5), o.y = engine.gameAdapterInfo.getPercentageY(.5), o.runAction(cc.sequence(cc.scaleTo(.12, 1.222, 1.222), cc.scaleTo(.1, 1.144, 1.144), cc.scaleTo(.1, 1.17, 1.17), cc.moveTo(.1, cc.p(n, a)), cc.callFunc(function() {
                            o.destroy(), o = null
                        })))
                    }
                    e.runAction(cc.sequence(cc.scaleTo(.12, 1.03, 1.03), cc.scaleTo(.1, .98, .98), cc.scaleTo(.1, 1, 1), cc.moveTo(.1, cc.p(n, a)), cc.callFunc(function() {
                        "1" == gameConfigData.configureTable.config ? i.addBubbleParticle(n, a) : "2" == gameConfigData.configureTable.config && i.addStarsParticle(n, a)
                    }), cc.delayTime(.1), cc.callFunc(function() {
                        e.fishShadow.active = !0, e.addFishTouchListeners(), e.lock = !1
                    })))
                } else e.lock = !0, e.runAction(cc.sequence(cc.scaleTo(.1, 1.03, 1.03), cc.scaleTo(.1, .98, .98), cc.scaleTo(.1, 1, 1), cc.callFunc(function() {
                    e.fishShadow.active = !0, e.addFishTouchListeners(), e.lock = !1
                })))
            },
            loadAFish: function(e, t) {
                var i = this,
                    a = "spine/" + gameConfigData.configureTable.spine + e + "/" + gameConfigData.configureTable.spine + e;
                if (null == engine.gameMemoryManagement.getSpine(a)) {
                    var o = new n,
                        s = new Object;
                    s.resources = [{
                        url: a,
                        restype: LoadStyleType.spine
                    }], o.initialize(s), o.load(), this.update = function(e) {
                        null != engine.gameMemoryManagement.getSpine(a) && (t(), i.update = function(e) {})
                    }
                } else t()
            },
            submitMyScore: function() {
                var e = this;
                if (0 == e.isSubmitting) {
                    e.isSubmitting = !0;
                    var t = heroData.usedGold.convertToFaceBookRankData();
                    heroData.shopData.refreshLastFishFun();
                    var i = JSON.stringify(heroData.gamePlayData.submitData);
                    gameSDK.setScoreAsync(idlefishUsedGoldRank, t, i), e.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                        e.isSubmitting = !1
                    })))
                }
            },
            addRewardParticle: function(e, t) {
                var i = [],
                    n = "goldimg",
                    a = 0,
                    o = .8,
                    s = engine.gameAdapterInfo.getPercentageX(.5),
                    l = engine.gameAdapterInfo.getPercentageY(.5);
                e && 2 == e && (n = "diamondsamll");
                for (var r = function(e, t) {
                        var i = (e = -1 * e + 90) * Math.PI / 180,
                            n = Math.cos(i) * t,
                            a = Math.sin(i) * t;
                        return cc.v2(n, a)
                    }, c = 0; c < 8; c++) {
                    var d = new cc.Node;
                    d.addComponent(cc.Sprite), d.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, n), d.active = !0, t ? engine.gameAdapterInfo.addSceneNode(d, s, l, t) : engine.gameAdapterInfo.addSceneNode(d, s, l, UIzIndexInfo.UIEffectIndex2), i.push(d)
                }
                for (var h = 0; h < i.length; h++) {
                    i[h].scaleX = .1, i[h].scaleY = .1;
                    var g = r(45 * h, 100 + 100 * Math.random());
                    i[h].x = s + g.x, i[h].y = l + g.y;
                    var u = .8 * Math.random(),
                        m = cc.p(mainSceneContol.topUIX, engine.gameAdapterInfo.getPercentageY(.965));
                    "2" == gameConfigData.configureTable.config && (m = cc.p(mainSceneContol.topUIX, engine.gameAdapterInfo.getPercentageY(.96))), e && 2 == e && (m = cc.p(mainSceneContol.bottomUIX, engine.gameAdapterInfo.getPercentageY(.07)), o = 1.2),
                        function(e) {
                            i[e].runAction(cc.sequence(cc.scaleTo(.1, 1.03 * o), cc.scaleTo(.1, .98 * o), cc.scaleTo(.1, 1 * o), cc.delayTime(.1), cc.moveTo(.1 + u, m.x, m.y), cc.callFunc(function() {
                                i[e].destroy(), (a += 1) >= i.length && (i = null)
                            })))
                        }(h)
                }
            },
            update: function() {}
        }), cc._RF.pop()
    }, {
        FaceBookSDK: "FaceBookSDK",
        FishNode: "FishNode",
        LoadControl: "LoadControl",
        NumCalculate: "NumCalculate"
    }],
    GameRankData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "44f3duNkE5DL6tqomMloG8V", "GameRankData");
        e("NumCalculate");
        window.rankTypeEm = cc.Enum({
            globalRank: 1,
            friendRank: 2,
            nearbyRank: 3
        });
        cc.Class({
            properties: {
                isInit: null,
                nearbyRankData: null,
                globalRankData: null,
                friendRankData: null,
                lastGetFriRankScore: null,
                lastGetNearRankScore: null,
                lastGetGlobRankScore: null,
                friendRankIsEnd: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.nearbyRankData = [], this.globalRankData = [], this.friendRankData = [], this.lastGetFriRankScore = 0, this.lastGetNearRankScore = 0, this.lastGetGlobRankScore = 0, this.friendRankIsEnd = !1)
            },
            rankIsChange: function(e) {
                var t = 0;
                switch (e) {
                    case rankTypeEm.globalRank:
                        t = this.lastGetGlobRankScore;
                        break;
                    case rankTypeEm.friendRank:
                        t = this.lastGetFriRankScore;
                        break;
                    case rankTypeEm.nearbyRank:
                        t = this.lastGetNearRankScore
                }
                return "" == t || t != heroData.usedGold.getNumText()
            },
            loadFriendRankDataBySDK: function(e) {
                e || (e = 20);
                var t = this.rankIsChange(rankTypeEm.friendRank);
                if (this.friendRankData.length <= 0 || 1 == t) {
                    this.lastGetFriRankScore = heroData.usedGold.getNumText(), this.setRankData(rankTypeEm.friendRank, []);
                    var i = this;
                    gameSDK.getConnectedPlayerEntriesAsync(idlefishUsedGoldRank, e, 0, function(e) {
                        e || (e = []), i.setRankData(rankTypeEm.friendRank, e), i.friendRankIsEnd = !0
                    })
                }
            },
            loadGlobalRankDataBySDK: function() {
                var e = this.rankIsChange(rankTypeEm.globalRank);
                if (this.globalRankData.length <= 0 || 1 == e) {
                    this.lastGetGlobRankScore = heroData.usedGold, this.setRankData(rankTypeEm.globalRank, []);
                    var t = this;
                    gameSDK.getEntriesAsyncInfo(idlefishUsedGoldRank, [{
                        count: 100,
                        beginNum: 0
                    }], function(e) {
                        t.setRankData(rankTypeEm.globalRank, e)
                    })
                }
            },
            loadNearbyRankDataBySDK: function() {
                var e = this.rankIsChange(rankTypeEm.nearbyRank);
                if (this.nearbyRankData.length <= 0 || 1 == e) {
                    this.lastGetNearRankScore = heroData.usedGold, this.setRankData(rankTypeEm.nearbyRank, []);
                    var t = this;
                    gameSDK.getPlayerEntryAsync(idlefishUsedGoldRank, function(e) {
                        var i = 0;
                        if (null != e) {
                            var n = e.rank;
                            n - 15 > 0 && (i = n - 15)
                        }
                        gameSDK.getEntriesAsyncInfo(idlefishUsedGoldRank, [{
                            count: 21,
                            beginNum: i
                        }], function(e) {
                            t.setRankData(rankTypeEm.nearbyRank, e)
                        })
                    })
                }
            },
            setRankData: function(e, t) {
                switch (e) {
                    case rankTypeEm.globalRank:
                        if ("undefined" != typeof FBInstant)
                            for (var i = 0; i < t.length; i++) t[i].playerID == FBInstant.player.getID() && t.splice(i, 1);
                        this.globalRankData = t;
                        break;
                    case rankTypeEm.friendRank:
                        this.friendRankData = t;
                        break;
                    case rankTypeEm.nearbyRank:
                        this.nearbyRankData = t
                }
            },
            getRankData: function(e) {
                switch (e) {
                    case rankTypeEm.globalRank:
                        return this.globalRankData;
                    case rankTypeEm.friendRank:
                        return this.friendRankData;
                    case rankTypeEm.nearbyRank:
                        return this.nearbyRankData
                }
            }
        });
        cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    GameSDK: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9d7ceDnxwtKErA0v7qp6+PO", "GameSDK");
        cc.Class({
            properties: {
                isInit: null,
                sdkPlayInfo: null,
                isFirstStartGame: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.isFirstStartGame = !0, this.sdkPlayInfo = new Object, this.sdkPlayInfo.friendsList = new Object)
            },
            getPlayInfo: function(e) {
                e()
            },
            startGame: function(e) {
                e()
            },
            getfriendsList: function(e) {
                e()
            },
            shareGame: function(e, t) {
                e()
            }
        });
        cc._RF.pop()
    }, {}],
    GameSoundButton: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7d8b92YsV9BLIGBx7rSsoS6", "GameSoundButton"), cc.Class({
            extends: cc.Component,
            properties: {
                _soundBtn: null,
                _btnSpriteUrl: null,
                btnSpriteUrl: {
                    type: cc.SpriteFrame,
                    set: function(e) {
                        this.refreshBtnTexture(e)
                    },
                    get: function() {
                        return this._btnSpriteUrl
                    }
                },
                _soundIconSp: null,
                _closeSpriteUrl: null,
                closeSpriteUrl: {
                    type: cc.SpriteFrame,
                    set: function(e) {
                        this.refreshSoundTexture(e, 1)
                    },
                    get: function() {
                        return this._closeSpriteUrl
                    }
                },
                _openSpriteUrl: null,
                openSpriteUrl: {
                    type: cc.SpriteFrame,
                    set: function(e) {
                        this.refreshSoundTexture(e, 0)
                    },
                    get: function() {
                        return this._openSpriteUrl
                    }
                },
                _isInit: null
            },
            onLoad: function() {
                this.initialize()
            },
            onDestroy: function() {
                this._soundBtn.off(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this), this._soundBtn = null, this._btnSpriteUrl = null, this._soundIconSp = null, this._closeSpriteUrl = null, this._openSpriteUrl = null, this._curSoundType = null, this._isInit = null
            },
            initialize: function() {
                1 != this._isInit && (this._isInit = !0, this.createBtn(), this.createSoundIcon(), this.iconChangeTexture(engine.gameSound.stopSound))
            },
            createBtn: function() {
                if (null == this._soundBtn) {
                    this._soundBtn = new cc.Node, this._soundBtn.addComponent(cc.Sprite);
                    var e = this._soundBtn.addComponent(cc.Button);
                    e.transition = cc.Button.Transition.SCALE, e.zoomScale = .9, this.node.addChild(this._soundBtn)
                }
                this._soundBtn.on(cc.Node.EventType.TOUCH_END, this.clickSoundBtnFun, this)
            },
            clickSoundBtnFun: function() {
                1 == engine.gameSound.stopSound ? (engine.gameSound.openMusic(), heroData.music = 1) : (engine.gameSound.stopMusic(), heroData.music = 0), heroData.saveHeroData(), this.iconChangeTexture(engine.gameSound.stopSound), engine.gameSound.playEffect(soundurl.clicksound, !1)
            },
            createSoundIcon: function() {
                null == this._soundIconSp && (this._soundIconSp = new cc.Node, this._soundIconSp.addComponent(cc.Sprite), this._soundBtn.addChild(this._soundIconSp))
            },
            refreshBtnTexture: function(e) {
                this._btnSpriteUrl = e, this.createBtn(), this._soundBtn.getComponent(cc.Sprite).spriteFrame = this._btnSpriteUrl
            },
            iconChangeTexture: function(e) {
                this._soundIconSp.getComponent(cc.Sprite).spriteFrame = 1 == e ? this._closeSpriteUrl : this._openSpriteUrl
            },
            refreshSoundTexture: function(e, t) {
                null != this._soundIconSp && (this._soundIconSp.destroy(), this._soundIconSp = null), 1 == t ? this._closeSpriteUrl = e : this._openSpriteUrl = e, this.createBtn(), this.createSoundIcon(), this.iconChangeTexture(t)
            }
        }), cc._RF.pop()
    }, {}],
    GameSoundLoad: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "587caFVroJLubmGR2N0+NaH", "GameSoundLoad");
        cc.Class({
            properties: {
                url: null,
                playSound: null
            },
            loadEffectSound: function(e) {
                null == engineGlobal.loadSoundDic[e] && (engineGlobal.loadSoundDic[e] = !0, cc.loader.loadRes(e, cc.AudioClip, function(t, i) {
                    null != i && i instanceof cc.AudioClip && engine.gameMemoryManagement.addSoundDic(e, i)
                }))
            },
            loadBackgroundSound: function(e) {
                var t = this;
                this.url = e, null == engineGlobal.loadSoundDic[e] && (engineGlobal.loadSoundDic[e] = new Object, engineGlobal.loadSoundDic[e].loadCount = 1, engineGlobal.loadSoundDic[e].isNowLoad = !1), engineGlobal.loadSoundDic[e].loadCount >= 5 || 0 == engineGlobal.loadSoundDic[e].isNowLoad && (engineGlobal.loadSoundDic[e].isNowLoad = !0, engineGlobal.loadSoundDic[e].loadCount++, cc.loader.loadRes(e, cc.AudioClip, function(i, n) {
                    engineGlobal.loadSoundDic[e].isNowLoad = !1, null != n && n instanceof cc.AudioClip && engine.gameMemoryManagement.addSoundDic(e, n), null != t.playSound && (t.playSound(t.url), t.playSound = null)
                }))
            }
        });
        cc._RF.pop()
    }, {}],
    GameSound: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b3b63fMhE1GDbwO4C5ODOxD", "GameSound");
        var n = e("GameSoundLoad");
        cc.Class({
            properties: {
                isInit: null,
                soundVolume: null,
                backgroundSoundVolume: null,
                effectSoundVolume: null,
                stopSound: null,
                stopBackgroundSound: null,
                stopEffectSound: null,
                playBackgroundSoundUrl: null,
                lastTimeDic: null,
                loadSoundDic: null
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.soundVolume = 1, this.backgroundSoundVolume = 1, this.effectSoundVolume = 1, this.stopBackgroundSound = 0, this.stopEffectSound = 0, this.stopSound = 0, this.playBackgroundSoundUrl = "", this.lastTimeDic = new Object, this.loadSoundDic = new Object)
            },
            stopBackgroundMusic: function() {
                this.stopBackgroundSound = 1, cc.audioEngine.setMusicVolume(0)
            },
            openBackgroundMusic: function() {
                this.stopBackground = 0, cc.audioEngine.setMusicVolume(this.backgroundSoundVolume)
            },
            changeBackgroundMusicState: function() {
                1 == this.stopBackground ? this.openBackgroundMusic() : this.stopBackgroundMusic()
            },
            stopEffectMusic: function() {
                this.stopEffectSound = 1, cc.audioEngine.setEffectsVolume(0)
            },
            openEffectMusic: function() {
                this.stopEffectSound = 0, cc.audioEngine.setEffectsVolume(this.effectSoundVolume)
            },
            changeEffectMusicState: function() {
                1 == this.stopEffect ? this.openEffectMusic() : this.stopEffectMusic()
            },
            stopMusic: function() {
                this.stopSound = 1, this.stopBackgroundMusic(), this.stopEffectMusic()
            },
            openMusic: function() {
                this.stopSound = 0, this.openBackgroundMusic(), this.openEffectMusic()
            },
            playEffect: function(e) {
                var t = engine.gameTime.getLocalTime();
                if (!(null != this.lastTimeDic[e] && t - engineGlobal.playEffectMinTime <= this.lastTimeDic[e])) {
                    this.lastTimeDic[e] = t;
                    var i = engine.gameMemoryManagement.getSound(e);
                    if (null != i) cc.audioEngine.playEffect(i);
                    else(new n).loadEffectSound(e)
                }
            },
            playMusic: function(e, t) {
                null == t && (t = !0);
                var i = this;
                this.playMusicUrl = e;
                var a = engine.gameMemoryManagement.getSound(e);
                if (null == a) {
                    var o = new n;
                    o.playSound = function(e) {
                        if (e == i.playMusicUrl) {
                            var n = engine.gameMemoryManagement.getSound(e);
                            null != n && cc.audioEngine.playMusic(n, t)
                        }
                    }, o.loadBackgroundSound(e)
                } else cc.audioEngine.playMusic(a, t)
            }
        });
        cc._RF.pop()
    }, {
        GameSoundLoad: "GameSoundLoad"
    }],
    GameTime: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1539fBXwYRE1IAPL/tDTapn", "GameTime");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                localTime: null,
                updateCount: null,
                updateManageFun: null
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0;
                    var e = new Date;
                    this.localTime = e.getTime(), this.updateCount = 0, this.setFrameRate(engineGlobal.gameFrame)
                }
            },
            updateTime: function(e) {
                if (this.localTime = this.localTime + parseInt(1e3 * e), this.updateCount++, this.updateCount > engineGlobal.gameFrame) {
                    this.updateCount = 0;
                    var t = new Date;
                    this.localTime = t.getTime()
                }
                null != this.updateManageFun && this.updateManageFun(this.localTime, e)
            },
            setFrameRate: function(e) {
                this.updateCount = 0, engineGlobal.gameFrame = e, cc.game.setFrameRate(e), this.unschedule(this.updateTime), this.schedule(this.updateTime, 1 / e)
            },
            getLocalTime: function() {
                return this.localTime
            },
            refreshLocal: function() {
                var e = new Date;
                this.localTime = e.getTime()
            },
            formatTime: function(e) {
                var t = "";
                if (e <= 0) t = "00:00:00";
                else {
                    var i = Math.floor(e / 1e3),
                        n = Math.floor(i / 3600);
                    n < 10 && (n = "0" + n);
                    var a = Math.floor(i % 3600 / 60);
                    a < 10 && (a = "0" + a);
                    var o = Math.floor(i % 60);
                    o < 10 && (o = "0" + o), t = n + ":" + a + ":" + o
                }
                return t
            }
        });
        cc._RF.pop()
    }, {}],
    Game: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5825c3YYGxNSqZcKZlk4UMy", "Game"), window.isGameInit = !1, window.isLogin = !1, window.analysisFun = function(e) {}, window.gameInit = function() {
            0 == isGameInit && (isGameInit = !0, initEngine(), initRes(), initGame(), initGameSDK())
        }, cc._RF.pop()
    }, {}],
    GuessLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5ff52dERnFAMaRYi4iy/lcX", "GuessLayer");
        var n = e("NumCalculate"),
            a = (e("FishingNode"), e("GameExternalImage"));
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isInitData: null,
                userData: null,
                userData2: null,
                userData3: null,
                fishingUI1: null,
                fishingUI2: null,
                fishingUI3: null,
                shotProfitLayer: null,
                shotFishMask: null,
                turntableLayer: null,
                maxFishID: null,
                guessUpLayer: null
            },
            onDestroy: function() {
                this.isInit = null, this.isInitData = null, this.userData = null, this.userData2 = null, this.userData3 = null, this.fishingUI1 = null, this.fishingUI2 = null, this.fishingUI3 = null, this.shotProfitLayer = null, this.shotFishMask = null, this.turntableLayer = null, this.maxFishID = null, this.guessUpLayer = null
            },
            destroyNode: function() {
                null != this.shotFishMask && this.shotFishMask.destroy(), this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.turntableLayer = e, this.fishingUI1 = this.node.getChildByName("fishingUI1btn"), this.fishingUI2 = this.node.getChildByName("fishingUI2btn"), this.fishingUI3 = this.node.getChildByName("fishingUI3btn");
                    if (this.fishingUI1.getChildByName("fishingUI2sp").runAction(cc.sequence(cc.moveBy(2, 0, 10), cc.moveBy(2, 0, -10)).repeatForever()), this.fishingUI2.getChildByName("fishingUI2sp").runAction(cc.sequence(cc.moveBy(2, 0, 10), cc.moveBy(2, 0, -10)).repeatForever()), this.fishingUI3.getChildByName("fishingUI2sp").runAction(cc.sequence(cc.moveBy(2, 0, 10), cc.moveBy(2, 0, -10)).repeatForever()), guideTurnNoviceLayer) {
                        guideTurnNoviceLayer.destroy(), guideTurnNoviceLayer = null;
                        var t = new cc.Node;
                        t.x = -155, t.y = -20, this.node.addChild(t, 10), t.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), t.runAction(cc.sequence(cc.spawn(cc.moveBy(.5, 20, 20), cc.scaleTo(.5, 1.2)), cc.spawn(cc.moveBy(.5, -20, -20), cc.scaleTo(.5, 1)), cc.spawn(cc.moveBy(.5, 20, 20), cc.scaleTo(.5, 1.2)), cc.spawn(cc.moveBy(.5, -20, -20), cc.scaleTo(.5, 1)), cc.callFunc(function() {
                            t.destroy()
                        }))), gameConfigData.isUnderwayNovice = !1
                    }
                    heroData.shopData.refreshLastFishFun(), this.isInit = !0
                }
            },
            initData: function(e, t) {
                if (1 != this.isInitData) {
                    this.userData = e, t && (this.userData2 = t[0], this.userData3 = t[1]), this.maxFishID = heroData.shopData.lastBuyFishID;
                    var i = this.randomUIDataFun();
                    this.guessUpLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fishing_guess_upui_prefab), this.guessUpLayer.y = 557, this.node.addChild(this.guessUpLayer, 11), this.guessUpLayer.addComponent("GuessUpBg").initData(i, e), this.startFishingFun(), this.isInitData = !0
                }
            },
            refreshLayerFun: function(e) {
                this.turntableLayer.getComponent("TurntableLayer").createGuessFishFun(e), this.destroyNode()
            },
            hideAll: function(e) {
                var t = this;
                this.fishingUI1.getChildByName("fishingUI2sp").stopAllActions(), this.fishingUI2.getChildByName("fishingUI2sp").stopAllActions(), this.fishingUI3.getChildByName("fishingUI2sp").stopAllActions(), this.fishingUI1.getChildByName("fishingUI2sp").active = !1, this.fishingUI2.getChildByName("fishingUI2sp").active = !1, this.fishingUI3.getChildByName("fishingUI2sp").active = !1;
                var i = function(e) {
                        var i = "";
                        switch (e) {
                            case 3:
                                i = t.userData.photo;
                                break;
                            case 2:
                                i = t.userData2.photo;
                                break;
                            case 1:
                                i = t.userData3.photo
                        }
                        return i
                    },
                    n = function(e) {
                        var i = "";
                        switch (e) {
                            case 3:
                                i = t.userData.name;
                                break;
                            case 2:
                                i = t.userData2.name;
                                break;
                            case 1:
                                i = t.userData3.name
                        }
                        return i
                    },
                    o = this.fishingUI1.getChildByName("photonode");
                o.active = !0;
                var s = new a;
                s.loadImage(i(this.fishingUI1.dataList[0]), null, 135, 135), o.getChildByName("mask").addChild(s), o.getChildByName("nametxt").getComponent(cc.Label).string = n(this.fishingUI1.dataList[0]), o.scaleX = 0, o.scaleY = 0;
                var l = this.fishingUI2.getChildByName("photonode");
                l.active = !0;
                var r = new a;
                r.loadImage(i(this.fishingUI2.dataList[0]), null, 135, 135), l.getChildByName("mask").addChild(r), l.getChildByName("nametxt").getComponent(cc.Label).string = n(this.fishingUI2.dataList[0]), l.scaleX = 0, l.scaleY = 0;
                var c = this.fishingUI3.getChildByName("photonode");
                c.active = !0;
                var d = new a;
                d.loadImage(i(this.fishingUI3.dataList[0]), null, 135, 135), c.getChildByName("mask").addChild(d), c.getChildByName("nametxt").getComponent(cc.Label).string = n(this.fishingUI3.dataList[0]), c.scaleX = 0, c.scaleY = 0, this.node.getChildByName("fishingUI1btn").runAction(cc.sequence(cc.callFunc(function() {
                    o.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.25, 1.2), cc.scaleTo(.2, .9), cc.scaleTo(.15, 1)))
                }), cc.delayTime(1.3), cc.scaleTo(.2, 0), cc.callFunc(function() {
                    t.node.getChildByName("fishingUI1btn").active = !1
                }))), this.node.getChildByName("fishingUI2btn").runAction(cc.sequence(cc.callFunc(function() {
                    l.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.25, 1.2), cc.scaleTo(.2, .9), cc.scaleTo(.15, 1)))
                }), cc.delayTime(1.3), cc.scaleTo(.2, 0), cc.callFunc(function() {
                    t.node.getChildByName("fishingUI2btn").active = !1
                }))), this.node.getChildByName("fishingUI3btn").runAction(cc.sequence(cc.callFunc(function() {
                    c.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.25, 1.2), cc.scaleTo(.2, .9), cc.scaleTo(.15, 1)))
                }), cc.delayTime(1.3), cc.scaleTo(.2, 0), cc.callFunc(function() {
                    t.node.getChildByName("fishingUI3btn").active = !1
                }))), this.node.getChildByName("fishingUi20sp").active = !1, this.guessUpLayer.runAction(cc.sequence(cc.delayTime(1.3), cc.moveBy(.2, 0, 400), cc.callFunc(function() {
                    t.guessUpLayer.avtive = !1, e()
                })))
            },
            shotFishMaskFun: function(e) {
                e && 1 == e ? null == this.shotFishMask ? (this.shotFishMask = new cc.Node, this.shotFishMask.width = engine.gameAdapterInfo.getPercentageX(1), this.shotFishMask.height = engine.gameAdapterInfo.getPercentageY(1), engine.gameAdapterInfo.addSceneNode(this.shotFishMask, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), this.shotFishMask.addComponent(cc.BlockInputEvents)) : this.shotFishMask.active = !0 : e && 2 == e && null != this.shotFishMask && (this.shotFishMask.active = !1)
            },
            randomUIDataFun: function() {
                var e = ["13", "14", "15"],
                    t = ["21", "22", "23"],
                    i = gameConfigData.shotFishConfig[this.maxFishID].guessWinGold,
                    a = gameConfigData.shotFishConfig[this.maxFishID].guessFailGold,
                    o = [{
                        type: 1,
                        value: a
                    }, {
                        type: 2,
                        value: a
                    }, {
                        type: 3,
                        value: i
                    }];
                e = this.disorderFun(e), t = this.disorderFun(t), o = this.disorderFun(o), this.fishingUI1.dataList = [o[0].type, o[0].value, e[0], t[0]], this.fishingUI2.dataList = [o[1].type, o[1].value, e[1], t[1]], this.fishingUI3.dataList = [o[2].type, o[2].value, e[2], t[2]], this.refreshUIFun();
                var s = new n;
                if (s.loadSaveData(i), gameConfigData.transformationProfit.basicGoldProfit > 1) {
                    var l = new n;
                    l.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), s.multiplicationNum(l)
                }
                return s.getNumText()
            },
            refreshUIFun: function() {
                this.fishingUI1.getChildByName("fishingUI1sp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg2p_plist, "fishingUi" + this.fishingUI1.dataList[2]), this.fishingUI1.getChildByName("fishingUI2sp").getChildByName("fishingNumsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg1p_plist, "fishingUi" + this.fishingUI1.dataList[3]), this.fishingUI2.getChildByName("fishingUI1sp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg2p_plist, "fishingUi" + this.fishingUI2.dataList[2]), this.fishingUI2.getChildByName("fishingUI2sp").getChildByName("fishingNumsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg1p_plist, "fishingUi" + this.fishingUI2.dataList[3]), this.fishingUI3.getChildByName("fishingUI1sp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg2p_plist, "fishingUi" + this.fishingUI3.dataList[2]), this.fishingUI3.getChildByName("fishingUI2sp").getChildByName("fishingNumsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg1p_plist, "fishingUi" + this.fishingUI3.dataList[3])
            },
            randomNum: function(e, t) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * e + 1, 10);
                    case 2:
                        return parseInt(Math.random() * (t - e + 1) + e, 10);
                    default:
                        return 0
                }
            },
            randomFun2: function(e) {
                var t = e * Math.random();
                return Math.random() > .5 ? -1 * t : 1 * t
            },
            disorderFun: function(e) {
                return e.sort(function() {
                    return Math.random() > .5 ? -1 : 1
                })
            },
            startFishingFun: function() {
                this.fishingUI1.on(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), this.fishingUI2.on(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), this.fishingUI3.on(cc.Node.EventType.TOUCH_END, this.touchEndFun, this)
            },
            endFishingFun: function() {
                this.fishingUI1.off(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), this.fishingUI2.off(cc.Node.EventType.TOUCH_END, this.touchEndFun, this), this.fishingUI3.off(cc.Node.EventType.TOUCH_END, this.touchEndFun, this)
            },
            touchEndFun: function(e) {
                var t = e.target,
                    i = e.target.dataList;
                this.endFishingFun();
                var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.combineStars_particle_prefab);
                n.x = t.x, n.y = t.y, this.node.addChild(n), n.getComponent(cc.ParticleSystem).resetSystem(), this.guessEndLayerFun(i), t.runAction(cc.sequence(cc.delayTime(.7), cc.callFunc(function() {
                    n.destroy()
                })))
            },
            guessEndLayerFun: function(e) {
                var t = this;
                this.hideAll(function() {
                    var i;
                    i = 3 == e[0] ? engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_guess_end2_prefab) : engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_guess_end_prefab), engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex);
                    var a = i.addComponent("GuessProfitLayer"),
                        o = new n;
                    if (o.loadSaveData(e[1]), gameConfigData.transformationProfit.basicGoldProfit > 1) {
                        var s = new n;
                        s.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), o.multiplicationNum(s)
                    }
                    a.initialize({
                        name: t.userData.name,
                        photo: t.userData.photo,
                        gold: o.getSaveData()
                    }, function() {
                        t.backMainLayerFun()
                    }, e[0])
                })
            },
            backMainLayerFun: function() {
                this.shotFishMaskFun(1), mainSceneContol.mainLayer.active = !0, mainSceneContol.bgLayer.active = !0, this.turntableLayer.destroy(), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        FishingNode: "FishingNode",
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    GuessProfitLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a5db2ze98hKSrMmzjfrmdTc", "GuessProfitLayer");
        var n = e("NumCalculate"),
            a = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                getGoldNum: null,
                callback: null,
                type: null
            },
            onDestroy: function() {
                this.isInit = null, this.getGoldNum = null, this.callback = null, this.type = null
            },
            destroyNode: function() {
                this.node.getChildByName("basenode").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("basenode").getChildByName("btnimg1btn").off(cc.Node.EventType.TOUCH_END, this.clickOKbtnFun, this), null != this.callback && this.callback(), this.node.destroy()
            },
            initialize: function(e, t, i) {
                if (1 != this.isInit) {
                    var o = this;
                    this.callback = t, this.type = i, this.node.getChildByName("basenode").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("basenode").getChildByName("btnimg1btn").on(cc.Node.EventType.TOUCH_END, this.clickOKbtnFun, this), this.getGoldNum = new n, this.getGoldNum.loadSaveData(e.gold), this.node.getChildByName("basenode").getChildByName("goldart").getComponent("GameArtWord").setString("+" + this.getGoldNum.getNumText()), this.node.getChildByName("basenode").getChildByName("nametxt").getComponent(cc.Label).string = e.name;
                    var s = new a;
                    s.loadImage(e.photo, null, 135, 135), this.node.getChildByName("basenode").getChildByName("mask").addChild(s), this.node.getChildByName("basenode").getChildByName("fishingUi18sp").scaleX = 0, this.node.getChildByName("basenode").getChildByName("fishingUi18sp").scaleY = 0, this.node.getChildByName("basenode").getChildByName("fishingUi18sp").runAction(cc.sequence(cc.delayTime(.7), cc.scaleTo(.2, 1.02, .98), cc.callFunc(function() {
                        var e = new cc.Node;
                        e.scaleX = 2, e.scaleY = 2, e.x = -99, e.y = 232;
                        var t = e.addComponent(sp.Skeleton);
                        o.node.getChildByName("basenode").addChild(e), e.zIndex = UIzIndexInfo.UIFingerIndex, t.skeletonData = engine.gameMemoryManagement.getSpine(mustSpine.colouredribbon_spine), t.loop = !1, t.timeScale = .6, t.animation = "float";
                        var i = new cc.Node;
                        i.scaleX = -2, i.scaleY = 2, i.x = 125, i.y = 234;
                        var n = i.addComponent(sp.Skeleton);
                        o.node.getChildByName("basenode").addChild(i), i.zIndex = UIzIndexInfo.UIFingerIndex, n.skeletonData = engine.gameMemoryManagement.getSpine(mustSpine.colouredribbon_spine), n.loop = !1, n.timeScale = .6, n.animation = "float"
                    }), cc.scaleTo(.2, 1, 1))), this.node.getChildByName("basenode").scaleX = 0, this.node.getChildByName("basenode").scaleY = 0, this.node.getChildByName("basenode").runAction(cc.sequence(cc.delayTime(.3), cc.scaleTo(.3, 1.02, 1.02), cc.scaleTo(.2, 1, 1))), this.node.getChildByName("basenode").getChildByName("fishingUi16sp").runAction(cc.rotateBy(60, 360).repeatForever()), this.isInit = !0
                }
            },
            addSingleGold: function() {
                heroData.gamePlayData.addedGold(this.getGoldNum), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1, UIzIndexInfo.UIShotStopIndex), this.destroyNode()
            },
            addDoubleGold: function() {
                var e = new n;
                e.loadSaveData([2]), this.getGoldNum.multiplicationNum(e), heroData.gamePlayData.addedGold(this.getGoldNum), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1), this.destroyNode()
            },
            clickOKbtnFun: function() {
                var e = this;
                3 == this.type ? (gameSDK.logEvent("guessProfitShare", 1, {
                    guessProfitShare: "guessProfitShare"
                }), gameSDK.newCreateInterstitialAd(advCode11, function() {
                    e.addDoubleGold()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })) : this.addSingleGold()
            },
            clickClosebtnFun: function() {
                this.addSingleGold()
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    GuessUpBg: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "336c1TpW6VBjoex2D4fEP9W", "GuessUpBg");
        var n = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                photo: null
            },
            onDestroy: function() {
                this.isInit = null, this.photo = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.y += 200, this.node.runAction(cc.sequence(cc.moveBy(.4, 0, -210), cc.moveBy(.1, 0, 10))), this.isInit = !0)
            },
            initData: function(e, t) {
                if (!t || 0 == t.length) {
                    var i = getGolRankTestData();
                    t = i[parseInt(Math.random() * i.length)]
                }
                this.photo = new n, this.photo.loadImage(t.photo, null, 105, 105), this.node.getChildByName("fishingUi1sp").getChildByName("playericonnode").addChild(this.photo), this.node.getChildByName("fishingUi1sp").getChildByName("nametxt").getComponent(cc.Label).string = t.name, this.node.getChildByName("fishingUi1sp").getChildByName("goldart").getComponent("GameArtWord").setString(e.toString())
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage"
    }],
    HelpGoldLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6b625hnFWxBbIz8exlUEfM5", "HelpGoldLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                gold: null,
                speedpertxt: null,
                productionPer: null
            },
            onDestroy: function() {
                this.isInit = null, this.gold = null, this.speedpertxt = null, this.productionPer = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.productionPer = [0], this.gold = this.node.getChildByName("goldcountart").getComponent("GameArtWord"), this.speedpertxt = this.node.getChildByName("speedpertxt").getComponent(cc.Label), this.refreshGold())
            },
            refreshGold: function() {
                var e = heroData.gold.getNumText();
                this.gold.setString(e.toString())
            },
            refreshProductionPer: function(e, t) {
                "0" == e ? this.node.getChildByName("speedpertxt").active = !1 : (this.node.getChildByName("speedpertxt").active = !0, this.speedpertxt.string = e + "/s"), t && (this.productionPer = t)
            },
            clickHelpFun: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.help_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5));
                e.addComponent("HelpLayer")
            }
        }), cc._RF.pop()
    }, {}],
    HelpLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "298130Js0VJ+bMisgqKX7+Z", "HelpLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this))
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    HeroData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7e344KnHHBAMZ51jMXa4efD", "HeroData");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = e("LocalSaveData"),
            o = e("FaceBookSaveData"),
            s = e("GamePlayData"),
            l = e("ShopData"),
            r = e("NumCalculate"),
            c = (e("TileMapLayerData"), e("FishNode"));
        window.isFirstEnterGame = !0;
        cc.Class({
            properties: {
                isInit: null,
                saveDataControl: null,
                gold: null,
                diamond: null,
                evolMoney: null,
                hasGold: null,
                usedGold: null,
                shopFishPriceList: null,
                mainFishList: null,
                achievementDataList: null,
                haveFish: null,
                speedUpTime: null,
                lastCloseGameTime: null,
                isGetOutLine: null,
                gamePlayData: null,
                shopData: null,
                advertisementOverTime: null,
                fishTankDataList: null,
                curFishTankInfo: null,
                noviceGuidance: null,
                watchUpTimes: null,
                loginDay: null,
                variationTimes: null,
                variationNeedTimes: null,
                variationBuyTimes: null,
                soundOpen: null,
                advAddFishTimes: null,
                currentBoxTimes: null,
                turntableLastTime: null,
                turntableTimes: null,
                freeGoldTime: null,
                turntableAdvTimes: null,
                friendsRewardData: null,
                isFirstCrab: null,
                friendShareList: null,
                newUserFriends: null,
                firstPlayDay: null,
                isStartCrab: null,
                attackTable: null,
                goldMul: null,
                usedFishing: null,
                usedGuess: null,
                totalRecordList: null,
                transformationData: null,
                transformationTimes: null,
                isTransformNovice: null,
                haveReceiveMessageDiamond: null,
                rewardWayData: null,
                everydayLogin: null
            },
            onDestroy: function() {
                this.isInit = null, this.saveDataControl = null, this.gold = null, this.diamond = null, this.evolMoney = null, this.hasGold = null, this.usedGold = null, this.achievementDataList = null, this.haveFish = null, this.speedUpTime = null, this.lastCloseGameTime = null, this.isGetOutLine = null, this.gamePlayData = null, this.shopData = null, this.advertisementOverTime = null, this.noviceGuidance = null, this.fishTankDataList = null, this.curFishTankInfo = null, this.watchUpTimes = null, this.loginDay = null, this.variationTimes = null, this.variationNeedTimes = null, this.variationBuyTimes = null, this.soundOpen = null, this.advAddFishTimes = null, this.currentBoxTimes = null, this.turntableLastTime = null, this.turntableTimes = null, this.freeGoldTime = null, this.turntableAdvTimes = null, this.friendsRewardData = null, this.isFirstCrab = null, this.friendShareList = null, this.newUserFriends = null, this.isStartCrab = null, this.attackTable = null, this.goldMul = null, this.usedFishing = null, this.usedGuess = null, this.totalRecordList = null, this.transformationData = null, this.transformationTimes = null, this.isTransformNovice = null, this.haveReceiveMessageDiamond = null, this.rewardWayData = null, this.everydayLogin = null
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    switch (this.isInit = !0, this.isGetOutLine = !1, null == e ? (e = new Object, isFirstEnterGame = !0) : isFirstEnterGame = !1, userDataSaveType) {
                        case faceBookSaveData:
                            this.saveDataControl = new o;
                            break;
                        case faceBookTsetSaveData:
                            this.saveDataControl = new a
                    }
                    if (this.gold = new r, null != e.gold ? this.gold.loadSaveData(e.gold) : this.gold.loadSaveData([0, 5]), null != e.haveReceiveMessageDiamond ? this.haveReceiveMessageDiamond = e.haveReceiveMessageDiamond : this.haveReceiveMessageDiamond = 0, this.diamond = new r, null != e.diamond ? this.diamond.loadSaveData(e.diamond) : this.diamond.loadSaveData([0]), this.evolMoney = new r, null != e.evolMoney ? this.evolMoney.loadSaveData(e.evolMoney) : this.evolMoney.loadSaveData([0]), this.hasGold = new r, null != e.hasGold ? this.hasGold.loadSaveData(e.hasGold) : this.hasGold.loadSaveData([0]), this.usedGold = new r, null != e.usedGold ? this.usedGold.loadSaveData(e.usedGold) : this.usedGold.loadSaveData([0]), e.advertisementOverTime && (this.advertisementOverTime = e.advertisementOverTime), e.shopFishPriceList && (this.shopFishPriceList = e.shopFishPriceList), this.shopFishPriceList || (this.shopFishPriceList = new Object, this.shopFishPriceList[1001] = {
                            fishID: "1001",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1002] = {
                            fishID: "1002",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1003] = {
                            fishID: "1003",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1004] = {
                            fishID: "1004",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1005] = {
                            fishID: "1005",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1006] = {
                            fishID: "1006",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1007] = {
                            fishID: "1007",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1008] = {
                            fishID: "1008",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1009] = {
                            fishID: "1009",
                            count: 0,
                            unlockCount: 0
                        }, this.shopFishPriceList[1010] = {
                            fishID: "1010",
                            count: 0,
                            unlockCount: 0
                        }), e.totalRecordList && (this.totalRecordList = e.totalRecordList), !this.totalRecordList)
                        for (var t in this.totalRecordList = new Object, this.shopFishPriceList) this.totalRecordList[t] = cloneObjFun(this.shopFishPriceList[t]);
                    if (null != e.haveFish ? this.haveFish = e.haveFish : (this.haveFish = new Object, this.haveFish[1001] = 1), null != e.rewardWayData ? (this.rewardWayData = e.rewardWayData, this.rewardWayData.getRewardTimes || (this.rewardWayData.getRewardTimes = 0)) : (this.rewardWayData = new Object, this.rewardWayData.getRewardTimes = 0), null != e.everydayLogin ? this.everydayLogin = e.everydayLogin : this.everydayLogin = 0, null != e.speedUpTime ? this.speedUpTime = e.speedUpTime : this.speedUpTime = 0, null != e.watchUpTimes ? this.watchUpTimes = e.watchUpTimes : this.watchUpTimes = 0, null != e.advAddFishTimes ? this.advAddFishTimes = e.advAddFishTimes : this.advAddFishTimes = 0, null != e.currentBoxTimes ? this.currentBoxTimes = e.currentBoxTimes : this.currentBoxTimes = 0, null != e.turntableTimes ? this.turntableTimes = e.turntableTimes : this.turntableTimes = gameConfigData.turntableRefTimes, null != e.freeGoldTime ? this.freeGoldTime = e.freeGoldTime : this.freeGoldTime = 0, null != e.turntableAdvTimes ? this.turntableAdvTimes = e.turntableAdvTimes : this.turntableAdvTimes = gameConfigData.turntableAdvRefTimes, null != e.friendsRewardData ? this.friendsRewardData = e.friendsRewardData : this.friendsRewardData = new Object, null != e.attackTable ? this.attackTable = e.attackTable : this.attackTable = new Object, null != e.isFirstCrab ? (0 == e.isFirstCrab ? e.isFirstCrab = 0 : 1 == e.isFirstCrab && (e.isFirstCrab = 1), this.isFirstCrab = e.isFirstCrab) : this.isFirstCrab = 0, null != e.isStartCrab ? (0 == e.isStartCrab ? e.isStartCrab = 0 : 1 == e.isStartCrab && (e.isStartCrab = 1), this.isStartCrab = e.isStartCrab) : this.isStartCrab = 0, null != e.friendShareList ? this.friendShareList = e.friendShareList : this.friendShareList = new Object, null != e.newUserFriends ? (0 == e.newUserFriends ? e.newUserFriends = 0 : 1 == e.newUserFriends && (e.newUserFriends = 1), this.newUserFriends = e.newUserFriends) : this.newUserFriends = 1, null != e.firstPlayDay) this.firstPlayDay = e.firstPlayDay;
                    else {
                        var i = 100 * (m = new Date).getMonth() + m.getDate();
                        this.firstPlayDay = i
                    }
                    if (null != e.turntableLastTime ? this.turntableLastTime = e.turntableLastTime : this.turntableLastTime = 0, null != e.usedFishing ? (0 == e.usedFishing ? e.usedFishing = 0 : 1 == e.usedFishing && (e.usedFishing = 1), this.usedFishing = e.usedFishing) : this.usedFishing = 0, null != e.usedGuess ? (0 == e.usedGuess ? e.usedGuess = 0 : 1 == e.usedGuess && (e.usedGuess = 1), this.usedGuess = e.usedGuess) : this.usedGuess = 0, null != e.isTransformNovice ? (0 == e.isTransformNovice ? e.isTransformNovice = 0 : 1 == e.isTransformNovice && (e.isTransformNovice = 1), this.isTransformNovice = e.isTransformNovice) : this.isTransformNovice = 1, null != e.lastCloseGameTime ? this.lastCloseGameTime = e.lastCloseGameTime : this.lastCloseGameTime = 0, null != e.transformationData) this.transformationData = e.transformationData;
                    else
                        for (var n in this.transformationData = new Object, this.transformationData[1001] = {
                                id: 1001,
                                unlock: 0
                            }, this.transformationData[1002] = {
                                id: 1002,
                                unlock: 0
                            }, this.transformationData[1003] = {
                                id: 1003,
                                unlock: 0
                            }, this.transformationData[1004] = {
                                id: 1004,
                                unlock: 0
                            }, this.transformationData[1005] = {
                                id: 1005,
                                unlock: 0
                            }, this.transformationData[1006] = {
                                id: 1006,
                                unlock: 0
                            }, gameConfigData.transformationList) {
                            var s = gameConfigData.transformationList[n].id;
                            this.transformationData[s] || (this.transformationData[s] = {
                                id: s,
                                unlock: 0
                            })
                        }
                    if (null != e.transformationTimes ? this.transformationTimes = e.transformationTimes : this.transformationTimes = 0, null !== e.mainFishList && (this.mainFishList = e.mainFishList), !this.mainFishList) {
                        var l = gameConfigData.gridConfigData.gridMaxX,
                            c = gameConfigData.gridConfigData.gridMaxY;
                        this.mainFishList = [];
                        for (var d = 0; d < l; d++) {
                            this.mainFishList.push([]);
                            for (var h = 0; h < c; h++) this.mainFishList[d][h] = null
                        }
                    }
                    for (var g in null != e.noviceGuidance ? "0" == e.noviceGuidance || e.noviceGuidance >= 100 ? this.noviceGuidance = e.noviceGuidance : this.noviceGuidance = "100" : null == e.gold && (this.noviceGuidance = "0", this.saveHeroData()), null !== e.variationBuyTimes && (this.variationBuyTimes = e.variationBuyTimes), null == this.variationBuyTimes && (this.variationBuyTimes = 0, this.saveHeroData()), this.achievementDataList = new Object, gameConfigData.achievementConfig) null != e.achievementDataList && null != e.achievementDataList[g] ? this.achievementDataList[g] = e.achievementDataList[g] : this.achievementDataList[g] = 0;
                    for (var u in this.initShopData(), this.fishTankDataList = new Object, gameConfigData.fishtankConfig) null != e.fishTankDataList && null != e.fishTankDataList[u] ? this.fishTankDataList[u] = e.fishTankDataList[u] : this.fishTankDataList[u] = 0;
                    if (this.curFishTankInfo = new Object, null != e.curFishTankInfo)
                        for (var u in e.curFishTankInfo) this.curFishTankInfo[u] = e.curFishTankInfo[u];
                    else this.curFishTankInfo.curFishTankType = "1001", this.curFishTankInfo.curFishTankLv = 1;
                    this.variationTimes = null, this.variationNeedTimes = null, null == e.variationTimes ? this.variationTimes = 0 : this.variationTimes = e.variationTimes, null == e.variationNeedTimes ? this.variationNeedTimes = gameConfigData.getVariationTimes() : this.variationNeedTimes = e.variationNeedTimes;
                    i = 100 * (m = new Date).getMonth() + m.getDate();
                    var m, f = !1;
                    null == e.loginDay ? (this.loginDay = i, f = !0) : (this.loginDay = e.loginDay, this.loginDay != i && (this.loginDay = i, f = !0)), this.isRefreshDay(f), null != e.soundOpen ? (0 == e.soundOpen ? e.soundOpen = 0 : 1 == e.soundOpen && (e.soundOpen = 1), this.soundOpen = e.soundOpen) : this.soundOpen = 1, null != e.goldMul ? this.goldMul = e.goldMul : this.goldMul = 1, this.transformationRefFun(), ccLog("服务器数据:"), ccLog(e), ccLog("赋值后的本地数据:"), ccLog(heroData)
                }
            },
            getEvolutionIDFun: function() {
                var e = 0,
                    t = 0,
                    i = 1;
                for (var n in heroData.transformationData) e += heroData.transformationData[n].unlock;
                var a = Object.keys(heroData.transformationData).length;
                return a > 0 && (i += parseInt((e + a) % a)), e > 0 ? e < gameConfigData.transformationConfig.maxUpgrade && (t = (1e3 + i).toString()) : t = "1001", t
            },
            transformationRefFun: function() {
                for (var e = Object.keys(gameConfigData.transformationProfit), t = 0; t < e.length; t++) this.transformationProfitFun(e[t])
            },
            transformationProfitFun: function(e) {
                switch (e) {
                    case "basicGoldProfit":
                        (function() {
                            var e = [];
                            for (var t in gameConfigData.transformationList) "basicGoldProfit" == gameConfigData.transformationList[t].type && e.push(heroData.transformationData[t]);
                            gameConfigData.transformationProfit.basicGoldProfit = gameConfigData.transformationInitProfit.basicGoldProfit + function(e) {
                                for (var t = 0, i = 0; i < e.length; i++) {
                                    var n = e[i],
                                        a = gameConfigData.transformationList[n.id];
                                    n.unlock > 0 && (t += parseInt(a.value * n.unlock))
                                }
                                return t
                            }(e)
                        })()
                }
            },
            initShopData: function() {
                this.shopData = new l, this.shopData.initialize()
            },
            initGameData: function() {
                this.gamePlayData = new s, this.shopData = new l, this.gamePlayData.initialize(), this.shopData.initialize()
            },
            isRefreshDay: function(e) {
                1 == e && (this.watchUpTimes = 0, this.advAddFishTimes = 0, this.currentBoxTimes = 0, this.haveReceiveMessageDiamond = 0, this.turntableTimes < gameConfigData.turntableRefTimes ? this.turntableTimes = gameConfigData.turntableRefTimes : this.turntableTimes > gameConfigData.turntableWaitMaxTimes && (this.turntableTimes = gameConfigData.turntableWaitMaxTimes), this.turntableLastTime = 0, this.turntableAdvTimes = gameConfigData.turntableAdvRefTimes, this.friendShareList = new Object, this.everydayLogin = 0), this.firstPlayDay != this.loginDay && (this.newUserFriends = 0)
            },
            updateHaveFish: function(e, t) {
                null == t && (t = 1), null == this.haveFish[e] ? this.haveFish[e] = t : this.haveFish[e] += t
            },
            addAchievementDiamond: function(e) {
                var t = e.achievementID;
                null != this.achievementDataList[t] && (this.achievementDataList[t] = -1);
                var i = new r;
                i.loadSaveData(e.diamond), heroData.gamePlayData.addDiamond(i), this.saveHeroData()
            },
            newFishShareAddDiamond: function() {
                var e = new r;
                e.loadSaveData(gameConfigData.newFishShareDiamond), heroData.gamePlayData.addDiamond(e), this.saveHeroData()
            },
            setFishTank: function(e) {
                for (var t in e) this.curFishTankInfo[t] = e[t];
                this.saveHeroData()
            },
            saveHeroData: function() {
                var e = new Object;
                e.gold = this.gold.getSaveData(), e.diamond = this.diamond.getSaveData(), e.hasGold = this.hasGold.getSaveData(), e.usedGold = this.usedGold.getSaveData(), e.evolMoney = this.evolMoney.getSaveData(), e.achievementDataList = this.achievementDataList, e.haveFish = this.haveFish, e.everydayLogin = this.everydayLogin, e.haveReceiveMessageDiamond = this.haveReceiveMessageDiamond, e.rewardWayData = this.rewardWayData, e.speedUpTime = this.speedUpTime, e.lastCloseGameTime = this.lastCloseGameTime, e.advertisementOverTime = this.advertisementOverTime, e.shopFishPriceList = this.shopFishPriceList, e.totalRecordList = this.totalRecordList, e.mainFishList = this.mainFishList, e.fishTankDataList = this.fishTankDataList, e.curFishTankInfo = this.curFishTankInfo, e.noviceGuidance = this.noviceGuidance, e.watchUpTimes = this.watchUpTimes, e.advAddFishTimes = this.advAddFishTimes, e.currentBoxTimes = this.currentBoxTimes, e.turntableTimes = this.turntableTimes, e.friendShareList = this.friendShareList, e.newUserFriends = this.newUserFriends, e.freeGoldTime = this.freeGoldTime, e.turntableAdvTimes = this.turntableAdvTimes, e.friendsRewardData = this.friendsRewardData, e.isFirstCrab = this.isFirstCrab, e.isStartCrab = this.isStartCrab, e.turntableLastTime = this.turntableLastTime, e.loginDay = this.loginDay, e.variationTimes = this.variationTimes, e.variationNeedTimes = this.variationNeedTimes, e.variationBuyTimes = this.variationBuyTimes, e.soundOpen = this.soundOpen, e.attackTable = this.attackTable, e.goldMul = this.goldMul, e.usedFishing = this.usedFishing, e.usedGuess = this.usedGuess, e.isTransformNovice = this.isTransformNovice, e.transformationData = this.transformationData, e.transformationTimes = this.transformationTimes;
                var t = new Object;
                t[fbSaveDataKey] = e, this.saveDataControl.save(t)
            },
            getSoundState: function() {
                return this.soundOpen
            },
            closeSound: function() {
                this.soundOpen = 0, this.saveHeroData()
            },
            openSound: function() {
                this.soundOpen = 1, this.saveHeroData()
            },
            turntableTimesFun: function(e) {
                heroData.turntableTimes += e, heroData.saveHeroData()
            },
            speedUpFun: function(e) {
                var t = gameConfigData.speedUpTime;
                e ? t = e : heroData.watchUpTimes++, 1 == mainSceneContol.mainRightLayerComponent.isSpeedUp ? heroData.speedUpTime = heroData.speedUpTime + t : heroData.speedUpTime = engine.gameTime.getLocalTime() + t, heroData.saveHeroData(), mainSceneContol.mainRightLayerComponent.updateShowTime(), heroData.gamePlayData.allFishSpeedUp()
            },
            freeGoldTimeFun: function() {
                heroData.freeGoldTime = engine.gameTime.getLocalTime() + gameConfigData.freeGoldWaitTime, this.saveHeroData()
            },
            isFirstCrabFun: function() {
                this.isFirstCrab = 1, this.saveHeroData()
            },
            isStartCrabFun: function() {
                this.isStartCrab = 1, this.saveHeroData()
            },
            getFriendsRewardFun: function(e) {
                return this.friendsRewardData[e.ID] || (this.friendsRewardData[e.ID] = new Object, this.friendsRewardData[e.ID].isReceive = "0"), this.saveHeroData(), this.friendsRewardData[e.ID].isReceive
            },
            reviseFriendsRewardFun: function(e) {
                return this.friendsRewardData[e.ID] ? this.friendsRewardData[e.ID].isReceive = "1" : (this.friendsRewardData[e.ID] = new Object, this.friendsRewardData[e.ID].isReceive = "0"), this.saveHeroData(), this.friendsRewardData[e.ID].isReceive
            },
            updateShopFishList: function(e) {
                e = e.toString(), heroData.totalRecordList[e] || (heroData.totalRecordList[e] = {
                    fishID: e,
                    count: 0,
                    unlockCount: 0
                }, this.saveHeroData()), heroData.shopFishPriceList[e] || (heroData.shopFishPriceList[e] = {
                    fishID: e,
                    count: 0,
                    unlockCount: 0
                }, this.saveHeroData())
            },
            refreshGoldFun: function() {
                var e = heroData.shopData.lastFishID()[0],
                    t = gameConfigData.fishConfig[e].gold,
                    i = new r;
                i.loadSaveData(t);
                var n = new r;
                n.loadSaveData([10]), i.multiplicationNum(n), heroData.gold.loadSaveData(i.getSaveData())
            },
            mergeFishLevelRefreshFun: function() {
                heroData.shopData.refreshLastFishFun();
                var e = parseInt((heroData.shopData.lastBuyFishID - 1e3) / 2);
                for (var t in this.shopFishPriceList) e < gameConfigData.shotFishConfig[this.shopFishPriceList[t].fishID].level ? (this.shopFishPriceList[t].count = 0, this.shopFishPriceList[t].unlockCount = 0) : this.shopFishPriceList[t].count = 0;
                heroData.shopData.lastBuyFishID = "1001"
            },
            refreshPriceFun: function() {
                var e = function(e) {
                    var t = gameConfigData.fishConfig[e.fishID],
                        i = new r;
                    i.loadSaveData(t.gold), heroData.shopData.fishPriceObj[e.fishID] = i
                };
                for (var t in heroData.shopData.fishPriceObj)(function(t) {
                    e(heroData.shopFishPriceList[t])
                })(t)
            },
            refreshFishFun: function() {
                var e = function(e, t) {
                        switch (arguments.length) {
                            case 1:
                                return parseInt(Math.random() * e + 1, 10);
                            case 2:
                                return parseInt(Math.random() * (t - e + 1) + e, 10);
                            default:
                                return 0
                        }
                    },
                    t = new cc.Node;
                t.width = engine.gameAdapterInfo.getPercentageX(1), t.height = engine.gameAdapterInfo.getPercentageY(1), engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), t.addComponent(cc.BlockInputEvents);
                for (var i = gameConfigData.gridConfigData.gridMaxX, n = gameConfigData.gridConfigData.gridMaxY, a = 0; a < i; a++)
                    for (var o = 0; o < n; o++)(function(t, i) {
                        if (null != heroData.mainFishList[t][i]) {
                            var n = heroData.gamePlayData.tileMapLayerData.gridArr[t][i];
                            if (n) {
                                var a = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.transformation_medal_prefab);
                                engine.gameAdapterInfo.addSceneNode(a, n.x, n.y, UIzIndexInfo.UIEffectIndex2), a.active = !1, n.runAction(cc.sequence(cc.scaleTo(.2, .01), cc.callFunc(function() {
                                    heroData.gamePlayData.deleteFish(n), heroData.gamePlayData.tileMapLayerData.gridArr[t][i] = null, a.active = !0, a.scaleX = .1, a.scaleY = .1;
                                    var o = mainSceneContol.mainTransformationLayerComponent.node,
                                        s = e(50, 100),
                                        l = e(-100, 200),
                                        r = e(200, 400),
                                        c = [cc.v2(a.x, a.y + s), cc.v2(a.x + r, o.y + l), cc.v2(o.x, o.y)],
                                        d = +(e(5, 10) / 10).toFixed(1);
                                    a.runAction(cc.sequence(cc.scaleTo(.2, 1.1), cc.scaleTo(.15, .9), cc.scaleTo(.1, 1), cc.bezierTo(d, c), cc.callFunc(function() {
                                        a.destroy(), a = null
                                    })))
                                })))
                            }
                            heroData.mainFishList[t][i] = null
                        }
                    })(a, o);
                t.runAction(cc.sequence(cc.delayTime(.8), cc.callFunc(function() {
                    heroData.shopData.refreshLastFishFun();
                    var e = heroData.shopData.lastBuyFishID;
                    heroData.mainFishList[0][0] = {
                        fishID: e,
                        state: 0
                    };
                    var i = new c,
                        n = gameConfigData.fishConfig[e];
                    i.state = 0, i.initialize(n), i.addFishTouchListeners(), heroData.gamePlayData.tileMapLayerData.setGridInfo(0, 0, i, !0), mainSceneContol.gamePlayLayerComponent.addFish(i), i.createShadow(), i.stopMoveFish();
                    var a = new cc.Node;
                    mainSceneContol.mainTransformationLayerComponent.isClick = !1, t.destroy(), t = null, a.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                        mainSceneContol.mainTransformationLayerComponent.btnShowFun(), mainSceneContol.mainTransformationLayerComponent.isClick = !0, a.destroy(), a = null
                    })))
                })))
            },
            getTransformRewardNumFun: function() {
                for (var e = function(e) {
                        var t = gameConfigData.transformationConfig.basicRewardRate,
                            i = Math.max(e - 10, 1);
                        return Math.pow(t, i)
                    }, t = 0, i = gameConfigData.gridConfigData.gridMaxX, n = gameConfigData.gridConfigData.gridMaxY, a = 0, o = 0; o < i; o++)
                    for (var s = 0; s < n; s++)(function(i, n) {
                        if (null != heroData.mainFishList[i][n]) {
                            var o = heroData.gamePlayData.tileMapLayerData.gridArr[i][n];
                            o && (t += e(o.fishData.level), a < o.fishData.level && (a = o.fishData.level))
                        }
                    })(o, s);
                var l = parseInt(t).toString(),
                    r = gameConfigData.transformationConfig.minFirstMoney;
                l < r && this.transformationTimes < 1 && (l = r.toString());
                var c = a + 1;
                return c > gameConfigData.highestFishLevel && (c = a), [l, parseInt(e(c)).toString()]
            },
            transformationRewardFun: function(e) {
                for (var t = e, i = [], n = 0; n < Math.ceil(t.length / 3); n++) {
                    var a = t.substring(t.length - 3 * (n + 1), t.length - 3 * n);
                    i.push(parseInt(a))
                }
                return i
            },
            transformAddMoneyFun: function() {
                var e = this.transformationRewardFun(this.getTransformRewardNumFun()[0]),
                    t = new r;
                t.loadSaveData(e), heroData.evolMoney.addNum(t)
            },
            restoreFishFun: function() {
                for (var e = gameConfigData.gridConfigData.gridMaxX, t = gameConfigData.gridConfigData.gridMaxY, i = 0; i < e; i++)
                    for (var n = 0; n < t; n++)(function(e, t) {
                        if (null != heroData.mainFishList[e][t]) {
                            var i = heroData.gamePlayData.tileMapLayerData.gridArr[e][t];
                            null != heroData.mainFishList[e][t] && 1 == heroData.mainFishList[e][t].state && (heroData.gamePlayData.backFish(i), i.deleteFishGoldPrefab())
                        }
                    })(i, n)
            },
            transformationResetFun: function(e) {
                this.transformAddMoneyFun(), heroData.transformationTimes += 1, this.mergeFishLevelRefreshFun(), this.refreshPriceFun(), this.refreshFishFun(), this.refreshGoldFun(), mainSceneContol.helpGoldLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.shopLayerComponent && (mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshDiamond()), heroData.saveHeroData(), e && e()
            }
        });
        window.addNoviceLayerFun = function() {
            var e = gameConfigData.noviceDate[heroData.noviceGuidance];
            if (null != e) {
                if (heroData.saveHeroData(), null == gameConfigData.noviceNode) gameConfigData.noviceNode = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.novice_layer_prefab), engine.gameAdapterInfo.addSceneNode(gameConfigData.noviceNode, engineGlobal.gameWidth / 2, engineGlobal.gameHeigh / 2, UIzIndexInfo.UINovicezIndex), gameConfigData.noviceNode.setContentSize(engineGlobal.gameWidth, engineGlobal.gameHeigh), gameConfigData.noviceNode.txtNode = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang2_prefab), gameConfigData.noviceNode.addChild(gameConfigData.noviceNode.txtNode, 1), gameConfigData.noviceNode.txtNode.opacity = 0, gameConfigData.noviceNode.fingerNode = new cc.Node, gameConfigData.noviceNode.addChild(gameConfigData.noviceNode.fingerNode, 3), gameConfigData.noviceNode.fingerNode.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), gameConfigData.noviceNode.fingerNode.opacity = 0;
                var t = gameConfigData.noviceNode.getChildByName("maskleft"),
                    i = gameConfigData.noviceNode.getChildByName("maskright"),
                    n = gameConfigData.noviceNode.getChildByName("maskbottom"),
                    a = gameConfigData.noviceNode.getChildByName("masktop");
                n.height = engine.gameAdapterInfo.getPercentageY(.5) + (e.fingerPos.y - e.height), a.height = engine.gameAdapterInfo.getPercentageY(.5) - (e.fingerPos.y + e.height), t.width = engine.gameAdapterInfo.getPercentageX(.5) + (e.fingerPos.x - e.width), t.y = n.height - engineGlobal.gameHeigh / 2, t.height = engineGlobal.gameHeigh - n.height - a.height, i.width = engine.gameAdapterInfo.getPercentageX(.5) - (e.fingerPos.x + e.width), i.y = n.height - engineGlobal.gameHeigh / 2, i.height = engineGlobal.gameHeigh - n.height - a.height;
                var o = function(t) {
                        gameConfigData.noviceNode.txtNode.opacity = 255, gameConfigData.noviceNode.txtNode.x = e.fingerPos.x - 25, gameConfigData.noviceNode.txtNode.y = e.fingerPos.y + 120, gameConfigData.noviceNode.txtNode.getChildByName("noticetxt").getComponent(cc.Label).string = e.txt, t && (gameConfigData.noviceNode.txtNode.x += t)
                    },
                    s = function() {
                        gameConfigData.noviceNode.fingerNode.stopAllActions(), gameConfigData.noviceNode.fingerNode.opacity = 0, gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                            gameConfigData.noviceNode.fingerNode.opacity = 255, gameConfigData.noviceNode.fingerNode.x = e.fingerPos.x + 20, gameConfigData.noviceNode.fingerNode.y = e.fingerPos.y + 20, gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.spawn(cc.moveBy(1, 20, 20), cc.scaleTo(1, 1.2)), cc.spawn(cc.moveBy(1, -20, -20), cc.scaleTo(1, 1))).repeatForever())
                        }))), o()
                    };
                "1" == heroData.noviceGuidance ? (gameSDK.logEvent("noviceGuiden1", 1, {
                    noviceGuiden1: "noviceGuiden1"
                }), s(), gameConfigData.isUnderwayNovice = !0) : "2" == heroData.noviceGuidance ? (gameSDK.logEvent("noviceGuiden2", 1, {
                    noviceGuiden2: "noviceGuiden2"
                }), s()) : "3" == heroData.noviceGuidance ? (gameSDK.logEvent("noviceGuiden3", 1, {
                    noviceGuiden3: "noviceGuiden3"
                }), gameConfigData.noviceNode.fingerNode.stopAllActions(), gameConfigData.noviceNode.fingerNode.opacity = 0, o(70), gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.callFunc(function() {
                    gameConfigData.noviceNode.fishShadow = new cc.Node, gameConfigData.noviceNode.addChild(gameConfigData.noviceNode.fishShadow, 2), gameConfigData.noviceNode.fishShadow.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + gameConfigData.fishConfig[1001].icon), gameConfigData.noviceNode.fishShadow.opacity = 0, gameConfigData.noviceNode.fishShadow.x = e.fingerPos.x, gameConfigData.noviceNode.fishShadow.y = e.fingerPos.y
                }), cc.delayTime(.1), cc.callFunc(function() {
                    gameConfigData.noviceNode.fingerNode.opacity = 255, gameConfigData.noviceNode.fingerNode.x = e.fingerPos.x + 10, gameConfigData.noviceNode.fingerNode.y = e.fingerPos.y + 15, gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.moveBy(1, 0, -120), cc.delayTime(1), cc.callFunc(function() {
                        gameConfigData.noviceNode.fingerNode.x = e.fingerPos.x + 10, gameConfigData.noviceNode.fingerNode.y = e.fingerPos.y + 15
                    })).repeatForever()), gameConfigData.noviceNode.fishShadow.opacity = 80, gameConfigData.noviceNode.fishShadow.runAction(cc.sequence(cc.moveBy(1, 0, -120), cc.delayTime(1), cc.callFunc(function() {
                        gameConfigData.noviceNode.fishShadow.x = e.fingerPos.x, gameConfigData.noviceNode.fishShadow.y = e.fingerPos.y
                    })).repeatForever())
                })))) : "4" == heroData.noviceGuidance ? (gameSDK.logEvent("noviceGuiden4", 1, {
                    noviceGuiden4: "noviceGuiden4"
                }), gameConfigData.noviceNode.fingerNode.stopAllActions(), gameConfigData.noviceNode.fingerNode.opacity = 0, o(70), gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.callFunc(function() {
                    gameConfigData.noviceNode.fishShadow = new cc.Node, gameConfigData.noviceNode.addChild(gameConfigData.noviceNode.fishShadow, 2), gameConfigData.noviceNode.fishShadow.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + gameConfigData.fishConfig[1002].icon), gameConfigData.noviceNode.fishShadow.opacity = 0, gameConfigData.noviceNode.fishShadow.x = e.fingerPos.x, gameConfigData.noviceNode.fishShadow.y = e.fingerPos.y
                }), cc.delayTime(.1), cc.callFunc(function() {
                    gameConfigData.noviceNode.fingerNode.opacity = 255, gameConfigData.noviceNode.fingerNode.x = e.fingerPos.x + 10, gameConfigData.noviceNode.fingerNode.y = e.fingerPos.y + 15, gameConfigData.noviceNode.fingerNode.runAction(cc.sequence(cc.moveBy(2, 300, 300), cc.delayTime(1), cc.callFunc(function() {
                        gameConfigData.noviceNode.fingerNode.x = e.fingerPos.x + 10, gameConfigData.noviceNode.fingerNode.y = e.fingerPos.y + 15
                    })).repeatForever()), gameConfigData.noviceNode.fishShadow.opacity = 80, gameConfigData.noviceNode.fishShadow.runAction(cc.sequence(cc.moveBy(2, 300, 300), cc.delayTime(1), cc.callFunc(function() {
                        gameConfigData.noviceNode.fishShadow.x = e.fingerPos.x, gameConfigData.noviceNode.fishShadow.y = e.fingerPos.y
                    })).repeatForever())
                })))) : "5" == heroData.noviceGuidance ? (gameSDK.logEvent("noviceGuiden6", 1, {
                    noviceGuiden6: "noviceGuiden5"
                }), s()) : "6" == heroData.noviceGuidance && (gameSDK.logEvent("noviceGuiden7", 1, {
                    noviceGuiden7: "noviceGuiden6"
                }), s())
            }
        }, window.removeNoviceLayerFun = function() {
            null != gameConfigData.noviceNode && (gameConfigData.noviceNode.fingerNode && (gameConfigData.noviceNode.fingerNode.stopAllActions(), gameConfigData.noviceNode.fingerNode.destroy(), gameConfigData.noviceNode.fingerNode = null), gameConfigData.noviceNode.fishShadow && (gameConfigData.noviceNode.fishShadow.stopAllActions(), gameConfigData.noviceNode.fishShadow.destroy(), gameConfigData.noviceNode.fishShadow = null), gameConfigData.noviceNode.destroy(), gameConfigData.noviceNode = null, heroData.saveHeroData()), gameConfigData.isUnderwayNovice = !1
        }, window.checkSendInvite = function(e) {
            return heroData.friendShareList[e] ? (promptBoxFun(1), !1) : (heroData.friendShareList[e] = 1, heroData.saveHeroData(), !0)
        }, window.cloneObjFun = function e(t) {
            if (null === t) return null;
            if ("object" !== (void 0 === t ? "undefined" : n(t))) return t;
            if (t.constructor === Date) return new Date(t);
            if (t.constructor === RegExp) return new RegExp(t);
            var i = new t.constructor;
            for (var a in t)
                if (t.hasOwnProperty(a)) {
                    var o = t[a];
                    i[a] = "object" === (void 0 === o ? "undefined" : n(o)) ? e(o) : o
                } return i
        }, cc._RF.pop()
    }, {
        FaceBookSaveData: "FaceBookSaveData",
        FishNode: "FishNode",
        GamePlayData: "GamePlayData",
        LocalSaveData: "LocalSaveData",
        NumCalculate: "NumCalculate",
        ShopData: "ShopData",
        TileMapLayerData: "TileMapLayerData"
    }],
    HttpControl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d0b2aC/ud5G1Lq/D1/OU0zz", "HttpControl"), cc.Class({
            properties: {
                sendHttpList: null,
                isLuck: null,
                curSendObj: null,
                isInit: null,
                serverKey: null,
                brokenLineFun: null,
                completeHttpFun: null
            },
            initialize: function() {
                1 != this.isInit && (this.serverIP = null, this.isInit = !0, this.sendHttpList = [], this.isLuck = !1, this.curSendObj = !1, this.serverKey = 1e5)
            },
            addHttp: function(e) {
                0 == this.isLuck ? this.sendHttp(e) : this.sendHttpList.push(e)
            },
            popHttpData: function() {
                if (this.sendHttpList.length > 0) {
                    var e = this.sendHttpList.shift();
                    //this.sendHttp(e)
                } else this.isLuck = !1, this.completeHttp()
            },
            cleanHttpData: function() {
                this.isLuck = !1, this.curSendObj = null, this.sendHttpList = []
            },
            sendHttp: function(e) {
                var t = this;
                this.isLuck = !0, this.curSendObj = e, this.curSendObj.sendCount++;
                var i = e.serverIP,
                    n = cc.loader.getXMLHttpRequest();
                n.open("POST", i), n.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), n.jsonStr = e.jsonStr, n.url = i, 0 == cc.sys.isMobile && ccLog("发送协议:url=" + n.url + " data=" + n.jsonStr), n.onreadystatechange = function() {
                    if (4 == n.readyState && n.status >= 200 && n.status <= 207) {
                        0 == cc.sys.isMobile && ccLog("收到协议:url=" + n.url + " data=" + n.responseText);
                        var e = JSON.parse(n.responseText);
                        t.httpCallfun(e)
                    }
                }, this.serverKey++, this.curSendObj.serverKey = this.serverKey, 1 == this.curSendObj.repeatedSend && this.httpDelay(this.serverKey)/*, n.send(n.jsonStr)*/
            
            },
            httpDelay: function(e) {
                if (this.curSendObj.sendCount > 5) this.brokenLine();
                else {
                    var t = e,
                        i = this;
                    setTimeout(function() {
                        null != i.curSendObj && i.curSendObj.serverKey == t && i.sendHttp(i.curSendObj)
                    }, 1e4)
                }
            },
            httpCallfun: function(e) {
                200 == e.code ? (this.curSendObj.httpCallfun(e), this.curSendObj = null, this.popHttpData()) : this.brokenLine()
            },
            brokenLine: function() {
                this.cleanHttpData(), null != this.brokenLineFun && this.brokenLineFun()
            },
            completeHttp: function() {
                null != this.completeHttpFun && (this.completeHttpFun(), this.completeHttpFun = null)
            },
            setCompleteHttp: function(e) {
                0 != this.isLuck ? this.completeHttpFun = e : e()
            }
        }), cc._RF.pop()
    }, {}],
    HttpSendData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "678c0P0mDtOgIVy/Gxa8bVJ", "HttpSendData");
        cc.Class({
            properties: {
                jsonStr: null,
                sendCount: null,
                serverKey: null,
                repeatedSend: null,
                serverIP: null,
                completeFun: null,
                isInit: null
            },
            initialize: function(e) {
                1 != this.isInit && (this.isInit = !0, this.jsonStr = "", this.sendCount = 0, this.serverKey = 0, this.repeatedSend = !0, null != e && null != e.completeFun && (this.completeFun = e.completeFun))
            },
            httpCallfun: function(e) {
                null != this.completeFun && (this.completeFun(e), this.completeFun = null)
            }
        });
        cc._RF.pop()
    }, {}],
    InvitationItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8e267fYtqJKJpGoLAeEpmUA", "InvitationItem");
        var n = e("NumCalculate"),
            a = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                invitationData: null,
                numCalculate: null
            },
            onDestroy: function() {
                this.isInit = null, this.invitationData = null, this.numCalculate = null
            },
            destroyNode: function() {
                this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").off(cc.Node.EventType.TOUCH_END, this.clickShareFun, this), this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").off(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this), this.node.destroy()
            },
            initialize: function(e) {
                1 != this.isInit && (this.invitationData = e, this.numCalculate = new n, this.numCalculate.loadSaveData(gameConfigData.invitationConfig[this.invitationData.rewardIndex].getdiamond), this.initUI(), this.isInit = !0)
            },
            initUI: function() {
                if (this.node.getChildByName("invitationbgimgsp").getChildByName("diamondnumtxt").getComponent("GameArtWord").setString(this.numCalculate.getNumText()), this.node.getChildByName("invitationbgimgsp").getChildByName("achievementtxt").getComponent(cc.Label).string = gameConfigData.invitationConfig[this.invitationData.rewardIndex].txt, this.invitationData.photo) {
                    var e = new a;
                    e.loadImage(this.invitationData.photo, null, 61, 61), this.node.getChildByName("invitationbgimgsp").addChild(e), e.x = this.node.getChildByName("invitationbgimgsp").getChildByName("invitationIconsp").x, e.y = this.node.getChildByName("invitationbgimgsp").getChildByName("invitationIconsp").y, this.node.getChildByName("invitationbgimgsp").getChildByName("invitationIconsp").getChildByName("headPortrait").active = !1
                } else this.node.getChildByName("invitationbgimgsp").getChildByName("invitationIconsp").getChildByName("headPortrait").active = !0;
                (this.node.getChildByName("invitationbgimgsp").getChildByName("yilingquimgsp").active = !1, this.invitationData.noExist && 1 == this.invitationData.noExist) ? (this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").active = !0, this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").active = !1) : "1" == heroData.getFriendsRewardFun(this.invitationData) ? (this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").active = !1, this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").active = !1, this.setHasRewardState()) : (this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").active = !1, this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").active = !0);
                this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").on(cc.Node.EventType.TOUCH_END, this.clickShareFun, this), this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").on(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this)
            },
            clickGetRewardFun: function() {
                this.addDiamondFun(), heroData.reviseFriendsRewardFun(this.invitationData);
                var e = this.setHasRewardState();
                this.getRewardAction(e)
            },
            clickShareFun: function() {
                var e = this;
                gameSDK.logEvent("game_yaoqinghaoyou_share_dianji", 1, {
                    game_yaoqinghaoyou_share_dianji: "game_yaoqinghaoyou_share_dianji"
                }), gameSDK.logEvent("inviteFriend", 1, {
                    inviteFriend: "inviteFriend"
                });
                var t = mainSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("game_yaoqinghaoyou_share_dianji_chenggong", 1, {
                        game_yaoqinghaoyou_share_dianji_chenggong: "game_yaoqinghaoyou_share_dianji_chenggong"
                    }), e.toShareFun()
                }, function() {
                    gameSDK.logEvent("game_yaoqinghaoyou_share_dianji_shibai", 1, {
                        game_yaoqinghaoyou_share_dianji_shibai: "game_yaoqinghaoyou_share_dianji_shibai"
                    })
                }, t)
            },
            toShareFun: function() {
                cc.log("懒鬼,去分享啦")
            },
            setHasRewardState: function() {
                this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").off(cc.Node.EventType.TOUCH_END, this.clickShareFun, this), this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").off(cc.Node.EventType.TOUCH_END, this.clickGetRewardFun, this);
                var e = this.node.getChildByName("invitationbgimgsp").getChildByName("yilingquimgsp");
                return e.active = !0, this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg10btn").active = !1, this.node.getChildByName("invitationbgimgsp").getChildByName("btnimg11btn").active = !1, e
            },
            getRewardAction: function(e) {
                e.scaleX = 3, e.scaleY = 3, e.opacity = 150, e.runAction(cc.sequence(cc.spawn(cc.scaleTo(.13, 1, 1), cc.fadeIn(.13)), cc.callFunc(function() {
                    mainSceneContol.gamePlayLayerComponent.addRewardParticle(2)
                })))
            },
            addDiamondFun: function() {
                heroData.gamePlayData.addDiamond(this.numCalculate)
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    InvitationLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2c185d40FFAmJZB1wpCKq/4", "InvitationLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                moveLayer: null,
                lastMoveLayerY: null,
                isAction: null,
                userData: null,
                isPlayUser: null,
                userList: null,
                bannerInterval: null,
                isFriendsList: null,
                updateTimes: null
            },
            onDestroy: function() {
                this.isInit = null, this.moveLayer = null, this.lastMoveLayerY = null, this.isAction = null, this.userData = null, this.isPlayUser = null, this.userList = null, this.bannerInterval = null, this.isFriendsList = null, this.updateTimes = null
            },
            destroyNode: function() {
                for (var e = this.moveLayer.children, t = 0; t < e.length; t++) e[t].getComponent("InvitationItem").destroyNode();
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").off(cc.Node.EventType.TOUCH_END, this.clickSharebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    var e = this.node.getChildByName("invitationscv").getComponent(cc.ScrollView);
                    this.moveLayer = e.content, this.isAction = !1, this.bannerInterval = 110, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").on(cc.Node.EventType.TOUCH_END, this.clickSharebtnFun, this), this.userData = {}, this.userData = new Object, this.moveLayer.height = this.bannerInterval * gameConfigData.maxInvitationNum, this.updateTimes = 0, this.isFriendsList = 1
                }
            },
            initData: function() {
                this.isPlayUser = [], this.userList = [];
                var e = 0;
                for (var t in this.userData)
                    if (this.userData[t].photo && this.isPlayUser.push(this.userData[t].photo), (e += 1) >= gameConfigData.maxInvitationNum) break;
                for (var i = 0; i < gameConfigData.maxInvitationNum; i++) {
                    var n = new Object;
                    this.userList[i] = n, this.userList[i].ID = (i + 1).toString(), i < this.isPlayUser.length ? (n.photo = this.isPlayUser[i], n.noExist = 0) : n.noExist = 1, this.userList[i].isAdd = !1, this.userList[i].rewardIndex = i
                }
                for (var a = [], o = [], s = [], l = [], r = 0; r < this.userList.length; r++) {
                    "1" == this.checkIsReceiveFun(this.userList[r]) ? a.push(this.userList[r]) : 0 == this.userList[r].noExist ? o.push(this.userList[r]) : s.push(this.userList[r])
                }
                l = (l = o.concat(a)).concat(s), this.userList = l
            },
            checkIsReceiveFun: function(e) {
                return heroData.getFriendsRewardFun(e)
            },
            update: function() {
                var e = this;
                if (1 == this.isFriendsList && (this.updateTimes += 1, this.updateTimes >= 10 && (this.updateTimes = 0, gameSDK.getfriendsList(function(t) {
                        e.isFriendsList = 0, gameSDK.sdkPlayInfo.friendsList ? e.userData = gameSDK.sdkPlayInfo.friendsList : e.userData = {}, e.initData(), e.isInit = !0
                    }))), 1 == this.isInit && null != this.moveLayer && this.userList.length > 0 && this.moveLayer.y != this.lastMoveLayerY) {
                    this.lastMoveLayerY = this.moveLayer.y;
                    for (var t = 0; t < this.userList.length; t++) {
                        var i = -this.bannerInterval / 2 - this.bannerInterval * t,
                            n = this.userList[t],
                            a = i + this.moveLayer.y;
                        if (a <= 370 && a >= -370) {
                            if (0 == n.isAdd) {
                                n.isAdd = !0;
                                var o = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.invitation_item_prefab);
                                o.addComponent("InvitationItem").initialize(this.userList[t]), this.moveLayer.addChild(o), o.y = i, n.userItem = o
                            }
                            n.userItem && (n.userItem.active = !0)
                        } else n.userItem && (n.userItem.active = !1)
                    }
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            },
            toShareFun: function() {},
            clickSharebtnFun: function() {
                var e = this;
                gameSDK.logEvent("game_yaoqinghaoyou_share_dianji", 1, {
                    game_yaoqinghaoyou_share_dianji: "game_yaoqinghaoyou_share_dianji"
                }), gameSDK.logEvent("inviteFriend", 1, {
                    inviteFriend: "inviteFriend"
                });
                var t = mainSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("game_yaoqinghaoyou_share_dianji_chenggong", 1, {
                        game_yaoqinghaoyou_share_dianji_chenggong: "game_yaoqinghaoyou_share_dianji_chenggong"
                    }), e.toShareFun()
                }, function() {
                    gameSDK.logEvent("game_yaoqinghaoyou_share_dianji_shibai", 1, {
                        game_yaoqinghaoyou_share_dianji_shibai: "game_yaoqinghaoyou_share_dianji_shibai"
                    })
                }, t)
            }
        }), cc._RF.pop()
    }, {}],
    LevelUpItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7d618PY98ZEfoTeselMcxgt", "LevelUpItem");
        var n = e("LoadControl");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                nodeIndex: null,
                isLoadComplete: null,
                fishTankData: null
            },
            onDestroy: function() {
                this.isInit = null, this.nodeIndex = null, this.curfishTankInfo = null, this.isLoadComplete = null, this.fishTankData = null
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    var t = this;
                    this.isInit = !0, this.isLoadComplete = !1, this.nodeIndex = e.nodeIndex, this.fishTankType = e.fishTankType, this.curfishTankInfo = heroData.fishTankDataList[this.fishTankType], this.fishTankData = gameConfigData.fishtankConfig[this.fishTankType];
                    var i = new n,
                        a = new Object;
                    a.resources = [{
                        url: "img/loadimg/loadimg1p",
                        restype: LoadStyleType.spriteAtlas
                    }], a.completeCallback = function() {
                        t.isLoadComplete = !0, t.refreshView()
                    }, i.initialize(a), i.load()
                }
            },
            refreshView: function() {
                this.curfishTankInfo = heroData.fishTankDataList[this.fishTankType];
                var e = "img/mastloadimg/mastloadimg2p";
                "2" == gameConfigData.configureTable.config && (e = "img/mastloadimg/mastloadimg3p"), 0 == this.curfishTankInfo ? (this.node.getChildByName("locksp").active = !0, 1 == this.isLoadComplete && (-1 != this.fishTankData.unlockbgUrl.indexOf("img1") ? this.node.getChildByName("levelupbg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(e, this.fishTankData.unlockbgUrl) : this.node.getChildByName("levelupbg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame("img/loadimg/loadimg1p", this.fishTankData.unlockbgUrl))) : (this.node.getChildByName("locksp").active = !1, 1 == this.isLoadComplete && (-1 != this.fishTankData.bgUrl.indexOf("img1") ? this.node.getChildByName("levelupbg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(e, this.fishTankData.bgUrl) : this.node.getChildByName("levelupbg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame("img/loadimg/loadimg1p", this.fishTankData.bgUrl)))
            }
        }), cc._RF.pop()
    }, {
        LoadControl: "LoadControl"
    }],
    LevelUpLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e94083kd69FyIwRnbwbObh6", "LevelUpLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                curPage: null,
                fishTankObj: null
            },
            onDestroy: function() {
                this.isInit = null, this.curPage = null, this.fishTankObj = null
            },
            destroyNode: function() {
                this.node.getChildByName("leveluppv").getComponent(cc.PageView).node.off("page-turning", this.turnPageUpdate, this), this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("leftbtn").off(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("rightbtn").off(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("unlockbtn").off(cc.Node.EventType.TOUCH_END, this.clickUnlockbtnFun, this), this.node.getChildByName("switchbtn").off(cc.Node.EventType.TOUCH_END, this.clickSwitchbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.fishTankObj = new Object, this.curPage = 0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("leftbtn").on(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("rightbtn").on(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("unlockbtn").on(cc.Node.EventType.TOUCH_END, this.clickUnlockbtnFun, this), this.node.getChildByName("switchbtn").on(cc.Node.EventType.TOUCH_END, this.clickSwitchbtnFun, this), this.initItem(), this.turnPageUpdate(), this.node.getChildByName("leveluppv").getComponent(cc.PageView).node.on("page-turning", this.turnPageUpdate, this))
            },
            initItem: function() {
                var e = this.node.getChildByName("leveluppv").getComponent(cc.PageView),
                    t = 0;
                for (var i in heroData.fishTankDataList) {
                    var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.unlock_levelup_item_prefab),
                        a = n.addComponent("LevelUpItem"),
                        o = new Object;
                    o.nodeIndex = t, o.fishTankType = i, a.initialize(o), e.addPage(n), this.fishTankObj[t] = n, t++
                }
            },
            turnPageUpdate: function() {
                var e = this.node.getChildByName("leveluppv").getComponent(cc.PageView);
                this.curPage = e.getCurrentPageIndex(), this.refreshUI(), this.showLeftRightBtn()
            },
            refreshUI: function() {
                var e = this.fishTankObj[this.curPage].getComponent("LevelUpItem").fishTankType,
                    t = heroData.fishTankDataList[e],
                    i = gameConfigData.fishtankConfig[e],
                    a = i.reward[t + 1];
                null == a && (a = i.reward[t]);
                var o = i.des.replace(/--/g, parseInt(100 * a));
                this.node.getChildByName("levelupdestxt").getComponent(cc.Label).string = o;
                e = this.fishTankObj[this.curPage].getComponent("LevelUpItem").fishTankType;
                var s = heroData.fishTankDataList[e];
                if (this.node.getChildByName("leveluptxt").getComponent(cc.Label).string = s < 15 ? "lv" + s + "---lv" + (s + 1) : "lv15", 0 == t) this.node.getChildByName("unlockbtn").active = !0, this.node.getChildByName("fullbtn").active = !1, this.node.getChildByName("levelupdestxt").y = -114, this.node.getChildByName("leveluptxt").active = !1, this.node.getChildByName("switchbtn").active = !1, this.node.getChildByName("unlockbtn").x = 0, this.node.getChildByName("unlockbtn").getChildByName("unlockdessp").active = !0, this.node.getChildByName("unlockbtn").getChildByName("goldnumart").active = !1, this.node.getChildByName("unlockbtn").getChildByName("goldiconsp").active = !1, this.node.getChildByName("unlockbtn").getChildByName("haslockdessp").active = !1;
                else if (t > 0 && t < 15) {
                    this.node.getChildByName("unlockbtn").active = !0, this.node.getChildByName("fullbtn").active = !1, this.node.getChildByName("levelupdestxt").y = -129, this.node.getChildByName("leveluptxt").active = !0, this.node.getChildByName("switchbtn").active = !0, this.node.getChildByName("unlockbtn").x = 107, this.node.getChildByName("unlockbtn").getChildByName("unlockdessp").active = !1, this.node.getChildByName("unlockbtn").getChildByName("goldnumart").active = !0, this.node.getChildByName("unlockbtn").getChildByName("goldiconsp").active = !0, this.node.getChildByName("unlockbtn").getChildByName("haslockdessp").active = !0;
                    var l = new n,
                        r = i.lv[t];
                    l.loadSaveData(r);
                    var c = l.getNumText();
                    this.node.getChildByName("unlockbtn").getChildByName("goldnumart").getComponent("GameArtWord").setString(c)
                } else this.node.getChildByName("unlockbtn").active = !1, this.node.getChildByName("fullbtn").active = !0, this.node.getChildByName("levelupdestxt").y = -129, this.node.getChildByName("leveluptxt").active = !0, this.node.getChildByName("switchbtn").active = !0
            },
            clickSwitchbtnFun: function() {
                var e = this.fishTankObj[this.curPage].getComponent("LevelUpItem").fishTankType,
                    t = heroData.fishTankDataList[e],
                    i = gameConfigData.fishtankConfig[e];
                mainSceneContol.loadABackground(i.bgIndex, function() {});
                var n = new Object;
                n.curFishTankType = e, n.curFishTankLv = t, heroData.setFishTank(n)
            },
            clickUnlockbtnFun: function() {
                var e = this.fishTankObj[this.curPage].getComponent("LevelUpItem").fishTankType;
                if (0 == heroData.fishTankDataList[e]) heroData.fishTankDataList[e] = 1, null != this.fishTankObj[this.curPage] && this.fishTankObj[this.curPage].getComponent("LevelUpItem").refreshView(), heroData.saveHeroData(), this.refreshUI();
                else {
                    this.node.getChildByName("unlockbtn").getChildByName("unlockdessp").active = !1, this.node.getChildByName("unlockbtn").getChildByName("goldnumart").active = !0;
                    var t = heroData.fishTankDataList[e],
                        i = gameConfigData.fishtankConfig[e],
                        a = new n,
                        o = i.lv[t];
                    if (a.loadSaveData(o), 0 == heroData.gamePlayData.subGold(a)) {
                        var s = engine.gameData.dataDic.language;
                        mainSceneContol.gamePlayLayerComponent.popNotice(s[1004].content)
                    } else mainSceneContol.helpGoldLayerComponent.refreshGold(), heroData.fishTankDataList[e] += 1, heroData.saveHeroData(), null != this.fishTankObj[this.curPage] && this.fishTankObj[this.curPage].getComponent("LevelUpItem").refreshView(), this.refreshUI();
                    heroData.fishTankDataList[e] >= gameConfigData.fishtankConfig[e].maxLv && (ccLog("超过最大等级"), this.node.getChildByName("unlockbtn").active = !1, this.node.getChildByName("fullbtn").active = !0, this.node.getChildByName("unlockbtn").getChildByName("unlockdessp").active = !1, this.node.getChildByName("unlockbtn").getChildByName("goldnumart").active = !0)
                }
            },
            clickLeftbtnFun: function() {
                var e = this.curPage - 1;
                this.node.getChildByName("leveluppv").getComponent(cc.PageView).scrollToPage(e)
            },
            clickRightbtnFun: function() {
                var e = this.curPage + 1;
                this.node.getChildByName("leveluppv").getComponent(cc.PageView).scrollToPage(e)
            },
            showLeftRightBtn: function() {
                var e = this.node.getChildByName("leveluppv").getComponent(cc.PageView);
                0 === this.curPage ? (this.node.getChildByName("rightbtn").active = !0, this.node.getChildByName("leftbtn").active = !1) : this.curPage === e.getPages().length - 1 ? (this.node.getChildByName("rightbtn").active = !1, this.node.getChildByName("leftbtn").active = !0) : (this.node.getChildByName("rightbtn").active = !0, this.node.getChildByName("leftbtn").active = !0)
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    LoadControl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "64688BDEPdI7byM5nOOIkng", "LoadControl"), window.LoadStyleType = cc.Enum({
            json: 0,
            prefab: 1,
            spriteAtlas: 2,
            spine: 3,
            particleAsset: 4
        }), window.UILoad = function(e, t, i) {
            var a = new n,
                o = new Object;
            o.resources = e, o.analysisFun = i, o.completeCallback = t, a.initialize(o), a.load()
        }, window.loadExternalImage = function(e, t) {
            cc.loader.load(e, function(i, n) {
                null != n && n instanceof cc.Texture2D && (engine.gameMemoryManagement.addExternalImage(e, new cc.SpriteFrame(n)), null != t && t())
            })
        };
        var n = cc.Class({
            properties: {
                isInit: null,
                completeCallback: null,
                analysisFun: null,
                loadBeforeValue: null,
                setLoadPercent: null,
                nameUrlKeyDic: null,
                resources: null,
                mustResources: null,
                resJson: null,
                loadCount: null,
                nowLoadTypeIndex: null,
                loadConnectCount: null
            },
            destroy: function() {
                this.isInit = null, this.completeCallback = null, this.analysisFun = null, this.loadBeforeValue = null, this.setLoadPercent = null, this.nameUrlKeyDic = null, this.resources = null, this.mustResources = null, this.resJson = null, this.loadCount = null, this.mustResources = null, this.nowLoadTypeIndex = null, this.loadConnectCount = null
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.isInit = !0, null == e.loadBeforeValue && (this.loadBeforeValue = 0), null == e.mustResources && (e.mustResources = []), this.loadCount = 0, this.nameUrlKeyDic = new Object;
                    var t = [
                        [],
                        [],
                        [],
                        [],
                        []
                    ];
                    this.resJson = [], this.nowLoadTypeIndex = -1, this.loadConnectCount = 0;
                    for (var i = 0; i < e.resources.length; i++) {
                        var n = e.resources[i].url,
                            a = e.resources[i].restype,
                            o = n.split("/"),
                            s = o[o.length - 1];
                        this.nameUrlKeyDic[s] = n, 0 == engine.gameMemoryManagement.isExistRes(n) && (this.loadCount++, t[a].push(n), a == LoadStyleType.json && this.resJson.push(n))
                    }
                    this.resources = t, this.mustResources = e.mustResources, this.completeCallback = e.completeCallback, this.analysisFun = e.analysisFun, this.setLoadPercent = e.setLoadPercent
                }
            },
            load: function() {
                if (this.loadConnectCount = this.loadConnectCount + 1, !(this.loadConnectCount > 5))
                    if (this.loadCount <= 0) {
                        for (var e = 0; e < this.resJson.length; e++) engine.gameMemoryManagement.addJsonDic(this.resJson[e]);
                        this.completeLoad()
                    } else this.loadResByType()
            },
            checkCompleteLoad: function() {
                ccLog("检查加载");
                var e = [
                    [],
                    [],
                    [],
                    [],
                    []
                ];
                this.nowLoadTypeIndex = -1, this.loadCount = 0;
                for (var t = 0; t < this.mustResources.length; t++) {
                    var i = this.mustResources[t].url,
                        n = this.mustResources[t].restype,
                        a = i.split("/"),
                        o = a[a.length - 1];
                    this.nameUrlKeyDic[o] = i, 0 == engine.gameMemoryManagement.isExistRes(i) && (this.loadCount++, e[n].push(i))
                }
                this.load()
            },
            getLoadCompleteCount: function() {
                for (var e = 0, t = 0; t <= this.nowLoadTypeIndex - 1; t++) null != this.resources[t] && (e += this.resources[t].length);
                return e
            },
            setLoadPercentFun: function(e, t) {
                if (1 == this.loadConnectCount) {
                    var i = this.getLoadCompleteCount() / this.loadCount + e / (this.loadCount * t / this.resources[this.nowLoadTypeIndex].length);
                    if (e > 0 && this.loadCount * t / this.resources[this.nowLoadTypeIndex].length > 0 && e < this.loadCount * t / this.resources[this.nowLoadTypeIndex].length) {
                        i = this.getLoadCompleteCount() / this.loadCount + e / (this.loadCount * t / this.resources[this.nowLoadTypeIndex].length);
                        var n = 0 | Math.floor(100 * i);
                        i = Math.min(n, 99), null != this.setLoadPercent && this.setLoadPercent(i)
                    }
                }
            },
            loadResByType: function() {
                this.nowLoadTypeIndex++;
                var e = this;
                if (this.nowLoadTypeIndex < this.resources.length)
                    if (this.resources[this.nowLoadTypeIndex].length > 0) switch (this.nowLoadTypeIndex) {
                        case LoadStyleType.json:
                            cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], function(t, i, n) {
                                e.setLoadPercentFun(t, i)
                            }, function(t, i) {
                                e.loadResByType()
                            });
                            break;
                        case LoadStyleType.spriteAtlas:
                            cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.SpriteAtlas, function(t, i, n) {
                                e.setLoadPercentFun(t, i)
                            }, function(t, i) {
                                for (var n = 0; n < i.length; n++) {
                                    var a = i[n];
                                    if (a instanceof cc.SpriteAtlas) {
                                        var o = a.name.split(".");
                                        engine.gameMemoryManagement.addSpriteAtlasDic(e.nameUrlKeyDic[o[0]], a)
                                    }
                                }
                                e.loadResByType()
                            });
                            break;
                        case LoadStyleType.prefab:
                            cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.Prefab, function(t, i, n) {
                                e.setLoadPercentFun(t, i)
                            }, function(t, i) {
                                for (var n = 0; n < i.length; n++) {
                                    var a = i[n];
                                    a instanceof cc.Prefab && engine.gameMemoryManagement.addPrefabDic(e.nameUrlKeyDic[a.name], a)
                                }
                                e.loadResByType()
                            });
                            break;
                        case LoadStyleType.spine:
                            cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], sp.SkeletonData, function(t, i, n) {
                                e.setLoadPercentFun(t, i)
                            }, function(t, i) {
                                for (var n = 0; n < i.length; n++) {
                                    var a = i[n];
                                    a instanceof sp.SkeletonData && engine.gameMemoryManagement.addSpine(e.nameUrlKeyDic[a.name], a)
                                }
                                e.loadResByType()
                            });
                            break;
                        case LoadStyleType.particleAsset:
                            cc.loader.loadResArray(this.resources[this.nowLoadTypeIndex], cc.ParticleAsset, function(t, i, n) {
                                e.setLoadPercentFun(t, i)
                            }, function(t, i) {
                                for (var n = 0; n < i.length; n++) {
                                    var a = i[n];
                                    a instanceof cc.ParticleAsset && engine.gameMemoryManagement.addparticleDic(e.nameUrlKeyDic[a.name], a)
                                }
                                e.loadResByType()
                            })
                    } else this.loadResByType();
                    else this.checkCompleteLoad()
            },
            completeLoad: function() {
                null != this.analysisFun && this.analysisFun(), null != this.completeCallback && this.completeCallback(), this.destroy()
            }
        });
        cc._RF.pop()
    }, {}],
    LocalSaveData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2e556BG7yRBHqE0sJdi3KwO", "LocalSaveData");
        cc.Class({
            properties: {},
            initialize: function() {
                1 != this.isInit && (this.isInit = !0)
            },
            save: function(e) {
                try {
                    cc.sys.localStorage.setItem(engineGlobal.gameSaveDataKey, JSON.stringify(e))
                } catch (e) {}
            }
        });
        cc._RF.pop()
    }, {}],
    LoginFaceBookSDK: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a4a2bysHJlO1YLiqqclpWSG", "LoginFaceBookSDK");
        var n = e("LoadControl"),
            a = e("HeroData");
        cc.Class({
            properties: {},
            initialize: function() {
                this.isInit
            },
            login: function() {
                var e = this;
                gameSDK.getPlayInfo(function(t) {
                    heroData = new a, heroData.initialize(t), e.loadRes()
                })
            },
            loadRes: function() {
                var e = new n,
                    t = new Object;
                t.resources = mainBgRes(), t.mustResources = mustGameRes(), t.setLoadPercent = this.setLoadPercent, t.analysisFun = function() {}, t.completeCallback = function() {
                    cc.director.loadScene("MainBgScene", function() {})
                }, e.initialize(t), e.load()
            },
            setLoadPercent: function(e) {
                gameSDK.setLoadingProgress(e)
            }
        }), cc._RF.pop()
    }, {
        HeroData: "HeroData",
        LoadControl: "LoadControl"
    }],
    LoginSceneControl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7a64fQSXqlLbbN+2UXuZeFM", "LoginSceneControl"), cc.Class({
            extends: cc.Component,
            properties: {},
            initialize: function() {
                if (cc.view.setDesignResolutionSize(engineGlobal.viewGameWidth, engineGlobal.viewGameHeigh, cc.ResolutionPolicy.SHOW_ALL), gameInit(), 1 != isLogin) {
                    var e = new scriptGlobal.LoginJS;
                    e.initialize(), e.login(), isLogin = !0
                }
            },
            onLoad: function() {
                this.initialize()
            }
        }), cc._RF.pop()
    }, {}],
    MainBackLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1c166KpRFlOULCkPNlwbTZI", "MainBackLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                clickBack: null
            },
            onDestroy: function() {
                this.isInit = null, this.clickBack = null
            },
            destroyNode: function() {
                this.node.getChildByName("mst3backsp").off(cc.Node.EventType.TOUCH_END, this.backCoverFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.clickBack = !1, this.node.getChildByName("mst3backsp").on(cc.Node.EventType.TOUCH_END, this.backCoverFun, this), this.isInit = !0)
            },
            backCoverFun: function() {
                heroData.isGetOutLine = !1, 0 == this.clickBack && (this.clickBack = !0, cc.director.loadScene("MainBgScene", function() {}))
            }
        }), cc._RF.pop()
    }, {}],
    MainBgLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ab8321NDvVEsJy22suK0d9Y", "MainBgLayer");
        var n = e("LoadControl"),
            a = e("GameRankData");
        window.rankGameRankData = null, cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                openRank: null,
                isRank: null
            },
            onDestroy: function() {
                this.isInit = null, this.openRank = null, this.isRank = null
            },
            destroyNode: function() {
                this.node.getChildByName("mainbtnimgbtn").off(cc.Node.EventType.TOUCH_BEGIN, this.startGameFun.bind(this), this), this.node.getChildByName("mainbtnrankbtn").off(cc.Node.EventType.TOUCH_END, this.openRankFun.bind(this), this), this.node.getChildByName("mainbtnbgcollectbtn").off(cc.Node.EventType.TOUCH_END, this.openCollectFun.bind(this), this), this.node.getChildByName("mainbtnbgsharebtn").off(cc.Node.EventType.TOUCH_END, this.openShareFun.bind(this), this), this.node.getChildByName("jctg_iconbtn").off(cc.Node.EventType.TOUCH_END, this.clickMoreGame, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.node.getChildByName("mainbtnimgbtn").runAction(cc.sequence(cc.scaleTo(.12, 1.05), cc.scaleTo(.12, 1), cc.scaleTo(.12, 1.05), cc.scaleTo(.12, 1), cc.delayTime(.5)).repeatForever());
                    this.node.getChildByName("mainbtnimgbtn").on(cc.Node.EventType.TOUCH_END, this.startGameFun, this);
                    this.node.getChildByName("mainbtnrankbtn").on(cc.Node.EventType.TOUCH_END, this.openRankFun, this);
                    this.node.getChildByName("mainbtnbgcollectbtn").on(cc.Node.EventType.TOUCH_END, this.openCollectFun, this);
                    this.node.getChildByName("mainbtnbgsharebtn").on(cc.Node.EventType.TOUCH_END, this.openShareFun, this);                   
                    this.node.getChildByName("jctg_iconbtn").on(cc.Node.EventType.TOUCH_END, this.clickMoreGame, this);
                    this.openRank = !1;
                    rankGameRankData = new a;
                    rankGameRankData.initialize();
                    rankGameRankData.loadGlobalRankDataBySDK();
                    this.isRank = !1;
                    //this.node.getChildByName("jctg_iconbtn").runAction(cc.sequence(cc.rotateTo(.08, -10), cc.rotateTo(.16, 20), cc.rotateTo(.16, -20), cc.rotateTo(.16, 20), cc.rotateTo(.08, 0), cc.delayTime(.7)).repeatForever());
                    if ( gameSDK.isCanPay()) 
                        this.node.getChildByName("jctg_iconbtn").active = !1;
                    else {
                        this.node.getChildByName("mainbtnrankbtn").x += 77;
                        this.node.getChildByName("mainbtnbgcollectbtn").x += 77;
                        this.node.getChildByName("mainbtnbgsharebtn").x += 77;
                        //this.node.getChildByName("jctg_iconbtn").active = !1
                    }
                    this.isInit = !0;

                    if(window.gameSDKName == faceBookSDKTest) {
                        this.node.getChildByName("jctg_iconbtn").active = false;
                        this.node.getChildByName("mainbtnbgsharebtn").active = false;
                        this.node.getChildByName("mainbtnrankbtn").active = false;
                        this.node.getChildByName("mainbtnbgcollectbtn").active = false;
                    }
                        
                }
            },
            startGameFun: function() {
                if ("undefined" != typeof mainSceneHasLoad && 1 == mainSceneHasLoad) cc.director.loadScene("MainScene", function() {});
                else {
                    var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.networking_load_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.getChildByName("circlesp").runAction(cc.rotateBy(1, 360).repeatForever());
                    var t = new n,
                        i = new Object;
                    i.resources = gameRes(), i.setLoadPercent = function(t) {
                        t > e.getChildByName("progeslabeltxt").getComponent(cc.Label).string.replace("%", "") && (e.getChildByName("progeslabeltxt").getComponent(cc.Label).string = t + "%")
                    }, i.analysisFun = function() {
                        engine.gameData.analysisJsonData("language", dataJson.language_json)
                    }, i.completeCallback = function() {
                        cc.director.loadScene("MainScene", function() {})
                    }, t.initialize(i), t.load()
                }

                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
            },
            openShareFun: function() {
                gameSDK.logEvent("home_yaoqinghaoyou_dianji", 1, {
                    home_yaoqinghaoyou_dianji: "home_yaoqinghaoyou_dianji"
                });
                var e = mainBgSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("home_yaoqinghaoyou_dianji_chenggong", 1, {
                        home_yaoqinghaoyou_dianji_chenggong: "home_yaoqinghaoyou_dianji_chenggong"
                    })
                }, function() {
                    gameSDK.logEvent("home_yaoqinghaoyou_dianji_shibai", 1, {
                        home_yaoqinghaoyou_dianji_shibai: "home_yaoqinghaoyou_dianji_shibai"
                    })
                }, e)
            },
            openCollectFun: function() {
                gameSDK.logEvent("tujian_dianji", 1, {
                    tujian_dianji: "tujian_dianji"
                });
                var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.collect_layer_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                e.addComponent("CollectLayer")
            },
            openRankFun: function() {
                var e = this;
                0 == this.isRank && (this.isRank = !0, e.openRank = !0, rankGameRankData.loadFriendRankDataBySDK(), e.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                    e.isRank = !1
                }), cc.delayTime(1), cc.callFunc(function() {
                    e.openRank = !1
                }))))
            },
            clickMoreGame: function() {
                var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.moregame_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.addComponent("TurnOtherGameLayer")
            },
            update: function() {
                if (1 == this.openRank && rankGameRankData.getRankData(2).length > 0) {
                    this.openRank = !1, gameSDK.logEvent("rank_dianji", 1, {
                        rank_dianji: "rank_dianji"
                    });
                    var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.rank_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                    var t, i = e.addComponent("RankLayer");
                    if ("undefined" != typeof FBInstant)
                        for (var n = 0; n < rankGameRankData.getRankData(2).length; n++)
                            if (rankGameRankData.getRankData(2)[n].playerID == FBInstant.player.getID()) {
                                t = rankGameRankData.getRankData(2)[n];
                                break
                            } i.initData(rankGameRankData.getRankData(2), t)
                }
            }
        }), cc._RF.pop()
    }, {
        GameRankData: "GameRankData",
        LoadControl: "LoadControl"
    }],
    MainBgSceneControl: [function(e, t, i) {    //63913c2a-e5ee-48ae-81dc-13ed2a263ebd
        "use strict";
        cc._RF.push(t, "3d526dAgM9Adbt89iUjMyXO", "MainBgSceneControl"), window.mainBgSceneContol = null, window.isGetChooseMessage = !0, window.canSubscribe = !1, window.isCreateShortcut = !1, window.networkingMaskFun = function(e) {
            if (e && 2 == e) cc.director.getScene().getChildByName("networkingMaskLayer") && cc.director.getScene().getChildByName("networkingMaskLayer").getComponent("NetworkingMaskLayer").closeMaskFun();
            else {
                if (!cc.director.getScene().getChildByName("networkingMaskLayer")) {
                    var t = new cc.Node;
                    t.addComponent("NetworkingMaskLayer"), t.name = "networkingMaskLayer", cc.director.getScene().addChild(t)
                }
                e && 1 == e && cc.director.getScene().getChildByName("networkingMaskLayer").getComponent("NetworkingMaskLayer").circleFun()
            }
        }, window.advPoolFun = function(e, t) {
            gameSDK.fbIAD.showAd(function() {
                e()
            }, function() {
                if (t) t();
                else {
                    var e = engine.gameData.dataDic.language;
                    tooltipFun(e[1011])
                }
            }, function() {
                if (t) t();
                else {
                    var e = engine.gameData.dataDic.language;
                    tooltipFun(e[1011])
                }
            })
        }, window.tooltipLayer = null, window.tooltipFun = function(e) {
            var t;
            null != tooltipLayer && ((t = tooltipLayer.getComponent("TooltipLayer")) && t.destroyNode(), tooltipLayer = null);
            null == tooltipLayer && (tooltipLayer = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tooltip_layer_prefab), engine.gameAdapterInfo.addSceneNode(tooltipLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIEffectIndex), (t = tooltipLayer.addComponent("TooltipLayer")).initialize(e))
        }, window.promptBoxFun = function(e) {
            if (!cc.director.getScene().getChildByName("promptBoxLayer")) {
                var t = new cc.Node;
                t.name = "promptBoxLayer", cc.director.getScene().addChild(t), t.addComponent("PromptBoxLayer").initialize(e)
            }
        }, cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null, mainBgSceneContol = null
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0, gameSDK.createShortcut(), cc.view.setDesignResolutionSize(engineGlobal.viewGameWidth, engineGlobal.viewGameHeigh, cc.ResolutionPolicy.SHOW_ALL), mainBgSceneContol = this, 0 == gameConfigData.firstLoadingPage && (gameConfigData.firstLoadingPage = !0, gameSDK.logEvent("getInto_loadingPage", 1, {
                        getInto_loadingPage: "getInto_loadingPage"
                    })), engine.gameSound.playMusic(soundurl.backGroundSound, !0);
                    var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.mainbg_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5)), e.addComponent("MainBgLayer");
                    var t = engine.gameMemoryManagement.getPrefab(mainBgPrefab.setup2_prefab);
                    engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.08), engine.gameAdapterInfo.getPercentageY(.88)), t.addComponent("MainSetUpLayer2"), 0 == isCreateShortcut && (isCreateShortcut = !0, gameSDK.createShortcut(function() {
                        1 == isGetChooseMessage && (isGetChooseMessage = !1, gameSDK.canSubscribeBotAsync(function() {
                            gameSDK.logEvent("new2_canSubscribe", 1, {
                                new2_canSubscribe: "new2_canSubscribe"
                            }), canSubscribe = !0
                        }))
                    }))
                }
            },
            getShareData: function() {
                var e = new Object;
                return e.pngData = [{
                    url: gameSDK.sdkPlayInfo.photo,
                    posX: 79,
                    posY: 90,
                    imgWidth: 163,
                    imgHeight: 163
                }, {
                    url: cc.url.raw("resources/invbg.png"),
                    posX: 0,
                    posY: 0,
                    imgWidth: 750,
                    imgHeight: 380
                }], e.width = 750, e.height = 380, e
            },
            onLoad: function() {
                var e = this;
                gameSDK.startGame(function() {
                    e.initialize()
                })
            }
        }), cc._RF.pop()
    }, {}],
    MainCollectLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "657c6fYwPxAta65vFkU80JL", "MainCollectLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("ICON_kuozhan2sp").getChildByName("illustrationsbtn").off(cc.Node.EventType.TOUCH_END, this.showIllustrations, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.getChildByName("ICON_kuozhan2sp").getChildByName("illustrationsbtn").on(cc.Node.EventType.TOUCH_END, this.showIllustrations, this), this.isInit = !0)
            },
            showIllustrations: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.collect_layer_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), 100);
                e.addComponent("CollectLayer")
            }
        }), cc._RF.pop()
    }, {}],
    MainDownLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0808esSRYlJILq1Fldrilcx", "MainDownLayer");
        e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                shopLayer: null,
                shopLayerComponent: null,
                fishID: null
            },
            onDestroy: function() {
                this.isInit = null, this.shopLayer = null, this.shopLayerComponent = null, this.fishID = null
            },
            destroyNode: function() {
                this.node.getChildByName("shopiconimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenShopFun, this), this.node.getChildByName("buybtn").off(cc.Node.EventType.TOUCH_END, this.clickBuyBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.node.getChildByName("shopiconimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenShopFun, this), this.node.getChildByName("buybtn").on(cc.Node.EventType.TOUCH_END, this.clickBuyBtnFun, this), heroData.shopData.refreshLastFishFun(), this.refreshGold())
            },
            clickOpenShopFun: function() {
                this.shopLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.shop_prefab), engine.gameAdapterInfo.addSceneNode(this.shopLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), 100), this.shopLayerComponent = this.shopLayer.addComponent("ShopLayer")
            },
            refreshGold: function() {
                var e = heroData.shopData.lastFishID()[0];
                this.fishID = e, heroData.shopData.fishPriceObj[e] || heroData.shopData.addFishPriceFun(heroData.shopFishPriceList[e]);
                var t = heroData.shopData.fishPriceObj[e].getNumText();
                this.node.getChildByName("buybtn").getChildByName("mainbtnart").getComponent("GameArtWord").setString(t), this.node.getChildByName("buydarkbtn").getChildByName("mainbtnart").getComponent("GameArtWord").setString(t), heroData.gold.comparisonSize(heroData.shopData.fishPriceObj[e]) ? this.updateBuyBtnColor(!0) : gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level < gameConfigData.openFreeLevel ? this.updateBuyBtnColor(!1) : this.updateBuyBtnColor(!0)
            },
            updateBuyBtnColor: function(e) {
                1 == e ? (this.node.getChildByName("buybtn").active = !0, this.node.getChildByName("buydarkbtn").active = !1) : (this.node.getChildByName("buybtn").active = !1, this.node.getChildByName("buydarkbtn").active = !0), this.node.getChildByName("buydarkbtn").runAction(cc.scaleTo(.05, 1)), this.node.getChildByName("buybtn").runAction(cc.scaleTo(.05, 1))
            },
            clickBuyBtnFun: function() {
                this.fishID = heroData.shopData.lastFishID()[0];
                1 == heroData.shopData.buyFish(this.fishID, 1) && (this.refreshGold(), mainSceneContol.helpGoldLayerComponent.refreshGold());
                "6" == heroData.noviceGuidance && (heroData.noviceGuidance = "100", removeNoviceLayerFun(), mainSceneContol.moveFishTips.initialize());
                "5" == heroData.noviceGuidance && (heroData.noviceGuidance = "6", addNoviceLayerFun());
                "2" == heroData.noviceGuidance && (heroData.noviceGuidance = "3", addNoviceLayerFun());
                "1" == heroData.noviceGuidance && (heroData.noviceGuidance = "2", addNoviceLayerFun());

                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
           
           }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    MainEvolutionLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "4f90eQxDg1NMom37RzM/jbA", "MainEvolutionLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                evolutionLayerComponent: null
            },
            onDestroy: function() {
                this.isInit = null, this.evolutionLayerComponent = null
            },
            destroyNode: function() {
                this.node.getChildByName("transformationbtn").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.getChildByName("transformationbtn").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.btnShowFun(), this.isClickBtn = !0, this.isInit = !0)
            },
            btnShowFun: function() {
                this.node.getChildByName("transformationbtn").getChildByName("profitart").getComponent("GameArtWord").setString("x" + (gameConfigData.transformationProfit.basicGoldProfit - gameConfigData.transformationInitProfit.basicGoldProfit))
            },
            layerBackFun: function(e) {
                var t = this;
                if (null != this.evolutionLayerComponent) {
                    var i = this.evolutionLayerComponent.node;
                    mainSceneContol.bgLayer.active = !0, i.runAction(cc.sequence(cc.moveTo(1, engine.gameAdapterInfo.getPercentageX(.5) - i.width, engine.gameAdapterInfo.getPercentageY(.5)).easing(cc.easeInOut(4)), cc.callFunc(function() {
                        e && e(), i.stopAllActions(), t.evolutionLayerComponent.destroyNode(), t.evolutionLayerComponent = null
                    })))
                }
            },
            clickBtnFun: function() {
                var e = this;
                guideTurnNoviceLayer && (guideTurnNoviceLayer.active = !1);
                var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.evolution_prefab);
                engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotStopIndex), this.evolutionLayerComponent = t.addComponent("EvolutionLayer"), t.x -= t.width, t.runAction(cc.sequence(cc.moveTo(1, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5)).easing(cc.easeInOut(4)), cc.callFunc(function() {
                    if (mainSceneContol.bgLayer.active = !1, guideTurnNoviceLayer) {
                        guideTurnNoviceLayer.active = !0, e.evolutionLayerComponent.curUnlockBtn.stopAllActions();
                        var t = e.evolutionLayerComponent.curUnlockBtn.getChildByName("sellimgbtn").convertToWorldSpaceAR(cc.v2(0, 0));
                        mainSceneContol.addGuideTurnNoviceFun(t.x, t.y, gameConfigData.transformationConfig.evolNoviceTxt[1], "evolution")
                    }
                })))
            }
        }), cc._RF.pop()
    }, {}],
    MainInvitationLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0de4c9phahKjZTM53jDPzm1", "MainInvitationLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isFreeGold: null,
                timeTxt: null
            },
            onDestroy: function() {
                this.isInit = null, this.isFreeGold = null, this.timeTxt = null
            },
            destroyNode: function() {
                this.node.getChildByName("treasureBoxbtn").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isFreeGold = !1, this.node.getChildByName("treasureBoxbtn").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.isInit = !0)
            },
            clickBtnFun: function() {
                gameSDK.logEvent("game_yaoqinghaoyou_libao_dianji", 1, {
                    game_yaoqinghaoyou_libao_dianji: "game_yaoqinghaoyou_libao_dianji"
                });
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.invitation_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIBottomzIndex);
                e.addComponent("InvitationLayer")
            }
        }), cc._RF.pop()
    }, {}],
    MainLeftLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "af7069yiWJIS6uOr2soela+", "MainLeftLayer");
        var n = e("GameRankData");
        e("FaceBookSDK");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                redsp: null,
                redspInner: null,
                openRank: null,
                gameRankData: null,
                myRankData: null,
                haveGetMyRankData: null
            },
            onDestroy: function() {
                this.isInit = null, this.redsp = null, this.redspInner = null, this.openRank = null, this.gameRankData = null, this.myRankData = null, this.haveGetMyRankData = null
            },
            destroyNode: function() {
                this.unschedule(this.updateRedPoint), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("achievementbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenAchievementFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("fishtankimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenLevelUpFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("rankbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenRankFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("illustrationsbtn").off(cc.Node.EventType.TOUCH_END, this.showIllustrations, this), this.node.getChildByName("ICON_kuozhansp").off(cc.Node.EventType.TOUCH_END, this.iconkuozhanspFun, this), this.node.getChildByName("ICON_kuozhan2sp").off(cc.Node.EventType.TOUCH_END, this.iconkuozhansp2Fun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.node.getChildByName("ICON_kuozhan2sp").getChildByName("achievementbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenAchievementFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("fishtankimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenLevelUpFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("rankbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenRankFun, this), this.node.getChildByName("ICON_kuozhan2sp").getChildByName("illustrationsbtn").on(cc.Node.EventType.TOUCH_END, this.showIllustrations, this), this.node.getChildByName("ICON_kuozhansp").on(cc.Node.EventType.TOUCH_END, this.iconkuozhanspFun, this), this.node.getChildByName("ICON_kuozhan2sp").on(cc.Node.EventType.TOUCH_END, this.iconkuozhansp2Fun, this), this.node.getChildByName("ICON_kuozhan2sp").active = !1, this.openRank = !1, this.haveGetMyRankData = !1, this.gameRankData = new n, this.gameRankData.initialize(), this.redsp = this.node.getChildByName("ICON_kuozhansp").getChildByName("redsp"), this.redspInner = this.node.getChildByName("ICON_kuozhan2sp").getChildByName("achievementbtn").getChildByName("redsp"))
            },
            clickOpenRankFun: function() {
                var e = this;
                e.openRank = !0, 1 == e.gameRankData.rankIsChange(rankTypeEm.friendRank) && gameSDK.getPlayerEntryAsync(idlefishUsedGoldRank, function(t) {
                    e.myRankData = t
                }), e.haveGetMyRankData = !0, e.gameRankData.loadFriendRankDataBySDK(), e.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    e.openRank = !1
                })))
            },
            iconkuozhanspFun: function() {
                this.node.getChildByName("ICON_kuozhan2sp").scaleX = 1, this.node.getChildByName("ICON_kuozhan2sp").scaleY = 1, this.node.getChildByName("ICON_kuozhansp").active = !1, this.node.getChildByName("ICON_kuozhan2sp").active = !0
            },
            iconkuozhansp2Fun: function() {
                this.node.getChildByName("ICON_kuozhansp").active = !0, this.node.getChildByName("ICON_kuozhan2sp").active = !1
            },
            clickOpenAchievementFun: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.achievement_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.addComponent("AchievementLayer")
            },
            clickOpenLevelUpFun: function() {
                if (1 == mainSceneContol.alreadyLoadedBG) {
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.unlock_levelup_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                    e.addComponent("LevelUpLayer")
                }
            },
            showIllustrations: function() {
                if (1 == mainSceneContol.alreadyLoadedBG) {
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.collect_layer_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), 100);
                    e.addComponent("CollectLayer")
                }
            },
            checkRedPoint: function() {
                for (var e in heroData.achievementDataList) {
                    if (-1 != heroData.achievementDataList[e])
                        if (1 == mainSceneContol.gamePlayLayerComponent.achievement(e).result) return !0
                }
                return !1
            },
            updateRedPoint: function() {},
            update: function() {
                if (this.checkRedPoint() ? (this.redsp.active = !0, this.redspInner.active = !0) : (this.redsp.active = !1, this.redspInner.active = !1), 1 == this.openRank && this.gameRankData.getRankData(2).length > 0 && 1 == this.haveGetMyRankData) {
                    this.openRank = !1, this.haveGetMyRankData = !1;
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.rank_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.addComponent("RankLayer").initData(this.gameRankData.getRankData(2), this.myRankData)
                }
            }
        }), cc._RF.pop()
    }, {
        FaceBookSDK: "FaceBookSDK",
        GameRankData: "GameRankData"
    }],
    MainRankLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9c480I2/QtBsKISm2Zlv2e6", "MainRankLayer"), cc._RF.pop()
    }, {}],
    MainRightLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b20a35Z3/dIW5UcvXniZ48w", "MainRightLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                freeTimeTxt: null,
                leftTimeSecond: null,
                fishNode: null,
                gridX: null,
                gridY: null,
                fishID: null,
                isSpeedUp: null,
                timeTxt: null,
                fullscreenNode: null,
                helpGoldNode: null,
                isLamp: null
            },
            onDestroy: function() {
                this.isInit = null, this.freeTimeTxt = null, this.leftTimeSecond = null, this.fishNode = null, this.gridX = null, this.gridY = null, this.fishID = null, this.isSpeedUp = null, this.timeTxt = null, this.fullscreenNode = null, this.helpGoldNode = null, this.isLamp = null
            },
            destroyNode: function() {
                this.node.getChildByName("freeiconimgbtn").off(cc.Node.EventType.TOUCH_END, this.checkMainFishList, this), this.node.getChildByName("accelerateimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenSpeedFun, this), this.unschedule(this.updateFishIcon), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.freeTimeTxt = this.node.getChildByName("freeiconimgbtn").getChildByName("freetimetxt"), this.fishNode = this.node.getChildByName("freeiconimgbtn").getChildByName("fishsp"), this.helpGoldNode = cc.director.getScene().getChildByName("help_gold_box_prefab"), this.isLamp = !1, "1" == gameConfigData.configureTable.config ? (this.fishNode.scaleX = .6, this.fishNode.scaleY = .6) : "2" == gameConfigData.configureTable.config && (this.fishNode.scaleX = .8, this.fishNode.scaleY = .8), this.node.getChildByName("accelerateimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenSpeedFun, this), this.timeTxt = this.node.getChildByName("accelerateimgbtn").getChildByName("goldtimetxt"), this.schedule(this.updateFishIcon, 1), this.isInit = !0)
            },
            initData: function() {
                this.checkAdvertisement(), this.showFreeTime(), this.leftTimeSecond > 0 && this.startTime(), this.updateFishIcon(), this.updateShowTime()
            },
            checkMainFishList: function() {
                for (var e = 0; e < heroData.mainFishList.length; e++)
                    for (var t = 0; t < heroData.mainFishList[e].length; t++) {
                        if (!heroData.mainFishList[e][t]) return this.gridX = e, this.gridY = t, void this.advAddFishFun()
                    }
                var i = engine.gameData.dataDic.language;
                mainSceneContol.gamePlayLayerComponent.popNotice(i[1003].content)
            },
            advAddFishFun: function() {
                if (0 != gameConfigData.advMaxTimes && heroData.advAddFishTimes >= gameConfigData.advMaxTimes) {
                    var e = engine.gameData.dataDic.language;
                    mainSceneContol.gamePlayLayerComponent.popNotice(e[1008].content)
                } else {
                    var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.popcommon_prefab);
                    engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), t.addComponent("AdvAddFishLayer").showFish(this.fishID)
                }
            },
            lookAdvertisement: function() {
                heroData.advAddFishTimes++, this.lookAdvertisementOver()
            },
            lookAdvertisementOver: function() {
                this.restartTime();
                var e = heroData.gamePlayData.addFish(this.gridX, this.gridY, this.fishID);
                mainSceneContol.gamePlayLayerComponent.addFishAnimate(e, !0)
            },
            updateFishIcon: function() {
                var e = heroData.shopData.lastFishID()[0],
                    t = gameConfigData.fishConfig[e].nextFishID;
                t || (t = e), this.fishID = t;
                var i = gameConfigData.fishConfig[this.fishID].icon;
                this.fishNode.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + i)
            },
            clickOpenSpeedFun: function() {
                if (0 != gameConfigData.upMaxTimes && heroData.watchUpTimes >= gameConfigData.upMaxTimes) {
                    var e = engine.gameData.dataDic.language;
                    mainSceneContol.gamePlayLayerComponent.popNotice(e[1008].content)
                } else if (0 == this.isSpeedUp) {
                    var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.speed_up_prefab);
                    engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), t.addComponent("SpeedUpLayer"), t.getChildByName("lightsp").runAction(cc.rotateBy(30, 360).repeatForever()), t.getChildByName("fishgroup2sp").runAction(cc.sequence(cc.skewBy(1.2, 4, 4), cc.skewBy(1.2, -4, -4)).repeatForever()), t.getChildByName("fishgroup3sp").runAction(cc.sequence(cc.skewBy(1.2, 4, 4), cc.skewBy(1.2, -4, -4)).repeatForever()), t.getChildByName("fishgroup4sp").runAction(cc.sequence(cc.skewBy(1.2, 4, 4), cc.skewBy(1.2, -4, -4)).repeatForever()), t.getChildByName("fishgroup5sp").runAction(cc.sequence(cc.skewBy(1.2, 4, 4), cc.skewBy(1.2, -4, -4)).repeatForever()), t.getChildByName("lightimgleftsp").runAction(cc.sequence(cc.scaleTo(1.2, 1.1, 1.1), cc.scaleTo(1.2, 1, 1)).repeatForever()), t.getChildByName("lightimgrightsp").runAction(cc.sequence(cc.scaleTo(1.2, .8, .8), cc.scaleTo(1.2, 1, 1)).repeatForever())
                } else {
                    e = engine.gameData.dataDic.language;
                    mainSceneContol.gamePlayLayerComponent.popNotice(e[1002].content)
                }
            },
            updateShowTime: function() {
                if (heroData.speedUpTime > engine.gameTime.getLocalTime()) {
                    this.isSpeedUp = !0, this.timeTxt.active = !0;
                    var e = engine.gameTime.formatTime(heroData.speedUpTime - engine.gameTime.getLocalTime()).substring(3, 8);
                    this.timeTxt.getComponent(cc.Label).string = e
                } else this.isSpeedUp = !1, this.timeTxt.active = !1;
                heroData.gamePlayData && heroData.gamePlayData.refreshProductionPer()
            },
            lampOpenFun: function() {
                var e = this;
                this.isLamp = !0, this.helpGoldNode.getChildByName("goldbgimg2sp").active = !0, this.helpGoldNode.getChildByName("goldbgimg2sp").runAction(cc.sequence(cc.callFunc(function() {
                    e.helpGoldNode.getChildByName("goldbgimg3sp").active = !0, e.helpGoldNode.getChildByName("goldbgimg4sp").active = !1
                }), cc.delayTime(.35), cc.callFunc(function() {
                    e.helpGoldNode.getChildByName("goldbgimg3sp").active = !1, e.helpGoldNode.getChildByName("goldbgimg4sp").active = !0
                }), cc.delayTime(.35)).repeatForever())
            },
            lampCloseFun: function() {
                this.helpGoldNode.getChildByName("goldbgimg2sp").stopAllActions(), this.helpGoldNode.getChildByName("goldbgimg2sp").active = !1, this.helpGoldNode.getChildByName("goldbgimg3sp").active = !1, this.helpGoldNode.getChildByName("goldbgimg4sp").active = !1, this.isLamp = !1
            },
            update: function() {
                if (1 == this.isSpeedUp) {
                    var e = heroData.speedUpTime - engine.gameTime.getLocalTime(),
                        t = engine.gameTime.formatTime(heroData.speedUpTime - engine.gameTime.getLocalTime()).substring(3, 8);
                    this.timeTxt.getComponent(cc.Label).string = t, 0 == this.isLamp && this.lampOpenFun();
                    var i = "spine/fullscreen/fullscreen";
                    if (null != engine.gameMemoryManagement.getSpine(i))
                        if (null == this.fullscreenNode) {
                            this.fullscreenNode = new cc.Node, engine.gameAdapterInfo.addSceneNode(this.fullscreenNode, engine.gameAdapterInfo.getPercentageX(.4), engine.gameAdapterInfo.getPercentageY(.6), UIzIndexInfo.UIFullScreenIndex);
                            var n = this.fullscreenNode.addComponent(sp.Skeleton),
                                a = engine.gameMemoryManagement.getSpine(i);
                            n.skeletonData = a, n.loop = !0, n.animation = "fullscreen", n.timeScale = .7, gameConfigData.boxLowestLayerNum += 1
                        } else this.fullscreenNode.active = !0;
                    e <= 0 && (this.isSpeedUp = !1, this.timeTxt.active = !1, this.fullscreenNode.active = !1, 1 == this.isLamp && this.lampCloseFun(), 1 == heroData.gamePlayData.speedUpGoldNum.numArr.length && 0 == heroData.gamePlayData.speedUpGoldNum.numArr[0] || heroData.gamePlayData && heroData.gamePlayData.refreshProductionPer())
                }
            },
            checkAdvertisement: function() {
                var e = heroData.gamePlayData.checkAdvertisement();
                this.leftTimeSecond = e
            },
            showFreeTime: function() {
                if (0 === this.leftTimeSecond) this.node.stopAllActions(), this.node.getChildByName("freeiconimgbtn").on(cc.Node.EventType.TOUCH_END, this.checkMainFishList, this), this.freeTimeTxt.active = !1;
                else {
                    this.node.getChildByName("freeiconimgbtn").off(cc.Node.EventType.TOUCH_END, this.checkMainFishList, this), this.freeTimeTxt.active = !0;
                    var e = this.getTimeString();
                    this.freeTimeTxt.getComponent(cc.Label).string = e
                }
            },
            getTimeString: function() {
                var e = parseInt(this.leftTimeSecond / 60).toString();
                e.length > 2 ? e = "99" : e.length < 2 && (e = "0" + e);
                var t = parseInt(this.leftTimeSecond % 60).toString();
                return t.length < 2 && (t = "0" + t), e + ":" + t
            },
            restartTime: function() {
                heroData.gamePlayData.saveAdvertisementTime(), this.leftTimeSecond = gameConfigData.advertisementTime, this.startTime()
            },
            startTime: function() {
                var e = this;
                this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.leftTimeSecond -= 1, e.showFreeTime()
                }), cc.delayTime(1)).repeatForever())
            }
        }), cc._RF.pop()
    }, {}],
    MainSceneControl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c9284xOrLhKYKfddmPxHIvy", "MainSceneControl");
        var n = e("LoadControl"),
            a = e("NumCalculate");
        e("FaceBookSDK");
        window.mainSceneContol = null, window.mainSceneHasLoad = !1, window.guideTurnNoviceLayer = null, window.turntableCheatData = [parseInt(10 * Math.random()), parseInt(10 * Math.random())], window.getRewardWayName = {
            share: "arrow",
            watch: "watchadimg"
        }, cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                gamePlayLayerComponent: null,
                helpGoldLayerComponent: null,
                recoveryLayerComponent: null,
                mainLeftLayerComponent: null,
                mainRightLayerComponent: null,
                mainDownLayerComponent: null,
                mainSetUpLayerComponent: null,
                treasureBoxLayerComponent: null,
                mainTurntableLayerComponent: null,
                mainInvitationLayerComponent: null,
                mainTaskLayerComponent: null,
                mainBackLayerComponent: null,
                mainTransformationLayerComponent: null,
                mainEvolutionLayerComponent: null,
                bgLayerComponent: null,
                saveDataCD: null,
                mainLayer: null,
                moveFishTips: null,
                currentTime: null,
                localPlayTime: null,
                goldParticlePool: null,
                illustratedUrl: null,
                leaveLayer: null,
                effectLayer: null,
                topUIX: null,
                bottomUIX: null
            },
            onDestroy: function() {
                this.isInit = null, mainSceneHasLoad = !0, this.gamePlayLayerComponent = null, this.helpGoldLayerComponent = null, this.mainDownLayerComponent = null, this.mainLeftLayerComponent = null, this.mainRightLayerComponent = null, this.recoveryLayerComponent = null, this.mainSetUpLayerComponent = null, this.treasureBoxLayerComponent = null, this.mainTurntableLayerComponent = null, this.mainInvitationLayerComponent = null, this.mainTaskLayerComponent = null, this.mainBackLayerComponent = null, this.mainTransformationLayerComponent = null, this.mainEvolutionLayerComponent = null, this.bgLayerComponent = null, this.saveDataCD = null, this.mainLayer = null, this.moveFishTips = null, this.currentTime = null, this.localPlayTime = null, this.goldParticlePool = null, this.illustratedUrl = null, this.leaveLayer = null, this.effectLayer = null, this.topUIX = null, this.bottomUIX = null, mainSceneContol = null
            },
            initialize: function() {
                if (1 != this.isInit) {
                    ccLog("进入主场景。");
                    this.currentTime = 0, this.localPlayTime = engine.gameTime.getLocalTime(), cc.view.setDesignResolutionSize(engineGlobal.viewGameWidth, engineGlobal.viewGameHeigh, cc.ResolutionPolicy.SHOW_ALL), mainSceneContol = this, this.saveDataCD = 0, 0 == gameConfigData.firstMainScene && (gameConfigData.firstMainScene = !0, gameSDK.logEvent("getInto_mainScene", 1, {
                        getInto_mainScene: "getInto_mainScene"
                    })), 0 == heroData.everydayLogin && (heroData.everydayLogin = 1, heroData.saveHeroData(), gameSDK.logEvent("everydayLogin_mainScene", 1, {
                        everydayLogin_mainScene: "everydayLogin_mainScene"
                    })), !0 === isFirstEnterGame && gameSDK.logEvent("firstLogin_mainScene", 1, {
                        firstLogin_mainScene: "firstLogin_mainScene"
                    }), engine.gameSound.playMusic(soundurl.backGroundSound, !0), this.mainLayer = new cc.Node, this.effectLayer = new cc.Node, engine.gameAdapterInfo.addSceneNode(this.effectLayer, engine.gameAdapterInfo.getPercentageX(0), engine.gameAdapterInfo.getPercentageY(0), UIzIndexInfo.UIBoxIndex);
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.recoveryimg_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.095), engine.gameAdapterInfo.getEndY(82), 0);
                    var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_down_prefab);
                    engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.56), engine.gameAdapterInfo.getEndY(82), 0), this.mainDownLayerComponent = t.addComponent("MainDownLayer"), t.getChildByName("shopiconimgbtn") ? mainSceneContol.bottomUIX = t.getChildByName("shopiconimgbtn").convertToWorldSpaceAR(cc.v2(0, 0)).x : mainSceneContol.bottomUIX = t.x + engine.gameAdapterInfo.getPercentageX(.33);
                    var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_evolution_prefab);
                    engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.26), engine.gameAdapterInfo.getEndY(82), 0), this.mainEvolutionLayerComponent = i.addComponent("MainEvolutionLayer"), engine.gameAdapterInfo.addSceneNode(this.mainLayer, engine.gameAdapterInfo.getPercentageX(0), engine.gameAdapterInfo.getPercentageY(0)), this.gamePlayLayerComponent = this.mainLayer.addComponent("GamePlayLayer"), this.bgLayer = engine.gameMemoryManagement.getPrefab(curBackgroundPrefab), engine.gameAdapterInfo.addSceneNode(this.bgLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIBgimgzIndex), this.bgLayerComponent = this.bgLayer.addComponent("BgLayer"), this.recoveryLayerComponent = e.addComponent("RecoveryLayer"), this.moveFishTips = this.effectLayer.addComponent("MoveFishTips");
                    var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_task_prefab);
                    engine.gameAdapterInfo.addSceneNode(n, engine.gameAdapterInfo.getPercentageX(.1), engine.gameAdapterInfo.getPercentageY(.56)), this.mainTaskLayerComponent = n.addComponent("MainTaskLayer");
                    var a = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.help_gold_box_prefab);
                    engine.gameAdapterInfo.addSceneNode(a, engine.gameAdapterInfo.getPercentageX(.48), engine.gameAdapterInfo.getTopY(50)), this.helpGoldLayerComponent = a.addComponent("HelpGoldLayer"), a.getChildByName("goldimgsp") ? mainSceneContol.topUIX = a.getChildByName("goldimgsp").convertToWorldSpaceAR(cc.v2(0, 0)).x : "1" == gameConfigData.configureTable.config ? mainSceneContol.topUIX = a.x - engine.gameAdapterInfo.getPercentageX(.095) : mainSceneContol.topUIX = a.x - engine.gameAdapterInfo.getPercentageX(.13);
                    var o = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_right_prefab);
                    engine.gameAdapterInfo.addSceneNode(o, engine.gameAdapterInfo.getPercentageX(.1), engine.gameAdapterInfo.getPercentageY(.45)), this.mainRightLayerComponent = o.addComponent("MainRightLayer");
                    var s = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.treasureBox_prefab);
                   engine.gameAdapterInfo.addSceneNode(s, engine.gameAdapterInfo.getPercentageX(.91), engine.gameAdapterInfo.getPercentageY(.88)), this.treasureBoxLayerComponent = s.addComponent("TreasureBoxLayer");
                    var l = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_turntable_prefab);
                    engine.gameAdapterInfo.addSceneNode(l, engine.gameAdapterInfo.getPercentageX(.91), engine.gameAdapterInfo.getPercentageY(.56)), this.mainTurntableLayerComponent = l.addComponent("MainTurntableLayer");
                    //var r = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_invitation_prefab);
                    //engine.gameAdapterInfo.addSceneNode(r, engine.gameAdapterInfo.getPercentageX(.91), engine.gameAdapterInfo.getPercentageY(.45)), this.mainInvitationLayerComponent = r.addComponent("MainInvitationLayer");
                    //var c = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_transformation_prefab);
                    //engine.gameAdapterInfo.addSceneNode(c, engine.gameAdapterInfo.getPercentageX(.1), engine.gameAdapterInfo.getTopY(190), 0), this.mainTransformationLayerComponent = c.addComponent("MainTransformationLayer");
                    var d = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.main_back_prefab);
                    engine.gameAdapterInfo.addSceneNode(d, engine.gameAdapterInfo.getPercentageX(.1), engine.gameAdapterInfo.getPercentageY(.955)), this.mainBackLayerComponent = d.addComponent("MainBackLayer"), heroData.initGameData(), this.mainRightLayerComponent.initData(), heroData.gamePlayData.initFish(), heroData.gamePlayData.refreshProductionPer(), gameConfigData.boxLowestLayerNum = cc.director.getScene().children.length, 0 == heroData.isGetOutLine && heroData.lastCloseGameTime > 0 && parseInt(this.offlineFun()) > 0 && (this.leaveLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.popcommon_prefab), engine.gameAdapterInfo.addSceneNode(this.leaveLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), this.leaveLayer.addComponent("OfflineLayer")), this.goldParticlePool = new cc.NodePool;
                    for (var h = 0; h < 1; h++) {
                        var g = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.gold_particle_prefab);
                        this.goldParticlePool.put(g)
                    }
                    if (this.addGoldParticle(-2e3, -2e3), this.loadRes([{
                            url: "spine/fullscreen/fullscreen",
                            restype: LoadStyleType.spine
                        }]), "0" == heroData.noviceGuidance ? (heroData.noviceGuidance = "1", addNoviceLayerFun()) : mainSceneContol.moveFishTips.initialize(), this.isInit = !0, gameSDK.getfriendsList(function(e) {}), 1 == canSubscribe && null != cc.director.getScene() && null != mainSceneContol && 0 == heroData.haveReceiveMessageDiamond) {
                        var u = engine.gameMemoryManagement.getPrefab(mainBgPrefab.messagelayer_prefab);
                        engine.gameAdapterInfo.addSceneNode(u, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIMessageIndex), u.addComponent("MessageLayer")
                    }

                    //this.MainInvitationLayer.active = false;

                }
            },
            getShareData: function() {
                var e = new Object;
                return e.pngData = [{
                    url: gameSDK.sdkPlayInfo.photo,
                    posX: 79,
                    posY: 90,
                    imgWidth: 163,
                    imgHeight: 163
                }, {
                    url: cc.url.raw("resources/invbg.png"),
                    posX: 0,
                    posY: 0,
                    imgWidth: 750,
                    imgHeight: 380
                }], e.width = 750, e.height = 380, e
            },
            offlineFun: function() {
                var e = parseInt((engine.gameTime.getLocalTime() - heroData.lastCloseGameTime) / 1e3),
                    t = new a;
                t.loadSaveData([e]);
                var i = heroData.gamePlayData.offLineAdd();
                return t.multiplicationNum(i), t.getNumText()
            },
            update: function(e) {
                if (!0 === this.isInit) {
                    this.currentTime += 1e3 * e;
                    var t = engine.gameTime.getLocalTime() - this.localPlayTime;
                    if (t > this.currentTime) {
                        var i = t - this.currentTime;
                        if (i > 6e4) {
                            if (ccLog("挂机时间" + i), null != this.leaveLayer) this.leaveLayer.getComponent("OfflineLayer").lastGoldNumFun();
                            else if (1 != (o = heroData.gamePlayData.refreshProductionPer()).numArr.length || 0 != o.numArr[0]) {
                                this.leaveLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.popcommon_prefab);
                                var n = UIzIndexInfo.UITopzIndex;
                                1 == gameConfigData.isUnderwayNovice && (n = UIzIndexInfo.UINovicezIndex), engine.gameAdapterInfo.addSceneNode(this.leaveLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), n), this.leaveLayer.addComponent("OfflineLayer")
                            }
                        } else if (i > 5e3) {
                            ccLog("挂机时间" + i);
                            var o = heroData.gamePlayData.refreshProductionPer(),
                                s = new a;
                            s.loadSaveData([i / 1e3]), o.multiplicationNum(s), heroData.gamePlayData.addGold(o);
                            var l = o.getNumText();
                            1 == o.numArr.length && 0 == o.numArr[0] || this.addGoldParticle(engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), l)
                        }
                        this.currentTime = t
                    }
                    this.saveDataCD += 1e3 * e, this.saveDataCD > gameConfigData.saveDataCD && (heroData.lastCloseGameTime = engine.gameTime.getLocalTime(), this.saveDataCD = 0, heroData.saveHeroData())
                }
            },
            addGoldParticle: function(e, t, i) {
                var n = this;
                if (this.goldParticlePool.size() > 0) {
                    var a = this.goldParticlePool.get();
                    if (engine.gameAdapterInfo.addSceneNode(a, e, t, UIzIndexInfo.UIBoxIndex), a.getComponent(cc.ParticleSystem).resetSystem(), this.node.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function() {
                            n.goldParticlePool.put(a)
                        }))), i) {
                        var o = a.getChildByName("goldcountart");
                        o.getComponent("GameArtWord").setString("+" + i), o.scaleX = .1, o.scaleY = .1, o.x = 0, o.y = 0, o.runAction(cc.sequence(cc.scaleTo(.3, 1.6), cc.scaleTo(.3, 1.5), cc.delayTime(.8), cc.moveTo(.1, mainSceneContol.topUIX - engine.gameAdapterInfo.getPercentageX(.4), engine.gameAdapterInfo.getPercentageY(.5))))
                    }
                }
            },
            isGetVariation: function(e, t) {
                return !1
            },
            getRandomInt: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            },
            refresh: function() {
                this.helpGoldLayerComponent.refreshGold()
            },
            getVariationChange: function(e, t) {
                var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fish_variation_prefab);
                engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), i.addComponent("FishVariationLayer").initialize(e, t)
            },
            addGuideTurnNoviceFun: function(e, t, i, n) {
                if (guideTurnNoviceLayer && (guideTurnNoviceLayer.destroy(), guideTurnNoviceLayer = null), e && t) {
                    guideTurnNoviceLayer = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.novice_layer_prefab), engine.gameAdapterInfo.addSceneNode(guideTurnNoviceLayer, engineGlobal.gameWidth / 2, engineGlobal.gameHeigh / 2, UIzIndexInfo.UINovicezIndex);
                    var a = guideTurnNoviceLayer.addComponent("NoviceLayer");
                    n && 0 != n ? a.initialize(n) : a.initialize();
                    var o = "click here";
                    i && 0 != i && (o = i);
                    var s = guideTurnNoviceLayer.convertToNodeSpaceAR(cc.p(e, t));
                    e = s.x, t = s.y, e += 10, t += 10, a.resetLayer(e, t, o)
                }
            },
            onLoad: function() {
                this.initialize()
            },
            loadRes: function(e, t) {
                for (var i = 0, a = 0; a < e.length; a++)(function(a) {
                    var o = e[a].url,
                        s = e[a].restype,
                        l = function() {
                            t && (i += 1) == e.length && t()
                        },
                        r = function() {
                            var e = new n,
                                t = new Object;
                            t.resources = [{
                                url: o,
                                restype: s
                            }], t.completeCallback = function() {
                                l()
                            }, e.initialize(t), e.load()
                        };
                    switch (s) {
                        case 1:
                            null == engine.gameMemoryManagement.getPrefab(o) ? r() : l();
                            break;
                        case 2:
                            null == engine.gameMemoryManagement.getSpriteAtlas(o) ? r() : l();
                            break;
                        case 3:
                            null == engine.gameMemoryManagement.getSpine(o) ? r() : l();
                            break;
                        case 4:
                            null == engine.gameMemoryManagement.getParticle(o) ? r() : l();
                            break;
                        default:
                            r()
                    }
                })(a)
            }
        }), cc._RF.pop()
    }, {
        FaceBookSDK: "FaceBookSDK",
        LoadControl: "LoadControl",
        NumCalculate: "NumCalculate"
    }],
    MainSetUpLayer2: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "003edPVqulFWZ4USIbIWqbZ", "MainSetUpLayer2"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("helpiconimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickHelpFun, this), this.node.getChildByName("soundopenedbtn").off(cc.Node.EventType.TOUCH_END, this.clickSoundFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.getChildByName("helpiconimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickHelpFun, this), this.node.getChildByName("soundopenedbtn").on(cc.Node.EventType.TOUCH_END, this.clickSoundFun, this), this.refreshSoundState(), this.isInit = !0)
            },
            clickHelpFun: function() {
                var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.help_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5));
                e.addComponent("HelpLayer")
            },
            clickSoundFun: function() {
                1 == heroData.getSoundState() ? heroData.closeSound() : heroData.openSound(), this.refreshSoundState()
            },
            refreshSoundState: function(e) {
                var t = heroData.getSoundState();
                e && (1 == e ? t = 1 : 2 == e && (t = 0)), 1 == t ? (engine.gameSound.openBackgroundMusic(), engine.gameSound.openEffectMusic(), this.node.getChildByName("soundopenedbtn").getChildByName("mainsoundopenedimgsp").active = !0, this.node.getChildByName("soundopenedbtn").getChildByName("mainsoundclosedimgsp").active = !1) : (engine.gameSound.stopBackgroundMusic(), engine.gameSound.stopEffectMusic(), this.node.getChildByName("soundopenedbtn").getChildByName("mainsoundopenedimgsp").active = !1, this.node.getChildByName("soundopenedbtn").getChildByName("mainsoundclosedimgsp").active = !0)
            }
        }), cc._RF.pop()
    }, {}],
    MainTaskLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b5ce2Ey32ZJPbX5lKqTP+ae", "MainTaskLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                redsp: null
            },
            onDestroy: function() {
                this.isInit = null, this.redsp = null
            },
            destroyNode: function() {
                this.node.getChildByName("ICON_kuozhan2sp").getChildByName("achievementbtn").off(cc.Node.EventType.TOUCH_END, this.clickOpenAchievementFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.getChildByName("taskbtn").on(cc.Node.EventType.TOUCH_END, this.clickOpenAchievementFun, this), this.redsp = this.node.getChildByName("taskbtn").getChildByName("redsp"), this.isInit = !0)
            },
            clickOpenAchievementFun: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.achievement_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.addComponent("AchievementLayer")
            },
            checkRedPoint: function() {
                for (var e in heroData.achievementDataList) {
                    if (-1 != heroData.achievementDataList[e])
                        if (1 == mainSceneContol.gamePlayLayerComponent.achievement(e).result) return !0
                }
                return !1
            },
            update: function() {
                1 == this.isInit && (this.checkRedPoint() ? this.redsp.active = !0 : this.redsp.active = !1)
            }
        }), cc._RF.pop()
    }, {}],
    MainTransformationLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2c411+rqrRKO58Q51tvsiLn", "MainTransformationLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isClick: null
            },
            onDestroy: function() {
                this.isInit = null, this.isClick = null
            },
            destroyNode: function() {
                this.node.getChildByName("transformationbtn").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isClick = !0, this.node.getChildByName("transformationbtn").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.btnShowFun(), this.isInit = !0)
            },
            btnShowFun: function() {
                heroData.shopData.refreshLastFishFun(), gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level >= gameConfigData.transformationConfig.minUseLevel ? (this.node.getChildByName("lightimgsp").active = !0, this.node.getChildByName("transformationbtn").active = !0, this.node.getChildByName("transformation2sp").active = !1, this.node.getChildByName("lightimgsp").stopAllActions(), this.node.getChildByName("transformationbtn").stopAllActions(), this.node.getChildByName("lightimgsp").x = 0, this.node.getChildByName("lightimgsp").y = 0, this.node.getChildByName("lightimgsp").runAction(cc.rotateBy(30, 360).repeatForever()), this.node.getChildByName("transformationbtn").rotation = 0, this.node.getChildByName("transformationbtn").runAction(cc.sequence(cc.rotateTo(.1, -7), cc.rotateTo(.2, 7), cc.rotateTo(.2, -7), cc.rotateTo(.2, 7), cc.rotateTo(.1, 0), cc.delayTime(2)).repeatForever())) : (this.node.getChildByName("lightimgsp").stopAllActions(), this.node.getChildByName("transformationbtn").stopAllActions(), this.node.getChildByName("lightimgsp").active = !1, this.node.getChildByName("transformationbtn").active = !1, this.node.getChildByName("transformation2sp").active = !0)
            },
            clickBtnFun: function() {
                if (0 != this.isClick && (heroData.shopData.refreshLastFishFun(), gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level >= gameConfigData.transformationConfig.minUseLevel)) {
                    var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.transformation_sale_tips_prefab);
                    engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIConfirmzIndex);
                    e.addComponent("TransformationSaleLayer")
                }
            }
        }), cc._RF.pop()
    }, {}],
    MainTurntableLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c90abq8055Nhbe1oj1BqIia", "MainTurntableLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                currentTime: null,
                remainingTime: null,
                updateTimes: null
            },
            onDestroy: function() {
                this.isInit = null, this.currentTime = null, this.remainingTime = null, this.updateTimes = null
            },
            destroyNode: function() {
                this.node.getChildByName("smallTurntableBgbtn").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.currentTime = 0, this.remainingTime = 0, this.updateTimes = 0, this.refreshRedSpot(), this.node.getChildByName("smallTurntableBgbtn").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.getChildByName("smallTurntableBgbtn").getChildByName("smallTurntablesp").runAction(cc.sequence(cc.rotateBy(3, 1080), cc.delayTime(1)).repeatForever()), this.isInit = !0)
            },
            clickBtnFun: function() {
                gameSDK.logEvent("zhuanpan_dianji", 1, {
                    zhuanpan_dianji: "zhuanpan_dianji"
                });
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIBoxIndex), e.addComponent("TurntableLayer")
            },
            getRemainingTime: function() {
                return Math.ceil((gameConfigData.turntableIntervalTime - this.remainingTime) / 1e3)
            },
            refreshRedSpot: function() {
                var e = this.node.getChildByName("smallTurntableBgbtn").getChildByName("redSpotnodenode");
                e.getChildByName("redSpottxt").getComponent(cc.Label).string = heroData.turntableTimes.toString(), e.stopAllActions(), e.scaleX = 1, e.scaleY = 1, e.runAction(cc.sequence(cc.scaleTo(.2, 1.3), cc.scaleTo(.15, .9), cc.scaleTo(.1, 1)))
            },
            update: function(e) {
                if (!0 === this.isInit && (this.updateTimes += 1, this.updateTimes >= 10 && (this.updateTimes = 0, heroData.turntableTimes < gameConfigData.turntableWaitMaxTimes && (0 == heroData.turntableLastTime && (heroData.turntableLastTime = engine.gameTime.getLocalTime(), heroData.saveHeroData()), this.currentTime = engine.gameTime.getLocalTime(), this.remainingTime = this.currentTime - heroData.turntableLastTime, this.remainingTime >= gameConfigData.turntableIntervalTime)))) {
                    var t = parseInt(this.remainingTime / gameConfigData.turntableIntervalTime),
                        i = parseInt(this.remainingTime % gameConfigData.turntableIntervalTime);
                    heroData.turntableTimes = parseInt(heroData.turntableTimes + t), heroData.turntableTimes > gameConfigData.turntableWaitMaxTimes && (heroData.turntableTimes = gameConfigData.turntableWaitMaxTimes), heroData.turntableLastTime = parseInt(this.currentTime - i), this.refreshRedSpot(), this.remainingTime = 0, heroData.saveHeroData()
                }
            },
            addTurntableTimes: function(e) {
                heroData.turntableTimes < gameConfigData.turntableMaxTimes && (e ? heroData.turntableTimesFun(e) : heroData.turntableTimesFun(1)), this.refreshRedSpot()
            },
            minusTurntableTimes: function(e) {
                heroData.turntableTimes > 0 && (e ? heroData.turntableTimesFun(-e) : heroData.turntableTimesFun(-1)), this.refreshRedSpot()
            }
        }), cc._RF.pop()
    }, {}],
    MessageBtn: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "91a30HKH1BIBKHClkTP0tIp", "MessageBtn"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("messagediamondsp").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.node.getChildByName("messagediamondsp").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.getChildByName("messagediamondsp").runAction(cc.sequence(cc.rotateTo(.1, -7), cc.rotateTo(.2, 7), cc.rotateTo(.2, -7), cc.rotateTo(.2, 7), cc.rotateTo(.1, 0), cc.delayTime(1.5)).repeatForever()), this.isInit = !0)
            },
            clickBtnFun: function() {
                var e = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.messagelayer_prefab);
                engine.gameAdapterInfo.addSceneNode(e, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex), e.addComponent("MessageLayer")
            }
        }), cc._RF.pop()
    }, {}],
    MessageLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d6b43WCMW1Fh6DvfHctXqPY", "MessageLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("messagebtn1").off(cc.Node.EventType.TOUCH_END, this.receiveFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.node.getChildByName("messagebtn1").on(cc.Node.EventType.TOUCH_END, this.receiveFun, this))
            },
            receiveFun: function() {
                var e = this;
                this.node.getChildByName("msg_box").getComponent(sp.Skeleton).loop = !1, this.node.getChildByName("msg_box").getComponent(sp.Skeleton).animation = "open", this.node.getChildByName("msg_box").getComponent(sp.Skeleton).setCompleteListener(function() {
                    gameSDK.subscribeBotAsync(function() {
                        getBotData().openSubscribeBot = 1, gameSDK.sendMessengerRobot(function() {}), e.getDiamond()
                    }, function() {
                        getBotData().openSubscribeBot = 0, gameSDK.sendMessengerRobot(function() {}), e.destroyNode()
                    })
                })
            },
            getDiamond: function() {
                var e = this;
                this.node.getChildByName("diamondnode").active = !0, this.node.getChildByName("diamondnode").scaleX = 0, this.node.getChildByName("diamondnode").scaleY = 0, this.node.getChildByName("diamondnode").runAction(cc.sequence(cc.scaleTo(.15, 1, 1), cc.delayTime(1), cc.callFunc(function() {
                    mainSceneContol.gamePlayLayerComponent.addRewardParticle(2);
                    var t = new n;
                    t.loadSaveData([150]), heroData.haveReceiveMessageDiamond = 1, heroData.diamond.addNum(t), heroData.saveHeroData(), e.destroyNode()
                })))
            },
            update: function() {}
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    MoveFishTips: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f4114gJjSxB7JentMO5RpMB", "MoveFishTips"), cc.Class({
            extends: cc.Component,
            properties: {
                moveFishTipsNode: null,
                moveFishTipsLayer: null
            },
            onDestroy: function() {
                this.moveFishTipsNode = null, this.moveFishTipsLayer = null
            },
            destroyNode: function() {
                this.moveFishTipsLayer.off(cc.Node.EventType.TOUCH_START, this.touchBegin.bind(this), this), this.moveFishTipsLayer.off(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this), this), this.moveFishTipsLayer.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this), this), this.node.destroy()
            },
            onLoad: function() {},
            initialize: function() {
                this.addMoveFishTipsFun(), this.moveFishTipsLayer.on(cc.Node.EventType.TOUCH_START, this.touchBegin.bind(this), this), this.moveFishTipsLayer.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this), this), this.moveFishTipsLayer.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this), this), this.moveFishTipsLayer._touchListener.setSwallowTouches(!1), this.openTipsFun()
            },
            touchBegin: function(e) {
                this.closeTipsFun()
            },
            touchEnd: function(e) {
                this.openTipsFun()
            },
            touchCancel: function(e) {},
            addMoveFishTipsFun: function() {
                (null == this.moveFishTipsLayer && (this.moveFishTipsLayer = new cc.Node, engine.gameAdapterInfo.addSceneNode(this.moveFishTipsLayer, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UINovicezIndex), this.moveFishTipsLayer.setContentSize(engineGlobal.gameWidth, engineGlobal.gameHeigh), this.moveFishTipsLayer.name = "moveFishTipsLayer", gameConfigData.boxLowestLayerNum += 1), null == this.moveFishTipsNode) && (this.moveFishTipsNode = new cc.Node, mainSceneContol.mainLayer.addChild(this.moveFishTipsNode), this.moveFishTipsNode.x = 0, this.moveFishTipsNode.y = 0, this.moveFishTipsNode.zIndex = UIzIndexInfo.UIFingerIndex, this.moveFishTipsNode.name = "moveFishTipsNode", this.moveFishTipsNode.fingerNode = null, this.moveFishTipsNode.fishShadow = null, this.moveFishTipsNode.fingerNode = new cc.Node, this.moveFishTipsNode.addChild(this.moveFishTipsNode.fingerNode, 2), this.moveFishTipsNode.fingerNode.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), this.moveFishTipsNode.fingerNode.opacity = 0, this.moveFishTipsNode.fishShadow = new cc.Node, this.moveFishTipsNode.addChild(this.moveFishTipsNode.fishShadow, 1), this.moveFishTipsNode.fishShadow.sp = this.moveFishTipsNode.fishShadow.addComponent(cc.Sprite), this.moveFishTipsNode.fishShadow.sp.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg1"), this.moveFishTipsNode.fishShadow.opacity = 0)
            },
            appointTipsFun: function(e) {
                this.closeTipsFun(), null != this.moveFishTipsNode && this.moveFishTipsFun(e)
            },
            openTipsFun: function() {
                var e = this;
                null != this.moveFishTipsNode && this.moveFishTipsNode.fingerNode.runAction(cc.sequence(cc.delayTime(50), cc.callFunc(function() {
                    var t = e.checkFishFun();
                    1 == t[0] && e.moveFishTipsFun(t)
                })))
            },
            checkFishFun: function() {
                var e = [];
                e[0] = 0;
                for (var t = 0; t < heroData.mainFishList.length; t++) {
                    for (var i = 0; i < heroData.mainFishList[t].length; i++) {
                        var n = heroData.gamePlayData.tileMapLayerData.gridArr[t][i];
                        if (n && 0 == n.state) {
                            e[1] = {
                                x: n.x,
                                y: n.y
                            }, e[2] = gameConfigData.fishConfig[n.fishData.fishID].icon, e[0] = 1;
                            break
                        }
                    }
                    if (1 == e[0]) break
                }
                return e
            },
            moveFishTipsFun: function(e) {
                var t = this;
                null != this.moveFishTipsNode && (null != this.moveFishTipsNode.fingerNode && (this.moveFishTipsNode.fingerNode.opacity = 255, this.moveFishTipsNode.fingerNode.x = e[1].x + 20, this.moveFishTipsNode.fingerNode.y = e[1].y + 20, this.moveFishTipsNode.fingerNode.runAction(cc.sequence(cc.moveTo(2, engineGlobal.gameWidth / 2 + 20, engineGlobal.gameHeigh / 2 + 150 + 20), cc.delayTime(1), cc.callFunc(function() {
                    t.moveFishTipsNode.fingerNode.x = e[1].x + 20, t.moveFishTipsNode.fingerNode.y = e[1].y + 20
                })).repeatForever())), null != this.moveFishTipsNode.fishShadow && (this.moveFishTipsNode.fishShadow.opacity = 80, this.moveFishTipsNode.fishShadow.sp.spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + e[2].toString()), this.moveFishTipsNode.fishShadow.x = e[1].x, this.moveFishTipsNode.fishShadow.y = e[1].y, this.moveFishTipsNode.fishShadow.runAction(cc.sequence(cc.moveTo(2, engineGlobal.gameWidth / 2, engineGlobal.gameHeigh / 2 + 150), cc.delayTime(1), cc.callFunc(function() {
                    t.moveFishTipsNode.fishShadow.x = e[1].x, t.moveFishTipsNode.fishShadow.y = e[1].y
                })).repeatForever())))
            },
            closeTipsFun: function() {
                null != this.moveFishTipsNode && (this.moveFishTipsNode.stopAllActions(), null != this.moveFishTipsNode.fingerNode && (this.moveFishTipsNode.fingerNode.stopAllActions(), this.moveFishTipsNode.fingerNode.opacity && (this.moveFishTipsNode.fingerNode.opacity = 0)), null != this.moveFishTipsNode.fishShadow && (this.moveFishTipsNode.fishShadow.stopAllActions(), this.moveFishTipsNode.fishShadow.opacity && (this.moveFishTipsNode.fishShadow.opacity = 0)))
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    NetworkingMaskLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "079d2Atf8BN/K7aKNw9+CIT", "NetworkingMaskLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                networkingMask: null
            },
            onDestroy: function() {
                this.isInit = null, this.networkingMask = null
            },
            destroyNode: function() {
                this.networkingMask.destroy(), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.networkingMask = engine.gameMemoryManagement.getPrefab(mainBgPrefab.networking_mask_prefab), engine.gameAdapterInfo.addSceneNode(this.networkingMask, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UILoadzIndex), this.networkingMask.name = "networkingMask", this.networkingMask.getChildByName("circlesp").active = !1, this.isInit = !0)
            },
            circleFun: function() {
                this.networkingMask.getChildByName("circlesp").active = !0, this.networkingMask.getChildByName("circlesp").runAction(cc.rotateBy(1, 360).repeatForever())
            },
            closeMaskFun: function() {
                this.networkingMask.getChildByName("circlesp").stopAllActions(), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    NewCategoryLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "aee3bx6/UhMe71MGMLNlvQL", "NewCategoryLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isDestroy: null,
                fishID: null,
                fishX: null,
                fishY: null,
                isTips: null,
                isClick: null
            },
            onDestroy: function() {
                this.isDestroy = !0, this.isInit = null, this.fishID = null, this.fishX = null, this.fishY = null, this.isTips = null, this.isClick = null
            },
            destroyNode: function() {
                if (1 == this.isTips) {
                    gameConfigData.fishConfig[this.fishID].level;
                    if (null != this.fishX) {
                        var e = [];
                        e[0] = 1, e[1] = {
                            x: this.fishX,
                            y: this.fishY
                        }, e[2] = gameConfigData.fishConfig[this.fishID].icon, mainSceneContol.moveFishTips.appointTipsFun(e)
                    }
                }
                this.isDestroy = !0, this.node && (this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("okbtn").off(cc.Node.EventType.TOUCH_END, this.clickOkFun, this), this.node.destroy())
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isDestroy = !1, this.isInit = !0, this.isTips = !0, this.isClick = !0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("okbtn").on(cc.Node.EventType.TOUCH_END, this.clickOkFun, this), this.node.getChildByName("okbtn").getChildByName("arrow").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "arrow"), this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()))
            },
            addPositionFun: function(e, t) {
                this.fishX = e, this.fishY = t
            },
            showFish: function(e, t, i) {
                var n = this;
                n.fishID = t, gameConfigData.fishConfig[t].level < gameConfigData.openFreeLevel && (this.node.getChildByName("okbtn").getChildByName("arrow").active = !1, this.node.getChildByName("okbtn").getChildByName("diamondsbig").active = !1, this.node.getChildByName("okbtn").getChildByName("multiply10").active = !1, this.node.getChildByName("okbtn").getChildByName("okimgsp").active = !0);
                var a = gameConfigData.fishConfig[e],
                    o = new cc.Node;
                o.scaleX = 2, o.scaleY = 2, o.x = -100, o.addComponent(cc.Sprite), o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + a.icon), this.node.addChild(o);
                var s = new cc.Node;
                s.scaleX = 2, s.scaleY = 2, s.x = 100, s.addComponent(cc.Sprite), s.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + a.icon), this.node.addChild(s), o.x = o.x - 400, o.runAction(cc.moveTo(.2, cc.v2(0, 0))), s.x = s.x + 400, s.runAction(cc.sequence(cc.moveTo(.2, cc.v2(0, 0)), cc.callFunc(function() {
                    o.destroy(), s.destroy(), n.addStarsParticle(s.x, s.y);
                    var e = gameConfigData.fishConfig[t],
                        a = new cc.Node;
                    a.scaleX = 2, a.scaleY = 2, a.y = 10;
                    var l = "spine/" + gameConfigData.configureTable.spine + e.icon + "/" + gameConfigData.configureTable.spine + e.icon;
                    if (null != engine.gameMemoryManagement.getSpine(l)) {
                        var r = engine.gameMemoryManagement.getSpine(l),
                            c = a.addComponent(sp.Skeleton);
                        c.skeletonData = r, c.animation = gameConfigData.configureTable.animation, c.timeScale = e.timeScale
                    } else {
                        a.addComponent(cc.Sprite), a.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + e.icon)
                    }
                    if (n.node.addChild(a), i) {
                        var d = gameConfigData.fishConfig[i];
                        mainSceneContol.gamePlayLayerComponent.loadAFish(d.icon, function() {})
                    }
                    mainSceneContol.gamePlayLayerComponent.submitMyScore(), heroData.shopData.refreshLastFishFun(), mainSceneContol.mainDownLayerComponent.refreshGold()
                })))
            },
            addStarsParticle: function(e, t) {
                var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.combineStars_particle_prefab);
                i.x = e, i.y = t, this.node.addChild(i), i.getComponent(cc.ParticleSystem).resetSystem(), this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                    i.destroy()
                })))
            },
            addDiamondFun: function() {
                heroData.newFishShareAddDiamond(), mainSceneContol.gamePlayLayerComponent.addRewardParticle(2), this.destroyNode()
            },
            advGetRewardFun: function() {
                var e = this;
                gameSDK.logEvent("hechengxinyu_share_dianji", 1, {
                    hechengxinyu_share_dianji: "hechengxinyu_share_dianji"
                }), gameSDK.logEvent("combineFishShare", 1, {
                    combineFishShare: "combineFishShare"
                });
                var t = mainSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("hechengxinyu_share_dianji_chenggong", 1, {
                        hechengxinyu_share_dianji_chenggong: "hechengxinyu_share_dianji_chenggong"
                    }), e.addDiamondFun()
                }, function() {
                    gameSDK.logEvent("hechengxinyu_share_dianji_shibai", 1, {
                        hechengxinyu_share_dianji_shibai: "hechengxinyu_share_dianji_shibai"
                    })
                }, t)
            },
            clickOkFun: function() {
                //gameConfigData.fishConfig[this.fishID].level < gameConfigData.openFreeLevel ? this.destroyNode() : this.advGetRewardFun()
                if(gameConfigData.fishConfig[this.fishID].level < gameConfigData.openFreeLevel)
                    this.destroyNode();
                else
                    this.addDiamondFun();

                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    NoviceLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "39431q5STNNfLr7rF2XuFxA", "NoviceLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                cirNum: null,
                finger: null,
                typeStr: null,
                txtNode: null,
                clickSpineNode: null
            },
            onDestroy: function() {
                this.isInit = null, this.cirNum = null, this.finger = null, this.typeStr = null, this.txtNode = null, this.clickSpineNode = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {},
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.cirNum = 60, e && (this.typeStr = e), this.clickSpineNode = new cc.Node, this.clickSpineNode.active = !1, this.clickSpineNode.scaleX = 2, this.clickSpineNode.scaleY = 2, this.node.addChild(this.clickSpineNode), this.clickSpineSkeleton = this.clickSpineNode.addComponent(sp.Skeleton);
                    var t = engine.gameMemoryManagement.getSpine(mustSpine.click_spine);
                    this.clickSpineSkeleton.skeletonData = t, this.clickSpineSkeleton.loop = !1, this.clickSpineSkeleton.timeScale = .4, this.finger = new cc.Node, this.node.addChild(this.finger), this.finger.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "fingerimg"), this.finger.opacity = 0, this.finger.scaleX = 1.2, this.finger.scaleY = 1.2, this.txtNode = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang2_prefab), this.node.addChild(this.txtNode), this.txtNode.opacity = 0, this.isInit = !0
                }
            },
            resetFinger: function(e, t) {
                var i = this;
                this.finger.stopAllActions(), this.finger.opacity = 0, this.clickSpineNode.active = !0, this.finger.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    i.finger.opacity = 255, i.finger.x = e, i.finger.y = t, i.finger.runAction(cc.sequence(cc.callFunc(function() {
                        i.clickSpineNode.x = e - 20, i.clickSpineNode.y = t - 20, i.clickSpineSkeleton.animation = "click"
                    }), cc.spawn(cc.moveBy(.8, 20, 20), cc.scaleTo(.8, 1.5, 1.5)), cc.spawn(cc.moveBy(.8, -20, -20), cc.scaleTo(.8, 1.2, 1.2))).repeatForever())
                })))
            },
            resetLayer: function(e, t, i) {
                if (1 == this.node.active) {
                    var n = this.node.getChildByName("masktop"),
                        a = this.node.getChildByName("maskbottom"),
                        o = this.node.getChildByName("maskleft"),
                        s = this.node.getChildByName("maskright"),
                        l = engineGlobal.gameWidth / 2,
                        r = engineGlobal.gameHeigh / 2,
                        c = (r - t - this.cirNum) / 2;
                    n.x = 0, n.y = r, n.width = 2 * l, n.height = 2 * c;
                    var d = engineGlobal.gameWidth / 2,
                        h = -engineGlobal.gameHeigh / 2,
                        g = (t - h - this.cirNum) / 2;
                    a.x = 0, a.y = h, a.width = 2 * d, a.height = 2 * g;
                    var u = -engineGlobal.gameWidth / 2,
                        m = t - this.cirNum,
                        f = (e - u - this.cirNum) / 2,
                        p = t - m;
                    o.x = u, o.y = m, o.width = 2 * f, o.height = 2 * p;
                    var y = engineGlobal.gameWidth / 2,
                        C = m,
                        v = (y - e - this.cirNum) / 2,
                        D = p;
                    s.x = y, s.y = C, s.width = 2 * v, s.height = 2 * D, this.resetFinger(e + 20, t + 20), this.txtNode.opacity = 255;
                    var b = e,
                        N = t + 130;
                    e > 200 ? b = 200 : e < -200 && (b = -200), t > 500 && (N = t - 90), this.txtNode.x = b, this.txtNode.y = N, this.txtNode.getChildByName("noticetxt").getComponent(cc.Label).string = i
                }
            },
            hideLayer: function() {
                this.finger.opacity = 0, this.txtNode.opacity = 0, this.clickSpineNode.active = !1
            },
            update: function() {}
        }), cc._RF.pop()
    }, {}],
    NumCalculate: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d5c56V/TQJAoamg2FFOJQtn", "NumCalculate");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = cc.Class({
                properties: {
                    numArr: null
                },
                ctor: function() {
                    this.initialize()
                },
                onDestroy: function() {
                    this.isInit = null
                },
                initialize: function() {
                    1 != this.isInit && (this.isInit = !0)
                },
                comparisonSize: function(e) {
                    var t = this.numArr,
                        i = e.numArr,
                        n = t.length,
                        a = i.length;
                    if (n > a) return !0;
                    if (n !== a) return !1;
                    for (var o = n - 1; o > -1; o--) {
                        if (t[o] > i[o]) return !0;
                        if (t[o] != i[o]) return !1;
                        if (0 === o) return !0
                    }
                    return !0
                },
                addNum: function(e) {
                    if (e) {
                        for (var t = this.numArr, i = e.numArr, n = t.length, a = i.length, o = (Math.min(n, a), 0); o < a; o++) void 0 == t[o] ? t.push(i[o]) : t[o] += i[o];
                        return this.carryOp(), this
                    }
                },
                subNum: function(e) {
                    if (e) {
                        var t = this.numArr,
                            i = e.numArr,
                            n = t.length,
                            a = i.length;
                        if (!this.comparisonSize(e)) return !1;
                        for (var o = 0; o < a; o++)
                            if (t[o] >= i[o]) t[o] = t[o] - i[o];
                            else {
                                t[o] = t[o] + 1e3 - i[o];
                                for (var s = o + 1; s < n; s++) {
                                    if (0 !== t[s]) {
                                        t[s] -= 1;
                                        break
                                    }
                                    t[s] = 999
                                }
                            } return this.deleteZero(), !0
                    }
                },
                multiplicationNum: function(e) {
                    for (var t = this.numArr, i = e.numArr[0], n = 0; n < t.length; n++) t[n] = t[n] * i;
                    for (var a = 0; a < t.length; a++) t[a] >= 1e3 && (void 0 == t[a + 1] ? t.push(parseInt(t[a] / 1e3)) : t[a + 1] += parseInt(t[a] / 1e3), t[a] = parseInt(t[a] % 1e3));
                    return this.backOp(), this
                },
                carryOp: function() {
                    for (var e = this.numArr, t = 0; t < e.length; t++) e[t] >= 1e3 && (void 0 == e[t + 1] ? e.push(parseInt(e[t] / 1e3)) : e[t + 1] += parseInt(e[t] / 1e3), e[t] = parseInt(e[t] % 1e3));
                    this.deleteZero()
                },
                deleteZero: function() {
                    var e = this.numArr;
                    if (e.length > 1)
                        for (var t = e.length - 1; t > 0 && 0 == e[t]; t--) e.splice(t, 1)
                },
                backOp: function() {
                    for (var e = this.numArr, t = e.length - 1; t > -1; t--) {
                        if (-1 === e[t].toString().indexOf("."));
                        else {
                            var i = e[t].toString().split("."),
                                n = parseInt(i[0]),
                                a = "0." + i[1],
                                o = 1e3 * parseFloat(a);
                            e[t] = n, t - 1 >= 0 && (e[t - 1] += o)
                        }
                    }
                    this.carryOp()
                },
                getNumText: function(e) {
                    for (var t = this.numArr, i = ["K", "M", "B", "T"], n = t.length, a = [""], o = 0; o < n - 1; o++) {
                        for (var s = parseInt(o / 4), l = parseInt(o % 4), r = "", c = 0; c < s; c++) r += "T";
                        a.push(i[l] + r)
                    }
                    var d = t[n - 1],
                        h = t[n - 2];
                    return void 0 == h ? (h = "", 2 == e ? d = d.toFixed(2) : 1 == e && (d = d.toFixed(1))) : h = 2 == e ? (h / 1e3).toFixed(3).slice(0, -1).substring(1) : 1 == e ? (h / 1e3).toFixed(2).slice(0, -1).substring(1) : 0 == e ? "" : h < 10 ? "" : (h / 1e3).toFixed(3).slice(0, -1).substring(1), d + h + a[n - 1]
                },
                convertToFaceBookRankData: function() {
                    for (var e = this.getNumText(2), t = 0, i = 0; i < e.length; i++) "K" == e[i] ? t += 3 : "M" == e[i] ? t += 6 : "B" == e[i] ? t += 9 : "T" == e[i] && (t += 12);
                    if ((e = e.replace(/[a-zA-Z]/g, "")).length < 6)
                        for (var n = 6 - e.length, a = 0; a < n; a++) e = "0" + e;
                    return e = e.replace(".", ""), parseInt(t + e)
                },
                convertFBNumToString: function(e) {
                    var t, i = e.toString();
                    if (i.length >= 6) {
                        var n = parseInt(i.substring(0, i.length - 5));
                        t = i.substring(i.length - 5), t = parseInt(t).toString();
                        for (var a = 0; a < n; a++) a > 1 && (t += "0")
                    } else t = i.substring(0, i.length - 2), t = parseInt(t).toString();
                    var o = [];
                    for (a = 0; a < Math.ceil(t.length / 3); a++) {
                        var s = t.substring(t.length - 3 * (a + 1), t.length - 3 * a);
                        o.push(parseInt(s))
                    }
                    return this.loadSaveData(o), this.getNumText()
                },
                copyNumCalculate: function(e) {
                    var t, i = new a,
                        o = e.numArr,
                        s = o.constructor === Array ? [] : {};
                    if ("object" === (void 0 === o ? "undefined" : n(o))) {
                        if (window.JSON) t = JSON.stringify(o), cc.log(t), s = JSON.parse(t);
                        else
                            for (var l in o) s[l] = "object" === n(o[l]) ? cloneObj(o[l]) : o[l];
                        return i.numArr = s, i
                    }
                },
                getSaveData: function() {
                    return this.numArr
                },
                loadSaveData: function(e) {
                    var t, i = e,
                        a = i.constructor === Array ? [] : {};
                    if ("object" === (void 0 === i ? "undefined" : n(i))) {
                        if (window.JSON) t = JSON.stringify(i), a = JSON.parse(t);
                        else
                            for (var o in i) a[o] = "object" === n(i[o]) ? cloneObj(i[o]) : i[o];
                        this.numArr = a
                    }
                }
            });
        cc._RF.pop()
    }, {}],
    OfflineLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "063fcLukNtOe4TmRZ2JRnU4", "OfflineLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                getGoldNum: null
            },
            onDestroy: function() {
                this.isInit = null, this.getGoldNum = null
            },
            destroyNode: function() {
                null != mainSceneContol.leaveLayer && (mainSceneContol.leaveLayer = null), this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").off(cc.Node.EventType.TOUCH_END, this.clickSharebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this);
                    this.node.getChildByName("sharedoublebtn").on(cc.Node.EventType.TOUCH_END, this.clickSharebtnFun, this);
                    var e = parseInt((engine.gameTime.getLocalTime() - heroData.lastCloseGameTime) / 1e3),
                        t = new n;
                    t.loadSaveData([e]);
                    this.getGoldNum = heroData.gamePlayData.offLineAdd();
                    this.getGoldNum.multiplicationNum(t);
                    this.node.getChildByName("getnumart").getComponent("GameArtWord").setString("+" + this.getGoldNum.getNumText());
                    this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").active = !1;
                    this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg");
                    this.node.getChildByName("sharedoublebtn").getChildByName("btning").x += 20;
                    this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever());
                    this.isInit = !0;
                }
            },
            lastGoldNumFun: function() {
                var e = parseInt((engine.gameTime.getLocalTime() - heroData.lastCloseGameTime) / 1e3),
                    t = new n;
                t.loadSaveData([e]);
                var i = heroData.gamePlayData.offLineAdd();
                i.multiplicationNum(t), this.getGoldNum.addNum(i), this.node.getChildByName("getnumart").getComponent("GameArtWord").setString("+" + this.getGoldNum.getNumText())
            },
            addSingleGold: function() {
                heroData.gamePlayData.addedGold(this.getGoldNum), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1)
            },
            addDoubleGold: function() {
                var e = new n;
                e.loadSaveData(this.getGoldNum.getSaveData());
                var t = new n;
                t.loadSaveData([2]), e.multiplicationNum(t), heroData.gamePlayData.addedGold(e), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1), this.destroyNode()
            },
            advOfflineFun: function() {
                var e = this;
                gameSDK.logEvent("offLineDouble", 1, {
                    offLineDouble: "offLineDouble"
                }), 1 == cc.sys.isMobile ? gameSDK.showRewardVideoAd(advCode1, function() {
                    e.addDoubleGold()
                }) : gameSDK.newCreateInterstitialAd(advCode9, function() {
                    e.addDoubleGold()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })
            },
            clickSharebtnFun: function() {
                this.advOfflineFun();

                //gdsdk
                if (typeof gdsdk !== 'undefined' && gdsdk.showBanner !== 'undefined') {
                    gdsdk.showBanner();
                }
            },
            clickClosebtnFun: function() {
                this.addSingleGold(), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    PromptBoxLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "272efOq6edIsL4wAyMeA5k1", "PromptBoxLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                tishikuang3: null
            },
            onDestroy: function() {
                this.isInit = null, this.tishikuang3 = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    var t = this;
                    if (e && 1 == e) this.tishikuang3 = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang3_prefab), engine.gameAdapterInfo.addSceneNode(this.tishikuang3, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UILoadzIndex), this.tishikuang3.scaleX = 0, this.tishikuang3.scaleY = 0, this.tishikuang3.getChildByName("scaleimg1sp").getChildByName("btnimg10btn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.tishikuang3.runAction(cc.sequence(cc.scaleTo(.2, 1.05, 1.05), cc.scaleTo(.12, .98, .98), cc.scaleTo(.12, 1, 1)));
                    else {
                        var i = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang_prefab);
                        engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UILoadzIndex), i.scaleX = 0, i.scaleY = 0, e && 2 == e ? i.getChildByName("noticetxt").getComponent(cc.Label).string = "Action failed" : e && 3 == e && (i.getChildByName("noticetxt").getComponent(cc.Label).string = "Ad acquisition is unsuccessful"), i.runAction(cc.sequence(cc.scaleTo(.2, 1.05, 1.05), cc.scaleTo(.12, .98, .98), cc.scaleTo(.12, 1, 1), cc.delayTime(2), cc.scaleTo(.12, 0, 0), cc.callFunc(function() {
                            i.stopAllActions(), i.destroy(), t.destroyNode()
                        })))
                    }
                    this.isInit = !0
                }
            },
            clickClosebtnFun: function() {
                this.tishikuang3.stopAllActions(), this.tishikuang3.getChildByName("scaleimg1sp").getChildByName("btnimg10btn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.tishikuang3.destroy(), this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    RankItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "99161Y5UTdHRI5Lg6j3BcLm", "RankItem");
        var n = e("GameExternalImage"),
            a = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: !1,
                itemData: null
            },
            onDestroy: function() {
                this.isInit = null, this.itemData = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            initialize: function(e) {
                1 != this.isInit && (this.itemData = e, this.initUI(), this.isInit = !0)
            },
            initUI: function() {
                var e = new n;
                e.loadImage(this.itemData.photo, null, 61, 61), this.node.getChildByName("rankbgimgsp").getChildByName("rectangle").addChild(e), this.node.getChildByName("rankbgimgsp").getChildByName("playernametxt").getComponent(cc.Label).string = this.itemData.name;
                var t = (new a).convertFBNumToString(this.itemData.score);
                this.node.getChildByName("rankbgimgsp").getChildByName("goldbottom1").getChildByName("usedgoldart").getComponent("GameArtWord").setString(t), this.itemData.rank > 3 ? this.node.getChildByName("rankbgimgsp").getChildByName("rankcountart1").getComponent("GameArtWord").setString(this.itemData.rank.toString()) : this.node.getChildByName("rankbgimgsp").getChildByName("rankcountart1").active = !1
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    RankLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "31b58e8t2BCLYt7+xFZig4A", "RankLayer");
        var n = e("GameExternalImage"),
            a = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                scrollViewContent: null,
                nodeScrollView: null,
                itemScrollDataList: null,
                lastScrollViewContentY: null,
                myRankItem: null
            },
            onDestroy: function() {
                this.isInit = null, this.scrollViewContent = null, this.nodeScrollView = null, this.itemScrollDataList = null, this.lastScrollViewContentY = null, this.myRankItem = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").off(cc.Node.EventType.TOUCH_END, this.shareFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").on(cc.Node.EventType.TOUCH_END, this.shareFun, this), this.nodeScrollView = this.node.getChildByName("rankscv").getComponent(cc.ScrollView), this.scrollViewContent = this.nodeScrollView.content;
                    var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.rank_item_prefab);
                    this.myRankItem = e;
                    e.addComponent("RankItem");
                    this.node.addChild(e), e.x = 0, e.y = -230, e.getChildByName("rankbgimgsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.rankp_plist, "banner2"), e.getChildByName("rankbgimgsp").getChildByName("goldbottom1").active = !1, e.getChildByName("rankbgimgsp").getChildByName("goldbottom2").active = !0, e.getChildByName("rankbgimgsp").getChildByName("rankcountart1").active = !1, e.getChildByName("rankbgimgsp").getChildByName("rankcountart2").active = !0
                }
            },
            shareFun: function() {
                gameSDK.logEvent("rank_share_dianji", 1, {
                    rank_share_dianji: "rank_share_dianji"
                });
                var e = mainBgSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    gameSDK.logEvent("rank_share_dianji_chenggong", 1, {
                        rank_share_dianji_chenggong: "rank_share_dianji_chenggong"
                    })
                }, function() {
                    gameSDK.logEvent("rank_share_dianji_shibai", 1, {
                        rank_share_dianji_shibai: "rank_share_dianji_shibai"
                    })
                }, e)
            },
            initData: function(e, t) {
                this.itemScrollDataList = [];
                for (var i = 0; i < e.length; i++) this.itemScrollDataList[i] = {}, this.itemScrollDataList[i].itemData = e[i], this.itemScrollDataList[i].y = -108 * i;
                if (this.scrollViewContent.height = 108 * e.length, t) {
                    var o = new n;
                    o.loadImage(t.photo, null, 61, 61), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("rectangle").addChild(o), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("playernametxt").getComponent(cc.Label).string = t.name;
                    var s = (new a).convertFBNumToString(t.score);
                    this.myRankItem.getChildByName("rankbgimgsp").getChildByName("goldbottom2").getChildByName("usedgoldart").getComponent("GameArtWord").setString(s), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("rankcountart2").getComponent("GameArtWord").setString(t.rank.toString())
                }
            },
            update: function() {
                if (this.scrollViewContent.y != this.lastScrollViewContentY) {
                    this.lastScrollViewContentY = this.scrollViewContent.y;
                    for (var e = 0; e < this.itemScrollDataList.length; e++) {
                        var t = this.itemScrollDataList[e],
                            i = t.y + this.scrollViewContent.y;
                        if (i <= 500 && i >= -350) {
                            if (!t.rankItem) {
                                var n = engine.gameMemoryManagement.getPrefab(mainBgPrefab.rank_item_prefab);
                                t.rankItem = n;
                                var a = n.addComponent("RankItem");
                                this.scrollViewContent.addChild(n), n.x = 0, n.y = t.y - 60, a.shopLayer = this, a.initialize(t.itemData), e < 3 && (n.getChildByName("rankbgimgsp").getChildByName("rankIconsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.rankp_plist, "rank" + (e + 1)))
                            }
                            t.rankItem.active = !0
                        } else t.rankItem && (t.rankItem.active = !1)
                    }
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    RecoveryLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "02aaabii0BPRa2O+4tXq8em", "RecoveryLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0)
            },
            updateCanState: function(e) {
                (null == heroData.noviceGuidance || heroData.noviceGuidance >= gameConfigData.noviceMaxTimes) && (this.node.getChildByName("recoveryimgsp").color = cc.color(50, 255, 50))
            },
            updateCanNotState: function() {
                this.node.getChildByName("recoveryimgsp").color = cc.color(255, 255, 255)
            }
        }), cc._RF.pop()
    }, {}],
    Resource: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "1345d3vFI5GUaCOilS4XCeg", "Resource"), window.mainBgLoadImage = {
            mainimgp_plist: "img/mainimg/mainimgp",
            fishimgp_plist: "img/fishimg/fishimgp",
            rankp_plist: "img/rank/rankp"
        }, window.mainBgPrefab = {
            collect_layer_prefab: "prefab/main/collect_layer_prefab",
            mainbg_prefab: "prefab/main/mainbg_prefab",
            setup2_prefab: "prefab/main/setup2_prefab",
            help_prefab: "prefab/main/help_prefab",
            rank_prefab: "prefab/main/rank_prefab",
            rank_item_prefab: "prefab/main/rank_item_prefab",
            networking_mask_prefab: "prefab/main/networking_mask_prefab",
            networking_load_prefab: "prefab/main/networking_load_prefab",
            tishikuang_prefab: "prefab/main/tishikuang_prefab",
            tishikuang2_prefab: "prefab/main/tishikuang2_prefab",
            tishikuang3_prefab: "prefab/main/tishikuang3_prefab",
            tishikuang4_prefab: "prefab/main/tishikuang4_prefab",
            moregame_prefab: "prefab/main/moregame_prefab",
            messagelayer_prefab: "prefab/main/messagelayer_prefab",
            tooltip_layer_prefab: "prefab/main/tooltip_layer_prefab"
        }, window.dataJson = {
            language_json: "language"
        }, window.mustLoadImage = {
            mastloadimg01_plist: "img/mastloadimg/mastloadimg1p",
            mastloadimg02_plist: "img/mastloadimg/mastloadimg2p",
            mastloadimg03_plist: "img/mastloadimg/mastloadimg3p",
            publicimg01_plist: "img/publicimg/publicimgp",
            scaleimg01_plist: "img/scaleimg/scaleimgp",
            englishimgp_plist: "language/english/img/englishimgp",
            turntablep_plist: "img/turntable/turntablep",
            rankp_plist: "img/rank/rankp",
            fishingimg1p_plist: "img/fishingimg/fishingimg1p",
            fishingimg2p_plist: "img/fishingimg/fishingimg2p",
            fishingimg3p_plist: "img/fishingimg/fishingimg3p",
            messagep_plist: "img/message/messagep"
        }, window.mustLoadPrefab = {
            addgoldprogress_prefab: "prefab/main/addgoldprogress_prefab",
            achievement_prefab: "prefab/main/achievement_layer_prefab",
            achievement_item_prefab: "prefab/main/achievement_item_prefab",
            invitation_prefab: "prefab/main/invitation_prefab",
            invitation_item_prefab: "prefab/main/invitation_item_prefab",
            combineStars_particle_prefab: "prefab/particle/combineStars_particle_prefab",
            deleteFish_particle_prefab: "prefab/particle/deleteFish_particle_prefab",
            fish_variation_prefab: "prefab/main/fish_variation_prefab",
            fish_shadow_prefab: "prefab/main/fish_shadow_prefab",
            fish_addGold_prefab: "prefab/main/fish_addGold_prefab",
            fishing_prefab: "prefab/main/fishing_prefab",
            gold_particle_prefab: "prefab/particle/gold_particle_prefab",
            help_gold_box_prefab: "prefab/main/help_gold_box_prefab",
            main_down_prefab: "prefab/main/main_down_prefab",
            main_back_prefab: "prefab/main/main_back_prefab",
            main_right_prefab: "prefab/main/main_right_prefab",
            main_turntable_prefab: "prefab/main/main_turntable_prefab",
            main_invitation_prefab: "prefab/main/main_invitation_prefab",
            main_task_prefab: "prefab/main/main_task_prefab",
            new_category_prefab: "prefab/main/new_category_prefab",
            novice_layer_prefab: "prefab/main/novice_layer_prefab",
            popcommon_prefab: "prefab/main/popcommon_prefab",
            recoveryimg_prefab: "prefab/main/recoveryimg_prefab",
            shop_item_prefab: "prefab/main/shop_item_prefab",
            shop_prefab: "prefab/main/shop_prefab",
            speed_up_prefab: "prefab/main/speed_up_prefab",
            turntable_prefab: "prefab/main/turntable_prefab",
            treasureBox_prefab: "prefab/main/treasureBox_prefab",
            unlock_levelup_prefab: "prefab/main/unlock_levelup_prefab",
            unlock_levelup_item_prefab: "prefab/main/unlock_levelup_item_prefab",
            addgold_particle_prefab: "prefab/particle/addgold_particle_prefab",
            fishing_upui_prefab: "prefab/main/fishing_upui_prefab",
            turntable_revenge_prefab: "prefab/main/turntable_revenge_prefab",
            turntable_revenge_item_prefab: "prefab/main/turntable_revenge_item_prefab",
            fishing_shell_prefab: "prefab/main/fishing_shell_prefab",
            fishing_guess_prefab: "prefab/main/fishing_guess_prefab",
            turntable_guess_end_prefab: "prefab/main/turntable_guess_end_prefab",
            turntable_guess_end2_prefab: "prefab/main/turntable_guess_end2_prefab",
            turntable_revengeend_prefab: "prefab/main/turntable_revengeend_prefab",
            fishing_guess_upui_prefab: "prefab/main/fishing_guess_upui_prefab",
            main_transformation_prefab: "prefab/main/main_transformation_prefab",
            main_evolution_prefab: "prefab/main/main_evolution_prefab",
            transformation_ok_tips_prefab: "prefab/main/transformation_ok_tips_prefab",
            transformation_sale_tips_prefab: "prefab/main/transformation_sale_tips_prefab",
            transformation_medal_prefab: "prefab/main/transformation_medal_prefab",
            evolution_prefab: "prefab/main/evolution_prefab",
            evolution_build_tips_prefab: "prefab/main/evolution_build_tips_prefab",
            evolution_complete_tips_prefab: "prefab/main/evolution_complete_tips_prefab",
            evolution_not_tips_prefab: "prefab/main/evolution_not_tips_prefab",
            transformation_prefab: "prefab/main/transformation_prefab",
            transformation_item_prefab: "prefab/main/transformation_item_prefab"
        }, window.curBackgroundPrefab = "prefab/main/background1_prefab", window.backgroundPrefab = {
            background1_prefab: "prefab/main/background1_prefab",
            background2_prefab: "prefab/main/background2_prefab",
            background3_prefab: "prefab/main/background3_prefab"
        }, window.mustSpine = {
            click_spine: "spine/click/click",
            colouredribbon_spine: "spine/colouredribbon/colouredribbon",
            accelerate_spine: "spine/accelerate/accelerate"
        }, window.soundurl = {
            backGroundSound: "sound/backGroundSound",
            buyFishSound: "sound/buyFishSound",
            combineFishSound: "sound/combineFishSound",
            paopaoSound: "sound/paopaoSound"
        }, window.particleAsset = {
            stars_particle_asset: "particle/stars/stars",
            bubble_particle_asset: "particle/bubble/bubble",
            gold_particle_asset: "particle/gold/gold",
            diamond1_particle_asset: "particle/diamond1/diamond1"
        }, window.initRes = function() {
            for (var e in dataJson) dataJson[e] = "language/" + engineGlobal.gamelanguage + "/data/" + dataJson[e]
        }, window.mainBgRes = function() {
            var e = [];
            for (var t in mainBgLoadImage) e.push({
                url: mainBgLoadImage[t],
                restype: LoadStyleType.spriteAtlas
            });
            for (var i in mustLoadImage) e.push({
                url: mustLoadImage[i],
                restype: LoadStyleType.spriteAtlas
            });
            for (var n in mainBgPrefab) e.push({
                url: mainBgPrefab[n],
                restype: LoadStyleType.prefab
            });
            return e
        }, window.gameRes = function() {
            var e = [];
            for (var t in dataJson) e.push({
                url: dataJson[t],
                restype: LoadStyleType.json
            });
            for (var i in mustLoadPrefab) e.push({
                url: mustLoadPrefab[i],
                restype: LoadStyleType.prefab
            });
            e.push({
                url: curBackgroundPrefab,
                restype: LoadStyleType.prefab
            });
            var n = heroData.shopData.lastFishID();
            heroData.shopData.refreshLastFishFun();
            var a = gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].nextFishID;
            a && n.push(a.toString());
            for (var o = 0; o < n.length; o++) {
                var s = gameConfigData.fishConfig[n[o]].icon;
                mustSpine[gameConfigData.configureTable.spine + "_spine" + s] = "spine/" + gameConfigData.configureTable.spine + s + "/" + gameConfigData.configureTable.spine + s
            }
            for (var l = 0; l < heroData.mainFishList.length; l++)
                for (var r = 0; r < heroData.mainFishList[l].length; r++) {
                    var c = heroData.mainFishList[l][r];
                    if (c && 1 == c.state) {
                        var d = c.fishID;
                        s = gameConfigData.fishConfig[d].icon;
                        mustSpine[gameConfigData.configureTable.spine + "_spine" + s] = "spine/" + gameConfigData.configureTable.spine + s + "/" + gameConfigData.configureTable.spine + s
                    }
                }
            for (var h in mustSpine) e.push({
                url: mustSpine[h],
                restype: LoadStyleType.spine
            });
            for (var g in particleAsset) e.push({
                url: particleAsset[g],
                restype: LoadStyleType.particleAsset
            });
            return e
        }, window.mustGameRes = function() {
            return []
        }, cc._RF.pop()
    }, {}],
    RevengeLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a80b5YI+v9M6bGLQSKq1wFO", "RevengeLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                scrollViewContent: null,
                nodeScrollView: null,
                itemScrollDataList: null,
                lastScrollViewContentY: null,
                myRankItem: null
            },
            onDestroy: function() {
                this.isInit = null, this.scrollViewContent = null, this.nodeScrollView = null, this.itemScrollDataList = null, this.lastScrollViewContentY = null, this.myRankItem = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").off(cc.Node.EventType.TOUCH_END, this.shareFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("btnimg1btn").on(cc.Node.EventType.TOUCH_END, this.shareFun, this), this.nodeScrollView = this.node.getChildByName("rankscv").getComponent(cc.ScrollView), this.scrollViewContent = this.nodeScrollView.content;
                    var e = engine.gameMemoryManagement.getPrefab(mainBgPrefab.rank_item_prefab);
                    this.myRankItem = e;
                    e.addComponent("RankItem");
                    this.node.addChild(e), e.x = 0, e.y = -230, e.getChildByName("rankbgimgsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.rankp_plist, "banner2"), e.getChildByName("rankbgimgsp").getChildByName("goldbottom1").active = !1, e.getChildByName("rankbgimgsp").getChildByName("goldbottom2").active = !0, e.getChildByName("rankbgimgsp").getChildByName("rankcountart1").active = !1, e.getChildByName("rankbgimgsp").getChildByName("rankcountart2").active = !0
                }
            },
            shareFun: function() {
                var e = this.getShareData();
                gameSDK.sendFaceBookFriend(null, function() {}, e)
            },
            getShareData: function() {
                var e = new Object;
                return e.pngData = [{
                    url: gameSDK.sdkPlayInfo.photo,
                    posX: 79,
                    posY: 90,
                    imgWidth: 163,
                    imgHeight: 163
                }, {
                    url: cc.url.raw("resources/invbg.png"),
                    posX: 0,
                    posY: 0,
                    imgWidth: 750,
                    imgHeight: 380
                }], e.width = 750, e.height = 380, e
            },
            initData: function(e, t) {
                this.itemScrollDataList = [];
                for (var i = 0; i < e.length; i++) this.itemScrollDataList[i] = {}, this.itemScrollDataList[i].itemData = e[i], this.itemScrollDataList[i].y = -108 * i;
                if (this.scrollViewContent.height = 108 * e.length, t) {
                    var n = new GameExternalImage;
                    n.loadImage(t.photo, null, 61, 61), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("rectangle").addChild(n), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("playernametxt").getComponent(cc.Label).string = t.name;
                    var a = (new NumCalculate).convertFBNumToString(t.score);
                    this.myRankItem.getChildByName("rankbgimgsp").getChildByName("goldbottom2").getChildByName("usedgoldart").getComponent("GameArtWord").setString(a), this.myRankItem.getChildByName("rankbgimgsp").getChildByName("rankcountart2").getComponent("GameArtWord").setString(t.rank.toString())
                }
            },
            update: function() {
                if (this.scrollViewContent.y != this.lastScrollViewContentY) {
                    this.lastScrollViewContentY = this.scrollViewContent.y;
                    for (var e = 0; e < this.itemScrollDataList.length; e++) {
                        var t = this.itemScrollDataList[e],
                            i = t.y + this.scrollViewContent.y;
                        if (i <= 500 && i >= -350) {
                            if (!t.rankItem) {
                                var n = engine.gameMemoryManagement.getPrefab(mainBgPrefab.rank_item_prefab);
                                t.rankItem = n;
                                var a = n.addComponent("RankItem");
                                this.scrollViewContent.addChild(n), n.x = 0, n.y = t.y - 60, a.shopLayer = this, a.initialize(t.itemData), e < 3 && (n.getChildByName("rankbgimgsp").getChildByName("rankIconsp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.rankp_plist, "rank" + (e + 1)))
                            }
                            t.rankItem.active = !0
                        } else t.rankItem && (t.rankItem.active = !1)
                    }
                }
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    ShopData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a994dkYar5LDrxbpKkq2yQ3", "ShopData");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = e("NumCalculate");
        cc.Class({
            properties: {
                fishPriceObj: null,
                shopDiamondArr: null,
                lastBuyFishID: null
            },
            onDestroy: function() {
                this.fishPriceObj = null, this.shopDiamondArr = null, this.lastBuyFishID = null
            },
            initialize: function() {
                for (var e in this.fishPriceObj = {}, heroData.shopFishPriceList) {
                    var t = heroData.shopFishPriceList[e];
                    this.addFishPriceFun(t)
                }
                this.shopDiamondArr = [], this.lastBuyFishID = "1001"
            },
            addFishPriceFun: function(e) {
                var t = gameConfigData.fishConfig[e.fishID],
                    i = new a;
                i.loadSaveData(t.gold);
                for (var n = 0; n < e.count; n++) {
                    var o = new a;
                    o.loadSaveData([1 + t.priceAdd]), i.multiplicationNum(o)
                }
                this.fishPriceObj[e.fishID] = i
            },
            buyFish: function(e, t) {
                for (var i = 0; i < heroData.mainFishList.length; i++)
                    for (var n = 0; n < heroData.mainFishList[i].length; n++) {
                        if (!(r = heroData.mainFishList[i][n])) {
                            var o;
                            if (1 == t)(o = heroData.gamePlayData.subGold(this.fishPriceObj[e])) && this.updateShopBuyData(e);
                            else {
                                var s = gameConfigData.fishConfig[e].diamond,
                                    l = new a;
                                l.loadSaveData(s), (o = heroData.gamePlayData.subDiamond(l)) && this.updateShopBuyData(e)
                            }
                            if (!1 !== o) {
                                if (1 == mainSceneContol.isGetVariation(e, gameConfigData.variationTypeEm.shopBuy)) {
                                    mainSceneContol.getVariationChange(e, function(e) {
                                        var t = heroData.gamePlayData.addFish(i, n, e);
                                        mainSceneContol.gamePlayLayerComponent.addFishAnimate(t, !0)
                                    })
                                } else {
                                    var r = heroData.gamePlayData.addFish(i, n, e);
                                    mainSceneContol.gamePlayLayerComponent.addFishAnimate(r, !1)
                                }
                                1 == t && this.updateShopPrice(e)
                            } else if (1 == t)
                                if (heroData.shopData.refreshLastFishFun(), gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level < gameConfigData.openFreeLevel) {
                                    var c = engine.gameData.dataDic.language;
                                    mainSceneContol.gamePlayLayerComponent.popNotice(c[1004].content, engine.gameAdapterInfo.getPercentageY(.85))
                                } else{
                                    //this.addFreeGoldFun(2);
                                    var c = engine.gameData.dataDic.language;
                                    mainSceneContol.gamePlayLayerComponent.popNotice(c[1004].content, engine.gameAdapterInfo.getPercentageY(.85))
                                }
                            else mainSceneContol.mainTaskLayerComponent.clickOpenAchievementFun();
                            return o
                        }
                    }
                c = engine.gameData.dataDic.language;
                return mainSceneContol.gamePlayLayerComponent.popNotice(c[1003].content, engine.gameAdapterInfo.getPercentageY(.85)), !1
            },
            refreshLastFishFun: function() {
                for (var e in heroData.shopFishPriceList) heroData.shopFishPriceList[e].unlockCount > 0 && parseInt(heroData.shopData.lastBuyFishID) < parseInt(heroData.shopFishPriceList[e].fishID) && (heroData.shopData.lastBuyFishID = heroData.shopFishPriceList[e].fishID)
            },
            addFreeGoldFun: function(e) {
                this.refreshLastFishFun();
                var t = [0, 2];
                e && 2 == e ? (gameConfigData.fishConfig[this.lastBuyFishID].paFreeGold && (t = gameConfigData.fishConfig[this.lastBuyFishID].paFreeGold), gameSDK.logEvent("freeGoldPopup", 1, {
                    freeGoldPopup: "freeGoldPopup"
                })) : (gameConfigData.fishConfig[this.lastBuyFishID].freeGold && (t = gameConfigData.fishConfig[this.lastBuyFishID].freeGold), gameSDK.logEvent("freeGoldGiftClick", 1, {
                    freeGoldGiftClick: "freeGoldGiftClick"
                }));
                var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.popcommon_prefab);
                engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                var n = i.addComponent("FreegoldLayer");
                n.freeGoldNum = t, n.initialize(e)
            },
            checkPrice: function(e) {
                var t = new a,
                    i = function(e) {
                        var t, i = e.constructor === Array ? [] : {};
                        if ("object" === (void 0 === e ? "undefined" : n(e))) {
                            if (window.JSON) t = JSON.stringify(e), i = JSON.parse(t);
                            else
                                for (var a in e) i[a] = "object" === n(e[a]) ? cloneObj(e[a]) : e[a];
                            return i
                        }
                    }(heroData.gold.numArr);
                return t.loadSaveData(i), !1 !== t.subNum(this.fishPriceObj[e])
            },
            updateShopPrice: function(e) {
                var t = this.fishPriceObj[e],
                    i = gameConfigData.fishConfig[e].priceAdd,
                    n = new a;
                n.loadSaveData([1 + i]), t.multiplicationNum(n)
            },
            updateShopBuyData: function(e) {
                heroData.updateShopFishList(e), heroData.totalRecordList[e].count += 1, heroData.shopFishPriceList[e].count += 1, heroData.saveHeroData()
            },
            lastFishID: function() {
                var e = [],
                    t = [],
                    i = 0;
                for (var n in heroData.shopFishPriceList) {
                    var a = gameConfigData.fishConfig[heroData.shopFishPriceList[n].fishID];
                    null == a.unlockNeed ? t.push(heroData.shopFishPriceList[n].fishID) : null == heroData.shopFishPriceList[a.unlockNeed] || parseInt(heroData.shopFishPriceList[a.unlockNeed].unlockCount) >= parseInt(a.unlockCount) && t.push(heroData.shopFishPriceList[n].fishID)
                }
                t.length >= 5 ? i = 5 : t.length >= 4 ? i = 4 : t.length >= 3 ? i = 3 : t.length >= 2 ? i = 2 : t.length >= 1 && (i = 1), t.sort(function(e, t) {
                    return e > t ? 1 : e == t ? 0 : -1
                });
                for (var o = t.length - 1; o >= t.length - i; o--) e.push(t[o]);
                return e
            }
        });
        cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    ShopItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "001c9YQXVlJ17DiP6MG0ej2", "ShopItem");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                fishData: null,
                fishSprite: null,
                fishPriceObj: null,
                shopFishPriceList: null,
                diamondType: null
            },
            onDestroy: function() {
                this.fishData = null, this.fishSprite = null, this.fishPriceObj = null, this.shopFishPriceList = null, this.diamondType = null
            },
            initialize: function(e) {
                this.fishData = e, this.fishPriceObj = heroData.shopData.fishPriceObj, this.fishSprite = new cc.Node, this.fishSprite.addComponent(cc.Sprite), this.fishSprite.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + this.fishData.icon), this.fishSprite.x = -170, this.fishSprite.y = -65, this.fishSprite.scaleX = this.fishData.scale, this.fishSprite.scaleY = this.fishData.scale, this.node.addChild(this.fishSprite), this.diamondType = 0, this.initButton(), this.node.getChildByName("lvbgimg").getChildByName("lvart").getComponent("GameArtWord").setString(String(this.fishData.level)), this.node.getChildByName("lvbgimg").zIndex = 10
            },
            initButton: function() {
                var e = this,
                    t = function() {
                        e.node.getChildByName("btnimg4btn").active = !1, e.node.getChildByName("btnimg3btn").on(cc.Node.EventType.TOUCH_END, e.buyFish.bind(e), this), e.fishPriceObj[e.fishData.fishID] || heroData.shopData.addFishPriceFun(heroData.shopFishPriceList[e.fishData.fishID]), e.node.getChildByName("btnimg3btn").getChildByName("diamondsamll").active = !1, e.refreshGold()
                    },
                    i = function(t) {
                        e.node.getChildByName("btnimg3btn").active = !1, e.node.getChildByName("btnimg4btn").getChildByName("lockfishimg2").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.fishimgp_plist, "fishimg" + gameConfigData.fishConfig[e.fishData.unlockNeed].icon), t ? e.node.getChildByName("btnimg4btn").getChildByName("fishcountart").getComponent("GameArtWord").setString(String(t)) : e.node.getChildByName("btnimg4btn").getChildByName("fishcountart").getComponent("GameArtWord").setString(String(e.fishData.unlockCount))
                    };
                if (null == this.fishData.unlockNeed) t();
                else {
                    if (heroData.shopFishPriceList[this.fishData.fishID] && heroData.shopFishPriceList[this.fishData.unlockNeed]) {
                        for (var n in heroData.shopFishPriceList)
                            if (parseInt(this.fishData.unlockNeed) == parseInt(heroData.shopFishPriceList[n].fishID)) {
                                if (parseInt(heroData.shopFishPriceList[n].unlockCount) - parseInt(this.fishData.unlockCount) >= 0) t();
                                else i(gameConfigData.fishConfig[this.fishData.unlockNeed].level), 0 == parseInt(heroData.shopFishPriceList[n].unlockCount) && (this.fishSprite.color = cc.color(0, 0, 0, 255)), parseInt(heroData.shopFishPriceList[this.fishData.fishID].unlockCount) > 0 && heroData.shopData.shopDiamondArr.length <= 1 && (heroData.shopData.shopDiamondArr.push(this.fishData.fishID), this.diamondType = 1);
                                heroData.shopFishPriceList[this.fishData.fishID].unlockCount > 0 && (this.fishSprite.color = cc.color(255, 255, 255, 255), parseInt(heroData.shopData.lastBuyFishID) < parseInt(e.fishData.fishID) && (heroData.shopData.lastBuyFishID = e.fishData.fishID))
                            }
                    } else i(gameConfigData.fishConfig[this.fishData.unlockNeed].level), heroData.shopFishPriceList[this.fishData.fishID] ? (0 == parseInt(heroData.shopFishPriceList[this.fishData.fishID].unlockCount) && (this.fishSprite.color = cc.color(0, 0, 0, 255)), parseInt(heroData.shopFishPriceList[this.fishData.fishID].unlockCount) > 0 && (heroData.shopData.shopDiamondArr.length <= 1 && (heroData.shopData.shopDiamondArr.push(this.fishData.fishID), this.diamondType = 1), parseInt(heroData.shopData.lastBuyFishID) < parseInt(e.fishData.fishID) && (heroData.shopData.lastBuyFishID = e.fishData.fishID))) : this.fishSprite.color = cc.color(0, 0, 0, 255);
                    1 == this.diamondType && (e.node.getChildByName("btnimg4btn").active = !1, e.node.getChildByName("btnimg3btn").active = !0, e.node.getChildByName("btnimg3btn").on(cc.Node.EventType.TOUCH_END, e.buyFish.bind(e), this), this.node.getChildByName("btnimg3btn").getChildByName("smlgoldimg").active = !1, this.node.getChildByName("btnimg3btn").getChildByName("diamondsamll").active = !0, e.refreshDiamond())
                }
            },
            buyFish: function() {
                0 == this.diamondType ? !0 === heroData.shopData.buyFish(this.fishData.fishID, 1) && 0 == this.diamondType && (mainSceneContol.helpGoldLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.refreshGold(), mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshGold(), this.refreshGold()) : !0 === heroData.shopData.buyFish(this.fishData.fishID, 2) && mainSceneContol.mainDownLayerComponent.shopLayerComponent.refreshDiamond()
            },
            refreshGold: function() {
                var e = this.fishPriceObj[this.fishData.fishID].getNumText();
                this.node.getChildByName("btnimg3btn").getChildByName("buygoldart").getComponent("GameArtWord").setString(e)
            },
            refreshDiamond: function() {
                var e = new n;
                e.loadSaveData(this.fishData.diamond), this.node.getChildByName("btnimg3btn").getChildByName("buygoldart").getComponent("GameArtWord").setString(e.getNumText())
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    ShopLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e65cckZn7xGK4poPrZFMxCE", "ShopLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                gold: null,
                diamond: null,
                scrollViewContent: null,
                lastScrollViewContentY: null,
                itemDataList: null,
                nodeScrollView: null
            },
            onDestroy: function() {
                this.isInit = null, this.gold = null, this.diamond = null, this.scrollViewContent = null, this.lastScrollViewContentY = null, this.itemDataList = null, this.nodeScrollView = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isInit = !0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.gold = this.node.getChildByName("shopcoinsbgimgsp").getChildByName("shopgoldart").getComponent("GameArtWord"), this.diamond = this.node.getChildByName("shopdiamondimgsp").getChildByName("shopdiamondart").getComponent("GameArtWord"), this.refreshGold(), this.refreshDiamond(), this.nodeScrollView = this.node.getChildByName("scrollview").getComponent(cc.ScrollView), this.scrollViewContent = this.nodeScrollView.content, heroData.shopData.shopDiamondArr = [], this.initItem())
            },
            initItem: function() {
                this.itemDataList = [];
                var e = gameConfigData.fishConfig,
                    t = 0,
                    i = 0;
                for (var n in e) {
                    t += 1;
                    var a = e[n],
                        o = {
                            x: 0,
                            y: -140 * (t - 1),
                            itemObj: a
                        };
                    this.itemDataList.push(o);
                    var s = a.unlockNeed;
                    heroData.shopFishPriceList[s] && heroData.shopFishPriceList[s].unlockCount >= 1 ? i += 1 : null == s && (i += 1)
                }
                this.scrollViewContent.height = 140 * t, "5" == heroData.noviceGuidance && (this.nodeScrollView.enabled = !1), this.nodeScrollView.scrollTo(cc.v2(0, 1 - i / (t - 4.6) + 3 / (t - 4.6)))
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            },
            refreshGold: function() {
                if (this.gold) {
                    var e = heroData.gold.getNumText();
                    this.gold.setString(e.toString())
                }
            },
            refreshDiamond: function() {
                if (this.diamond) {
                    var e = heroData.diamond.getNumText();
                    this.diamond.setString(e.toString())
                }
            },
            update: function() {
                if (this.scrollViewContent.y != this.lastScrollViewContentY) {
                    this.lastScrollViewContentY = this.scrollViewContent.y;
                    for (var e = 0; e < this.itemDataList.length; e++) {
                        var t = this.itemDataList[e],
                            i = t.y + this.scrollViewContent.y;
                        if (i <= 580 && i >= -545) {
                            if (!t.shopItem) {
                                var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.shop_item_prefab);
                                t.shopItem = n;
                                var a = n.addComponent("ShopItem");
                                this.scrollViewContent.addChild(n), n.x = 0, n.y = t.y, a.shopLayer = this, a.initialize(t.itemObj)
                            }
                            t.shopItem.active = !0
                        } else t.shopItem && (t.shopItem.active = !1)
                    }
                }
            }
        }), cc._RF.pop()
    }, {}],
    ShotProfitLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5b09eM8u6xKaafQNwq8b/Mo", "ShotProfitLayer");
        var n = e("NumCalculate"),
            a = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                getGoldNum: null,
                callback: null
            },
            onDestroy: function() {
                this.isInit = null, this.getGoldNum = null, this.callback = null
            },
            destroyNode: function() {
                this.node.getChildByName("basenode").getChildByName("btnimg1btn").off(cc.Node.EventType.TOUCH_END, this.clickOKbtnFun, this), null != this.callback && this.callback(), this.node.destroy()
            },
            initialize: function(e, t, i) {
                if (1 != this.isInit) {
                    var o = this;
                    this.callback = i, heroData.gamePlayData.addAttackInfo(e), this.node.getChildByName("basenode").getChildByName("btnimg1btn").on(cc.Node.EventType.TOUCH_END, this.clickOKbtnFun, this), this.getGoldNum = new n, this.getGoldNum.loadSaveData(t.getSaveData()), this.node.getChildByName("basenode").getChildByName("fishingUi11sp").getChildByName("getgoldart").getComponent("GameArtWord").setString("+" + this.getGoldNum.getNumText()), this.node.getChildByName("basenode").getChildByName("fishingUi8sp").getChildByName("nametxt").getComponent(cc.Label).string = e.name;
                    var s = new a;
                    s.loadImage(e.photo, null, 135, 135), this.node.getChildByName("basenode").getChildByName("mask").addChild(s), this.node.getChildByName("basenode").getChildByName("lightimg2sp").runAction(cc.rotateBy(30, 360).repeatForever()), this.node.getChildByName("basenode").scaleX = 0, this.node.getChildByName("basenode").scaleY = 0, this.node.getChildByName("basenode").runAction(cc.sequence(cc.scaleTo(.3, 1.02, 1.02), cc.scaleTo(.2, 1, 1))), this.node.getChildByName("basenode").getChildByName("fishingUi11sp").scaleX = 0, this.node.getChildByName("basenode").getChildByName("fishingUi11sp").scaleY = 0, this.node.getChildByName("basenode").getChildByName("fishingUi11sp").runAction(cc.sequence(cc.delayTime(.3), cc.scaleTo(.2, 1.02, .98), cc.callFunc(function() {
                        var e = new cc.Node;
                        e.scaleX = 2, e.scaleY = 2, e.x = -99, e.y = 182;
                        var t = e.addComponent(sp.Skeleton);
                        o.node.getChildByName("basenode").addChild(e), e.zIndex = UIzIndexInfo.UIFingerIndex, t.skeletonData = engine.gameMemoryManagement.getSpine(mustSpine.colouredribbon_spine), t.loop = !1, t.timeScale = .6, t.animation = "float";
                        var i = new cc.Node;
                        i.scaleX = -2, i.scaleY = 2, i.x = 125, i.y = 184;
                        var n = i.addComponent(sp.Skeleton);
                        o.node.getChildByName("basenode").addChild(i), i.zIndex = UIzIndexInfo.UIFingerIndex, n.skeletonData = engine.gameMemoryManagement.getSpine(mustSpine.colouredribbon_spine), n.loop = !1, n.timeScale = .6, n.animation = "float"
                    }), cc.scaleTo(.2, 1, 1))), this.isInit = !0
                }

                this.addSingleGold();
            },
            addSingleGold: function() {
                heroData.gamePlayData.addedGold(this.getGoldNum), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1, UIzIndexInfo.UIShotStopIndex), this.destroyNode()
            },
            addDoubleGold: function() {
                var e = new n;
                e.loadSaveData(this.getGoldNum.getSaveData());
                var t = new n;
                t.loadSaveData([2]), e.multiplicationNum(t), heroData.gamePlayData.addedGold(e), heroData.isGetOutLine = !0, mainSceneContol.gamePlayLayerComponent.addRewardParticle(1, UIzIndexInfo.UIShotStopIndex), this.destroyNode()
            },
            clickOKbtnFun: function() {
                var e = this;
                /*gameSDK.logEvent("buyuhuodejinbi_share_dianji", 1, {
                    buyuhuodejinbi_share_dianji: "buyuhuodejinbi_share_dianji"
                });
                var t = mainSceneContol.getShareData();
                gameSDK.sendFaceBookFriend(function() {
                    e.addDoubleGold(), gameSDK.logEvent("buyuhuodejinbi_share_dianji_chenggong", 1, {
                        buyuhuodejinbi_share_dianji_chenggong: "buyuhuodejinbi_share_dianji_chenggong"
                    })
                }, function() {
                    e.addSingleGold(), gameSDK.logEvent("buyuhuodejinbi_share_dianji_shibai", 1, {
                        buyuhuodejinbi_share_dianji_shibai: "buyuhuodejinbi_share_dianji_shibai"
                    })
                }, t)*/
                e.addSingleGold();
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage",
        NumCalculate: "NumCalculate"
    }],
    ShowAllFitHeight: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "adb20rC4wtM8Z12vsFBa7ZH", "ShowAllFitHeight"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                if (1 == cc.sys.isMobile) {
                    engineGlobal.gameHeigh, engineGlobal.gameWidth;
                    var e = document.documentElement.clientHeight / document.documentElement.clientWidth;
                    engineGlobal.viewGameWidth = engineGlobal.gameHeigh / e, cc.view.setDesignResolutionSize(engineGlobal.viewGameWidth, engineGlobal.viewGameHeigh, cc.ResolutionPolicy.SHOW_ALL)
                }
            }
        }), cc._RF.pop()
    }, {}],
    SpeedUpFinishLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "11a8elZBp1Kp5CLbzR0o0jZ", "SpeedUpFinishLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").off(cc.Node.EventType.TOUCH_END, this.clickShareBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    var e = this;
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("sharedoublebtn").on(cc.Node.EventType.TOUCH_END, this.clickShareBtnFun, this);
                    var t = heroData.gamePlayData.speedUpGoldNum.getNumText();
                    heroData.gamePlayData.speedUpGoldNum.numArr = [0], this.node.getChildByName("getnumart").getComponent("GameArtWord").setString("+" + t), this.node.getChildByName("outlinebgsp").getChildByName("sharedoubledes").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.englishimgp_plist, "Verynice！Yougotitall"), this.node.getChildByName("sharedoublebtn").getChildByName("watchadimg").active = !1, this.node.getChildByName("sharedoublebtn").getChildByName("btning").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.publicimg01_plist, "okimg"), this.node.getChildByName("lightimg2").runAction(cc.rotateBy(30, 360).repeatForever()), this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                        e.node.getChildByName("lightimg2").stopAllActions(), e.destroyNode()
                    }))), this.isInit = !0
                }
            },
            clickShareBtnFun: function() {
                this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    SpeedUpLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "eb77csx5ihPyoLBJNdzaEDF", "SpeedUpLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("watchbtn").off(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    var e = this;
                    gameSDK.logEvent("speedUpOpen", 1, {
                        speedUpOpen: "speedUpOpen"
                    });
                    var t = function() {
                        e.node.getChildByName("watchbtn").getChildByName("watchadimg").active = !0, e.node.getChildByName("watchbtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg")
                    };
                    heroData.watchUpTimes = 0
                    switch (heroData.watchUpTimes) {
                        case 0:
                            e.node.getChildByName("watchbtn").getChildByName("watchadimg").active = !1, e.node.getChildByName("watchbtn").getChildByName("accelerate").x -= 20;
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            t()
                    }
                    this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("watchbtn").on(cc.Node.EventType.TOUCH_END, this.clickWatchbtnFun, this), this.isInit = !0
                }
            },
            clickWatchbtnFun: function() {
                switch (gameSDK.logEvent("speedUpCount", 1, {
                    speedUpCount: "speedUpCount"
                }), heroData.watchUpTimes) {
                    case 0:
                        this.speedUpFun();
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        this.advSpeedUpFun()
                }
            },
            advSpeedUpFun: function() {
                var e = this;
                1 == cc.sys.isMobile ? gameSDK.showRewardVideoAd(advCode3, function() {
                    e.speedUpFun()
                }) : gameSDK.newCreateInterstitialAd(advCode7, function() {
                    e.speedUpFun()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                })
            },
            speedUpFun: function(e) {
                heroData.speedUpFun(e), this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    TileMapData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a51bfr8ZC5Awbs/Am8CiXZg", "TileMapData");
        e("TileMapLayerData"), cc.Class({
            properties: {
                isInit: null,
                tileMapLayerDataList: null
            },
            destroy: function() {
                for (; this.tileMapLayerDataList.length > 0;) {
                    this.tileMapLayerDataList.pop().destroy()
                }
            },
            initialize: function(e) {
                1 != this.isInit && (this.isInit = !0, this.tileMapLayerDataList = [])
            }
        });
        cc._RF.pop()
    }, {
        TileMapLayerData: "TileMapLayerData"
    }],
    TileMapLayerData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fc9e9QiW4VF1bRVpL1dCZSU", "TileMapLayerData");
        cc.Class({
            properties: {
                offsetX: null,
                offsetY: null,
                gridWidth: null,
                gridHeight: null,
                gridMaxX: null,
                gridMaxY: null,
                isInit: null,
                gridArr: null,
                defaultGridValue: null,
                gridAngle: 90
            },
            destroy: function() {
                this.offsetX = null, this.offsetY = null, this.gridWidth = null, this.gridHeight = null, this.gridMaxX = null, this.gridMaxY = null, this.isInit = null, this.gridArr = null, this.defaultGridValue = null, this.gridAngle = null
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.isInit = !0, null != e.gridAngle && (this.gridAngle = e.gridAngle), this.offsetX = e.offsetX, this.offsetY = e.offsetY, this.gridWidth = e.gridWidth, this.gridHeight = e.gridHeight, this.gridMaxX = e.gridMaxX, this.gridMaxY = e.gridMaxY, this.defaultGridValue = e.defaultGridValue, this.gridArr = [];
                    for (var t = 0; t < this.gridMaxX; t++) {
                        for (var i = [], n = 0; n < this.gridMaxY; n++) i.push(this.defaultGridValue);
                        this.gridArr.push(i)
                    }
                }
            },
            setTileMapAttribute: function(e) {
                this.offsetX = e.offsetX, this.offsetY = e.offsetY, this.gridWidth = e.gridWidth, this.gridHeight = e.gridHeight, this.gridMaxX = e.gridMaxX, this.gridMaxY = e.gridMaxY, this.defaultGridValue = e.defaultGridValue, this.gridArr = [];
                for (var t = 0; t < this.gridMaxX; t++) {
                    for (var i = [], n = 0; n < this.gridMaxY; n++) i.push(this.defaultGridValue);
                    this.gridArr.push(i)
                }
            },
            clearGridInfo: function(e, t) {
                this.setGridInfo(e, t, this.defaultGridValue)
            },
            setGridInfo: function(e, t, i, n) {
                if (null != i) {
                    if (i.gridX = e, i.gridY = t, 1 == n) {
                        var a = this.getScenePointByGridPoint(e, t);
                        i.x = a.x, i.y = a.y
                    }
                    i.setZIndex()
                }
                return this.gridArr[e][t] = i, a
            },
            getGridInfoByGridPoint: function(e, t) {
                return e < 0 || t < 0 || e >= this.gridMaxX || t >= this.gridMaxY ? null : this.gridArr[e][t]
            },
            getGridInfoByScenePoint: function(e, t) {
                var i = this.getGridPointByScenePoint(e, t);
                return this.getGridInfoByGridPoint(i.x, i.y)
            },
            getGridPointByScenePoint: function(e, t) {
                var i, n;
                return 90 == this.gridAngle ? (i = Math.floor((e - this.offsetX) / this.gridWidth), n = this.gridMaxY - 1 - Math.floor((t - this.offsetY) / this.gridHeight)) : (e = e - this.offsetX + this.gridWidth / 2, t -= this.offsetY, i = Math.floor(e / this.gridWidth - t / this.gridHeight), n = this.gridMaxY - 1 - Math.floor(e / this.gridWidth + t / this.gridHeight)), cc.v2(i, n)
            },
            getScenePointByGridPoint: function(e, t) {
                var i = cc.v2(0, 0);
                return 90 == this.gridAngle ? (i.x = e * this.gridWidth + this.gridWidth / 2, i.y = (this.gridMaxY - 1 - t) * this.gridHeight + this.gridHeight / 2) : (i.x = (e + (this.gridMaxY - 1 - t)) * this.gridWidth / 2, i.y = (this.gridMaxY - 1 - t - e) * this.gridHeight / 2), i.x = i.x + this.offsetX, i.y = i.y + this.offsetY, i
            },
            settingGridByAStar: function(e) {
                for (var t = 0; t < this.gridArr.length; t++)
                    for (var i = 0; i < this.gridArr[t].length; i++) {
                        var n = this.gridArr[t][i];
                        if (null != n) {
                            var a = this.getGridPointByScenePoint(t, i);
                            n.x = a.x, n.y = a.y
                        }
                    }
            },
            getGridsAroundByType: function(e, t, i) {
                var n = [],
                    a = this.getGridInfoByGridPoint(e, t);
                if (null != a) {
                    if (a.gridType == gameConfigData.gridTypeEnum.ice || a.gridType == gameConfigData.gridTypeEnum.colourless) return n;
                    if (a.gridType == gameConfigData.gridTypeEnum.colours) {
                        n = [a];
                        for (var o = [cc.v2(0, 1), cc.v2(0, -1), cc.v2(1, 0), cc.v2(-1, 0), cc.v2(-1, -1), cc.v2(1, 1), cc.v2(-1, 1), cc.v2(1, -1)], s = 0; s < o.length; s++) {
                            var l = cc.v2(e, t).add(o[s]),
                                r = this.getGridInfoByGridPoint(l.x, l.y);
                            null != r && n.push(r)
                        }
                    } else {
                        var c, d = (n = [a]).slice();
                        do {
                            c = n.length;
                            var h = [];
                            for (s = 0; s < d.length; s++) h = h.concat(this.checkRoundColorSame(d[s].gridX, d[s].gridY, a));
                            d = [];
                            for (s = 0; s < h.length; s++) - 1 == n.indexOf(h[s]) && (n.push(h[s]), d.push(h[s]))
                        } while (n.length != c)
                    }
                }
                return n
            },
            checkRoundColorSame: function(e, t, i) {
                for (var n = [], a = [cc.v2(0, 1), cc.v2(0, -1), cc.v2(1, 0), cc.v2(-1, 0)], o = 0; o < a.length; o++) {
                    var s = cc.v2(e, t).add(a[o]),
                        l = this.getGridInfoByGridPoint(s.x, s.y);
                    null != l && i.isSameGrid(l) && n.push(l)
                }
                return n
            },
            checkEveryGridIsChange: function(e) {
                for (var t = 0; t < this.gridArr.length; t++)
                    for (var i = 0; i < this.gridArr[t].length; i++) null != this.gridArr[t][i] && this.gridArr[t][i].isShouldChangeColor(e)
            }
        });
        cc._RF.pop()
    }, {}],
    TooltipLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a996cRQuLZAB6N4+P5Y6b1f", "TooltipLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    var t = this;
                    e && (this.node.getChildByName("tipstxt").getComponent(cc.Label).string = e), this.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function() {
                        tooltipLayer = null, t.destroyNode()
                    }))), this.isInit = !0
                }
            }
        }), cc._RF.pop()
    }, {}],
    TransformationItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b6567/BD+lM4JUOOHoEdWwh", "TransformationItem");
        e("LoadControl");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                itemData: null
            },
            onDestroy: function() {
                this.isInit = null, this.itemData = null
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.itemData = e, this.refreshView(), this.isInit = !0
                }
            },
            refreshColor: function() {
                0 == heroData.transformationData[this.itemData.id].unlock ? (this.node.getChildByName("locksp").active = !0, this.node.getChildByName("levelupbg").color = cc.color(155, 155, 155)) : (this.node.getChildByName("locksp").active = !1, this.node.getChildByName("levelupbg").color = cc.color(255, 255, 255))
            },
            refreshView: function() {
                this.refreshColor()
            }
        }), cc._RF.pop()
    }, {
        LoadControl: "LoadControl"
    }],
    TransformationLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7d8eeGpyMdICK913lO8Ek7l", "TransformationLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                curPage: null,
                itemList: null,
                curUpgradeGold: null,
                curUpgradeDiamond: null,
                pageView: null,
                isClickbtn: null,
                isClickUp: null,
                isClickEv: null,
                tishikuang: null
            },
            onDestroy: function() {
                this.isInit = null, this.curPage = null, this.itemList = null, this.curUpgradeGold = null, this.curUpgradeDiamond = null, this.pageView = null, this.isClickbtn = null, this.isClickUp = null, this.isClickEv = null, this.tishikuang = null
            },
            destroyNode: function() {
                this.node.getChildByName("leveluppv").getComponent(cc.PageView).node.off("page-turning", this.turnPageUpdate, this), this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("leftbtn").off(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("rightbtn").off(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("upgradebtn").off(cc.Node.EventType.TOUCH_END, this.clickUnlockbtnFun, this), this.node.getChildByName("evolutionbtn").off(cc.Node.EventType.TOUCH_END, this.clickEvolutionFun, this), null != this.tishikuang && (this.tishikuang.getChildByName("scaleimg1sp").getChildByName("yesbtn").off(cc.Node.EventType.TOUCH_END, this.clickYesbtnFun, this), this.tishikuang.getChildByName("scaleimg1sp").getChildByName("nobtn").off(cc.Node.EventType.TOUCH_END, this.clickNobtnFun, this), this.tishikuang.destroy()), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.itemList = new Object, this.isClickbtn = !0, this.isClickUp = !0, this.isClickEv = !0, this.curPage = 0, this.curUpgradeGold = new n, this.curUpgradeGold.loadSaveData([0]), this.curUpgradeDiamond = new n, this.curUpgradeDiamond.loadSaveData([0]), this.pageView = this.node.getChildByName("leveluppv").getComponent(cc.PageView), this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("leftbtn").on(cc.Node.EventType.TOUCH_END, this.clickLeftbtnFun, this), this.node.getChildByName("rightbtn").on(cc.Node.EventType.TOUCH_END, this.clickRightbtnFun, this), this.node.getChildByName("upgradebtn").on(cc.Node.EventType.TOUCH_END, this.clickUpgradeFun, this), this.node.getChildByName("evolutionbtn").on(cc.Node.EventType.TOUCH_END, this.clickEvolutionFun, this), this.initItem(), this.refreshUI(), this.showLeftRightBtn(), this.node.getChildByName("leveluppv").getComponent(cc.PageView).node.on("page-turning", this.turnPageUpdate, this), heroData.transformationLevel > 1 && this.pageView.scrollToPage(heroData.transformationLevel - 1), this.isInit = !0)
            },
            initItem: function() {
                var e = heroData.transformationLevel + 1;
                e > gameConfigData.transformationConfig.maxUpgrade && (e = gameConfigData.transformationConfig.maxUpgrade);
                for (var t = 0; t < e; t++)
                    if (!this.itemList[t]) {
                        var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.transformation_item_prefab),
                            n = i.addComponent("TransformationItem"),
                            a = new Object;
                        a.id = heroData.transformationData["100" + (t + 1)].id, a.index = t, n.initialize(a), this.pageView.addPage(i), this.itemList[t] = i
                    }
            },
            turnPageUpdate: function() {
                this.curPage = this.pageView.getCurrentPageIndex(), this.refreshUI(), this.showLeftRightBtn()
            },
            showLeftRightBtn: function() {
                0 === this.curPage ? (this.node.getChildByName("rightbtn").active = !0, this.node.getChildByName("leftbtn").active = !1) : this.curPage === this.pageView.getPages().length - 1 ? (this.node.getChildByName("rightbtn").active = !1, this.node.getChildByName("leftbtn").active = !0) : (this.node.getChildByName("rightbtn").active = !0, this.node.getChildByName("leftbtn").active = !0)
            },
            refCurUpgradeGold: function() {
                var e = heroData.transformationData["100" + (this.curPage + 1)],
                    t = gameConfigData.transformationList[e.id],
                    i = gameConfigData.transformationValue[e.id],
                    n = 0;
                if (e.grade < i.upperLimit && t.level[e.grade + 1]) {
                    var a = t.level[e.grade + 1];
                    2 == a.type ? this.curUpgradeGold.loadSaveData(a.consume) : this.curUpgradeDiamond.loadSaveData(a.consume), n = a.type
                }
                return n
            },
            refreshUI: function() {
                var e = heroData.transformationData["100" + (this.curPage + 1)];
                gameConfigData.transformationList[e.id], gameConfigData.transformationValue[e.id];
                for (var t in this.node.getChildByName("leveluptxt").getComponent(cc.Label).string = "Lv" + e.grade, this.node.getChildByName("levelupdestxt").getComponent(cc.Label).string = gameConfigData.transformationText[e.id], this.itemList) this.itemList[t].getComponent("TransformationItem").refreshColor();
                if (heroData.shopData.refreshLastFishFun(), gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].level >= gameConfigData.transformationConfig.maxFishLevel ? (this.node.getChildByName("evolutionbtn").active = !0, this.node.getChildByName("evolution2btn").active = !1) : (this.node.getChildByName("evolutionbtn").active = !1, this.node.getChildByName("evolution2btn").active = !0), 0 == e.unlock) this.node.getChildByName("upgradebtn").active = !1, this.node.getChildByName("upgrade2btn").active = !0;
                else {
                    this.node.getChildByName("upgradebtn").active = !0, this.node.getChildByName("upgrade2btn").active = !1;
                    var i = this.refCurUpgradeGold();
                    0 == i ? (this.node.getChildByName("upgradebtn").getChildByName("upgradesp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("goldimgsp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("goldnumart").active = !1, this.node.getChildByName("upgradebtn").getChildByName("diamondimgsp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("fulllevelsp").active = !0) : (this.node.getChildByName("upgradebtn").getChildByName("fulllevelsp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("upgradesp").active = !0, this.node.getChildByName("upgradebtn").getChildByName("goldnumart").active = !0, 2 == i ? (this.node.getChildByName("upgradebtn").getChildByName("goldimgsp").active = !0, this.node.getChildByName("upgradebtn").getChildByName("diamondimgsp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("goldnumart").getComponent("GameArtWord").setString(this.curUpgradeGold.getNumText(1))) : (this.node.getChildByName("upgradebtn").getChildByName("goldimgsp").active = !1, this.node.getChildByName("upgradebtn").getChildByName("diamondimgsp").active = !0, this.node.getChildByName("upgradebtn").getChildByName("goldnumart").getComponent("GameArtWord").setString(this.curUpgradeDiamond.getNumText(1))))
                }
            },
            clickLeftbtnFun: function() {
                var e = this.curPage - 1;
                this.pageView.scrollToPage(e)
            },
            clickRightbtnFun: function() {
                var e = this.curPage + 1;
                this.pageView.scrollToPage(e)
            },
            clickUpgradeFun: function() {
                if (0 != this.isClickbtn && 0 != this.isClickUp) {
                    this.isClickUp = !1;
                    var e = this,
                        t = heroData.transformationData["100" + (this.curPage + 1)],
                        i = (gameConfigData.transformationList[t.id], gameConfigData.transformationValue[t.id]);
                    if (t.grade < i.upperLimit) {
                        var a = function() {
                            heroData.transformUpgradeFun("100" + (e.curPage + 1)), heroData.gamePlayData.refreshProductionPer(), e.refreshUI()
                        };
                        if (2 == this.refCurUpgradeGold())
                            if (0 == this.curUpgradeGold.comparisonSize(heroData.gold)) {
                                var o = new n;
                                o.loadSaveData(this.curUpgradeGold.getSaveData()), mainSceneContol.helpGoldLayerComponent.refreshGold(), heroData.gamePlayData.subGold(o), a()
                            } else mainSceneContol.gamePlayLayerComponent.popNotice("Shortage of gold coins");
                        else if (0 == this.curUpgradeDiamond.comparisonSize(heroData.diamond)) {
                            var s = new n;
                            s.loadSaveData(this.curUpgradeDiamond.getSaveData()), heroData.gamePlayData.subDiamond(s), a()
                        } else mainSceneContol.gamePlayLayerComponent.popNotice("Not enough diamonds")
                    } else mainSceneContol.gamePlayLayerComponent.popNotice("Full level");
                    this.node.getChildByName("upgradebtn").runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                        e.isClickUp = !0
                    })))
                }
            },
            clickEvolutionFun: function() {
                if (0 != this.isClickbtn && 0 != this.isClickEv) {
                    this.isClickEv = !1;
                    var e = this;
                    this.promoteFun(), this.node.getChildByName("evolutionbtn").runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                        e.isClickEv = !0
                    })))
                }
            },
            promoteFun: function() {
                if (null == this.tishikuang) {
                    this.tishikuang = engine.gameMemoryManagement.getPrefab(mainBgPrefab.tishikuang4_prefab), this.node.addChild(this.tishikuang);
                    var e = heroData.getTransformRewardNumFun();
                    this.tishikuang.getChildByName("scaleimg1sp").getChildByName("evolutiontxt").getChildByName("numtxt").getComponent(cc.Label).string = e, this.tishikuang.getChildByName("scaleimg1sp").getChildByName("yesbtn").on(cc.Node.EventType.TOUCH_END, this.clickYesbtnFun, this), this.tishikuang.getChildByName("scaleimg1sp").getChildByName("nobtn").on(cc.Node.EventType.TOUCH_END, this.clickNobtnFun, this)
                } else this.tishikuang.active = !0;
                this.isClickbtn = !1, this.tishikuang.scaleX = 0, this.tishikuang.scaleY = 0, this.tishikuang.runAction(cc.sequence(cc.scaleTo(.2, 1.05, 1.05), cc.scaleTo(.12, .98, .98), cc.scaleTo(.12, 1, 1)))
            },
            clickYesbtnFun: function() {
                var e = this;
                heroData.transformationResetFun(function() {
                    heroData.transformationRefFun(), e.initItem(), e.refreshUI(), e.showLeftRightBtn()
                }), this.isClickbtn = !0, this.tishikuang.stopAllActions(), this.tishikuang.active = !1
            },
            clickNobtnFun: function() {
                this.isClickbtn = !0, this.tishikuang.stopAllActions(), this.tishikuang.active = !1
            },
            clickClosebtnFun: function() {
                0 != this.isClickbtn && this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    TransformationOkLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "d7b14cMvR5INIEmudJY1v9O", "TransformationOkLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isEnough: null
            },
            onDestroy: function() {
                this.isInit = null, this.isEnough = null
            },
            destroyNode: function() {
                this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickOkbtnFun, this), this.node.destroy()
            },
            initialize: function(e) {
                if (1 != this.isInit) {
                    this.isEnough = !1;
                    var t = gameConfigData.transformationList[e].value,
                        i = [0];
                    i = heroData.transformationData[e].unlock < gameConfigData.transformationList[e].consume.length ? gameConfigData.transformationList[e].consume[heroData.transformationData[e].unlock] : gameConfigData.transformationList[e].consume[gameConfigData.transformationList[e].consume.length - 1];
                    var a = new n;
                    a.loadSaveData(i), heroData.evolMoney.comparisonSize(a) && (this.isEnough = !0);
                    var o = new n;
                    o.loadSaveData(heroData.evolMoney.getSaveData());
                    var s = heroData.transformationRewardFun(heroData.getTransformRewardNumFun()[0]),
                        l = new n;
                    l.loadSaveData(s), o.addNum(l), this.node.getChildByName("scaleimg1sp").getChildByName("desbgsp").getChildByName("profitart").getComponent("GameArtWord").setString("x" + t), this.node.getChildByName("scaleimg1sp").getChildByName("desbgsp").getChildByName("curmoneyart").getComponent("GameArtWord").setString(o.getNumText()), this.node.getChildByName("scaleimg1sp").getChildByName("desbgsp").getChildByName("allmoneyart").getComponent("GameArtWord").setString(a.getNumText()), this.node.getChildByName("scaleimg1sp").getChildByName("bgimgsp").getChildByName("building" + (e - 1e3) + "sp").active = !0, this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickOkbtnFun, this), this.isInit = !0
                }
            },
            clickOkbtnFun: function() {
                heroData.transformationResetFun(function() {}), this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    TransformationSaleLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "14eceROJn5KcqM3bY/J6DMw", "TransformationSaleLayer");
        var n = e("NumCalculate");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null
            },
            onDestroy: function() {
                this.isInit = null
            },
            destroyNode: function() {
                this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").off(cc.Node.EventType.TOUCH_END, this.clickSalebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    var e = heroData.getTransformRewardNumFun(),
                        t = e[0],
                        i = e[1],
                        a = heroData.transformationRewardFun(t),
                        o = heroData.transformationRewardFun(i),
                        s = new n;
                    s.loadSaveData(a);
                    var l = new n;
                    l.loadSaveData(o), this.node.getChildByName("scaleimg1sp").getChildByName("moneyart").getComponent("GameArtWord").setString(s.getNumText()), this.node.getChildByName("scaleimg1sp").getChildByName("bubbleimg2sp").getChildByName("upMoneyart").getComponent("GameArtWord").setString(l.getNumText()), this.node.getChildByName("scaleimg1sp").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("scaleimg1sp").getChildByName("btnimgbtn").on(cc.Node.EventType.TOUCH_END, this.clickSalebtnFun, this), mainSceneContol.mainTransformationLayerComponent.btnShowFun(), this.isInit = !0
                }
            },
            clickSalebtnFun: function() {
                heroData.restoreFishFun();
                var e = heroData.getEvolutionIDFun();
                if (e && 0 != e) {
                    var t = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.transformation_ok_tips_prefab);
                    engine.gameAdapterInfo.addSceneNode(t, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIConfirmzIndex), t.addComponent("TransformationOkLayer").initialize(e)
                } else heroData.transformationResetFun(function() {});
                this.destroyNode()
            },
            clickClosebtnFun: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {
        NumCalculate: "NumCalculate"
    }],
    TreasureBoxLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "36a50/bKXZHpaU+7ZP4fm4I", "TreasureBoxLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isFreeGold: null,
                timeTxt: null
            },
            onDestroy: function() {
                this.isInit = null, this.isFreeGold = null, this.timeTxt = null
            },
            destroyNode: function() {
                this.node.getChildByName("treasureBoxbtn").off(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                1 != this.isInit && (this.isFreeGold = !1, this.node.getChildByName("treasureBoxbtn").on(cc.Node.EventType.TOUCH_END, this.clickBtnFun, this), this.timeTxt = this.node.getChildByName("treasureBoxbtn").getChildByName("timetxt"), this.node.getChildByName("treasureBoxbtn").getChildByName("smallTreasureBoxsp").runAction(cc.sequence(cc.rotateTo(.1, -7), cc.rotateTo(.2, 7), cc.rotateTo(.2, -7), cc.rotateTo(.2, 7), cc.rotateTo(.1, 0), cc.delayTime(1.5)).repeatForever()), this.node.getChildByName("treasureBoxbtn").getChildByName("mst3giftguangxiaosp").runAction(cc.rotateBy(30, 360).repeatForever()), this.timeTxt.active = !1, this.updateShowTime(), this.isInit = !0)
            },
            updateShowTime: function() {
                heroData.freeGoldTime > engine.gameTime.getLocalTime() ? (this.isFreeGold = !0, this.node.getChildByName("treasureBoxbtn").active = !1) : (this.isFreeGold = !1, this.node.getChildByName("treasureBoxbtn").active = !0)
            },
            update: function() {
                if (!0 === this.isInit && 1 == this.isFreeGold) {
                    var e = heroData.freeGoldTime - engine.gameTime.getLocalTime();
                    (this.node.getChildByName("treasureBoxbtn").active = !0) && (this.node.getChildByName("treasureBoxbtn").active = !1), e <= 0 && (this.isFreeGold = !1, this.node.getChildByName("treasureBoxbtn").active = !0)
                }
            },
            clickBtnFun: function() {
                0 == this.isFreeGold && heroData.shopData.addFreeGoldFun(1)
            }
        }), cc._RF.pop()
    }, {}],
    TurnOtherGameLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "09e567bW5JPkqQWauEqpoPr", "TurnOtherGameLayer"), window.otherGame = {
            JellyCrush: {
                name: "Jelly Crush",
                id: "1219338561447280",
                icon: "jctg_1"
            },
            PopStone: {
                name: "Pop Stone",
                id: "1394792680649041",
                icon: "jctg_2"
            },
            JellyBoom: {
                name: "Jelly Boom",
                id: "319647368564919",
                icon: "jctg_3"
            },
            StoneDash: {
                name: "Stone Dash",
                id: "1943850945671989",
                icon: "jctg_4"
            },
            PetsCrush: {
                name: "Pets Crush",
                id: "147579912728683",
                icon: "jctg_5"
            },
            IdleFish: {
                name: "Idle Fish",
                id: "2246661838950056",
                icon: "jctg_6"
            },
            MergeBirds: {
                name: "Merge Birds",
                id: "1296780957130469",
                icon: "jctg_7"
            },
            BearBoom: {
                name: "Bear Boom",
                id: "1496369423800038",
                icon: "jctg_8"
            },
            bumpio: {
                name: "bump.io",
                id: "324885334739659",
                icon: "jctg_9"
            },
            Solitaire: {
                name: "2048 Solitaire",
                id: "2634231319920301",
                icon: "jctg_10"
            },
            PopStar2019: {
                name: "Pop Star 2019",
                id: "545588979264457",
                icon: "jctg_11"
            }
        }, cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                showIcon: null,
                clickCDTime: 0
            },
            onDestroy: function() {
                this.isInit = null, this.showIcon = null, this.clickCDTime = null
            },
            onLoad: function() {
                this.initialize()
            },
            destroyNode: function() {
                this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.closeLayer, this), this.node.destroy()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    this.isInit = !0, this.showIcon = [otherGame.JellyCrush, otherGame.PopStone, otherGame.JellyBoom, otherGame.PetsCrush, otherGame.MergeBirds, otherGame.Solitaire, otherGame.PopStar2019], "1" == gameConfigData.configureTable.config ? this.showIcon = [otherGame.JellyCrush, otherGame.PopStone, otherGame.JellyBoom, otherGame.PetsCrush, otherGame.MergeBirds, otherGame.Solitaire, otherGame.PopStar2019] : this.showIcon = [otherGame.JellyCrush, otherGame.PopStone, otherGame.JellyBoom, otherGame.PetsCrush, otherGame.IdleFish, otherGame.Solitaire, otherGame.PopStar2019], this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.closeLayer, this);
                    for (var e = 0; e < this.showIcon.length; e++) {
                        var t = this.showIcon[e],
                            i = 410 - 150 * e,
                            n = new cc.Node,
                            a = n.addComponent(cc.Label);
                        a.string = t.name, a.fontSize = 28, n.color = cc.color(0, 0, 0, 255), n.x = 0, n.y = i, this.node.addChild(n);
                        var o = new cc.Node;
                        o.x = -240, o.y = i, o.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.mainimgp_plist, t.icon), this.node.addChild(o);
                        var s = new cc.Node;
                        s.x = 260, s.y = i, s.addComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mainBgLoadImage.mainimgp_plist, "jctg_play"), this.node.addChild(s), s.gamedata = t, s.on(cc.Node.EventType.TOUCH_END, this.openGame, this)
                    }
                }
            },
            openGame: function(e) {
                var t = e.currentTarget.gamedata,
                    i = (new Date).getTime();
                if (!(i - this.clickCDTime < 2e3)) {
                    this.clickCDTime = i;
                    var n = t.name,
                        a = "goOther_" + (n = n.replace(" ", "_")),
                        o = {};
                    o[a] = a, gameSDK.logEvent(a, 1, o), gameSDK.goToOtherGame(t.id)
                }
            },
            closeLayer: function() {
                this.destroyNode()
            }
        }), cc._RF.pop()
    }, {}],
    TurntableLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "76920vPRR5F66X/LWpqPT18", "TurntableLayer");
        var n = e("NumCalculate"),
            a = e("GameRankData");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                isDestroy: null,
                endIndex: null,
                enableClickMore: null,
                turntableData: null,
                turntableGold: null,
                lightPointList: [],
                openRank: null,
                gameRankData: null,
                isRank: null,
                isClose: null
            },
            onDestroy: function() {
                this.isDestroy = !0, this.isInit = null, this.endIndex = null, this.enableClickMore = null, this.turntableData = null, this.turntableGold = null, this.lightPointList = null, this.openRank = null, this.gameRankData = null, this.isRank = null, this.isClose = null
            },
            destroyNode: function() {
                this.isDestroy = !0, this.node.getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("morebtn").off(cc.Node.EventType.TOUCH_END, this.clickMoreFun, this), this.node.getChildByName("turntablezhizhenbtn").off(cc.Node.EventType.TOUCH_END, this.turntablezhizhenbtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function() {
                if (1 != this.isInit) {
                    if (this.isDestroy = !1, this.isClose = !0, this.node.getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.getChildByName("morebtn").on(cc.Node.EventType.TOUCH_END, this.clickMoreFun, this), this.node.getChildByName("turntablezhizhenbtn").on(cc.Node.EventType.TOUCH_END, this.turntablezhizhenbtnFun, this), guideTurnNoviceLayer) guideTurnNoviceLayer.active = !0, guideTurnNoviceLayer.getComponent("NoviceLayer").resetLayer(0, 50, "click here");
                    this.endIndex = 0, this.turntableData = {}, this.initTurnTable();
                    for (var e = 0, t = 0; t < 16; t++) {
                        var i = this.getNewPoint(e, 303),
                            n = new cc.Node;
                        n.addComponent(cc.Sprite), n.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight"), this.node.addChild(n), n.x = i.x, n.y = i.y + 45, this.lightPointList.push(n), e += 22.5
                    }
                    this["runType" + parseInt(2 + 3 * Math.random())](), this.openRank = !1, this.gameRankData = new a, this.gameRankData.initialize(), this.isRank = !1, this.updateTimes = 59, this.isInit = !0
                    if(gameSDKName == faceBookSDKTest){
                        this.node.getChildByName("morebtn").active = false;  
                    }
                }
            },
            getNewPoint: function(e, t) {
                var i = (e = -1 * e + 90) * Math.PI / 180,
                    n = Math.cos(i) * t,
                    a = Math.sin(i) * t;
                return cc.v2(n, a)
            },
            initTurnTable: function() {
                var e = 0,
                    t = heroData.shopData.lastFishID();
                gameConfigData.fishConfig[t[0]].level;
                for (var i in this.turntableData = gameConfigData.turntableData, this.turntableGold = new Object, heroData.shopData.refreshLastFishFun(), gameConfigData.turntableData) {
                    var a = gameConfigData.turntableData[i],
                        o = new cc.Node;
                    o.addComponent(cc.Sprite), 1 == a.type ? o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablegolds") : 2 == a.type ? o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg02_plist, "diamonds") : 3 == a.type ? o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablefishing") : 4 == a.type ? o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablespeedup") : 5 == a.type && (o.getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntabletank")), this.node.getChildByName("turntablebg2").addChild(o), o.rotation = 45 * e, o.setPosition(this.getNewPoint(45 * e, 200));
                    var s = this.node.getChildByName("turntablebg2").getChildByName("count" + (e + 1) + "art");
                    if (s.rotation = 45 * e, s.setPosition(this.getNewPoint(45 * e, 155)), 1 == a.type) {
                        this.turntableGold[i] = new n, this.turntableGold[i].loadSaveData(gameConfigData.fishConfig[heroData.shopData.lastBuyFishID].turntableGold);
                        var l = new n;
                        if (l.loadSaveData(a.count), this.turntableGold[i].multiplicationNum(l), gameConfigData.transformationProfit.basicGoldProfit > 1) {
                            var r = new n;
                            r.loadSaveData([gameConfigData.transformationProfit.basicGoldProfit]), this.turntableGold[i].multiplicationNum(r)
                        }
                        s.getComponent("GameArtWord").setString(this.turntableGold[i].getNumText(1))
                    } else if (2 == a.type) {
                        var c = new n;
                        c.loadSaveData(a.count), s.getComponent("GameArtWord").setString(c.getNumText()), this.turntableData[i].numCalculate = c
                    } else 4 == a.type ? s.getComponent("GameArtWord").setString(a.count + "S") : s.active = !1;
                    e++
                }
                this.enableClickMore = !0, this.setNumber(heroData.turntableTimes), this.showHideBtn()
            },
            showHideBtn: function() {
                heroData.turntableAdvTimes > 0 ? (this.node.getChildByName("morebtn").active = !0, this.node.getChildByName("morebtn2").active = !1, cc.sys.isMobile, this.node.getChildByName("morebtn").getChildByName("watchadimg").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg")) : (this.node.getChildByName("morebtn").active = !1, this.node.getChildByName("morebtn2").active = !0, cc.sys.isMobile, this.node.getChildByName("morebtn2").getChildByName("watchadimg2").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.mastloadimg01_plist, "watchadimg2"))
            },
            startTurn: function() {
                var e = this;
                this.isClose = !1, this.node.getChildByName("turntablefaguang").active = !1, gameSDK.logEvent("turnCount", 1, {
                    turnCount: "turnCount"
                }), this.enableClickMore = !1;
                var t = this.getEndIndex(),
                    i = t.endIndex;
                this.node.getChildByName("turntablebg2").runAction(cc.sequence(cc.rotateBy(4, 1800 - 45 * i + 45 * this.endIndex).easing(cc.easeInOut(4)), cc.callFunc(function() {
                    e.node.getChildByName("turntablefaguang").active = !0, e["runType" + parseInt(2 + 3 * Math.random())](), e.getReward(t.key), mainSceneContol.mainTurntableLayerComponent.minusTurntableTimes(), e.setNumber(heroData.turntableTimes)
                }), cc.delayTime(.1), cc.callFunc(function() {
                    e.isClose = !0
                }))), this.endIndex = i, this.runType1()
            },
            getReward: function(e) {
                var t = gameConfigData.turntableData[e];
                if (3 != t.type && 5 != t.type && (this.enableClickMore = !0), t.double) {
                    var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.popcommon_prefab);
                    engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UITopzIndex);
                    var n = i.addComponent("DoubleRewardLayer");
                    1 == t.type ? n.numCalculate = this.turntableGold[e] : n.numCalculate = this.turntableData[e].numCalculate, n.initialize(t.type)
                } else 1 == t.type ? (mainSceneContol.gamePlayLayerComponent.addRewardParticle(1), heroData.gamePlayData.addGold(this.turntableGold[e])) : 2 == t.type ? (mainSceneContol.gamePlayLayerComponent.addRewardParticle(2), heroData.gamePlayData.addDiamond(this.turntableData[e].numCalculate)) : 3 == t.type ? this.openFishingFun("fishing") : 4 == t.type ? (1 == heroData.watchUpTimes && (heroData.watchUpTimes = 2, heroData.saveHeroData()), heroData.speedUpFun(1e3 * this.turntableData[e].count)) : this.openFishingFun("tank")
            },
            setNumber: function(e) {
                var t = this.node.getChildByName("numbertxt").getComponent(cc.Label),
                    i = t.string.replace(/[\d]+/, e);
                t.string = i
            },
            getEndIndex: function() {
                if (!guideTurnNoviceLayer) {
                    if (turntableCheatData[0] == heroData.turntableTimes || turntableCheatData[1] == heroData.turntableTimes) return Math.random() > .5 ? {
                        endIndex: 1,
                        key: "1002"
                    } : {
                        endIndex: 6,
                        key: "1007"
                    };
                    var e = 100 * Math.random(),
                        t = 0,
                        i = 0;
                    for (var n in gameConfigData.turntableData) {
                        if (e <= (i += gameConfigData.turntableData[n].probability)) return {
                            endIndex: t,
                            key: n
                        };
                        t++
                    }
                    return {
                        endIndex: t,
                        key: n
                    }
                }
                var a = guideTurnNoviceLayer.getComponent("NoviceLayer");
                return "fishing" == a.typeStr ? (guideTurnNoviceLayer.getComponent("NoviceLayer").hideLayer(), {
                    endIndex: 1,
                    key: "1002"
                }) : "guess" == a.typeStr ? (guideTurnNoviceLayer.getComponent("NoviceLayer").hideLayer(), {
                    endIndex: 6,
                    key: "1007"
                }) : void 0
            },
            getAngle: function(e, t) {
                var i = Math.atan((e.x - t.x) / (e.y - t.y)) / Math.PI * 180;
                return e.y < t.y && (e.x < t.x ? i -= 180 : i += 180), i
            },
            clickMoreFun: function() {
                var e = this;
                gameSDK.logEvent("turnShare", 1, {
                    turnShare: "turnShare"
                }), heroData.turntableAdvTimes > 0 && (1 == cc.sys.isMobile ? gameSDK.showRewardVideoAd(advCode4, function() {
                    e.refreshTimesFun()
                }) : gameSDK.newCreateInterstitialAd(advCode12, function() {
                    e.refreshTimesFun()
                }, function() {
                    tooltipFun(gameConfigData.tipsTxtConfig.advFail1)
                }, function() {
                    gameSDK.logEvent("zhuanpan_share_dianji", 1, {
                        zhuanpan_share_dianji: "zhuanpan_share_dianji"
                    });
                    var t = mainSceneContol.getShareData();
                    gameSDK.sendFaceBookFriend(function() {
                        gameSDK.logEvent("zhuanpan_share_dianji_chenggong", 1, {
                            zhuanpan_share_dianji_chenggong: "zhuanpan_share_dianji_chenggong"
                        }), e.refreshTimesFun()
                    }, function() {
                        gameSDK.logEvent("zhuanpan_share_dianji_shibai", 1, {
                            zhuanpan_share_dianji_shibai: "zhuanpan_share_dianji_shibai"
                        })
                    }, t)
                }))
            },
            refreshTimesFun: function() {
                heroData.turntableAdvTimes -= 2, mainSceneContol.mainTurntableLayerComponent.addTurntableTimes(2), this.node && (this.setNumber(heroData.turntableTimes), this.showHideBtn())
            },
            turntablezhizhenbtnFun: function() {
                if (this.enableClickMore)
                    if (guideTurnNoviceLayer) this.startTurn();
                    else if (heroData.turntableTimes > 0) this.startTurn();
                else {
                    var e = engine.gameData.dataDic.language;
                    mainSceneContol.gamePlayLayerComponent.popNotice(e[1010].content)
                }
            },
            runType1: function() {
                var e = this;
                this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    for (var t = 0; t < e.lightPointList.length; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t % 2 == 0 ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight")
                }), cc.delayTime(.1), cc.callFunc(function() {
                    for (var t = 0; t < e.lightPointList.length; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t % 2 == 0 ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2")
                })).repeatForever())
            },
            runType2: function() {
                var e = this;
                this.node.stopAllActions();
                for (var t = 0; t < e.lightPointList.length; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight");
                var i = e.lightPointList.length,
                    n = 0;
                this.node.runAction(cc.sequence(cc.callFunc(function() {
                    for (var t = 0; t < i; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t == n || t == n - 1 || t == i - n || t == i - (n - 1) ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2");
                    ++n >= e.lightPointList.length - 1 && (n = 0)
                }), cc.delayTime(.1)).repeatForever())
            },
            runType3: function() {
                var e = this;
                this.node.stopAllActions();
                for (var t = 0; t < e.lightPointList.length; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight");
                var i = e.lightPointList.length,
                    n = 0;
                this.node.runAction(cc.sequence(cc.callFunc(function() {
                    for (var t = 0; t < i; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t == n || t == n - 1 || t == n + 1 || t == n + 2 || t == n + 3 ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2");
                    ++n >= e.lightPointList.length - 1 && (n = 0)
                }), cc.delayTime(.2)).repeatForever())
            },
            runType4: function() {
                var e = this;
                this.node.stopAllActions();
                for (var t = 0; t < e.lightPointList.length; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight");
                var i = e.lightPointList.length,
                    n = 0;
                this.node.runAction(cc.sequence(cc.callFunc(function() {
                    if (n <= e.lightPointList.length - 1)
                        for (var t = 0; t < i; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t < n || t > i - n - 1 ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2");
                    else
                        for (t = 0; t < i; t++) e.lightPointList[t].getComponent(cc.Sprite).spriteFrame = t < n - i || t > i - (n - i) - 1 ? engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight2") : engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.turntablep_plist, "turntablelight");
                    ++n >= 2 * e.lightPointList.length - 1 && (n = 1)
                }), cc.delayTime(.1)).repeatForever())
            },
            clickClosebtnFun: function() {
                0 != this.isClose && this.destroyNode()
            },
            openFishingFun: function(e) {
                var t, i, n = this,
                    a = rankGameRankData.getRankData(1),
                    o = a.length,
                    s = parseInt(Math.random() * o),
                    l = a[s],
                    r = 0;
                if (!l || 0 == l.length) {
                    var c = getGolRankTestData();
                    l = c[r = parseInt(Math.random() * c.length)]
                }
                if ("fishing" == e) t = n.createShotFishFun(l, !0), i = t.getComponent("FishingLayer");
                else {
                    var d = function(e, t) {
                            return parseInt(Math.random() * (t - e + 1) + e, 10)
                        },
                        h = null,
                        g = null;
                    if (o >= 3) {
                        for (var u = d(0, o - 3); u < o; u++)
                            if (u != s)
                                if (null == h) h = a[u];
                                else if (null == g) {
                            g = a[u];
                            break
                        }
                        ccLog("已拉到排行里另外两个好友:"), ccLog(h), ccLog(g)
                    }
                    if (null == h || null == g) {
                        for (var m = getGolRankTestData(), f = d(0, m.length - 3); f < m.length; f++)
                            if (f != r)
                                if (null == h) h = m[f];
                                else if (null == g) {
                            g = m[f];
                            break
                        }
                        ccLog("排行没拉到用的两个虚假好友:"), ccLog(h), ccLog(g)
                    }
                    t = n.createGuessFishFun(l, [h, g]), i = t.getComponent("GuessLayer")
                }
                i.shotFishMaskFun(1), this.node.zIndex = UIzIndexInfo.UIBoxIndex2, mainSceneContol.mainLayer.active = !1, mainSceneContol.bgLayer.active = !1, this.node.stopAllActions(), this.node.getChildByName("masknode").active = !1, this.node.runAction(cc.sequence(cc.spawn(cc.moveBy(.6, 0, -n.node.getChildByName("masknode").height), cc.scaleTo(.6, 2, 2), cc.fadeOut(.6)), cc.callFunc(function() {
                    n.enableClickMore = !0, n.node.active = !1, i.shotFishMaskFun(2)
                })))
            },
            createShotFishFun: function(e, t) {
                var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fishing_prefab);
                engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotFishIndex);
                var n = i.addComponent("FishingLayer");
                return n.initialize(this.node, t), n.initData(e), i
            },
            createGuessFishFun: function(e, t) {
                var i = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.fishing_guess_prefab);
                engine.gameAdapterInfo.addSceneNode(i, engine.gameAdapterInfo.getPercentageX(.5), engine.gameAdapterInfo.getPercentageY(.5), UIzIndexInfo.UIShotFishIndex);
                var n = i.addComponent("GuessLayer");
                return n.initialize(this.node), n.initData(e, t), i
            },
            getTimeString: function(e) {
                var t = parseInt(e / 60).toString();
                t.length > 2 ? t = "99" : t.length < 2 && (t = "0" + t);
                var i = parseInt(e % 60).toString();
                return i.length < 2 && (i = "0" + i), t + ":" + i
            },
            update: function(e) {
                if (!0 === this.isInit && (this.updateTimes += 1, this.updateTimes >= 20))
                    if (this.updateTimes = 0, this.setNumber(heroData.turntableTimes), heroData.turntableTimes >= 0 && heroData.turntableTimes < gameConfigData.turntableWaitMaxTimes) {
                        var t = mainSceneContol.mainTurntableLayerComponent.getRemainingTime(),
                            i = this.getTimeString(t);
                        this.node.getChildByName("freeTimetxt").active = !0, this.node.getChildByName("freeTimetxt").getComponent(cc.Label).string = i
                    } else this.node.getChildByName("freeTimetxt").active = !1
            }
        }), cc._RF.pop()
    }, {
        GameRankData: "GameRankData",
        NumCalculate: "NumCalculate"
    }],
    TurntableRevengeItem: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "756a4NdytJBKbX1YXWm4IMi", "TurntableRevengeItem");
        var n = e("GameExternalImage");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInit: !1,
                itemData: null
            },
            onDestroy: function() {
                this.isInit = null, this.itemData = null
            },
            destroyNode: function() {
                this.node.destroy()
            },
            initialize: function(e) {
                1 != this.isInit && (this.itemData = e, this.initUI(), this.isInit = !0)
            },
            initUI: function() {
                var e = new n;
                e.loadImage(this.itemData.photo, null, 70, 70), this.node.getChildByName("rankbgimgsp").getChildByName("playericonnode").addChild(e), this.node.getChildByName("rankbgimgsp").getChildByName("playernametxt").getComponent(cc.Label).string = this.itemData.name, this.node.getChildByName("rankbgimgsp").getChildByName("revengebtn").on(cc.Node.EventType.TOUCH_END, this.attackFun, this), this.itemData.random ? this.node.getChildByName("rankbgimgsp").getChildByName("revengebtn").getChildByName("fishingUiAttacksp").getComponent(cc.Sprite).spriteFrame = engine.gameMemoryManagement.getSpriteFrame(mustLoadImage.fishingimg1p_plist, "fishingUiRandom") : this.itemData.revengeCount >= 1 && (this.node.getChildByName("fishingcountsp").active = !0, this.node.getChildByName("fishingcountsp").getChildByName("revengecount").getComponent(cc.Label).string = this.itemData.revengeCount)
            },
            attackFun: function() {
                this.node.parent.parent.parent.parent.parent.parent.parent.getComponent("FishingLayer").refreshLayerFun(this.itemData, !1)
            }
        }), cc._RF.pop()
    }, {
        GameExternalImage: "GameExternalImage"
    }],
    TurntableRevengeLayer: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e12e5kgL2ZEbL5zmpQTrGvT", "TurntableRevengeLayer"), cc.Class({
            extends: cc.Component,
            properties: {
                isInit: null,
                scrollViewContent: null,
                nodeScrollView: null,
                itemScrollDataList: null,
                lastScrollViewContentY: null,
                myRankItem: null,
                haveInitFriend: null,
                haveLoadFriend: null,
                haveRandomRevenge: null,
                selectFriendList: null,
                listType: null
            },
            onDestroy: function() {
                this.isInit = null, this.scrollViewContent = null, this.nodeScrollView = null, this.itemScrollDataList = null, this.lastScrollViewContentY = null, this.myRankItem = null, this.haveInitFriend = null, this.haveLoadFriend = null, this.haveRandomRevenge = null, this.selectFriendList = null, this.listType = null
            },
            destroyNode: function() {
                this.node.getChildByName("rankbgsp").getChildByName("closebtn").off(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.node.destroy()
            },
            onLoad: function() {
                this.initialize()
            },
            initialize: function(e) {
                1 != this.isInit && (this.listType = e, this.haveInitFriend = !1, this.haveLoadFriend = !1, this.node.getChildByName("rankbgsp").getChildByName("closebtn").on(cc.Node.EventType.TOUCH_END, this.clickClosebtnFun, this), this.nodeScrollView = this.node.getChildByName("rankbgsp").getChildByName("rankscv").getComponent(cc.ScrollView), this.scrollViewContent = this.nodeScrollView.content, rankGameRankData.loadFriendRankDataBySDK(15), this.isInit = !0)
            },
            getShareData: function() {
                var e = new Object;
                return e.pngData = [{
                    url: gameSDK.sdkPlayInfo.photo,
                    posX: 79,
                    posY: 90,
                    imgWidth: 163,
                    imgHeight: 163
                }, {
                    url: cc.url.raw("resources/invbg.png"),
                    posX: 0,
                    posY: 0,
                    imgWidth: 750,
                    imgHeight: 380
                }], e.width = 750, e.height = 380, e
            },
            initData: function(e) {
                this.itemScrollDataList = [];
                for (var t = 0; t < e.length; t++) this.itemScrollDataList[t] = {}, this.itemScrollDataList[t].itemData = e[t], this.itemScrollDataList[t].y = -125 * t;
                this.scrollViewContent.height = 125 * e.length
            },
            selectFriend: function() {
                var e = gameSDK.sdkPlayInfo.friendsList;
                for (var t in e) this.selectFriendList[0].playerID != t && this.selectFriendList.push(e[t])
            },
            selectRevenge: function() {
                for (var e = rankGameRankData.getRankData(2), t = 0; t < e.length; t++) {
                    var i = e[t].playerID,
                        n = e[t].data;
                    if ("" != n) try {
                        var a = JSON.parse(n).attackTable;
                        a && a[FBInstant.player.getID()] && i != FBInstant.player.getID() && (heroData.attackTable[i] ? a[FBInstant.player.getID()] > heroData.attackTable[i] && this.selectFriendList[0].playerID != i && (e[t].revengeCount = a[FBInstant.player.getID()] - heroData.attackTable[i], this.selectFriendList.push(e[t])) : this.selectFriendList[0].playerID != i && (e[t].revengeCount = a[FBInstant.player.getID()], this.selectFriendList.push(e[t])))
                    } catch (e) {}
                }
            },
            randomRevenge: function() {
                this.selectFriendList = [];
                var e = rankGameRankData.getRankData(1)[parseInt(Math.random() * rankGameRankData.getRankData(1).length)];
                if (!e || 0 == e.length) {
                    var t = getGolRankTestData();
                    e = t[parseInt(Math.random() * t.length)]
                }
                e.random = !0, this.selectFriendList.push(e)
            },
            update: function() {
                if (this.selectFriendList || (this.randomRevenge(), this.initData(this.selectFriendList)), "friends" == this.listType ? gameSDK.sdkPlayInfo.friendsList && 0 == this.haveInitFriend && (this.haveInitFriend = !0, this.selectFriend(), this.initData(this.selectFriendList)) : 0 == rankGameRankData.getRankData(2).length && 0 == this.haveLoadFriend ? (ccLog("+++++++++++++++++++++++"), ccLog(JSON.stringify(rankGameRankData.getRankData(2))), this.haveLoadFriend = !0, rankGameRankData.loadFriendRankDataBySDK()) : rankGameRankData.getRankData(2).length >= 1 && 0 == this.haveInitFriend && (ccLog("-----------------------"), ccLog(JSON.stringify(rankGameRankData.getRankData(2))), this.haveInitFriend = !0, this.selectRevenge(), this.initData(this.selectFriendList)), this.scrollViewContent.y != this.lastScrollViewContentY) {
                    this.lastScrollViewContentY = this.scrollViewContent.y;
                    for (var e = 0; e < this.itemScrollDataList.length; e++) {
                        var t = this.itemScrollDataList[e],
                            i = t.y + this.scrollViewContent.y;
                        if (i <= 500 && i >= -350) {
                            if (!t.revengeItem) {
                                var n = engine.gameMemoryManagement.getPrefab(mustLoadPrefab.turntable_revenge_item_prefab);
                                t.revengeItem = n;
                                var a = n.addComponent("TurntableRevengeItem");
                                this.scrollViewContent.addChild(n), n.x = 0, n.y = t.y - 60, a.shopLayer = this, a.initialize(t.itemData)
                            }
                            t.revengeItem.active = !0
                        } else t.revengeItem && (t.revengeItem.active = !1)
                    }
                }
            },
            clickClosebtnFun: function() {
                var e = this;
                this.node.getChildByName("rankbgsp").runAction(cc.sequence(cc.moveTo(.1, 0, 1200), cc.callFunc(function() {
                    e.node.active = !1, e.node.parent.getChildByName("fishingUi1sp").getChildByName("revengebtn").active = !0, e.node.parent.getChildByName("fishingUi1sp").getChildByName("revenge2btn").active = !1, e.node.parent.getChildByName("fishingUi1sp").getChildByName("friendsbtn").active = !0, e.node.parent.getChildByName("fishingUi1sp").getChildByName("friends2btn").active = !1
                })))
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["Engine", "GameAdapterInfo", "GameAnimation", "GameArtWord", "GameCustomImage", "GameExternalImage", "GameLanguageSprite", "GameSoundButton", "ShowAllFitHeight", "GameData", "NumCalculate", "TileMapData", "TileMapLayerData", "GameBackgroundLoad", "GameMemoryManagement", "GameSoundLoad", "LoadControl", "GameLog", "HttpControl", "HttpSendData", "GameSound", "GameTime", "Game", "GameGlobal", "Resource", "GameConfigData", "GamePlayData", "GameRankData", "HeroData", "LocalSaveData", "ShopData", "GameSDK", "FaceBookIAD", "FaceBookSDK", "FaceBookSaveData", "FacebookSDKTestData", "LoginFaceBookSDK", "AchievementItem", "AchievementLayer", "AdvAddFishLayer", "BgLayer", "CollectLayer", "CrabNode", "DoubleRewardLayer", "EvolutionBuildLayer", "EvolutionCompleteLayer", "EvolutionLayer", "EvolutionNotLayer", "FishNode", "FishVariationLayer", "FishingLayer", "FishingNode", "FishingUpBg", "FreegoldLayer", "GamePlayLayer", "GuessLayer", "GuessProfitLayer", "GuessUpBg", "HelpGoldLayer", "HelpLayer", "InvitationItem", "InvitationLayer", "LevelUpItem", "LevelUpLayer", "MainBackLayer", "MainBgLayer", "MainCollectLayer", "MainDownLayer", "MainEvolutionLayer", "MainInvitationLayer", "MainLeftLayer", "MainRankLayer", "MainRightLayer", "MainSetUpLayer2", "MainTaskLayer", "MainTransformationLayer", "MainTurntableLayer", "MessageBtn", "MessageLayer", "MoveFishTips", "NetworkingMaskLayer", "NewCategoryLayer", "NoviceLayer", "OfflineLayer", "PromptBoxLayer", "RankItem", "RankLayer", "RecoveryLayer", "RevengeLayer", "ShopItem", "ShopLayer", "ShotProfitLayer", "SpeedUpFinishLayer", "SpeedUpLayer", "TooltipLayer", "TransformationItem", "TransformationLayer", "TransformationOkLayer", "TransformationSaleLayer", "TreasureBoxLayer", "TurnOtherGameLayer", "TurntableLayer", "TurntableRevengeItem", "TurntableRevengeLayer", "LoginSceneControl", "MainBgSceneControl", "MainSceneControl"]);