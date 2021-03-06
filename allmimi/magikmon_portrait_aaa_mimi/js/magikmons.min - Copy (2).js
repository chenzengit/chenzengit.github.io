var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MagikMons;
(function (MagikMons) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, MagikMons.GameConstants.GAME_WIDTH, MagikMons.GameConstants.GAME_HEIGHT, Phaser.AUTO, "content", null, false, true) || this;
            _this.state.add("PreLoader", MagikMons.PreLoader, false);
            _this.state.add("SplashState", MagikMons.SplashState, false);
            _this.state.add("MapState", MagikMons.MapState, false);
            _this.state.add("FightState", MagikMons.FightState, false);
            _this.state.add("AttacksState", MagikMons.AttacksState, false);
            _this.state.add("Boot", MagikMons.Boot, true);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MagikMons.Game = Game;
})(MagikMons || (MagikMons = {}));
window.onload = function () {
    if (MagikMons.GameConstants.SPONSOR !== MagikMons.GameConstants.GAMEPIX && typeof GamePix === "undefined") {
        var game = new MagikMons.Game();
    }
};
var MagikMons;
(function (MagikMons) {
    var AudioManager = (function () {
        function AudioManager() {
        }
        AudioManager.init = function (game) {
            AudioManager.game = game;
            if (MagikMons.GameVars.gameData.muted) {
                AudioManager.game.sound.mute = true;
            }
            else {
                AudioManager.game.sound.mute = false;
            }
            if (!MagikMons.GameConstants.SOUND) {
                AudioManager.mute();
            }
            AudioManager.loopPlayingKey = null;
            AudioManager.audioSprite = AudioManager.game.add.audioSprite("audio-sprite");
        };
        AudioManager.mute = function () {
            MagikMons.GameVars.gameData.muted = true;
            AudioManager.game.sound.mute = true;
        };
        AudioManager.unmute = function () {
            MagikMons.GameVars.gameData.muted = false;
            AudioManager.game.sound.mute = false;
        };
        AudioManager.playSound = function (key, loop, volume, fade) {
            loop = loop || false;
            if (loop) {
                if (AudioManager.loopPlayingKey && (AudioManager.loopPlayingKey !== key)) {
                    AudioManager.stopSound(AudioManager.loopPlayingKey, true, true);
                    var sound_1 = AudioManager.audioSprite.play(key, volume);
                    sound_1.onDecoded.add(function () {
                        if (fade) {
                            sound_1.fadeIn(1000);
                        }
                    }, this);
                }
                else if (!AudioManager.loopPlayingKey) {
                    var sound_2 = AudioManager.audioSprite.play(key, volume);
                    sound_2.onDecoded.add(function () {
                        if (fade) {
                            sound_2.fadeIn(1000);
                        }
                    }, this);
                }
                AudioManager.loopPlayingKey = key;
            }
            else {
                var sound_3 = AudioManager.audioSprite.play(key, volume);
                sound_3.allowMultiple = true;
                sound_3.onDecoded.add(function () {
                    if (fade) {
                        sound_3.fadeIn(1000);
                    }
                }, this);
            }
        };
        AudioManager.stopSound = function (key, loop, fade) {
            if (key === null || typeof key === "undefined") {
                return;
            }
            if (fade) {
                var sound = AudioManager.audioSprite.get(key);
                sound.fadeOut(1000);
            }
            else {
                AudioManager.audioSprite.stop(key);
            }
            if (loop) {
                AudioManager.loopPlayingKey = null;
            }
        };
        AudioManager.onAudioStateRetrieved = function (audioStateStr) {
            if (audioStateStr !== "") {
                AudioManager.isMuted = JSON.parse(audioStateStr) === true;
            }
            else {
                AudioManager.isMuted = false;
            }
            AudioManager.game.sound.mute = AudioManager.isMuted;
        };
        return AudioManager;
    }());
    MagikMons.AudioManager = AudioManager;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            Boot.currentInstance = this;
            this.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = false;
            this.game.stage.backgroundColor = "#000000";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            if (this.game.device.desktop) {
                MagikMons.GameVars.scaleY = 1;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                MagikMons.GameVars.scaleY = (4 / 3) / (window.innerHeight / window.innerWidth);
                if (MagikMons.GameVars.scaleY > 1) {
                    MagikMons.GameVars.scaleY = 1;
                }
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.isPortrait = false;
                this.game.scale.forceOrientation(true, false);
            }
            if (MagikMons.GameConstants.FPS) {
                this.game.time.advancedTiming = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.path = MagikMons.GameConstants.ASSETS_PATH;
            this.load.image("bus", "/bus.png");
            this.load.text("area1", "/maps/area1.txt");
            this.load.text("area2", "/maps/area2.txt");
            this.load.text("area3", "/maps/area3.txt");
            this.load.text("area4", "/maps/area4.txt");
            this.load.text("area5", "/maps/area5.txt");
            this.load.text("area6", "/maps/area6.txt");
            this.load.text("area7", "/maps/area7.txt");
            this.load.text("area8", "/maps/area8.txt");
            this.load.text("tileset", "/maps/tileset.txt");
        };
        Boot.prototype.create = function () {
            MagikMons.GameVars.jsonsMaps = new Array();
            var tlesetText = this.game.cache.getText("tileset");
            var tilesetObj = JSON.parse(this.decode(tlesetText));
            for (var i = 1; i <= 8; i++) {
                var text = this.game.cache.getText("area" + i);
                var obj = JSON.parse(this.decode(text));
                obj.tilesets = tilesetObj.tilesets;
                MagikMons.GameVars.jsonsMaps.push(obj);
            }
            MagikMons.GameManager.init(Boot.currentInstance.game);
        };
        Boot.prototype.decode = function (s) {
            for (var i = 0; i < s.length; i++) {
                if (s.charAt(i) === "*") {
                    var num = 0;
                    if (s.charAt(i + 3) === "*") {
                        num = 1;
                    }
                    else if (s.charAt(i + 4) === "*") {
                        num = 2;
                    }
                    else if (s.charAt(i + 5) === "*") {
                        num = 3;
                    }
                    else if (s.charAt(i + 6) === "*") {
                        num = 4;
                    }
                    else if (s.charAt(i + 7) === "*") {
                        num = 5;
                    }
                    var aaa = "";
                    var num2 = parseInt(s.substring(i + 2, i + 2 + num));
                    for (var i_1 = 0; i_1 < num2; i_1++) {
                        aaa = aaa + "A";
                    }
                    s = s.substring(0, i) + aaa + s.substring(i + 3 + num);
                }
            }
            return s;
        };
        Boot.prototype.createNormal = function () {
            var request = new XMLHttpRequest();
            request.open('GET', "assets/maps/maps.zip", true);
            request.responseType = 'blob';
            request.onload = function () {
                var reader = new FileReader();
                reader.readAsArrayBuffer(request.response);
                reader.onload = function (e) {
                    var zip = new JSZip();
                    zip.loadAsync(e)
                        .then(function (unzip) {
                        console.log("DONE!");
                        zip.file("area1.json").async("string").then(function (json) {
                            MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                            zip.file("area2.json").async("string").then(function (json) {
                                MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                zip.file("area3.json").async("string").then(function (json) {
                                    MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                    zip.file("area4.json").async("string").then(function (json) {
                                        MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                        zip.file("area5.json").async("string").then(function (json) {
                                            MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                            zip.file("area6.json").async("string").then(function (json) {
                                                MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                                zip.file("area7.json").async("string").then(function (json) {
                                                    MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                                    zip.file("area8.json").async("string").then(function (json) {
                                                        MagikMons.GameVars.jsonsMaps.push(JSON.parse(json));
                                                        MagikMons.GameManager.init(Boot.currentInstance.game);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    }, function (error) {
                        console.log(error);
                    });
                };
            };
            request.send();
        };
        Boot.prototype.shutdown = function () {
            Boot.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        Boot.prototype.mute = function () {
            this.game.sound.mute = true;
        };
        Boot.prototype.unmute = function () {
            if (!MagikMons.GameVars.gameData.muted) {
                this.game.sound.mute = false;
            }
        };
        return Boot;
    }(Phaser.State));
    MagikMons.Boot = Boot;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var GameConstants = (function () {
        function GameConstants() {
        }
        GameConstants.VERSION = "0.0";
        GameConstants.ASSETS_PATH = "assets";
        GameConstants.DEVELOPMENT = false;
        GameConstants.FPS = false;
        GameConstants.SHOW_COLLISIONS = false;
        GameConstants.REPELENTE = false;
        GameConstants.COLLISIONS = true;
        GameConstants.ANIMATIONS = true;
        GameConstants.VERBOSE = false;
        GameConstants.SOUND = true;
        GameConstants.NONE = "sponsor";
        GameConstants.GAMEPIX = "gamepix";
        GameConstants.POKI = "poki";
        GameConstants.SPONSOR = GameConstants.POKI;
        GameConstants.GAME_WIDTH = 480;
        GameConstants.GAME_HEIGHT = 640;
        GameConstants.START_STATE = "SplashState";
        GameConstants.BITMAP_SIZE = 64;
        GameConstants.TILES_SIZE = 32;
        GameConstants.TILES_SIZE_HALF = GameConstants.TILES_SIZE / 2;
        GameConstants.PLAYER = "player";
        GameConstants.ADVERSARY = "adversary";
        GameConstants.ELEMENT_CLASSIC = "classic";
        GameConstants.ELEMENT_TECH = "tech";
        GameConstants.ELEMENT_SPECTRE = "spectre";
        GameConstants.ELEMENT_COMMON = "common";
        GameConstants.SPECIAL_NONE = "none";
        GameConstants.SPECIAL_ATTACK = "attack";
        GameConstants.SPECIAL_DEFENSE = "defense";
        GameConstants.SPECIAL_HACK = "hack";
        GameConstants.SPECIAL_POISON = "poison";
        GameConstants.SPECIAL_AIM = "aim";
        GameConstants.SPECIAL_RAGE = "rage";
        GameConstants.INITIAL_BUS = 1;
        GameConstants.TUTORIAL_ESCAPE = 2;
        GameConstants.TUTORIAL_WAND = 3;
        GameConstants.TUTORIAL_ATTACK = 4;
        GameConstants.TUTORIAL_HEAL = 5;
        GameConstants.TUTORIAL_CRAFT = 6;
        GameConstants.TUTORIAL_CAPTURE = 7;
        GameConstants.TUTORIAL_SWAP = 8;
        GameConstants.TUTORIAL_SWAP_2 = 9;
        GameConstants.TUTORIAL_NO_CAPTURE = 10;
        GameConstants.TUTORIAL_MAP = 11;
        GameConstants.TUTORIAL_FINISHED = 12;
        GameConstants.START_MKM_CLASSIC = "002";
        GameConstants.START_MKM_TECH = "007";
        GameConstants.START_MKM_SPECTRE = "011";
        GameConstants.X_IN_PLAYER = -130;
        GameConstants.X_OUT_PLAYER = -430;
        GameConstants.X_IN_ADVERSARY = 110;
        GameConstants.X_OUT_ADVERSARY = 410;
        GameConstants.Y_PLAYER = 220;
        GameConstants.Y_ADVERSARY = 0;
        GameConstants.CHANGE_TIME = 500;
        GameConstants.ACTIONS_NUMBER = 16;
        GameConstants.FIGHT_ACTIONS = 4;
        GameConstants.MAX_ATTACK = 100;
        GameConstants.MAX_DEFENSE = 100;
        GameConstants.MAX_AIM = 100;
        GameConstants.INCREMENT_STATS = 8;
        GameConstants.CRITICAL_MULTIPLIER = 1.5;
        GameConstants.STRONG_MULTIPLIER = 1.5;
        GameConstants.WEAK_MULTIPLIER = .5;
        GameConstants.RAGE_MULTIPLIER = 3;
        GameConstants.XP = 100;
        GameConstants.ITEM_PRICES = [100, 200, 200, 200, 150, 150, 150];
        GameConstants.TRAINER_FIGHT = "trainer fight";
        GameConstants.MONSTER_FIGHT = "magikmon fight";
        GameConstants.ATTACK_NORMAL = "normal";
        GameConstants.ATTACK_WEAK = "weak";
        GameConstants.ATTACK_STRONG = "strong";
        GameConstants.LEVEL_ATTACK_1 = 3;
        GameConstants.LEVEL_ATTACK_2 = 7;
        GameConstants.LEVEL_ATTACK_3 = 12;
        GameConstants.MAX_LEVEL = 20;
        GameConstants.NO_CHANGE = "no change";
        GameConstants.PLAYER_CHANGE = "player change";
        GameConstants.ADVERSARY_CHANGE = "adversary change";
        GameConstants.MINIMUM_STEPS = 10;
        GameConstants.BITMAPDATA_SIZE = 64;
        GameConstants.RED_SQUARE = "red square";
        GameConstants.WHITE_SQUARE = "white square";
        GameConstants.BLACK_SQUARE = "black square";
        GameConstants.BLUE_SQUARE = "blue square";
        GameConstants.DARK_BLUE_SQUARE = "dark blue square";
        GameConstants.GREEN_SQUARE = "green square";
        GameConstants.ORANGE_SQUARE = "orange square";
        GameConstants.GRAY_SQUARE = "gray square";
        GameConstants.LILAC_SQUARE = "lilac square";
        GameConstants.GRADIENT_TEAM_1 = "gradient team 1";
        GameConstants.GRADIENT_TEAM_2 = "gradient team 2";
        GameConstants.GRADIENT_TEAM_3 = "gradient team 3";
        GameConstants.GRADIENT_ITEMS_1 = "gradient items 1";
        GameConstants.GRADIENT_ITEMS_2 = "gradient items 2";
        GameConstants.GRADIENT_CLASSIC = "classic";
        GameConstants.GRADIENT_SPECTRE = "spectre";
        GameConstants.GRADIENT_TECH = "tech";
        GameConstants.GRADIENT_TECH_1 = "gradient fight 1";
        GameConstants.GRADIENT_TECH_2 = "gradient fight 2";
        GameConstants.GRADIENT_TECH_3 = "gradient fight 3";
        GameConstants.GRADIENT_SPECTRE_1 = "gradient spectre 1";
        GameConstants.GRADIENT_SPECTRE_2 = "gradient spectre 2";
        GameConstants.GRADIENT_SPECTRE_3 = "gradient spectre 3";
        GameConstants.GRADIENT_CLASSIC_1 = "gradient classic 1";
        GameConstants.GRADIENT_CLASSIC_2 = "gradient classic 2";
        GameConstants.GRADIENT_CLASSIC_3 = "gradient classic 3";
        GameConstants.GRADIENT_NEUTRAL_1 = "gradient neutral 1";
        GameConstants.GRADIENT_NEUTRAL_2 = "gradient neutral 2";
        GameConstants.GRADIENT_NEUTRAL_3 = "gradient neutral 3";
        GameConstants.GRADIENT_BLACK = "gradient black";
        GameConstants.ENGLISH = "en";
        GameConstants.SPANISH = "es";
        GameConstants.CATALAN = "cat";
        GameConstants.AUDIO_STATE_KEY = "lights-on-audio";
        GameConstants.SAVED_GAME_DATA_KEY = "mm-game-data-key";
        return GameConstants;
    }());
    MagikMons.GameConstants = GameConstants;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.init = function (game) {
            if (typeof GamePix !== "undefined") {
                GamePix.pause = function () {
                    GameManager.game.paused = true;
                };
                GamePix.resume = function () {
                    GameManager.game.paused = false;
                };
                GamePix.soundOn = function () {
                    GameManager.game.sound.mute = true;
                };
                GamePix.soundOff = function () {
                    if (!MagikMons.GameVars.gameData.muted) {
                        GameManager.game.sound.mute = false;
                    }
                };
                if (GamePix.CONT) {
                    GamePix.ping(GamePix.CONT.START_PLAY);
                }
            }
            else if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                GameManager.checkPoki();
                GameManager.correctUrl(game);
            }
            else if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.GAMEPIX) {
                GameManager.correctUrl(game);
            }
            else {
                console.log("WRONG URL");
            }
        };
        GameManager.checkPoki = function () {
            var _0xd244 = ["\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D", "", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x63\x68\x61\x72\x41\x74", "\x5F\x6B\x65\x79\x53\x74\x72", "\x6C\x65\x6E\x67\x74\x68", "\x72\x65\x70\x6C\x61\x63\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x6E", "\x61\x48\x52\x30\x63\x44\x6F\x76\x4C\x32\x78\x76\x59\x32\x46\x73\x61\x47\x39\x7A\x64\x43\x38\x3D", "\x61\x48\x52\x30\x63\x48\x4D\x36\x4C\x79\x39\x78\x59\x53\x31\x6D\x61\x57\x78\x6C\x63\x79\x35\x77\x62\x32\x74\x70\x4C\x6D\x4E\x76\x62\x51\x3D\x3D", "\x61\x48\x52\x30\x63\x48\x4D\x36\x4C\x79\x39\x6E\x59\x57\x31\x6C\x4C\x57\x4E\x6B\x62\x69\x35\x77\x62\x32\x74\x70\x4C\x6D\x4E\x76\x62\x51\x3D\x3D", "\x61\x48\x52\x30\x63\x44\x6F\x76\x4C\x32\x78\x76\x59\x32\x46\x73\x61\x47\x39\x7A\x64\x44\x6F\x3D", "\x64\x65\x63\x6F\x64\x65", "\x68\x72\x65\x66", "\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x73\x75\x62\x73\x74\x72", "\x61\x48\x52\x30\x63\x44\x6F\x76\x4C\x33\x42\x76\x4C\x6D\x74\x70\x4C\x33\x4E\x70\x64\x47\x56\x73\x62\x32\x4E\x72\x63\x6D\x56\x6B\x61\x58\x4A\x6C\x59\x33\x51\x3D", "\x74\x6F\x70"];
            (function checkInit() { var _0xb98ex2 = { _keyStr: _0xd244[0], encode: function (_0xb98ex3) { var _0xb98ex4 = _0xd244[1]; var _0xb98ex5, _0xb98ex6, _0xb98ex7, _0xb98ex8, _0xb98ex9, _0xb98exa, _0xb98exb; var _0xb98exc = 0; _0xb98ex3 = _0xb98ex2._utf8_encode(_0xb98ex3); while (_0xb98exc < _0xb98ex3[_0xd244[5]]) {
                    _0xb98ex5 = _0xb98ex3[_0xd244[2]](_0xb98exc++);
                    _0xb98ex6 = _0xb98ex3[_0xd244[2]](_0xb98exc++);
                    _0xb98ex7 = _0xb98ex3[_0xd244[2]](_0xb98exc++);
                    _0xb98ex8 = _0xb98ex5 >> 2;
                    _0xb98ex9 = (_0xb98ex5 & 3) << 4 | _0xb98ex6 >> 4;
                    _0xb98exa = (_0xb98ex6 & 15) << 2 | _0xb98ex7 >> 6;
                    _0xb98exb = _0xb98ex7 & 63;
                    if (isNaN(_0xb98ex6)) {
                        _0xb98exa = _0xb98exb = 64;
                    }
                    else {
                        if (isNaN(_0xb98ex7)) {
                            _0xb98exb = 64;
                        }
                    }
                    ;
                    _0xb98ex4 = _0xb98ex4 + this[_0xd244[4]][_0xd244[3]](_0xb98ex8) + this[_0xd244[4]][_0xd244[3]](_0xb98ex9) + this[_0xd244[4]][_0xd244[3]](_0xb98exa) + this[_0xd244[4]][_0xd244[3]](_0xb98exb);
                } ; return _0xb98ex4; }, decode: function (_0xb98ex3) { var _0xb98ex4 = _0xd244[1]; var _0xb98ex5, _0xb98ex6, _0xb98ex7; var _0xb98ex8, _0xb98ex9, _0xb98exa, _0xb98exb; var _0xb98exc = 0; _0xb98ex3 = _0xb98ex3[_0xd244[6]](/[^A-Za-z0-9+/=]/g, _0xd244[1]); while (_0xb98exc < _0xb98ex3[_0xd244[5]]) {
                    _0xb98ex8 = this[_0xd244[4]][_0xd244[7]](_0xb98ex3[_0xd244[3]](_0xb98exc++));
                    _0xb98ex9 = this[_0xd244[4]][_0xd244[7]](_0xb98ex3[_0xd244[3]](_0xb98exc++));
                    _0xb98exa = this[_0xd244[4]][_0xd244[7]](_0xb98ex3[_0xd244[3]](_0xb98exc++));
                    _0xb98exb = this[_0xd244[4]][_0xd244[7]](_0xb98ex3[_0xd244[3]](_0xb98exc++));
                    _0xb98ex5 = _0xb98ex8 << 2 | _0xb98ex9 >> 4;
                    _0xb98ex6 = (_0xb98ex9 & 15) << 4 | _0xb98exa >> 2;
                    _0xb98ex7 = (_0xb98exa & 3) << 6 | _0xb98exb;
                    _0xb98ex4 = _0xb98ex4 + String[_0xd244[8]](_0xb98ex5);
                    if (_0xb98exa != 64) {
                        _0xb98ex4 = _0xb98ex4 + String[_0xd244[8]](_0xb98ex6);
                    }
                    ;
                    if (_0xb98exb != 64) {
                        _0xb98ex4 = _0xb98ex4 + String[_0xd244[8]](_0xb98ex7);
                    }
                } ; _0xb98ex4 = _0xb98ex2._utf8_decode(_0xb98ex4); return _0xb98ex4; }, _utf8_encode: function (_0xb98ex3) { _0xb98ex3 = _0xb98ex3[_0xd244[6]](/rn/g, _0xd244[9]); var _0xb98ex4 = _0xd244[1]; for (var _0xb98ex5 = 0; _0xb98ex5 < _0xb98ex3[_0xd244[5]]; _0xb98ex5++) {
                    var _0xb98ex6 = _0xb98ex3[_0xd244[2]](_0xb98ex5);
                    if (_0xb98ex6 < 128) {
                        _0xb98ex4 += String[_0xd244[8]](_0xb98ex6);
                    }
                    else {
                        if (_0xb98ex6 > 127 && _0xb98ex6 < 2048) {
                            _0xb98ex4 += String[_0xd244[8]](_0xb98ex6 >> 6 | 192);
                            _0xb98ex4 += String[_0xd244[8]](_0xb98ex6 & 63 | 128);
                        }
                        else {
                            _0xb98ex4 += String[_0xd244[8]](_0xb98ex6 >> 12 | 224);
                            _0xb98ex4 += String[_0xd244[8]](_0xb98ex6 >> 6 & 63 | 128);
                            _0xb98ex4 += String[_0xd244[8]](_0xb98ex6 & 63 | 128);
                        }
                    }
                } ; return _0xb98ex4; }, _utf8_decode: function (_0xb98ex3) { var _0xb98ex4 = _0xd244[1]; var _0xb98ex5 = 0; var _0xb98ex6 = c1 = c2 = 0; while (_0xb98ex5 < _0xb98ex3[_0xd244[5]]) {
                    _0xb98ex6 = _0xb98ex3[_0xd244[2]](_0xb98ex5);
                    if (_0xb98ex6 < 128) {
                        _0xb98ex4 += String[_0xd244[8]](_0xb98ex6);
                        _0xb98ex5++;
                    }
                    else {
                        if (_0xb98ex6 > 191 && _0xb98ex6 < 224) {
                            c2 = _0xb98ex3[_0xd244[2]](_0xb98ex5 + 1);
                            _0xb98ex4 += String[_0xd244[8]]((_0xb98ex6 & 31) << 6 | c2 & 63);
                            _0xb98ex5 += 2;
                        }
                        else {
                            c2 = _0xb98ex3[_0xd244[2]](_0xb98ex5 + 1);
                            c3 = _0xb98ex3[_0xd244[2]](_0xb98ex5 + 2);
                            _0xb98ex4 += String[_0xd244[8]]((_0xb98ex6 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            _0xb98ex5 += 3;
                        }
                    }
                } ; return _0xb98ex4; } }; var _0xb98exd = [_0xd244[10], _0xd244[11], _0xd244[12], _0xd244[13]]; var _0xb98exe = false; for (var _0xb98ex7 = 0; _0xb98ex7 < _0xb98exd[_0xd244[5]]; _0xb98ex7++) {
                var _0xb98exf = _0xb98ex2[_0xd244[14]](_0xb98exd[_0xb98ex7]);
                var _0xb98ex10 = window[_0xd244[16]][_0xd244[15]];
                if (_0xb98ex10[_0xd244[5]] > _0xb98exf[_0xd244[5]]) {
                    _0xb98ex10 = _0xb98ex10[_0xd244[17]](0, _0xb98exf[_0xd244[5]]);
                }
                ;
                if (_0xb98exf === _0xb98ex10) {
                    _0xb98exe = true;
                    break;
                }
            } ; if (!_0xb98exe) {
                var _0xb98ex11 = _0xd244[18];
                var _0xb98ex12 = _0xb98ex2[_0xd244[14]](_0xb98ex11);
                window[_0xd244[16]][_0xd244[15]] = _0xb98ex12;
                this[_0xd244[19]][_0xd244[16]] !== this[_0xd244[16]] && (this[_0xd244[19]][_0xd244[16]] = this[_0xd244[16]]);
            } })();
        };
        GameManager.correctUrl = function (game) {
            GameManager.game = game;
            GameManager.resetVars();
            GameManager.readGameData();
            MagikMons.GameVars.slotData = MagikMons.GameVars.gameData.slotsData[MagikMons.GameVars.gameData.currentSlot];
        };
        GameManager.resetMapVars = function () {
            MagikMons.GameVars.needWalk = null;
            MagikMons.GameVars.needChangeMkm = null;
            MagikMons.GameVars.currentTrainer = null;
            MagikMons.GameVars.needRemoveTrainer = null;
            MagikMons.GameVars.needDialogueTrainer = null;
            MagikMons.GameVars.currentSpawn = null;
            MagikMons.GameVars.typeFight = null;
            MagikMons.GameVars.monsterNumber = null;
            MagikMons.GameVars.specialAttack = null;
            MagikMons.GameVars.playerMonstersFighting = null;
            MagikMons.GameVars.adversaryMonstersFighting = null;
            MagikMons.GameVars.xpDistribution = null;
            MagikMons.GameVars.xpEarned = null;
            MagikMons.GameVars.needChangeMonster = null;
            MagikMons.GameVars.countWins = 0;
        };
        GameManager.defaultCursor = function () {
            if (GameManager.game.canvas.style.cursor !== "default") {
                GameManager.game.canvas.style.cursor = "default";
            }
        };
        GameManager.readGameData = function () {
            GameManager.getGameStorageData(MagikMons.GameConstants.SAVED_GAME_DATA_KEY, function (gameData) {
                if (gameData) {
                    MagikMons.GameVars.gameData = JSON.parse(gameData);
                }
                GameManager.startGame();
            }, function (error) {
                GameManager.log("error retriving saved game data.", error);
            });
        };
        GameManager.writeGameData = function () {
            MagikMons.GameVars.gameData.slotsData[MagikMons.GameVars.gameData.currentSlot] = MagikMons.GameVars.slotData;
            GameManager.setGameStorageData(MagikMons.GameConstants.SAVED_GAME_DATA_KEY, MagikMons.GameVars.gameData, function () {
                GameManager.log("game data successfully saved");
            }, function (error) {
                GameManager.log("error saving game data", error);
            });
        };
        GameManager.onGameAssetsLoaded = function () {
            MagikMons.AudioManager.init(this.game);
            GameManager.setTexts();
            MagikMons.GameVars.monstersStats = this.game.cache.getJSON("levels");
            MagikMons.GameVars.monstersInfo = this.game.cache.getJSON("names");
            MagikMons.GameVars.monstersActions = this.game.cache.getJSON("actions");
            GameManager.parseMonstersActions();
            MagikMons.GameVars.animations = this.game.cache.getJSON("animations");
            if (!MagikMons.GameVars.slotData.monsters) {
                GameManager.createDefaultPlayerMonsters();
            }
            GameManager.game.state.start(MagikMons.GameConstants.START_STATE, true, false);
        };
        GameManager.setTexts = function () {
            MagikMons.GameVars.gameText = this.game.cache.getJSON("game-text")[MagikMons.GameVars.gameData.language];
            MagikMons.GameVars.dialoguesText = MagikMons.GameVars.gameText.DIALOGUES;
            MagikMons.GameVars.names = MagikMons.GameVars.gameText.NAMES;
            MagikMons.GameVars.itemsTexts = MagikMons.GameVars.gameText.ITEMS_TEXTS;
            MagikMons.GameVars.bestiaryTexts = MagikMons.GameVars.gameText.BESTIARY;
            MagikMons.GameVars.tutorialTexts = MagikMons.GameVars.gameText.TUTORIAL;
            MagikMons.GameVars.trainersTexts = MagikMons.GameVars.gameText.TRAINERS_TEXT;
            MagikMons.GameVars.trainersNames = MagikMons.GameVars.gameText.TRAINERS_NAMES;
            MagikMons.GameVars.chaptersTexts = MagikMons.GameVars.gameText.CHAPTER_NAMES;
        };
        GameManager.parseMonstersActions = function () {
            for (var i = 1; i <= MagikMons.GameConstants.ACTIONS_NUMBER; i++) {
                var id = ("000" + i).substr(-3);
                var action = MagikMons.GameVars.monstersActions[id];
                action.fx = GameManager.parseAction(action.fx);
                action.frames = GameManager.parseAction(action.frames);
                action.delay = GameManager.parseAction(action.delay);
                action.front = GameManager.parseAction(action.front);
                action.adversary = GameManager.parseAction(action.adversary);
                action.movement_player = GameManager.parseAction(action.movement_player);
                action.movement_adversary = GameManager.parseAction(action.movement_adversary);
            }
        };
        GameManager.parseAction = function (action) {
            if (action) {
                action = JSON.parse("" + action);
            }
            return action;
        };
        GameManager.updateMonsters = function () {
            for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                var fightMonster = MagikMons.GameVars.playerMonstersFighting[i];
                for (var j = 0; j < MagikMons.GameVars.slotData.monsters.length; j++) {
                    var mapMonster = MagikMons.GameVars.slotData.monsters[j];
                    mapMonster.healTime = Math.round(Date.now() / 1000);
                    if (mapMonster && fightMonster.uniqueId === mapMonster.uniqueId) {
                        mapMonster.life = fightMonster.life;
                        mapMonster.xp = fightMonster.xp;
                        if (mapMonster.level !== fightMonster.level) {
                            mapMonster.level = fightMonster.level;
                            GameManager.updateMonsterLevelUp(mapMonster, true);
                        }
                        break;
                    }
                }
            }
        };
        GameManager.setInitialHealTime = function (monsterData) {
            if (monsterData.healTime === 0) {
                monsterData.healTime = Math.round(Date.now() / 1000);
            }
            GameManager.setHealTime(monsterData);
        };
        GameManager.setHealTime = function (monsterData) {
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_HEAL) {
                return;
            }
            if (monsterData.life < monsterData.maxLife) {
                monsterData.life += (Math.round(Date.now() / 1000) - monsterData.healTime) / 2;
                if (monsterData.life > monsterData.maxLife) {
                    monsterData.life = monsterData.maxLife;
                }
            }
            monsterData.healTime = Math.round(Date.now() / 1000);
            GameManager.writeGameData();
        };
        GameManager.fightToMap = function (winBool) {
            if (winBool) {
                if (MagikMons.GameVars.currentSpawn) {
                    if (MagikMons.GameVars.currentSpawn.solvable) {
                        MagikMons.MapManager.deleteSpawn(MagikMons.GameVars.currentSpawn);
                    }
                    MagikMons.GameVars.currentSpawn = null;
                }
                if (MagikMons.GameVars.currentTrainer) {
                    MagikMons.GameVars.needRemoveTrainer = MagikMons.GameVars.currentTrainer;
                }
                if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                    GameManager.endSwapTutorial();
                }
            }
            else {
                if (MagikMons.GameVars.currentTrainer) {
                    MagikMons.GameVars.needDialogueTrainer = MagikMons.GameVars.currentTrainer;
                }
            }
            if (MagikMons.GameVars.currentTrainer) {
                MagikMons.GameVars.currentTrainer.first_time = false;
            }
            MagikMons.GameVars.currentTrainer = null;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                MagikMons.MapManager.deleteSpawn(MagikMons.GameVars.currentSpawn);
                MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_WAND;
            }
            GameManager.updateMonsters();
            GameManager.goMapState(MagikMons.GameVars.slotData.mapName);
        };
        GameManager.goMapState = function (next) {
            MagikMons.GameVars.slotData.mapName = next;
            GameManager.game.camera.onFadeComplete.removeAll();
            GameManager.game.camera.onFadeComplete.add(function () {
                MagikMons.GameVars.paused = false;
                GameManager.game.state.start("MapState", true, false);
            }, this);
            GameManager.game.camera.fade(0x000000, 500, false);
        };
        GameManager.backHome = function () {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
            }
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.gameplayStop();
                PokiSDK.commercialBreak().then(function () {
                    MagikMons.GameVars.paused = false;
                    GameManager.game.state.start("SplashState", true, false);
                });
            }
            else {
                MagikMons.GameVars.paused = false;
                GameManager.game.state.start("SplashState", true, false);
            }
        };
        GameManager.goAttacksState = function () {
            GameManager.game.state.start("AttacksState", true, false);
        };
        GameManager.saveHeroPosition = function (position) {
            var heroPos = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition;
            var heroPrevPos = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPrevPosition;
            if (heroPos.x !== heroPrevPos.x || heroPos.y !== heroPrevPos.y) {
                MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPrevPosition.x = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition.x;
                MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPrevPosition.y = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition.y;
            }
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition = position;
            GameManager.writeGameData();
        };
        GameManager.createAdversayMonster = function (id, level_max, level_min) {
            MagikMons.GameVars.adversaryMonstersFighting = new Array();
            for (var i = 0; i < id.length; i++) {
                var level = MagikMons.Utils.randomIntFromInterval(level_min[i], level_max[i]);
                var idI = id[i];
                if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                    if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                        idI = MagikMons.GameConstants.START_MKM_SPECTRE;
                    }
                    else if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_TECH) {
                        idI = MagikMons.GameConstants.START_MKM_CLASSIC;
                    }
                    else if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                        idI = MagikMons.GameConstants.START_MKM_TECH;
                    }
                }
                else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                    if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                        idI = MagikMons.GameConstants.START_MKM_TECH;
                    }
                    else if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_TECH) {
                        idI = MagikMons.GameConstants.START_MKM_SPECTRE;
                    }
                    else if (MagikMons.GameVars.slotData.monsters[0].class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                        idI = MagikMons.GameConstants.START_MKM_CLASSIC;
                    }
                }
                MagikMons.GameVars.adversaryMonstersFighting.push(GameManager.createMonsterFromId(idI, level, MagikMons.GameVars.slotData.uniqueId));
                MagikMons.GameVars.slotData.uniqueId++;
            }
        };
        GameManager.manageNewMagikmons = function (icons) {
            GameManager.updateMonsters();
            icons.sort(MagikMons.Utils.compareMkms);
            var monstersAux = new Array();
            var length = icons.length;
            if (length > 6) {
                length = 6;
            }
            for (var i = 0; i < length; i++) {
                var fightMonster = icons[i].monsterData;
                var newMonster = true;
                if (!fightMonster) {
                    monstersAux.push(null);
                    continue;
                }
                for (var j = 0; j < MagikMons.GameVars.slotData.monsters.length; j++) {
                    var mapMonster = MagikMons.GameVars.slotData.monsters[j];
                    if (mapMonster && fightMonster.uniqueId === mapMonster.uniqueId) {
                        var monsterAux = mapMonster;
                        monstersAux.push(monsterAux);
                        newMonster = false;
                    }
                }
                if (newMonster) {
                    var monsterAux = fightMonster;
                    monsterAux.hypno = false;
                    monsterAux.poison = false;
                    monsterAux.rage = false;
                    GameManager.updateMonsterLevelUp(monsterAux, false);
                    monstersAux.push(monsterAux);
                }
            }
            MagikMons.GameVars.slotData.monsters = monstersAux;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                GameManager.endCaptureTutorial();
            }
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.commercialBreak().then(function () {
                    GameManager.goMapState(MagikMons.GameVars.slotData.mapName);
                });
            }
            else {
                GameManager.goMapState(MagikMons.GameVars.slotData.mapName);
            }
        };
        GameManager.createMonsterFromId = function (id, level, uniqueId, player) {
            MagikMons.GameVars.slotData.bestiary[parseInt(id) - 1] = true;
            var actions = GameManager.generateActions(MagikMons.GameVars.monstersInfo[id].class, player);
            var monster = {
                id: id,
                uniqueId: uniqueId,
                class: MagikMons.GameVars.monstersInfo[id].class,
                name: MagikMons.GameVars.monstersInfo[id].name,
                level: level,
                xp: 0,
                attack: GameManager.formulaStats(MagikMons.GameVars.monstersStats[id].attack, level),
                defense: GameManager.formulaStats(MagikMons.GameVars.monstersStats[id].defense, level),
                aiming: MagikMons.GameVars.monstersStats[id].aiming,
                life: GameManager.formulaLife(MagikMons.GameVars.monstersStats[id].hp, level),
                maxLife: GameManager.formulaLife(MagikMons.GameVars.monstersStats[id].hp, level),
                hypno: false,
                poison: false,
                rage: false,
                actions: actions,
                healTime: 0
            };
            return monster;
        };
        GameManager.updateMonsterLevelUp = function (monster, life) {
            var id = monster.id;
            var level = monster.level;
            monster.attack = GameManager.formulaStats(MagikMons.GameVars.monstersStats[id].attack, level);
            monster.defense = GameManager.formulaStats(MagikMons.GameVars.monstersStats[id].defense, level);
            monster.aiming = MagikMons.GameVars.monstersStats[id].aiming;
            if (life) {
                monster.life = GameManager.formulaLife(MagikMons.GameVars.monstersStats[id].hp, level);
                monster.maxLife = GameManager.formulaLife(MagikMons.GameVars.monstersStats[id].hp, level);
            }
        };
        GameManager.formulaLife = function (base, level) {
            return Math.floor((base * level) / 10) + level + 10;
        };
        GameManager.formulaStats = function (base, level) {
            return Math.floor((base * level) / 10) + 5;
        };
        GameManager.generateActions = function (monsterClass, player) {
            var actions = new Array();
            var posibleActions1 = new Array();
            var posibleActions2 = new Array();
            var posibleActions3 = new Array();
            var posibleActions4 = new Array();
            for (var i = 1; i <= MagikMons.GameConstants.ACTIONS_NUMBER; i++) {
                var id = ("000" + i).substr(-3);
                var action = MagikMons.GameVars.monstersActions[id];
                if (action.class === MagikMons.GameConstants.ELEMENT_COMMON) {
                    if (action.rank === 1) {
                        if (action.damage !== 0 && action.cooldown === 1 && MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_CAPTURE && MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_SWAP) {
                            posibleActions1.push(id);
                        }
                        posibleActions2.push(id);
                    }
                    else if (action.rank === 2) {
                        if (action.damage !== 0 && action.cooldown === 1 && MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_CAPTURE && MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_SWAP) {
                            posibleActions1.push(id);
                        }
                        posibleActions2.push(id);
                    }
                    else if (action.rank === 3) {
                        posibleActions3.push(id);
                        posibleActions4.push(id);
                    }
                    else if (action.rank === 4) {
                        posibleActions3.push(id);
                        posibleActions4.push(id);
                    }
                }
                if (action.class === monsterClass) {
                    if (action.rank === 1) {
                        if (action.damage !== 0 && action.cooldown === 1) {
                            posibleActions1.push(id, id, id);
                        }
                        posibleActions2.push(id, id, id);
                    }
                    else if (action.rank === 2) {
                        if (action.damage !== 0 && action.cooldown === 1) {
                            posibleActions1.push(id, id, id);
                        }
                        posibleActions2.push(id, id, id);
                    }
                    else if (action.rank === 3) {
                        posibleActions3.push(id, id, id);
                        posibleActions4.push(id, id, id);
                    }
                    else if (action.rank === 4) {
                        posibleActions3.push(id, id, id);
                        posibleActions4.push(id, id, id);
                    }
                }
            }
            var actionId1 = posibleActions1[Math.floor(Math.random() * posibleActions1.length)];
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                actionId1 = "001";
            }
            else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ATTACK) {
                actionId1 = "002";
            }
            var action1 = { id: actionId1, cooldown: 0 };
            actions.push(action1);
            var index = posibleActions2.indexOf(actionId1);
            while (index > -1) {
                posibleActions2.splice(index, 1);
                index = posibleActions2.indexOf(actionId1);
            }
            var actionId2 = posibleActions2[Math.floor(Math.random() * posibleActions2.length)];
            var action2 = { id: actionId2, cooldown: 0 };
            actions.push(action2);
            index = posibleActions3.indexOf(actionId2);
            while (index > -1) {
                posibleActions3.splice(index, 1);
                index = posibleActions3.indexOf(actionId2);
            }
            var actionId3 = posibleActions3[Math.floor(Math.random() * posibleActions3.length)];
            var action3 = { id: actionId3, cooldown: 0 };
            actions.push(action3);
            index = posibleActions4.indexOf(actionId3);
            while (index > -1) {
                posibleActions4.splice(index, 1);
                index = posibleActions4.indexOf(actionId3);
            }
            var actionId4 = posibleActions4[Math.floor(Math.random() * posibleActions4.length)];
            var action4 = { id: actionId4, cooldown: 0 };
            actions.push(action4);
            if (MagikMons.GameConstants.START_STATE === "FightState") {
                actions = new Array();
                if (player) {
                    actions.push({ id: "004", cooldown: 0 });
                    actions.push({ id: "008", cooldown: 0 });
                    actions.push({ id: "012", cooldown: 0 });
                    actions.push({ id: "016", cooldown: 0 });
                }
                else {
                    actions.push({ id: "001", cooldown: 0 });
                    actions.push({ id: "010", cooldown: 0 });
                    actions.push({ id: "011", cooldown: 0 });
                    actions.push({ id: "012", cooldown: 0 });
                }
            }
            return actions;
        };
        GameManager.generatePlayerMonsters = function (monsters) {
            monsters.push(GameManager.createMonsterFromId("003", 20, 1, true));
            monsters.push(GameManager.createMonsterFromId("001", 20, 2, true));
            monsters.push(GameManager.createMonsterFromId("002", 20, 4, true));
            monsters.push(null);
            monsters.push(null);
            monsters.push(null);
        };
        GameManager.generateAdversaryMonsters = function (monsters) {
            monsters.push(GameManager.createMonsterFromId("008", 1, 0));
            monsters.push(GameManager.createMonsterFromId("004", 1, 0));
            monsters.push(GameManager.createMonsterFromId("003", 1, 0));
        };
        GameManager.endWandTutorial = function () {
            MagikMons.Hero.canMove = true;
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_ATTACK;
            GameManager.writeGameData();
        };
        GameManager.endAttackTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_CRAFT;
            GameManager.writeGameData();
        };
        GameManager.endHealTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_CRAFT;
            GameManager.writeGameData();
            MagikMons.MapState.currentInstance.startCraftTutorial();
        };
        GameManager.endCraftTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_CAPTURE;
            GameManager.writeGameData();
        };
        GameManager.endCaptureTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_SWAP_2;
            GameManager.writeGameData();
        };
        GameManager.endSwapTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_SWAP_2;
            GameManager.writeGameData();
        };
        GameManager.endSwap2Tutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_NO_CAPTURE;
            GameManager.writeGameData();
        };
        GameManager.endNoCaptureTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_MAP;
            GameManager.writeGameData();
        };
        GameManager.endMapTutorial = function () {
            MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_FINISHED;
            GameManager.writeGameData();
        };
        GameManager.reorderMonsters = function (teamMkm) {
            var monsters = new Array();
            teamMkm.sort(MagikMons.Utils.compareMkms);
            for (var i = 0; i < teamMkm.length; i++) {
                monsters.push(teamMkm[i].monsterData);
            }
            MagikMons.GameVars.slotData.monsters = monsters;
        };
        GameManager.setLanguage = function (lang) {
            MagikMons.GameVars.gameData.language = lang;
            GameManager.setTexts();
            GameManager.writeGameData();
        };
        GameManager.log = function (text, error) {
            if (!MagikMons.GameConstants.VERBOSE) {
                return;
            }
            if (error) {
                console.error(text + ":", error);
            }
            else {
                console.log(text);
            }
        };
        GameManager.slotSelected = function (slot) {
            MagikMons.GameVars.gameData.currentSlot = slot;
            if (!MagikMons.GameVars.gameData.slotsData[slot]) {
                MagikMons.GameVars.gameData.slotsData[slot] = GameManager.createSlot();
            }
            MagikMons.GameVars.slotData = MagikMons.GameVars.gameData.slotsData[slot];
            if (!MagikMons.GameVars.slotData.monsters) {
                GameManager.createDefaultPlayerMonsters();
            }
            GameManager.writeGameData();
            MagikMons.SplashState.currentInstance.hide(slot);
        };
        GameManager.eraseSlot = function (slot) {
            MagikMons.GameVars.gameData.slotsData[slot] = GameManager.createSlot();
            if (MagikMons.GameVars.gameData.currentSlot === slot) {
                MagikMons.GameVars.slotData = MagikMons.GameVars.gameData.slotsData[slot];
            }
            GameManager.writeGameData();
            this.game.state.start("SplashState", true, false);
        };
        GameManager.startGame = function () {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.init().then(function () {
                    console.log("PokiSDK initialized");
                }).catch(function () {
                    console.log("Adblock enabled");
                });
                PokiSDK.setDebug(false);
            }
            GameManager.game.state.start("PreLoader", true, false);
        };
        GameManager.createSlot = function () {
            var mapData1 = {
                tilemapName: "map1",
                imageName: "tileset_32",
                dimensions: { x: 63, y: 107 },
                heroPosition: { x: 70, y: 81.5 },
                heroPrevPosition: { x: 70, y: 81.5 },
                minimapPosition: { x: 8, y: 448 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData2 = {
                tilemapName: "map2",
                imageName: "tileset_32",
                dimensions: { x: 70, y: 68 },
                heroPosition: { x: 1, y: 64 },
                heroPrevPosition: { x: 1, y: 64 },
                minimapPosition: { x: 147, y: 320 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData3 = {
                tilemapName: "map3",
                imageName: "tileset_32",
                dimensions: { x: 91, y: 61 },
                heroPosition: { x: 74, y: 61 },
                heroPrevPosition: { x: 74, y: 61 },
                minimapPosition: { x: 17, y: 188 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData4 = {
                tilemapName: "map4",
                imageName: "tileset_32",
                dimensions: { x: 78, y: 69 },
                heroPosition: { x: 13, y: 69 },
                heroPrevPosition: { x: 13, y: 69 },
                minimapPosition: { x: 0, y: 42 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData5 = {
                tilemapName: "map5",
                imageName: "tileset_32",
                dimensions: { x: 132, y: 88 },
                heroPosition: { x: 12, y: 18 },
                heroPrevPosition: { x: 12, y: 18 },
                minimapPosition: { x: 0, y: 0 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData6 = {
                tilemapName: "map6",
                imageName: "tileset_32",
                dimensions: { x: 87, y: 105 },
                heroPosition: { x: 25, y: 36 },
                heroPrevPosition: { x: 25, y: 36 },
                minimapPosition: { x: 242, y: 85 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData7 = {
                tilemapName: "map7",
                imageName: "tileset_32",
                dimensions: { x: 59, y: 147 },
                heroPosition: { x: 27, y: 4 },
                heroPrevPosition: { x: 27, y: 4 },
                minimapPosition: { x: 319, y: 320 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapData8 = {
                tilemapName: "map8",
                imageName: "tileset_32",
                dimensions: { x: 78, y: 79 },
                heroPosition: { x: 76, y: 62 },
                heroPrevPosition: { x: 76, y: 62 },
                minimapPosition: { x: 147, y: 463 },
                spawns: null,
                dialogues: null,
                trainers: null,
                exits: null,
                paths: null
            };
            var mapsData = (_a = {},
                _a["map1"] = mapData1,
                _a["map2"] = mapData2,
                _a["map3"] = mapData3,
                _a["map4"] = mapData4,
                _a["map5"] = mapData5,
                _a["map6"] = mapData6,
                _a["map7"] = mapData7,
                _a["map8"] = mapData8,
                _a);
            var items = {
                healing: 0,
                antidote: 0,
                hypnoCure: 0,
                defenseIncrease: 0,
                attackIncrease: 0,
                aimingIncrease: 0,
                ball: 0
            };
            if (MagikMons.GameConstants.START_STATE === "FightState") {
                items.healing = 10;
                items.antidote = 20;
                items.hypnoCure = 30;
                items.defenseIncrease = 40;
                items.attackIncrease = 50;
                items.aimingIncrease = 60;
                items.ball = 1;
            }
            var slotData = {
                state: MagikMons.GameConstants.INITIAL_BUS,
                mapName: "map1",
                mapsData: mapsData,
                monsters: null,
                bestiary: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                items: items,
                wisp: 74,
                uniqueId: 0,
                needMaxMkmTutorial: true,
                winLastTrainer: false
            };
            if (MagikMons.GameConstants.START_STATE === "FightState" || MagikMons.GameConstants.START_STATE === "MapState") {
                slotData.state = MagikMons.GameConstants.TUTORIAL_FINISHED;
                slotData.needMaxMkmTutorial = false;
                slotData.mapName = "map2";
            }
            return slotData;
            var _a;
        };
        GameManager.resetVars = function () {
            var lang = MagikMons.GameConstants.ENGLISH;
            if (navigator.language === "es-ES" || navigator.language === "es") {
                lang = MagikMons.GameConstants.SPANISH;
            }
            else if (navigator.language === "ca") {
                lang = MagikMons.GameConstants.CATALAN;
            }
            MagikMons.GameVars.gameData = {
                muted: false,
                language: lang,
                currentSlot: 0,
                slotsData: [GameManager.createSlot(), GameManager.createSlot(), GameManager.createSlot()]
            };
            MagikMons.GameVars.typeFight = MagikMons.GameConstants.MONSTER_FIGHT;
            MagikMons.GameVars.currentTrainer = null;
            MagikMons.GameVars.needRemoveTrainer = null;
            MagikMons.GameVars.paused = false;
            MagikMons.GameVars.needChangeMkm = false;
            MagikMons.GameVars.countWins = 0;
        };
        GameManager.getGameStorageData = function (key, successCb, failureCb) {
            var gameDataStr = localStorage.getItem(key);
            successCb(gameDataStr);
        };
        GameManager.setGameStorageData = function (key, value, successCb, failureCb) {
            localStorage.setItem(key, JSON.stringify(value));
            successCb();
        };
        GameManager.createDefaultPlayerMonsters = function () {
            var monsters = new Array();
            if (MagikMons.GameConstants.START_STATE === "FightState") {
                GameManager.generatePlayerMonsters(monsters);
            }
            else {
                monsters.push(null);
                monsters.push(null);
                monsters.push(null);
                monsters.push(null);
                monsters.push(null);
                monsters.push(null);
            }
            MagikMons.GameVars.slotData.uniqueId = 2;
            MagikMons.GameVars.slotData.monsters = monsters;
        };
        return GameManager;
    }());
    MagikMons.GameManager = GameManager;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var GameVars = (function () {
        function GameVars() {
        }
        GameVars.getLocalStorageData = function (key) {
            var value = localStorage.getItem(key);
            if (value !== null) {
                return value;
            }
            else {
                return "";
            }
        };
        GameVars.setLocalStorageData = function (key, value) {
            localStorage.setItem(key, value);
        };
        return GameVars;
    }());
    MagikMons.GameVars = GameVars;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var PreLoader = (function (_super) {
        __extends(PreLoader, _super);
        function PreLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreLoader.prototype.init = function () {
            PreLoader.currentInstance = this;
            this.load.path = MagikMons.GameConstants.ASSETS_PATH;
            this.allLoaded = false;
            this.animFinished = false;
        };
        PreLoader.prototype.preload = function () {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.gameLoadingStart();
            }
            this.generateBitmapData();
            this.composeScene();
            this.loadAssets();
        };
        PreLoader.prototype.create = function () {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.gameLoadingFinished();
            }
            this.game.time.events.add(500, function () {
                if (this.animFinished) {
                    this.startGame();
                }
                else {
                    this.allLoaded = true;
                }
            }, this);
        };
        PreLoader.prototype.updateLoadedPercentage = function (perc, fileName) {
            if (fileName === "texture_atlas_3") {
                var anim = this.add.image(-100, -100, "texture_atlas_3", "smoke_generic_01.png");
                anim.anchor.set(.5);
                var animation = anim.animations.add("explosion", Phaser.Animation.generateFrameNames("smoke_generic_", 1, 21, ".png", 2));
                anim.play("explosion");
                animation.onComplete.add(function () {
                    if (this.allLoaded) {
                        this.startGame();
                    }
                    else {
                        this.animFinished = true;
                    }
                }, this);
            }
            this.preloadBar.scale.x = this.load.progress / 100 * 3.925;
            this.bus.x = MagikMons.GameConstants.GAME_WIDTH / 2 - 126 + this.load.progress / 100 * 3.925 * MagikMons.GameConstants.BITMAP_SIZE;
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.GAMEPIX) {
                GamePix.loading(this.load.progress);
            }
            else if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.gameLoadingProgress({ percentageDone: this.load.progress });
            }
        };
        PreLoader.prototype.startGame = function () {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.GAMEPIX) {
                GamePix.loaded().then(function () {
                    MagikMons.GameManager.onGameAssetsLoaded();
                }).catch(function (e) {
                    MagikMons.GameManager.log("error initialising game", e);
                });
            }
            else {
                MagikMons.GameManager.onGameAssetsLoaded();
            }
        };
        PreLoader.prototype.composeScene = function () {
            this.add.text(0, 0, "ABCDE", { font: "60px Adineue", fill: "#FFFFFF" });
            this.add.text(0, 0, "ABCDE", { font: "60px Goonies", fill: "#FFFFFF" });
            this.add.text(0, 0, "ABCDE", { font: "60px Pythia", fill: "#FFFFFF" });
            this.add.text(0, 0, "ABCDE", { font: "60px Exo Light", fill: "#FFFFFF" });
            this.add.text(0, 0, "ABCDE", { font: "60px Chewy", fill: "#FFFFFF" });
            this.add.text(0, 0, "ABCDE", { font: "60px DosisBold", fill: "#FFFFFF" });
            var tmpBackground = this.add.sprite(0, 0, this.game.cache.getBitmapData(MagikMons.GameConstants.DARK_BLUE_SQUARE));
            tmpBackground.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAPDATA_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAPDATA_SIZE);
            var topLayer = this.add.sprite(0, 0, this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            var bottomLayer = this.add.sprite(0, 320, this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            this.loadingItemsContainer = this.add.group();
            this.loadingItemsContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            this.loadingItemsContainer.scale.y = MagikMons.GameVars.scaleY;
            var preloadBarCapsuleShadow = new Phaser.Sprite(this.game, (MagikMons.GameConstants.GAME_WIDTH / 2 + 2), 2, this.game.cache.getBitmapData(MagikMons.GameConstants.BLACK_SQUARE));
            preloadBarCapsuleShadow.scale.set(4, .25);
            preloadBarCapsuleShadow.anchor.set(.5);
            preloadBarCapsuleShadow.alpha = .45;
            this.loadingItemsContainer.add(preloadBarCapsuleShadow);
            var preloadBarCapsule = new Phaser.Sprite(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 0, this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            preloadBarCapsule.scale.setTo(4, .25);
            preloadBarCapsule.anchor.set(.5);
            this.loadingItemsContainer.add(preloadBarCapsule);
            this.preloadBar = new Phaser.Sprite(this.game, (MagikMons.GameConstants.GAME_WIDTH / 2 - 126), 0, this.game.cache.getBitmapData(MagikMons.GameConstants.RED_SQUARE));
            this.preloadBar.scale.setTo(0, .2);
            this.preloadBar.anchor.set(0, .5);
            this.loadingItemsContainer.add(this.preloadBar);
            this.bus = new Phaser.Image(this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 126, -60, "bus");
            this.bus.scale.set(-.75, .75);
            this.bus.anchor.set(.5);
            this.loadingItemsContainer.add(this.bus);
        };
        PreLoader.prototype.loadAssets = function () {
            this.load.tilemap("map1", null, MagikMons.GameVars.jsonsMaps[0], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map2", null, MagikMons.GameVars.jsonsMaps[1], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map3", null, MagikMons.GameVars.jsonsMaps[2], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map4", null, MagikMons.GameVars.jsonsMaps[3], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map5", null, MagikMons.GameVars.jsonsMaps[4], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map6", null, MagikMons.GameVars.jsonsMaps[5], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map7", null, MagikMons.GameVars.jsonsMaps[6], Phaser.Tilemap.TILED_JSON);
            this.load.tilemap("map8", null, MagikMons.GameVars.jsonsMaps[7], Phaser.Tilemap.TILED_JSON);
            this.load.image("tileset_32", "/images/tileset_32.png");
            this.load.spritesheet("tiles", "/images/tileset_32.png", MagikMons.GameConstants.TILES_SIZE, MagikMons.GameConstants.TILES_SIZE);
            this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");
            this.load.atlas("texture_atlas_2", "/texture_atlas_2.png", "/texture_atlas_2.json");
            this.load.atlas("texture_atlas_3", "/texture_atlas_3.png", "/texture_atlas_3.json");
            this.load.atlas("texture_atlas_4", "/texture_atlas_4.png", "/texture_atlas_4.json");
            this.load.atlas("texture_atlas_es", "/texture_atlas_es.png", "/texture_atlas_es.json");
            this.load.atlas("texture_atlas_en", "/texture_atlas_en.png", "/texture_atlas_en.json");
            this.load.atlas("texture_atlas_cat", "/texture_atlas_cat.png", "/texture_atlas_cat.json");
            this.load.json("game-text", "/text/game-text.json");
            this.load.json("animations", "/animations.json");
            this.load.json("levels", "/monsters/levels.json");
            this.load.json("names", "/monsters/names.json");
            this.load.json("actions", "/monsters/actions.json");
            this.load.xml("capture", "/capture.xml");
            this.load.audiosprite("audio-sprite", ["/audio/audiosprite.mp3", "/audio/audiosprite.ogg"], "/audio/audiosprite.json");
            this.game.load.start();
            this.load.onFileComplete.add(this.updateLoadedPercentage, this);
        };
        PreLoader.prototype.generateBitmapData = function () {
            var bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.RED_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FF0000";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.GREEN_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#00FF00";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#0000FF";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.DARK_BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#191970";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.WHITE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.BLACK_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#000000";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.DARK_BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#171641";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.GRAY_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#999999";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.ORANGE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FF9900";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(64, 64, MagikMons.GameConstants.LILAC_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#b942f4";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TEAM_1, true);
            var grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#0f1e25");
            grd.addColorStop(1, "#005c63");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TEAM_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#005c63");
            grd.addColorStop(1, "#348449");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TEAM_3, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#348449");
            grd.addColorStop(1, "#a7da57");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_ITEMS_1, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#0D1C29");
            grd.addColorStop(1, "#004E8D");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_ITEMS_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#004E8D");
            grd.addColorStop(1, "#0085BF");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_CLASSIC, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#0D2029");
            grd.addColorStop(1, "#9F4532");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_SPECTRE, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#0D2029");
            grd.addColorStop(1, "#5E5CC3");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TECH, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#0D2029");
            grd.addColorStop(1, "#006A71");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_BLACK, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#00212F");
            grd.addColorStop(1, "#003745");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_CLASSIC_1, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#111D33");
            grd.addColorStop(1, "#763213");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_CLASSIC_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#763213");
            grd.addColorStop(1, "#FF872C");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_CLASSIC_3, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#FF872C");
            grd.addColorStop(1, "#FFE09A");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TECH_1, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#111D33");
            grd.addColorStop(1, "#1A606F");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TECH_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#1A606F");
            grd.addColorStop(1, "#87FFBF");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_TECH_3, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#87FFBF");
            grd.addColorStop(1, "#F2FFFB");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_SPECTRE_1, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#111D33");
            grd.addColorStop(1, "#812A9E");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_SPECTRE_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#812A9E");
            grd.addColorStop(1, "#ED5CB6");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_SPECTRE_3, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#ED5CB6");
            grd.addColorStop(1, "#FFACC7");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_NEUTRAL_1, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#111D33");
            grd.addColorStop(1, "#3C7CB3");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_NEUTRAL_2, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#3C7CB3");
            grd.addColorStop(1, "#3AE7FF");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
            bmd = this.game.add.bitmapData(16, 128, MagikMons.GameConstants.GRADIENT_NEUTRAL_3, true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#3AE7FF");
            grd.addColorStop(1, "#E5FFFD");
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);
        };
        return PreLoader;
    }(Phaser.State));
    MagikMons.PreLoader = PreLoader;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.inside = function (point, vs, offX, offY) {
            var x = point.x, y = point.y;
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0] + offX, yi = vs[i][1] + offY;
                var xj = vs[j][0] + offX, yj = vs[j][1] + offY;
                var intersect = ((yi > y) !== (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) {
                    inside = !inside;
                }
            }
            return inside;
        };
        Utils.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        Utils.levelToXp = function (level) {
            return Math.round(Math.pow(1.75, level) * 100);
        };
        Utils.intersectRect = function (x1, y1, x2, y2, off) {
            return !(x1 - off > x2 + off ||
                x1 + off < x2 - off ||
                y1 - off > y2 + off ||
                y1 + off < y2 - off);
        };
        Utils.compareMkms = function (a, b) {
            if (a.pos < b.pos) {
                return -1;
            }
            if (a.pos > b.pos) {
                return 1;
            }
            return 0;
        };
        Utils.validNumber = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        Utils.consecutiveArray = function (start, length) {
            var array = new Array();
            for (var i = start; i < start + length; i++) {
                array.push(i);
            }
            return array;
        };
        Utils.shakeArray = function (max, step) {
            var array = [];
            var count = step;
            while (count <= max) {
                array.push(count, -count);
                count += step;
            }
            while (max > 0) {
                array.push(max, -max);
                max -= step;
            }
            array.push(0);
            return array;
        };
        return Utils;
    }());
    MagikMons.Utils = Utils;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var AttacksGUI = (function (_super) {
        __extends(AttacksGUI, _super);
        function AttacksGUI(game) {
            var _this = _super.call(this, game, null, "attacks-gui") || this;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.x = 5;
            _this.y = MagikMons.GameConstants.GAME_HEIGHT - 110;
            _this.movementButtons = new Array();
            for (var i = 1; i <= 16; i++) {
                var actionId = ("000" + i).substr(-3);
                var button = new Phaser.Button(_this.game, ((i - 1) % 8) * 60, -10 + Math.floor((i - 1) / 8) * 60, "texture_atlas_1", _this.onClickButton, _this);
                button.setFrames("btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png");
                button.forceOut = true;
                button.name = actionId;
                _this.add(button);
            }
            return _this;
        }
        AttacksGUI.prototype.onClickButton = function (b) {
            MagikMons.AttacksState.currentInstance.animateAttack(b.name);
        };
        return AttacksGUI;
    }(Phaser.Group));
    MagikMons.AttacksGUI = AttacksGUI;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var AttacksState = (function (_super) {
        __extends(AttacksState, _super);
        function AttacksState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AttacksState.prototype.init = function () {
            AttacksState.currentInstance = this;
            MagikMons.FightManager.init(this.game);
        };
        AttacksState.prototype.create = function () {
            this.game.stage.backgroundColor = 0x000000;
            var background = new MagikMons.BackgroundFight(this.game);
            this.add.existing(background);
            this.backgroundAttack = new MagikMons.BackgroundAttack(this.game);
            this.backgroundAttack.visible = false;
            this.add.existing(this.backgroundAttack);
            var backButton = new Phaser.Button(this.game, 10, 10, "texture_atlas_1", this.onClickBack, this);
            backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            backButton.scale.y = MagikMons.GameVars.scaleY;
            this.add.existing(backButton);
            var scaledItemsContainer = this.add.group();
            scaledItemsContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            scaledItemsContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2 - 50;
            scaledItemsContainer.scale.y = MagikMons.GameVars.scaleY;
            this.monstersContainer = new MagikMons.MonstersContainer(this.game);
            scaledItemsContainer.add(this.monstersContainer);
            this.attackGUI = new MagikMons.AttacksGUI(this.game);
            this.add.existing(this.attackGUI);
        };
        AttacksState.prototype.shutdown = function () {
            MagikMons.FightState.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        AttacksState.prototype.render = function () {
            if (MagikMons.GameConstants.DEVELOPMENT) {
                this.game.debug.text(this.game.time.fps.toString(), MagikMons.GameConstants.GAME_WIDTH - 30, 30, "#ffffff", "20px Arial");
            }
        };
        AttacksState.prototype.setBackgroundAttack = function (id) {
            if (id === "004" || id === "008" || id === "012" || id === "016") {
                this.backgroundAttack.setBackground(id);
            }
            this.game.time.events.add(1500, function () {
                if (id === "004" || id === "008" || id === "012" || id === "016") {
                    this.backgroundAttack.hide();
                }
            }, this);
        };
        AttacksState.prototype.animateAttack = function (id) {
            this.setBackgroundAttack(id);
            var action = MagikMons.GameVars.monstersActions[id];
            this.monstersContainer.animationsContainer1.newAction(action);
            this.monstersContainer.animationsContainer2.newAction(action);
            var defense = this.monstersContainer.adversary;
            var attack = this.monstersContainer.player;
            var top = 1;
            if (action.movement_player) {
                this.playAnimationAttack(attack, top, action.movement_player);
            }
            if (action.movement_adversary) {
                this.playAnimationDefense(defense, top, action.movement_adversary);
            }
        };
        AttacksState.prototype.playAnimationAttack = function (monster, top, type) {
            var delay = Math.round(type[1] * 60);
            if (type[0] === 1) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: -20 * top, y: 20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 50 * top, y: -50 * top }, 50, Phaser.Easing.Cubic.Out, true)
                        .onComplete.add(function () {
                        this.game.add.tween(monster.monsterImage)
                            .to({ x: 0, y: 0 }, 400, Phaser.Easing.Quintic.Out, true);
                    }, this);
                }, this);
            }
            else if (type[0] === 2) {
                var array = MagikMons.Utils.shakeArray(30, 3);
                this.game.add.tween(monster.monsterImage)
                    .to({ x: array }, 500, Phaser.Easing.Cubic.Out, true, delay);
            }
        };
        AttacksState.prototype.playAnimationDefense = function (monster, top, type) {
            var delay = Math.round(type[1] * 60);
            if (type[0] === 1) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: 20 * top, y: -20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 0, y: 0 }, 400, Phaser.Easing.Quintic.Out, true);
                }, this);
                this.game.add.tween(monster.monsterImage.scale)
                    .to({ x: .95, y: .95 }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage.scale)
                        .to({ x: 1, y: 1 }, 400, Phaser.Easing.Quintic.Out, true);
                }, this);
            }
            else if (type[0] === 2) {
                var array = MagikMons.Utils.shakeArray(30, 3);
                this.game.add.tween(monster.monsterImage)
                    .to({ x: array }, 500, Phaser.Easing.Cubic.Out, true, delay);
            }
            else if (type[0] === 3) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: 20 * top, y: -20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 0, y: 0 }, 500, Phaser.Easing.Quintic.Out, true)
                        .onComplete.add(function () {
                        var array = MagikMons.Utils.shakeArray(30, 3);
                        this.game.add.tween(monster.monsterImage)
                            .to({ x: array }, 400, Phaser.Easing.Cubic.Out, true);
                    }, this);
                }, this);
                this.game.add.tween(monster.monsterImage.scale)
                    .to({ x: .95, y: .95 }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage.scale)
                        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.Out, true);
                }, this);
            }
        };
        AttacksState.prototype.onClickBack = function () {
            MagikMons.GameManager.goMapState(MagikMons.GameVars.slotData.mapName);
        };
        return AttacksState;
    }(Phaser.State));
    MagikMons.AttacksState = AttacksState;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var BackgroundAttack = (function (_super) {
        __extends(BackgroundAttack, _super);
        function BackgroundAttack(game) {
            var _this = _super.call(this, game, null, "background-fight") || this;
            var kineticsContainer = new Phaser.Group(_this.game);
            kineticsContainer.y = MagikMons.GameConstants.GAME_HEIGHT;
            kineticsContainer.angle = -53 + 90;
            _this.add(kineticsContainer);
            _this.kinetics1 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "kinetics.png");
            _this.kinetics1.anchor.set(.5, 1);
            _this.kinetics1.scale.set(4);
            kineticsContainer.add(_this.kinetics1);
            _this.kinetics2 = new Phaser.Image(_this.game, 0, -_this.kinetics1.height, "texture_atlas_1", "kinetics.png");
            _this.kinetics2.anchor.set(.5, 1);
            _this.kinetics2.scale.set(4);
            kineticsContainer.add(_this.kinetics2);
            return _this;
        }
        BackgroundAttack.prototype.setBackground = function (id) {
            MagikMons.AudioManager.playSound("fx_attack_tocho");
            this.visible = true;
            var grd1;
            var grd2;
            var grd3;
            var color;
            if (id === "004") {
                grd1 = MagikMons.GameConstants.GRADIENT_NEUTRAL_1;
                grd2 = MagikMons.GameConstants.GRADIENT_NEUTRAL_2;
                grd3 = MagikMons.GameConstants.GRADIENT_NEUTRAL_3;
                color = 0x39E2FB;
            }
            else if (id === "008") {
                grd1 = MagikMons.GameConstants.GRADIENT_CLASSIC_1;
                grd2 = MagikMons.GameConstants.GRADIENT_CLASSIC_2;
                grd3 = MagikMons.GameConstants.GRADIENT_CLASSIC_3;
                color = 0xFF9239;
            }
            else if (id === "012") {
                grd1 = MagikMons.GameConstants.GRADIENT_TECH_1;
                grd2 = MagikMons.GameConstants.GRADIENT_TECH_2;
                grd3 = MagikMons.GameConstants.GRADIENT_TECH_3;
                color = 0x7DF1B8;
            }
            else if (id === "016") {
                grd1 = MagikMons.GameConstants.GRADIENT_SPECTRE_1;
                grd2 = MagikMons.GameConstants.GRADIENT_SPECTRE_2;
                grd3 = MagikMons.GameConstants.GRADIENT_SPECTRE_3;
                color = 0xFF4B9C;
            }
            this.kinetics1.tint = color;
            this.kinetics2.tint = color;
            if (this.container) {
                this.container.destroy();
            }
            this.container = new Phaser.Group(this.game);
            this.add(this.container);
            this.sendToBack(this.container);
            var layer1 = this.create(0, -50, this.game.cache.getBitmapData(grd1));
            layer1.scale.set(100 / 16, 25.1 / 128);
            this.container.add(layer1);
            var layer2 = this.create(0, -25, this.game.cache.getBitmapData(grd2));
            layer2.scale.set(100 / 16, 20.1 / 128);
            this.container.add(layer2);
            var layer3 = this.create(0, -5, this.game.cache.getBitmapData(grd3));
            layer3.scale.set(100 / 16, 5.1 / 128);
            this.container.add(layer3);
            var layer4 = this.create(0, 0, this.game.cache.getBitmapData(grd3));
            layer4.scale.set(100 / 16, -5.1 / 128);
            layer4.anchor.y = 1;
            this.container.add(layer4);
            var layer5 = this.create(0, 5, this.game.cache.getBitmapData(grd2));
            layer5.scale.set(100 / 16, -20.1 / 128);
            layer5.anchor.y = 1;
            this.container.add(layer5);
            var layer6 = this.create(0, 25, this.game.cache.getBitmapData(grd1));
            layer6.scale.set(100 / 16, -25.1 / 128);
            layer6.anchor.y = 1;
            this.container.add(layer6);
            this.container.y = MagikMons.GameConstants.GAME_HEIGHT;
            this.container.scale.set(8);
            this.container.angle = -53;
            this.container.scale.y = 0;
            this.kinetics1.alpha = 0;
            this.kinetics2.alpha = 0;
            this.game.add.tween(this.container.scale)
                .to({ y: 8 }, 500, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.kinetics1)
                .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.kinetics2)
                .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
        };
        BackgroundAttack.prototype.hide = function () {
            this.game.add.tween(this.container.scale)
                .to({ y: 0 }, 250, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.kinetics1)
                .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.kinetics2)
                .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function () {
                this.visible = false;
            }, this);
        };
        BackgroundAttack.prototype.update = function () {
            this.kinetics1.y += BackgroundAttack.VELOCITY;
            this.kinetics2.y += BackgroundAttack.VELOCITY;
            if (this.kinetics1.y > this.kinetics1.height) {
                this.kinetics1.y -= this.kinetics1.height * 2;
            }
            else if (this.kinetics2.y > this.kinetics2.height) {
                this.kinetics2.y -= this.kinetics2.height * 2;
            }
        };
        BackgroundAttack.VELOCITY = 10;
        return BackgroundAttack;
    }(Phaser.Group));
    MagikMons.BackgroundAttack = BackgroundAttack;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var BackgroundFight = (function (_super) {
        __extends(BackgroundFight, _super);
        function BackgroundFight(game) {
            var _this = _super.call(this, game, null, "background-fight") || this;
            var layer1 = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_BLACK));
            layer1.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, (MagikMons.GameConstants.GAME_HEIGHT / 2) / 128);
            _this.add(layer1);
            var layer2 = _this.create(0, MagikMons.GameConstants.GAME_HEIGHT, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_BLACK));
            layer2.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, -(MagikMons.GameConstants.GAME_HEIGHT / 2) / 128);
            _this.add(layer2);
            var combatGrid = new Phaser.Image(_this.game, 0, MagikMons.GameConstants.GAME_HEIGHT / 2, "texture_atlas_2", "combat_grid.png");
            combatGrid.anchor.y = .5;
            _this.add(combatGrid);
            _this.constellations2 = new Phaser.Image(_this.game, 0, 200, "texture_atlas_1", "constellations.png");
            _this.constellations2.scale.y = MagikMons.GameVars.scaleY;
            _this.constellations2.anchor.y = 1;
            _this.add(_this.constellations2);
            _this.constellations1 = new Phaser.Image(_this.game, -_this.constellations2.width, 200, "texture_atlas_1", "constellations.png");
            _this.constellations1.scale.y = MagikMons.GameVars.scaleY;
            _this.constellations1.anchor.y = 1;
            _this.add(_this.constellations1);
            return _this;
        }
        BackgroundFight.prototype.update = function () {
            this.constellations1.x += .15;
            this.constellations2.x += .15;
            if (this.constellations1.x >= this.constellations1.width) {
                this.constellations1.x = -this.constellations1.width;
            }
            else if (this.constellations2.x >= this.constellations2.width) {
                this.constellations2.x = -this.constellations2.width;
            }
        };
        return BackgroundFight;
    }(Phaser.Group));
    MagikMons.BackgroundFight = BackgroundFight;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var FightManager = (function () {
        function FightManager() {
        }
        FightManager.init = function (game) {
            FightManager.game = game;
            MagikMons.GameVars.turn = MagikMons.GameConstants.PLAYER;
            MagikMons.GameVars.needChangeMonster = MagikMons.GameConstants.NO_CHANGE;
            MagikMons.GameVars.monsterNumber = 0;
            MagikMons.GameVars.playerMonstersFighting = new Array();
            FightManager.getMonstersForFight();
            if (!MagikMons.GameVars.adversaryMonstersFighting) {
                MagikMons.GameVars.adversaryMonstersFighting = new Array();
                MagikMons.GameManager.generateAdversaryMonsters(MagikMons.GameVars.adversaryMonstersFighting);
            }
            MagikMons.GameVars.xpDistribution = new Array();
            for (var i = 0; i < MagikMons.GameVars.adversaryMonstersFighting.length; i++) {
                var xpDistribution = { xp: Math.ceil(MagikMons.Utils.levelToXp(MagikMons.GameVars.adversaryMonstersFighting[i].level) / MagikMons.GameVars.adversaryMonstersFighting[i].level) + 5, monsters: [] };
                MagikMons.GameVars.xpDistribution.push(xpDistribution);
            }
        };
        FightManager.getMonstersForFight = function () {
            for (var i = 0; i < MagikMons.GameVars.slotData.monsters.length; i++) {
                if (i >= 3) {
                    break;
                }
                var monster = MagikMons.GameVars.slotData.monsters[i];
                if (monster) {
                    MagikMons.GameVars.playerMonstersFighting.push(FightManager.copyMonster(monster));
                }
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                return;
            }
            if (MagikMons.GameVars.playerMonstersFighting[0].life === 0) {
                if (MagikMons.GameVars.playerMonstersFighting[1].life > 0) {
                    var aux = MagikMons.GameVars.playerMonstersFighting[0];
                    MagikMons.GameVars.playerMonstersFighting[0] = MagikMons.GameVars.playerMonstersFighting[1];
                    MagikMons.GameVars.playerMonstersFighting[1] = aux;
                }
                else if (MagikMons.GameVars.playerMonstersFighting[2].life > 0) {
                    var aux = MagikMons.GameVars.playerMonstersFighting[0];
                    MagikMons.GameVars.playerMonstersFighting[0] = MagikMons.GameVars.playerMonstersFighting[2];
                    MagikMons.GameVars.playerMonstersFighting[2] = aux;
                }
            }
        };
        FightManager.copyMonster = function (monster) {
            return JSON.parse(JSON.stringify(monster));
        };
        FightManager.changePlayerMonster = function (id) {
            var aux = MagikMons.GameVars.playerMonstersFighting[0];
            MagikMons.GameVars.playerMonstersFighting[0] = MagikMons.GameVars.playerMonstersFighting[id];
            MagikMons.GameVars.playerMonstersFighting[id] = aux;
            if (MagikMons.GameVars.needChangeMonster !== MagikMons.GameConstants.NO_CHANGE) {
                MagikMons.GameVars.needChangeMonster = MagikMons.GameConstants.NO_CHANGE;
                FightManager.changeTurn(true);
            }
            MagikMons.FightState.currentInstance.changePlayerMonster();
        };
        FightManager.changeAdversaryMonster = function () {
            FightManager.updateXpDistribution();
            MagikMons.GameVars.monsterNumber++;
            var aux = MagikMons.GameVars.adversaryMonstersFighting.shift();
            MagikMons.GameVars.adversaryMonstersFighting.push(aux);
            if (MagikMons.GameVars.adversaryMonstersFighting[0].life === 0) {
                FightManager.retireAdversaryMonster();
                FightManager.endFight(true);
            }
            else {
                MagikMons.GameVars.needChangeMonster = MagikMons.GameConstants.NO_CHANGE;
                MagikMons.GameVars.turn = MagikMons.GameConstants.ADVERSARY;
                FightManager.changeTurn();
                MagikMons.FightState.currentInstance.changeAdversaryMonster();
            }
        };
        FightManager.retireAdversaryMonster = function () {
            MagikMons.FightState.currentInstance.retireAdversaryMonster();
        };
        FightManager.changeTurn = function (fromDeadMonster) {
            if (MagikMons.GameVars.needChangeMonster === MagikMons.GameConstants.PLAYER_CHANGE) {
                FightManager.changePlayerDeadMonster();
            }
            else if (MagikMons.GameVars.needChangeMonster === MagikMons.GameConstants.ADVERSARY_CHANGE) {
                FightManager.changeAdversaryMonster();
            }
            else {
                MagikMons.GameVars.turn = MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER ? MagikMons.GameConstants.ADVERSARY : MagikMons.GameConstants.PLAYER;
                if (MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                    FightManager.updateCooldowns();
                }
                else {
                    FightManager.updateXpDistribution();
                }
                var deadPoison = void 0;
                if (!fromDeadMonster) {
                    deadPoison = FightManager.updatePoison();
                }
                if (deadPoison === MagikMons.GameConstants.PLAYER) {
                    this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 3, function () {
                        MagikMons.GameVars.needChangeMonster = MagikMons.GameConstants.PLAYER_CHANGE;
                        FightManager.changePlayerDeadMonster();
                    }, this);
                }
                else if (deadPoison === MagikMons.GameConstants.ADVERSARY) {
                    this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 3, function () {
                        MagikMons.GameVars.needChangeMonster = MagikMons.GameConstants.ADVERSARY_CHANGE;
                        FightManager.changeAdversaryMonster();
                    }, this);
                }
                else {
                    MagikMons.FightState.currentInstance.turnChanged();
                }
            }
        };
        FightManager.catchMonster = function () {
            MagikMons.GameVars.extraCapture = 0;
            FightManager.disableGUI();
            MagikMons.FightState.currentInstance.animationCatch();
        };
        FightManager.catchVideoMonster = function () {
            MagikMons.GameVars.extraCapture = .2;
            FightManager.disableGUI();
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.GAMEPIX && typeof GamePix !== "undefined") {
                GamePix.hook({ type: "show_video_reward" })
                    .then(function (res) {
                    MagikMons.FightState.currentInstance.animationCatch();
                })
                    .catch(function (e) {
                    console.log(e);
                });
            }
            else if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.rewardedBreak().then(function (withReward) {
                    console.log("Should the user get a reward? ${withReward}");
                    MagikMons.FightState.currentInstance.animationCatch();
                });
            }
            else {
                MagikMons.FightState.currentInstance.animationCatch();
            }
        };
        FightManager.decisionCatch = function () {
            var perc = MagikMons.GameVars.adversaryMonstersFighting[0].life / MagikMons.GameVars.adversaryMonstersFighting[0].maxLife;
            perc -= MagikMons.GameVars.extraCapture;
            var rand = Math.random();
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                perc = 0;
            }
            MagikMons.FightState.currentInstance.showCatchAnimation();
            this.game.time.events.add(300, function () {
                if (perc < rand) {
                    FightManager.successfulCatch();
                }
                else {
                    FightManager.errorCatch();
                }
            }, this);
            return perc < rand;
        };
        FightManager.successfulCatch = function () {
            MagikMons.FightState.currentInstance.successfulCatch();
        };
        FightManager.changeSignClass = function (monsterClass) {
            MagikMons.FightState.currentInstance.changeSignClass(monsterClass);
        };
        FightManager.errorCatch = function () {
            MagikMons.FightState.currentInstance.animationReturnToFight();
        };
        FightManager.updateXpDistribution = function () {
            var playerMonster = MagikMons.GameVars.playerMonstersFighting[0];
            if (MagikMons.GameVars.xpDistribution[MagikMons.GameVars.monsterNumber].monsters.indexOf(playerMonster.id) === -1 && playerMonster.level !== MagikMons.GameConstants.MAX_LEVEL) {
                MagikMons.GameVars.xpDistribution[MagikMons.GameVars.monsterNumber].monsters.push(playerMonster.id);
            }
        };
        FightManager.updatePoison = function () {
            if (MagikMons.GameVars.playerMonstersFighting[0].poison && MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                var monster = MagikMons.GameVars.playerMonstersFighting[0];
                monster.life -= monster.maxLife * .1;
                if (monster.life < 0) {
                    monster.life = 0;
                    MagikMons.FightState.currentInstance.updateLife(MagikMons.GameConstants.PLAYER, true);
                    return MagikMons.GameConstants.PLAYER;
                }
                MagikMons.FightState.currentInstance.updateLife(MagikMons.GameConstants.PLAYER, true);
            }
            else if (MagikMons.GameVars.adversaryMonstersFighting[0].poison && MagikMons.GameVars.turn === MagikMons.GameConstants.ADVERSARY) {
                var monster = MagikMons.GameVars.adversaryMonstersFighting[0];
                monster.life -= monster.maxLife * .1;
                if (monster.life < 0) {
                    monster.life = 0;
                    MagikMons.FightState.currentInstance.updateLife(MagikMons.GameConstants.ADVERSARY, true);
                    return MagikMons.GameConstants.ADVERSARY;
                }
                MagikMons.FightState.currentInstance.updateLife(MagikMons.GameConstants.ADVERSARY, true);
            }
            return null;
        };
        FightManager.updateCooldowns = function () {
            for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                var monster = MagikMons.GameVars.playerMonstersFighting[i];
                for (var j = 0; j < monster.actions.length; j++) {
                    var action = monster.actions[j];
                    if (action.cooldown > 0) {
                        action.cooldown--;
                    }
                }
            }
            for (var i = 0; i < MagikMons.GameVars.adversaryMonstersFighting.length; i++) {
                var monster = MagikMons.GameVars.adversaryMonstersFighting[i];
                for (var j = 0; j < monster.actions.length; j++) {
                    var action = monster.actions[j];
                    if (action.cooldown > 0) {
                        action.cooldown--;
                    }
                }
            }
        };
        FightManager.changePlayerDeadMonster = function () {
            var endGame = true;
            for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                if (MagikMons.GameVars.playerMonstersFighting[i].life !== 0) {
                    endGame = false;
                    break;
                }
            }
            MagikMons.FightState.currentInstance.deadPlayerMonster(endGame);
        };
        FightManager.playerAttack = function (actionId) {
            FightManager.disableGUI();
            var data = FightManager.manageAttack(true, actionId, MagikMons.GameVars.playerMonstersFighting[0], MagikMons.GameVars.adversaryMonstersFighting[0]);
            MagikMons.FightState.currentInstance.playerAttack(data);
        };
        FightManager.adversaryAttack = function () {
            var monster = MagikMons.GameVars.adversaryMonstersFighting[0];
            var start = 0;
            var end = 1;
            if (monster.level >= MagikMons.GameConstants.LEVEL_ATTACK_3) {
                end = 4;
            }
            else if (monster.level >= MagikMons.GameConstants.LEVEL_ATTACK_2) {
                end = 3;
            }
            else if (monster.level >= MagikMons.GameConstants.LEVEL_ATTACK_1) {
                end = 2;
            }
            var posibleActions = new Array();
            for (var i = start; i < end; i++) {
                if (monster.actions[i].cooldown === 0) {
                    posibleActions.push(i);
                }
            }
            var pos = posibleActions[Math.floor(Math.random() * posibleActions.length)];
            var actionId = MagikMons.GameVars.adversaryMonstersFighting[0].actions[pos].id;
            MagikMons.GameVars.adversaryMonstersFighting[0].actions[pos].cooldown = MagikMons.GameVars.monstersActions[actionId].cooldown;
            var data = FightManager.manageAttack(false, actionId, MagikMons.GameVars.adversaryMonstersFighting[0], MagikMons.GameVars.playerMonstersFighting[0]);
            MagikMons.FightState.currentInstance.adversaryAttack(data);
        };
        FightManager.manageAttack = function (player, actionId, monsterA, monsterB) {
            MagikMons.GameVars.specialAttack = false;
            var actionData = MagikMons.GameVars.monstersActions[actionId];
            var attackData = { miss: false, critical: false, backfired: false, type: MagikMons.GameConstants.ATTACK_NORMAL, id: actionId, damage: 0 };
            var miss = (Math.random() * 100) > monsterA.aiming;
            if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                miss = false;
            }
            if (miss) {
                attackData.miss = true;
                if (monsterA.rage) {
                    monsterA.rage = false;
                    FightManager.showMonsterStates(false, false);
                }
                MagikMons.AudioManager.playSound("missed_attack");
                return { attackData: attackData, hack: false };
            }
            else {
                var critical = false;
                if (actionData.damage !== 0) {
                    critical = (Math.random() * 100) < 10;
                    attackData.critical = critical;
                    if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                        critical = false;
                    }
                }
                if (actionData.damage !== 0) {
                    if (actionData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                        if (monsterB.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                            attackData.type = MagikMons.GameConstants.ATTACK_STRONG;
                        }
                        else if (monsterB.class === MagikMons.GameConstants.ELEMENT_TECH) {
                            attackData.type = MagikMons.GameConstants.ATTACK_WEAK;
                        }
                    }
                    else if (actionData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                        if (monsterB.class === MagikMons.GameConstants.ELEMENT_TECH) {
                            attackData.type = MagikMons.GameConstants.ATTACK_STRONG;
                        }
                        else if (monsterB.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                            attackData.type = MagikMons.GameConstants.ATTACK_WEAK;
                        }
                    }
                    else if (actionData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                        if (monsterB.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                            attackData.type = MagikMons.GameConstants.ATTACK_STRONG;
                        }
                        else if (monsterB.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                            attackData.type = MagikMons.GameConstants.ATTACK_WEAK;
                        }
                    }
                }
                var levelDamage = (2 * monsterA.level) / 5 + 2;
                var totalDamage = levelDamage * actionData.damage * (monsterA.attack / monsterB.defense) / 10 + 1;
                var totalDamageHack = levelDamage * actionData.damage * (monsterA.attack / monsterA.defense) / 10 + 1;
                if (actionData.damage === 0) {
                    totalDamage = 0;
                    totalDamageHack = 0;
                }
                if (totalDamage <= 0) {
                    totalDamage = 0;
                    totalDamageHack = 0;
                    attackData.critical = false;
                }
                if (critical) {
                    totalDamage *= MagikMons.GameConstants.CRITICAL_MULTIPLIER;
                    totalDamageHack *= MagikMons.GameConstants.CRITICAL_MULTIPLIER;
                }
                if (attackData.type === MagikMons.GameConstants.ATTACK_STRONG) {
                    totalDamage *= MagikMons.GameConstants.STRONG_MULTIPLIER;
                }
                else {
                    totalDamage *= MagikMons.GameConstants.WEAK_MULTIPLIER;
                }
                if (monsterA.rage) {
                    monsterA.rage = false;
                    totalDamage *= MagikMons.GameConstants.RAGE_MULTIPLIER;
                    totalDamageHack *= MagikMons.GameConstants.RAGE_MULTIPLIER;
                }
                var monsterTarget = monsterB;
                if (monsterA.hypno && actionData.damage !== 0) {
                    if (Math.random() < .5) {
                        if (MagikMons.GameVars.slotData.state >= MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                            attackData.backfired = true;
                            attackData.type = MagikMons.GameConstants.ATTACK_NORMAL;
                            monsterTarget = monsterA;
                        }
                    }
                }
                if (attackData.backfired) {
                    monsterTarget.life -= totalDamageHack;
                }
                else {
                    monsterTarget.life -= totalDamage;
                }
                if (monsterTarget.life <= 0) {
                    monsterTarget.life = 0;
                    if (player) {
                        MagikMons.GameVars.needChangeMonster = attackData.backfired ? MagikMons.GameConstants.PLAYER_CHANGE : MagikMons.GameConstants.ADVERSARY_CHANGE;
                    }
                    else {
                        MagikMons.GameVars.needChangeMonster = attackData.backfired ? MagikMons.GameConstants.ADVERSARY_CHANGE : MagikMons.GameConstants.PLAYER_CHANGE;
                    }
                }
                if (attackData.backfired) {
                    return { attackData: attackData, hack: monsterA.hypno };
                }
                var previous_1;
                var next_1;
                var needHack_1 = false;
                var needPoison_1 = false;
                if (actionData.special === MagikMons.GameConstants.SPECIAL_ATTACK) {
                    if (actionData.specialTarget === MagikMons.GameConstants.PLAYER) {
                        if (monsterA.life > 0) {
                            previous_1 = monsterA.attack;
                            monsterA.attack += MagikMons.GameConstants.INCREMENT_STATS;
                            next_1 = monsterA.attack;
                        }
                    }
                    else if (monsterB.life > 0) {
                        previous_1 = monsterB.attack;
                        monsterB.attack -= MagikMons.GameConstants.INCREMENT_STATS;
                        next_1 = monsterB.attack;
                    }
                }
                else if (actionData.special === MagikMons.GameConstants.SPECIAL_DEFENSE) {
                    if (actionData.specialTarget === MagikMons.GameConstants.PLAYER) {
                        if (monsterA.life > 0) {
                            previous_1 = monsterA.defense;
                            monsterA.defense += MagikMons.GameConstants.INCREMENT_STATS;
                            next_1 = monsterA.defense;
                        }
                    }
                    else if (monsterB.life > 0) {
                        previous_1 = monsterB.defense;
                        monsterB.defense -= MagikMons.GameConstants.INCREMENT_STATS;
                        next_1 = monsterB.defense;
                    }
                }
                else if (actionData.special === MagikMons.GameConstants.SPECIAL_AIM) {
                    if (actionData.specialTarget === MagikMons.GameConstants.PLAYER) {
                        if (monsterA.life > 0) {
                            previous_1 = monsterA.aiming;
                            monsterA.aiming += MagikMons.GameConstants.INCREMENT_STATS;
                            next_1 = monsterA.aiming;
                        }
                    }
                    else if (monsterB.life > 0) {
                        previous_1 = monsterB.aiming;
                        monsterB.aiming -= MagikMons.GameConstants.INCREMENT_STATS;
                        next_1 = monsterB.aiming;
                    }
                }
                else if (actionData.special === MagikMons.GameConstants.SPECIAL_HACK && MagikMons.GameVars.slotData.state >= MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                    if (Math.random() < actionData.specialFactor) {
                        if (actionData.specialTarget === MagikMons.GameConstants.PLAYER && !monsterA.hypno && monsterA.life > 0) {
                            monsterA.hypno = true;
                            needHack_1 = true;
                        }
                        else if (actionData.specialTarget === MagikMons.GameConstants.ADVERSARY && monsterB.life > 0 && !monsterB.hypno) {
                            monsterB.hypno = true;
                            needHack_1 = true;
                        }
                    }
                }
                else if (actionData.special === MagikMons.GameConstants.SPECIAL_POISON) {
                    if (Math.random() < actionData.specialFactor) {
                        if (actionData.specialTarget === MagikMons.GameConstants.PLAYER && !monsterA.poison && monsterA.life > 0) {
                            monsterA.poison = true;
                            needPoison_1 = true;
                        }
                        else if (actionData.specialTarget === MagikMons.GameConstants.ADVERSARY && monsterB.life > 0 && !monsterB.poison) {
                            monsterB.poison = true;
                            needPoison_1 = true;
                        }
                    }
                }
                else if (actionData.special === MagikMons.GameConstants.SPECIAL_RAGE) {
                    if (actionData.specialTarget === MagikMons.GameConstants.PLAYER && !monsterA.rage && monsterA.life > 0) {
                        monsterA.rage = true;
                    }
                    else if (actionData.specialTarget === MagikMons.GameConstants.ADVERSARY && monsterB.life > 0 && !monsterB.rage) {
                        monsterB.rage = true;
                    }
                }
                if (monsterA.hypno) {
                    this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 6, function () {
                        FightManager.showMonsterStates(needHack_1, needPoison_1);
                    }, this);
                }
                else {
                    FightManager.showMonsterStates(needHack_1, needPoison_1);
                }
                if (monsterA.attack > MagikMons.GameConstants.MAX_ATTACK) {
                    monsterA.attack = MagikMons.GameConstants.MAX_ATTACK;
                    next_1 = monsterA.attack;
                }
                if (monsterB.attack > MagikMons.GameConstants.MAX_ATTACK) {
                    monsterB.attack = MagikMons.GameConstants.MAX_ATTACK;
                    next_1 = monsterB.attack;
                }
                if (monsterA.defense > MagikMons.GameConstants.MAX_DEFENSE) {
                    monsterA.defense = MagikMons.GameConstants.MAX_DEFENSE;
                    next_1 = monsterA.defense;
                }
                if (monsterB.defense > MagikMons.GameConstants.MAX_DEFENSE) {
                    monsterB.defense = MagikMons.GameConstants.MAX_DEFENSE;
                    next_1 = monsterB.defense;
                }
                if (monsterA.aiming > MagikMons.GameConstants.MAX_AIM) {
                    monsterA.aiming = MagikMons.GameConstants.MAX_AIM;
                    next_1 = monsterA.aiming;
                }
                if (monsterB.aiming > MagikMons.GameConstants.MAX_AIM) {
                    monsterB.aiming = MagikMons.GameConstants.MAX_AIM;
                    next_1 = monsterB.aiming;
                }
                if (previous_1) {
                    MagikMons.GameVars.specialAttack = true;
                    var target_1 = actionData.specialTarget;
                    if (!player) {
                        target_1 = actionData.specialTarget === MagikMons.GameConstants.PLAYER ? MagikMons.GameConstants.ADVERSARY : MagikMons.GameConstants.PLAYER;
                    }
                    if (monsterA.hypno) {
                        this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 8, function () {
                            FightManager.showSpecialAction(actionData.special, target_1, previous_1, next_1);
                        }, this);
                    }
                    else {
                        FightManager.showSpecialAction(actionData.special, target_1, previous_1, next_1);
                    }
                }
                return { attackData: attackData, hack: monsterA.hypno };
            }
        };
        FightManager.useItem = function (num, name) {
            FightManager.disableGUI();
            switch (num) {
                case 0:
                    MagikMons.GameVars.slotData.items.healing--;
                    FightManager.useItemHeal();
                    break;
                case 1:
                    MagikMons.GameVars.slotData.items.hypnoCure--;
                    FightManager.useItemSpecial(MagikMons.GameConstants.SPECIAL_HACK);
                    break;
                case 2:
                    MagikMons.GameVars.slotData.items.defenseIncrease--;
                    FightManager.useItemIncrease(MagikMons.GameConstants.SPECIAL_DEFENSE);
                    break;
                case 3:
                    MagikMons.GameVars.slotData.items.antidote--;
                    FightManager.useItemSpecial(MagikMons.GameConstants.SPECIAL_POISON);
                    break;
                case 4:
                    MagikMons.GameVars.slotData.items.attackIncrease--;
                    FightManager.useItemIncrease(MagikMons.GameConstants.SPECIAL_ATTACK);
                    break;
                case 5:
                    MagikMons.GameVars.slotData.items.aimingIncrease--;
                    FightManager.useItemIncrease(MagikMons.GameConstants.SPECIAL_AIM);
                    break;
                default:
                    break;
            }
            MagikMons.FightState.currentInstance.showUseItem(name);
            FightManager.actualizeItemsMenu();
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 9, FightManager.changeTurn, this);
        };
        FightManager.useItemHeal = function () {
            var monster = MagikMons.GameVars.playerMonstersFighting[0];
            monster.life = monster.maxLife;
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 2, function () {
                MagikMons.FightState.currentInstance.updateLife(MagikMons.GameConstants.PLAYER);
            }, this);
        };
        FightManager.useItemSpecial = function (type) {
            var monster = MagikMons.GameVars.playerMonstersFighting[0];
            if (type === MagikMons.GameConstants.SPECIAL_POISON) {
                monster.poison = false;
            }
            else if (type === MagikMons.GameConstants.SPECIAL_HACK) {
                monster.hypno = false;
            }
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 4, FightManager.showMonsterStates, this);
        };
        FightManager.useItemIncrease = function (type) {
            var monster = MagikMons.GameVars.playerMonstersFighting[0];
            var previous;
            var next;
            if (type === MagikMons.GameConstants.SPECIAL_DEFENSE) {
                previous = monster.defense;
                monster.defense += MagikMons.GameConstants.INCREMENT_STATS;
                next = monster.defense;
            }
            else if (type === MagikMons.GameConstants.SPECIAL_ATTACK) {
                previous = monster.attack;
                monster.attack += MagikMons.GameConstants.INCREMENT_STATS;
                next = monster.attack;
            }
            else if (type === MagikMons.GameConstants.SPECIAL_AIM) {
                previous = monster.aiming;
                monster.aiming += MagikMons.GameConstants.INCREMENT_STATS;
                next = monster.aiming;
            }
            if (monster.attack > MagikMons.GameConstants.MAX_ATTACK) {
                monster.attack = MagikMons.GameConstants.MAX_ATTACK;
                next = monster.attack;
            }
            if (monster.defense > MagikMons.GameConstants.MAX_DEFENSE) {
                monster.defense = MagikMons.GameConstants.MAX_DEFENSE;
                next = monster.defense;
            }
            if (monster.aiming > MagikMons.GameConstants.MAX_AIM) {
                monster.aiming = MagikMons.GameConstants.MAX_AIM;
                next = monster.aiming;
            }
            FightManager.showSpecialAction(type, MagikMons.GameConstants.PLAYER, previous, next);
        };
        FightManager.actualizeItemsMenu = function () {
            MagikMons.FightState.currentInstance.actualizeItemsMenu();
        };
        FightManager.showMonsterStates = function (needHack, needPoison) {
            MagikMons.FightState.currentInstance.showMonsterStates(needHack, needPoison);
        };
        FightManager.showSpecialAction = function (type, target, previous, next) {
            MagikMons.FightState.currentInstance.showSpecialAction(type, target, previous, next);
        };
        FightManager.endFight = function (win) {
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ATTACK) {
                MagikMons.GameManager.endAttackTutorial();
            }
            MagikMons.GameVars.xpEarned = new Array();
            for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                var monster = MagikMons.GameVars.playerMonstersFighting[i];
                var xp = 0;
                if (monster.life === 0) {
                    MagikMons.GameVars.xpEarned.push(xp);
                }
                else {
                    for (var j = 0; j < MagikMons.GameVars.xpDistribution.length; j++) {
                        var dist = MagikMons.GameVars.xpDistribution[j];
                        var index = dist.monsters.indexOf(monster.id);
                        if (index !== -1) {
                            xp += dist.xp / dist.monsters.length;
                        }
                    }
                    MagikMons.GameVars.xpEarned.push(xp);
                }
            }
            MagikMons.FightState.currentInstance.removeStates();
            MagikMons.FightState.currentInstance.showEndFight(win);
        };
        FightManager.enableGUI = function () {
            MagikMons.FightState.currentInstance.enableGUI();
        };
        FightManager.disableGUI = function () {
            MagikMons.FightState.currentInstance.disableGUI();
        };
        FightManager.hideMenuLayer = function () {
            MagikMons.FightState.currentInstance.hideMenuLayer();
        };
        return FightManager;
    }());
    MagikMons.FightManager = FightManager;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var FightState = (function (_super) {
        __extends(FightState, _super);
        function FightState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FightState.prototype.init = function () {
            FightState.currentInstance = this;
            MagikMons.FightManager.init(this.game);
            MagikMons.AudioManager.stopSound("music_map", true, true);
            MagikMons.AudioManager.stopSound("music_dialogue", true, true);
        };
        FightState.prototype.create = function () {
            this.game.stage.backgroundColor = 0x11252c;
            var background = new MagikMons.BackgroundFight(this.game);
            this.add.existing(background);
            this.backgroundAttack = new MagikMons.BackgroundAttack(this.game);
            this.backgroundAttack.visible = false;
            this.add.existing(this.backgroundAttack);
            var scaledItemsContainer = this.add.group();
            scaledItemsContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            scaledItemsContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            scaledItemsContainer.scale.y = MagikMons.GameVars.scaleY;
            this.monstersContainer = new MagikMons.MonstersContainer(this.game);
            scaledItemsContainer.add(this.monstersContainer);
            this.hud = new MagikMons.FightHUD(this.game);
            scaledItemsContainer.add(this.hud);
            this.gui = new MagikMons.FightGUI(this.game);
            this.add.existing(this.gui);
            this.managementLayer = new MagikMons.ManagementLayer(this.game);
            this.add.existing(this.managementLayer);
            MagikMons.AudioManager.playSound("music_fight", true, 1, true);
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                this.gui.enableMoreOnly();
            }
            MagikMons.GameManager.defaultCursor();
        };
        FightState.prototype.shutdown = function () {
            FightState.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        FightState.prototype.render = function () {
            if (MagikMons.GameConstants.FPS) {
                this.game.debug.text(this.game.time.fps.toString(), MagikMons.GameConstants.GAME_WIDTH - 30, 30, "#ffffff", "20px Arial");
            }
        };
        FightState.prototype.animationTutorialAttack = function () {
            this.monstersContainer.animationAttack(this.monstersContainer.player, null);
            this.disableGUI();
            this.monstersContainer.changeAuraTutorial();
            MagikMons.GameVars.turn = MagikMons.GameConstants.ADVERSARY;
            this.game.time.events.add(3000, function () {
                this.monstersContainer.animationAttack(this.monstersContainer.adversary, null);
            }, this);
            this.game.time.events.add(5500, function () {
                MagikMons.GameVars.turn = MagikMons.GameConstants.PLAYER;
                this.gui.showMoreButton();
            }, this);
        };
        FightState.prototype.animationCatch = function () {
            this.monstersContainer.animationCatch();
            this.hud.animationCatch();
            this.gui.hideMovementsContainer();
        };
        FightState.prototype.animationReturnToFight = function () {
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 5, function () {
                this.monstersContainer.animationReturnToFight();
                this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 7, function () {
                    this.hud.animationReturnToFight();
                    this.gui.showMovementsContainer();
                }, this);
                this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 7, function () {
                    MagikMons.FightManager.changeTurn();
                }, this);
            }, this);
        };
        FightState.prototype.successfulCatch = function () {
            this.monstersContainer.adversary.monsterToIcon();
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 4, function () {
                this.monstersContainer.hideAdversary();
                this.managementLayer.show();
                MagikMons.AudioManager.playSound("musica_victory");
            }, this);
        };
        FightState.prototype.showCatchAnimation = function () {
            this.monstersContainer.adversary.showCatchAnimation();
        };
        FightState.prototype.changeSignClass = function (monsterClass) {
            this.monstersContainer.changeSignClass(monsterClass);
        };
        FightState.prototype.actualizeItemsMenu = function () {
            this.gui.actualizeItemsMenu();
        };
        FightState.prototype.showUseItem = function (name) {
            this.monstersContainer.showUseItem(name);
        };
        FightState.prototype.updateLife = function (target, poison) {
            this.hud.updateLife(target);
            if (target === MagikMons.GameConstants.PLAYER) {
                this.monstersContainer.player.poisonAnimation();
            }
            else {
                this.monstersContainer.adversary.poisonAnimation();
            }
        };
        FightState.prototype.showMonsterStates = function (needHack, needPoison) {
            this.hud.showMonsterStates(needHack, needPoison);
            this.monstersContainer.showMonsterStates();
        };
        FightState.prototype.showSpecialAction = function (type, target, previous, next) {
            this.hud.showSpecialAction(type, target, previous, next);
        };
        FightState.prototype.changePlayerMonster = function () {
            this.monstersContainer.changePlayerMonster();
            this.hud.changePlayerMonster();
            this.gui.changePlayerMonster();
        };
        FightState.prototype.changeAdversaryMonster = function () {
            this.monstersContainer.changeAdversaryMonster();
            this.hud.changeAdversaryMonster();
        };
        FightState.prototype.retireAdversaryMonster = function () {
            this.monstersContainer.retireAdversaryMonster();
            this.hud.retireAdversaryMonster();
        };
        FightState.prototype.turnChanged = function () {
            this.monstersContainer.turnChanged();
            this.gui.turnChanged();
        };
        FightState.prototype.playerAttack = function (data) {
            if (data.hack) {
                this.hud.animationBackfired(data.attackData, MagikMons.GameConstants.PLAYER);
            }
            else {
                this.playerAttackAnimation(data.attackData);
            }
        };
        FightState.prototype.playerAttackAnimation = function (attackData) {
            if (attackData.id === "004" || attackData.id === "008" || attackData.id === "012" || attackData.id === "016") {
                if (!attackData.miss && !attackData.backfired) {
                    this.setBackgroundAttack(attackData.id);
                }
                this.game.time.events.add(1000, function () {
                    this.monstersContainer.playerAttack(attackData);
                    this.hud.newAttack(attackData, attackData.backfired ? MagikMons.GameConstants.PLAYER : MagikMons.GameConstants.ADVERSARY);
                }, this);
            }
            else {
                this.monstersContainer.playerAttack(attackData);
                this.hud.newAttack(attackData, attackData.backfired ? MagikMons.GameConstants.PLAYER : MagikMons.GameConstants.ADVERSARY);
            }
        };
        FightState.prototype.adversaryAttack = function (data) {
            if (data.hack) {
                this.hud.animationBackfired(data.attackData, MagikMons.GameConstants.ADVERSARY);
            }
            else {
                this.adversaryAttackAnimation(data.attackData);
            }
        };
        FightState.prototype.adversaryAttackAnimation = function (attackData) {
            if (attackData.id === "004" || attackData.id === "008" || attackData.id === "012" || attackData.id === "016") {
                if (!attackData.miss && !attackData.backfired) {
                    this.setBackgroundAttack(attackData.id);
                }
                this.game.time.events.add(1000, function () {
                    this.monstersContainer.adversaryAttack(attackData);
                    this.hud.newAttack(attackData, attackData.backfired ? MagikMons.GameConstants.ADVERSARY : MagikMons.GameConstants.PLAYER);
                }, this);
            }
            else {
                this.monstersContainer.adversaryAttack(attackData);
                this.hud.newAttack(attackData, attackData.backfired ? MagikMons.GameConstants.ADVERSARY : MagikMons.GameConstants.PLAYER);
            }
        };
        FightState.prototype.setBackgroundAttack = function (id) {
            this.backgroundAttack.setBackground(id);
            this.game.time.events.add(2750, function () {
                this.backgroundAttack.hide();
            }, this);
        };
        FightState.prototype.removeStates = function () {
            this.monstersContainer.player.monsterData.hypno = false;
            this.monstersContainer.player.monsterData.poison = false;
            this.monstersContainer.adversary.monsterData.hypno = false;
            this.monstersContainer.adversary.monsterData.poison = false;
        };
        FightState.prototype.showEndFight = function (win) {
            this.endFightLayer = new MagikMons.EndFightLayer(this.game, win);
            this.add.existing(this.endFightLayer);
        };
        FightState.prototype.enableGUI = function () {
            this.gui.enable();
        };
        FightState.prototype.disableGUI = function () {
            this.gui.disable();
        };
        FightState.prototype.hideMenuLayer = function () {
            this.gui.hideMenuLayer();
        };
        FightState.prototype.deadPlayerMonster = function (endGame) {
            if (endGame) {
                MagikMons.FightManager.endFight(false);
            }
            else {
                this.gui.onClickMore();
            }
            this.monstersContainer.deadPlayerMonster();
        };
        return FightState;
    }(Phaser.State));
    MagikMons.FightState = FightState;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var EndFightLayer = (function (_super) {
        __extends(EndFightLayer, _super);
        function EndFightLayer(game, win) {
            var _this = _super.call(this, game, null, "end-fight-layer") || this;
            EndFightLayer.currentInstance = _this;
            _this.animationNumber = -1;
            _this.winBool = win;
            _this.previousWisp = 0;
            _this.updateWisp = false;
            var darkLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            darkLayer.alpha = .95;
            darkLayer.tint = 0x11252c;
            darkLayer.inputEnabled = true;
            darkLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            darkLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(darkLayer);
            var line1 = _this.create(10, 10, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            line1.tint = 0x00f2ff;
            line1.scale.set((MagikMons.GameConstants.GAME_WIDTH - 20) / MagikMons.GameConstants.BITMAP_SIZE, (2 * MagikMons.GameVars.scaleY) / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(line1);
            var line2 = _this.create(10, MagikMons.GameConstants.GAME_HEIGHT - 10, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            line2.tint = 0x00f2ff;
            line2.scale.set((MagikMons.GameConstants.GAME_WIDTH - 20) / MagikMons.GameConstants.BITMAP_SIZE, (2 * MagikMons.GameVars.scaleY) / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(line2);
            var line3 = _this.create(10, 10, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            line3.tint = 0x00f2ff;
            line3.scale.set(2 / MagikMons.GameConstants.BITMAP_SIZE, (MagikMons.GameConstants.GAME_HEIGHT - 20) / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(line3);
            var line4 = _this.create(MagikMons.GameConstants.GAME_WIDTH - 10 - 2, 10, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            line4.tint = 0x00f2ff;
            line4.scale.set(2 / MagikMons.GameConstants.BITMAP_SIZE, (MagikMons.GameConstants.GAME_HEIGHT - 20) / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(line4);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.y = 5;
            topContainer.alpha = 0;
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            var tab = new Phaser.Image(_this.game, 120, 0, "texture_atlas_1", "tab_area_big.png");
            tab.anchor.set(.5, 0);
            topContainer.add(tab);
            var title = new Phaser.Text(_this.game, 120, 12, "", { font: "27px Chewy", fontWeight: "400", fill: "#ffb63b" });
            title.anchor.set(.5, 0);
            topContainer.add(title);
            if (win) {
                title.text = MagikMons.GameVars.names["VICTORY"];
            }
            else {
                title.text = MagikMons.GameVars.names["DEFEAT"];
            }
            var tabWisps = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 0, "texture_atlas_1", "tab_wisps.png");
            tabWisps.anchor.set(1, 0);
            topContainer.add(tabWisps);
            _this.wisp = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH - 50, 30, MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp), { font: "25px Chewy", fill: "#59ffff" });
            _this.wisp.anchor.set(1, .5);
            topContainer.add(_this.wisp);
            var monstersContainer = new Phaser.Group(_this.game);
            monstersContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            monstersContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            monstersContainer.scale.y = MagikMons.GameVars.scaleY;
            monstersContainer.alpha = 0;
            _this.add(monstersContainer);
            _this.monstersEndFight = new Array();
            var positions = new Array();
            if (MagikMons.GameVars.playerMonstersFighting.length === 1) {
                positions.push({ x: 0, y: -20, top: false });
            }
            else if (MagikMons.GameVars.playerMonstersFighting.length === 2) {
                positions.push({ x: -110, y: -20, top: false });
                positions.push({ x: 110, y: -20, top: false });
            }
            else if (MagikMons.GameVars.playerMonstersFighting.length === 3) {
                positions.push({ x: 0, y: -80, top: true });
                positions.push({ x: -110, y: 80, top: false });
                positions.push({ x: 110, y: 80, top: false });
            }
            for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                var monster = new MagikMons.MonsterEndFight(_this.game, MagikMons.GameVars.playerMonstersFighting[i], positions[i].x, positions[i].y, positions[i].top);
                monstersContainer.add(monster);
                _this.monstersEndFight.push(monster);
            }
            _this.continueButton = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, MagikMons.GameConstants.GAME_HEIGHT - 5, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onClickContinue, _this);
            _this.continueButton.setFrames("btn_continue_over.png", "btn_continue.png", "btn_continue_over.png");
            _this.continueButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.continueButton.scale.y = MagikMons.GameVars.scaleY;
            _this.continueButton.visible = false;
            _this.continueButton.alpha = 0;
            _this.continueButton.anchor.set(.5, 1);
            _this.add(_this.continueButton);
            _this.newActionEndFight = new MagikMons.NewActionEndFight(_this.game);
            _this.add(_this.newActionEndFight);
            _this.alpha = 0;
            _this.game.add.tween(_this)
                .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            _this.game.add.tween(topContainer)
                .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            _this.game.add.tween(monstersContainer)
                .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(_this.nextAnimationMonster, _this);
            MagikMons.AudioManager.stopSound("music_fight", true, true);
            if (win) {
                MagikMons.AudioManager.playSound("musica_victory");
            }
            else {
                MagikMons.AudioManager.playSound("musica_defeat");
            }
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                if (win && MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                    PokiSDK.happyTime(1);
                }
            }
            return _this;
        }
        EndFightLayer.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updateWisp) {
                if (this.previousWisp < MagikMons.GameVars.slotData.wisp) {
                    this.previousWisp += this.wispEarned / 10;
                    if (this.previousWisp > MagikMons.GameVars.slotData.wisp) {
                        this.previousWisp = MagikMons.GameVars.slotData.wisp;
                    }
                    this.wisp.text = MagikMons.Utils.validNumber(Math.round(this.previousWisp));
                }
                else {
                    this.updateWisp = false;
                }
            }
        };
        EndFightLayer.prototype.nextAnimationMonster = function () {
            this.animationNumber++;
            if (this.animationNumber < this.monstersEndFight.length) {
                for (var i = 0; i < this.monstersEndFight.length; i++) {
                    this.monstersEndFight[i].hideMonster();
                }
                var xp = 0;
                if (MagikMons.GameVars.xpEarned) {
                    xp = MagikMons.GameVars.xpEarned[this.animationNumber];
                }
                this.monstersEndFight[this.animationNumber].animationXp(xp);
            }
            else {
                this.showContinue();
            }
        };
        EndFightLayer.prototype.showNewAction = function (action, restExp) {
            this.restExp = restExp;
            this.newActionEndFight.show(action.id);
        };
        EndFightLayer.prototype.hideNewAction = function () {
            this.game.time.events.add(250, function () {
                this.monstersEndFight[this.animationNumber].animationXp(this.restExp);
            }, this);
        };
        EndFightLayer.prototype.showContinue = function () {
            this.continueButton.visible = true;
            this.game.add.tween(this.continueButton)
                .to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            this.manageWisp();
            for (var i = 0; i < this.monstersEndFight.length; i++) {
                if (this.monstersEndFight[i].monsterData.life > 0) {
                    this.monstersEndFight[i].showMonster(false);
                }
                else {
                    this.monstersEndFight[i].hideMonster();
                }
            }
        };
        EndFightLayer.prototype.manageWisp = function () {
            if (this.winBool) {
                this.updateWisp = true;
                this.previousWisp = MagikMons.GameVars.slotData.wisp;
                this.wispEarned = 0;
                for (var i = 0; i < MagikMons.GameVars.adversaryMonstersFighting.length; i++) {
                    this.wispEarned += Math.round(25 + MagikMons.GameVars.adversaryMonstersFighting[i].level);
                }
                MagikMons.GameVars.slotData.wisp += this.wispEarned;
            }
        };
        EndFightLayer.prototype.onClickContinue = function () {
            var _this = this;
            this.continueButton.scale.set(1, MagikMons.GameVars.scaleY);
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.commercialBreak().then(function () {
                    MagikMons.GameManager.fightToMap(_this.winBool);
                });
            }
            else {
                MagikMons.GameManager.fightToMap(this.winBool);
            }
        };
        EndFightLayer.prototype.onButtonDown = function (b) {
            b.scale.set(1.1, 1.1 * MagikMons.GameVars.scaleY);
        };
        EndFightLayer.prototype.onClickDarkLayer = function () {
        };
        return EndFightLayer;
    }(Phaser.Group));
    MagikMons.EndFightLayer = EndFightLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MonsterEndFight = (function (_super) {
        __extends(MonsterEndFight, _super);
        function MonsterEndFight(game, monsterData, x, y, topBar) {
            var _this = _super.call(this, game, null, "monster-end-fight") || this;
            _this.x = x;
            _this.y = y;
            _this.monsterData = monsterData;
            _this.rays = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "fx_radial_rays.png");
            _this.rays.anchor.set(.5);
            _this.rays.alpha = 0;
            _this.rays.scale.set(.5);
            _this.add(_this.rays);
            _this.mkm = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "current_mkm_" + _this.monsterData.class + ".png");
            _this.mkm.anchor.set(.5);
            _this.mkm.alpha = .5;
            _this.mkm.scale.set(.6);
            _this.add(_this.mkm);
            _this.monster = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", "mkm_" + _this.monsterData.id + "_front.png");
            _this.monster.anchor.set(.5, .6);
            _this.monster.scale.set(.6);
            _this.monster.alpha = .5;
            _this.add(_this.monster);
            _this.level = new Phaser.Text(_this.game, 50, 55, _this.monsterData.level + "", { font: "45px Chewy", fontWeight: "400", fill: "#000000" });
            _this.level.anchor.set(0, .5);
            _this.level.stroke = "#11252c";
            _this.level.strokeThickness = 8;
            _this.level.alpha = .5;
            _this.add(_this.level);
            var monsterBar = new Phaser.Group(_this.game);
            monsterBar.y = topBar ? -130 : 110;
            _this.add(monsterBar);
            var capsule = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "monster-capsule-" + _this.monsterData.class + ".png");
            capsule.anchor.set(.5);
            capsule.scale.set(.72);
            monsterBar.add(capsule);
            var monsterName = new Phaser.Text(_this.game, -17, 6, _this.monsterData.name, { font: "20px Chewy", fontWeight: "400", fill: "#000000" });
            monsterName.anchor.set(.5);
            monsterBar.add(monsterName);
            var xLevel = -50;
            var yLevel = 30;
            var xpIcon = new Phaser.Image(_this.game, xLevel - 33, yLevel + 6, "texture_atlas_1", "icon_xp.png");
            xpIcon.anchor.set(0, .5);
            xpIcon.scale.set(.8);
            monsterBar.add(xpIcon);
            var levelBarBackground = new Phaser.Sprite(_this.game, xLevel, yLevel, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            levelBarBackground.scale.set((MonsterEndFight.LEVEL_BAR_LENGTH + 6) / 64, 11 / 64);
            levelBarBackground.tint = 0xa84e03;
            monsterBar.add(levelBarBackground);
            var levelMax = MagikMons.Utils.levelToXp(_this.monsterData.level);
            var barLength = _this.monsterData.xp / levelMax * MonsterEndFight.LEVEL_BAR_LENGTH;
            var levelBarBack = new Phaser.Sprite(_this.game, xLevel + 3, yLevel + 3, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            levelBarBack.scale.set(MonsterEndFight.LEVEL_BAR_LENGTH / 64, 5 / 64);
            levelBarBack.tint = 0x9a7838;
            monsterBar.add(levelBarBack);
            _this.levelBar = new Phaser.Sprite(_this.game, xLevel + 3, yLevel + 3, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.levelBar.scale.set(barLength / 64, 5 / 64);
            _this.levelBar.tint = 0xfdff89;
            monsterBar.add(_this.levelBar);
            if (_this.monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                _this.level.fill = "#ff9c50";
                _this.level.stroke = "#40241D";
                monsterName.font = "Pythia";
                monsterName.fontSize = "20px";
                monsterName.fill = "#5b473c";
                _this.rays.tint = 0xff9c50;
            }
            else if (_this.monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                _this.level.fill = "#b9a8ff";
                _this.level.stroke = "#300949";
                monsterName.font = "Goonies";
                monsterName.fontSize = "20px";
                monsterName.fill = "#2a3147";
                _this.rays.tint = 0xb9a8ff;
            }
            else if (_this.monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                _this.level.fill = "#00dfa9";
                _this.level.stroke = "#102932";
                monsterName.font = "Adineue";
                monsterName.fontSize = "22px";
                monsterName.fill = "#ffffff";
                _this.rays.tint = 0x00dfa9;
            }
            return _this;
        }
        MonsterEndFight.prototype.animationXp = function (xp) {
            if (xp === 0) {
                MagikMons.EndFightLayer.currentInstance.nextAnimationMonster();
                return;
            }
            var levelUp = false;
            var restXp = 0;
            this.monsterData.xp += xp;
            if (this.monsterData.xp > MagikMons.Utils.levelToXp(this.monsterData.level)) {
                restXp = this.monsterData.xp - MagikMons.Utils.levelToXp(this.monsterData.level);
                this.monsterData.xp = MagikMons.Utils.levelToXp(this.monsterData.level);
                levelUp = true;
            }
            var levelMax = MagikMons.Utils.levelToXp(this.monsterData.level);
            var barLength = this.monsterData.xp / levelMax * MonsterEndFight.LEVEL_BAR_LENGTH;
            var time = (barLength / 64 - this.levelBar.scale.x) * 400 + 250;
            this.showMonster(true, time);
            this.game.add.tween(this.levelBar.scale)
                .to({ x: barLength / 64 }, time, Phaser.Easing.Linear.None, true, 250)
                .onComplete.add(function () {
                if (levelUp) {
                    this.levelUpMonster(restXp);
                }
                else {
                    MagikMons.EndFightLayer.currentInstance.nextAnimationMonster();
                }
            }, this);
        };
        MonsterEndFight.prototype.hideMonster = function () {
            this.game.add.tween(this.mkm)
                .to({ alpha: .5 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.monster)
                .to({ alpha: .5 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.level)
                .to({ alpha: .5 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.rays)
                .to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
        };
        MonsterEndFight.prototype.showMonster = function (rays, time) {
            this.game.add.tween(this.mkm)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.monster)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.level)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            if (time < 20) {
                time = 20;
            }
            if (rays) {
                this.game.add.tween(this.rays)
                    .to({ alpha: 1 }, time - 10, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.rays.scale)
                    .to({ x: 1, y: 1 }, time - 10, Phaser.Easing.Cubic.Out, true);
            }
            else {
                this.game.add.tween(this.rays)
                    .to({ alpha: 0 }, time - 10, Phaser.Easing.Linear.None, true);
            }
        };
        MonsterEndFight.prototype.levelUpMonster = function (restXp) {
            this.monsterData.xp = 0;
            this.monsterData.level++;
            this.showLevelUp();
            this.game.add.tween(this.level.scale)
                .to({ y: 0 }, 100, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.level.text = this.monsterData.level + "";
                this.game.add.tween(this.level.scale)
                    .to({ y: 1 }, 300, Phaser.Easing.Elastic.Out, true);
            }, this);
            var nextAction = 0;
            if (this.monsterData.level === MagikMons.GameConstants.LEVEL_ATTACK_1) {
                nextAction = 1;
            }
            else if (this.monsterData.level === MagikMons.GameConstants.LEVEL_ATTACK_2) {
                nextAction = 2;
            }
            else if (this.monsterData.level === MagikMons.GameConstants.LEVEL_ATTACK_3) {
                nextAction = 3;
            }
            if (nextAction !== 0) {
                this.game.time.events.add(500, function () {
                    this.levelBar.scale.x = 0;
                    MagikMons.EndFightLayer.currentInstance.showNewAction(this.monsterData.actions[nextAction], restXp);
                }, this);
            }
            else {
                this.game.time.events.add(1000, function () {
                    this.levelBar.scale.x = 0;
                    this.animationXp(restXp);
                }, this);
            }
        };
        MonsterEndFight.prototype.showLevelUp = function () {
            var levelUp = new Phaser.Text(this.game, 0, -50, MagikMons.GameVars.names["LEVEL UP"], { font: "30px Chewy", fontWeight: "400", fill: "#000000" });
            levelUp.stroke = "#11252c";
            levelUp.anchor.set(.5);
            levelUp.strokeThickness = 6;
            levelUp.alpha = 0;
            this.add(levelUp);
            if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                levelUp.fill = "#ff9c50";
            }
            else if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                levelUp.fill = "#b9a8ff";
            }
            else if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                levelUp.fill = "#00dfa9";
            }
            this.game.add.tween(levelUp)
                .to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.game.add.tween(levelUp)
                    .to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 500)
                    .onComplete.add(function () {
                    levelUp.destroy();
                }, this);
            }, this);
        };
        MonsterEndFight.LEVEL_BAR_LENGTH = 125;
        return MonsterEndFight;
    }(Phaser.Group));
    MagikMons.MonsterEndFight = MonsterEndFight;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var NewActionEndFight = (function (_super) {
        __extends(NewActionEndFight, _super);
        function NewActionEndFight(game) {
            var _this = _super.call(this, game, null, "new-action-end-fight") || this;
            _this.visible = false;
            _this.scale.y = MagikMons.GameVars.scaleY;
            var darkLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            darkLayer.alpha = .5;
            darkLayer.tint = 0x102932;
            darkLayer.inputEnabled = true;
            darkLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            darkLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(darkLayer);
            _this.midContainer = new Phaser.Group(_this.game);
            _this.midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            _this.midContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            _this.midContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.midContainer);
            _this.layer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.layer.tint = 0x102932;
            _this.layer.anchor.set(.5);
            _this.layer.scale.set(220 / MagikMons.GameConstants.BITMAP_SIZE, 220 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.midContainer.add(_this.layer);
            var frame = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "frame_new_attack.png");
            frame.anchor.set(.5);
            _this.midContainer.add(frame);
            _this.newAttack = new Phaser.Text(_this.game, 0, -105, MagikMons.GameVars.names["NEW ATTACK"], { font: "36px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.newAttack.anchor.set(.5);
            _this.newAttack.stroke = "#102932";
            _this.newAttack.strokeThickness = 8;
            _this.midContainer.add(_this.newAttack);
            _this.image = new Phaser.Image(_this.game, 0, -50, "texture_atlas_1", "btn_attack_001.png");
            _this.image.anchor.set(.5);
            _this.midContainer.add(_this.image);
            _this.actionName = new Phaser.Text(_this.game, 0, 0, "", { font: "26px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.actionName.anchor.set(.5);
            _this.midContainer.add(_this.actionName);
            _this.damage = new Phaser.Text(_this.game, 0, 40, "", { font: "18px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.damage.anchor.set(.5);
            _this.midContainer.add(_this.damage);
            _this.cooldown = new Phaser.Text(_this.game, 0, 65, "", { font: "18px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.cooldown.anchor.set(.5);
            _this.midContainer.add(_this.cooldown);
            _this.special1 = new Phaser.Text(_this.game, 0, 90, "", { font: "18px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.special1.anchor.set(1, .5);
            _this.midContainer.add(_this.special1);
            _this.specialImg1 = new Phaser.Image(_this.game, 32, 80, "texture_atlas_1", "icon_buff.png");
            _this.specialImg1.anchor.set(.5);
            _this.specialImg1.scale.set(.8);
            _this.midContainer.add(_this.specialImg1);
            _this.specialImg2 = new Phaser.Image(_this.game, 15, 88, "texture_atlas_1", "icon_attack.png");
            _this.specialImg2.anchor.set(.5);
            _this.specialImg2.scale.set(.75);
            _this.midContainer.add(_this.specialImg2);
            _this.special2 = new Phaser.Text(_this.game, 45, 90, "", { font: "18px Chewy", fontWeight: "400", fill: "#00dfa9" });
            _this.special2.anchor.set(0, .5);
            _this.midContainer.add(_this.special2);
            return _this;
        }
        NewActionEndFight.prototype.show = function (actionId) {
            this.visible = true;
            this.alpha = 0;
            this.midContainer.scale.set(0);
            this.game.add.tween(this)
                .to({ alpha: 1 }, 250, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.midContainer.scale)
                .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            var action = MagikMons.GameVars.monstersActions[actionId];
            this.image.frameName = "btn_attack_" + actionId + ".png";
            this.actionName.text = action.name.toUpperCase();
            this.damage.text = MagikMons.GameVars.names["DAMAGE"] + ": " + Math.round(action.damage * 10);
            if (action.cooldown === 1) {
                this.cooldown.text = MagikMons.GameVars.names["COOLDOWN"] + ": " + action.cooldown + " " + MagikMons.GameVars.names["TURN"];
            }
            else {
                this.cooldown.text = MagikMons.GameVars.names["COOLDOWN"] + ": " + action.cooldown + " " + MagikMons.GameVars.names["TURNS"];
            }
            if (action.special !== MagikMons.GameConstants.SPECIAL_NONE) {
                this.special1.text = MagikMons.GameVars.names["SPECIAL"] + ": ";
                if (action.specialTarget === MagikMons.GameConstants.PLAYER) {
                    this.special2.text = MagikMons.GameVars.names["SELF"];
                }
                else {
                    this.special2.text = MagikMons.GameVars.names["RIVAL"];
                }
                if (action.specialFactor > 1) {
                    this.specialImg1.frameName = "icon_buff.png";
                }
                else {
                    this.specialImg1.frameName = "icon_nerf.png";
                }
                this.specialImg2.frameName = "icon_" + action.special + ".png";
                this.specialImg2.visible = true;
                if (action.special !== MagikMons.GameConstants.SPECIAL_POISON && action.special !== MagikMons.GameConstants.SPECIAL_HACK && action.special !== MagikMons.GameConstants.SPECIAL_RAGE) {
                    this.specialImg1.visible = true;
                    this.special2.x = 45;
                }
                else {
                    this.specialImg1.visible = false;
                    this.special2.x = 38;
                }
            }
            else {
                this.special1.text = "";
                this.special2.text = "";
                this.specialImg1.visible = false;
                this.specialImg2.visible = false;
            }
            if (action.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.newAttack.text = MagikMons.GameVars.names["NEW ATTACK"] + " " + MagikMons.GameVars.names["CLASSIC"].replace("Á", "A") + "!";
                this.layer.tint = 0x40241D;
                this.newAttack.fill = "#ff9c50";
                this.newAttack.stroke = "#40241D";
                this.actionName.fill = "#ff9c50";
                this.damage.fill = "#ff9c50";
                this.special1.fill = "#ff9c50";
                this.special2.fill = "#ff9c50";
                this.cooldown.fill = "#ff9c50";
                MagikMons.AudioManager.playSound("new_attack_classic");
            }
            else if (action.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.newAttack.text = MagikMons.GameVars.names["NEW ATTACK"] + " " + MagikMons.GameVars.names["SPECTRE"] + "!";
                this.layer.tint = 0x2A1A3D;
                this.newAttack.fill = "#b9a8ff";
                this.newAttack.stroke = "#2A1A3D";
                this.actionName.fill = "#b9a8ff";
                this.damage.fill = "#b9a8ff";
                this.special1.fill = "#b9a8ff";
                this.special2.fill = "#b9a8ff";
                this.cooldown.fill = "#b9a8ff";
                MagikMons.AudioManager.playSound("new_attack_spectre");
            }
            else if (action.class === MagikMons.GameConstants.ELEMENT_TECH) {
                this.newAttack.text = MagikMons.GameVars.names["NEW ATTACK"] + " " + MagikMons.GameVars.names["TECH"] + "!";
                this.layer.tint = 0x102932;
                this.newAttack.fill = "#00dfa9";
                this.newAttack.stroke = "#102932";
                this.actionName.fill = "#00dfa9";
                this.damage.fill = "#00dfa9";
                this.special1.fill = "#00dfa9";
                this.special2.fill = "#00dfa9";
                this.cooldown.fill = "#00dfa9";
                MagikMons.AudioManager.playSound("new_attack_tech");
            }
            else {
                this.newAttack.text = MagikMons.GameVars.names["NEW ATTACK"] + " " + MagikMons.GameVars.names["GENERIC"] + "!";
                this.layer.tint = 0x0c2b48;
                this.newAttack.fill = "#59ffff";
                this.newAttack.stroke = "#0c2b48";
                this.actionName.fill = "#59ffff";
                this.damage.fill = "#59ffff";
                this.special1.fill = "#59ffff";
                this.special2.fill = "#59ffff";
                this.cooldown.fill = "#59ffff";
                MagikMons.AudioManager.playSound("new_attack_generic");
            }
        };
        NewActionEndFight.prototype.onClickDarkLayer = function () {
            this.visible = false;
            MagikMons.EndFightLayer.currentInstance.hideNewAction();
        };
        return NewActionEndFight;
    }(Phaser.Group));
    MagikMons.NewActionEndFight = NewActionEndFight;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var FightGUI = (function (_super) {
        __extends(FightGUI, _super);
        function FightGUI(game) {
            var _this = _super.call(this, game, null, "gui") || this;
            _this.tutorialCounter = 0;
            _this.extraCatchUsed = false;
            _this.container = new Phaser.Group(_this.game);
            _this.container.y = MagikMons.GameConstants.GAME_HEIGHT;
            _this.container.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.container);
            _this.moreButton = new Phaser.Button(_this.game, 2, -2, "texture_atlas_1", _this.onClickMore, _this);
            _this.moreButton.setFrames("btn_more.png", "btn_more.png", "btn_more.png");
            _this.moreButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.moreButton.input.useHandCursor = true;
            _this.moreButton.anchor.set(0, 1);
            _this.moreButton.forceOut = true;
            _this.container.add(_this.moreButton);
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                _this.tutorialAnim = new Phaser.Image(_this.game, 2 + _this.moreButton.width / 2, -2 - _this.moreButton.height / 2, "texture_atlas_1", "resalte_btn_tutorial.png");
                _this.tutorialAnim.anchor.set(.5);
                _this.tutorialAnim.scale.set(1.1);
                _this.tutorialAnim.visible = false;
                _this.container.add(_this.tutorialAnim);
            }
            _this.captureContainer = new Phaser.Group(_this.game);
            _this.captureContainer.x = _this.moreButton.x + _this.moreButton.width + 2;
            _this.captureContainer.y = -2;
            _this.container.add(_this.captureContainer);
            _this.captureButton = new Phaser.Button(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onClickCatch, _this);
            _this.captureButton.setFrames("btn_capture.png", "btn_capture.png", "btn_capture.png");
            _this.captureButton.anchor.set(0, 1);
            _this.captureButton.forceOut = true;
            _this.captureButton.input.useHandCursor = true;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                _this.tutorialAnim = new Phaser.Image(_this.game, 0 + _this.captureButton.width / 2, 2 - _this.captureButton.height / 2, "texture_atlas_1", "resalte_btn_tutorial.png");
                _this.tutorialAnim.anchor.set(.5);
                _this.tutorialAnim.scale.set(1.1);
                _this.tutorialAnim.visible = false;
                _this.captureContainer.add(_this.tutorialAnim);
            }
            _this.captureContainer.add(_this.captureButton);
            var circle = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "btn_capture_circle.png");
            circle.anchor.set(0, 1);
            _this.captureContainer.add(circle);
            _this.numberCapture = new Phaser.Text(_this.game, 58, -58, MagikMons.GameVars.slotData.items.ball + "", { font: "22px Chewy", fontWeight: "400", fill: "#00427f" });
            _this.numberCapture.anchor.set(.5);
            _this.captureContainer.add(_this.numberCapture);
            if (MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                _this.captureButton.inputEnabled = false;
                _this.captureButton.alpha = .75;
                var forbidden = new Phaser.Image(_this.game, _this.moreButton.x + _this.moreButton.width + 2, -2, "texture_atlas_1", "icon_forbidden.png");
                forbidden.anchor.set(0, 1);
                _this.container.add(forbidden);
            }
            _this.captureVideoButton = new Phaser.Button(_this.game, _this.captureContainer.x + _this.captureButton.width - 2, -2, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onClickVideo, _this);
            _this.captureVideoButton.setFrames("btn_capture_crit.png", "btn_capture_crit.png", "btn_capture_crit.png");
            _this.captureVideoButton.anchor.set(0, 1);
            _this.captureVideoButton.forceOut = true;
            _this.captureVideoButton.input.useHandCursor = true;
            _this.container.add(_this.captureVideoButton);
            if (MagikMons.GameVars.slotData.items.ball > 0 || MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                _this.captureVideoButton.visible = false;
            }
            _this.movementsContainer = new MagikMons.MovementsContainer(_this.game);
            _this.movementsContainer.x = MagikMons.GameConstants.GAME_WIDTH - 35;
            _this.movementsContainer.y = MagikMons.GameConstants.GAME_HEIGHT - 5;
            _this.movementsContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.movementsContainer);
            _this.menuFightLayer = new MagikMons.MenuFightLayer(_this.game);
            _this.add(_this.menuFightLayer);
            _this.checkCaptureNumber();
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                _this.captureButton.visible = false;
                _this.numberCapture.visible = false;
                _this.moreButton.visible = false;
                _this.captureVideoButton.visible = false;
                circle.visible = false;
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                _this.captureButton.inputEnabled = false;
                _this.captureButton.alpha = .5;
                _this.captureVideoButton.visible = false;
            }
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                _this.captureVideoButton.visible = false;
            }
            return _this;
        }
        FightGUI.prototype.enable = function () {
            if (MagikMons.GameVars.typeFight !== MagikMons.GameConstants.TRAINER_FIGHT) {
                this.captureButton.inputEnabled = true;
                this.captureButton.alpha = 1;
                this.captureVideoButton.inputEnabled = true;
                this.captureVideoButton.alpha = 1;
            }
            this.checkCaptureNumber();
            if (MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                this.moreButton.inputEnabled = true;
                this.moreButton.alpha = 1;
                this.movementsContainer.enable();
            }
            else {
                if (this.tutorialCounter === 2) {
                    if (this.tutorialAnim) {
                        this.tutorialAnim.visible = true;
                        this.game.add.tween(this.tutorialAnim.scale)
                            .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                    }
                    this.game.add.tween(this.captureContainer.scale)
                        .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                }
                else {
                    this.tutorialCounter++;
                    this.moreButton.inputEnabled = true;
                    this.moreButton.alpha = 1;
                    this.captureButton.alpha = .5;
                    this.captureButton.inputEnabled = false;
                    this.movementsContainer.enable();
                }
            }
            if (this.moreTween) {
                this.moreTween.stop();
            }
        };
        FightGUI.prototype.disable = function () {
            this.moreButton.inputEnabled = false;
            this.moreButton.alpha = .5;
            this.captureButton.inputEnabled = false;
            this.captureButton.alpha = .5;
            this.captureVideoButton.inputEnabled = false;
            this.captureVideoButton.alpha = .5;
            this.movementsContainer.disable();
        };
        FightGUI.prototype.enableMoreOnly = function () {
            this.captureButton.inputEnabled = false;
            this.captureButton.alpha = .5;
            this.movementsContainer.disable();
            this.moreTween = this.game.add.tween(this.moreButton.scale)
                .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
        };
        FightGUI.prototype.showMoreButton = function () {
            this.moreButton.visible = true;
            this.moreButton.alpha = 0;
            this.moreButton.inputEnabled = true;
            this.game.add.tween(this.moreButton)
                .to({ alpha: 1 }, 150, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.moreButton.scale)
                .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            if (this.tutorialAnim) {
                this.tutorialAnim.visible = true;
                this.game.add.tween(this.tutorialAnim.scale)
                    .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
        };
        FightGUI.prototype.actualizeItemsMenu = function () {
            this.menuFightLayer.actualizeItemsMenu();
        };
        FightGUI.prototype.hideMenuLayer = function () {
            this.menuFightLayer.hideMenuLayer();
        };
        FightGUI.prototype.changePlayerMonster = function () {
            this.menuFightLayer.changePlayerMonster();
            this.movementsContainer.changePlayerMonster();
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                this.enable();
            }
        };
        FightGUI.prototype.onClickMore = function () {
            this.moreButton.scale.set(1);
            this.menuFightLayer.show();
        };
        FightGUI.prototype.onClickCatch = function () {
            MagikMons.GameVars.slotData.items.ball--;
            this.numberCapture.text = MagikMons.GameVars.slotData.items.ball + "";
            this.checkCaptureNumber();
            if (MagikMons.GameVars.slotData.items.ball === 0 && !this.extraCatchUsed) {
                this.captureVideoButton.visible = true;
            }
            MagikMons.FightManager.catchMonster();
        };
        FightGUI.prototype.onClickVideo = function () {
            this.extraCatchUsed = true;
            this.captureVideoButton.visible = false;
            MagikMons.FightManager.catchVideoMonster();
        };
        FightGUI.prototype.turnChanged = function () {
            if (MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                this.movementsContainer.turnChanged();
            }
        };
        FightGUI.prototype.hideMovementsContainer = function () {
            this.game.add.tween(this.container)
                .to({ y: this.container.y + 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.movementsContainer.hide();
        };
        FightGUI.prototype.showMovementsContainer = function () {
            this.game.add.tween(this.container)
                .to({ y: this.container.y - 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.movementsContainer.show();
        };
        FightGUI.prototype.checkCaptureNumber = function () {
            if (MagikMons.GameVars.slotData.items.ball === 0) {
                this.captureButton.alpha = .5;
                this.captureButton.inputEnabled = false;
            }
        };
        FightGUI.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        return FightGUI;
    }(Phaser.Group));
    MagikMons.FightGUI = FightGUI;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var ItemsButton = (function (_super) {
        __extends(ItemsButton, _super);
        function ItemsButton(game, i, x, y) {
            var _this = _super.call(this, game, null, "items-button") || this;
            _this.x = x;
            _this.y = y;
            _this.i = i;
            _this.createNameNum();
            var frameName = "btn_use_" + _this.name + ".png";
            _this.button = new Phaser.Button(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.selectItem, _this);
            _this.button.setFrames(frameName, frameName, frameName);
            _this.button.events.onInputDown.add(_this.onButtonDown, _this);
            _this.button.events.onInputOut.add(_this.onOut, _this);
            _this.button.events.onInputOver.add(_this.onOver, _this);
            _this.button.anchor.set(.5);
            _this.add(_this.button);
            var circle = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "circle_use_item.png");
            circle.anchor.set(.5);
            _this.add(circle);
            _this.numberText = new Phaser.Text(_this.game, 40, -20, _this.num + "", { font: "22px Chewy", fontWeight: "400", fill: "#00427f" });
            _this.numberText.anchor.set(.5);
            _this.add(_this.numberText);
            if (_this.num === 0) {
                _this.button.alpha = .5;
                _this.button.inputEnabled = false;
            }
            return _this;
        }
        ItemsButton.prototype.createNameNum = function () {
            switch (this.i) {
                case 0:
                    this.name = "heal";
                    this.num = MagikMons.GameVars.slotData.items.healing;
                    break;
                case 1:
                    this.name = "focus";
                    this.num = MagikMons.GameVars.slotData.items.hypnoCure;
                    break;
                case 2:
                    this.name = "defense";
                    this.num = MagikMons.GameVars.slotData.items.defenseIncrease;
                    break;
                case 3:
                    this.name = "antidote";
                    this.num = MagikMons.GameVars.slotData.items.antidote;
                    break;
                case 4:
                    this.name = "attack";
                    this.num = MagikMons.GameVars.slotData.items.attackIncrease;
                    break;
                case 5:
                    this.name = "aim";
                    this.num = MagikMons.GameVars.slotData.items.aimingIncrease;
                    break;
                default:
                    break;
            }
        };
        ItemsButton.prototype.enable = function () {
            this.button.alpha = 1;
            this.button.inputEnabled = true;
            if (this.num === 0) {
                this.button.alpha = .5;
                this.button.inputEnabled = false;
            }
        };
        ItemsButton.prototype.disable = function () {
            this.button.alpha = .5;
            this.button.inputEnabled = false;
        };
        ItemsButton.prototype.disableButton = function () {
            this.button.alpha = .5;
            this.button.inputEnabled = false;
        };
        ItemsButton.prototype.canSelect = function () {
            return this.num !== 0;
        };
        ItemsButton.prototype.selectItem = function () {
            this.scale.set(1.1);
            MagikMons.FightManager.useItem(this.i, this.name);
            MagikMons.FightManager.hideMenuLayer();
        };
        ItemsButton.prototype.actualizeItem = function () {
            this.createNameNum();
            this.numberText.text = this.num + "";
        };
        ItemsButton.prototype.onButtonDown = function () {
            MagikMons.AudioManager.playSound("click_btn");
            this.scale.set(1.1);
        };
        ItemsButton.prototype.onOut = function (btn) {
            this.scale.set(1);
        };
        ItemsButton.prototype.onOver = function (btn) {
            this.scale.set(1.05);
        };
        return ItemsButton;
    }(Phaser.Group));
    MagikMons.ItemsButton = ItemsButton;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MenuFightLayer = (function (_super) {
        __extends(MenuFightLayer, _super);
        function MenuFightLayer(game) {
            var _this = _super.call(this, game, null, "menu-fight-layer") || this;
            var topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.inputEnabled = true;
            topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(topLayer);
            var bottomLayer = _this.create(0, 320, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.inputEnabled = true;
            bottomLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(bottomLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            _this.backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.hide, _this);
            _this.backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            _this.backButton.anchor.set(.5);
            _this.backButton.x += _this.backButton.width / 2;
            _this.backButton.y += _this.backButton.height / 2;
            _this.backButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.backButton.events.onInputOut.add(_this.onOut, _this);
            _this.backButton.events.onInputOver.add(_this.onOver, _this);
            topContainer.add(_this.backButton);
            var escapeContainer = new Phaser.Group(_this.game);
            escapeContainer.scale.y = MagikMons.GameVars.scaleY;
            escapeContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            escapeContainer.y = 90;
            var tabEscape = new Phaser.Image(_this.game, 0, -40, "texture_atlas_1", "tab_area.png");
            tabEscape.anchor.set(.5);
            tabEscape.scale.x = -1;
            escapeContainer.add(tabEscape);
            var textEscape = new Phaser.Text(_this.game, 0, -50, MagikMons.GameVars.names["ESCAPE"], { font: "14px Chewy", fontWeight: "400", fill: "#ffb63b" });
            textEscape.anchor.set(.5);
            escapeContainer.add(textEscape);
            _this.escapeButton = new Phaser.Button(_this.game, 0, 24, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onEscapeClicked, _this);
            _this.escapeButton.setFrames("btn_escape.png", "btn_escape.png", "btn_escape.png");
            _this.escapeButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.escapeButton.events.onInputOut.add(_this.onOut, _this);
            _this.escapeButton.events.onInputOver.add(_this.onOver, _this);
            _this.escapeButton.anchor.set(.5);
            _this.escapeButton.forceOut = true;
            _this.darkLayer = _this.create(-MagikMons.GameConstants.GAME_WIDTH / 2, -90 / MagikMons.GameVars.scaleY, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.darkLayer.alpha = .7;
            _this.darkLayer.visible = false;
            _this.darkLayer.tint = 0x0D1C29;
            _this.darkLayer.inputEnabled = true;
            _this.darkLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            _this.darkLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, (MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAP_SIZE) / MagikMons.GameVars.scaleY);
            escapeContainer.add(_this.darkLayer);
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                _this.tutorialAnim = new Phaser.Image(_this.game, 0, 24, "texture_atlas_1", "resalte_btn_tutorial.png");
                _this.tutorialAnim.anchor.set(.5);
                _this.tutorialAnim.scale.set(1.1);
                escapeContainer.add(_this.tutorialAnim);
                _this.game.add.tween(_this.escapeButton.scale)
                    .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                _this.game.add.tween(_this.tutorialAnim.scale)
                    .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
            escapeContainer.add(_this.escapeButton);
            var replaceContainer = new Phaser.Group(_this.game);
            replaceContainer.scale.y = MagikMons.GameVars.scaleY;
            replaceContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            replaceContainer.y = 290;
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                var tabReplace = new Phaser.Image(_this.game, 0, -40, "texture_atlas_1", "tab_area.png");
                tabReplace.anchor.set(.5);
                tabReplace.scale.x = -1;
                replaceContainer.add(tabReplace);
                var textReplace = new Phaser.Text(_this.game, 0, -50, MagikMons.GameVars.names["REPLACE"], { font: "14px Chewy", fontWeight: "400", fill: "#ffb63b" });
                textReplace.anchor.set(.5);
                replaceContainer.add(textReplace);
                _this.monsterButtons = new Array();
                var start = -100;
                if (MagikMons.GameVars.playerMonstersFighting.length === 1) {
                    start = 0;
                }
                else if (MagikMons.GameVars.playerMonstersFighting.length === 2) {
                    start = -50;
                }
                for (var i = 0; i < MagikMons.GameVars.playerMonstersFighting.length; i++) {
                    var monsterButton = new MagikMons.MonsterButton(_this.game, i);
                    monsterButton.x = start + 100 * i;
                    monsterButton.y = 20;
                    replaceContainer.add(monsterButton);
                    _this.monsterButtons.push(monsterButton);
                }
                for (var i = 0; i < _this.monsterButtons.length; i++) {
                    _this.monsterButtons[i].setMonster();
                }
                if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                    _this.tween = _this.game.add.tween(_this.monsterButtons[1].scale)
                        .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                }
                var itemsContainer = new Phaser.Group(_this.game);
                itemsContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
                itemsContainer.y = 520;
                itemsContainer.scale.y = MagikMons.GameVars.scaleY;
                _this.add(itemsContainer);
                var tabItems = new Phaser.Image(_this.game, 0, -80, "texture_atlas_1", "tab_area.png");
                tabItems.anchor.set(.5);
                tabItems.scale.x = -1;
                itemsContainer.add(tabItems);
                var textItems = new Phaser.Text(_this.game, 0, -90, MagikMons.GameVars.names["USE ITEM"], { font: "14px Chewy", fontWeight: "400", fill: "#ffb63b" });
                textItems.anchor.set(.5);
                itemsContainer.add(textItems);
                _this.itemButtons = new Array();
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 2; j++) {
                        var itemButton = new MagikMons.ItemsButton(_this.game, j + i * 2, -135 + 140 * i, -10 + 80 * j);
                        itemsContainer.add(itemButton);
                        _this.itemButtons.push(itemButton);
                    }
                }
            }
            _this.add(escapeContainer);
            _this.add(replaceContainer);
            _this.visible = false;
            _this.alpha = 0;
            return _this;
        }
        MenuFightLayer.prototype.actualizeItemsMenu = function () {
            for (var i = 0; i < this.itemButtons.length; i++) {
                this.itemButtons[i].actualizeItem();
            }
        };
        MenuFightLayer.prototype.changePlayerMonster = function () {
            for (var i = 0; i < this.monsterButtons.length; i++) {
                this.monsterButtons[i].setMonster();
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP) {
                this.tween.stop();
                this.monsterButtons[1].scale.set(1);
            }
            this.hide();
        };
        MenuFightLayer.prototype.show = function () {
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                for (var i = 0; i < this.monsterButtons.length; i++) {
                    this.monsterButtons[i].setMonster();
                }
            }
            this.visible = true;
            this.game.add.tween(this)
                .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            if (MagikMons.GameVars.needChangeMonster !== MagikMons.GameConstants.NO_CHANGE) {
                this.darkLayer.visible = true;
            }
            else {
                this.darkLayer.visible = false;
            }
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                this.enableItems();
            }
            if (MagikMons.GameVars.playerMonstersFighting[0] && MagikMons.GameVars.playerMonstersFighting[0].life === MagikMons.GameVars.playerMonstersFighting[0].maxLife) {
                this.itemButtons[0].disableButton();
            }
        };
        MenuFightLayer.prototype.enableItems = function () {
            for (var i = 0; i < this.itemButtons.length; i++) {
                this.itemButtons[i].enable();
            }
        };
        MenuFightLayer.prototype.disableItems = function () {
            for (var i = 0; i < this.itemButtons.length; i++) {
                this.itemButtons[i].disable();
            }
        };
        MenuFightLayer.prototype.hide = function (b) {
            if (b) {
                b.scale.set(1);
            }
            MagikMons.FightManager.hideMenuLayer();
        };
        MenuFightLayer.prototype.hideMenuLayer = function () {
            this.alpha = 0;
            this.visible = false;
        };
        MenuFightLayer.prototype.onEscapeClicked = function () {
            this.escapeButton.scale.set(1);
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                MagikMons.GameVars.currentSpawn = null;
            }
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.commercialBreak().then(function () {
                    MagikMons.GameManager.fightToMap();
                });
            }
            else {
                MagikMons.GameManager.fightToMap();
            }
        };
        MenuFightLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        MenuFightLayer.prototype.onClickDarkLayer = function () {
        };
        MenuFightLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        MenuFightLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return MenuFightLayer;
    }(Phaser.Group));
    MagikMons.MenuFightLayer = MenuFightLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MonsterButton = (function (_super) {
        __extends(MonsterButton, _super);
        function MonsterButton(game, id) {
            var _this = _super.call(this, game, null, "monster-button") || this;
            _this.id = id;
            var monster = MagikMons.GameVars.playerMonstersFighting[_this.id];
            var textureName = "icon_" + monster.id + ".png";
            _this.button = new Phaser.Button(_this.game, 0, 0, "texture_atlas_4", _this.changeMonster, _this);
            _this.button.setFrames(textureName, textureName, textureName);
            _this.button.events.onInputDown.add(_this.onButtonDown, _this);
            _this.button.anchor.set(.5);
            _this.button.forceOut = true;
            _this.add(_this.button);
            _this.level = new Phaser.Text(_this.game, -32, -33, monster.level + "", { font: "18px Chewy", fontWeight: "400", fill: "#000000" });
            _this.level.stroke = "#11252c";
            _this.level.strokeThickness = 5;
            _this.add(_this.level);
            if (monster.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                _this.level.fill = "#ff9c50";
            }
            else if (monster.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                _this.level.fill = "#b9a8ff";
            }
            else if (monster.class === MagikMons.GameConstants.ELEMENT_TECH) {
                _this.level.fill = "#00dfa9";
            }
            if (_this.id === 0) {
                _this.text = new Phaser.Text(_this.game, 0, 55, MagikMons.GameVars.names["FIGHTING"], { font: "16px Chewy", fontWeight: "400", fill: "#ffffff" });
                _this.text.anchor.set(.5);
                _this.text.stroke = "#0066cc";
                _this.text.strokeThickness = 4;
                _this.add(_this.text);
            }
            _this.barContainer = new Phaser.Group(_this.game);
            _this.barContainer.x = 38;
            _this.barContainer.y = 32;
            _this.add(_this.barContainer);
            var barBackground = new Phaser.Sprite(_this.game, 0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            barBackground.scale.set(14 / 64, (MonsterButton.BAR_LENGTH + 6) / 64);
            barBackground.anchor.set(0, 1);
            barBackground.tint = 0x11594e;
            _this.barContainer.add(barBackground);
            var barBackground2 = new Phaser.Sprite(_this.game, 3, -3, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            barBackground2.scale.set(8 / 64, MonsterButton.BAR_LENGTH / 64);
            barBackground2.anchor.set(0, 1);
            barBackground2.tint = 0x027560;
            _this.barContainer.add(barBackground2);
            _this.bar = new Phaser.Sprite(_this.game, 3, -3, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.bar.scale.set(8 / 64, MonsterButton.BAR_LENGTH / 64);
            _this.bar.anchor.set(0, 1);
            _this.bar.tint = 0x3ec851;
            _this.barContainer.add(_this.bar);
            return _this;
        }
        MonsterButton.prototype.setMonster = function () {
            var monster = MagikMons.GameVars.playerMonstersFighting[this.id];
            if (monster.life === 0) {
                this.alpha = .3;
                this.button.inputEnabled = false;
            }
            else if (this.id === 0) {
                this.button.alpha = .5;
                this.level.alpha = .5;
                this.barContainer.alpha = .5;
                this.button.inputEnabled = false;
            }
            var textureName = "icon_" + monster.id + ".png";
            this.button.setFrames(textureName, textureName, textureName);
            this.level.text = monster.level + "";
            if (monster.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.level.fill = "#ff9c50";
            }
            else if (monster.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.level.fill = "#b9a8ff";
            }
            else if (monster.class === MagikMons.GameConstants.ELEMENT_TECH) {
                this.level.fill = "#00dfa9";
            }
            var barLength = monster.life / monster.maxLife * MonsterButton.BAR_LENGTH;
            this.bar.scale.y = barLength / 64;
            if (MagikMons.GameVars.needChangeMonster !== MagikMons.GameConstants.NO_CHANGE && this.id === 0) {
                this.text.text = " DEFEATED ";
            }
            else if (this.text) {
                this.text.text = " NOW FIGHTING ";
            }
        };
        MonsterButton.prototype.changeMonster = function () {
            this.scale.set(1);
            MagikMons.FightManager.changePlayerMonster(this.id);
        };
        MonsterButton.prototype.onButtonDown = function () {
            this.scale.set(1.1);
        };
        MonsterButton.BAR_LENGTH = 58;
        return MonsterButton;
    }(Phaser.Group));
    MagikMons.MonsterButton = MonsterButton;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MovementButton = (function (_super) {
        __extends(MovementButton, _super);
        function MovementButton(game, id) {
            var _this = _super.call(this, game, null, "movement-button") || this;
            _this.id = id;
            var actionId;
            var cooldown;
            var classAction;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                if (id === 0) {
                    actionId = "ander_01";
                }
                else {
                    actionId = "ander_02";
                }
                cooldown = 1;
                classAction = MagikMons.GameConstants.ELEMENT_COMMON;
            }
            else {
                actionId = MagikMons.GameVars.playerMonstersFighting[0].actions[_this.id].id;
                cooldown = MagikMons.GameVars.monstersActions[actionId].cooldown;
                classAction = MagikMons.GameVars.monstersActions[actionId].class;
            }
            _this.button = new Phaser.Button(_this.game, 0, 0, "texture_atlas_1", _this.onClickButton, _this);
            _this.button.setFrames("btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png");
            _this.button.events.onInputDown.add(_this.onButtonDown, _this);
            _this.button.input.useHandCursor = true;
            _this.button.anchor.set(.5, 1);
            _this.button.forceOut = true;
            _this.add(_this.button);
            _this.frameButton = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "frame_atk.png");
            _this.frameButton.anchor.set(.5, 1);
            _this.add(_this.frameButton);
            _this.cooldownBalls = new Array();
            for (var i = 0; i < cooldown; i++) {
                var x = -(cooldown - 1) * .5 * 15;
                var ball = new Phaser.Image(_this.game, x + i * 15, -3, "texture_atlas_1", "cooldown_" + classAction + ".png");
                ball.anchor.set(.5);
                _this.add(ball);
                _this.cooldownBalls.push(ball);
            }
            if (!_this.tween) {
                _this.tween = _this.game.add.tween(_this.scale)
                    .to({ x: [.95, 1], y: [.95, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
            return _this;
        }
        MovementButton.prototype.enable = function () {
            if (MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].cooldown === 0) {
                this.button.inputEnabled = true;
                this.alpha = 1;
                if (!this.tween) {
                    this.tween = this.game.add.tween(this.scale)
                        .to({ x: [.95, 1], y: [.95, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                }
            }
            else {
                this.button.inputEnabled = false;
                this.alpha = .5;
                if (this.tween) {
                    this.tween.stop();
                    this.tween = null;
                    this.scale.set(1);
                }
            }
        };
        MovementButton.prototype.disable = function () {
            this.button.inputEnabled = false;
            if (this.tween) {
                this.tween.stop();
                this.tween = null;
                this.scale.set(1);
            }
        };
        MovementButton.prototype.turnChanged = function () {
            var id = MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].id;
            this.tweenCooldown(MagikMons.GameVars.monstersActions[id].cooldown - MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].cooldown);
        };
        MovementButton.prototype.changeMonster = function () {
            var actionId = MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].id;
            this.button.setFrames("btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png", "btn_attack_" + actionId + ".png");
            this.turnChanged();
            this.enable();
        };
        MovementButton.prototype.onClickButton = function () {
            this.scale.set(1);
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                MagikMons.FightState.currentInstance.animationTutorialAttack();
            }
            else {
                var id = MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].id;
                MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].cooldown = MagikMons.GameVars.monstersActions[id].cooldown;
                this.tweenCooldown(0);
                MagikMons.FightManager.playerAttack(MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].id);
            }
        };
        MovementButton.prototype.tweenCooldown = function (scale) {
            var actionId = MagikMons.GameVars.playerMonstersFighting[0].actions[this.id].id;
            var cooldown = MagikMons.GameVars.monstersActions[actionId].cooldown;
            var classAction = MagikMons.GameVars.monstersActions[actionId].class;
            for (var i = 0; i < cooldown; i++) {
                if (this.cooldownBalls[i]) {
                    this.cooldownBalls[i].destroy();
                }
            }
            this.cooldownBalls = new Array();
            for (var i = 0; i < cooldown; i++) {
                var x = -(cooldown - 1) * .5 * 15;
                var backBall = new Phaser.Image(this.game, x + i * 15, -3, "texture_atlas_1", "cooldown_void.png");
                backBall.anchor.set(.5);
                this.add(backBall);
                this.cooldownBalls.push(backBall);
                var ball = new Phaser.Image(this.game, x + i * 15, -3, "texture_atlas_1", "cooldown_" + classAction + ".png");
                ball.anchor.set(.5);
                this.add(ball);
                this.cooldownBalls.push(ball);
                if (scale <= i) {
                    this.game.add.tween(this.cooldownBalls[this.cooldownBalls.length - 1])
                        .to({ alpha: [.3, 1] }, 4000, Phaser.Easing.Cubic.InOut, true, 0, -1);
                }
            }
        };
        MovementButton.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            this.scale.set(1.1);
        };
        return MovementButton;
    }(Phaser.Group));
    MagikMons.MovementButton = MovementButton;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MovementsContainer = (function (_super) {
        __extends(MovementsContainer, _super);
        function MovementsContainer(game) {
            var _this = _super.call(this, game, null, "movements-container") || this;
            _this.createNewButtons();
            return _this;
        }
        MovementsContainer.prototype.enable = function () {
            this.alpha = 1;
            for (var i = 0; i < this.movementButtons.length; i++) {
                this.movementButtons[i].enable();
            }
        };
        MovementsContainer.prototype.disable = function () {
            this.alpha = .5;
            for (var i = 0; i < this.movementButtons.length; i++) {
                this.movementButtons[i].disable();
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ATTACK) {
                this.tween.stop();
                this.movementButtons[0].scale.set(1);
                if (this.finger) {
                    this.finger.destroy();
                }
            }
            else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                if (this.finger) {
                    this.finger.destroy();
                }
            }
        };
        MovementsContainer.prototype.hide = function () {
            this.game.add.tween(this)
                .to({ y: this.y + 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
        };
        MovementsContainer.prototype.show = function () {
            this.game.add.tween(this)
                .to({ y: this.y - 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
        };
        MovementsContainer.prototype.createNewButtons = function () {
            var start = 0;
            var end = 0;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                end = 2;
                this.finger = new Phaser.Image(this.game, -110, -30, "texture_atlas_1", "tutorial_finger.png");
                this.finger.scale.set(1, -1);
                this.finger.angle = -90;
                this.add(this.finger);
                this.game.add.tween(this.finger)
                    .to({ x: [-125, -110] }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
            }
            else {
                if (MagikMons.GameVars.playerMonstersFighting[0].level >= MagikMons.GameConstants.LEVEL_ATTACK_3) {
                    end = 4;
                }
                else if (MagikMons.GameVars.playerMonstersFighting[0].level >= MagikMons.GameConstants.LEVEL_ATTACK_2) {
                    end = 3;
                }
                else if (MagikMons.GameVars.playerMonstersFighting[0].level >= MagikMons.GameConstants.LEVEL_ATTACK_1) {
                    end = 2;
                }
                else {
                    end = 1;
                }
            }
            this.movementButtons = new Array();
            var pos = -(end - start - 1) * 66;
            for (var i = start; i < end; i++) {
                var movementButton = new MagikMons.MovementButton(this.game, i);
                movementButton.x = pos;
                this.add(movementButton);
                this.movementButtons.push(movementButton);
                pos += 66;
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ATTACK) {
                this.tween = this.game.add.tween(this.movementButtons[0].scale)
                    .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
                this.finger = new Phaser.Image(this.game, -40, -30, "texture_atlas_1", "tutorial_finger.png");
                this.finger.scale.set(1, -1);
                this.finger.angle = -90;
                this.add(this.finger);
                this.game.add.tween(this.finger)
                    .to({ x: [-55, -40] }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
            }
        };
        MovementsContainer.prototype.changePlayerMonster = function () {
            this.game.add.tween(this)
                .to({ y: this.y + 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                for (var i = 0; i < this.movementButtons.length; i++) {
                    this.movementButtons[i].destroy();
                }
                this.createNewButtons();
                this.game.add.tween(this)
                    .to({ y: this.y - 200 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        MovementsContainer.prototype.turnChanged = function () {
            for (var i = 0; i < this.movementButtons.length; i++) {
                this.movementButtons[i].turnChanged();
            }
        };
        MovementsContainer.prototype.onClickMovement = function () {
        };
        return MovementsContainer;
    }(Phaser.Group));
    MagikMons.MovementsContainer = MovementsContainer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var AttackLayer = (function (_super) {
        __extends(AttackLayer, _super);
        function AttackLayer(game) {
            var _this = _super.call(this, game, null, "attack-layer") || this;
            _this.attackContainer = new Phaser.Group(_this.game);
            _this.attackContainer.visible = false;
            _this.attackContainer.scale.set(0);
            _this.add(_this.attackContainer);
            _this.attack = new Phaser.Text(_this.game, 0, 0, "", { font: "22px Chewy", fill: "#7bfff3" });
            _this.attack.anchor.set(0, .5);
            _this.attackContainer.add(_this.attack);
            _this.typeAttack = new Phaser.Text(_this.game, 0, 0, "", { font: "18px Chewy", fill: "#FFFFFF" });
            _this.typeAttack.anchor.set(0, .5);
            _this.attackContainer.add(_this.typeAttack);
            _this.critical = new Phaser.Text(_this.game, 0, 0, "", { font: "18px Chewy", fill: "#fdff94" });
            _this.critical.anchor.set(0, .5);
            _this.attackContainer.add(_this.critical);
            _this.specialBack = new Phaser.Image(_this.game, 200, 100, "texture_atlas_1", "fx_radial_rays.png");
            _this.specialBack.anchor.set(.5);
            _this.specialBack.scale.set(0);
            _this.add(_this.specialBack);
            _this.specialImg = new Phaser.Image(_this.game, 200, 100, "texture_atlas_" + MagikMons.GameVars.gameData.language, "hacked_text.png");
            _this.specialImg.anchor.set(.5);
            _this.specialImg.scale.set(0);
            _this.add(_this.specialImg);
            _this.hackContainer = new Phaser.Group(_this.game);
            _this.hackContainer.visible = false;
            _this.hackContainer.y = 100;
            _this.hackContainer.x = 100;
            _this.add(_this.hackContainer);
            _this.hackBackground = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "fx_radial_rays.png");
            _this.hackBackground.anchor.set(.5);
            _this.hackBackground.scale.set(0);
            _this.hackBackground.tint = 0x00dfa9;
            _this.hackContainer.add(_this.hackBackground);
            _this.hackImg = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "hacked_text_01.png");
            _this.hackImg.anchor.set(.5);
            _this.hackContainer.add(_this.hackImg);
            _this.hackImg2 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, "self_attack_text.png");
            _this.hackImg2.anchor.set(.5);
            _this.hackContainer.add(_this.hackImg2);
            return _this;
        }
        AttackLayer.prototype.show = function (attackData) {
            var y = 0;
            this.attack.y = 0;
            this.typeAttack.y = 0;
            this.critical.y = 0;
            this.attack.text = MagikMons.GameVars.names["MISS"];
            this.typeAttack.text = "";
            this.critical.text = "";
            var actionInfo = MagikMons.GameVars.monstersActions[attackData.id];
            if (!attackData.miss) {
                this.attack.text = actionInfo.name.toUpperCase();
                y += 25;
                if (attackData.type === MagikMons.GameConstants.ATTACK_WEAK) {
                    this.typeAttack.text = MagikMons.GameVars.names["WEAK"];
                    this.typeAttack.fill = "#ec3359";
                    this.typeAttack.y = y;
                    y += 25;
                }
                else if (attackData.type === MagikMons.GameConstants.ATTACK_STRONG) {
                    this.typeAttack.text = MagikMons.GameVars.names["STRONG"];
                    this.typeAttack.fill = "#94ff98";
                    this.typeAttack.y = y;
                    y += 25;
                }
                if (attackData.critical) {
                    this.critical.text = MagikMons.GameVars.names["CRITICAL"];
                    this.critical.y = y;
                    y += 25;
                }
            }
            this.attackContainer.visible = true;
            this.game.add.tween(this.attackContainer.scale)
                .to({ x: 1, y: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Elastic.Out, true)
                .onComplete.add(function () {
                this.game.add.tween(this.attackContainer.scale)
                    .to({ x: 0, y: 0 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Elastic.In, true, MagikMons.GameConstants.CHANGE_TIME * 3)
                    .onComplete.add(function () {
                    this.attackContainer.visible = false;
                }, this);
            }, this);
        };
        AttackLayer.prototype.showHack = function () {
            this.specialImg.frameName = "hacked_text.png";
            this.specialBack.tint = 0x00dfa9;
            this.startTween();
        };
        AttackLayer.prototype.showPoison = function () {
            this.specialImg.frameName = "poisoned_text.png";
            this.specialBack.tint = 0xb9a8ff;
            this.startTween();
        };
        AttackLayer.prototype.startTween = function () {
            this.game.add.tween(this.specialImg.scale)
                .to({ x: 1, y: 1 }, 800, Phaser.Easing.Elastic.Out, true)
                .onComplete.add(function () {
                this.game.add.tween(this.specialImg.scale)
                    .to({ x: 1.05, y: 1.05 }, 1000, Phaser.Easing.Linear.None, true);
            }, this);
            this.game.add.tween(this.specialBack.scale)
                .to({ x: 1, y: 1 }, 800, Phaser.Easing.Elastic.Out, true, 200)
                .onComplete.add(function () {
                this.game.add.tween(this.specialBack.scale)
                    .to({ x: .9, y: .9 }, 1000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function () {
                    this.game.add.tween(this.specialImg.scale)
                        .to({ x: 0, y: 0 }, 1000, Phaser.Easing.Elastic.In, true);
                    this.game.add.tween(this.specialBack.scale)
                        .to({ x: 0, y: 0 }, 1000, Phaser.Easing.Elastic.In, true);
                }, this);
            }, this);
        };
        AttackLayer.prototype.animationBackfired = function (attackData, player) {
            this.hackContainer.visible = true;
            this.hackBackground.scale.set(0);
            this.hackImg2.scale.set(0);
            if (player === MagikMons.GameConstants.PLAYER) {
                this.hackContainer.x = 100;
            }
            else {
                this.hackContainer.x = MagikMons.GameConstants.GAME_WIDTH - 150;
            }
            this.hackImg.visible = true;
            this.hackImg.frameName = "hacked_text_01.png";
            this.game.time.events.add(250, function () {
                this.hackImg.frameName = "hacked_text_02.png";
                MagikMons.AudioManager.playSound("checking_hack_status");
            }, this);
            this.game.time.events.add(500, function () {
                this.hackImg.frameName = "hacked_text_01.png";
            }, this);
            this.game.time.events.add(750, function () {
                this.hackImg.frameName = "hacked_text_02.png";
                MagikMons.AudioManager.playSound("checking_hack_status");
            }, this);
            this.game.time.events.add(1000, function () {
                this.hackImg.frameName = "hacked_text_01.png";
            }, this);
            this.game.time.events.add(1250, function () {
                MagikMons.AudioManager.playSound("checking_hack_status");
                if (attackData.backfired) {
                    this.hackImg.frameName = "hacked_text_true.png";
                    this.game.add.tween(this.hackBackground.scale)
                        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 500)
                        .onComplete.add(function () {
                        if (player === MagikMons.GameConstants.PLAYER) {
                            MagikMons.FightState.currentInstance.playerAttackAnimation(attackData);
                        }
                        else {
                            MagikMons.FightState.currentInstance.adversaryAttackAnimation(attackData);
                        }
                        this.game.add.tween(this.hackBackground.scale)
                            .to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true, 500)
                            .onComplete.add(function () {
                            this.hackContainer.visible = false;
                        }, this);
                    }, this);
                    this.game.add.tween(this.hackImg2.scale)
                        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 500)
                        .onComplete.add(function () {
                        this.game.add.tween(this.hackImg2.scale)
                            .to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true, 1000);
                    }, this);
                }
                else {
                    this.hackImg.frameName = "hacked_text_false.png";
                    this.game.time.events.add(1000, function () {
                        this.hackContainer.visible = false;
                        if (player === MagikMons.GameConstants.PLAYER) {
                            MagikMons.FightState.currentInstance.playerAttackAnimation(attackData);
                        }
                        else {
                            MagikMons.FightState.currentInstance.adversaryAttackAnimation(attackData);
                        }
                    }, this);
                }
            }, this);
        };
        return AttackLayer;
    }(Phaser.Group));
    MagikMons.AttackLayer = AttackLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var FightHUD = (function (_super) {
        __extends(FightHUD, _super);
        function FightHUD(game) {
            var _this = _super.call(this, game, null, "hud") || this;
            _this.playerCapsule = new MagikMons.MonsterCapsule(_this.game, true, 0, 130);
            _this.add(_this.playerCapsule);
            _this.adversaryCapsule = new MagikMons.MonsterCapsule(_this.game, false, -230, -220);
            _this.add(_this.adversaryCapsule);
            _this.attackLayer = new MagikMons.AttackLayer(_this.game);
            _this.attackLayer.x = -215;
            _this.attackLayer.y = -100;
            _this.add(_this.attackLayer);
            if (MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                _this.trainerLayer = new MagikMons.TrainerLayer(_this.game);
                _this.add(_this.trainerLayer);
            }
            return _this;
        }
        FightHUD.prototype.updateLife = function (target) {
            if (target === MagikMons.GameConstants.PLAYER) {
                this.playerCapsule.updateLife();
            }
            else {
                this.adversaryCapsule.updateLife();
            }
        };
        FightHUD.prototype.animationCatch = function () {
            this.playerCapsule.retireMonster();
            this.adversaryCapsule.retireMonster();
        };
        FightHUD.prototype.animationReturnToFight = function () {
            this.playerCapsule.showMonster();
            this.adversaryCapsule.showMonster();
        };
        FightHUD.prototype.showSpecialAction = function (type, target, previous, next) {
            if (target === MagikMons.GameConstants.PLAYER) {
                this.playerCapsule.showSpecialAction(type, previous, next);
            }
            else {
                this.adversaryCapsule.showSpecialAction(type, previous, next);
            }
        };
        FightHUD.prototype.showMonsterStates = function (needHack, needPoison) {
            this.playerCapsule.showMonsterStates();
            this.adversaryCapsule.showMonsterStates();
            if (needHack) {
                this.attackLayer.showHack();
            }
            else if (needPoison) {
                this.attackLayer.showPoison();
            }
        };
        FightHUD.prototype.newAttack = function (attackData, target) {
            this.attackLayer.show(attackData);
            this.updateLife(target);
        };
        FightHUD.prototype.changePlayerMonster = function () {
            this.playerCapsule.changeMonster();
        };
        FightHUD.prototype.changeAdversaryMonster = function () {
            this.adversaryCapsule.changeMonster();
            if (MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                this.trainerLayer.updateMonsters();
            }
        };
        FightHUD.prototype.retireAdversaryMonster = function () {
            this.adversaryCapsule.retireMonster();
            if (MagikMons.GameVars.typeFight === MagikMons.GameConstants.TRAINER_FIGHT) {
                this.trainerLayer.updateMonsters();
            }
        };
        FightHUD.prototype.animationBackfired = function (attackData, player) {
            this.attackLayer.animationBackfired(attackData, player);
        };
        return FightHUD;
    }(Phaser.Group));
    MagikMons.FightHUD = FightHUD;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MonsterCapsule = (function (_super) {
        __extends(MonsterCapsule, _super);
        function MonsterCapsule(game, isPlayer, x, y) {
            var _this = _super.call(this, game, null, "monster-capsule") || this;
            _this.x = x;
            _this.y = y;
            _this.updatingLife = false;
            _this.isPlayer = isPlayer;
            _this.xIn = _this.x;
            _this.xOut = _this.isPlayer ? _this.x + 300 : _this.x - 300;
            _this.monsterData = _this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0] : MagikMons.GameVars.adversaryMonstersFighting[0];
            if (!_this.isPlayer || MagikMons.GameVars.playerMonstersFighting[0]) {
                var capsuleBackgroundTextureName = "monster-capsule-" + _this.monsterData.class + ".png";
                _this.capsuleBackground = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", capsuleBackgroundTextureName);
                _this.add(_this.capsuleBackground);
                _this.levelText = new Phaser.Text(_this.game, 142, 58, MagikMons.GameVars.names["LV"], { font: "15px Exo Light", fill: "#000000", align: "center" });
                _this.levelText.anchor.set(1);
                _this.add(_this.levelText);
                _this.levelLabel = new Phaser.Text(_this.game, 145, 59, "" + _this.monsterData.level, { font: "15px Chewy", fill: "#000000", fontWeight: 600, align: "center" });
                _this.levelLabel.anchor.set(0, 1);
                _this.add(_this.levelLabel);
                _this.monsterNameLabel = new Phaser.Text(_this.game, 20, 15, _this.monsterData.name, { font: "20px Goonies", fill: "#FFFFFF", align: "center" });
                _this.add(_this.monsterNameLabel);
                _this.specialActionCapsule = new MagikMons.SpecialActionCapsule(_this.game, 20, 0);
                _this.specialActionCapsule.y = _this.isPlayer ? -40 : 110;
                _this.add(_this.specialActionCapsule);
                _this.typeNames();
                _this.addLifeBar();
            }
            _this.states = new Array();
            _this.showMonsterStates();
            return _this;
        }
        MonsterCapsule.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updatingLife) {
            }
        };
        MonsterCapsule.prototype.showMonsterStates = function () {
            if (!this.monsterData) {
                return;
            }
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].destroy();
            }
            this.states = new Array();
            if (this.monsterData.hypno) {
                var state = new Phaser.Image(this.game, 0, -15, "texture_atlas_1", "icon_hack.png");
                state.scale.set(.75);
                state.anchor.set(.5);
                this.add(state);
                this.states.push(state);
            }
            if (this.monsterData.poison) {
                var state = new Phaser.Image(this.game, 0, -15, "texture_atlas_1", "icon_poison.png");
                state.scale.set(.75);
                state.anchor.set(.5);
                this.add(state);
                this.states.push(state);
            }
            if (this.monsterData.rage) {
                var state = new Phaser.Image(this.game, 0, -15, "texture_atlas_1", "icon_rage.png");
                state.scale.set(.75);
                state.anchor.set(.5);
                this.add(state);
                this.states.push(state);
            }
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].x = (100 - ((this.states.length - 1) / 2) * 40) + i * 40;
            }
        };
        MonsterCapsule.prototype.showSpecialAction = function (type, previous, next) {
            this.specialActionCapsule.show(type, previous, next);
        };
        MonsterCapsule.prototype.changeMonster = function () {
            this.game.add.tween(this)
                .to({ x: this.xOut }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.monsterData = this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0] : MagikMons.GameVars.adversaryMonstersFighting[0];
                var capsuleBackgroundTextureName = "monster-capsule-" + this.monsterData.class + ".png";
                this.capsuleBackground.frameName = capsuleBackgroundTextureName;
                this.monsterNameLabel.text = this.monsterData.name;
                this.levelLabel.text = "" + this.monsterData.level;
                this.changeLifeBar();
                this.typeNames();
                this.showMonsterStates();
                this.game.add.tween(this)
                    .to({ x: this.xIn }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME + 200);
            }, this);
        };
        MonsterCapsule.prototype.retireMonster = function () {
            this.game.add.tween(this)
                .to({ x: this.xOut }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
        };
        MonsterCapsule.prototype.showMonster = function () {
            this.game.add.tween(this)
                .to({ x: this.xIn }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
        };
        MonsterCapsule.prototype.updateLife = function () {
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                this.updateLifeBar();
            }, this);
        };
        MonsterCapsule.prototype.changeLifeBar = function () {
            var barPercentage = Math.round(this.monsterData.life / this.monsterData.maxLife * 100);
            var barLength = this.monsterData.life / this.monsterData.maxLife * MonsterCapsule.LIFE_BAR_LENGTH;
            this.lifeBar.scale.x = barLength / 64;
            this.lifeBar2.scale.x = barLength / 64;
        };
        MonsterCapsule.prototype.updateLifeBar = function () {
            var barPercentage = Math.round(this.monsterData.life / this.monsterData.maxLife * 100);
            var barLength = this.monsterData.life / this.monsterData.maxLife * MonsterCapsule.LIFE_BAR_LENGTH;
            this.updatingLife = true;
            this.game.add.tween(this.lifeBar.scale)
                .to({ x: barLength / 64 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME)
                .onComplete.add(function () {
                this.updatingLife = false;
            }, this);
            this.game.add.tween(this.lifeBar2.scale)
                .to({ x: barLength / 64 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME);
        };
        MonsterCapsule.prototype.addLifeBar = function () {
            this.lifeBarContainer = new Phaser.Group(this.game);
            this.add(this.lifeBarContainer);
            var x = 10;
            var y = 70;
            var lifeBarBackground = new Phaser.Sprite(this.game, x, y, this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            lifeBarBackground.scale.set((MonsterCapsule.LIFE_BAR_LENGTH + 6) / 64, 10 / 64);
            lifeBarBackground.tint = 0x11594e;
            this.lifeBarContainer.add(lifeBarBackground);
            var barLength;
            if (this.monsterData) {
                barLength = this.monsterData.life / this.monsterData.maxLife * MonsterCapsule.LIFE_BAR_LENGTH;
            }
            else {
                barLength = MonsterCapsule.LIFE_BAR_LENGTH;
            }
            this.lifeBarBack = new Phaser.Sprite(this.game, x + 2, y + 2, this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            this.lifeBarBack.scale.set(MonsterCapsule.LIFE_BAR_LENGTH / 64, 6 / 64);
            this.lifeBarBack.tint = 0x027560;
            this.lifeBarContainer.add(this.lifeBarBack);
            this.lifeBar = new Phaser.Sprite(this.game, x + 2, y + 2, this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            this.lifeBar.scale.set(barLength / 64, 3 / 64);
            this.lifeBar.tint = 0x89ff8d;
            this.lifeBarContainer.add(this.lifeBar);
            this.lifeBar2 = new Phaser.Sprite(this.game, x + 2, y + 5, this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            this.lifeBar2.scale.set(barLength / 64, 3 / 64);
            this.lifeBar2.tint = 0x3ec851;
            this.lifeBarContainer.add(this.lifeBar2);
            var lifeImage = new Phaser.Image(this.game, x + 190, y - 4, "texture_atlas_1", "icon_life_bar.png");
            lifeImage.scale.set(1.3);
            this.lifeBarContainer.add(lifeImage);
        };
        MonsterCapsule.prototype.setBarColor = function (barPercentage) {
            if (barPercentage > MonsterCapsule.ORANGE_BAR_PERCENTAGE) {
                return 0x3ec851;
            }
            else if (barPercentage > MonsterCapsule.RED_BAR_PERCENTAGE) {
                return 0x3ec851;
            }
            else {
                return 0x3ec851;
            }
        };
        MonsterCapsule.prototype.setBarBackColor = function (barPercentage) {
            if (barPercentage > MonsterCapsule.ORANGE_BAR_PERCENTAGE) {
                return 0x027560;
            }
            else if (barPercentage > MonsterCapsule.RED_BAR_PERCENTAGE) {
                return 0x027560;
            }
            else {
                return 0x027560;
            }
        };
        MonsterCapsule.prototype.typeNames = function () {
            if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.monsterNameLabel.font = "Pythia";
                this.monsterNameLabel.fontSize = "18px";
                this.monsterNameLabel.fill = "#5b473c";
                this.levelLabel.fill = "#5b473c";
                this.levelText.fill = "#5b473c";
            }
            else if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.monsterNameLabel.font = "Goonies";
                this.monsterNameLabel.fontSize = "18px";
                this.monsterNameLabel.fill = "#2a3147";
                this.levelLabel.fill = "#2a3147";
                this.levelText.fill = "#2a3147";
            }
            else if (this.monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                this.monsterNameLabel.font = "Adineue";
                this.monsterNameLabel.fontSize = "23px";
                this.monsterNameLabel.fill = "#ffffff";
                this.levelLabel.fill = "#ffffff";
                this.levelText.fill = "#ffffff";
            }
        };
        MonsterCapsule.LIFE_BAR_LENGTH = 195;
        MonsterCapsule.ORANGE_BAR_PERCENTAGE = 50;
        MonsterCapsule.RED_BAR_PERCENTAGE = 25;
        return MonsterCapsule;
    }(Phaser.Group));
    MagikMons.MonsterCapsule = MonsterCapsule;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var SpecialActionCapsule = (function (_super) {
        __extends(SpecialActionCapsule, _super);
        function SpecialActionCapsule(game, x, y) {
            var _this = _super.call(this, game, null, "special-action-capsule") || this;
            _this.x = x;
            _this.y = y;
            _this.nameLabel = new Phaser.Text(_this.game, 0, -5, MagikMons.GameVars.names["SPECIAL"], { font: "18px Chewy", fill: "#FFFFFF" });
            _this.add(_this.nameLabel);
            var lifeBarBackground = new Phaser.Sprite(_this.game, 0, 20, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            lifeBarBackground.scale.set((SpecialActionCapsule.LIFE_BAR_LENGTH + 6) / 64, 10 / 64);
            lifeBarBackground.tint = 0x11594e;
            _this.add(lifeBarBackground);
            var lifeBarBack = new Phaser.Sprite(_this.game, 2, 22, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            lifeBarBack.scale.set(SpecialActionCapsule.LIFE_BAR_LENGTH / 64, 6 / 64);
            lifeBarBack.tint = 0x027560;
            _this.add(lifeBarBack);
            _this.specialBar = new Phaser.Sprite(_this.game, 2, 22, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.specialBar.scale.set(SpecialActionCapsule.LIFE_BAR_LENGTH / 64, 3 / 64);
            _this.specialBar.tint = 0x89ff8d;
            _this.add(_this.specialBar);
            _this.specialBar2 = new Phaser.Sprite(_this.game, 2, 25, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.specialBar2.scale.set(SpecialActionCapsule.LIFE_BAR_LENGTH / 64, 3 / 64);
            _this.specialBar2.tint = 0x3ec851;
            _this.add(_this.specialBar2);
            _this.visible = false;
            _this.alpha = 0;
            return _this;
        }
        SpecialActionCapsule.prototype.show = function (type, previous, next) {
            var max = 0;
            if (type === MagikMons.GameConstants.SPECIAL_ATTACK) {
                max = MagikMons.GameConstants.MAX_ATTACK;
            }
            else if (type === MagikMons.GameConstants.SPECIAL_DEFENSE) {
                max = MagikMons.GameConstants.MAX_DEFENSE;
            }
            else if (type === MagikMons.GameConstants.SPECIAL_AIM) {
                max = MagikMons.GameConstants.MAX_AIM;
            }
            this.nameLabel.text = type.toUpperCase();
            this.specialBar.scale.x = ((previous * SpecialActionCapsule.LIFE_BAR_LENGTH) / max) / 64;
            this.specialBar2.scale.x = ((previous * SpecialActionCapsule.LIFE_BAR_LENGTH) / max) / 64;
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 5, function () {
                this.visible = true;
                this.game.add.tween(this)
                    .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.specialBar.scale)
                    .to({ x: ((next * SpecialActionCapsule.LIFE_BAR_LENGTH) / max) / 64 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME)
                    .onComplete.add(function () {
                    this.hide();
                }, this);
                this.game.add.tween(this.specialBar2.scale)
                    .to({ x: ((next * SpecialActionCapsule.LIFE_BAR_LENGTH) / max) / 64 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME);
            }, this);
        };
        SpecialActionCapsule.prototype.hide = function () {
            this.game.add.tween(this)
                .to({ alpha: 0 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME)
                .onComplete.add(function () {
                this.visible = false;
            }, this);
        };
        SpecialActionCapsule.LIFE_BAR_LENGTH = 150;
        return SpecialActionCapsule;
    }(Phaser.Group));
    MagikMons.SpecialActionCapsule = SpecialActionCapsule;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var TrainerLayer = (function (_super) {
        __extends(TrainerLayer, _super);
        function TrainerLayer(game) {
            var _this = _super.call(this, game, null, "trainer-layer") || this;
            _this.x = -MagikMons.GameConstants.GAME_WIDTH / 2;
            _this.y = -(MagikMons.GameConstants.GAME_HEIGHT / 2) / MagikMons.GameVars.scaleY;
            _this.avatar = new Phaser.Image(_this.game, 200, 18, "texture_atlas_1", "adversary_avatar_000.png");
            _this.avatar.scale.set(.6);
            _this.add(_this.avatar);
            _this.trainerName = new Phaser.Text(_this.game, 10, 10, "Alumno Demo", { font: "20px Chewy", fontWeight: "400", fill: "#FFFFFF" });
            _this.add(_this.trainerName);
            if (MagikMons.GameVars.currentTrainer) {
                _this.avatar.frameName = "adversary_avatar_" + MagikMons.GameVars.currentTrainer.id + ".png";
                _this.trainerName.text = MagikMons.GameVars.trainersNames[MagikMons.GameVars.currentTrainer.id];
            }
            _this.monsters = new Array();
            for (var i = 0; i < MagikMons.GameVars.adversaryMonstersFighting.length; i++) {
                var monster = new Phaser.Image(_this.game, 10 + i * 40, 40, "texture_atlas_4", "icon_" + MagikMons.GameVars.adversaryMonstersFighting[i].id + ".png");
                monster.scale.set(.5);
                _this.add(monster);
                _this.monsters.push(monster);
            }
            return _this;
        }
        TrainerLayer.prototype.updateMonsters = function () {
            var num = 0;
            for (var i = 0; i < this.monsters.length; i++) {
                if (MagikMons.GameVars.adversaryMonstersFighting[i].life === 0) {
                    num++;
                }
            }
            for (var i = 0; i < num; i++) {
                this.monsters[i].alpha = .5;
            }
        };
        return TrainerLayer;
    }(Phaser.Group));
    MagikMons.TrainerLayer = TrainerLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(game, monsterData, x, y, pos, managementLayer, captured) {
            var _this = _super.call(this, game, null, "icon") || this;
            _this.managementLayer = managementLayer;
            _this.monsterData = monsterData;
            _this.x = x;
            _this.y = y;
            _this.initialX = x,
                _this.initialY = y;
            _this.pos = pos;
            _this.captured = captured;
            _this.canMove = false;
            _this.canDown = true;
            if (captured) {
                var rays = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "fx_radial_rays.png");
                rays.anchor.set(.5);
                rays.scale.set(.6);
                _this.add(rays);
                if (monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                    rays.tint = 0xff9c50;
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                    rays.tint = 0xb9a8ff;
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                    rays.tint = 0x00dfa9;
                }
            }
            if (monsterData) {
                var image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", "icon_" + monsterData.id + ".png");
                image.inputEnabled = true;
                image.events.onInputDown.add(_this.onDown, _this);
                image.events.onInputUp.add(_this.onUp, _this);
                image.anchor.set(.5);
                _this.add(image);
                var level = new Phaser.Text(_this.game, -33, -34, monsterData.level + "", { font: "22px Chewy", fontWeight: "400", fill: "#000000" });
                level.stroke = "#11252c";
                level.strokeThickness = 5;
                _this.add(level);
                if (monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                    level.fill = "#ff9c50";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                    level.fill = "#b9a8ff";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                    level.fill = "#00dfa9";
                }
            }
            return _this;
        }
        Icon.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.canMove) {
                var point = this.game.input.activePointer;
                this.x = point.x - MagikMons.GameConstants.GAME_WIDTH / 2;
                this.y = (point.y - MagikMons.GameConstants.GAME_HEIGHT / 2) / MagikMons.GameVars.scaleY;
                this.managementLayer.checkIntersection(this);
            }
        };
        Icon.prototype.moveInitial = function () {
            this.canDown = false;
            var time = Math.sqrt(Math.pow((this.x - this.initialX), 2) + Math.pow((this.y - this.initialY), 2));
            this.game.add.tween(this)
                .to({ x: this.initialX, y: this.initialY }, time, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.canDown = true;
            }, this);
        };
        Icon.prototype.onDown = function () {
            if (!this.canDown) {
                return;
            }
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE && this.pos !== 6) {
                return;
            }
            this.canMove = true;
            this.managementLayer.midContainer.bringToTop(this);
        };
        Icon.prototype.onUp = function () {
            if (!this.canDown || !this.canMove) {
                return;
            }
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE && this.pos !== 6) {
                return;
            }
            this.canMove = false;
            this.managementLayer.canChange(this);
            this.managementLayer.hideSlots();
        };
        return Icon;
    }(Phaser.Group));
    MagikMons.Icon = Icon;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var ManagementLayer = (function (_super) {
        __extends(ManagementLayer, _super);
        function ManagementLayer(game) {
            var _this = _super.call(this, game, null, "management-layer") || this;
            _this.wisp = 0;
            _this.previousWisp = 0;
            _this.updateWisp = false;
            _this.title = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 + 30, 10, MagikMons.GameVars.names["FULL MAGIC WAND"], { font: "30px Chewy", fontWeight: "200", fill: "#f9205d", align: "center" });
            _this.title.stroke = "#be0539";
            _this.title.strokeThickness = 5;
            _this.title.anchor.set(.5, 0);
            _this.title.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.title);
            _this.titleImage = new Phaser.Image(_this.game, _this.title.x - _this.title.width / 2 - 30, 10, "texture_atlas_1", "icon_attention.png");
            _this.titleImage.anchor.set(.5, 0);
            _this.titleImage.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.titleImage);
            _this.midContainer = new Phaser.Group(_this.game);
            _this.midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            _this.midContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            _this.midContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.fxCaptured = new Phaser.Image(_this.game, ManagementLayer.POSITIONS[6][0], ManagementLayer.POSITIONS[6][1] + 30 - 50, "texture_atlas_2", "fx_captured_01.png");
            _this.fxCaptured.anchor.set(.5);
            _this.midContainer.add(_this.fxCaptured);
            _this.fxCaptured.animations.add("anim", Phaser.Animation.generateFrameNames("fx_captured_", 1, 12, ".png", 2));
            _this.signContainer = new Phaser.Group(_this.game);
            _this.signContainer.x = ManagementLayer.POSITIONS[6][0];
            _this.signContainer.y = ManagementLayer.POSITIONS[6][1] + 30;
            _this.signContainer.scale.y = .35;
            _this.signContainer.visible = false;
            _this.midContainer.add(_this.signContainer);
            if (MagikMons.GameVars.playerMonstersFighting[0]) {
                var signTextureName = "current_mkm_" + MagikMons.GameVars.playerMonstersFighting[0].class + ".png";
                _this.sign = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", signTextureName);
                _this.sign.anchor.set(.5);
                _this.sign.scale.set(.6);
                _this.signContainer.add(_this.sign);
                _this.game.add.tween(_this.sign)
                    .to({ angle: 360 }, 30000, Phaser.Easing.Linear.None, true, 0, -1);
            }
            _this.slots = new Array();
            for (var i = 0; i < 6; i++) {
                var slot = new Phaser.Image(_this.game, ManagementLayer.POSITIONS[i][0], ManagementLayer.POSITIONS[i][1], "texture_atlas_1", "slot_empty.png");
                slot.anchor.set(.5);
                _this.midContainer.add(slot);
                _this.slots.push(slot);
            }
            _this.icons = new Array();
            for (var i = 0; i < 6; i++) {
                var icon = void 0;
                if (MagikMons.GameVars.slotData.monsters[i]) {
                    icon = new MagikMons.Icon(_this.game, MagikMons.GameVars.slotData.monsters[i], ManagementLayer.POSITIONS[i][0], ManagementLayer.POSITIONS[i][1], i, _this, false);
                }
                else {
                    icon = new MagikMons.Icon(_this.game, null, ManagementLayer.POSITIONS[i][0], ManagementLayer.POSITIONS[i][1], i, _this, false);
                }
                _this.midContainer.add(icon);
                _this.icons.push(icon);
            }
            _this.arrow = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 190, 160, "texture_atlas_1", "arrow.png");
            _this.arrow.anchor.set(1, 0);
            _this.arrow.visible = false;
            _this.midContainer.add(_this.arrow);
            _this.releasedText = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 100, 170, "", { font: "18px Chewy", fill: "#ffffff", align: "center" });
            _this.releasedText.anchor.set(.5, 1);
            _this.releasedText.wordWrap = true;
            _this.releasedText.wordWrapWidth = 200;
            _this.midContainer.add(_this.releasedText);
            _this.okButton = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 100, 240, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onOkDown, _this);
            _this.okButton.setFrames("btn_ok_wisps_over.png", "btn_ok_wisps.png", "btn_ok_wisps_over.png");
            _this.okButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.okButton.anchor.set(.5);
            _this.okButton.y -= _this.okButton.height / 2;
            _this.okButton.visible = false;
            _this.midContainer.add(_this.okButton);
            _this.earnedWisp = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 93, 213, "", { font: "20px Chewy", fill: "#ffffff", align: "center" });
            _this.earnedWisp.anchor.set(.5);
            _this.midContainer.add(_this.earnedWisp);
            _this.bottomContainer = new Phaser.Group(_this.game);
            _this.bottomContainer.y = MagikMons.GameConstants.GAME_HEIGHT;
            _this.bottomContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(_this.bottomContainer);
            var wispContainer = new Phaser.Group(_this.game);
            _this.bottomContainer.add(wispContainer);
            var wispTab = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 20, -10, "texture_atlas_1", "tab_wisps.png");
            wispTab.anchor.set(1);
            wispContainer.add(wispTab);
            _this.wispText = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH - 70, -33, MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp), { font: "24px Chewy", fontWeight: "400", fill: "#ffffff", align: "center" });
            _this.wispText.anchor.set(1, .5);
            wispContainer.add(_this.wispText);
            _this.add(_this.midContainer);
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                _this.fingerMkm = new Phaser.Image(_this.game, -200, 187 + 100, "texture_atlas_1", "tutorial_finger.png");
                _this.fingerMkm.anchor.set(.5);
                _this.fingerMkm.scale.x = -1;
                _this.midContainer.add(_this.fingerMkm);
            }
            _this.visible = false;
            _this.alpha = 0;
            return _this;
        }
        ManagementLayer.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updateWisp) {
                if (this.previousWisp < MagikMons.GameVars.slotData.wisp) {
                    this.previousWisp += this.wisp / 10;
                    if (this.previousWisp > MagikMons.GameVars.slotData.wisp) {
                        this.previousWisp = MagikMons.GameVars.slotData.wisp;
                    }
                    this.wispText.text = MagikMons.Utils.validNumber(Math.round(this.previousWisp));
                }
                else {
                    this.updateWisp = false;
                    MagikMons.GameManager.manageNewMagikmons(this.icons);
                }
            }
        };
        ManagementLayer.prototype.show = function () {
            this.visible = true;
            this.game.add.tween(this)
                .to({ alpha: 1 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            var icon = new MagikMons.Icon(this.game, MagikMons.GameVars.adversaryMonstersFighting[0], ManagementLayer.POSITIONS[6][0], ManagementLayer.POSITIONS[6][1], 6, this, true);
            icon.y -= 50;
            this.midContainer.add(icon);
            this.icons.push(icon);
            this.fxCaptured.play("anim", 12, true);
            this.game.add.tween(icon)
                .to({ y: icon.y + 50 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.fxCaptured)
                .to({ y: this.fxCaptured.y + 50 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.showIcons();
            this.checkShowButton();
            this.changeEarnedWisp();
            if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE) {
                this.game.time.events.add(1000, function () {
                    this.game.add.tween(this.fingerMkm)
                        .to({ y: [-172 + 100, 187 + 100] }, 2000, Phaser.Easing.Cubic.In, true, 0, -1);
                }, this);
            }
        };
        ManagementLayer.prototype.showIcons = function () {
            for (var i = 0; i < 6; i++) {
                this.icons[i].alpha = 0;
                this.slots[i].alpha = 0;
                var num = (5 - i);
                if (num > 3) {
                    num--;
                }
                this.game.add.tween(this.icons[i])
                    .to({ alpha: 1 }, 50, Phaser.Easing.Cubic.In, true, 100 * num + MagikMons.GameConstants.CHANGE_TIME);
                this.game.add.tween(this.slots[i])
                    .to({ alpha: 1 }, 50, Phaser.Easing.Cubic.In, true, 100 * num + MagikMons.GameConstants.CHANGE_TIME);
            }
        };
        ManagementLayer.prototype.checkShowButton = function () {
            this.releasedText.text = "";
            var emptyPos = [];
            for (var i = 0; i < this.icons.length; i++) {
                if (!this.icons[i].monsterData) {
                    emptyPos.push(this.icons[i].pos);
                }
            }
            if (emptyPos.length > 1 && emptyPos.indexOf(6) === -1) {
                this.hideButton();
            }
            else if (emptyPos.length === 1 && emptyPos[0] !== 6) {
                this.hideButton();
            }
            else {
                for (var i = 0; i < this.icons.length; i++) {
                    if (this.icons[i].pos === 6) {
                        if (this.icons[i].monsterData) {
                            this.showReleasedText();
                        }
                        else {
                            this.okButton.setFrames("btn_ready_over.png", "btn_ready.png", "btn_ready_over.png");
                        }
                        break;
                    }
                }
                this.showButton();
            }
            if (emptyPos.length > 0) {
                this.title.text = MagikMons.GameVars.names["CHOOSE SLOT"];
                this.title.x = MagikMons.GameConstants.GAME_WIDTH / 2;
                this.title.fill = "#D9FCFF";
                this.title.stroke = "#007DB5";
                this.title.fontSize = "25px";
                this.titleImage.visible = false;
            }
        };
        ManagementLayer.prototype.showReleasedText = function () {
            this.releasedText.text = MagikMons.GameVars.names["UNSELECTED MAGIKMON"];
            this.arrow.visible = true;
        };
        ManagementLayer.prototype.showButton = function () {
            this.okButton.visible = true;
        };
        ManagementLayer.prototype.hideButton = function () {
            this.okButton.visible = false;
        };
        ManagementLayer.prototype.checkIntersection = function (icon1) {
            this.hideSlots();
            for (var i = 0; i < this.icons.length; i++) {
                if (icon1 !== this.icons[i]) {
                    var icon2 = this.icons[i];
                    if (MagikMons.Utils.intersectRect(icon1.x, icon1.y, icon2.x, icon2.y, 30)) {
                        if (icon2.pos < 6) {
                            this.slots[icon2.pos].frameName = "slot_swap.png";
                        }
                        return;
                    }
                }
            }
            if (icon1.pos < 6) {
                this.slots[icon1.pos].frameName = "slot_swap.png";
            }
        };
        ManagementLayer.prototype.canChange = function (icon1) {
            for (var i = 0; i < this.icons.length; i++) {
                if (icon1 !== this.icons[i]) {
                    var icon2 = this.icons[i];
                    if (MagikMons.Utils.intersectRect(icon1.x, icon1.y, icon2.x, icon2.y, 30)) {
                        if (icon2.pos === 6 && (!icon2.monsterData || this.anyEmptySlot())) {
                            continue;
                        }
                        if (MagikMons.GameVars.slotData.state <= MagikMons.GameConstants.TUTORIAL_CAPTURE && icon2.pos !== 1) {
                            break;
                        }
                        this.swapIcons(icon1, icon2);
                        return;
                    }
                }
            }
            icon1.moveInitial();
            this.slotsToTop(icon1);
        };
        ManagementLayer.prototype.anyEmptySlot = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (!this.icons[i].monsterData) {
                    return true;
                }
            }
            return false;
        };
        ManagementLayer.prototype.hideSlots = function () {
            for (var i = 0; i < this.slots.length; i++) {
                this.slots[i].frameName = "slot_empty.png";
            }
        };
        ManagementLayer.prototype.onOkDown = function () {
            this.okButton.scale.set(1);
            if (this.wisp === 0) {
                MagikMons.GameManager.manageNewMagikmons(this.icons);
            }
            else {
                this.previousWisp = MagikMons.GameVars.slotData.wisp;
                MagikMons.GameVars.slotData.wisp += this.wisp;
                this.updateWisp = true;
                this.okButton.visible = false;
                this.earnedWisp.visible = false;
            }
            if (MagikMons.GameVars.currentSpawn) {
                if (MagikMons.GameVars.currentSpawn.solvable) {
                    MagikMons.MapManager.deleteSpawn(MagikMons.GameVars.currentSpawn);
                }
                MagikMons.GameVars.currentSpawn = null;
            }
        };
        ManagementLayer.prototype.swapIcons = function (icon1, icon2) {
            if (this.fingerMkm) {
                this.fingerMkm.visible = false;
            }
            this.slotsToTop(icon1);
            var icon3;
            if (icon1.pos === 6) {
                for (var i = 0; i < 6; i++) {
                    if (!this.icons[i].monsterData) {
                        icon3 = this.icons[i];
                        break;
                    }
                }
            }
            if (icon3) {
                var initialX1 = icon1.initialX;
                var initialY1 = icon1.initialY;
                icon1.initialX = icon2.initialX;
                icon1.initialY = icon2.initialY;
                icon2.initialX = icon3.initialX;
                icon2.initialY = icon3.initialY;
                icon3.initialX = initialX1;
                icon3.initialY = initialY1;
                var pos1 = icon1.pos;
                icon1.pos = icon2.pos;
                icon2.pos = icon3.pos;
                icon3.pos = pos1;
            }
            else {
                var initialX1 = icon1.initialX;
                var initialY1 = icon1.initialY;
                icon1.initialX = icon2.initialX;
                icon1.initialY = icon2.initialY;
                icon2.initialX = initialX1;
                icon2.initialY = initialY1;
                var pos1 = icon1.pos;
                icon1.pos = icon2.pos;
                icon2.pos = pos1;
            }
            this.midContainer.bringToTop(icon1);
            this.midContainer.bringToTop(icon2);
            icon1.moveInitial();
            icon2.moveInitial();
            if (icon3) {
                icon3.moveInitial();
            }
            this.changeSignClass();
            this.changeEarnedWisp();
            this.checkShowButton();
        };
        ManagementLayer.prototype.changeEarnedWisp = function () {
            var showEarned = -1;
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i].pos === 6) {
                    if (this.icons[i].monsterData) {
                        showEarned = i;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (!this.icons[i].monsterData) {
                        break;
                    }
                }
            }
            if (showEarned !== -1) {
                this.wisp = Math.round((this.icons[showEarned].monsterData.level + 25) * 1.5);
                this.earnedWisp.text = "+ " + this.wisp;
            }
            else {
                this.wisp = 0;
                this.earnedWisp.text = "";
            }
        };
        ManagementLayer.prototype.changeSignClass = function () {
            for (var i = 0; i < this.icons.length; i++) {
                if (this.icons[i].pos === 6) {
                    if (this.icons[i].captured) {
                        this.fxCaptured.visible = true;
                        this.signContainer.visible = false;
                    }
                    else if (this.icons[i].monsterData) {
                        this.fxCaptured.visible = false;
                        this.signContainer.visible = true;
                        var signTextureName = "current_mkm_" + this.icons[i].monsterData.class + ".png";
                        this.sign.frameName = signTextureName;
                    }
                    else {
                        this.fxCaptured.visible = false;
                        this.signContainer.visible = false;
                    }
                }
            }
        };
        ManagementLayer.prototype.slotsToTop = function (icon) {
            for (var i = 0; i < this.slots.length; i++) {
                this.midContainer.bringToTop(this.slots[i]);
            }
        };
        ManagementLayer.prototype.onButtonDown = function (b) {
            b.scale.set(1.1);
        };
        ManagementLayer.POSITIONS = [[-132 + 50, -253 + 50],
            [-174 + 50, -172 + 50],
            [-91 + 50, -172 + 50],
            [-132 + 50, -83 + 50],
            [-132 + 50, -3 + 50],
            [-132 + 50, 77 + 50],
            [-130 + 50, 187 + 50]];
        return ManagementLayer;
    }(Phaser.Group));
    MagikMons.ManagementLayer = ManagementLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var AnimationsContainer = (function (_super) {
        __extends(AnimationsContainer, _super);
        function AnimationsContainer(game, front) {
            var _this = _super.call(this, game, null, "animations-container") || this;
            _this.y = 30;
            _this.fxs = new Array();
            _this.front = front;
            return _this;
        }
        AnimationsContainer.prototype.newAction = function (action, backfired) {
            this.counter = 0;
            this.action = action;
            for (var i = 0; i < this.fxs.length; i++) {
                this.remove(this.fxs[i]);
            }
            this.fxs = new Array();
            if (!action.fx) {
                return;
            }
            for (var i = 0; i < action.fx.length; i++) {
                var positionFx = { x: MagikMons.GameConstants.X_IN_PLAYER, y: MagikMons.GameConstants.Y_PLAYER };
                if ((action.adversary[i] && MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) || !action.adversary[i] && MagikMons.GameVars.turn === MagikMons.GameConstants.ADVERSARY) {
                    positionFx = { x: MagikMons.GameConstants.X_IN_ADVERSARY, y: MagikMons.GameConstants.Y_ADVERSARY };
                }
                if (backfired && action.adversary[i]) {
                    if (MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                        positionFx = { x: MagikMons.GameConstants.X_IN_PLAYER, y: MagikMons.GameConstants.Y_PLAYER };
                    }
                    else {
                        positionFx = { x: MagikMons.GameConstants.X_IN_ADVERSARY, y: MagikMons.GameConstants.Y_ADVERSARY };
                    }
                }
                var fx = new Phaser.Image(this.game, positionFx.x, positionFx.y, "texture_atlas_3", action.fx[i] + "_01.png");
                fx.anchor.set(.5, 1);
                fx.alpha = 0;
                this.add(fx);
                this.fxs.push(fx);
                if (MagikMons.GameVars.turn === MagikMons.GameConstants.ADVERSARY) {
                    fx.scale.x = -1;
                }
                fx.animations.add("anim", Phaser.Animation.generateFrameNames(action.fx[i] + "_", 1, action.frames[i], ".png", 2));
            }
        };
        AnimationsContainer.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var i = 0; i < this.fxs.length; i++) {
                if ((this.front && this.action.front[i]) || (!this.front && !this.action.front[i])) {
                    if (Math.round((this.action.delay[i] * 60) / 24) === this.counter) {
                        this.fxs[i].alpha = 1;
                        this.fxs[i].play("anim", 24, false, true);
                        MagikMons.AudioManager.playSound(this.action.fx[i]);
                    }
                }
            }
            this.counter++;
        };
        return AnimationsContainer;
    }(Phaser.Group));
    MagikMons.AnimationsContainer = AnimationsContainer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(game, isPlayer) {
            var _this = _super.call(this, game, null, "monster") || this;
            _this.isPlayer = isPlayer;
            _this.x = _this.isPlayer ? MagikMons.GameConstants.X_IN_PLAYER : MagikMons.GameConstants.X_IN_ADVERSARY;
            _this.y = _this.isPlayer ? MagikMons.GameConstants.Y_PLAYER : MagikMons.GameConstants.Y_ADVERSARY;
            _this.xIn = _this.x;
            _this.xOut = _this.isPlayer ? MagikMons.GameConstants.X_OUT_PLAYER : MagikMons.GameConstants.X_OUT_ADVERSARY;
            _this.monsterData = _this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0] : MagikMons.GameVars.adversaryMonstersFighting[0];
            if (MagikMons.GameVars.playerMonstersFighting[0] || !_this.isPlayer) {
                var id = _this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0].id : MagikMons.GameVars.adversaryMonstersFighting[0].id;
                var monsterTextureName = "mkm_" + id + "_";
                monsterTextureName += _this.isPlayer ? "back.png" : "front.png";
                _this.monsterImage = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", monsterTextureName);
                _this.startTweenMonster();
            }
            else {
                _this.monsterImage = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "hero_back.png");
            }
            _this.monsterImage.anchor.set(.5, 1);
            _this.add(_this.monsterImage);
            _this.states = new Array();
            _this.showMonsterStates();
            _this.addLifeBar();
            _this.updatingLife = false;
            return _this;
        }
        Monster.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updatingLife) {
                var barPercentage = ((this.lifeBar.scale.x / Monster.LIFE_BAR_LENGTH) * 64) * 100;
                this.lifeBar.tint = this.setBarColor(barPercentage);
                this.lifeBarBack.tint = this.setBarBackColor(barPercentage);
            }
        };
        Monster.prototype.startTweenMonster = function () {
            this.stopTweenMonster();
            if (this.monsterData.id === "015") {
                this.tweenMonster = this.game.add.tween(this.monsterImage.scale)
                    .to({ y: [.975, 1], x: [1.05, 1] }, Math.random() * 200 + 1000, Phaser.Easing.Quadratic.Out, true, 0, -1);
            }
            else if (this.monsterData.id === "001" || this.monsterData.id === "007" || this.monsterData.id === "010" || this.monsterData.id === "013") {
                var time = Math.random() * 500 + 1500;
                this.tweenMonster = this.game.add.tween(this.monsterImage)
                    .to({ y: 10 }, time, Phaser.Easing.Quadratic.InOut);
                this.tweenMonster2 = this.game.add.tween(this.monsterImage)
                    .to({ y: 0 }, time, Phaser.Easing.Quadratic.InOut);
                this.tweenMonster.chain(this.tweenMonster2);
                this.tweenMonster2.chain(this.tweenMonster);
                this.tweenMonster.start();
            }
            else {
                this.tweenMonster = this.game.add.tween(this.monsterImage.scale)
                    .to({ y: [.975, 1] }, Math.random() * 500 + 2500, Phaser.Easing.Quadratic.Out, true, 0, -1);
            }
        };
        Monster.prototype.stopTweenMonster = function () {
            if (this.tweenMonster) {
                this.tweenMonster.stop();
            }
            if (this.tweenMonster2) {
                this.tweenMonster2.stop();
            }
            this.monsterImage.scale.set(1);
            this.monsterImage.y = 0;
        };
        Monster.prototype.changeFrameName = function (frameName) {
            this.monsterImage.frameName = frameName;
            this.startTweenMonster();
        };
        Monster.prototype.showMonsterStates = function () {
            if (this.isPlayer && MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_ESCAPE) {
                return;
            }
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].destroy();
            }
            this.states = new Array();
            var monster = this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0] : MagikMons.GameVars.adversaryMonstersFighting[0];
            if (monster.hypno) {
                var state = new Phaser.Sprite(this.game, 0, 0, "texture_atlas_4", this.monsterImage.frameName);
                state.anchor.set(.5, 1);
                state.alpha = .6;
                this.add(state);
                this.states.push(state);
                var state2 = new Phaser.Sprite(this.game, 0, -this.monsterImage.height / 2, "texture_atlas_1", "glitch.png");
                state2.anchor.set(.5);
                this.add(state2);
                this.states.push(state2);
                this.hackAnimation(state, state2, 2);
            }
            if (monster.poison) {
                var state_1 = new Phaser.Sprite(this.game, 0, -100, "texture_atlas_3", "poisoned_01.png");
                state_1.anchor.set(.5, 1);
                state_1.scale.set(.8);
                this.add(state_1);
                this.sendToBack(state_1);
                this.states.push(state_1);
                var anim = state_1.animations.add("anim", Phaser.Animation.generateFrameNames("poisoned_", 1, 25, ".png", 2));
                anim.onComplete.add(function () {
                    state_1.visible = false;
                    this.game.time.events.add(Math.random() * 1000 + 1000, function () {
                        if (this.monsterData.poison) {
                            state_1.visible = true;
                            state_1.play("anim", 40);
                        }
                    }, this);
                }, this);
                anim.onStart.add(function () {
                    MagikMons.AudioManager.playSound("fx_poisoned");
                }, this);
                state_1.play("anim", 40);
            }
            if (monster.rage) {
                var state = new Phaser.Sprite(this.game, 0, 0, "texture_atlas_3", "beam_tech_01.png");
                state.anchor.set(.5, 1);
                this.add(state);
                this.states.push(state);
                state.animations.add("anim", Phaser.Animation.generateFrameNames("beam_tech_", 1, 5, ".png", 2));
                state.play("anim", 16, true);
            }
        };
        Monster.prototype.hackAnimation = function (state, state2, num) {
            if (!this.monsterData.hypno) {
                return;
            }
            if (Math.random() < .25) {
                MagikMons.AudioManager.playSound("fx_hacked_01");
            }
            else if (Math.random() < .5) {
                MagikMons.AudioManager.playSound("fx_hacked_02");
            }
            else if (Math.random() < .75) {
                MagikMons.AudioManager.playSound("fx_hacked_03");
            }
            else {
                MagikMons.AudioManager.playSound("fx_hacked_04");
            }
            state.visible = true;
            state2.visible = true;
            state.x = Math.random() * 40 - 20;
            state2.x = Math.random() * 160 - 80;
            state2.y = Math.random() * 80 - 40 - this.monsterImage.height / 2;
            if (Math.random() * 5 < 2) {
                state2.visible = true;
            }
            else {
                state2.visible = false;
            }
            this.game.time.events.add(50, function () {
                state.x = Math.random() * 20 - 10;
                state.y = Math.random() * 20 - 10;
                this.game.time.events.add(50, function () {
                    state.x = Math.random() * 40 - 20;
                    state2.x = Math.random() * 160 - 80;
                    state2.y = Math.random() * 80 - 40 - this.monsterImage.height / 2;
                    if (Math.random() * 5 < 2) {
                        state2.visible = true;
                    }
                    else {
                        state2.visible = false;
                    }
                    this.game.time.events.add(50, function () {
                        state.visible = false;
                        state2.visible = false;
                        if (num === 0) {
                            var rand = Math.random() * 2200 + 800;
                            this.game.time.events.add(rand, function () {
                                this.hackAnimation(state, state2, Math.floor(Math.random() * 3));
                            }, this);
                        }
                        else {
                            num--;
                            this.game.time.events.add(200, function () {
                                this.hackAnimation(state, state2, num);
                            }, this);
                        }
                    }, this);
                }, this);
            }, this);
        };
        Monster.prototype.poisonAnimation = function () {
            this.game.time.events.add(750, function () {
                var poison = new Phaser.Sprite(this.game, 0, -50, "texture_atlas_3", "poisoned_01.png");
                poison.anchor.set(.5, 1);
                this.add(poison);
                poison.animations.add("anim", Phaser.Animation.generateFrameNames("poisoned_", 1, 25, ".png", 2));
                poison.play("anim", 24, false, true);
                var array = MagikMons.Utils.shakeArray(30, 3);
                this.game.add.tween(this.monsterImage)
                    .to({ x: array }, 500, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        Monster.prototype.changeMonster = function () {
            if (this.x === this.xIn) {
                if (this.isPlayer) {
                    this.game.add.tween(this)
                        .to({ x: this.xOut }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true)
                        .onComplete.add(this.nextMonster, this);
                }
                else {
                    this.removeStates();
                    this.game.add.tween(this.monsterImage)
                        .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true);
                    this.game.add.tween(this.monsterImage.scale)
                        .to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Cubic.Out, true)
                        .onComplete.add(function () {
                        this.monsterImage.scale.set(1);
                        this.monsterImage.alpha = 1;
                        this.y = this.isPlayer ? MagikMons.GameConstants.Y_PLAYER : MagikMons.GameConstants.Y_ADVERSARY;
                        this.x = this.xOut;
                        this.nextMonster();
                    }, this);
                }
            }
            else if (this.x === this.xOut) {
                this.nextMonster();
            }
        };
        Monster.prototype.retireMonster = function () {
            this.removeStates();
            var y = this.y;
            this.game.add.tween(this.monsterImage)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.monsterImage.scale)
                .to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.monsterImage.scale.set(1);
                this.monsterImage.alpha = 1;
                this.y = this.isPlayer ? MagikMons.GameConstants.Y_PLAYER : MagikMons.GameConstants.Y_ADVERSARY;
                this.x = this.xOut;
            }, this);
        };
        Monster.prototype.showSmoke = function () {
            var smoke = new Phaser.Image(this.game, 0, 200, "texture_atlas_3", "smoke_generic_01.png");
            smoke.anchor.set(.5, 1);
            smoke.scale.set(2.5);
            this.add(smoke);
            smoke.animations.add("anim", Phaser.Animation.generateFrameNames("smoke_generic_", 1, 21, ".png", 2));
            smoke.play("anim", 16, false, true);
        };
        Monster.prototype.showCatchAnimation = function () {
            this.showSmoke();
            var flash = new Phaser.Image(this.game, 0, 40, "texture_atlas_3", "flash_generic_01.png");
            flash.anchor.set(.5, 1);
            this.add(flash);
            flash.animations.add("anim", Phaser.Animation.generateFrameNames("flash_generic_", 1, 9, ".png", 2));
            flash.play("anim", 16, false, true);
            var dazzle = new Phaser.Image(this.game, 0, 40, "texture_atlas_3", "dazzle_generic_01.png");
            dazzle.anchor.set(.5, 1);
            this.add(dazzle);
            dazzle.animations.add("anim", Phaser.Animation.generateFrameNames("dazzle_generic_", 1, 20, ".png", 2));
            dazzle.play("anim", 16, false, true);
        };
        Monster.prototype.monsterToIcon = function () {
            this.stopTweenMonster();
            this.monsterImage.frameName = "icon_" + this.monsterData.id + ".png";
            this.monsterImage.y -= 90;
            this.lifeBarContainer.visible = false;
            this.game.add.tween(this.monsterImage)
                .to({ y: this.monsterImage.y + 90 }, MagikMons.GameConstants.CHANGE_TIME * 2, Phaser.Easing.Bounce.Out, true, MagikMons.GameConstants.CHANGE_TIME);
        };
        Monster.prototype.removeStates = function () {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].alpha = 0;
            }
        };
        Monster.prototype.showStates = function () {
            for (var i = 0; i < this.states.length; i++) {
                this.states[i].alpha = 1;
                if (this.states[i].frameName === this.monsterImage.frameName) {
                    this.states[i].alpha = .5;
                }
            }
        };
        Monster.prototype.iconToMonster = function () {
            this.monsterImage.frameName = "mkm_" + this.monsterData.id + "_back.png";
            this.lifeBarContainer.visible = true;
            this.startTweenMonster();
        };
        Monster.prototype.nextMonster = function () {
            this.monsterData = this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0] : MagikMons.GameVars.adversaryMonstersFighting[0];
            var id = this.isPlayer ? MagikMons.GameVars.playerMonstersFighting[0].id : MagikMons.GameVars.adversaryMonstersFighting[0].id;
            var monsterTextureName = "mkm_" + id + "_";
            monsterTextureName += this.isPlayer ? "back.png" : "front.png";
            this.changeFrameName(monsterTextureName);
            this.showMonsterStates();
            this.game.add.tween(this)
                .to({ x: this.xIn }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
        };
        Monster.prototype.deadMonster = function () {
            this.removeStates();
            this.game.add.tween(this.monsterImage)
                .to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.monsterImage.scale)
                .to({ x: 1.1, y: 1.1 }, 250, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.monsterImage.scale.set(1);
                this.monsterImage.alpha = 1;
                this.y = this.isPlayer ? MagikMons.GameConstants.Y_PLAYER : MagikMons.GameConstants.Y_ADVERSARY;
                this.x = this.xOut;
            }, this);
        };
        Monster.prototype.updateLife = function () {
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                this.updateLifeBar();
            }, this);
        };
        Monster.prototype.changeLifeBar = function () {
            var barPercentage = Math.round(this.monsterData.life / this.monsterData.maxLife * 100);
            var barLength = this.monsterData.life / this.monsterData.maxLife * Monster.LIFE_BAR_LENGTH;
            this.lifeBar.scale.x = barLength / 64;
            this.lifeBar.tint = this.setBarColor(barPercentage);
            this.lifeBarBack.tint = this.setBarBackColor(barPercentage);
        };
        Monster.prototype.updateLifeBar = function () {
            var barPercentage = Math.round(this.monsterData.life / this.monsterData.maxLife * 100);
            var barLength = this.monsterData.life / this.monsterData.maxLife * Monster.LIFE_BAR_LENGTH;
            this.updatingLife = true;
            this.game.add.tween(this.lifeBar.scale)
                .to({ x: barLength / 64 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME)
                .onComplete.add(function () {
                this.updatingLife = false;
            }, this);
        };
        Monster.prototype.setBarColor = function (barPercentage) {
            if (barPercentage > Monster.ORANGE_BAR_PERCENTAGE) {
                return 0x3ec851;
            }
            else if (barPercentage > Monster.RED_BAR_PERCENTAGE) {
                return 0x3ec851;
            }
            else {
                return 0x3ec851;
            }
        };
        Monster.prototype.setBarBackColor = function (barPercentage) {
            if (barPercentage > Monster.ORANGE_BAR_PERCENTAGE) {
                return 0x027560;
            }
            else if (barPercentage > Monster.RED_BAR_PERCENTAGE) {
                return 0x027560;
            }
            else {
                return 0x027560;
            }
        };
        Monster.prototype.addLifeBar = function () {
            this.lifeBarContainer = new Phaser.Group(this.game);
            this.add(this.lifeBarContainer);
        };
        Monster.LIFE_BAR_LENGTH = 180;
        Monster.ORANGE_BAR_PERCENTAGE = 50;
        Monster.RED_BAR_PERCENTAGE = 25;
        return Monster;
    }(Phaser.Group));
    MagikMons.Monster = Monster;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MonstersContainer = (function (_super) {
        __extends(MonstersContainer, _super);
        function MonstersContainer(game) {
            var _this = _super.call(this, game, null, "monsters-container") || this;
            _this.animationsContainer1 = new MagikMons.AnimationsContainer(_this.game, false);
            _this.add(_this.animationsContainer1);
            var spriterFile = new Spriter.SpriterXml(_this.game.cache.getXML("capture"), { imageNameType: Spriter.eImageNameType.ORIGINAL });
            var spriterLoader = new Spriter.Loader();
            var spriterData = spriterLoader.load(spriterFile);
            _this.trainerSpriter = new Spriter.SpriterGroup(_this.game, spriterData, "texture_atlas_1", "entity_000", 0, 4);
            _this.add(_this.trainerSpriter);
            _this.trainerSpriter.setAnimationSpeedPercent(4);
            _this.trainerSpriter.playAnimationByName("idle_01");
            _this.trainerSpriter.onLoop.add(_this.onAnimationLoopFinished, _this);
            _this.adversary = new MagikMons.Monster(_this.game, false);
            _this.add(_this.adversary);
            _this.player = new MagikMons.Monster(_this.game, true);
            _this.add(_this.player);
            _this.animationsContainer2 = new MagikMons.AnimationsContainer(_this.game, true);
            _this.add(_this.animationsContainer2);
            _this.trainer = new Phaser.Image(_this.game, MagikMons.GameConstants.X_OUT_PLAYER, MagikMons.GameConstants.Y_PLAYER, "texture_atlas_1", "hero_back.png");
            _this.trainer.anchor.set(.5, 1);
            _this.add(_this.trainer);
            _this.trainerSpriter.x = MagikMons.GameConstants.X_OUT_ADVERSARY - _this.trainer.width / 2 + 20;
            _this.trainerSpriter.y = MagikMons.GameConstants.Y_ADVERSARY - _this.trainer.height;
            _this.trainerSpriter.visible = false;
            var activeSign_px;
            var activeSign_py;
            if (MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                activeSign_px = _this.player.xIn;
                activeSign_py = _this.player.y - 10;
            }
            else {
                activeSign_px = _this.adversary.xIn;
                activeSign_py = _this.adversary.y - 10;
            }
            _this.signContainer = new Phaser.Group(_this.game);
            _this.signContainer.x = activeSign_px;
            _this.signContainer.y = activeSign_py;
            _this.signContainer.scale.y = .35;
            _this.addAt(_this.signContainer, 0);
            if (MagikMons.GameVars.playerMonstersFighting[0]) {
                var signTextureName = "current_mkm_" + MagikMons.GameVars.playerMonstersFighting[0].class + ".png";
                _this.activeMonsterSign = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", signTextureName);
                _this.activeMonsterSign.anchor.set(.5);
                _this.signContainer.add(_this.activeMonsterSign);
                var auraTexturename = "aura_" + MagikMons.GameVars.playerMonstersFighting[0].class + ".png";
                _this.aura = new Phaser.Image(_this.game, activeSign_px, activeSign_py, "texture_atlas_2", auraTexturename);
                _this.aura.anchor.set(.5, .75);
                _this.add(_this.aura);
                _this.game.add.tween(_this.activeMonsterSign)
                    .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            }
            else {
                var signTextureName = "current_turn_ander.png";
                _this.activeMonsterSign = new Phaser.Image(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, signTextureName);
                _this.activeMonsterSign.anchor.set(.5);
                _this.signContainer.add(_this.activeMonsterSign);
                _this.game.add.tween(_this.activeMonsterSign)
                    .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            }
            _this.itemContainer = new Phaser.Group(_this.game);
            _this.itemContainer.x = MagikMons.GameConstants.X_IN_PLAYER;
            _this.itemContainer.y = MagikMons.GameConstants.Y_PLAYER - 100;
            _this.itemContainer.visible = false;
            _this.add(_this.itemContainer);
            _this.itemAnim1 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "item_01.png");
            _this.itemAnim1.anchor.set(.5);
            _this.itemContainer.add(_this.itemAnim1);
            _this.itemAnim2 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "dazzle_generic_01.png");
            _this.itemAnim2.anchor.set(.5);
            _this.itemContainer.add(_this.itemAnim2);
            _this.itemText = new Phaser.Text(_this.game, 0, 60, "", { font: "30px Chewy", fontWeight: "200", fill: "#72ffff", align: "center" });
            _this.itemText.stroke = "#009eff";
            _this.itemText.strokeThickness = 6;
            _this.itemText.anchor.set(.5);
            _this.itemContainer.add(_this.itemText);
            _this.item = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "icon_big_heal.png");
            _this.item.anchor.set(.5);
            _this.itemContainer.add(_this.item);
            _this.itemAnim1.animations.add("anim", Phaser.Animation.generateFrameNames("item_", 1, 34, ".png", 2))
                .onComplete.add(function () {
                this.itemAnim1.visible = false;
            }, _this);
            _this.itemAnim2.animations.add("anim", Phaser.Animation.generateFrameNames("dazzle_generic_", 1, 20, ".png", 2))
                .onComplete.add(function () {
                this.itemAnim2.visible = false;
            }, _this);
            _this.ray = new Phaser.Graphics(_this.game, 0, 0);
            _this.ray.lineStyle(60, 0x05fffe, 0.25);
            _this.ray.moveTo(MagikMons.GameConstants.X_IN_ADVERSARY + 80, MagikMons.GameConstants.Y_ADVERSARY - 140);
            _this.ray.lineTo(MagikMons.GameConstants.X_IN_PLAYER + 40, MagikMons.GameConstants.Y_PLAYER - 120);
            _this.ray.lineStyle(40, 0xd1ffd8, 0.25);
            _this.ray.moveTo(MagikMons.GameConstants.X_IN_ADVERSARY + 80, MagikMons.GameConstants.Y_ADVERSARY - 140);
            _this.ray.lineTo(MagikMons.GameConstants.X_IN_PLAYER + 40, MagikMons.GameConstants.Y_PLAYER - 120);
            _this.ray.lineStyle(30, 0xffffff, 0.25);
            _this.ray.moveTo(MagikMons.GameConstants.X_IN_ADVERSARY + 80, MagikMons.GameConstants.Y_ADVERSARY - 140);
            _this.ray.lineTo(MagikMons.GameConstants.X_IN_PLAYER + 40, MagikMons.GameConstants.Y_PLAYER - 120);
            _this.ray.visible = false;
            _this.add(_this.ray);
            _this.final = "fail";
            return _this;
        }
        MonstersContainer.prototype.update = function () {
            _super.prototype.update.call(this);
            this.trainerSpriter.updateAnimation();
        };
        MonstersContainer.prototype.changeAuraTutorial = function () {
            this.game.time.events.add(1500, function () {
                this.signContainer.remove(this.activeMonsterSign);
                this.activeMonsterSign = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "current_mkm_spectre.png");
                this.activeMonsterSign.anchor.set(.5);
                this.signContainer.add(this.activeMonsterSign);
                this.game.add.tween(this.activeMonsterSign)
                    .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
                this.game.add.tween(this.signContainer)
                    .to({ x: this.adversary.xIn, y: this.adversary.y - 10 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        MonstersContainer.prototype.onAnimationLoopFinished = function () {
            if (this.trainerSpriter.currentAnimationName === "stance") {
                if (MagikMons.FightManager.decisionCatch()) {
                    this.final = "success";
                    this.trainerSpriter.setAnimationSpeedPercent(4);
                }
                else {
                    this.final = "fail";
                    this.trainerSpriter.setAnimationSpeedPercent(7);
                }
                this.trainerSpriter.playAnimationByName("stance_02");
                MagikMons.AudioManager.playSound("fx_capture");
                this.ray.visible = true;
                this.ray.alpha = 0;
                this.game.add.tween(this.ray)
                    .to({ alpha: 1 }, 50, Phaser.Easing.Cubic.In, true)
                    .onComplete.add(function () {
                    this.ray.visible = false;
                }, this);
            }
            else if (this.trainerSpriter.currentAnimationName === "stance_02") {
                if (this.final === "success") {
                    this.game.time.events.add(300, function () {
                        MagikMons.AudioManager.playSound("fx_capture_success");
                    }, this);
                    this.trainerSpriter.setAnimationSpeedPercent(4);
                    this.trainerSpriter.playAnimationByName("success");
                }
                else {
                    this.trainerSpriter.setAnimationSpeedPercent(4);
                    this.trainerSpriter.playAnimationByName("fail");
                    this.game.time.events.add(100, function () {
                        MagikMons.AudioManager.playSound("fx_capture_fail");
                    }, this);
                }
            }
            else if (this.trainerSpriter.currentAnimationName === "success" || this.trainerSpriter.currentAnimationName === "fail") {
                this.trainerSpriter.setAnimationSpeedPercent(4);
                this.trainerSpriter.playAnimationByName("final_idle");
            }
        };
        MonstersContainer.prototype.turnChanged = function () {
            var x;
            var y;
            if (MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER) {
                x = this.player.xIn;
                y = this.player.y - 10;
                MagikMons.FightManager.enableGUI();
            }
            else {
                x = this.adversary.xIn;
                y = this.adversary.y - 10;
                this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 4, MagikMons.FightManager.adversaryAttack, this);
            }
            this.game.add.tween(this.signContainer)
                .to({ x: x, y: y }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.aura)
                .to({ x: x, y: y }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.changeSign();
        };
        MonstersContainer.prototype.hideAdversary = function () {
            this.game.add.tween(this.adversary)
                .to({ alpha: 0, y: this.adversary.y + 50 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.aura)
                .to({ alpha: 0, y: this.aura.y + 50 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.aura.scale)
                .to({ x: .8, y: .8 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.activeMonsterSign)
                .to({ alpha: 0, y: this.activeMonsterSign.y + 50 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.activeMonsterSign.scale)
                .to({ x: .8, y: .8 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.trainer)
                .to({ y: this.trainer.y + 100 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.In, true);
        };
        MonstersContainer.prototype.changeSignClass = function (monsterClass) {
            this.activeMonsterSign.frameName = "current_mkm_" + monsterClass + ".png";
        };
        MonstersContainer.prototype.animationCatch = function () {
            this.changeSign(true);
            this.game.add.tween(this.signContainer)
                .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY, y: MagikMons.GameConstants.Y_ADVERSARY - 10 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.aura)
                .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY, y: MagikMons.GameConstants.Y_ADVERSARY - 10 }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.player)
                .to({ x: this.player.xOut }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.trainer)
                .to({ x: MagikMons.GameConstants.X_IN_PLAYER }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 3, this.adversaryToTrainer, this);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 3, this.trainerToAdversary, this);
        };
        MonstersContainer.prototype.animationReturnToFight = function () {
            this.adversary.iconToMonster();
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, this.adversaryToInitial, this);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, this.trainerToInitial, this);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME * 5, function () {
                this.game.add.tween(this.trainer)
                    .to({ x: this.player.xOut }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.player)
                    .to({ x: MagikMons.GameConstants.X_IN_PLAYER }, MagikMons.GameConstants.CHANGE_TIME, Phaser.Easing.Cubic.Out, true, MagikMons.GameConstants.CHANGE_TIME);
            }, this);
        };
        MonstersContainer.prototype.showUseItem = function (name) {
            if (name === "attack") {
                this.itemText.text = MagikMons.GameVars.names["ATTACK"];
            }
            else if (name === "defense") {
                this.itemText.text = MagikMons.GameVars.names["DEFENSE"];
            }
            else if (name === "aim") {
                this.itemText.text = MagikMons.GameVars.names["AIM"];
            }
            else if (name === "heal") {
                this.itemText.text = MagikMons.GameVars.names["HEAL"];
            }
            else if (name === "focus") {
                this.itemText.text = MagikMons.GameVars.names["FOCUS"];
            }
            else if (name === "antidote") {
                this.itemText.text = MagikMons.GameVars.names["ANTIDOTE"];
            }
            this.item.frameName = "icon_big_" + name + ".png";
            this.itemContainer.visible = true;
            this.itemAnim1.visible = false;
            this.itemAnim2.visible = false;
            this.item.scale.set(0);
            this.itemText.scale.set(0);
            this.item.alpha = 1;
            this.itemText.alpha = 1;
            this.game.time.events.add(500, function () {
                this.itemAnim1.visible = true;
                this.itemAnim1.play("anim", 24);
            }, this);
            this.game.add.tween(this.item.scale)
                .to({ x: 1, y: 1 }, 600, Phaser.Easing.Cubic.In, true, 1000);
            this.game.add.tween(this.itemText.scale)
                .to({ x: 1, y: 1 }, 600, Phaser.Easing.Cubic.In, true, 1000)
                .onComplete.add(function () {
                this.itemAnim2.visible = true;
                this.itemAnim2.play("anim", 24);
                this.game.add.tween(this.item.scale)
                    .to({ x: 1.1, y: 1.1 }, 600, Phaser.Easing.Linear.None, true, 2000);
                this.game.add.tween(this.itemText.scale)
                    .to({ x: 1.1, y: 1.1 }, 600, Phaser.Easing.Linear.None, true, 2000);
                this.game.add.tween(this.item)
                    .to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 2000);
                this.game.add.tween(this.itemText)
                    .to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 2000);
            }, this);
        };
        MonstersContainer.prototype.updateLife = function (target) {
            if (target === MagikMons.GameConstants.PLAYER) {
                this.player.updateLife();
            }
            else {
                this.adversary.updateLife();
            }
        };
        MonstersContainer.prototype.showMonsterStates = function () {
            this.player.showMonsterStates();
            this.adversary.showMonsterStates();
        };
        MonstersContainer.prototype.changePlayerMonster = function () {
            this.player.changeMonster();
            this.changeSign();
        };
        MonstersContainer.prototype.changeAdversaryMonster = function () {
            this.adversary.changeMonster();
            this.changeSign();
        };
        MonstersContainer.prototype.retireAdversaryMonster = function () {
            this.adversary.retireMonster();
        };
        MonstersContainer.prototype.deadPlayerMonster = function () {
            this.player.deadMonster();
        };
        MonstersContainer.prototype.playerAttack = function (attackData) {
            this.animationAttack(this.player, attackData);
            var time = MagikMons.GameVars.specialAttack ? MagikMons.GameConstants.CHANGE_TIME * 9 : MagikMons.GameConstants.CHANGE_TIME * 5;
            this.game.time.events.add(time, MagikMons.FightManager.changeTurn, this);
        };
        MonstersContainer.prototype.adversaryAttack = function (attackData) {
            this.animationAttack(this.adversary, attackData);
            var time = MagikMons.GameVars.specialAttack ? MagikMons.GameConstants.CHANGE_TIME * 9 : MagikMons.GameConstants.CHANGE_TIME * 5;
            this.game.time.events.add(time, MagikMons.FightManager.changeTurn, this);
        };
        MonstersContainer.prototype.animationAttack = function (attack, attackData) {
            var action;
            if (attackData) {
                action = MagikMons.GameVars.monstersActions[attackData.id];
            }
            else {
                if (attack === this.player) {
                    action = MagikMons.GameVars.monstersActions["001"];
                }
                else {
                    action = MagikMons.GameVars.monstersActions["015"];
                }
            }
            if (attackData && !attackData.miss) {
                this.animationsContainer1.newAction(action, attackData.backfired);
                this.animationsContainer2.newAction(action, attackData.backfired);
            }
            else if (!attackData) {
                if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_ESCAPE || MagikMons.GameVars.turn !== MagikMons.GameConstants.PLAYER) {
                    this.animationsContainer1.newAction(action, false);
                    this.animationsContainer2.newAction(action, false);
                }
            }
            var defense = this.player;
            var top = -1;
            if (attack === this.player) {
                defense = this.adversary;
                top = 1;
            }
            if (action.movement_player) {
                this.playAnimationAttack(attack, top, action.movement_player);
            }
            if (action.movement_adversary && attackData && !attackData.miss && !attackData.backfired) {
                this.playAnimationDefense(defense, top, action.movement_adversary);
            }
            else if (!attackData) {
                this.playAnimationDefense(defense, top, action.movement_adversary);
            }
        };
        MonstersContainer.prototype.playAnimationAttack = function (monster, top, type) {
            var delay = Math.round(type[1] * 60);
            if (type[0] === 1) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: -20 * top, y: 20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 50 * top, y: -50 * top }, 50, Phaser.Easing.Cubic.Out, true)
                        .onComplete.add(function () {
                        this.game.add.tween(monster.monsterImage)
                            .to({ x: 0, y: 0 }, 400, Phaser.Easing.Quintic.Out, true);
                    }, this);
                }, this);
            }
            else if (type[0] === 2) {
                var array = MagikMons.Utils.shakeArray(30, 3);
                this.game.add.tween(monster.monsterImage)
                    .to({ x: array }, 500, Phaser.Easing.Cubic.Out, true, delay);
            }
        };
        MonstersContainer.prototype.playAnimationDefense = function (monster, top, type) {
            var delay = Math.round(type[1] * 60);
            if (type[0] === 1) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: 20 * top, y: -20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 0, y: 0 }, 400, Phaser.Easing.Quintic.Out, true);
                }, this);
                this.game.add.tween(monster.monsterImage.scale)
                    .to({ x: .95, y: .95 }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage.scale)
                        .to({ x: 1, y: 1 }, 400, Phaser.Easing.Quintic.Out, true);
                }, this);
            }
            else if (type[0] === 2) {
                var array = MagikMons.Utils.shakeArray(30, 3);
                this.game.add.tween(monster.monsterImage)
                    .to({ x: array }, 500, Phaser.Easing.Cubic.Out, true, delay);
            }
            else if (type[0] === 3) {
                this.game.add.tween(monster.monsterImage)
                    .to({ x: 20 * top, y: -20 * top }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage)
                        .to({ x: 0, y: 0 }, 500, Phaser.Easing.Quintic.Out, true)
                        .onComplete.add(function () {
                        var array = MagikMons.Utils.shakeArray(30, 3);
                        this.game.add.tween(monster.monsterImage)
                            .to({ x: array }, 400, Phaser.Easing.Cubic.Out, true);
                    }, this);
                }, this);
                this.game.add.tween(monster.monsterImage.scale)
                    .to({ x: .95, y: .95 }, 50, Phaser.Easing.Cubic.Out, true, delay)
                    .onComplete.add(function () {
                    this.game.add.tween(monster.monsterImage.scale)
                        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Quintic.Out, true);
                }, this);
            }
        };
        MonstersContainer.prototype.adversaryToTrainer = function () {
            this.game.add.tween(this.trainer)
                .to({ x: MagikMons.GameConstants.X_OUT_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.trainer)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                this.trainer.visible = false;
                this.trainerSpriter.visible = true;
                this.trainerSpriter.x = MagikMons.GameConstants.X_OUT_ADVERSARY - this.trainer.width / 2 + 20;
                this.trainerSpriter.y = MagikMons.GameConstants.Y_ADVERSARY - this.trainer.height;
                this.trainer.frameName = "hero_front.png";
                this.game.add.tween(this.trainer)
                    .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.trainer)
                    .to({ y: MagikMons.GameConstants.Y_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.trainerSpriter)
                    .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY - this.trainer.width / 2 + 40 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.trainerSpriter)
                    .to({ y: MagikMons.GameConstants.Y_ADVERSARY - this.trainer.height + 40 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true)
                    .onComplete.add(function () {
                    this.trainerSpriter.playAnimationByName("stance");
                }, this);
            }, this);
        };
        MonstersContainer.prototype.trainerToInitial = function () {
            this.game.add.tween(this.trainer)
                .to({ x: MagikMons.GameConstants.X_OUT_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.trainer)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.trainerSpriter)
                .to({ x: MagikMons.GameConstants.X_OUT_PLAYER - this.trainer.width / 2 + 20 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.trainerSpriter)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 - this.trainer.height }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                this.trainer.visible = true;
                this.trainerSpriter.visible = false;
                this.trainer.frameName = "hero_back.png";
                this.game.add.tween(this.trainer)
                    .to({ x: MagikMons.GameConstants.X_IN_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.trainer)
                    .to({ y: MagikMons.GameConstants.Y_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        MonstersContainer.prototype.trainerToAdversary = function () {
            this.game.add.tween(this.adversary)
                .to({ x: MagikMons.GameConstants.X_OUT_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.adversary)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.aura)
                .to({ x: MagikMons.GameConstants.X_OUT_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.aura)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.signContainer)
                .to({ x: MagikMons.GameConstants.X_OUT_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.signContainer)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                var id = MagikMons.GameVars.adversaryMonstersFighting[0].id;
                var monsterTextureName = "mkm_" + id + "_back.png";
                this.adversary.changeFrameName(monsterTextureName);
                this.adversary.removeStates();
                this.game.add.tween(this.adversary)
                    .to({ x: MagikMons.GameConstants.X_IN_PLAYER + 50 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.adversary)
                    .to({ y: MagikMons.GameConstants.Y_PLAYER }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.aura)
                    .to({ x: MagikMons.GameConstants.X_IN_PLAYER + 50 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.aura)
                    .to({ y: MagikMons.GameConstants.Y_PLAYER - 10 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.signContainer)
                    .to({ x: MagikMons.GameConstants.X_IN_PLAYER + 50 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.signContainer)
                    .to({ y: MagikMons.GameConstants.Y_PLAYER - 10 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        MonstersContainer.prototype.adversaryToInitial = function () {
            this.game.add.tween(this.adversary)
                .to({ x: MagikMons.GameConstants.X_OUT_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.adversary)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.aura)
                .to({ x: MagikMons.GameConstants.X_OUT_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.aura)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.signContainer)
                .to({ x: MagikMons.GameConstants.X_OUT_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.signContainer)
                .to({ y: MagikMons.GameConstants.Y_PLAYER / 2 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.In, true);
            this.game.time.events.add(MagikMons.GameConstants.CHANGE_TIME, function () {
                var id = MagikMons.GameVars.adversaryMonstersFighting[0].id;
                var monsterTextureName = "mkm_" + id + "_front.png";
                this.adversary.changeFrameName(monsterTextureName);
                this.adversary.showStates();
                this.game.add.tween(this.adversary)
                    .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.adversary)
                    .to({ y: MagikMons.GameConstants.Y_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.aura)
                    .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.aura)
                    .to({ y: MagikMons.GameConstants.Y_ADVERSARY - 10 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.signContainer)
                    .to({ x: MagikMons.GameConstants.X_IN_ADVERSARY }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.signContainer)
                    .to({ y: MagikMons.GameConstants.Y_ADVERSARY - 10 }, MagikMons.GameConstants.CHANGE_TIME / 2, Phaser.Easing.Cubic.Out, true);
            }, this);
        };
        MonstersContainer.prototype.changeSign = function (change) {
            var signClass = MagikMons.GameVars.turn === MagikMons.GameConstants.PLAYER ? MagikMons.GameVars.playerMonstersFighting[0].class : MagikMons.GameVars.adversaryMonstersFighting[0].class;
            if (change) {
                signClass = MagikMons.GameVars.turn !== MagikMons.GameConstants.PLAYER ? MagikMons.GameVars.playerMonstersFighting[0].class : MagikMons.GameVars.adversaryMonstersFighting[0].class;
            }
            var signTextureName = "current_mkm_" + signClass + ".png";
            this.activeMonsterSign.frameName = signTextureName;
            var auraTextureName = "aura_" + signClass + ".png";
            this.aura.frameName = auraTextureName;
        };
        return MonstersContainer;
    }(Phaser.Group));
    MagikMons.MonstersContainer = MonstersContainer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var ChapterLayer = (function (_super) {
        __extends(ChapterLayer, _super);
        function ChapterLayer(game) {
            var _this = _super.call(this, game, null, "chapter_layer") || this;
            _this.fixedToCamera = true;
            _this.visible = false;
            var box = new Phaser.Image(_this.game, 0, 300, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            box.tint = 0x1A2536;
            box.anchor.set(0, 1);
            box.alpha = .9;
            box.scale.y = MagikMons.GameVars.scaleY;
            box.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, 100 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(box);
            var title = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 210, MagikMons.GameVars.chaptersTexts[MagikMons.GameVars.slotData.mapName + " title"], { font: "40px Chewy", fill: "#ffffff", align: "center" });
            title.anchor.set(.5, 0);
            title.scale.y = MagikMons.GameVars.scaleY;
            _this.add(title);
            var subtitle = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 255, MagikMons.GameVars.chaptersTexts[MagikMons.GameVars.slotData.mapName + " subtitle"], { font: "28px Chewy", fill: "#ffffff", align: "center" });
            subtitle.anchor.set(.5, 0);
            subtitle.scale.y = MagikMons.GameVars.scaleY;
            _this.add(subtitle);
            return _this;
        }
        ChapterLayer.prototype.show = function () {
            this.visible = true;
            this.alpha = 0;
            var time = 5000;
            this.game.add.tween(this)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 1000)
                .onComplete.add(function () {
                this.game.add.tween(this)
                    .to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true, time)
                    .onComplete.add(function () {
                    this.visible = false;
                }, this);
            }, this);
        };
        return ChapterLayer;
    }(Phaser.Group));
    MagikMons.ChapterLayer = ChapterLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Hero = (function (_super) {
        __extends(Hero, _super);
        function Hero(game, x, y) {
            var _this = _super.call(this, game, null, "hero") || this;
            _this.x = x;
            _this.y = y;
            Hero.canMove = true;
            _this.encounterAnimation = new Phaser.Sprite(_this.game, 0, 0, "texture_atlas_3", "impact_classic_01.png");
            _this.encounterAnimation.anchor.set(.5);
            _this.encounterAnimation.scale.set(.5);
            _this.encounterAnimation.visible = false;
            _this.add(_this.encounterAnimation);
            _this.wand = new Phaser.Sprite(_this.game, 0, -40, "texture_atlas_1", "wand_map_01.png");
            _this.wand.anchor.set(.5);
            _this.wand.visible = false;
            _this.add(_this.wand);
            _this.explosionWand = new Phaser.Sprite(_this.game, 0, -40, "texture_atlas_3", "smoke_generic_01.png");
            _this.explosionWand.anchor.set(.5);
            _this.explosionWand.scale.set(.2);
            _this.explosionWand.visible = false;
            _this.add(_this.explosionWand);
            var animExplosion = _this.explosionWand.animations.add("explosion", Phaser.Animation.generateFrameNames("smoke_generic_", 1, 21, ".png", 2));
            animExplosion.onComplete.add(function () {
                this.explosionWand.visible = false;
            }, _this);
            _this.spriteHero = new Phaser.Sprite(_this.game, 0, 0, "texture_atlas_1", "down_03.png");
            _this.spriteHero.anchor.set(.5, .75);
            _this.add(_this.spriteHero);
            _this.direction = "idle";
            _this.fromDialogue = "";
            _this.spriteHero.animations.add("down", Phaser.Animation.generateFrameNames("down_", 1, 5, ".png", 2));
            _this.spriteHero.animations.add("up", Phaser.Animation.generateFrameNames("up_", 1, 5, ".png", 2));
            _this.spriteHero.animations.add("left", Phaser.Animation.generateFrameNames("side_", 1, 8, ".png", 2));
            _this.spriteHero.animations.add("rigth", Phaser.Animation.generateFrameNames("side_", 1, 8, ".png", 2));
            _this.tweenAnim = _this.game.add.tween(_this.spriteHero.scale)
                .to({ y: [.95, 1], x: [1.1, 1] }, 1600, Phaser.Easing.Cubic.In, true, 0, -1);
            var anim = _this.encounterAnimation.animations.add("encounter", Phaser.Animation.generateFrameNames("impact_spectre_", 1, 14, ".png", 2));
            anim.onComplete.add(function () {
                this.encounterAnimation.visible = false;
            }, _this);
            _this.wand.animations.add("wand", Phaser.Animation.generateFrameNames("wand_map_", 1, 16, ".png", 2));
            return _this;
        }
        Hero.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Hero.prototype.walk = function (path, position) {
            if (MagikMons.GameVars.paused) {
                this.stopWalk();
                return;
            }
            if (MagikMons.MapManager.findSpawn(position)) {
                Hero.canMove = false;
                return;
            }
            else if (MagikMons.MapManager.findDialogue(position)) {
                return;
            }
            else if (MagikMons.MapManager.findTrainer(position, path.length)) {
                return;
            }
            if (position < path.length) {
                Hero.walking = true;
                MagikMons.GameManager.saveHeroPosition(path[position]);
                if ((this.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE > path[position].y) {
                    this.setHeroWalk("up", "up_01.png", 1);
                }
                else if ((this.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE < path[position].y) {
                    this.setHeroWalk("down", "down_01.png", 1);
                }
                else if ((this.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE < path[position].x) {
                    this.setHeroWalk("left", "side_01.png", -1);
                }
                else if ((this.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE > path[position].x) {
                    this.setHeroWalk("rigth", "side_01.png", 1);
                }
                this.moveTo(path, position);
            }
            else {
                this.stopWalk();
                this.fromDialogue = "";
                MagikMons.MapManager.findObjectEndPath();
            }
        };
        Hero.prototype.stopWalk = function (trainer) {
            this.tweenAnim = this.game.add.tween(this.spriteHero.scale)
                .to({ y: [.95, 1], x: [1.1, 1] }, 1600, Phaser.Easing.Cubic.In, true, 0, -1);
            Hero.walking = false;
            this.spriteHero.animations.stop(null, true);
            if (this.direction === "down") {
                this.spriteHero.frameName = "down_03.png";
            }
            else if (this.direction === "up") {
                this.spriteHero.frameName = "up_03.png";
            }
            else {
                this.spriteHero.frameName = "side_03.png";
            }
            if (trainer) {
                this.spriteHero.frameName = "up_03.png";
            }
            this.direction = "idle";
        };
        Hero.prototype.changeWalk = function () {
            if (this.tweenHero) {
                this.tweenHero.stop();
            }
            if (this.tweenAnim) {
                this.tweenAnim.stop();
            }
        };
        Hero.prototype.watchingSign = function () {
            this.spriteHero.frameName = "up_03.png";
            this.direction = "idle";
        };
        Hero.prototype.startFight = function () {
            if (this.direction === "up") {
                this.encounterAnimation.x = this.spriteHero.x;
                this.encounterAnimation.y = this.spriteHero.y - MagikMons.GameConstants.TILES_SIZE;
                this.bringToTop(this.spriteHero);
            }
            else if (this.direction === "down") {
                this.encounterAnimation.x = this.spriteHero.x;
                this.encounterAnimation.y = this.spriteHero.y + MagikMons.GameConstants.TILES_SIZE;
                this.bringToTop(this.encounterAnimation);
            }
            else if (this.direction === "left") {
                this.encounterAnimation.x = this.spriteHero.x - MagikMons.GameConstants.TILES_SIZE;
                this.encounterAnimation.y = this.spriteHero.y;
                this.bringToTop(this.encounterAnimation);
            }
            else if (this.direction === "rigth") {
                this.encounterAnimation.x = this.spriteHero.x + MagikMons.GameConstants.TILES_SIZE;
                this.encounterAnimation.y = this.spriteHero.y;
                this.bringToTop(this.encounterAnimation);
            }
            if (MagikMons.GameVars.adversaryMonstersFighting[0].class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.encounterAnimation.frameName = "impact_classic_01.png";
                this.encounterAnimation.animations.add("encounter", Phaser.Animation.generateFrameNames("impact_classic_", 1, 16, ".png", 2));
            }
            else if (MagikMons.GameVars.adversaryMonstersFighting[0].class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.encounterAnimation.frameName = "impact_spectre_01.png";
                this.encounterAnimation.animations.add("encounter", Phaser.Animation.generateFrameNames("impact_spectre_", 1, 14, ".png", 2));
            }
            else {
                this.encounterAnimation.frameName = "impact_tech_01.png";
                this.encounterAnimation.animations.add("encounter", Phaser.Animation.generateFrameNames("impact_tech_", 1, 15, ".png", 2));
            }
            this.encounterAnimation.visible = true;
            this.encounterAnimation.alpha = 1;
            this.encounterAnimation.play("encounter", 30, false, true);
        };
        Hero.prototype.moveToExit = function (x, y) {
            if (this.y > y) {
                this.setHeroWalk("up", "up_01.png", 1);
            }
            else if (this.y < y) {
                this.setHeroWalk("down", "down_01.png", 1);
            }
            else if (this.x < x) {
                this.setHeroWalk("left", "side_01.png", -1);
            }
            else if (this.x > x) {
                this.setHeroWalk("rigth", "side_01.png", 1);
            }
            var distance = Math.sqrt((Math.pow(this.x - x, 2)) + (Math.pow(this.y - y, 2)));
            this.tweenHero = this.game.add.tween(this);
            this.tweenHero.to({
                x: x,
                y: y
            }, Hero.HERO_TIME * distance, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.stopWalk, this);
        };
        Hero.prototype.setHeroWalk = function (type, frameName, scale) {
            if (this.direction !== type) {
                this.spriteHero.frameName = frameName;
                this.spriteHero.play(type, Hero.HERO_FPS, true);
                this.scale.x = scale;
                this.direction = type;
            }
        };
        Hero.prototype.setHeroDirection = function (type, frameName, scale) {
            if (this.direction !== type) {
                this.spriteHero.frameName = frameName;
                this.scale.x = scale;
            }
        };
        Hero.prototype.startTalkingWand = function () {
            this.setHeroDirection("up", "up_03.png", 1);
            this.direction = "idle";
            this.explosionWand.visible = true;
            this.explosionWand.play("explosion", 30, false, false);
            MagikMons.AudioManager.playSound("smoke_generic");
            this.wand.visible = true;
            this.wand.alpha = 0;
            this.game.add.tween(this.wand)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
        };
        Hero.prototype.stopTakingWand = function () {
            this.explosionWand.visible = true;
            this.explosionWand.play("explosion", 30, false, false);
            MagikMons.AudioManager.playSound("smoke_generic");
            this.game.add.tween(this.wand)
                .to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.wand.visible = false;
            }, this);
        };
        Hero.prototype.moveTo = function (path, position) {
            var x = path[position].x * MagikMons.GameConstants.TILES_SIZE + MagikMons.GameConstants.TILES_SIZE_HALF;
            var y = path[position].y * MagikMons.GameConstants.TILES_SIZE + MagikMons.GameConstants.TILES_SIZE_HALF;
            var distance = Math.sqrt((Math.pow(this.x - x, 2)) + (Math.pow(this.y - y, 2)));
            this.tweenHero = this.game.add.tween(this);
            this.tweenHero.to({
                x: x,
                y: y
            }, Hero.HERO_TIME * distance, Phaser.Easing.Linear.None, true);
            this.tweenHero.onComplete.add(function () {
                MagikMons.MapState.currentInstance.mapContainer.hero.walk(path, position + 1);
            }, this);
            Hero.heroSteps++;
            MagikMons.AudioManager.playSound("step");
        };
        Hero.HERO_TIME = 5;
        Hero.HERO_FPS = 15;
        Hero.heroSteps = 0;
        Hero.walking = false;
        Hero.canMove = true;
        return Hero;
    }(Phaser.Group));
    MagikMons.Hero = Hero;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var LoadingLayer = (function (_super) {
        __extends(LoadingLayer, _super);
        function LoadingLayer(game) {
            var _this = _super.call(this, game, null, "loading-layer") || this;
            _this.framesCounter = 0;
            var darkLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.BLACK_SQUARE));
            darkLayer.alpha = .8;
            darkLayer.inputEnabled = true;
            darkLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            darkLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(darkLayer);
            var container = new Phaser.Group(_this.game);
            container.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            container.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            container.scale.y = MagikMons.GameVars.scaleY;
            _this.add(container);
            _this.waiting = new Phaser.Sprite(_this.game, 0, 0, "texture_atlas_1", "waiting.png");
            _this.waiting.anchor.set(.5);
            container.add(_this.waiting);
            return _this;
        }
        LoadingLayer.prototype.update = function () {
            _super.prototype.update.call(this);
            this.framesCounter++;
            if (this.framesCounter === 5) {
                this.framesCounter = 0;
                this.waiting.angle += 30;
            }
        };
        LoadingLayer.prototype.onClickDarkLayer = function () {
        };
        return LoadingLayer;
    }(Phaser.Group));
    MagikMons.LoadingLayer = LoadingLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapContainer = (function (_super) {
        __extends(MapContainer, _super);
        function MapContainer(game) {
            var _this = _super.call(this, game, null, "map-container") || this;
            var mapName = MagikMons.GameVars.slotData.mapName;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.initialPosition = { x: MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.slotData.mapsData[mapName].heroPosition.x + MagikMons.GameConstants.TILES_SIZE_HALF,
                y: MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.slotData.mapsData[mapName].heroPosition.y + MagikMons.GameConstants.TILES_SIZE_HALF };
            _this.nextDialogue = false;
            _this.nextDialogueSpace = false;
            _this.canFindPath = false;
            _this.easyStar = new EasyStar.js();
            _this.hero = new MagikMons.Hero(_this.game, _this.initialPosition.x, _this.initialPosition.y);
            _this.add(_this.hero);
            _this.clicksGroup = new Phaser.Group(_this.game);
            _this.add(_this.clicksGroup);
            _this.chargeMap(MagikMons.GameVars.slotData.mapsData[mapName].tilemapName, MagikMons.GameVars.slotData.mapsData[mapName].imageName);
            _this.reorder();
            if (MagikMons.GameVars.needWalk) {
                var nextX_1 = _this.hero.x;
                var nextY_1 = _this.hero.y;
                if (MagikMons.GameVars.needWalk === "left") {
                    _this.hero.x += MagikMons.GameConstants.TILES_SIZE;
                }
                else if (MagikMons.GameVars.needWalk === "right") {
                    _this.hero.x -= MagikMons.GameConstants.TILES_SIZE;
                }
                else if (MagikMons.GameVars.needWalk === "up") {
                    _this.hero.y += MagikMons.GameConstants.TILES_SIZE;
                }
                else {
                    _this.hero.y -= MagikMons.GameConstants.TILES_SIZE;
                }
                _this.game.time.events.add(500, function () {
                    this.hero.moveToExit(nextX_1, nextY_1);
                }, _this);
            }
            if (mapName === "map1" && MagikMons.GameVars.slotData.state === MagikMons.GameConstants.INITIAL_BUS) {
                MagikMons.GameVars.paused = true;
                var bus_1 = new Phaser.Image(_this.game, _this.initialPosition.x - 5, _this.initialPosition.y - 20, "texture_atlas_1", "bus.png");
                bus_1.anchor.set(.5);
                _this.add(bus_1);
                _this.game.add.tween(bus_1)
                    .to({ x: bus_1.x - 1700 }, 4000, Phaser.Easing.Linear.None, true, 1000)
                    .onComplete.add(function () {
                    this.game.add.tween(bus_1)
                        .to({ x: bus_1.x - 1600 }, 3000, Phaser.Easing.Linear.None, true, 1000);
                    this.game.time.events.add(2000, function () {
                        MagikMons.GameVars.paused = false;
                        MagikMons.GameVars.slotData.state = MagikMons.GameConstants.TUTORIAL_ESCAPE;
                        this.finger = new Phaser.Image(this.game, this.initialPosition.x - 1880, this.initialPosition.y - 20, "texture_atlas_1", "tutorial_finger.png");
                        this.add(this.finger);
                        this.game.add.tween(this.finger)
                            .to({ x: [this.initialPosition.x - 1895, this.initialPosition.x - 1880] }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
                        var x = Math.round((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                        var y = Math.round((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                        MagikMons.GameManager.saveHeroPosition({ x: x, y: y });
                    }, this);
                }, _this);
                _this.game.add.tween(_this.hero)
                    .to({ x: _this.hero.x - 1700 }, 4000, Phaser.Easing.Linear.None, true, 1000);
            }
            _this.spaceKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            _this.leftKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            _this.rightKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            _this.upKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            _this.downKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            _this.prevX = _this.hero.x;
            _this.prevY = _this.hero.y;
            _this.prevCol = false;
            _this.game.world.setBounds(0, 0, MagikMons.GameVars.slotData.mapsData[mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.scaleY);
            _this.game.camera.follow(_this.hero.spriteHero, Phaser.Camera.FOLLOW_LOCKON);
            return _this;
        }
        MapContainer.prototype.removeTrainer = function () {
            for (var i = 0; i < this.trainers.length; i++) {
                this.bringToTop(this.hero);
                if (this.trainers[i].data.id === MagikMons.GameVars.needRemoveTrainer.id) {
                    if (MagikMons.GameVars.needRemoveTrainer.id !== "016") {
                        this.removeTrainerFromMap(this.trainers[i].tiledX, this.trainers[i].tiledY);
                        this.trainers[i].removeTrainer();
                        MagikMons.MapManager.removeTrainer();
                    }
                    else {
                        MagikMons.GameVars.needRemoveTrainer = null;
                        MagikMons.GameVars.slotData.winLastTrainer = true;
                        MagikMons.GameManager.writeGameData();
                    }
                    break;
                }
            }
        };
        MapContainer.prototype.changeLastTrainer = function () {
            for (var i = 0; i < this.trainers.length; i++) {
                this.bringToTop(this.hero);
                if (this.trainers[i].data.id === "016") {
                    this.trainers[i].changeLastTrainer();
                }
            }
        };
        MapContainer.prototype.init = function () {
            this.createAnimations();
        };
        MapContainer.prototype.update = function () {
            _super.prototype.update.call(this);
            MagikMons.GameManager.defaultCursor();
            if (!MagikMons.Hero.canMove || MagikMons.GameVars.paused) {
                return;
            }
            if ((this.game.input.activePointer.y / MagikMons.GameVars.scaleY) < 95 && MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_WAND) {
                return;
            }
            if (MagikMons.GameVars.needChangeMkm) {
                return;
            }
            this.changeZorder();
            this.checkShowHand();
            if (this.game.input.activePointer.isUp) {
                if (this.nextDialogue) {
                    MagikMons.MapManager.nextDialogue();
                    this.nextDialogue = false;
                    return;
                }
                else {
                    if (MagikMons.GameVars.needRemoveTrainer) {
                        return;
                    }
                    if (this.canFindPath) {
                        this.canFindPath = false;
                        this.findPath();
                    }
                }
            }
            if (this.game.input.activePointer.isDown) {
                if (this.finger) {
                    this.finger.destroy();
                }
                if (MagikMons.MapManager.dialogueOpen()) {
                    this.nextDialogue = true;
                }
                else {
                    this.canFindPath = true;
                }
            }
            if (this.spaceKey.isUp) {
                if (this.nextDialogueSpace) {
                    MagikMons.MapManager.nextDialogue();
                    this.nextDialogueSpace = false;
                    return;
                }
            }
            if (this.spaceKey.isDown) {
                if (!this.nextDialogueSpace && MagikMons.MapManager.dialogueOpen()) {
                    this.nextDialogueSpace = true;
                }
            }
        };
        MapContainer.prototype.checkShowHand = function () {
            if (this.game.device.desktop) {
                var to = {
                    x: this.background.getTileX(this.game.input.activePointer.worldX),
                    y: this.background.getTileY(this.game.input.activePointer.worldY / MagikMons.GameVars.scaleY)
                };
                if (this.clickOnTrainer(to.x, to.y) || this.clickOnSign(to.x, to.y)) {
                    this.game.canvas.style.cursor = "pointer";
                }
                else {
                    this.game.canvas.style.cursor = "default";
                }
            }
        };
        MapContainer.prototype.needReplace = function (tileId, layerName, xMin, xMax, yMin, yMax) {
            var layer;
            if (layerName === "background") {
                layer = this.background;
            }
            else if (layerName === "collisions1") {
                layer = this.collisions[0];
            }
            else if (layerName === "collisions2") {
                layer = this.collisions[1];
            }
            else if (layerName === "bridges") {
                layer = this.bridges;
            }
            for (var i = xMin; i <= xMax; i++) {
                for (var j = yMin; j <= yMax; j++) {
                    if (layer.layer.data[j][i] && layer.layer.data[j][i].index === tileId) {
                        return true;
                    }
                }
            }
            return false;
        };
        MapContainer.prototype.changeZorder = function () {
            var x;
            var y;
            var xAux;
            var yAux;
            if (this.prevX <= this.hero.x) {
                if (this.prevCol) {
                    x = Math.floor((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                else {
                    x = Math.ceil((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                xAux = Math.floor((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            }
            else {
                if (this.prevCol) {
                    x = Math.ceil((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                else {
                    x = Math.floor((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                xAux = Math.ceil((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            }
            if (this.prevY <= this.hero.y) {
                if (this.prevCol) {
                    y = Math.floor((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                else {
                    y = Math.ceil((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                yAux = Math.floor((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            }
            else {
                if (this.prevCol) {
                    y = Math.ceil((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                else {
                    y = Math.floor((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                }
                yAux = Math.ceil((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            }
            this.prevX = this.hero.x;
            this.prevY = this.hero.y;
            if (this.level[y - 1][x] === 2 || this.level[y - 1][x] === 3) {
                this.topHero();
            }
            else {
                this.backHero();
            }
            if (this.level[yAux - 1][xAux] === 2 || this.level[yAux - 1][xAux] === 3) {
                this.prevCol = true;
            }
            else {
                this.prevCol = false;
            }
        };
        MapContainer.prototype.chargeMap = function (name, tiles) {
            this.stamp = new Phaser.Sprite(this.game, 0, 0, "tiles");
            this.stamp.anchor.set(.5);
            this.add(this.stamp);
            this.hero.position.set(this.initialPosition.x, this.initialPosition.y);
            this.map = this.game.add.tilemap(name);
            this.map.addTilesetImage(tiles, tiles);
            this.objects = this.map.objects;
            this.objects = this.objects.objects;
            MagikMons.MapManager.initObjects(this.objects);
            this.background = this.map.createLayer("background");
            this.background.renderable = false;
            var cacheTexture = this.game.cache.getRenderTexture(this.background.layer.name + MagikMons.GameVars.slotData.mapName);
            if (cacheTexture) {
                this.backgroundImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                this.add(this.backgroundImage);
            }
            else {
                var backgroundTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                this.backgroundImage = new Phaser.Sprite(this.game, 0, 0, backgroundTexture);
                this.add(this.backgroundImage);
                this.renderTexture(this.background, backgroundTexture);
            }
            var count = 0;
            for (var i = 0; i < this.map.layers.length; i++) {
                if (!this.map.layers[i].name.search("collisions")) {
                    count++;
                }
            }
            this.collisions = new Array();
            this.collisionsImages = new Array();
            for (var i = 1; i <= count; i++) {
                var name_1 = "collisions" + i;
                var collision = this.map.createLayer(name_1);
                collision.renderable = false;
                this.collisions.push(collision);
                cacheTexture = this.game.cache.getRenderTexture(collision.layer.name + MagikMons.GameVars.slotData.mapName);
                var collisionsImage = void 0;
                if (cacheTexture) {
                    collisionsImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                    this.add(collisionsImage);
                    this.collisionsImages.push(collisionsImage);
                }
                else {
                    var collisionsTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                    collisionsImage = new Phaser.Sprite(this.game, 0, 0, collisionsTexture);
                    this.add(collisionsImage);
                    this.collisionsImages.push(collisionsImage);
                    this.renderTexture(collision, collisionsTexture);
                }
            }
            this.animationsBot = this.map.createLayer("animationsBot");
            this.animationsBot.renderable = false;
            this.animationsBotGroup = new Phaser.Group(this.game);
            this.add(this.animationsBotGroup);
            this.bridges = this.map.createLayer("bridges");
            this.bridges.renderable = false;
            cacheTexture = this.game.cache.getRenderTexture(this.bridges.layer.name + MagikMons.GameVars.slotData.mapName);
            if (cacheTexture) {
                this.bridgesImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                this.add(this.bridgesImage);
            }
            else {
                var bridgeTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                this.bridgesImage = new Phaser.Sprite(this.game, 0, 0, bridgeTexture);
                this.add(this.bridgesImage);
                this.renderTexture(this.bridges, bridgeTexture);
            }
            this.animationsTop = this.map.createLayer("animationsTop");
            this.animationsTop.renderable = false;
            this.animationsTopGroup = new Phaser.Group(this.game);
            this.add(this.animationsTopGroup);
            this.trainers = new Array();
            for (var i = 0; i < MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers.length; i++) {
                var trainer = new MagikMons.Trainer(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers[i]);
                this.add(trainer);
                this.trainers.push(trainer);
            }
            this.createLevel();
            this.bringToTop(this.hero);
            for (var i = 0; i < this.collisionsImages.length; i++) {
                this.bringToTop(this.collisionsImages[i]);
            }
            this.bringToTop(this.animationsTopGroup);
            this.bringToTop(this.clicksGroup);
            if (MagikMons.GameConstants.SHOW_COLLISIONS) {
                this.createLevelHelper();
            }
            MagikMons.GameManager.writeGameData();
        };
        MapContainer.prototype.createAnimations = function () {
            for (var i = 0; i < this.animationsTop.layer.data.length; i++) {
                for (var j = 0; j < this.animationsTop.layer.data[0].length; j++) {
                    for (var k = 0; k < MagikMons.GameVars.animations.length; k++) {
                        var anim = MagikMons.GameVars.animations[k];
                        if (this.animationsTop.layer.data[i][j].index === anim.tile) {
                            var sprite = new Phaser.Sprite(this.game, j * MagikMons.GameConstants.TILES_SIZE, i * MagikMons.GameConstants.TILES_SIZE, "texture_atlas_1", anim.name + "_01.png");
                            this.animationsTopGroup.add(sprite);
                            sprite.animations.add("anim", Phaser.Animation.generateFrameNames(anim.name + "_", 1, anim.length, ".png", 2));
                            sprite.play("anim", 8 + Math.random() * 6, true);
                        }
                        if (this.animationsBot.layer.data[i][j].index === anim.tile) {
                            var sprite = new Phaser.Sprite(this.game, j * MagikMons.GameConstants.TILES_SIZE, i * MagikMons.GameConstants.TILES_SIZE, "texture_atlas_1", anim.name + "_01.png");
                            this.animationsBotGroup.add(sprite);
                            sprite.animations.add("anim", Phaser.Animation.generateFrameNames(anim.name + "_", 1, anim.length, ".png", 2));
                            sprite.play("anim", 8 + Math.random() * 6, true);
                        }
                    }
                }
            }
        };
        MapContainer.prototype.renderTexture = function (layer, texture) {
            for (var i = 0; i < layer.layer.data.length; i++) {
                for (var j = 0; j < layer.layer.data[0].length; j++) {
                    this.stamp.scale.set(1);
                    this.stamp.rotation = 0;
                    if (layer.layer.data[i][j].flipped) {
                        if (layer.layer.data[i][j].flippedVal === 2) {
                            this.stamp.scale.y = -1;
                        }
                        else if (layer.layer.data[i][j].flippedVal === 4) {
                            this.stamp.scale.x = -1;
                        }
                    }
                    if (layer.layer.data[i][j].rotation) {
                        this.stamp.rotation = layer.layer.data[i][j].rotation;
                    }
                    if (layer.layer.data[i][j].index !== -1) {
                        this.stamp.frame = layer.layer.data[i][j].index - 1;
                        texture.renderXY(this.stamp, j * MagikMons.GameConstants.TILES_SIZE + (MagikMons.GameConstants.TILES_SIZE / 2), i * MagikMons.GameConstants.TILES_SIZE + (MagikMons.GameConstants.TILES_SIZE / 2));
                    }
                }
            }
            this.game.cache.addRenderTexture(layer.layer.name + MagikMons.GameVars.slotData.mapName, texture);
        };
        MapContainer.prototype.createLevel = function () {
            this.level = [];
            if (MagikMons.GameConstants.COLLISIONS) {
                for (var i = 0; i < this.background.layer.data.length; i++) {
                    this.level[i] = [];
                    for (var j = 0; j < this.background.layer.data[0].length; j++) {
                        if (this.background.layer.data[i][j].properties.collision) {
                            this.level[i][j] = 1;
                        }
                        else {
                            this.level[i][j] = 0;
                        }
                        if (this.bridges.layer.data[i][j].properties.collision === false) {
                            this.level[i][j] = 0;
                        }
                        if (this.bridges.layer.data[i][j].properties.sendBack) {
                            this.level[i][j] = 3;
                        }
                    }
                }
                for (var i = 0; i < this.collisions.length; i++) {
                    for (var j = 0; j < this.collisions[i].layer.data.length; j++) {
                        for (var k = 0; k < this.collisions[i].layer.data[0].length; k++) {
                            if (this.collisions[i].layer.data[j][k].properties.collision) {
                                if (this.collisions[i].layer.data[j][k].properties.sendBack) {
                                    this.level[j][k] = 2;
                                }
                                else {
                                    this.level[j][k] = 1;
                                }
                            }
                        }
                    }
                }
                for (var i = 0; i < this.trainers.length; i++) {
                    var x = Math.round((this.trainers[i].x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                    var y = Math.round((this.trainers[i].y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
                    this.level[y][x] = 1;
                    this.level[y][x - 1] = 1;
                    this.level[y][x - 2] = 1;
                    this.level[y][x + 1] = 1;
                    this.level[y][x + 2] = 1;
                }
            }
            else {
                for (var i = 0; i < this.background.layer.data.length; i++) {
                    this.level[i] = [];
                    for (var j = 0; j < this.background.layer.data[0].length; j++) {
                        this.level[i][j] = 0;
                    }
                }
            }
        };
        MapContainer.prototype.removeTrainerFromMap = function (x, y) {
            this.level[y][x] = 0;
            this.level[y][x - 1] = 0;
            this.level[y][x - 2] = 0;
            this.level[y][x + 1] = 0;
            this.level[y][x + 2] = 0;
        };
        MapContainer.prototype.findPath = function () {
            var x = Math.round((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            var y = Math.round((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            this.levelMin = this.createLevelMin(x, y);
            this.easyStar.setGrid(this.levelMin);
            this.easyStar.setAcceptableTiles([0, 3]);
            this.easyStar.enableDiagonals();
            var from = { x: x, y: y };
            var to = {
                x: this.background.getTileX(this.game.input.activePointer.worldX),
                y: this.background.getTileY(this.game.input.activePointer.worldY / MagikMons.GameVars.scaleY)
            };
            to.y += this.clickOnTrainer(to.x, to.y);
            to.y += this.clickOnSign(to.x, to.y);
            this.easyStar.findPath(from.x, from.y, to.x, to.y, function (path) {
                if (path === null) {
                    MagikMons.GameManager.log("The path to the destination point was not found.");
                    MagikMons.MapState.currentInstance.mapContainer.focusHero(from.x, from.y, to.x, to.y);
                    MagikMons.MapState.currentInstance.mapContainer.showWrongClick();
                }
                else {
                    MagikMons.MapState.currentInstance.mapContainer.hero.changeWalk();
                    MagikMons.MapState.currentInstance.mapContainer.hero.walk(path, 1);
                    MagikMons.MapState.currentInstance.mapContainer.showCorrectClick();
                }
            });
            this.easyStar.calculate();
        };
        MapContainer.prototype.showWrongClick = function () {
            var click = new Phaser.Image(this.game, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY / MagikMons.GameVars.scaleY, "texture_atlas_1", "cursor_wrong_01.png");
            click.anchor.set(.5);
            this.clicksGroup.add(click);
            click.animations.add("anim", Phaser.Animation.generateFrameNames("cursor_wrong_", 1, 6, ".png", 2));
            click.play("anim", 16, false, true);
            MagikMons.AudioManager.playSound("wrong_destination");
        };
        MapContainer.prototype.showCorrectClick = function () {
            var click = new Phaser.Image(this.game, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY / MagikMons.GameVars.scaleY, "texture_atlas_1", "cursor_ok_01.png");
            click.anchor.set(.5);
            this.clicksGroup.add(click);
            click.animations.add("anim", Phaser.Animation.generateFrameNames("cursor_ok_", 1, 6, ".png", 2));
            click.play("anim", 16, false, true);
            MagikMons.AudioManager.playSound("click_btn");
        };
        MapContainer.prototype.findPathArrow = function (xOff, yOff) {
            var x = Math.round((this.hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            var y = Math.round((this.hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            this.levelMin = this.createLevelMin(x, y);
            this.easyStar.setGrid(this.levelMin);
            this.easyStar.setAcceptableTiles([0, 3]);
            this.easyStar.enableDiagonals();
            var from = { x: x, y: y };
            var to = {
                x: from.x + xOff,
                y: from.y + yOff
            };
            to.y += this.clickOnTrainer(to.x, to.y);
            to.y += this.clickOnSign(to.x, to.y);
            this.easyStar.findPath(from.x, from.y, to.x, to.y, function (path) {
                if (path === null) {
                    MagikMons.GameManager.log("The path to the destination point was not found.");
                    MagikMons.MapState.currentInstance.mapContainer.focusHero(from.x, from.y, to.x, to.y);
                }
                else {
                    MagikMons.MapState.currentInstance.mapContainer.hero.changeWalk();
                    MagikMons.MapState.currentInstance.mapContainer.hero.walk(path, 1);
                }
            });
            this.easyStar.calculate();
        };
        MapContainer.prototype.clickOnTrainer = function (x, y) {
            for (var i = 0; i < this.trainers.length; i++) {
                if (!this.trainers[i].data.won) {
                    if (x === this.trainers[i].tiledX && y === this.trainers[i].tiledY) {
                        return 1;
                    }
                    else if (x === this.trainers[i].tiledX && (y + 1) === this.trainers[i].tiledY) {
                        return 2;
                    }
                }
            }
            return 0;
        };
        MapContainer.prototype.clickOnSign = function (x, y) {
            var point1 = { x: Math.round((x * MagikMons.GameConstants.TILES_SIZE) + MagikMons.GameConstants.TILES_SIZE_HALF), y: Math.round(((y + 1) * MagikMons.GameConstants.TILES_SIZE) + MagikMons.GameConstants.TILES_SIZE_HALF) };
            var point2 = { x: Math.round((x * MagikMons.GameConstants.TILES_SIZE) + MagikMons.GameConstants.TILES_SIZE_HALF), y: Math.round(((y + 2) * MagikMons.GameConstants.TILES_SIZE) + MagikMons.GameConstants.TILES_SIZE_HALF) };
            var dialogues = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dialogues;
            if (!dialogues) {
                return 0;
            }
            for (var i = 0; i < dialogues.length; i++) {
                if (dialogues[i].polygon) {
                    if (dialogues[i].sign) {
                        if (MagikMons.Utils.inside(point1, dialogues[i].polygon, dialogues[i].x, dialogues[i].y)) {
                            return 1;
                        }
                        else if (MagikMons.Utils.inside(point2, dialogues[i].polygon, dialogues[i].x, dialogues[i].y)) {
                            return 2;
                        }
                    }
                }
            }
            return 0;
        };
        MapContainer.prototype.focusHero = function (heroX, heroY, x, y) {
            if (MagikMons.Hero.walking) {
                return;
            }
            var diffX = x - heroX;
            var diffY = y - heroY;
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) {
                    this.hero.setHeroDirection("left", "side_03.png", 1);
                }
                else if (diffX > 0) {
                    this.hero.setHeroDirection("right", "side_03.png", -1);
                }
            }
            else {
                if (diffY < 0) {
                    this.hero.setHeroDirection("up", "up_03.png", 1);
                }
                else if (diffY > 0) {
                    this.hero.setHeroDirection("down", "down_03.png", 1);
                }
            }
        };
        MapContainer.prototype.createLevelMin = function (x, y) {
            var levelAux = [];
            var width = Math.round((MagikMons.GameConstants.GAME_WIDTH - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            var height = Math.round(((MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameVars.scaleY) - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            var xMin = x - Math.round(width / 2) > 0 ? x - Math.round(width / 2) : 0;
            var yMin = y - Math.round(height / 2) > 0 ? y - Math.round(height / 2) : 0;
            var xMax = xMin + width;
            var yMax = yMin + height;
            var xMap = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x;
            var yMap = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y;
            if (xMax > xMap) {
                xMax = xMap;
                xMin = xMax - width;
            }
            if (yMax > yMap) {
                yMax = yMap;
                yMin = yMax - height;
            }
            for (var i = 0; i < this.level.length; i++) {
                levelAux[i] = [];
                for (var j = 0; j < this.level[i].length; j++) {
                    if (i >= yMin && i <= yMax && j >= xMin && j <= xMax) {
                        levelAux[i][j] = this.level[i][j];
                    }
                    else {
                        levelAux[i][j] = 1;
                    }
                }
            }
            return levelAux;
        };
        MapContainer.prototype.nextMap = function (name, tiles) {
            this.chargeMap(name, tiles);
        };
        MapContainer.prototype.reorder = function () {
            this.bringToTop(this.hero);
            for (var i = 0; i < this.collisionsImages.length; i++) {
                this.bringToTop(this.collisionsImages[i]);
            }
            for (var i = 0; i < this.trainers.length; i++) {
                this.bringToTop(this.trainers[i]);
            }
            this.bringToTop(this.animationsTopGroup);
            this.bringToTop(this.clicksGroup);
        };
        MapContainer.prototype.topHero = function () {
            for (var i = 0; i < this.collisionsImages.length; i++) {
                this.bringToTop(this.collisionsImages[i]);
            }
            this.bringToTop(this.hero);
            if (MagikMons.GameConstants.SHOW_COLLISIONS) {
                this.bringToTop(this.levelHelper);
            }
            for (var i = 0; i < this.trainers.length; i++) {
                this.bringToTop(this.trainers[i]);
            }
            this.bringToTop(this.animationsTopGroup);
            this.bringToTop(this.clicksGroup);
        };
        MapContainer.prototype.backHero = function () {
            this.bringToTop(this.hero);
            for (var i = 0; i < this.collisionsImages.length; i++) {
                this.bringToTop(this.collisionsImages[i]);
            }
            for (var i = 0; i < this.trainers.length; i++) {
                this.bringToTop(this.trainers[i]);
            }
            if (MagikMons.GameConstants.SHOW_COLLISIONS) {
                this.bringToTop(this.levelHelper);
            }
            this.bringToTop(this.animationsTopGroup);
            this.bringToTop(this.clicksGroup);
        };
        MapContainer.prototype.zOrderHeroTrainers = function () {
            for (var i = 0; i < this.trainers.length; i++) {
                if (this.trainers[i].y > this.hero.y && this.getChildIndex(this.trainers[i]) < this.getChildIndex(this.hero)) {
                    this.swapChildren(this.trainers[i], this.hero);
                }
                else if (this.trainers[i].y < this.hero.y && this.getChildIndex(this.trainers[i]) > this.getChildIndex(this.hero)) {
                    this.swapChildren(this.trainers[i], this.hero);
                }
            }
        };
        MapContainer.prototype.createLevelHelper = function () {
            this.levelHelper = new Phaser.Group(this.game);
            this.add(this.levelHelper);
            for (var i = 0; i < this.level[0].length; i++) {
                for (var j = 0; j < this.level.length; j++) {
                    if (this.level[j][i] === 1) {
                        var image = new Phaser.Graphics(this.game, i * MagikMons.GameConstants.TILES_SIZE, j * MagikMons.GameConstants.TILES_SIZE);
                        image.lineStyle(0);
                        image.beginFill(0xFF0000, .5);
                        image.drawRect(0, 0, MagikMons.GameConstants.TILES_SIZE, MagikMons.GameConstants.TILES_SIZE);
                        image.endFill();
                        this.levelHelper.add(image);
                    }
                    else if (this.level[j][i] === 2) {
                        var image = new Phaser.Graphics(this.game, i * MagikMons.GameConstants.TILES_SIZE, j * MagikMons.GameConstants.TILES_SIZE);
                        image.lineStyle(0);
                        image.beginFill(0x0000FF, .5);
                        image.drawRect(0, 0, MagikMons.GameConstants.TILES_SIZE, MagikMons.GameConstants.TILES_SIZE);
                        image.endFill();
                        this.levelHelper.add(image);
                    }
                    else if (this.level[j][i] === 3) {
                        var image = new Phaser.Graphics(this.game, i * MagikMons.GameConstants.TILES_SIZE, j * MagikMons.GameConstants.TILES_SIZE);
                        image.lineStyle(0);
                        image.beginFill(0x00FF00, .5);
                        image.drawRect(0, 0, MagikMons.GameConstants.TILES_SIZE, MagikMons.GameConstants.TILES_SIZE);
                        image.endFill();
                        this.levelHelper.add(image);
                    }
                }
            }
        };
        return MapContainer;
    }(Phaser.Group));
    MagikMons.MapContainer = MapContainer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapManager = (function () {
        function MapManager() {
        }
        MapManager.init = function (game) {
            MapManager.game = game;
        };
        MapManager.initObjects = function (objects) {
            var name = MagikMons.GameVars.slotData.mapName;
            if (!MagikMons.GameVars.slotData.mapsData[name].spawns) {
                MagikMons.GameVars.slotData.mapsData[name].spawns = new Array();
                MagikMons.GameVars.slotData.mapsData[name].dialogues = new Array();
                MagikMons.GameVars.slotData.mapsData[name].trainers = new Array();
                MagikMons.GameVars.slotData.mapsData[name].exits = new Array();
                MagikMons.GameVars.slotData.mapsData[name].paths = new Array();
                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].type === "spawn") {
                        MapManager.addSpawn(objects[i]);
                    }
                    else if (objects[i].type === "dialogue") {
                        MapManager.addDialogue(objects[i]);
                    }
                    else if (objects[i].type === "exit") {
                        MapManager.addExit(objects[i]);
                    }
                    else if (objects[i].type === "trainer") {
                        MapManager.addTrainer(objects[i]);
                    }
                    else if (objects[i].type === "paths") {
                        MagikMons.GameVars.slotData.mapsData[name].paths.push(objects[i]);
                    }
                }
            }
        };
        MapManager.checkNeedChangeMkm = function () {
            MagikMons.GameVars.needChangeMkm = false;
            var needAttention = false;
            var maxLife = 0;
            var life = 0;
            for (var i = 0; i < 3; i++) {
                if (MagikMons.GameVars.slotData.monsters[i]) {
                    maxLife += MagikMons.GameVars.slotData.monsters[i].maxLife;
                    life += MagikMons.GameVars.slotData.monsters[i].life;
                }
            }
            if (maxLife > 0 && (life / maxLife) < .6) {
                needAttention = true;
            }
            MagikMons.MapState.currentInstance.mapGUI.needChangeMkm(needAttention);
        };
        MapManager.showMapLayer = function () {
            MagikMons.GameVars.paused = true;
            MagikMons.MapState.currentInstance.showMapLayer();
        };
        MapManager.hideMapLayer = function () {
            MagikMons.GameVars.paused = false;
            MagikMons.MapState.currentInstance.removeMapLayer();
        };
        MapManager.showTeamLayer = function () {
            MagikMons.GameVars.paused = true;
            MagikMons.MapState.currentInstance.showTeamLayer();
        };
        MapManager.hideTeamLayer = function () {
            MagikMons.GameVars.paused = false;
            MagikMons.MapState.currentInstance.removeTeamLayer();
        };
        MapManager.showItemsLayer = function () {
            MagikMons.GameVars.paused = true;
            MagikMons.MapState.currentInstance.showItemLayer();
        };
        MapManager.hideItemsLayer = function () {
            MagikMons.GameVars.paused = false;
            MagikMons.MapState.currentInstance.removeItemLayer();
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CRAFT) {
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["CAPTURE_1"], "CAPTURE_1");
                this.game.time.events.add(500, function () {
                    MagikMons.Hero.canMove = true;
                }, this);
            }
        };
        MapManager.showMkmLayer = function (monsterData) {
            MagikMons.MapState.currentInstance.showMkmLayer(monsterData);
        };
        MapManager.hideMkmLayer = function () {
            MagikMons.MapState.currentInstance.removeMkmLayer();
        };
        MapManager.nextMap = function () {
            MagikMons.MapState.currentInstance.mapContainer.nextMap("map1", "tileset_32");
        };
        MapManager.deleteSpawn = function (spawn) {
            var index = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].spawns.indexOf(spawn);
            if (index > -1) {
                MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].spawns.splice(index, 1);
            }
        };
        MapManager.deleteDialogue = function (dialogue) {
            var index = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dialogues.indexOf(dialogue);
            if (index > -1) {
                MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dialogues.splice(index, 1);
            }
        };
        MapManager.dialogueOpen = function () {
            return MagikMons.MapState.currentInstance.mapHUD.dialogueOpen();
        };
        MapManager.nextDialogue = function () {
            MagikMons.MapState.currentInstance.mapHUD.nextDialogue();
        };
        MapManager.closeDialogue = function () {
            MagikMons.MapState.currentInstance.mapHUD.closeDialogue();
        };
        MapManager.closeDialogueTutorial = function (value) {
            MagikMons.MapState.currentInstance.mapHUD.closeDialogue();
            if (value === "WAND_1") {
                MagikMons.MapState.currentInstance.mapContainer.hero.startTalkingWand();
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["WAND_2"], "WAND_2");
            }
            else if (value === "WAND_2") {
                MagikMons.MapState.currentInstance.mapGUI.showWand();
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["WAND_3"], "WAND_3");
            }
            else if (value === "WAND_3") {
                MagikMons.Hero.canMove = false;
                MagikMons.MapState.currentInstance.mapGUI.showSelectionType();
            }
            else if (value === "WAND_4") {
                MagikMons.Hero.canMove = false;
                MagikMons.MapState.currentInstance.mapGUI.showSelectedMonster();
            }
            else if (value === "WAND_5") {
                MagikMons.Hero.canMove = false;
                MapManager.activeWand();
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
            else if (value === "HEAL_1") {
                MagikMons.Hero.canMove = false;
                MapManager.activeWand();
            }
            else if (value === "CRAFT_1") {
                MagikMons.Hero.canMove = false;
                MapManager.activeItems();
            }
            else if (value === "CAPTURE_1") {
                MagikMons.GameManager.endCraftTutorial();
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
            else if (value === "SWAP_0") {
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["SWAP_1"], "SWAP_1");
                MagikMons.MapState.currentInstance.mapGUI.showSwap1();
            }
            else if (value === "SWAP_1") {
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["SWAP_2"], "SWAP_2");
                MagikMons.MapState.currentInstance.mapGUI.showSwap2();
            }
            else if (value === "SWAP_2") {
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["SWAP_3"], "SWAP_3");
                MagikMons.MapState.currentInstance.mapGUI.showSwap3();
            }
            else if (value === "SWAP_3") {
                MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["SWAP_4"], "SWAP_4");
                MagikMons.MapState.currentInstance.mapGUI.removeSwap();
            }
            else if (value === "SWAP_4") {
                MagikMons.GameManager.endSwap2Tutorial();
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
            else if (value === "NO_CAPTURE_1") {
                MagikMons.GameManager.endNoCaptureTutorial();
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
            else if (value === "MAP_1") {
                MapManager.activeMap();
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
            else if (value === "MAX_MKM") {
                MagikMons.GameVars.slotData.needMaxMkmTutorial = false;
                MagikMons.MapState.currentInstance.mapContainer.hero.stopTakingWand();
                MagikMons.GameManager.writeGameData();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
            }
        };
        MapManager.closeDialogueTrainer = function (value) {
            if (value === "IN") {
                MapManager.endDialogueTrainer();
            }
            else {
                MagikMons.MapState.currentInstance.mapHUD.closeDialogue();
                MagikMons.AudioManager.playSound("music_map", true, 1, true);
                if (MagikMons.GameVars.needRemoveTrainer) {
                    MagikMons.MapState.currentInstance.mapContainer.removeTrainer();
                }
                else if (MagikMons.GameVars.needDialogueTrainer) {
                    MagikMons.GameVars.needDialogueTrainer = null;
                }
            }
        };
        MapManager.changeLastTrainer = function () {
            MagikMons.MapState.currentInstance.mapContainer.changeLastTrainer();
        };
        MapManager.checkTutorialMaxMkm = function () {
            if (MagikMons.GameVars.slotData.needMaxMkmTutorial) {
                if (MagikMons.GameVars.slotData.monsters[0] &&
                    MagikMons.GameVars.slotData.monsters[1] &&
                    MagikMons.GameVars.slotData.monsters[2] &&
                    MagikMons.GameVars.slotData.monsters[3] &&
                    MagikMons.GameVars.slotData.monsters[4] &&
                    MagikMons.GameVars.slotData.monsters[5]) {
                    MagikMons.Hero.canMove = false;
                    MapManager.game.time.events.add(500, function () {
                        MagikMons.MapState.currentInstance.mapContainer.hero.startTalkingWand();
                        MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["MAX_MKM"], "MAX_MKM", true);
                        MapManager.game.time.events.add(500, function () {
                            MagikMons.Hero.canMove = true;
                        }, MapManager);
                    }, MapManager);
                }
            }
        };
        MapManager.typeSelected = function (type) {
            if (type === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                MagikMons.GameVars.slotData.monsters[0] = MagikMons.GameManager.createMonsterFromId(MagikMons.GameConstants.START_MKM_CLASSIC, 2, 1);
            }
            else if (type === MagikMons.GameConstants.ELEMENT_TECH) {
                MagikMons.GameVars.slotData.monsters[0] = MagikMons.GameManager.createMonsterFromId(MagikMons.GameConstants.START_MKM_TECH, 2, 1);
            }
            else if (type === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                MagikMons.GameVars.slotData.monsters[0] = MagikMons.GameManager.createMonsterFromId(MagikMons.GameConstants.START_MKM_SPECTRE, 2, 1);
            }
            MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["WAND_4"], "WAND_4");
            this.game.time.events.add(500, function () {
                MagikMons.Hero.canMove = true;
            }, this);
        };
        MapManager.monsterSelected = function () {
            MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["WAND_5"], "WAND_5");
            this.game.time.events.add(500, function () {
                MagikMons.Hero.canMove = true;
            }, this);
        };
        MapManager.activeWand = function () {
            MagikMons.MapState.currentInstance.resetTeamLayer();
            MagikMons.MapState.currentInstance.mapGUI.activeWand();
        };
        MapManager.activeItems = function () {
            MagikMons.MapState.currentInstance.mapGUI.activeItems();
        };
        MapManager.activeMap = function () {
            MagikMons.MapState.currentInstance.mapGUI.activeMap();
            MagikMons.GameManager.endMapTutorial();
        };
        MapManager.removeTrainer = function () {
            for (var i = 0; i < MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers.length; i++) {
                if (MagikMons.GameVars.needRemoveTrainer.id === MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers[i].id) {
                    if (MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_NO_CAPTURE && MagikMons.GameVars.slotData.state !== MagikMons.GameConstants.TUTORIAL_MAP) {
                        MagikMons.GameVars.needRemoveTrainer = null;
                    }
                    MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers.splice(i, 1);
                }
            }
            if (MagikMons.GameVars.needRemoveTrainer && MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_NO_CAPTURE) {
                MapManager.game.time.events.add(2500, function () {
                    MagikMons.MapState.currentInstance.mapContainer.hero.startTalkingWand();
                    MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["NO_CAPTURE_1"], "NO_CAPTURE_1");
                    MapManager.game.time.events.add(500, function () {
                        MagikMons.Hero.canMove = true;
                    }, MapManager);
                    MagikMons.GameVars.needRemoveTrainer = null;
                }, MapManager);
            }
            else if (MagikMons.GameVars.needRemoveTrainer && MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_MAP) {
                MapManager.game.time.events.add(2500, function () {
                    MagikMons.MapState.currentInstance.mapContainer.hero.startTalkingWand();
                    MagikMons.MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["MAP_1"], "MAP_1");
                    MapManager.game.time.events.add(500, function () {
                        MagikMons.Hero.canMove = true;
                    }, MapManager);
                    MagikMons.GameVars.needRemoveTrainer = null;
                }, MapManager);
            }
            MagikMons.GameManager.writeGameData();
        };
        MapManager.findSpawn = function (position) {
            var spawn = MapManager.heroInSpawn();
            if (position !== 0 && spawn) {
                var percent = spawn.percent;
                var ids = spawn.ids;
                var levels_max = spawn.ids_level_max;
                var levels_min = spawn.ids_level_min;
                var ids_percent = spawn.ids_percent;
                if (percent !== 100 && (position < 2 || MagikMons.Hero.heroSteps < MagikMons.GameConstants.MINIMUM_STEPS)) {
                    return false;
                }
                if (Math.round(Math.random() * 100) < percent && !MagikMons.GameConstants.REPELENTE) {
                    var randId = Math.round(Math.random() * 100);
                    var num = ids_percent[0];
                    var index = 0;
                    while (num < randId) {
                        index++;
                        num += ids_percent[index];
                    }
                    MagikMons.GameManager.log("Nueva batalla, magikmon [" + ids[index] + "]");
                    MagikMons.GameVars.currentSpawn = spawn;
                    MagikMons.GameManager.writeGameData();
                    MapManager.startFightMonster(ids[index], levels_max[index], levels_min[index]);
                    MagikMons.MapState.currentInstance.mapContainer.hero.stopWalk();
                    return true;
                }
            }
            return false;
        };
        MapManager.heroInSpawn = function () {
            var hero = MagikMons.MapState.currentInstance.mapContainer.hero;
            var point = { x: hero.x, y: hero.y };
            var spawns = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].spawns;
            for (var i = 0; i < spawns.length; i++) {
                if (spawns[i].polygon) {
                    if (MagikMons.Utils.inside(point, spawns[i].polygon, spawns[i].x, spawns[i].y)) {
                        return spawns[i];
                    }
                }
            }
            return null;
        };
        MapManager.findDialogue = function (position) {
            var dialogue = MapManager.heroInDialogue(false);
            if (position !== 0 && dialogue) {
                if (MagikMons.MapState.currentInstance.mapContainer.hero.fromDialogue === dialogue.name) {
                    return false;
                }
                MapManager.showDialogue(dialogue);
                MagikMons.GameManager.writeGameData();
                return true;
            }
            return false;
        };
        MapManager.heroInDialogue = function (sign) {
            var hero = MagikMons.MapState.currentInstance.mapContainer.hero;
            var point = { x: hero.x, y: hero.y };
            var dialogues = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dialogues;
            for (var i = 0; i < dialogues.length; i++) {
                if (dialogues[i].polygon) {
                    if ((sign && dialogues[i].sign) || (!sign && !dialogues[i].sign)) {
                        if (MagikMons.Utils.inside(point, dialogues[i].polygon, dialogues[i].x, dialogues[i].y)) {
                            return dialogues[i];
                        }
                    }
                }
            }
            return null;
        };
        MapManager.findTrainer = function (position, length) {
            if (position === 1 && length !== 0) {
                return false;
            }
            var hero = MagikMons.MapState.currentInstance.mapContainer.hero;
            var trainers = MagikMons.MapState.currentInstance.mapContainer.trainers;
            var x = Math.round((hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            var y = Math.round((hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            for (var i = 0; i < trainers.length; i++) {
                if (trainers[i].data.won) {
                    continue;
                }
                if ((x === trainers[i].tiledX && y === trainers[i].tiledY + 1)) {
                    MagikMons.MapState.currentInstance.mapContainer.hero.stopWalk(true);
                    MagikMons.GameManager.saveHeroPosition({ x: x, y: y });
                    MapManager.startFightTrainer(trainers[i].data);
                    return true;
                }
            }
            return false;
        };
        MapManager.trainerToHero = function (trainer, x, y) {
            MagikMons.Hero.canMove = false;
            MagikMons.MapState.currentInstance.mapContainer.hero.stopWalk();
            var hero = MagikMons.MapState.currentInstance.mapContainer.hero;
            x = MagikMons.GameConstants.TILES_SIZE * x + MagikMons.GameConstants.TILES_SIZE_HALF;
            y = MagikMons.GameConstants.TILES_SIZE * y + MagikMons.GameConstants.TILES_SIZE_HALF;
            var distance = Math.sqrt((Math.pow(hero.x - x, 2)) + (Math.pow(hero.y - y, 2)));
            var point = { x: hero.x, y: hero.y };
            point.x = Math.round((hero.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            point.y = Math.round((hero.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            this.game.add.tween(trainer)
                .to({ x: x, y: y }, MagikMons.Hero.HERO_TIME * distance * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                trainer.data.won = true;
                trainer.data.x = trainer.x;
                trainer.data.y = trainer.y;
                MagikMons.GameManager.saveHeroPosition(point);
                MapManager.startFightTrainer(trainer.data);
            }, this);
        };
        MapManager.findObjectEndPath = function () {
            var dialogue = MapManager.heroInDialogue(true);
            if (dialogue) {
                MapManager.showDialogue(dialogue);
                MagikMons.MapState.currentInstance.mapContainer.hero.watchingSign();
                MagikMons.GameManager.writeGameData();
                return;
            }
            var exit = MapManager.heroInExit();
            if (exit) {
                var nextX = MagikMons.MapState.currentInstance.mapContainer.hero.x;
                var nextY = MagikMons.MapState.currentInstance.mapContainer.hero.y;
                if (exit.direction === "left") {
                    nextX -= MagikMons.GameConstants.TILES_SIZE;
                }
                else if (exit.direction === "right") {
                    nextX += MagikMons.GameConstants.TILES_SIZE;
                }
                else if (exit.direction === "up") {
                    nextY -= MagikMons.GameConstants.TILES_SIZE;
                }
                else {
                    nextY += MagikMons.GameConstants.TILES_SIZE;
                }
                MagikMons.MapState.currentInstance.mapContainer.hero.moveToExit(nextX, nextY);
                MagikMons.GameVars.needWalk = exit.direction;
                MagikMons.GameManager.goMapState(exit.next);
            }
        };
        MapManager.heroInExit = function () {
            var hero = MagikMons.MapState.currentInstance.mapContainer.hero;
            var point = { x: hero.x, y: hero.y };
            var exits = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].exits;
            for (var i = 0; i < exits.length; i++) {
                if (exits[i].polygon) {
                    if (MagikMons.Utils.inside(point, exits[i].polygon, exits[i].x, exits[i].y)) {
                        return exits[i];
                    }
                }
            }
            return null;
        };
        MapManager.showDialogue = function (dialogue) {
            MagikMons.MapState.currentInstance.mapContainer.hero.fromDialogue = dialogue.name;
            MagikMons.GameManager.log("Estas en el dialogo: " + dialogue.name);
            MagikMons.MapState.currentInstance.mapHUD.showDialogue(dialogue);
            MagikMons.MapState.currentInstance.mapContainer.hero.stopWalk();
            if (dialogue.disable) {
                MapManager.deleteDialogue(dialogue);
            }
        };
        MapManager.getHeroPosition = function () {
            var point = new PIXI.Point(MagikMons.MapState.currentInstance.mapContainer.hero.x, MagikMons.MapState.currentInstance.mapContainer.hero.y * MagikMons.GameVars.scaleY);
            return this.game.world.toGlobal(point);
        };
        MapManager.startFightMonster = function (id, level_max, level_min) {
            MagikMons.AudioManager.stopSound("music_map", true, true);
            MagikMons.AudioManager.playSound("intro_combate");
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition.x = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPrevPosition.x;
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPosition.y = MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].heroPrevPosition.y;
            MagikMons.GameManager.writeGameData();
            MagikMons.GameVars.typeFight = MagikMons.GameConstants.MONSTER_FIGHT;
            MagikMons.GameManager.createAdversayMonster([id], [level_max], [level_min]);
            MagikMons.Hero.canMove = false;
            MagikMons.MapState.currentInstance.mapContainer.hero.startFight();
            this.game.camera.onFadeComplete.removeAll();
            this.game.camera.onFadeComplete.add(function () {
                MapManager.game.state.start("FightState", true, false);
            }, this);
            this.game.time.events.add(1000, function () {
                this.game.camera.fade(0x000000, 500, false);
            }, this);
        };
        MapManager.startFightTrainer = function (trainerData) {
            var id = trainerData.ids;
            var level = trainerData.ids_level;
            MagikMons.GameVars.typeFight = MagikMons.GameConstants.TRAINER_FIGHT;
            MagikMons.GameVars.currentTrainer = trainerData;
            MagikMons.GameManager.createAdversayMonster(id, level, level);
            if (MagikMons.GameVars.currentTrainer.first_time) {
                MagikMons.MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts[MagikMons.GameVars.currentTrainer.ids_text_in], "IN");
            }
            else {
                if (MagikMons.GameVars.currentTrainer.id !== "016" || !MagikMons.GameVars.slotData.winLastTrainer) {
                    MagikMons.MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts[MagikMons.GameVars.currentTrainer.ids_text_in_lose], "IN");
                }
                else {
                    MagikMons.MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts["trainer_16_in_win"], "IN");
                }
            }
        };
        MapManager.endDialogueTrainer = function () {
            MagikMons.AudioManager.playSound("intro_combate");
            this.game.camera.onFadeComplete.removeAll();
            this.game.camera.onFadeComplete.add(function () {
                MapManager.game.state.start("FightState", true, false);
            }, this);
            this.game.camera.fade(0x000000, 500, false);
        };
        MapManager.addSpawn = function (spawn) {
            var newSpawn = { name: spawn.name,
                x: spawn.x,
                y: spawn.y,
                polygon: spawn.polygon,
                ids: JSON.parse(spawn.properties.ids),
                ids_level_max: JSON.parse(spawn.properties.ids_level_max),
                ids_level_min: JSON.parse(spawn.properties.ids_level_min),
                ids_percent: JSON.parse(spawn.properties.ids_percent),
                percent: parseInt(spawn.properties.percent),
                solvable: spawn.properties.solvable };
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].spawns.push(newSpawn);
        };
        MapManager.addDialogue = function (dialogue) {
            var newDialogue = { name: dialogue.name,
                x: dialogue.x,
                y: dialogue.y,
                polygon: dialogue.polygon,
                disable: dialogue.properties.disable,
                random: dialogue.properties.random,
                sign: dialogue.properties.sign,
                ids: JSON.parse(dialogue.properties.ids),
                idIndex: 0 };
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dialogues.push(newDialogue);
        };
        MapManager.addExit = function (exit) {
            var newExit = { name: exit.name,
                x: exit.x,
                y: exit.y,
                polygon: exit.polygon,
                next: exit.properties.next,
                direction: exit.properties.direction
            };
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].exits.push(newExit);
        };
        MapManager.addTrainer = function (trainer) {
            var newTrainer = { id: trainer.properties.id,
                x: trainer.x,
                y: trainer.y,
                ids: JSON.parse(trainer.properties.ids),
                ids_level: JSON.parse(trainer.properties.ids_level),
                ids_text_in: trainer.properties.ids_text_in,
                ids_text_out: trainer.properties.ids_text_out,
                ids_text_in_lose: trainer.properties.ids_text_in_lose,
                ids_text_out_lose: trainer.properties.ids_text_out_lose,
                first_time: true,
                won: false };
            MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers.push(newTrainer);
        };
        return MapManager;
    }());
    MagikMons.MapManager = MapManager;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapState = (function (_super) {
        __extends(MapState, _super);
        function MapState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapState.prototype.init = function () {
            MapState.currentInstance = this;
            MagikMons.MapManager.init(this.game);
            MagikMons.AudioManager.playSound("music_map", true, 0.25, true);
        };
        MapState.prototype.create = function () {
            this.mapLayer = null;
            this.mapContainer = new MagikMons.MapContainer(this.game);
            this.mapContainer.init();
            this.add.existing(this.mapContainer);
            this.mapGUI = new MagikMons.MapGUI(this.game);
            this.add.existing(this.mapGUI);
            this.mapHUD = new MagikMons.MapHUD(this.game);
            this.add.existing(this.mapHUD);
            this.chapterLayer = new MagikMons.ChapterLayer(this.game);
            this.add.existing(this.chapterLayer);
            this.mapLayer = new MagikMons.MapLayer(this.game);
            this.add.existing(this.mapLayer);
            this.teamLayer = new MagikMons.TeamLayer(this.game);
            this.add.existing(this.teamLayer);
            this.mkmLayer = new MagikMons.MkmLayer(this.game);
            this.add.existing(this.mkmLayer);
            this.itemsLayer = new MagikMons.ItemsLayer(this.game);
            this.add.existing(this.itemsLayer);
            if (MagikMons.GameVars.needRemoveTrainer) {
                MagikMons.Hero.canMove = false;
                if (MagikMons.GameVars.needRemoveTrainer.id !== "016" || !MagikMons.GameVars.slotData.winLastTrainer) {
                    MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts[MagikMons.GameVars.needRemoveTrainer.ids_text_out], "OUT");
                }
                else {
                    MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts["trainer_16_out_win"], "OUT");
                }
                this.game.time.events.add(500, function () {
                    MagikMons.Hero.canMove = true;
                }, this);
            }
            else if (MagikMons.GameVars.needDialogueTrainer) {
                MagikMons.Hero.canMove = false;
                if (MagikMons.GameVars.needDialogueTrainer.id !== "016" || !MagikMons.GameVars.slotData.winLastTrainer) {
                    MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts[MagikMons.GameVars.needDialogueTrainer.ids_text_out_lose], "OUT");
                }
                else {
                    MapState.currentInstance.mapHUD.showTrainerDialogue(MagikMons.GameVars.trainersTexts["trainer_16_out_lose_win"], "OUT");
                }
                this.game.time.events.add(500, function () {
                    MagikMons.Hero.canMove = true;
                }, this);
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                MagikMons.Hero.canMove = false;
                this.game.time.events.add(500, function () {
                    MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["WAND_1"], "WAND_1", true);
                    MagikMons.Hero.canMove = true;
                }, this);
            }
            else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_HEAL) {
                MagikMons.Hero.canMove = false;
                this.game.time.events.add(500, function () {
                    MapState.currentInstance.mapContainer.hero.startTalkingWand();
                    MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["HEAL_1"], "HEAL_1", true);
                    this.game.time.events.add(500, function () {
                        MagikMons.Hero.canMove = true;
                    }, this);
                }, this);
            }
            else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CRAFT) {
                MapState.currentInstance.startCraftTutorial();
                MapState.currentInstance.mapContainer.hero.startTalkingWand();
            }
            else if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                MagikMons.Hero.canMove = false;
                this.game.time.events.add(500, function () {
                    MapState.currentInstance.mapContainer.hero.startTalkingWand();
                    MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["SWAP_0"], "SWAP_0", true);
                    this.game.time.events.add(500, function () {
                        MagikMons.Hero.canMove = true;
                    }, this);
                }, this);
            }
            if (MagikMons.GameVars.needWalk || MagikMons.GameVars.slotData.state === MagikMons.GameConstants.INITIAL_BUS) {
                this.chapterLayer.show();
                MagikMons.GameVars.needWalk = null;
            }
            MagikMons.MapManager.checkTutorialMaxMkm();
        };
        MapState.prototype.update = function () {
            MagikMons.MapManager.checkNeedChangeMkm();
        };
        MapState.prototype.render = function () {
            if (MagikMons.GameConstants.FPS) {
                this.game.debug.text(this.game.time.fps.toString(), MagikMons.GameConstants.GAME_WIDTH - 30, 30, "#ffffff", "20px Arial");
            }
        };
        MapState.prototype.shutdown = function () {
            MapState.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        MapState.prototype.startCraftTutorial = function () {
            this.mapGUI.removeTween();
            MagikMons.Hero.canMove = false;
            this.game.time.events.add(500, function () {
                MapState.currentInstance.mapHUD.showTutorialDialogue(MagikMons.GameVars.tutorialTexts["CRAFT_1"], "CRAFT_1");
                this.game.time.events.add(500, function () {
                    MagikMons.Hero.canMove = true;
                }, this);
            }, this);
        };
        MapState.prototype.showMapLayer = function () {
            this.mapLayer.visible = true;
        };
        MapState.prototype.removeMapLayer = function () {
            this.mapLayer.visible = false;
        };
        MapState.prototype.showTeamLayer = function () {
            this.teamLayer.show();
        };
        MapState.prototype.resetTeamLayer = function () {
            this.stage.removeChild(this.teamLayer);
            this.stage.removeChild(this.mkmLayer);
            this.stage.removeChild(this.itemsLayer);
            this.teamLayer = new MagikMons.TeamLayer(this.game);
            this.add.existing(this.teamLayer);
            this.mkmLayer = new MagikMons.MkmLayer(this.game);
            this.add.existing(this.mkmLayer);
            this.itemsLayer = new MagikMons.ItemsLayer(this.game);
            this.add.existing(this.itemsLayer);
        };
        MapState.prototype.removeTeamLayer = function () {
            this.teamLayer.visible = false;
        };
        MapState.prototype.showMkmLayer = function (monsterData) {
            this.mkmLayer.show(monsterData);
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                this.teamLayer.removeFinger();
            }
        };
        MapState.prototype.removeMkmLayer = function () {
            this.mkmLayer.visible = false;
        };
        MapState.prototype.showItemLayer = function () {
            this.itemsLayer.show();
        };
        MapState.prototype.removeItemLayer = function () {
            this.itemsLayer.visible = false;
            this.mapGUI.removeTween();
        };
        return MapState;
    }(Phaser.State));
    MagikMons.MapState = MapState;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Trainer = (function (_super) {
        __extends(Trainer, _super);
        function Trainer(game, data, splash) {
            var _this = _super.call(this, game, null, "trainer") || this;
            _this.tiledX = Math.round((data.x - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            _this.tiledY = Math.round((data.y - MagikMons.GameConstants.TILES_SIZE_HALF) / MagikMons.GameConstants.TILES_SIZE);
            _this.x = MagikMons.GameConstants.TILES_SIZE * _this.tiledX + MagikMons.GameConstants.TILES_SIZE_HALF;
            _this.y = MagikMons.GameConstants.TILES_SIZE * _this.tiledY + MagikMons.GameConstants.TILES_SIZE_HALF;
            _this.data = data;
            _this.barrier = new Phaser.Sprite(_this.game, 0, -MagikMons.GameConstants.TILES_SIZE, "texture_atlas_2", "barrier_0001.png");
            _this.barrier.anchor.set(.5, .9);
            _this.add(_this.barrier);
            if (!splash) {
                _this.barrier.animations.add("anim", Phaser.Animation.generateFrameNames("barrier_", 1, 20, ".png", 4));
                _this.barrier.play("anim", 12, true);
            }
            _this.sprite = new Phaser.Sprite(_this.game, 0, 0, "texture_atlas_1", "adversary_" + data.id + ".png");
            _this.sprite.anchor.set(.5, 1);
            _this.add(_this.sprite);
            if (!splash) {
                _this.game.add.tween(_this.sprite.scale)
                    .to({ y: [.9, 1], x: [1.1, 1] }, 1000, Phaser.Easing.Cubic.In, true, 0, -1);
            }
            if (_this.data.id === "016") {
                _this.barrier.visible = false;
                if (_this.data.first_time) {
                    _this.sprite.frameName = "adversary_009.png";
                }
            }
            return _this;
        }
        Trainer.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        Trainer.prototype.removeTrainer = function () {
            this.tiledX = -1;
            this.tiledY = -1;
            this.game.add.tween(this.barrier.scale)
                .to({ y: 0 }, 500, Phaser.Easing.Linear.None, true, 500);
            this.game.add.tween(this.barrier)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 500);
            this.game.add.tween(this.sprite)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 1500)
                .onStart.add(function () {
                var smoke = new Phaser.Sprite(this.game, 0, -30, "texture_atlas_3", "smoke_generic_01.png");
                smoke.anchor.set(.5);
                smoke.scale.set(.3);
                this.add(smoke);
                smoke.animations.add("smoke", Phaser.Animation.generateFrameNames("smoke_generic_", 1, 21, ".png", 2));
                smoke.play("smoke", 20, false, true);
                MagikMons.AudioManager.playSound("smoke_generic");
            }, this);
        };
        Trainer.prototype.changeLastTrainer = function () {
            var smoke = new Phaser.Sprite(this.game, 0, -30, "texture_atlas_3", "smoke_generic_01.png");
            smoke.anchor.set(.5);
            smoke.scale.set(.3);
            this.add(smoke);
            smoke.animations.add("smoke", Phaser.Animation.generateFrameNames("smoke_generic_", 1, 21, ".png", 2));
            smoke.play("smoke", 20, false, true);
            MagikMons.AudioManager.playSound("smoke_generic");
            this.game.time.events.add(100, function () {
                this.sprite.frameName = "adversary_016.png";
            }, this);
        };
        return Trainer;
    }(Phaser.Group));
    MagikMons.Trainer = Trainer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapGUI = (function (_super) {
        __extends(MapGUI, _super);
        function MapGUI(game) {
            var _this = _super.call(this, game, null, "hud") || this;
            _this.fixedToCamera = true;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, 95 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.topLayer.alpha = .8;
            _this.topLayer.tint = 0x0c2032;
            _this.add(_this.topLayer);
            _this.menuButton = new Phaser.Button(_this.game, 0, 0, "texture_atlas_1", _this.onClickMenu, _this);
            _this.menuButton.setFrames("btn_menu.png", "btn_menu.png", "btn_menu.png");
            _this.menuButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.menuButton.events.onInputOut.add(_this.onOut, _this);
            _this.menuButton.events.onInputOver.add(_this.onOver, _this);
            _this.menuButton.forceOut = true;
            _this.add(_this.menuButton);
            if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_FINISHED) {
                _this.tutorialAnim = new Phaser.Image(_this.game, 270, 40, "texture_atlas_1", "resalte_btn_tutorial.png");
                _this.tutorialAnim.anchor.set(.5);
                _this.tutorialAnim.scale.set(1.1);
                _this.tutorialAnim.visible = false;
                _this.add(_this.tutorialAnim);
            }
            _this.mapButton = new Phaser.Button(_this.game, 270, 40, "texture_atlas_1", _this.onClickPause, _this);
            _this.mapButton.setFrames("btn_map.png", "btn_map.png", "btn_map.png");
            _this.mapButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.mapButton.events.onInputOut.add(_this.onOut, _this);
            _this.mapButton.events.onInputOver.add(_this.onOver, _this);
            _this.mapButton.anchor.set(.5);
            _this.mapButton.forceOut = true;
            _this.add(_this.mapButton);
            _this.itemsButton = new Phaser.Button(_this.game, 190, 40, "texture_atlas_1", _this.onClickItems, _this);
            _this.itemsButton.setFrames("btn_crafting.png", "btn_crafting.png", "btn_crafting.png");
            _this.itemsButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.itemsButton.events.onInputOut.add(_this.onOut, _this);
            _this.itemsButton.events.onInputOver.add(_this.onOver, _this);
            _this.itemsButton.anchor.set(.5);
            _this.itemsButton.forceOut = true;
            _this.add(_this.itemsButton);
            _this.teamButton = new Phaser.Button(_this.game, 110, 40, "texture_atlas_1", _this.onClickTeam, _this);
            _this.teamButton.setFrames("btn_wand.png", "btn_wand.png", "btn_wand.png");
            _this.teamButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.teamButton.events.onInputOut.add(_this.onOut, _this);
            _this.teamButton.events.onInputOver.add(_this.onOver, _this);
            _this.teamButton.anchor.set(.5);
            _this.teamButton.forceOut = true;
            _this.add(_this.teamButton);
            _this.attention = new Phaser.Image(_this.game, 137, 72, "texture_atlas_1", "icon_attention.png");
            _this.attention.scale.set(.85);
            _this.attention.anchor.set(.5);
            _this.add(_this.attention);
            _this.wispTab = new Phaser.Image(_this.game, 330, 22, "texture_atlas_1", "tab_wisps.png");
            _this.add(_this.wispTab);
            _this.wispText = new Phaser.Text(_this.game, 427, 54, MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp), { font: "24px Chewy", fontWeight: "400", fill: "#59ffff" });
            _this.wispText.anchor.set(1, .5);
            _this.add(_this.wispText);
            if (MagikMons.GameConstants.DEVELOPMENT) {
                var attacksButton = new Phaser.Button(_this.game, 390, 47, "texture_atlas_1", _this.onClickAttacks, _this);
                attacksButton.setFrames("btn_attacks_state.png", "btn_attacks_state.png", "btn_attacks_state.png");
                attacksButton.anchor.set(.5);
                attacksButton.forceOut = true;
                _this.add(attacksButton);
            }
            _this.teamButton.visible = false;
            _this.itemsButton.visible = false;
            _this.mapButton.visible = false;
            _this.attention.visible = false;
            _this.wispTab.visible = false;
            _this.wispText.visible = false;
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_WAND) {
                _this.teamButton.visible = true;
            }
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_HEAL) {
                _this.attention.visible = true;
            }
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_CRAFT) {
                _this.itemsButton.visible = true;
                _this.wispTab.visible = true;
                _this.wispText.visible = true;
            }
            if (MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_MAP) {
                _this.mapButton.visible = true;
            }
            var t1 = _this.game.add.tween(_this.attention.scale)
                .to({ x: .95, y: .95 }, 250, Phaser.Easing.Quintic.In);
            var t2 = _this.game.add.tween(_this.attention.scale)
                .to({ x: .85, y: .85 }, 250, Phaser.Easing.Quintic.In);
            t1.chain(t2);
            t2.chain(t1);
            t1.start();
            _this.alpha = 0;
            _this.game.add.tween(_this)
                .to({ alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 500);
            if (MagikMons.GameVars.slotData.wisp >= 100 && MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_CRAFT) {
                _this.game.time.events.loop(3000, function () {
                    this.game.add.tween(this.itemsButton.scale)
                        .to({ x: [1.05, 1, 1.05, 1], y: [1.05, 1, 1.05, 1] }, 1000, Phaser.Easing.Cubic.Out, true);
                }, _this);
            }
            return _this;
        }
        MapGUI.prototype.showSelectionType = function () {
            this.containerClassic = new Phaser.Group(this.game);
            this.containerClassic.x = 85;
            this.containerClassic.y = 250;
            this.add(this.containerClassic);
            var typeClassic = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "office_classic.png");
            typeClassic.anchor.set(.5);
            typeClassic.name = MagikMons.GameConstants.ELEMENT_CLASSIC;
            typeClassic.events.onInputDown.add(this.typeSelected, this);
            typeClassic.events.onInputOver.add(this.typeOver, this);
            typeClassic.events.onInputOut.add(this.typeOut, this);
            typeClassic.scale.set(.65);
            this.containerClassic.add(typeClassic);
            var textClassic = new Phaser.Text(this.game, 0, 75, MagikMons.GameVars.names["TEACHER"], { font: "28px Chewy", fontWeight: "400", fill: "#ff9c50" });
            textClassic.stroke = "#40241D";
            textClassic.strokeThickness = 6;
            textClassic.anchor.set(.5);
            this.containerClassic.add(textClassic);
            this.containerTech = new Phaser.Group(this.game);
            this.containerTech.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            this.containerTech.y = 250;
            this.add(this.containerTech);
            var typeTech = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "office_tech.png");
            typeTech.anchor.set(.5);
            typeTech.name = MagikMons.GameConstants.ELEMENT_TECH;
            typeTech.events.onInputDown.add(this.typeSelected, this);
            typeTech.events.onInputOver.add(this.typeOver, this);
            typeTech.events.onInputOut.add(this.typeOut, this);
            typeTech.scale.set(.65);
            this.containerTech.add(typeTech);
            var textTech = new Phaser.Text(this.game, 0, 75, MagikMons.GameVars.names["SCIENTIST"], { font: "28px Chewy", fontWeight: "400", fill: "#00dfa9" });
            textTech.stroke = "#102932";
            textTech.strokeThickness = 6;
            textTech.anchor.set(.5);
            this.containerTech.add(textTech);
            this.containerSpectre = new Phaser.Group(this.game);
            this.containerSpectre.x = MagikMons.GameConstants.GAME_WIDTH - 85;
            this.containerSpectre.y = 250;
            this.add(this.containerSpectre);
            var typeSpectre = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "office_spectre.png");
            typeSpectre.anchor.set(.5);
            typeSpectre.name = MagikMons.GameConstants.ELEMENT_SPECTRE;
            typeSpectre.events.onInputDown.add(this.typeSelected, this);
            typeSpectre.events.onInputOver.add(this.typeOver, this);
            typeSpectre.events.onInputOut.add(this.typeOut, this);
            typeSpectre.scale.set(.65);
            this.containerSpectre.add(typeSpectre);
            var textSpectre = new Phaser.Text(this.game, 0, 75, MagikMons.GameVars.names["FIREMAN"], { font: "28px Chewy", fontWeight: "400", fill: "#b9a8ff" });
            textSpectre.stroke = "#300949";
            textSpectre.strokeThickness = 6;
            textSpectre.anchor.set(.5);
            this.containerSpectre.add(textSpectre);
            this.containerClassic.alpha = 0;
            this.containerTech.alpha = 0;
            this.containerSpectre.alpha = 0;
            this.containerClassic.scale.set(0);
            this.containerTech.scale.set(0);
            this.containerSpectre.scale.set(0);
            this.game.add.tween(this.containerClassic)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 500);
            this.game.add.tween(this.containerTech)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 1000);
            this.game.add.tween(this.containerSpectre)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 1500);
            this.game.add.tween(this.containerClassic.scale)
                .to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 500);
            this.game.add.tween(this.containerTech.scale)
                .to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 750);
            this.game.add.tween(this.containerSpectre.scale)
                .to({ x: 1, y: 1 }, 500, Phaser.Easing.Elastic.Out, true, 1000)
                .onComplete.add(function () {
                typeClassic.inputEnabled = true;
                typeTech.inputEnabled = true;
                typeSpectre.inputEnabled = true;
            }, this);
        };
        MapGUI.prototype.typeOver = function (img) {
            img.scale.set(.7);
        };
        MapGUI.prototype.typeOut = function (img) {
            img.scale.set(.65);
        };
        MapGUI.prototype.typeSelected = function (img) {
            this.game.add.tween(this.containerClassic.scale)
                .to({ x: 0, y: 0 }, 250, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.containerTech.scale)
                .to({ x: 0, y: 0 }, 250, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.containerSpectre.scale)
                .to({ x: 0, y: 0 }, 250, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function () {
                this.containerClassic.visible = false;
                this.containerTech.visible = false;
                this.containerSpectre.visible = false;
            }, this);
            MagikMons.MapManager.typeSelected(img.name);
        };
        MapGUI.prototype.showSelectedMonster = function () {
            this.backgroundMonster = new Phaser.Image(this.game, 0, 0, this.game.cache.getBitmapData(MagikMons.GameConstants.BLACK_SQUARE));
            this.backgroundMonster.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAPDATA_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAPDATA_SIZE);
            this.backgroundMonster.alpha = .01;
            this.backgroundMonster.inputEnabled = true;
            this.backgroundMonster.events.onInputDown.add(this.monsterClicked, this);
            this.add(this.backgroundMonster);
            this.circle = new Phaser.Image(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 250, "texture_atlas_2", "current_mkm_" + MagikMons.GameVars.slotData.monsters[0].class + ".png");
            this.circle.anchor.set(.5);
            this.circle.alpha = 0;
            this.add(this.circle);
            this.monsterTutorial = new Phaser.Image(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 250, "texture_atlas_4", "mkm_" + MagikMons.GameVars.slotData.monsters[0].id + "_front.png");
            this.monsterTutorial.anchor.set(.5);
            this.monsterTutorial.alpha = 0;
            this.add(this.monsterTutorial);
            this.game.add.tween(this.circle)
                .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            this.circle.scale.set(0);
            this.monsterTutorial.scale.set(0);
            this.game.add.tween(this.circle)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.monsterTutorial)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.circle.scale)
                .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.monsterTutorial.scale)
                .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        };
        MapGUI.prototype.monsterClicked = function () {
            this.game.add.tween(this.circle)
                .to({ x: 110, y: 50 }, 500, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.circle)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true);
            this.game.add.tween(this.circle.scale)
                .to({ x: .1, y: .1 }, 500, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.monsterTutorial)
                .to({ x: 110, y: 50 }, 500, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.monsterTutorial)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true);
            this.game.add.tween(this.monsterTutorial.scale)
                .to({ x: .1, y: .1 }, 500, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function () {
                this.monsterTutorial.visible = false;
                this.circle.visible = false;
                this.backgroundMonster.visible = false;
                MagikMons.MapManager.monsterSelected();
            }, this);
        };
        MapGUI.prototype.showSwap1 = function () {
            this.swapContainer = new Phaser.Group(this.game);
            this.swapContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            this.swapContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            this.swapContainer.scale.set(0);
            this.add(this.swapContainer);
            this.swapLight = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "fx_radial_rays.png");
            this.swapLight.anchor.set(.5);
            this.swapLight.scale.set(0);
            this.swapContainer.add(this.swapLight);
            this.swapCirle1 = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "current_mkm_classic.png");
            this.swapCirle1.anchor.set(.5);
            this.swapContainer.add(this.swapCirle1);
            this.swapCirle2 = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "current_mkm_spectre.png");
            this.swapCirle2.anchor.set(.5);
            this.swapCirle2.alpha = 0;
            this.swapContainer.add(this.swapCirle2);
            this.swapCirle3 = new Phaser.Image(this.game, 0, 0, "texture_atlas_2", "current_mkm_tech.png");
            this.swapCirle3.anchor.set(.5);
            this.swapCirle3.alpha = 0;
            this.swapContainer.add(this.swapCirle3);
            this.swapPart1 = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "icon_class_classic.png");
            this.swapPart1.anchor.set(.5);
            this.swapContainer.add(this.swapPart1);
            this.swapPart2 = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "icon_class_spectre.png");
            this.swapPart2.anchor.set(.5);
            this.swapPart2.alpha = .75;
            this.swapContainer.add(this.swapPart2);
            this.swapPart3 = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "icon_class_tech.png");
            this.swapPart3.anchor.set(.5);
            this.swapPart3.alpha = .75;
            this.swapContainer.add(this.swapPart3);
            this.swapMkm1 = new Phaser.Image(this.game, 0, -140, "texture_atlas_4", "mkm_" + MagikMons.GameConstants.START_MKM_CLASSIC + "_front.png");
            this.swapMkm1.scale.set(.5);
            this.swapMkm1.anchor.set(.5);
            this.swapMkm1.alpha = 0;
            this.swapContainer.add(this.swapMkm1);
            this.swapMkm2 = new Phaser.Image(this.game, 120, 20, "texture_atlas_4", "mkm_" + MagikMons.GameConstants.START_MKM_SPECTRE + "_front.png");
            this.swapMkm2.scale.set(.5);
            this.swapMkm2.anchor.set(.5);
            this.swapMkm2.alpha = 0;
            this.swapContainer.add(this.swapMkm2);
            this.swapCapsule = new Phaser.Image(this.game, -230, -210, "texture_atlas_1", "monster-capsule-classic.png");
            this.swapCapsule.alpha = 0;
            this.swapCapsule.scale.set(.8);
            this.swapContainer.add(this.swapCapsule);
            this.swapName = new Phaser.Text(this.game, -160, -180, MagikMons.GameVars.names["CLASSIC"].replace("Á", "A"), { font: "18px Goonies", fill: "#FFFFFF", align: "center" });
            this.swapName.alpha = 0;
            this.swapName.anchor.set(.5);
            this.swapName.font = "Pythia";
            this.swapName.fill = "#5b473c";
            this.swapContainer.add(this.swapName);
            this.game.add.tween(this.swapContainer.scale)
                .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapMkm1)
                .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            this.game.add.tween(this.swapMkm2)
                .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            this.game.add.tween(this.swapCapsule)
                .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            this.game.add.tween(this.swapName)
                .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            this.game.add.tween(this.swapCirle1)
                .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            this.game.add.tween(this.swapCirle2)
                .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            this.game.add.tween(this.swapCirle3)
                .to({ angle: 360 }, 10000, Phaser.Easing.Linear.None, true, 0, -1);
            this.swapLight.tint = 0xff9c50;
            this.game.add.tween(this.swapLight.scale)
                .to({ x: 1.5, y: 1.5 }, 500, Phaser.Easing.Cubic.Out, true, 250)
                .onComplete.add(function () {
                this.game.add.tween(this.swapLight.scale)
                    .to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.In, true, 100);
                this.game.add.tween(this.swapLight)
                    .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.In, true);
            }, this);
        };
        MapGUI.prototype.showSwap2 = function () {
            this.swapLight.tint = 0x00dfa9;
            this.swapLight.alpha = 1;
            this.game.add.tween(this.swapLight.scale)
                .to({ x: 1.5, y: 1.5 }, 500, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.game.add.tween(this.swapLight.scale)
                    .to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.In, true, 100);
                this.game.add.tween(this.swapLight)
                    .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.In, true);
            }, this);
            this.game.add.tween(this.swapCirle1)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapCapsule)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapName)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapCirle3)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart1)
                .to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart2)
                .to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart3)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart1)
                .to({ angle: 120 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapPart2)
                .to({ angle: 120 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapPart3)
                .to({ angle: 120 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapMkm1)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.swapMkm1.frameName = "mkm_" + MagikMons.GameConstants.START_MKM_TECH + "_front.png";
                this.game.add.tween(this.swapMkm1)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.swapCapsule)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.swapName)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.swapCapsule.frameName = "monster-capsule-tech.png";
                this.swapName.text = MagikMons.GameVars.names["TECH"];
                this.swapName.font = "Adineue";
                this.swapName.fill = "#ffffff";
            }, this);
            this.game.add.tween(this.swapMkm2)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.swapMkm2.frameName = "mkm_" + MagikMons.GameConstants.START_MKM_CLASSIC + "_front.png";
                this.game.add.tween(this.swapMkm2)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            }, this);
        };
        MapGUI.prototype.showSwap3 = function () {
            this.swapLight.tint = 0xb9a8ff;
            this.swapLight.alpha = 1;
            this.game.add.tween(this.swapLight.scale)
                .to({ x: 1.5, y: 1.5 }, 500, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.game.add.tween(this.swapLight.scale)
                    .to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.In, true, 100);
                this.game.add.tween(this.swapLight)
                    .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.In, true);
            }, this);
            this.game.add.tween(this.swapCapsule)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapName)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapCirle3)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapCirle2)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart1)
                .to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart2)
                .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart3)
                .to({ alpha: .75 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapPart1)
                .to({ angle: 240 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapPart2)
                .to({ angle: 240 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapPart3)
                .to({ angle: 240 }, 2000, Phaser.Easing.Elastic.Out, true);
            this.game.add.tween(this.swapMkm1)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.swapMkm1.frameName = "mkm_" + MagikMons.GameConstants.START_MKM_SPECTRE + "_front.png";
                this.game.add.tween(this.swapMkm1)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.swapCapsule)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.swapName)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                this.swapCapsule.frameName = "monster-capsule-spectre.png";
                this.swapName.text = MagikMons.GameVars.names["SPECTRE"];
                this.swapName.font = "Goonies";
                this.swapName.fill = "#2a3147";
            }, this);
            this.game.add.tween(this.swapMkm2)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.swapMkm2.frameName = "mkm_" + MagikMons.GameConstants.START_MKM_TECH + "_front.png";
                this.game.add.tween(this.swapMkm2)
                    .to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            }, this);
        };
        MapGUI.prototype.removeSwap = function () {
            this.game.add.tween(this.swapMkm1)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapMkm2)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapCapsule)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapName)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.swapContainer.scale)
                .to({ x: 0, y: 0 }, 1000, Phaser.Easing.Elastic.In, true)
                .onComplete.add(function () {
                this.swapContainer.visible = false;
            }, this);
        };
        MapGUI.prototype.needChangeMkm = function (needAttention) {
            this.mapButton.alpha = 1;
            this.mapButton.inputEnabled = true;
            this.itemsButton.alpha = 1;
            this.itemsButton.inputEnabled = true;
            this.game.tweens.remove(this.tweenTeam);
            if (needAttention && MagikMons.GameVars.slotData.state > MagikMons.GameConstants.TUTORIAL_HEAL) {
                this.attention.visible = true;
            }
            else {
                this.attention.visible = false;
            }
        };
        MapGUI.prototype.showWand = function () {
            this.teamButton.visible = true;
            this.teamButton.alpha = 0;
            this.game.add.tween(this.teamButton)
                .to({ alpha: .5 }, 250, Phaser.Easing.Linear.None, true);
            this.teamButton.inputEnabled = false;
        };
        MapGUI.prototype.activeWand = function () {
            this.game.add.tween(this.teamButton)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.tutorialTween = this.game.add.tween(this.teamButton.scale)
                .to({ x: [1.1, 1], y: [1.1, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            this.tutorialAnim.x = this.teamButton.x;
            this.tutorialAnim.y = this.teamButton.y + 10;
            this.tutorialAnim.visible = true;
            this.tutorialTween2 = this.game.add.tween(this.tutorialAnim.scale)
                .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            this.teamButton.inputEnabled = true;
        };
        MapGUI.prototype.activeItems = function () {
            this.itemsButton.visible = true;
            this.wispTab.visible = true;
            this.wispText.visible = true;
            this.itemsButton.alpha = 0;
            this.wispTab.alpha = 0;
            this.wispText.alpha = 0;
            this.game.add.tween(this.itemsButton)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.wispTab)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this.wispText)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
            this.tutorialTween = this.game.add.tween(this.itemsButton.scale)
                .to({ x: [1.1, 1], y: [1.1, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            this.tutorialAnim.x = this.itemsButton.x;
            this.tutorialAnim.y = this.itemsButton.y + 10;
            this.tutorialAnim.visible = true;
            if (!this.tutorialTween2) {
                this.tutorialTween2 = this.game.add.tween(this.tutorialAnim.scale)
                    .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
            else {
                this.tutorialTween2.stop();
                this.tutorialAnim.scale.set(1.1);
                this.tutorialTween2 = this.game.add.tween(this.tutorialAnim.scale)
                    .to({ x: [1, 1.1], y: [1, 1.1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
        };
        MapGUI.prototype.activeMap = function () {
            this.mapButton.visible = true;
            this.mapButton.alpha = 0;
            this.game.add.tween(this.mapButton)
                .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
        };
        MapGUI.prototype.removeTween = function () {
            this.wispText.text = MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp);
            if (this.tutorialTween) {
                this.tutorialTween.stop();
            }
            this.tutorialAnim.visible = false;
            this.teamButton.scale.set(1);
            this.itemsButton.scale.set(1);
        };
        MapGUI.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        MapGUI.prototype.onClickMenu = function () {
            this.menuButton.scale.set(1);
            MagikMons.GameManager.backHome();
        };
        MapGUI.prototype.onClickPause = function () {
            this.mapButton.scale.set(1);
            MagikMons.MapManager.showMapLayer();
        };
        MapGUI.prototype.onClickTeam = function () {
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                this.removeTween();
            }
            this.teamButton.scale.set(1);
            MagikMons.MapManager.showTeamLayer();
        };
        MapGUI.prototype.onClickItems = function () {
            this.itemsButton.scale.set(1);
            MagikMons.MapManager.showItemsLayer();
        };
        MapGUI.prototype.onClickAttacks = function () {
            MagikMons.GameManager.goAttacksState();
        };
        MapGUI.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        MapGUI.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return MapGUI;
    }(Phaser.Group));
    MagikMons.MapGUI = MapGUI;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var DialogueHUD = (function (_super) {
        __extends(DialogueHUD, _super);
        function DialogueHUD(game, x, y) {
            var _this = _super.call(this, game, null, "dialogue") || this;
            _this.wait = false;
            _this.x = x;
            _this.y = y;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.visible = false;
            _this.idTutorial = 0;
            _this.idTrainer = 0;
            _this.image = new Phaser.Image(_this.game, 0, -90, "texture_atlas_1", "hero_avatar.png");
            _this.image.anchor.set(0, 1);
            _this.add(_this.image);
            _this.characterName = new Phaser.Text(_this.game, 100, -90, "", { font: "20px Chewy", fill: "#72ffff", align: "center" });
            _this.characterName.anchor.set(0, 1);
            _this.characterName.stroke = "#1A2536";
            _this.characterName.strokeThickness = 6;
            _this.add(_this.characterName);
            var box = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            box.tint = 0x1A2536;
            box.anchor.set(0, 1);
            box.alpha = .9;
            box.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAP_SIZE, 90 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(box);
            _this.text = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 + 5, -45, "", { font: "19px DosisBold", fill: "#dbefef", fontWeight: 400, align: "center" });
            _this.text.wordWrap = true;
            _this.text.wordWrapWidth = 440;
            _this.text.lineSpacing = -5;
            _this.text.anchor.set(.5);
            _this.add(_this.text);
            return _this;
        }
        DialogueHUD.prototype.showTutorialDialogue = function (dialogue, value, start) {
            this.wait = false;
            this.game.time.events.add(500, function () {
                this.wait = true;
            }, this);
            MagikMons.AudioManager.playSound("music_dialogue", true, 1, true);
            MagikMons.AudioManager.playSound("fx_speak");
            this.tutorialDialogue = dialogue;
            this.dialogue = null;
            this.trainersDialogue = null;
            this.visible = true;
            if (start) {
                this.y = MagikMons.GameConstants.GAME_HEIGHT + 200;
                this.game.add.tween(this)
                    .to({ y: MagikMons.GameConstants.GAME_HEIGHT }, 500, Phaser.Easing.Cubic.Out, true);
            }
            this.idTutorial = 0;
            this.value = value;
            this.selectTutorialImage();
            this.text.text = this.tutorialDialogue[this.idTutorial].text;
            this.idTutorial++;
            if (MagikMons.GameVars.slotData.monsters[0]) {
                this.text.text = this.text.text.replace("*type*", MagikMons.GameVars.slotData.monsters[0].class);
                this.text.text = this.text.text.replace("*name*", MagikMons.GameVars.slotData.monsters[0].name);
            }
        };
        DialogueHUD.prototype.showTrainerDialogue = function (dialogue, value) {
            this.wait = false;
            this.game.time.events.add(500, function () {
                this.wait = true;
            }, this);
            MagikMons.AudioManager.playSound("music_dialogue", true, 1, true);
            MagikMons.AudioManager.playSound("fx_speak");
            this.trainersDialogue = dialogue;
            this.dialogue = null;
            this.tutorialDialogue = null;
            this.visible = true;
            if (value === "OUT") {
                this.y = MagikMons.GameConstants.GAME_HEIGHT + 200;
                this.game.add.tween(this)
                    .to({ y: MagikMons.GameConstants.GAME_HEIGHT }, 500, Phaser.Easing.Cubic.Out, true, 500);
            }
            this.idTrainer = 0;
            this.value = value;
            this.selectTrainerImage();
            this.text.text = this.trainersDialogue[this.idTrainer].text;
            this.idTrainer++;
        };
        DialogueHUD.prototype.showDialogue = function (dialogue) {
            this.wait = false;
            this.game.time.events.add(500, function () {
                this.wait = true;
            }, this);
            MagikMons.AudioManager.playSound("fx_speak");
            this.image.frameName = "hero_avatar.png";
            this.image.x = 0;
            this.characterName.text = MagikMons.GameVars.names["ANDER"];
            this.characterName.anchor.set(0, 1);
            this.characterName.x = 100;
            this.dialogue = dialogue;
            this.tutorialDialogue = null;
            this.trainersDialogue = null;
            this.visible = true;
            var id;
            if (dialogue.random) {
                id = Math.round(Math.random() * dialogue.ids.length);
            }
            else {
                id = dialogue.ids[dialogue.idIndex];
                dialogue.idIndex++;
            }
            this.text.text = MagikMons.GameVars.dialoguesText[MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].tilemapName][id];
            this.y = MagikMons.GameConstants.GAME_HEIGHT + 200;
            this.game.add.tween(this)
                .to({ y: MagikMons.GameConstants.GAME_HEIGHT }, 500, Phaser.Easing.Cubic.Out, true);
        };
        DialogueHUD.prototype.nextDialogue = function () {
            if (!this.wait) {
                return;
            }
            this.wait = false;
            this.game.time.events.add(500, function () {
                this.wait = true;
            }, this);
            if (this.dialogue) {
                if (this.dialogue.idIndex >= this.dialogue.ids.length || this.dialogue.random) {
                    this.dialogue.idIndex = 0;
                    this.dialogue = null;
                    MagikMons.MapManager.closeDialogue();
                }
                else {
                    var id = this.dialogue.ids[this.dialogue.idIndex];
                    this.dialogue.idIndex++;
                    this.text.text = MagikMons.GameVars.dialoguesText[MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].tilemapName][id];
                }
            }
            else if (this.tutorialDialogue) {
                if (this.idTutorial >= this.tutorialDialogue.length) {
                    MagikMons.MapManager.closeDialogueTutorial(this.value);
                }
                else {
                    this.selectTutorialImage();
                    this.text.text = this.tutorialDialogue[this.idTutorial].text;
                    this.idTutorial++;
                }
            }
            else if (this.trainersDialogue) {
                if (this.idTrainer >= this.trainersDialogue.length) {
                    MagikMons.MapManager.closeDialogueTrainer(this.value);
                }
                else {
                    this.selectTrainerImage();
                    if (MagikMons.GameVars.currentTrainer && MagikMons.GameVars.currentTrainer.id === "016" && MagikMons.GameVars.currentTrainer.first_time && this.idTrainer === 2) {
                        MagikMons.MapManager.changeLastTrainer();
                    }
                    this.text.text = this.trainersDialogue[this.idTrainer].text;
                    this.idTrainer++;
                }
            }
            MagikMons.AudioManager.playSound("fx_speak");
        };
        DialogueHUD.prototype.selectTutorialImage = function () {
            if (this.tutorialDialogue[this.idTutorial].id === "Ander") {
                this.image.frameName = "hero_avatar.png";
                this.image.x = 0;
                this.characterName.text = MagikMons.GameVars.names["ANDER"];
                this.characterName.anchor.set(0, 1);
                this.characterName.x = 100;
            }
            else if (this.tutorialDialogue[this.idTutorial].id === "Varita") {
                this.image.frameName = "varita_avatar.png";
                this.image.x = MagikMons.GameConstants.GAME_WIDTH - this.image.width;
                this.characterName.text = MagikMons.GameVars.names["VARITA"];
                this.characterName.anchor.set(1);
                this.characterName.x = MagikMons.GameConstants.GAME_WIDTH - 100;
            }
        };
        DialogueHUD.prototype.selectTrainerImage = function () {
            if (this.trainersDialogue[this.idTrainer].id === "Ander") {
                this.image.frameName = "hero_avatar.png";
                this.image.x = 0;
                this.characterName.text = MagikMons.GameVars.names["ANDER"];
                this.characterName.anchor.set(0, 1);
                this.characterName.x = 100;
            }
            else if (this.trainersDialogue[this.idTrainer].id === "Trainer") {
                if (MagikMons.GameVars.currentTrainer) {
                    this.image.frameName = "adversary_avatar_" + MagikMons.GameVars.currentTrainer.id + ".png";
                    this.characterName.text = " " + MagikMons.GameVars.trainersNames[MagikMons.GameVars.currentTrainer.id].toUpperCase() + " ";
                    if (MagikMons.GameVars.currentTrainer.id === "016" && MagikMons.GameVars.currentTrainer.first_time && this.idTrainer < 2) {
                        this.image.frameName = "adversary_avatar_009.png";
                        this.characterName.text = " " + MagikMons.GameVars.trainersNames["009"].toUpperCase() + " ";
                    }
                }
                else if (MagikMons.GameVars.needRemoveTrainer) {
                    this.image.frameName = "adversary_avatar_" + MagikMons.GameVars.needRemoveTrainer.id + ".png";
                    this.characterName.text = " " + MagikMons.GameVars.trainersNames[MagikMons.GameVars.needRemoveTrainer.id].toUpperCase() + " ";
                }
                else {
                    this.image.frameName = "adversary_avatar_" + MagikMons.GameVars.needDialogueTrainer.id + ".png";
                    this.characterName.text = " " + MagikMons.GameVars.trainersNames[MagikMons.GameVars.needDialogueTrainer.id].toUpperCase() + " ";
                }
                this.image.x = MagikMons.GameConstants.GAME_WIDTH - this.image.width;
                this.characterName.anchor.set(1);
                this.characterName.x = MagikMons.GameConstants.GAME_WIDTH - 100;
            }
        };
        return DialogueHUD;
    }(Phaser.Group));
    MagikMons.DialogueHUD = DialogueHUD;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapHUD = (function (_super) {
        __extends(MapHUD, _super);
        function MapHUD(game) {
            var _this = _super.call(this, game, null, "hud") || this;
            _this.fixedToCamera = true;
            if (MagikMons.GameConstants.FPS) {
                _this.fps = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH - 10, 10, "", { font: "20px Chewy", fontWeight: "400", fill: "#ffffff" });
                _this.fps.anchor.set(1, 0);
                _this.add(_this.fps);
            }
            _this.dialogue = new MagikMons.DialogueHUD(_this.game, 0, MagikMons.GameConstants.GAME_HEIGHT);
            _this.add(_this.dialogue);
            return _this;
        }
        MapHUD.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        MapHUD.prototype.showDialogue = function (object) {
            this.dialogue.showDialogue(object);
        };
        MapHUD.prototype.showTutorialDialogue = function (object, value, start) {
            this.dialogue.showTutorialDialogue(object, value, start);
        };
        MapHUD.prototype.showTrainerDialogue = function (object, value) {
            this.dialogue.showTrainerDialogue(object, value);
        };
        MapHUD.prototype.dialogueOpen = function () {
            return this.dialogue.visible;
        };
        MapHUD.prototype.nextDialogue = function () {
            this.dialogue.nextDialogue();
        };
        MapHUD.prototype.closeDialogue = function () {
            this.dialogue.visible = false;
        };
        return MapHUD;
    }(Phaser.Group));
    MagikMons.MapHUD = MapHUD;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var CraftItem = (function (_super) {
        __extends(CraftItem, _super);
        function CraftItem(game, x, y, i, itemsLayer) {
            var _this = _super.call(this, game, null, "team-layer") || this;
            _this.x = x,
                _this.y = y;
            _this.i = i;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.itemsLayer = itemsLayer;
            _this.createNameNum();
            _this.buttonContainer = new Phaser.Group(_this.game);
            _this.add(_this.buttonContainer);
            _this.image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, "btn_item_" + _this.name + ".png");
            _this.image.anchor.set(.5);
            _this.image.inputEnabled = true;
            _this.image.events.onInputDown.add(_this.onDown, _this);
            _this.image.events.onInputUp.add(_this.craftItem, _this);
            _this.image.events.onInputOut.add(_this.onOut, _this);
            _this.image.events.onInputOver.add(_this.onOver, _this);
            _this.buttonContainer.add(_this.image);
            _this.circle = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "circle_num_items.png");
            _this.circle.anchor.set(.5);
            _this.buttonContainer.add(_this.circle);
            _this.numText = new Phaser.Text(_this.game, 59, -17, MagikMons.Utils.validNumber(_this.num), { font: "22px Chewy", fontWeight: "400", fill: "#00427f" });
            _this.numText.anchor.set(.5);
            _this.buttonContainer.add(_this.numText);
            _this.particles = new Phaser.Image(_this.game, 59, -18, "texture_atlas_1", "particles_fx_01.png");
            _this.particles.visible = false;
            _this.particles.anchor.set(.5);
            _this.buttonContainer.add(_this.particles);
            var anim = _this.particles.animations.add("anim", Phaser.Animation.generateFrameNames("particles_fx_", 1, 14, ".png", 2));
            anim.onComplete.add(function () {
                this.particles.visible = false;
            }, _this);
            var wispImage = new Phaser.Image(_this.game, 25, 58, "texture_atlas_2", "icon_wisp.png");
            wispImage.anchor.set(.5);
            wispImage.scale.set(.5);
            _this.add(wispImage);
            _this.priceText = new Phaser.Text(_this.game, 10, 60, MagikMons.Utils.validNumber(MagikMons.GameConstants.ITEM_PRICES[_this.i]), { font: "18px Chewy", fontWeight: "400", fill: "#59ffff" });
            _this.priceText.anchor.set(1, .5);
            _this.add(_this.priceText);
            var backgroundTex = _this.create(0, 85, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            backgroundTex.anchor.set(.5);
            backgroundTex.tint = 0x00315d;
            backgroundTex.scale.set(235 / MagikMons.GameConstants.BITMAP_SIZE, 30 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(backgroundTex);
            var itemText = new Phaser.Text(_this.game, 0, 88, MagikMons.GameVars.itemsTexts[_this.i], { font: "18px Chewy", fontWeight: "400", fill: "#009eff" });
            itemText.anchor.set(.5);
            _this.add(itemText);
            _this.checkPrice();
            return _this;
        }
        CraftItem.prototype.checkPrice = function () {
            this.buttonContainer.scale.set(1);
            if (MagikMons.GameVars.slotData.wisp < MagikMons.GameConstants.ITEM_PRICES[this.i]) {
                this.disable();
            }
            else {
                this.enable();
            }
        };
        CraftItem.prototype.onDown = function () {
            this.buttonContainer.scale.set(1.1);
        };
        CraftItem.prototype.craftItem = function () {
            this.buttonContainer.scale.set(1);
            MagikMons.GameVars.slotData.wisp -= MagikMons.GameConstants.ITEM_PRICES[this.i];
            this.newItemCrafted();
            this.particles.visible = true;
            this.particles.play("anim", 24, false);
            this.itemsLayer.itemCrafted();
            MagikMons.AudioManager.playSound("fx_buy_item");
            this.updateNum();
        };
        CraftItem.prototype.disable = function () {
            this.image.inputEnabled = false;
            this.image.alpha = .5;
            this.priceText.fill = "#e92c4f";
        };
        CraftItem.prototype.enable = function () {
            this.image.inputEnabled = true;
            this.image.alpha = 1;
            this.priceText.fill = "#59ffff";
        };
        CraftItem.prototype.createNameNum = function () {
            switch (this.i) {
                case 0:
                    this.name = "capture";
                    this.num = MagikMons.GameVars.slotData.items.ball;
                    break;
                case 1:
                    this.name = "heal";
                    this.num = MagikMons.GameVars.slotData.items.healing;
                    break;
                case 2:
                    this.name = "antidote";
                    this.num = MagikMons.GameVars.slotData.items.antidote;
                    break;
                case 3:
                    this.name = "focus";
                    this.num = MagikMons.GameVars.slotData.items.hypnoCure;
                    break;
                case 4:
                    this.name = "attack";
                    this.num = MagikMons.GameVars.slotData.items.attackIncrease;
                    break;
                case 5:
                    this.name = "defense";
                    this.num = MagikMons.GameVars.slotData.items.defenseIncrease;
                    break;
                case 6:
                    this.name = "aim";
                    this.num = MagikMons.GameVars.slotData.items.aimingIncrease;
                    break;
                default:
                    break;
            }
        };
        CraftItem.prototype.updateNum = function () {
            this.numText.text = MagikMons.Utils.validNumber(this.num);
        };
        CraftItem.prototype.newItemCrafted = function () {
            switch (this.i) {
                case 0:
                    MagikMons.GameVars.slotData.items.ball++;
                    this.num = MagikMons.GameVars.slotData.items.ball;
                    break;
                case 1:
                    MagikMons.GameVars.slotData.items.healing++;
                    this.num = MagikMons.GameVars.slotData.items.healing;
                    break;
                case 2:
                    MagikMons.GameVars.slotData.items.antidote++;
                    this.num = MagikMons.GameVars.slotData.items.antidote;
                    break;
                case 3:
                    MagikMons.GameVars.slotData.items.hypnoCure++;
                    this.num = MagikMons.GameVars.slotData.items.hypnoCure;
                    break;
                case 4:
                    MagikMons.GameVars.slotData.items.attackIncrease++;
                    this.num = MagikMons.GameVars.slotData.items.attackIncrease;
                    break;
                case 5:
                    MagikMons.GameVars.slotData.items.defenseIncrease++;
                    this.num = MagikMons.GameVars.slotData.items.defenseIncrease;
                    break;
                case 6:
                    MagikMons.GameVars.slotData.items.aimingIncrease++;
                    this.num = MagikMons.GameVars.slotData.items.aimingIncrease;
                    break;
                default:
                    break;
            }
        };
        CraftItem.prototype.onOut = function (btn) {
            this.buttonContainer.scale.set(1);
        };
        CraftItem.prototype.onOver = function (btn) {
            this.buttonContainer.scale.set(1.05);
        };
        return CraftItem;
    }(Phaser.Group));
    MagikMons.CraftItem = CraftItem;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var ItemsLayer = (function (_super) {
        __extends(ItemsLayer, _super);
        function ItemsLayer(game) {
            var _this = _super.call(this, game, null, "team-layer") || this;
            _this.fixedToCamera = true;
            _this.visible = false;
            _this.updateWisp = false;
            _this.wisp = MagikMons.GameVars.slotData.wisp;
            var topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.inputEnabled = true;
            topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(topLayer);
            var bottomLayer = _this.create(0, 320, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.inputEnabled = true;
            bottomLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(bottomLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            _this.backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            _this.backButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.backButton.events.onInputOut.add(_this.onOut, _this);
            _this.backButton.events.onInputOver.add(_this.onOver, _this);
            _this.backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            _this.backButton.anchor.set(.5);
            _this.backButton.x += _this.backButton.width / 2;
            _this.backButton.y += _this.backButton.height / 2;
            topContainer.add(_this.backButton);
            var wispTab = new Phaser.Image(_this.game, 135, 15, "texture_atlas_1", "tab_wisps.png");
            topContainer.add(wispTab);
            _this.wispText = new Phaser.Text(_this.game, 230, 47, MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp), { font: "24px Chewy", fontWeight: "400", fill: "#59ffff" });
            _this.wispText.anchor.set(1, .5);
            topContainer.add(_this.wispText);
            var tabArea = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 10, 10, "texture_atlas_1", "tab_area_big.png");
            tabArea.anchor.set(1, 0);
            topContainer.add(tabArea);
            var textCraft = new Phaser.Text(_this.game, 380, 45, MagikMons.GameVars.names["CRAFTING"], { font: "25px Chewy", fontWeight: "400", fill: "#ffb63b" });
            textCraft.anchor.set(.5);
            topContainer.add(textCraft);
            var midContainer = new Phaser.Group(_this.game);
            midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            midContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            _this.add(midContainer);
            _this.craftItems = new Array();
            for (var i = 0; i < 7; i++) {
                var item = new MagikMons.CraftItem(_this.game, ItemsLayer.POSITIONS[i][0], ItemsLayer.POSITIONS[i][1], i, _this);
                midContainer.add(item);
                _this.craftItems.push(item);
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_HEAL || MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CRAFT) {
                _this.backButton.visible = false;
                _this.tween = _this.game.add.tween(_this.craftItems[0].buttonContainer.scale)
                    .to({ x: [1.05, 1], y: [1.05, 1] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            }
            return _this;
        }
        ItemsLayer.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.updateWisp) {
                this.wisp -= 100;
                if (this.wisp <= MagikMons.GameVars.slotData.wisp) {
                    this.wisp = MagikMons.GameVars.slotData.wisp;
                    this.wispText.text = MagikMons.Utils.validNumber(this.wisp);
                    this.updateWisp = false;
                }
                else {
                    this.wispText.text = MagikMons.Utils.validNumber(this.wisp);
                }
            }
        };
        ItemsLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        ItemsLayer.prototype.show = function () {
            this.visible = true;
            this.wispText.text = MagikMons.Utils.validNumber(MagikMons.GameVars.slotData.wisp);
            for (var i = 0; i < this.craftItems.length; i++) {
                this.craftItems[i].checkPrice();
            }
        };
        ItemsLayer.prototype.itemCrafted = function () {
            this.updateWisp = true;
            for (var i = 0; i < this.craftItems.length; i++) {
                this.craftItems[i].checkPrice();
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_CRAFT) {
                this.tween.stop();
                this.craftItems[0].buttonContainer.scale.set(1);
                this.backButton.visible = true;
            }
        };
        ItemsLayer.prototype.onClickBack = function (b) {
            b.scale.set(1);
            MagikMons.MapManager.hideItemsLayer();
        };
        ItemsLayer.prototype.onClickDarkLayer = function () {
        };
        ItemsLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        ItemsLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        ItemsLayer.POSITIONS = [[0, -200],
            [-120, -200 + 138],
            [120, -200 + 138],
            [-120, -200 + 138 * 2],
            [120, -200 + 138 * 2],
            [-120, -200 + 138 * 3],
            [120, -200 + 138 * 3]];
        return ItemsLayer;
    }(Phaser.Group));
    MagikMons.ItemsLayer = ItemsLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MapLayer = (function (_super) {
        __extends(MapLayer, _super);
        function MapLayer(game) {
            var _this = _super.call(this, game, null, "pause-layer") || this;
            _this.fixedToCamera = true;
            var topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.inputEnabled = true;
            topLayer.events.onInputDown.add(_this.onDownBackground, _this);
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(topLayer);
            var bottomLayer = _this.create(0, 320, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.inputEnabled = true;
            bottomLayer.events.onInputDown.add(_this.onDownBackground, _this);
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(bottomLayer);
            var mapContainer = new Phaser.Group(_this.game);
            mapContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            mapContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2 + 40;
            mapContainer.scale.set(.85, .85 * MagikMons.GameVars.scaleY);
            _this.add(mapContainer);
            _this.map = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "mapa_overworld.png");
            _this.map.anchor.set(.5);
            mapContainer.add(_this.map);
            _this.imHereContainer = new Phaser.Group(_this.game);
            mapContainer.add(_this.imHereContainer);
            _this.imHere = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "icon_ander.png");
            _this.imHere.anchor.set(.5, 1);
            _this.imHereContainer.add(_this.imHere);
            _this.game.add.tween(_this.imHere)
                .to({ y: [5, 0] }, 500, Phaser.Easing.Linear.None, true, 0, -1);
            var backButton = new Phaser.Button(_this.game, 10, 10 * MagikMons.GameVars.scaleY, "texture_atlas_1", _this.onClickBack, _this);
            backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            backButton.events.onInputDown.add(_this.onButtonDown, _this);
            backButton.events.onInputOut.add(_this.onOut, _this);
            backButton.events.onInputOver.add(_this.onOver, _this);
            backButton.scale.y = MagikMons.GameVars.scaleY;
            backButton.forceOut = true;
            _this.add(backButton);
            _this.visible = false;
            return _this;
        }
        MapLayer.prototype.update = function () {
            var mapName = MagikMons.GameVars.slotData.mapName;
            var heroPosition = MagikMons.MapState.currentInstance.mapContainer.hero.position;
            if (MagikMons.GameVars.slotData.mapsData[mapName]) {
                this.imHereContainer.x = 10 - this.map.width / 2 + MagikMons.GameVars.slotData.mapsData[mapName].minimapPosition.x + heroPosition.x * .07;
                this.imHereContainer.y = 10 - this.map.height / 2 + MagikMons.GameVars.slotData.mapsData[mapName].minimapPosition.y + heroPosition.y * .07;
            }
        };
        MapLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.05, 1.05 * MagikMons.GameVars.scaleY);
        };
        MapLayer.prototype.onOut = function (btn) {
            btn.scale.set(1, MagikMons.GameVars.scaleY);
        };
        MapLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05, 1.05 * MagikMons.GameVars.scaleY);
        };
        MapLayer.prototype.onClickBack = function () {
            MagikMons.AudioManager.playSound("click_btn");
            MagikMons.MapManager.hideMapLayer();
        };
        MapLayer.prototype.onDownBackground = function () {
        };
        return MapLayer;
    }(Phaser.Group));
    MagikMons.MapLayer = MapLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var ActionLayer = (function (_super) {
        __extends(ActionLayer, _super);
        function ActionLayer(game, x, y, actionId, enabled, i) {
            var _this = _super.call(this, game, null, "action-layer") || this;
            _this.x = x;
            _this.y = y;
            var action = MagikMons.GameVars.monstersActions[actionId];
            var background = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            background.tint = 0x00315d;
            background.scale.set(280 / MagikMons.GameConstants.BITMAP_SIZE, 75 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(background);
            if (enabled) {
                var image = new Phaser.Image(_this.game, 5, 37, "texture_atlas_1", "btn_attack_" + actionId + ".png");
                image.anchor.set(0, .5);
                _this.add(image);
                var actionName = new Phaser.Text(_this.game, 70, 23, action.name.toUpperCase(), { font: "18px Chewy", fontWeight: "400", fill: "#abe2e9" });
                actionName.anchor.set(0, .5);
                _this.add(actionName);
                var damage = new Phaser.Text(_this.game, 70, 53, MagikMons.GameVars.names["DAMAGE"] + ": " + Math.round(action.damage * 10), { font: "16px Chewy", fontWeight: "400", fill: "#abe2e9" });
                damage.anchor.set(0, .5);
                _this.add(damage);
                var cooldown = new Phaser.Text(_this.game, 190, 65, MagikMons.GameVars.names["COOLDOWN"] + ": " + (action.cooldown - 1), { font: "16px Chewy", fontWeight: "400", fill: "#abe2e9" });
                cooldown.anchor.set(0, .5);
                _this.add(cooldown);
                if (action.cooldown === 1) {
                    cooldown.visible = false;
                }
                if (action.special !== MagikMons.GameConstants.SPECIAL_NONE) {
                    var special = new Phaser.Text(_this.game, 180, 45, MagikMons.GameVars.names["SPECIAL"] + ": ", { font: "16px Chewy", fontWeight: "400", fill: "#abe2e9" });
                    special.anchor.set(0, .5);
                    _this.add(special);
                    var specialImage = new Phaser.Image(_this.game, 235, 40, "texture_atlas_1", "icon_" + action.special + ".png");
                    specialImage.anchor.set(0, .5);
                    specialImage.scale.set(.62);
                    _this.add(specialImage);
                }
            }
            else {
                _this.alpha = .75;
                var level = void 0;
                if (i === 1) {
                    level = MagikMons.GameConstants.LEVEL_ATTACK_1;
                }
                else if (i === 2) {
                    level = MagikMons.GameConstants.LEVEL_ATTACK_2;
                }
                else if (i === 3) {
                    level = MagikMons.GameConstants.LEVEL_ATTACK_3;
                }
                var actionName = new Phaser.Text(_this.game, 140, 40, MagikMons.GameVars.names["LEVEL"] + " " + level, { font: "20px Chewy", fontWeight: "400", fill: "#abe2e9" });
                actionName.anchor.set(.5);
                _this.add(actionName);
            }
            return _this;
        }
        return ActionLayer;
    }(Phaser.Group));
    MagikMons.ActionLayer = ActionLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar(game, x, y, type, heal) {
            var _this = _super.call(this, game, null, "bar") || this;
            _this.x = x;
            _this.y = y;
            var tint1;
            var tint2;
            var tint3;
            var tint4;
            if (type === "life") {
                tint1 = 0x11594e;
                tint2 = 0x027560;
                tint3 = 0x89ff8d;
                tint4 = 0x3ec851;
            }
            else if (type === "xp") {
                tint1 = 0xa84e03;
                tint2 = 0x9a7838;
                tint3 = 0xfdff89;
                tint4 = 0xffb63b;
            }
            var barBackground = new Phaser.Sprite(_this.game, 0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            barBackground.scale.set((Bar.BAR_LENGTH + 4) / 64, 10 / 64);
            barBackground.tint = tint1;
            _this.add(barBackground);
            var barBackground2 = new Phaser.Sprite(_this.game, 2, 2, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            barBackground2.scale.set(Bar.BAR_LENGTH / 64, 6 / 64);
            barBackground2.tint = tint2;
            _this.add(barBackground2);
            if (heal) {
                _this.fx = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "heal_fx_long_0001.png");
                _this.fx.scale.x = .42;
                _this.add(_this.fx);
                _this.fx.animations.add("anim", Phaser.Animation.generateFrameNames("heal_fx_long_", 1, 20, ".png", 4));
                _this.fx.play("anim", 24, true);
            }
            _this.bar1 = new Phaser.Sprite(_this.game, 2, 2, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.bar1.scale.set(60 / 64, 3 / 64);
            _this.bar1.tint = tint3;
            _this.add(_this.bar1);
            _this.bar2 = new Phaser.Sprite(_this.game, 2, 5, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            _this.bar2.scale.set(60 / 64, 3 / 64);
            _this.bar2.tint = tint4;
            _this.add(_this.bar2);
            return _this;
        }
        Bar.prototype.setValue = function (value, maxValue) {
            if (this.fx) {
                if (value === maxValue) {
                    if (this.fx.visible) {
                        this.fx.visible = false;
                    }
                }
                else {
                    if (!this.fx.visible) {
                        this.fx.visible = true;
                    }
                }
            }
            var barLength = value / maxValue * Bar.BAR_LENGTH;
            this.bar1.scale.x = barLength / 64;
            this.bar2.scale.x = barLength / 64;
        };
        Bar.BAR_LENGTH = 80;
        return Bar;
    }(Phaser.Group));
    MagikMons.Bar = Bar;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var MkmLayer = (function (_super) {
        __extends(MkmLayer, _super);
        function MkmLayer(game) {
            var _this = _super.call(this, game, null, "team-layer") || this;
            _this.fixedToCamera = true;
            _this.visible = false;
            _this.topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_CLASSIC));
            _this.topLayer.inputEnabled = true;
            _this.topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            _this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(_this.topLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            var backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            backButton.anchor.set(.5);
            backButton.x += backButton.width / 2;
            backButton.y += backButton.height / 2;
            backButton.events.onInputDown.add(_this.onButtonDown, _this);
            backButton.events.onInputOut.add(_this.onOut, _this);
            backButton.events.onInputOver.add(_this.onOver, _this);
            topContainer.add(backButton);
            _this.capsule = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 10, "texture_atlas_1", "monster-capsule-classic.png");
            _this.capsule.anchor.set(.5, 0);
            topContainer.add(_this.capsule);
            _this.mkmName = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 20, 46, "", { font: "20px Goonies", fill: "#FFFFFF", align: "center" });
            _this.mkmName.anchor.set(.5);
            topContainer.add(_this.mkmName);
            var lifeIcon = new Phaser.Image(_this.game, 370, 30, "texture_atlas_1", "icon_life_bar.png");
            lifeIcon.anchor.set(.5);
            topContainer.add(lifeIcon);
            _this.lifeBar = new MagikMons.Bar(_this.game, 380, 26, "life");
            topContainer.add(_this.lifeBar);
            var xpIcon = new Phaser.Image(_this.game, 370, 50, "texture_atlas_1", "icon_xp.png");
            xpIcon.anchor.set(.5);
            xpIcon.scale.set(.6);
            topContainer.add(xpIcon);
            _this.xpBar = new MagikMons.Bar(_this.game, 380, 46, "xp");
            topContainer.add(_this.xpBar);
            var midContainer = new Phaser.Group(_this.game);
            midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            midContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2 - 125;
            midContainer.scale.set(.9, .9 * MagikMons.GameVars.scaleY);
            _this.add(midContainer);
            _this.sign = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "current_mkm_classic.png");
            _this.sign.anchor.set(.5);
            midContainer.add(_this.sign);
            _this.mkm = new Phaser.Image(_this.game, 0, -20, "texture_atlas_4", "mkm_001_front.png");
            _this.mkm.anchor.set(.5);
            midContainer.add(_this.mkm);
            _this.level = new Phaser.Text(_this.game, 70, 15, "", { font: "75px Chewy", fontWeight: "400", fill: "#000000" });
            _this.level.stroke = "#11252c";
            _this.level.strokeThickness = 10;
            midContainer.add(_this.level);
            _this.bottomContainer = new Phaser.Group(_this.game);
            _this.bottomContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.bottomContainer.y = MagikMons.GameConstants.GAME_HEIGHT;
            _this.add(_this.bottomContainer);
            _this.stats = new Array();
            for (var i = 0; i < 4; i++) {
                var stat = new MagikMons.StatLayer(_this.game, 25, -5 - 80 * i, i);
                _this.bottomContainer.add(stat);
                _this.stats.push(stat);
            }
            _this.actions = new Array();
            return _this;
        }
        MkmLayer.prototype.show = function (monsterData) {
            this.visible = true;
            var gradient;
            if (monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                gradient = MagikMons.GameConstants.GRADIENT_CLASSIC;
                this.mkmName.font = "Pythia";
                this.mkmName.fontSize = "20px";
                this.mkmName.fill = "#5b473c";
                this.level.fill = "#ff9c50";
            }
            else if (monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                gradient = MagikMons.GameConstants.GRADIENT_SPECTRE;
                this.mkmName.font = "Goonies";
                this.mkmName.fontSize = "20px";
                this.mkmName.fill = "#2a3147";
                this.level.fill = "#b9a8ff";
            }
            else if (monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                gradient = MagikMons.GameConstants.GRADIENT_TECH;
                this.mkmName.font = "Adineue";
                this.mkmName.fontSize = "25px";
                this.mkmName.fill = "#ffffff";
                this.level.fill = "#00dfa9";
            }
            this.newGradients(gradient);
            this.capsule.frameName = "monster-capsule-" + monsterData.class + ".png";
            this.mkmName.text = monsterData.name;
            this.lifeBar.setValue(monsterData.life, monsterData.maxLife);
            this.xpBar.setValue(monsterData.xp, MagikMons.Utils.levelToXp(monsterData.level));
            this.sign.frameName = "current_mkm_" + monsterData.class + ".png";
            this.mkm.frameName = "mkm_" + monsterData.id + "_front.png";
            this.level.text = monsterData.level + "";
            for (var i = 0; i < this.stats.length; i++) {
                this.stats[i].setStats(monsterData);
            }
            for (var i = 0; i < this.actions.length; i++) {
                this.actions[i].destroy();
            }
            this.actions = new Array();
            var maxAction = 0;
            if (monsterData.level >= MagikMons.GameConstants.LEVEL_ATTACK_3) {
                maxAction = 3;
            }
            else if (monsterData.level >= MagikMons.GameConstants.LEVEL_ATTACK_2) {
                maxAction = 2;
            }
            else if (monsterData.level >= MagikMons.GameConstants.LEVEL_ATTACK_1) {
                maxAction = 1;
            }
            for (var i = 0; i < 4; i++) {
                var action = new MagikMons.ActionLayer(this.game, 175, -320 + 80 * i, monsterData.actions[i].id, i <= maxAction, i);
                this.bottomContainer.add(action);
                this.actions.push(action);
            }
        };
        MkmLayer.prototype.onClickBack = function (b) {
            b.scale.set(1);
            MagikMons.MapManager.hideMkmLayer();
        };
        MkmLayer.prototype.onClickDarkLayer = function () {
        };
        MkmLayer.prototype.newGradients = function (gradient) {
            this.remove(this.topLayer);
            this.topLayer = this.create(0, 0, this.game.cache.getBitmapData(gradient));
            this.topLayer.inputEnabled = true;
            this.topLayer.events.onInputDown.add(this.onClickDarkLayer, this);
            this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 640 / 128);
            this.add(this.topLayer);
            this.sendToBack(this.topLayer);
        };
        MkmLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        MkmLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        MkmLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return MkmLayer;
    }(Phaser.Group));
    MagikMons.MkmLayer = MkmLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var StatLayer = (function (_super) {
        __extends(StatLayer, _super);
        function StatLayer(game, x, y, i) {
            var _this = _super.call(this, game, null, "stat-layer") || this;
            _this.x = x;
            _this.y = y;
            _this.i = i;
            _this.createName();
            var background = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
            background.anchor.set(0, 1);
            background.tint = 0x00315d;
            background.scale.set(125 / MagikMons.GameConstants.BITMAP_SIZE, 75 / MagikMons.GameConstants.BITMAP_SIZE);
            _this.add(background);
            var tab = new Phaser.Image(_this.game, 132, -75, "texture_atlas_1", "tab_area.png");
            tab.scale.x = -1;
            _this.add(tab);
            var name2 = "";
            switch (_this.name) {
                case "aim":
                    name2 = MagikMons.GameVars.names["AIM"];
                    break;
                case "life":
                    name2 = MagikMons.GameVars.names["LIFE"];
                    break;
                case "defense":
                    name2 = MagikMons.GameVars.names["DEFENSE"];
                    break;
                case "attack":
                    name2 = MagikMons.GameVars.names["ATTACK"];
                    break;
                default:
                    break;
            }
            var nameStat = new Phaser.Text(_this.game, 45, -50, name2, { font: "18px Chewy", fontWeight: "400", fill: "#ffb63b" });
            nameStat.anchor.set(.5);
            _this.add(nameStat);
            var icon = new Phaser.Image(_this.game, 105, -55, "texture_atlas_1", "icon_" + _this.name.toLowerCase() + ".png");
            icon.anchor.set(.5);
            _this.add(icon);
            _this.numText = new Phaser.Text(_this.game, 62, -15, "", { font: "22px Chewy", fontWeight: "400", fill: "#abe2e9" });
            _this.numText.anchor.set(.5);
            _this.add(_this.numText);
            return _this;
        }
        StatLayer.prototype.setStats = function (monsterData) {
            switch (this.name) {
                case "aim":
                    this.numText.text = monsterData.aiming + "";
                    break;
                case "life":
                    this.numText.text = monsterData.maxLife + "";
                    break;
                case "defense":
                    this.numText.text = monsterData.defense + "";
                    break;
                case "attack":
                    this.numText.text = monsterData.attack + "";
                    break;
                default:
                    break;
            }
        };
        StatLayer.prototype.createName = function () {
            switch (this.i) {
                case 0:
                    this.name = "aim";
                    break;
                case 1:
                    this.name = "life";
                    break;
                case 2:
                    this.name = "defense";
                    break;
                case 3:
                    this.name = "attack";
                    break;
                default:
                    break;
            }
        };
        return StatLayer;
    }(Phaser.Group));
    MagikMons.StatLayer = StatLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var AuraMkm = (function (_super) {
        __extends(AuraMkm, _super);
        function AuraMkm(game, x, y, monsterData, top) {
            var _this = _super.call(this, game, null, "aura-mkm") || this;
            _this.x = x;
            _this.y = y;
            _this.monsterData = monsterData;
            var aura = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "current_mkm_classic.png");
            aura.anchor.set(.5);
            aura.scale.set(.45);
            _this.add(aura);
            var container = new Phaser.Group(_this.game);
            container.y = top ? -105 : 75;
            _this.add(container);
            var mkmName = new Phaser.Text(_this.game, 0, 0, "", { font: "16px Chewy", fill: "#FFFFFF", align: "center" });
            mkmName.anchor.set(.5);
            container.add(mkmName);
            _this.lifeBar = new MagikMons.Bar(_this.game, -40, 11, "life", true);
            container.add(_this.lifeBar);
            var xpIcon = new Phaser.Image(_this.game, -50, 32, "texture_atlas_1", "icon_xp.png");
            xpIcon.anchor.set(.5);
            xpIcon.scale.set(.6);
            container.add(xpIcon);
            var xpBar = new MagikMons.Bar(_this.game, -40, 28, "xp");
            container.add(xpBar);
            _this.lifeIcon = new Phaser.Image(_this.game, -50, 15, "texture_atlas_1", "icon_life_bar.png");
            _this.lifeIcon.anchor.set(.5);
            container.add(_this.lifeIcon);
            if (monsterData) {
                aura.frameName = "current_mkm_" + monsterData.class + ".png";
                mkmName.text = " " + monsterData.name.toUpperCase() + " ";
                if (monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                    mkmName.fill = "#ff9c50";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                    mkmName.fill = "#b9a8ff";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                    mkmName.fill = "#00dfa9";
                }
                _this.lifeBar.setValue(monsterData.life, monsterData.maxLife);
                xpBar.setValue(monsterData.xp, MagikMons.Utils.levelToXp(monsterData.level));
            }
            else {
                _this.visible = false;
            }
            return _this;
        }
        AuraMkm.prototype.update = function () {
            _super.prototype.update.call(this);
            if (!this.monsterData) {
                return;
            }
            this.lifeBar.setValue(this.monsterData.life, this.monsterData.maxLife);
            if (this.monsterData.life < this.monsterData.maxLife) {
                this.lifeIcon.frameName = "icon_attention.png";
                this.lifeIcon.scale.set(.65);
                if (!this.t1) {
                    this.t1 = this.game.add.tween(this.lifeIcon.scale)
                        .to({ x: .6, y: .6 }, 250, Phaser.Easing.Quintic.In);
                    this.t2 = this.game.add.tween(this.lifeIcon.scale)
                        .to({ x: .65, y: .65 }, 250, Phaser.Easing.Quintic.In);
                    this.t1.chain(this.t2);
                    this.t2.chain(this.t1);
                    this.t1.start();
                }
            }
            else {
                if (this.t1) {
                    this.t1.stop();
                    this.t1 = null;
                }
                if (this.t2) {
                    this.t2.stop();
                    this.t2 = null;
                }
                this.lifeIcon.frameName = "icon_life_bar.png";
                this.lifeIcon.scale.set(1);
            }
        };
        return AuraMkm;
    }(Phaser.Group));
    MagikMons.AuraMkm = AuraMkm;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var HealFx = (function (_super) {
        __extends(HealFx, _super);
        function HealFx(game, x, y, left, teamLayer) {
            var _this = _super.call(this, game, null, "heal-fx") || this;
            _this.x = x;
            _this.y = y;
            _this.counter = -1;
            if (left) {
                _this.scale.x = -1;
            }
            _this.heal1 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "heal_01.png");
            _this.heal1.scale.set(.5);
            _this.heal1.visible = false;
            _this.add(_this.heal1);
            _this.heal2 = new Phaser.Image(_this.game, 0, -80, "texture_atlas_2", "heal_01.png");
            _this.heal2.scale.set(.5);
            _this.heal2.visible = false;
            _this.add(_this.heal2);
            _this.heal3 = new Phaser.Image(_this.game, 0, -160, "texture_atlas_2", "heal_01.png");
            _this.heal3.scale.set(.5);
            _this.heal3.visible = false;
            _this.add(_this.heal3);
            _this.heal4 = new Phaser.Image(_this.game, -30, -450, "texture_atlas_2", "heal_01.png");
            _this.heal4.scale.set(1, 1.5);
            _this.heal4.visible = false;
            _this.add(_this.heal4);
            _this.heal1.animations.add("anim", Phaser.Animation.generateFrameNames("heal_", 1, 11, ".png", 2))
                .onComplete.add(function () {
                this.heal1.visible = false;
            }, _this);
            _this.heal2.animations.add("anim", Phaser.Animation.generateFrameNames("heal_", 1, 11, ".png", 2))
                .onComplete.add(function () {
                this.heal2.visible = false;
            }, _this);
            _this.heal3.animations.add("anim", Phaser.Animation.generateFrameNames("heal_", 1, 11, ".png", 2))
                .onComplete.add(function () {
                this.heal3.visible = false;
            }, _this);
            _this.heal4.animations.add("anim", Phaser.Animation.generateFrameNames("heal_", 1, 11, ".png", 2))
                .onComplete.add(function () {
                this.heal4.visible = false;
                teamLayer.removeHeal(this);
            }, _this);
            _this.start();
            return _this;
        }
        HealFx.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.counter === -1) {
                return;
            }
            if (Math.round((0 * 60) / HealFx.FPS) === this.counter) {
                this.heal1.visible = true;
                this.heal1.play("anim", HealFx.FPS, false);
                MagikMons.AudioManager.playSound("flame_heal_01");
            }
            else if (Math.round((6 * 60) / HealFx.FPS) === this.counter) {
                this.heal2.visible = true;
                this.heal2.play("anim", HealFx.FPS, false);
            }
            else if (Math.round((12 * 60) / HealFx.FPS) === this.counter) {
                this.heal3.visible = true;
                this.heal3.play("anim", HealFx.FPS, false);
            }
            else if (Math.round((18 * 60) / HealFx.FPS) === this.counter) {
                this.heal4.visible = true;
                this.heal4.play("anim", HealFx.FPS, false);
                MagikMons.AudioManager.playSound("flame_heal_02");
            }
            else if (Math.round((30 * 60) / HealFx.FPS) === this.counter) {
                this.counter = -2;
            }
            this.counter++;
        };
        HealFx.prototype.start = function () {
            if (this.counter === -1) {
                this.counter = 0;
            }
        };
        HealFx.FPS = 24;
        return HealFx;
    }(Phaser.Group));
    MagikMons.HealFx = HealFx;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var HealSlot = (function (_super) {
        __extends(HealSlot, _super);
        function HealSlot(game, x, y, monsterData, i) {
            var _this = _super.call(this, game, null, "heal-slot") || this;
            _this.x = x;
            _this.y = y;
            _this.counter = 60;
            _this.i = i;
            _this.monsterData = monsterData;
            if (_this.i > 2) {
                var barBackground = new Phaser.Sprite(_this.game, 2, -2, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
                barBackground.scale.set(8 / 64, (HealSlot.BAR_LENGTH + 4) / 64);
                barBackground.anchor.set(0, 1);
                barBackground.tint = 0x027560;
                _this.add(barBackground);
                _this.bar = new Phaser.Sprite(_this.game, 2, -2, _this.game.cache.getBitmapData(MagikMons.GameConstants.WHITE_SQUARE));
                _this.bar.scale.set(8 / 64, (HealSlot.BAR_LENGTH + 4) / 64);
                _this.bar.anchor.set(0, 1);
                _this.bar.tint = 0x3ec851;
                _this.add(_this.bar);
                _this.healBackground = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "fx_heal_0001.png");
                _this.healBackground.anchor.set(0, 1);
                _this.add(_this.healBackground);
            }
            _this.time = new Phaser.Text(_this.game, 15, 0, "", { font: "16px Chewy", fontWeight: "400", fill: "#0f1f26" });
            _this.time.anchor.set(0, 1);
            _this.add(_this.time);
            if (_this.i === 0) {
                _this.time.position.add(-8, -108);
                _this.time.fill = "#c6feff";
            }
            else if (i <= 2) {
                _this.time.position.add(-8, 72);
            }
            if (_this.monsterData) {
                MagikMons.GameManager.setInitialHealTime(_this.monsterData);
                if (_this.i > 2) {
                    var barLength = monsterData.life / monsterData.maxLife * HealSlot.BAR_LENGTH;
                    _this.bar.scale.y = barLength / 64;
                    if (monsterData.life < monsterData.maxLife) {
                        _this.healBackground.animations.add("anim", Phaser.Animation.generateFrameNames("fx_heal_", 1, 21, ".png", 4));
                        _this.healBackground.play("anim", 24, true);
                    }
                }
            }
            else {
                _this.visible = false;
            }
            return _this;
        }
        HealSlot.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.monsterData) {
                if (this.counter < 60) {
                    this.counter++;
                }
                else {
                    this.counter = 0;
                    MagikMons.GameManager.setHealTime(this.monsterData);
                }
                if (this.i > 2) {
                    var barLength = this.monsterData.life / this.monsterData.maxLife * HealSlot.BAR_LENGTH;
                    this.bar.scale.y = barLength / 64;
                }
                var time = (this.monsterData.maxLife - this.monsterData.life) * 2;
                if (time > 0) {
                    if (time < 60) {
                        this.time.text = Math.round(time) + " s";
                    }
                    else {
                        this.time.text = Math.floor(time / 60) + " m";
                    }
                }
                else {
                    this.time.text = "";
                    if (this.i > 2) {
                        this.healBackground.animations.stop("anim");
                        this.healBackground.frameName = "fx_heal_0001.png";
                    }
                }
            }
        };
        HealSlot.BAR_LENGTH = 60;
        return HealSlot;
    }(Phaser.Group));
    MagikMons.HealSlot = HealSlot;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var TeamLayer = (function (_super) {
        __extends(TeamLayer, _super);
        function TeamLayer(game) {
            var _this = _super.call(this, game, null, "team-layer") || this;
            _this.fixedToCamera = true;
            _this.visible = false;
            var topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.inputEnabled = true;
            topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(topLayer);
            var bottomLayer = _this.create(0, 320, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.inputEnabled = true;
            bottomLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(bottomLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            _this.backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            _this.backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            _this.backButton.anchor.set(.5);
            _this.backButton.x += _this.backButton.width / 2;
            _this.backButton.y += _this.backButton.height / 2;
            _this.backButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.backButton.events.onInputOut.add(_this.onOut, _this);
            _this.backButton.events.onInputOver.add(_this.onOver, _this);
            topContainer.add(_this.backButton);
            var bestiaryButton = new Phaser.Button(_this.game, 10, _this.backButton.y + _this.backButton.height + 10, "texture_atlas_1", _this.onClickBestiary, _this);
            bestiaryButton.setFrames("btn_bestiary.png", "btn_bestiary.png", "btn_bestiary.png");
            bestiaryButton.anchor.set(.5);
            bestiaryButton.x += _this.backButton.width / 2;
            bestiaryButton.events.onInputDown.add(_this.onButtonDown, _this);
            bestiaryButton.events.onInputOut.add(_this.onOut, _this);
            bestiaryButton.events.onInputOver.add(_this.onOver, _this);
            topContainer.add(bestiaryButton);
            var scale = (((1 / MagikMons.GameVars.scaleY) * 1.1) / 1.33);
            if (scale < 1) {
                scale = 1;
            }
            _this.midContainer = new Phaser.Group(_this.game);
            _this.midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            _this.midContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            _this.midContainer.scale.set(scale, scale * MagikMons.GameVars.scaleY);
            var wandBackground = new Phaser.Image(_this.game, 0, 36, "texture_atlas_2", "magic_wand_silhouette.png");
            wandBackground.anchor.set(.5);
            _this.midContainer.add(wandBackground);
            _this.aurasContainer = new Phaser.Group(_this.game);
            _this.midContainer.add(_this.aurasContainer);
            _this.auras = new Array();
            for (var i = 0; i < 3; i++) {
                var monster = MagikMons.GameVars.slotData.monsters[i];
                var aura = new MagikMons.AuraMkm(_this.game, TeamLayer.POSITIONS[i][0], TeamLayer.POSITIONS[i][1], monster, i === 0);
                _this.aurasContainer.add(aura);
                _this.auras.push(aura);
            }
            _this.slotsContainer = new Phaser.Group(_this.game);
            _this.midContainer.add(_this.slotsContainer);
            _this.slots = new Array();
            for (var i = 0; i < 6; i++) {
                var slot = new Phaser.Image(_this.game, TeamLayer.POSITIONS[i][0], TeamLayer.POSITIONS[i][1], "texture_atlas_1", i < 3 ? "slot_swap_eye.png" : "slot_empty.png");
                slot.anchor.set(.5);
                slot.visible = i >= 3;
                _this.midContainer.add(slot);
                _this.slots.push(slot);
            }
            _this.healSlots = new Array();
            for (var i = 0; i < 6; i++) {
                var healSlots = new MagikMons.HealSlot(_this.game, TeamLayer.POSITIONS[i][0] + 42, TeamLayer.POSITIONS[i][1] + 35, MagikMons.GameVars.slotData.monsters[i], i);
                _this.slotsContainer.add(healSlots);
                _this.healSlots.push(healSlots);
            }
            _this.teamMkm = new Array();
            for (var i = 0; i < MagikMons.GameVars.slotData.monsters.length; i++) {
                var mkm = void 0;
                if (MagikMons.GameVars.slotData.monsters[i]) {
                    mkm = new MagikMons.TeamMkm(_this.game, TeamLayer.POSITIONS[i][0], TeamLayer.POSITIONS[i][1], MagikMons.GameVars.slotData.monsters[i], i < 3, _this, i);
                }
                else {
                    mkm = new MagikMons.TeamMkm(_this.game, TeamLayer.POSITIONS[i][0], TeamLayer.POSITIONS[i][1], null, i < 3, _this, i);
                }
                _this.midContainer.add(mkm);
                _this.teamMkm.push(mkm);
            }
            _this.fingerMkm = new Phaser.Image(_this.game, -120, -150, "texture_atlas_1", "tutorial_finger.png");
            _this.fingerMkm.anchor.set(.5);
            _this.fingerMkm.scale.x = -1;
            _this.fingerMkm.visible = false;
            _this.midContainer.add(_this.fingerMkm);
            _this.game.add.tween(_this.fingerMkm)
                .to({ x: [-150, -120] }, 1000, Phaser.Easing.Linear.None, true, 0, -1);
            var tabContainer = new Phaser.Group(_this.game);
            tabContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            tabContainer.y = MagikMons.GameConstants.GAME_HEIGHT / 2;
            tabContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(tabContainer);
            var tabCombat = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 5, -MagikMons.GameConstants.GAME_HEIGHT / 2 + 5, "texture_atlas_1", "tab_area.png");
            tabCombat.anchor.set(1, 0);
            tabContainer.add(tabCombat);
            var textCombat = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 77, -MagikMons.GameConstants.GAME_HEIGHT / 2 + 30, MagikMons.GameVars.names["COMBAT TEAM"], { font: "18px Chewy", fontWeight: "400", fill: "#ffb63b" });
            textCombat.anchor.set(.5);
            tabContainer.add(textCombat);
            var bottomContainer = new Phaser.Group(_this.game);
            bottomContainer.y = MagikMons.GameConstants.GAME_HEIGHT;
            bottomContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(bottomContainer);
            _this.healButton = new Phaser.Button(_this.game, 0, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onClickInstantHeal, _this);
            _this.healButton.setFrames("btn_instant_heal.png", "btn_instant_heal.png", "btn_instant_heal.png");
            _this.healButton.onInputDown.add(_this.onButtonDown, _this);
            _this.healButton.events.onInputOut.add(_this.onOut, _this);
            _this.healButton.events.onInputOver.add(_this.onOver, _this);
            _this.healButton.anchor.set(.5);
            _this.healButton.x += _this.healButton.width / 2;
            _this.healButton.y -= _this.healButton.height / 2;
            bottomContainer.add(_this.healButton);
            var textHeal = new Phaser.Text(_this.game, 70, -80, "(" + MagikMons.GameVars.names["WATCH VIDEO"] + ")", { font: "16px Chewy", fontWeight: "400", fill: "#0f1f26" });
            textHeal.anchor.set(.5);
            bottomContainer.add(textHeal);
            _this.healBoostButton = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH, 0, "texture_atlas_" + MagikMons.GameVars.gameData.language, _this.onClickHealingBoost, _this);
            _this.healBoostButton.onInputDown.add(_this.onButtonDown, _this);
            _this.healBoostButton.events.onInputOut.add(_this.onOut, _this);
            _this.healBoostButton.events.onInputOver.add(_this.onOver, _this);
            _this.healBoostButton.setFrames("btn_healing_boost.png", "btn_healing_boost.png", "btn_healing_boost.png");
            _this.healBoostButton.anchor.set(.5);
            bottomContainer.add(_this.healBoostButton);
            _this.healBoostButton.x -= _this.healBoostButton.width / 2;
            _this.healBoostButton.y -= _this.healBoostButton.height / 2;
            _this.fingerHeal = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 100, -140, "texture_atlas_1", "tutorial_finger.png");
            _this.fingerHeal.anchor.set(.5);
            _this.fingerHeal.angle = 90;
            _this.fingerHeal.scale.x = -1;
            bottomContainer.add(_this.fingerHeal);
            _this.game.add.tween(_this.fingerHeal)
                .to({ y: [-120, -140] }, 250, Phaser.Easing.Linear.None, true, 0, -1);
            if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_HEAL) {
                _this.healBoostButton.visible = false;
                _this.healButton.visible = false;
                textHeal.visible = false;
            }
            if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_SWAP) {
                bestiaryButton.visible = false;
            }
            _this.add(_this.midContainer);
            _this.bestiary = new MagikMons.Bestiary(_this.game);
            _this.add(_this.bestiary);
            _this.game.time.events.add(100, function () {
                this.needChange();
            }, _this);
            return _this;
        }
        TeamLayer.prototype.update = function () {
            _super.prototype.update.call(this);
            var canHeal = false;
            for (var i = 0; i < 6; i++) {
                if (this.healSlots[i].monsterData) {
                    var monster = this.healSlots[i].monsterData;
                    if (monster.life < monster.maxLife) {
                        canHeal = true;
                    }
                }
            }
            if (!canHeal && this.healBoostButton.alpha === 1) {
                this.healBoostButton.alpha = .5;
                this.healBoostButton.inputEnabled = false;
                this.healButton.alpha = .5;
                this.healButton.inputEnabled = false;
                this.fingerHeal.visible = false;
            }
            else if (canHeal && this.healBoostButton.alpha === .5) {
                this.healBoostButton.alpha = 1;
                this.healBoostButton.inputEnabled = true;
                this.healButton.alpha = 1;
                this.healButton.inputEnabled = true;
                this.fingerHeal.visible = true;
            }
        };
        TeamLayer.prototype.needChange = function () {
            var needChange = true;
            for (var i = 0; i < 3; i++) {
                if (this.teamMkm[i].monsterData) {
                    needChange = false;
                }
            }
            if (needChange) {
                this.backButton.alpha = .5;
                this.backButton.inputEnabled = false;
            }
            else {
                this.backButton.alpha = 1;
                this.backButton.inputEnabled = true;
            }
        };
        TeamLayer.prototype.show = function () {
            this.visible = true;
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                this.backButton.alpha = .5;
                this.backButton.inputEnabled = false;
                this.fingerMkm.visible = true;
            }
        };
        TeamLayer.prototype.removeFinger = function () {
            this.fingerMkm.visible = false;
            this.backButton.alpha = 1;
            this.backButton.inputEnabled = true;
        };
        TeamLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        TeamLayer.prototype.canChange = function (teamMkm1) {
            for (var i = 0; i < this.teamMkm.length; i++) {
                if (teamMkm1 !== this.teamMkm[i]) {
                    var teamMkm2 = this.teamMkm[i];
                    if (MagikMons.Utils.intersectRect(teamMkm1.x, teamMkm1.y, teamMkm2.x, teamMkm2.y, 30)) {
                        this.swapMkms(teamMkm1, teamMkm2);
                        return;
                    }
                }
            }
            teamMkm1.moveInitial();
            this.uploadAurasSlots();
        };
        TeamLayer.prototype.swapMkms = function (teamMkm1, teamMkm2) {
            var initialX1 = teamMkm1.initialX;
            var initialY1 = teamMkm1.initialY;
            teamMkm1.initialX = teamMkm2.initialX;
            teamMkm1.initialY = teamMkm2.initialY;
            teamMkm2.initialX = initialX1;
            teamMkm2.initialY = initialY1;
            var posAux = teamMkm1.pos;
            teamMkm1.pos = teamMkm2.pos;
            teamMkm2.pos = posAux;
            this.midContainer.bringToTop(initialX1);
            this.midContainer.bringToTop(teamMkm2);
            teamMkm1.moveInitial();
            teamMkm2.moveInitial();
            MagikMons.GameManager.reorderMonsters(this.teamMkm);
            if (teamMkm1.pos < 3 && teamMkm1.monsterData) {
                teamMkm1.monsterData.healTime = 0;
            }
            if (teamMkm2.pos < 3 && teamMkm2.monsterData) {
                teamMkm2.monsterData.healTime = 0;
            }
            this.uploadAurasSlots();
            this.needChange();
            MagikMons.GameManager.writeGameData();
        };
        TeamLayer.prototype.uploadAurasSlots = function () {
            for (var i = 0; i < 3; i++) {
                this.auras[i].destroy();
            }
            for (var i = 0; i < 6; i++) {
                this.healSlots[i].destroy();
            }
            this.auras = new Array();
            for (var i = 0; i < 3; i++) {
                var monster = MagikMons.GameVars.slotData.monsters[i];
                var aura = new MagikMons.AuraMkm(this.game, TeamLayer.POSITIONS[i][0], TeamLayer.POSITIONS[i][1], monster, i === 0);
                this.aurasContainer.add(aura);
                this.auras.push(aura);
            }
            this.healSlots = new Array();
            for (var i = 0; i < 6; i++) {
                var healSlots = new MagikMons.HealSlot(this.game, TeamLayer.POSITIONS[i][0] + 42, TeamLayer.POSITIONS[i][1] + 35, MagikMons.GameVars.slotData.monsters[i], i);
                this.slotsContainer.add(healSlots);
                this.healSlots.push(healSlots);
            }
        };
        TeamLayer.prototype.removeBack = function (pos) {
            if (pos < 3) {
                this.auras[pos].visible = false;
            }
            else {
                this.healSlots[pos - 3].visible = false;
            }
        };
        TeamLayer.prototype.checkIntersection = function (teamMkm1) {
            this.uncheckSlots();
            for (var i = 0; i < this.teamMkm.length; i++) {
                if (teamMkm1 !== this.teamMkm[i]) {
                    var teamMkm2 = this.teamMkm[i];
                    if (MagikMons.Utils.intersectRect(teamMkm1.x, teamMkm1.y, teamMkm2.x, teamMkm2.y, 30)) {
                        this.slots[teamMkm2.pos].visible = true;
                        if (teamMkm2.pos >= 3) {
                            this.slots[teamMkm2.pos].frameName = "slot_swap.png";
                        }
                        return;
                    }
                }
            }
            this.slots[teamMkm1.pos].visible = true;
            if (teamMkm1.pos > 3) {
                this.slots[teamMkm1.pos].frameName = "slot_swap.png";
            }
        };
        TeamLayer.prototype.uncheckSlots = function () {
            for (var i = 0; i < 6; i++) {
                this.slots[i].frameName = i < 3 ? "slot_swap_eye.png" : "slot_empty.png";
                this.slots[i].visible = i >= 3;
            }
        };
        TeamLayer.prototype.onClickBack = function (b) {
            b.scale.set(1);
            MagikMons.MapManager.hideTeamLayer();
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_HEAL) {
                MagikMons.GameManager.endHealTutorial();
            }
            if (MagikMons.GameVars.slotData.state === MagikMons.GameConstants.TUTORIAL_WAND) {
                MagikMons.GameManager.endWandTutorial();
            }
        };
        TeamLayer.prototype.onClickBestiary = function (b) {
            b.scale.set(1);
            this.bestiary.visible = true;
        };
        TeamLayer.prototype.onClickInstantHeal = function (b) {
            b.scale.set(1);
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.GAMEPIX && typeof GamePix !== "undefined") {
                GamePix.hook({ type: "show_video_reward" })
                    .then(function (res) {
                    MagikMons.MapState.currentInstance.teamLayer.instantHeal();
                })
                    .catch(function (e) {
                    console.log(e);
                });
            }
            else if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.rewardedBreak().then(function (withReward) {
                    console.log("Should the user get a reward? ${withReward}");
                    MagikMons.MapState.currentInstance.teamLayer.instantHeal();
                });
            }
            else {
                this.instantHeal();
            }
        };
        TeamLayer.prototype.instantHeal = function () {
            for (var i = 0; i < 6; i++) {
                if (this.healSlots[i].monsterData) {
                    var monster = this.healSlots[i].monsterData;
                    if (monster.life < monster.maxLife) {
                        monster.life = monster.maxLife;
                    }
                }
            }
        };
        TeamLayer.prototype.onClickHealingBoost = function (b) {
            b.scale.set(1);
            this.fingerHeal.visible = false;
            var canHeal = false;
            for (var i = 0; i < 6; i++) {
                if (this.healSlots[i].monsterData) {
                    var monster = this.healSlots[i].monsterData;
                    if (monster.life < monster.maxLife) {
                        canHeal = true;
                        monster.life += 2;
                        if (monster.life > monster.maxLife) {
                            monster.life = monster.maxLife;
                        }
                    }
                }
            }
            if (canHeal) {
                var healFx = new MagikMons.HealFx(this.game, 60, 220, true, this);
                this.midContainer.add(healFx);
                var healFx2 = new MagikMons.HealFx(this.game, -60, 220, false, this);
                this.midContainer.add(healFx2);
                this.midContainer.sendToBack(healFx);
                this.midContainer.bringToTop(healFx2);
            }
        };
        TeamLayer.prototype.removeHeal = function (healFx) {
            this.midContainer.remove(healFx);
        };
        TeamLayer.prototype.onClickDarkLayer = function () {
        };
        TeamLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        TeamLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        TeamLayer.POSITIONS = [[-2, -192],
            [-72, -68],
            [73, -69],
            [0, 95],
            [0, 180],
            [0, 265]];
        return TeamLayer;
    }(Phaser.Group));
    MagikMons.TeamLayer = TeamLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var TeamMkm = (function (_super) {
        __extends(TeamMkm, _super);
        function TeamMkm(game, x, y, monsterData, typeMkm, teamLayer, pos) {
            var _this = _super.call(this, game, null, "team-mkm") || this;
            _this.x = x;
            _this.y = y;
            _this.initialX = x,
                _this.initialY = y;
            _this.pos = pos;
            _this.canMove = false;
            _this.canDown = true;
            _this.typeMkm = typeMkm;
            _this.teamLayer = teamLayer;
            _this.monsterData = monsterData;
            _this.needFx = false;
            if (_this.monsterData) {
                _this.fx = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "fx_radial_rays.png");
                _this.fx.anchor.set(.5);
                _this.fx.visible = false;
                _this.fx.scale.set(0);
                _this.add(_this.fx);
                _this.mkm = new Phaser.Image(_this.game, 0, -10, "texture_atlas_4", "mkm_" + monsterData.id + "_front.png");
                _this.mkm.scale.set(.52);
                _this.mkm.anchor.set(.5);
                _this.mkm.inputEnabled = true;
                _this.mkm.events.onInputDown.add(_this.onDown, _this);
                _this.mkm.events.onInputUp.add(_this.onUp, _this);
                _this.add(_this.mkm);
                _this.mkmLevel = new Phaser.Text(_this.game, 30, 0, monsterData.level + "", { font: "40px Chewy", fontWeight: "400", fill: "#000000" });
                _this.mkmLevel.stroke = "#11252c";
                _this.mkmLevel.strokeThickness = 8;
                _this.add(_this.mkmLevel);
                _this.icon = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", "icon_" + monsterData.id + ".png");
                _this.icon.anchor.set(.5);
                _this.icon.inputEnabled = true;
                _this.icon.events.onInputDown.add(_this.onDown, _this);
                _this.icon.events.onInputUp.add(_this.onUp, _this);
                _this.add(_this.icon);
                _this.iconLevel = new Phaser.Text(_this.game, -32, -33, monsterData.level + "", { font: "18px Chewy", fontWeight: "400", fill: "#000000" });
                _this.iconLevel.stroke = "#11252c";
                _this.iconLevel.strokeThickness = 5;
                _this.add(_this.iconLevel);
                if (monsterData.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                    _this.mkmLevel.fill = "#ff9c50";
                    _this.iconLevel.fill = "#ff9c50";
                    _this.fx.tint = 0xff9c50;
                    _this.mkmLevel.stroke = "#40241D";
                    _this.iconLevel.stroke = "#40241D";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                    _this.mkmLevel.fill = "#b9a8ff";
                    _this.iconLevel.fill = "#b9a8ff";
                    _this.fx.tint = 0xb9a8ff;
                    _this.mkmLevel.stroke = "#300949";
                    _this.iconLevel.stroke = "#300949";
                }
                else if (monsterData.class === MagikMons.GameConstants.ELEMENT_TECH) {
                    _this.mkmLevel.fill = "#00dfa9";
                    _this.iconLevel.fill = "#00dfa9";
                    _this.fx.tint = 0x00dfa9;
                    _this.mkmLevel.stroke = "#102932";
                    _this.iconLevel.stroke = "#102932";
                }
                if (typeMkm) {
                    _this.mkmMode();
                }
                else {
                    _this.iconMode();
                }
                if (_this.typeMkm) {
                    _this.mkmLevel.visible = true;
                    _this.iconLevel.visible = false;
                }
                else {
                    _this.mkmLevel.visible = false;
                    _this.iconLevel.visible = true;
                }
            }
            return _this;
        }
        TeamMkm.prototype.update = function () {
            _super.prototype.update.call(this);
            if (MagikMons.GameVars.slotData.state < MagikMons.GameConstants.TUTORIAL_SWAP_2) {
                if (!this.monsterData) {
                    return;
                }
                if (this.monsterData.life < this.monsterData.maxLife) {
                    this.needFx = true;
                }
                else {
                    if (this.needFx) {
                        this.needFx = false;
                        if (MagikMons.MapState.currentInstance.teamLayer.visible) {
                            MagikMons.AudioManager.playSound("finished_healing");
                        }
                        this.fx.visible = true;
                        this.game.add.tween(this.fx.scale)
                            .to({ x: 1, y: 1 }, 300, Phaser.Easing.Elastic.Out, true)
                            .onComplete.add(function () {
                            this.game.add.tween(this.fx.scale)
                                .to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.Out, true, 200)
                                .onComplete.add(function () {
                                this.fx.visible = false;
                            }, this);
                        }, this);
                    }
                }
                return;
            }
            if (this.canMove) {
                var point = this.game.input.activePointer;
                this.x = point.x - MagikMons.GameConstants.GAME_WIDTH / 2 - this.offX;
                this.y = (point.y - MagikMons.GameConstants.GAME_HEIGHT / 2) / MagikMons.GameVars.scaleY - this.offY;
                this.teamLayer.checkIntersection(this);
            }
            if (this.monsterData) {
                if (this.y < 25) {
                    if (!this.typeMkm) {
                        this.mkmMode();
                    }
                }
                else {
                    if (this.typeMkm) {
                        this.iconMode();
                    }
                }
                if (this.monsterData.life < this.monsterData.maxLife) {
                    this.needFx = true;
                }
                else {
                    if (this.needFx) {
                        this.needFx = false;
                        if (MagikMons.MapState.currentInstance.teamLayer.visible) {
                            MagikMons.AudioManager.playSound("finished_healing");
                        }
                        this.fx.visible = true;
                        this.game.add.tween(this.fx.scale)
                            .to({ x: 1, y: 1 }, 300, Phaser.Easing.Elastic.Out, true)
                            .onComplete.add(function () {
                            this.game.add.tween(this.fx.scale)
                                .to({ x: 0, y: 0 }, 500, Phaser.Easing.Cubic.Out, true, 200)
                                .onComplete.add(function () {
                                this.fx.visible = false;
                            }, this);
                        }, this);
                    }
                }
            }
        };
        TeamMkm.prototype.moveInitial = function () {
            this.canDown = false;
            var time = Math.sqrt(Math.pow((this.x - this.initialX), 2) + Math.pow((this.y - this.initialY), 2) / 4);
            if (time < 10) {
                time = 10;
            }
            this.game.add.tween(this)
                .to({ x: this.initialX, y: this.initialY }, time, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                this.canDown = true;
                if (this.monsterData) {
                    if (this.typeMkm) {
                        this.mkmLevel.visible = true;
                        this.iconLevel.visible = false;
                    }
                    else {
                        this.mkmLevel.visible = false;
                        this.iconLevel.visible = true;
                    }
                }
            }, this);
        };
        TeamMkm.prototype.mkmMode = function () {
            this.mkm.visible = true;
            this.icon.visible = false;
            this.typeMkm = true;
        };
        TeamMkm.prototype.iconMode = function () {
            this.mkm.visible = false;
            this.icon.visible = true;
            this.typeMkm = false;
        };
        TeamMkm.prototype.onDown = function (image, pointer) {
            if (!this.canDown || !this.monsterData) {
                return;
            }
            this.mkmLevel.visible = false;
            this.iconLevel.visible = false;
            this.offX = pointer.x - MagikMons.GameConstants.GAME_WIDTH / 2 - this.x;
            this.offY = (pointer.y - MagikMons.GameConstants.GAME_HEIGHT / 2) / MagikMons.GameVars.scaleY - this.y;
            this.canMove = true;
            this.teamLayer.midContainer.bringToTop(this);
            this.teamLayer.removeBack(this.pos);
        };
        TeamMkm.prototype.onUp = function (image, pointer) {
            if (!this.canDown || !this.canMove || !this.monsterData) {
                return;
            }
            this.canMove = false;
            var duration = pointer.timeUp - pointer.timeDown;
            var posUp = pointer.positionUp;
            var posDown = pointer.positionDown;
            if (duration < 250 && Math.abs(posUp.x - posDown.x) < 10 && Math.abs(posUp.y - posDown.y) < 10) {
                this.moveInitial();
                MagikMons.MapManager.showMkmLayer(this.monsterData);
                this.teamLayer.uploadAurasSlots();
            }
            else {
                this.teamLayer.canChange(this);
            }
            this.teamLayer.uncheckSlots();
        };
        return TeamMkm;
    }(Phaser.Group));
    MagikMons.TeamMkm = TeamMkm;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Bestiary = (function (_super) {
        __extends(Bestiary, _super);
        function Bestiary(game) {
            var _this = _super.call(this, game, null, "bestiary") || this;
            _this.visible = false;
            _this.startX = 0;
            _this.canSwipe = false;
            _this.classBestiary = MagikMons.GameConstants.ELEMENT_CLASSIC;
            _this.game.input.onUp.add(_this.mouseUp, _this);
            _this.game.input.onDown.add(_this.mouseDown, _this);
            _this.topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_CLASSIC));
            _this.topLayer.inputEnabled = true;
            _this.topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            _this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, MagikMons.GameConstants.GAME_HEIGHT / 128);
            _this.add(_this.topLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            var backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            backButton.anchor.set(.5);
            backButton.x += backButton.width / 2;
            backButton.y += backButton.height / 2;
            backButton.events.onInputDown.add(_this.onButtonDown, _this);
            backButton.events.onInputOut.add(_this.onOut, _this);
            backButton.events.onInputOver.add(_this.onOver, _this);
            topContainer.add(backButton);
            var tabBestiary = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 5, "texture_atlas_1", "tab_area_big.png");
            tabBestiary.anchor.set(1, 0);
            topContainer.add(tabBestiary);
            var textBestiary = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH - 100, 40, MagikMons.GameVars.names["BESTIARY"], { font: "25px Chewy", fontWeight: "400", fill: "#ffb63b" });
            textBestiary.anchor.set(.5);
            topContainer.add(textBestiary);
            _this.midContainer = new Phaser.Group(_this.game);
            _this.midContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            _this.midContainer.y = 200;
            _this.add(_this.midContainer);
            _this.mkms = new Array();
            for (var i = 0; i < 5; i++) {
                var mkm = new MagikMons.BestiaryIcon(_this.game, i, Bestiary.POSITIONS[i][0], Bestiary.POSITIONS[i][1], _this.classBestiary, _this);
                _this.midContainer.add(mkm);
                _this.mkms.push(mkm);
            }
            var bottomContainer = new Phaser.Group(_this.game);
            bottomContainer.scale.y = MagikMons.GameVars.scaleY;
            bottomContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            bottomContainer.y = 450;
            _this.add(bottomContainer);
            _this.leftArrow = new Phaser.Image(_this.game, -200, 0, "texture_atlas_1", "btn_arrow_tech.png");
            _this.leftArrow.scale.x = -1;
            _this.leftArrow.anchor.set(.5);
            _this.leftArrow.name = "left";
            _this.leftArrow.inputEnabled = true;
            _this.leftArrow.events.onInputDown.add(_this.onArrowDown, _this);
            _this.leftArrow.events.onInputUp.add(_this.onArrowUp, _this);
            _this.leftArrow.events.onInputOut.add(_this.onOutLeft, _this);
            _this.leftArrow.events.onInputOver.add(_this.onOverLeft, _this);
            bottomContainer.add(_this.leftArrow);
            _this.rightArrow = new Phaser.Image(_this.game, 200, 0, "texture_atlas_1", "btn_arrow_spectre.png");
            _this.rightArrow.anchor.set(.5);
            _this.rightArrow.name = "right";
            _this.rightArrow.inputEnabled = true;
            _this.rightArrow.events.onInputDown.add(_this.onArrowDown, _this);
            _this.rightArrow.events.onInputUp.add(_this.onArrowUp, _this);
            _this.rightArrow.events.onInputOut.add(_this.onOut, _this);
            _this.rightArrow.events.onInputOver.add(_this.onOver, _this);
            bottomContainer.add(_this.rightArrow);
            _this.capsule = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "monster-capsule-classic.png");
            _this.capsule.anchor.set(.5);
            bottomContainer.add(_this.capsule);
            _this.capsuleText = new Phaser.Text(_this.game, -20, 8, MagikMons.GameVars.bestiaryTexts["CLASSIC"], { font: "22px Pythia", fill: "#5b473c", align: "center" });
            _this.capsuleText.anchor.set(.5);
            bottomContainer.add(_this.capsuleText);
            _this.classText = new Phaser.Text(_this.game, 0, 45, MagikMons.GameVars.bestiaryTexts["DESCRIPTION CLASSIC"], { font: "18px Chewy", fontWeight: "400", fill: "#ff9c50", align: "center" });
            _this.classText.anchor.set(.5, 0);
            _this.classText.wordWrap = true;
            _this.classText.wordWrapWidth = 460;
            bottomContainer.add(_this.classText);
            _this.changeBestiaryType();
            return _this;
        }
        Bestiary.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        Bestiary.prototype.mouseDown = function () {
            this.startX = this.game.input.x;
            this.canSwipe = true;
        };
        Bestiary.prototype.mouseUp = function () {
            if (!this.canSwipe) {
                return;
            }
            this.canSwipe = false;
            var endX = this.game.input.x;
            var dist = this.startX - endX;
            if (dist > 50) {
                this.swipeLeft();
            }
            else if (dist < -50) {
                this.swipeRight();
            }
        };
        Bestiary.prototype.swipeLeft = function () {
            if (this.classBestiary === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_TECH;
            }
            else if (this.classBestiary === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_CLASSIC;
            }
            else {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_SPECTRE;
            }
            this.changeBestiaryType();
        };
        Bestiary.prototype.swipeRight = function () {
            if (this.classBestiary === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_SPECTRE;
            }
            else if (this.classBestiary === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_TECH;
            }
            else {
                this.classBestiary = MagikMons.GameConstants.ELEMENT_CLASSIC;
            }
            this.changeBestiaryType();
        };
        Bestiary.prototype.onArrowDown = function (img) {
            MagikMons.AudioManager.playSound("click_btn");
            if (img.name === "left") {
                img.scale.set(-1.1, 1.1);
            }
            else {
                img.scale.set(1.1);
            }
        };
        Bestiary.prototype.onArrowUp = function (img) {
            if (img.name === "left") {
                img.scale.set(-1, 1);
            }
            else {
                img.scale.set(1);
            }
            if (this.classBestiary === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                if (img.name === "left") {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_TECH;
                }
                else {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_SPECTRE;
                }
            }
            else if (this.classBestiary === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                if (img.name === "left") {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_CLASSIC;
                }
                else {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_TECH;
                }
            }
            else {
                if (img.name === "left") {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_SPECTRE;
                }
                else {
                    this.classBestiary = MagikMons.GameConstants.ELEMENT_CLASSIC;
                }
            }
            this.changeBestiaryType();
        };
        Bestiary.prototype.changeBestiaryType = function () {
            this.remove(this.topLayer);
            this.topLayer = this.create(0, 0, this.game.cache.getBitmapData(this.classBestiary));
            this.topLayer.inputEnabled = true;
            this.topLayer.events.onInputDown.add(this.onClickDarkLayer, this);
            this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, MagikMons.GameConstants.GAME_HEIGHT / 128);
            this.add(this.topLayer);
            this.sendToBack(this.topLayer);
            this.capsule.frameName = "monster-capsule-" + this.classBestiary + ".png";
            var num;
            if (this.classBestiary === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                this.capsuleText.font = "Pythia";
                this.capsuleText.fill = "#5b473c";
                this.capsuleText.fontSize = "22px";
                this.leftArrow.frameName = "btn_arrow_tech.png";
                this.rightArrow.frameName = "btn_arrow_spectre.png";
                this.classText.text = MagikMons.GameVars.bestiaryTexts["CLASSIC"];
                this.capsuleText.text = MagikMons.GameVars.names["CLASSIC"].replace("Á", "A");
                this.classText.fill = "#ff9c50";
                num = 1;
            }
            else if (this.classBestiary === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                this.capsuleText.font = "Goonies";
                this.capsuleText.fill = "#2a3147";
                this.capsuleText.fontSize = "22px";
                this.leftArrow.frameName = "btn_arrow_classic.png";
                this.rightArrow.frameName = "btn_arrow_tech.png";
                this.classText.text = MagikMons.GameVars.bestiaryTexts["SPECTRE"];
                this.capsuleText.text = MagikMons.GameVars.names["SPECTRE"];
                this.classText.fill = "#b9a8ff";
                num = 11;
            }
            else {
                this.capsuleText.font = "Adineue";
                this.capsuleText.fill = "#ffffff";
                this.capsuleText.fontSize = "28px";
                this.leftArrow.frameName = "btn_arrow_spectre.png";
                this.rightArrow.frameName = "btn_arrow_classic.png";
                this.classText.text = MagikMons.GameVars.bestiaryTexts["TECH"];
                this.capsuleText.text = MagikMons.GameVars.names["TECH"];
                this.classText.fill = "#00dfa9";
                num = 6;
            }
            for (var i = 0; i < 5; i++) {
                this.mkms[i].destroy();
                this.midContainer.remove(this.mkms[i]);
            }
            this.mkms = new Array();
            for (var i = 0; i < 5; i++) {
                var mkm = new MagikMons.BestiaryIcon(this.game, i + num, Bestiary.POSITIONS[i][0], Bestiary.POSITIONS[i][1], this.classBestiary, this);
                this.midContainer.add(mkm);
                this.mkms.push(mkm);
            }
        };
        Bestiary.prototype.showMkm = function (id) {
            this.bestiaryMkm = new MagikMons.BestiaryMkm(this.game, MagikMons.GameVars.monstersInfo[id], id, this);
            this.add(this.bestiaryMkm);
        };
        Bestiary.prototype.onClickBack = function (b) {
            b.scale.set(1);
            this.visible = false;
        };
        Bestiary.prototype.onClickDarkLayer = function () {
        };
        Bestiary.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        Bestiary.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        Bestiary.prototype.onOutLeft = function (btn) {
            btn.scale.set(-1);
        };
        Bestiary.prototype.onOverLeft = function (btn) {
            btn.scale.set(-1.05);
        };
        Bestiary.POSITIONS = [[-150, -50],
            [0, -50],
            [150, -50],
            [-75, 110],
            [75, 110]];
        return Bestiary;
    }(Phaser.Group));
    MagikMons.Bestiary = Bestiary;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var BestiaryIcon = (function (_super) {
        __extends(BestiaryIcon, _super);
        function BestiaryIcon(game, i, x, y, classMkm, bestiary) {
            var _this = _super.call(this, game, null, "bestiary-icon") || this;
            _this.bestiary = bestiary;
            _this.startX = 0;
            _this.x = x;
            _this.y = y;
            _this.num = i;
            _this.id = ("000" + i).substr(-3);
            var monsterData;
            if (MagikMons.GameVars.slotData.bestiary[_this.num - 1]) {
                monsterData = MagikMons.GameVars.monstersInfo[_this.id];
            }
            else {
                _this.id = "000";
            }
            var aura = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "current_mkm_" + classMkm + ".png");
            aura.anchor.set(.5);
            aura.scale.set(.5);
            _this.add(aura);
            var image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", "mkm_" + _this.id + "_front.png");
            image.inputEnabled = true;
            image.events.onInputDown.add(_this.onImageDown, _this);
            image.events.onInputUp.add(_this.onImageUp, _this);
            image.anchor.set(.5);
            _this.add(image);
            if (_this.id !== "000") {
                image.scale.set(.5);
                image.events.onInputOut.add(_this.onOut, _this);
                image.events.onInputOver.add(_this.onOver, _this);
            }
            var nameMkm = new Phaser.Text(_this.game, 0, 85, "", { font: "18px Chewy", fontWeight: "400", fill: "#ff9c50", align: "center" });
            nameMkm.anchor.set(.5);
            _this.add(nameMkm);
            if (monsterData) {
                nameMkm.text = " " + monsterData.name.toUpperCase() + " ";
            }
            if (classMkm === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                nameMkm.fill = "#ff9c50";
            }
            else if (classMkm === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                nameMkm.fill = "#b9a8ff";
            }
            else {
                nameMkm.fill = "#00dfa9";
            }
            return _this;
        }
        BestiaryIcon.prototype.onImageDown = function () {
            if (this.id !== "000") {
                this.scale.set(1.1);
            }
            this.startX = this.game.input.x;
        };
        BestiaryIcon.prototype.onImageUp = function () {
            this.scale.set(1);
            var endX = this.game.input.x;
            if (Math.abs(this.startX - endX) <= 50) {
                if (this.id !== "000") {
                    this.bestiary.showMkm(this.id);
                }
            }
        };
        BestiaryIcon.prototype.onOut = function (btn) {
            btn.scale.set(.5);
        };
        BestiaryIcon.prototype.onOver = function (btn) {
            btn.scale.set(.55);
        };
        return BestiaryIcon;
    }(Phaser.Group));
    MagikMons.BestiaryIcon = BestiaryIcon;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var BestiaryMkm = (function (_super) {
        __extends(BestiaryMkm, _super);
        function BestiaryMkm(game, monsterInfo, id, bestiary) {
            var _this = _super.call(this, game, null, "bestiary-mkm") || this;
            _this.bestiary = bestiary;
            _this.id = id;
            _this.topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(monsterInfo.class));
            _this.topLayer.inputEnabled = true;
            _this.topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            _this.topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, MagikMons.GameConstants.GAME_HEIGHT / 128);
            _this.add(_this.topLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            var backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            backButton.anchor.set(.5);
            backButton.x += backButton.width / 2;
            backButton.y += backButton.height / 2;
            backButton.events.onInputDown.add(_this.onButtonDown, _this);
            backButton.events.onInputOut.add(_this.onOut, _this);
            backButton.events.onInputOver.add(_this.onOver, _this);
            backButton.forceOut = true;
            topContainer.add(backButton);
            var capsule = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, 50, "texture_atlas_1", "monster-capsule-" + monsterInfo.class + ".png");
            capsule.anchor.set(.5);
            topContainer.add(capsule);
            var capsuleText = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 20, 58, " " + monsterInfo.name.toUpperCase() + " ", { font: "20px Pythia", fill: "#5b473c", align: "center" });
            capsuleText.anchor.set(.5);
            topContainer.add(capsuleText);
            var midContainer = new Phaser.Group(_this.game);
            midContainer.scale.y = MagikMons.GameVars.scaleY;
            midContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            midContainer.y = 220;
            _this.add(midContainer);
            var aura = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "current_mkm_" + monsterInfo.class + ".png");
            aura.anchor.set(.5);
            midContainer.add(aura);
            var image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_4", "mkm_" + _this.id + "_front.png");
            image.anchor.set(.5);
            midContainer.add(image);
            var bottomContainer = new Phaser.Group(_this.game);
            bottomContainer.scale.y = MagikMons.GameVars.scaleY;
            bottomContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            bottomContainer.y = 480;
            _this.add(bottomContainer);
            var titleText = new Phaser.Text(_this.game, 0, -85, "", { font: "24px Chewy", fontWeight: "400", fill: "#ff9c50", align: "center" });
            titleText.anchor.set(.5);
            bottomContainer.add(titleText);
            var classText = new Phaser.Text(_this.game, 0, -50, MagikMons.GameVars.bestiaryTexts[_this.id], { font: "18px Chewy", fontWeight: "400", fill: "#ff9c50", align: "center" });
            classText.anchor.set(.5, 0);
            classText.wordWrap = true;
            classText.wordWrapWidth = 450;
            bottomContainer.add(classText);
            if (monsterInfo.class === MagikMons.GameConstants.ELEMENT_CLASSIC) {
                capsuleText.font = "Pythia";
                capsuleText.fill = "#5b473c";
                capsuleText.fontSize = "18px";
                titleText.fill = "#ff9c50";
                classText.fill = "#ff9c50";
                titleText.text = MagikMons.GameVars.names["CLASS"] + ": " + MagikMons.GameVars.names["CLASSIC"].replace("Á", "A");
            }
            else if (monsterInfo.class === MagikMons.GameConstants.ELEMENT_SPECTRE) {
                capsuleText.font = "Goonies";
                capsuleText.fill = "#2a3147";
                capsuleText.fontSize = "18px";
                titleText.fill = "#b9a8ff";
                classText.fill = "#b9a8ff";
                titleText.text = MagikMons.GameVars.names["SPECTRE"] + ": " + MagikMons.GameVars.names["SPECTRE"];
            }
            else {
                capsuleText.font = "Adineue";
                capsuleText.fill = "#ffffff";
                capsuleText.fontSize = "22px";
                titleText.fill = "#00dfa9";
                classText.fill = "#00dfa9";
                titleText.text = MagikMons.GameVars.names["TECH"] + ": " + MagikMons.GameVars.names["TECH"];
            }
            return _this;
        }
        BestiaryMkm.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        BestiaryMkm.prototype.onClickBack = function (b) {
            b.scale.set(1);
            b.clearFrames();
            this.visible = false;
            this.destroy();
            this.bestiary.remove(this);
        };
        BestiaryMkm.prototype.onClickDarkLayer = function () {
        };
        BestiaryMkm.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        BestiaryMkm.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return BestiaryMkm;
    }(Phaser.Group));
    MagikMons.BestiaryMkm = BestiaryMkm;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var BackgroundSplash = (function (_super) {
        __extends(BackgroundSplash, _super);
        function BackgroundSplash(game) {
            var _this = _super.call(this, game, null, "background-splash") || this;
            var mapName = MagikMons.GameVars.slotData.mapName;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.initialPosition = { x: MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.slotData.mapsData[mapName].heroPosition.x + MagikMons.GameConstants.TILES_SIZE_HALF,
                y: MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.slotData.mapsData[mapName].heroPosition.y + MagikMons.GameConstants.TILES_SIZE_HALF };
            _this.chargeMap(MagikMons.GameVars.slotData.mapsData[mapName].tilemapName, MagikMons.GameVars.slotData.mapsData[mapName].imageName);
            var hero = new Phaser.Sprite(_this.game, _this.initialPosition.x, _this.initialPosition.y, "texture_atlas_1", "down_03.png");
            hero.anchor.set(.5, .75);
            _this.add(hero);
            _this.createAnimations();
            _this.game.world.setBounds(0, 0, MagikMons.GameVars.slotData.mapsData[mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE * MagikMons.GameVars.scaleY);
            _this.game.camera.follow(hero, Phaser.Camera.FOLLOW_LOCKON);
            return _this;
        }
        BackgroundSplash.prototype.chargeMap = function (name, tiles) {
            this.stamp = new Phaser.Sprite(this.game, 0, 0, "tiles");
            this.stamp.anchor.set(.5);
            this.add(this.stamp);
            this.map = this.game.add.tilemap(name);
            this.map.addTilesetImage(tiles, tiles);
            this.objects = this.map.objects;
            this.objects = this.objects.objects;
            MagikMons.MapManager.initObjects(this.objects);
            this.background = this.map.createLayer("background");
            this.background.renderable = false;
            var cacheTexture = this.game.cache.getRenderTexture(this.background.layer.name + MagikMons.GameVars.slotData.mapName);
            if (cacheTexture) {
                this.backgroundImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                this.add(this.backgroundImage);
            }
            else {
                var backgroundTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                this.backgroundImage = new Phaser.Sprite(this.game, 0, 0, backgroundTexture);
                this.add(this.backgroundImage);
                this.renderTexture(this.background, backgroundTexture);
            }
            this.animationsBot = this.map.createLayer("animationsBot");
            this.animationsBot.renderable = false;
            this.animationsBotGroup = new Phaser.Group(this.game);
            this.add(this.animationsBotGroup);
            var count = 0;
            for (var i = 0; i < this.map.layers.length; i++) {
                if (!this.map.layers[i].name.search("collisions")) {
                    count++;
                }
            }
            this.collisions = new Array();
            this.collisionsImages = new Array();
            for (var i = 1; i <= count; i++) {
                var name_2 = "collisions" + i;
                var collision = this.map.createLayer(name_2);
                collision.renderable = false;
                this.collisions.push(collision);
                cacheTexture = this.game.cache.getRenderTexture(collision.layer.name + MagikMons.GameVars.slotData.mapName);
                var collisionsImage = void 0;
                if (cacheTexture) {
                    collisionsImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                    this.add(collisionsImage);
                    this.collisionsImages.push(collisionsImage);
                }
                else {
                    var collisionsTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                    collisionsImage = new Phaser.Sprite(this.game, 0, 0, collisionsTexture);
                    this.add(collisionsImage);
                    this.collisionsImages.push(collisionsImage);
                    this.renderTexture(collision, collisionsTexture);
                }
            }
            this.bridges = this.map.createLayer("bridges");
            this.bridges.renderable = false;
            cacheTexture = this.game.cache.getRenderTexture(this.bridges.layer.name + MagikMons.GameVars.slotData.mapName);
            if (cacheTexture) {
                this.bridgesImage = new Phaser.Sprite(this.game, 0, 0, cacheTexture.texture);
                this.add(this.bridgesImage);
            }
            else {
                var bridgeTexture = new Phaser.RenderTexture(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.x * MagikMons.GameConstants.TILES_SIZE, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].dimensions.y * MagikMons.GameConstants.TILES_SIZE);
                this.bridgesImage = new Phaser.Sprite(this.game, 0, 0, bridgeTexture);
                this.add(this.bridgesImage);
                this.renderTexture(this.bridges, bridgeTexture);
            }
            this.trainers = new Array();
            for (var i = 0; i < MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers.length; i++) {
                var trainer = new MagikMons.Trainer(this.game, MagikMons.GameVars.slotData.mapsData[MagikMons.GameVars.slotData.mapName].trainers[i], true);
                this.add(trainer);
                this.trainers.push(trainer);
            }
            this.animationsTop = this.map.createLayer("animationsTop");
            this.animationsTop.renderable = false;
            this.animationsTopGroup = new Phaser.Group(this.game);
            this.add(this.animationsTopGroup);
        };
        BackgroundSplash.prototype.renderTexture = function (layer, texture) {
            for (var i = 0; i < layer.layer.data.length; i++) {
                for (var j = 0; j < layer.layer.data[0].length; j++) {
                    this.stamp.scale.set(1);
                    this.stamp.rotation = 0;
                    if (layer.layer.data[i][j].flipped) {
                        if (layer.layer.data[i][j].flippedVal === 2) {
                            this.stamp.scale.y = -1;
                        }
                        else if (layer.layer.data[i][j].flippedVal === 4) {
                            this.stamp.scale.x = -1;
                        }
                    }
                    if (layer.layer.data[i][j].rotation) {
                        this.stamp.rotation = layer.layer.data[i][j].rotation;
                    }
                    if (layer.layer.data[i][j].index !== -1) {
                        this.stamp.frame = layer.layer.data[i][j].index - 1;
                        texture.renderXY(this.stamp, j * MagikMons.GameConstants.TILES_SIZE + (MagikMons.GameConstants.TILES_SIZE / 2), i * MagikMons.GameConstants.TILES_SIZE + (MagikMons.GameConstants.TILES_SIZE / 2));
                    }
                }
            }
            this.game.cache.addRenderTexture(layer.layer.name + MagikMons.GameVars.slotData.mapName, texture);
        };
        BackgroundSplash.prototype.createAnimations = function () {
            for (var i = 0; i < this.animationsTop.layer.data.length; i++) {
                for (var j = 0; j < this.animationsTop.layer.data[0].length; j++) {
                    for (var k = 0; k < MagikMons.GameVars.animations.length; k++) {
                        var anim = MagikMons.GameVars.animations[k];
                        if (this.animationsTop.layer.data[i][j].index === anim.tile) {
                            var sprite = new Phaser.Sprite(this.game, j * MagikMons.GameConstants.TILES_SIZE, i * MagikMons.GameConstants.TILES_SIZE, "texture_atlas_1", anim.name + "_01.png");
                            this.animationsTopGroup.add(sprite);
                        }
                        if (this.animationsBot.layer.data[i][j].index === anim.tile) {
                            var sprite = new Phaser.Sprite(this.game, j * MagikMons.GameConstants.TILES_SIZE, i * MagikMons.GameConstants.TILES_SIZE, "texture_atlas_1", anim.name + "_01.png");
                            this.animationsBotGroup.add(sprite);
                        }
                    }
                }
            }
        };
        return BackgroundSplash;
    }(Phaser.Group));
    MagikMons.BackgroundSplash = BackgroundSplash;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var CreditsLayer = (function (_super) {
        __extends(CreditsLayer, _super);
        function CreditsLayer(game) {
            var _this = _super.call(this, game, null, "credits-layer") || this;
            _this.fixedToCamera = true;
            var topLayer = _this.create(0, 0, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_1));
            topLayer.inputEnabled = true;
            topLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            topLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(topLayer);
            var bottomLayer = _this.create(0, 320, _this.game.cache.getBitmapData(MagikMons.GameConstants.GRADIENT_ITEMS_2));
            bottomLayer.inputEnabled = true;
            bottomLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            bottomLayer.scale.set(MagikMons.GameConstants.GAME_WIDTH / 16, 320 / 128);
            _this.add(bottomLayer);
            var topContainer = new Phaser.Group(_this.game);
            topContainer.scale.y = MagikMons.GameVars.scaleY;
            _this.add(topContainer);
            _this.backButton = new Phaser.Button(_this.game, 10, 10, "texture_atlas_1", _this.onClickBack, _this);
            _this.backButton.events.onInputDown.add(_this.onButtonDown, _this);
            _this.backButton.events.onInputOut.add(_this.onOut, _this);
            _this.backButton.events.onInputOver.add(_this.onOver, _this);
            _this.backButton.setFrames("btn_back.png", "btn_back.png", "btn_back.png");
            _this.backButton.anchor.set(.5);
            _this.backButton.x += _this.backButton.width / 2;
            _this.backButton.y += _this.backButton.height / 2;
            topContainer.add(_this.backButton);
            var tabCredits = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 5, "texture_atlas_1", "tab_area_big.png");
            tabCredits.anchor.set(1, 0);
            topContainer.add(tabCredits);
            var textCredits = new Phaser.Text(_this.game, MagikMons.GameConstants.GAME_WIDTH - 100, 40, MagikMons.GameVars.names["CREDITS"], { font: "22px Chewy", fontWeight: "400", fill: "#ffb63b" });
            textCredits.anchor.set(.5);
            topContainer.add(textCredits);
            var namesContainer = new Phaser.Group(_this.game);
            namesContainer.scale.y = MagikMons.GameVars.scaleY;
            namesContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            namesContainer.y = 140;
            _this.add(namesContainer);
            var namesText1 = new Phaser.Text(_this.game, 0, 0, "ANIA BECERRA - " + MagikMons.GameVars.names["ART"], { font: "22px Chewy", fontWeight: "400", fill: "#ffffff" });
            namesText1.anchor.set(.5);
            namesContainer.add(namesText1);
            var namesText2 = new Phaser.Text(_this.game, 0, 50, "DAVID ESCRICHE - " + MagikMons.GameVars.names["PROGRAMATION"], { font: "22px Chewy", fontWeight: "400", fill: "#ffffff" });
            namesText2.anchor.set(.5);
            namesContainer.add(namesText2);
            var namesText3 = new Phaser.Text(_this.game, 0, 100, "ENRIQUE GARCÍA - " + MagikMons.GameVars.names["CONCEPT"], { font: "22px Chewy", fontWeight: "400", fill: "#ffffff" });
            namesText3.anchor.set(.5);
            namesContainer.add(namesText3);
            var namesText4 = new Phaser.Text(_this.game, 0, 150, "CHENT SANCHEZ - " + MagikMons.GameVars.names["ART 2"], { font: "22px Chewy", fontWeight: "400", fill: "#ffffff" });
            namesText4.anchor.set(.5);
            namesContainer.add(namesText4);
            var namesText5 = new Phaser.Text(_this.game, 0, 200, "JAVIER SANZ - " + MagikMons.GameVars.names["UI"], { font: "22px Chewy", fontWeight: "400", fill: "#ffffff" });
            namesText5.anchor.set(.5);
            namesContainer.add(namesText5);
            var ravalmaticContainer = new Phaser.Group(_this.game);
            ravalmaticContainer.scale.y = MagikMons.GameVars.scaleY;
            ravalmaticContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            ravalmaticContainer.y = 400;
            _this.add(ravalmaticContainer);
            var ravalmaticLogo = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "ravalmatic_logo.png");
            ravalmaticLogo.anchor.set(.5);
            ravalmaticContainer.add(ravalmaticLogo);
            var ravalmaticText1 = new Phaser.Text(_this.game, 0, 40, MagikMons.GameVars.names["RAVALMATIC"], { font: "22px Chewy", fontWeight: "400", fill: "#43bcf1" });
            ravalmaticText1.anchor.set(.5);
            ravalmaticContainer.add(ravalmaticText1);
            var ravalmaticText2 = new Phaser.Text(_this.game, 0, 70, MagikMons.GameVars.names["HTML"], { font: "22px Chewy", fontWeight: "400", fill: "#43bcf1" });
            ravalmaticText2.anchor.set(.5);
            ravalmaticContainer.add(ravalmaticText2);
            var ravalmaticText3 = new Phaser.Text(_this.game, 0, 100, MagikMons.GameVars.names["DEVELOPMENT"], { font: "22px Chewy", fontWeight: "400", fill: "#43bcf1" });
            ravalmaticText3.anchor.set(.5);
            ravalmaticContainer.add(ravalmaticText3);
            var geneLogo = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH / 2, MagikMons.GameConstants.GAME_HEIGHT - 20, "texture_atlas_1", "logo_generalitat.png");
            geneLogo.anchor.set(.5, 1);
            geneLogo.scale.y = MagikMons.GameVars.scaleY;
            _this.add(geneLogo);
            return _this;
        }
        CreditsLayer.prototype.show = function () {
            this.visible = true;
        };
        CreditsLayer.prototype.onClickDarkLayer = function () {
        };
        CreditsLayer.prototype.onButtonDown = function (b) {
            MagikMons.AudioManager.playSound("click_btn");
            b.scale.set(1.1);
        };
        CreditsLayer.prototype.onClickBack = function (b) {
            b.scale.set(1);
            this.destroy();
        };
        CreditsLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        CreditsLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return CreditsLayer;
    }(Phaser.Group));
    MagikMons.CreditsLayer = CreditsLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var LanguagesLayer = (function (_super) {
        __extends(LanguagesLayer, _super);
        function LanguagesLayer(game) {
            var _this = _super.call(this, game, null, "languages-layer") || this;
            _this.fixedToCamera = true;
            _this.scale.y = MagikMons.GameVars.scaleY;
            var btnName = "btn_language_" + MagikMons.GameVars.gameData.language + ".png";
            _this.languageButton = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 60, "texture_atlas_1", _this.onLanguageButtonClicked, _this);
            _this.languageButton.name = MagikMons.GameVars.gameData.language;
            _this.languageButton.setFrames(btnName, btnName, btnName);
            _this.languageButton.events.onInputOut.add(_this.onOut, _this);
            _this.languageButton.events.onInputOver.add(_this.onOver, _this);
            _this.languageButton.anchor.set(1, 0);
            _this.add(_this.languageButton);
            _this.arrow = new Phaser.Image(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 110, "texture_atlas_1", "arrow_language_btn.png");
            _this.arrow.anchor.set(1, 0);
            _this.add(_this.arrow);
            _this.otherButton1 = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 120, "texture_atlas_1", _this.onOtherButtonClicked, _this);
            _this.otherButton1.visible = false;
            _this.otherButton1.anchor.set(1, 0);
            _this.otherButton1.events.onInputOut.add(_this.onOut, _this);
            _this.otherButton1.events.onInputOver.add(_this.onOver, _this);
            _this.add(_this.otherButton1);
            _this.otherButton2 = new Phaser.Button(_this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 180, "texture_atlas_1", _this.onOtherButtonClicked, _this);
            _this.otherButton2.visible = false;
            _this.otherButton2.anchor.set(1, 0);
            _this.otherButton2.events.onInputOut.add(_this.onOut, _this);
            _this.otherButton2.events.onInputOver.add(_this.onOver, _this);
            _this.add(_this.otherButton2);
            var btn1 = "";
            var btn2 = "";
            if (MagikMons.GameVars.gameData.language === MagikMons.GameConstants.ENGLISH) {
                btn1 = "btn_language_" + MagikMons.GameConstants.SPANISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.CATALAN + ".png";
                _this.otherButton1.name = MagikMons.GameConstants.SPANISH;
                _this.otherButton2.name = MagikMons.GameConstants.CATALAN;
            }
            else if (MagikMons.GameVars.gameData.language === MagikMons.GameConstants.SPANISH) {
                btn1 = "btn_language_" + MagikMons.GameConstants.ENGLISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.CATALAN + ".png";
                _this.otherButton1.name = MagikMons.GameConstants.ENGLISH;
                _this.otherButton2.name = MagikMons.GameConstants.CATALAN;
            }
            else if (MagikMons.GameVars.gameData.language === MagikMons.GameConstants.CATALAN) {
                btn1 = "btn_language_" + MagikMons.GameConstants.SPANISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.ENGLISH + ".png";
                _this.otherButton1.name = MagikMons.GameConstants.SPANISH;
                _this.otherButton2.name = MagikMons.GameConstants.ENGLISH;
            }
            _this.otherButton1.setFrames(btn1, btn1, btn1);
            _this.otherButton2.setFrames(btn2, btn2, btn2);
            return _this;
        }
        LanguagesLayer.prototype.onLanguageButtonClicked = function () {
            MagikMons.AudioManager.playSound("click_btn");
            if (!this.otherButton1.visible) {
                this.otherButton1.visible = true;
                this.otherButton2.visible = true;
                this.arrow.visible = false;
            }
            else {
                this.otherButton1.visible = false;
                this.otherButton2.visible = false;
                this.arrow.visible = true;
            }
        };
        LanguagesLayer.prototype.onOtherButtonClicked = function (btn) {
            MagikMons.AudioManager.playSound("click_btn");
            MagikMons.GameManager.setLanguage(btn.name);
            MagikMons.SplashState.currentInstance.resetSlots();
            this.languageButton.name = btn.name;
            this.languageButton.setFrames("btn_language_" + btn.name + ".png", "btn_language_" + btn.name + ".png", "btn_language_" + btn.name + ".png");
            var btn1 = "";
            var btn2 = "";
            if (btn.name === MagikMons.GameConstants.ENGLISH) {
                btn1 = "btn_language_" + MagikMons.GameConstants.SPANISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.CATALAN + ".png";
                this.otherButton1.name = MagikMons.GameConstants.SPANISH;
                this.otherButton2.name = MagikMons.GameConstants.CATALAN;
            }
            else if (btn.name === MagikMons.GameConstants.SPANISH) {
                btn1 = "btn_language_" + MagikMons.GameConstants.ENGLISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.CATALAN + ".png";
                this.otherButton1.name = MagikMons.GameConstants.ENGLISH;
                this.otherButton2.name = MagikMons.GameConstants.CATALAN;
            }
            else if (btn.name === MagikMons.GameConstants.CATALAN) {
                btn1 = "btn_language_" + MagikMons.GameConstants.SPANISH + ".png";
                btn2 = "btn_language_" + MagikMons.GameConstants.ENGLISH + ".png";
                this.otherButton1.name = MagikMons.GameConstants.SPANISH;
                this.otherButton2.name = MagikMons.GameConstants.ENGLISH;
            }
            this.otherButton1.setFrames(btn1, btn1, btn1);
            this.otherButton2.setFrames(btn2, btn2, btn2);
            this.otherButton1.visible = false;
            this.otherButton2.visible = false;
            this.arrow.visible = true;
        };
        LanguagesLayer.prototype.onOut = function (btn) {
            btn.scale.set(1);
        };
        LanguagesLayer.prototype.onOver = function (btn) {
            btn.scale.set(1.05);
        };
        return LanguagesLayer;
    }(Phaser.Group));
    MagikMons.LanguagesLayer = LanguagesLayer;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var Slot = (function (_super) {
        __extends(Slot, _super);
        function Slot(game, x, y, id) {
            var _this = _super.call(this, game, null, "slot") || this;
            _this.id = id;
            _this.leavingScene = false;
            _this.erasing = false;
            _this.fixedToCamera = true;
            _this.scale.y = MagikMons.GameVars.scaleY;
            _this.slotContainer = new Phaser.Group(_this.game);
            _this.slotContainer.x = x;
            _this.slotContainer.y = y;
            _this.add(_this.slotContainer);
            _this.image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "btn_slot_save.png");
            _this.image.inputEnabled = true;
            _this.image.input.pixelPerfectClick = true;
            _this.image.input.pixelPerfectOver = true;
            _this.image.input.useHandCursor = true;
            _this.image.events.onInputDown.add(_this.onClickImage, _this);
            _this.image.events.onInputOut.add(_this.onOut, _this);
            _this.image.events.onInputOver.add(_this.onOver, _this);
            _this.image.anchor.set(.5);
            _this.slotContainer.add(_this.image);
            if (MagikMons.GameVars.gameData.currentSlot === id && MagikMons.GameVars.gameData.slotsData[id].state !== MagikMons.GameConstants.INITIAL_BUS) {
                _this.image.frameName = "btn_slot_save_on.png";
            }
            _this.erase = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "btn_slot_erase.png");
            _this.erase.anchor.set(.5);
            _this.erase.inputEnabled = true;
            _this.erase.input.pixelPerfectClick = true;
            _this.erase.input.pixelPerfectOver = true;
            _this.erase.input.useHandCursor = true;
            _this.erase.events.onInputDown.add(_this.onClickErase, _this);
            _this.erase.events.onInputOut.add(_this.onOutErase, _this);
            _this.erase.events.onInputOver.add(_this.onOverErase, _this);
            _this.slotContainer.add(_this.erase);
            _this.text = new Phaser.Text(_this.game, 0, 5, MagikMons.GameVars.names["NEW GAME"], { font: "15px Chewy", fill: "#022c3b", align: "center" });
            _this.text.lineSpacing = -5;
            _this.text.anchor.set(.5);
            _this.slotContainer.add(_this.text);
            if (MagikMons.GameVars.gameData.slotsData[id].state === MagikMons.GameConstants.INITIAL_BUS) {
                _this.erase.visible = false;
            }
            else {
                _this.text.fill = "#ffffff";
                _this.text.fontSize = "13px";
                _this.text.text = MagikMons.GameVars.names["CONTINUE"] + "\n" + MagikMons.GameVars.chaptersTexts[MagikMons.GameVars.gameData.slotsData[id].mapName + " title"];
            }
            return _this;
        }
        Slot.prototype.onClickImage = function () {
            var _this = this;
            if (this.leavingScene) {
                return;
            }
            MagikMons.AudioManager.playSound("click_btn");
            this.leavingScene = true;
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.commercialBreak().then(function () {
                    MagikMons.GameManager.slotSelected(_this.id);
                });
            }
            else {
                MagikMons.GameManager.slotSelected(this.id);
            }
        };
        Slot.prototype.onClickErase = function () {
            if (this.erasing) {
                return;
            }
            MagikMons.AudioManager.playSound("click_btn");
            this.erasing = true;
            MagikMons.GameManager.eraseSlot(this.id);
        };
        Slot.prototype.onOut = function () {
            this.slotContainer.scale.set(1);
        };
        Slot.prototype.onOver = function () {
            this.slotContainer.scale.set(1.05);
            MagikMons.SplashState.currentInstance.world.bringToTop(this);
        };
        Slot.prototype.onOutErase = function () {
            this.erase.scale.set(1);
        };
        Slot.prototype.onOverErase = function () {
            this.erase.scale.set(1.05);
            MagikMons.SplashState.currentInstance.world.bringToTop(this);
        };
        return Slot;
    }(Phaser.Group));
    MagikMons.Slot = Slot;
})(MagikMons || (MagikMons = {}));
var MagikMons;
(function (MagikMons) {
    var SplashState = (function (_super) {
        __extends(SplashState, _super);
        function SplashState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplashState.prototype.init = function () {
            SplashState.currentInstance = this;
            MagikMons.GameManager.resetMapVars();
        };
        SplashState.prototype.create = function () {
            this.count = 0;
            var backgroundSplash = new MagikMons.BackgroundSplash(this.game);
            this.add.existing(backgroundSplash);
            this.backgroundSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(MagikMons.GameConstants.DARK_BLUE_SQUARE));
            this.backgroundSprite.fixedToCamera = true;
            this.backgroundSprite.scale.set(MagikMons.GameConstants.GAME_WIDTH / MagikMons.GameConstants.BITMAPDATA_SIZE, MagikMons.GameConstants.GAME_HEIGHT / MagikMons.GameConstants.BITMAPDATA_SIZE);
            this.backgroundSprite.alpha = .6;
            this.add.existing(this.backgroundSprite);
            this.creditsButton = new Phaser.Button(this.game, 5, 5, "texture_atlas_1", this.onCreditsButtonClicked, this);
            this.creditsButton.setFrames("btn_credits.png", "btn_credits.png", "btn_credits.png");
            this.creditsButton.forceOut = true;
            this.creditsButton.fixedToCamera = true;
            this.creditsButton.scale.y = MagikMons.GameVars.scaleY;
            this.creditsButton.events.onInputOut.add(this.onOut, this);
            this.creditsButton.events.onInputOver.add(this.onOver, this);
            this.add.existing(this.creditsButton);
            var midContainer = new Phaser.Group(this.game);
            midContainer.fixedToCamera = true;
            midContainer.scale.y = MagikMons.GameVars.scaleY;
            this.add.existing(midContainer);
            this.gameImage = new Phaser.Image(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, (MagikMons.GameConstants.GAME_HEIGHT / 2 - 20) / MagikMons.GameVars.scaleY, "texture_atlas_2", "splash_image.png");
            this.gameImage.anchor.set(.5);
            midContainer.add(this.gameImage);
            this.titleContainer = new Phaser.Group(this.game);
            this.titleContainer.x = MagikMons.GameConstants.GAME_WIDTH / 2;
            this.titleContainer.y = this.gameImage.y - this.gameImage.height / 2 + 40;
            this.titleContainer.scale.set(0);
            midContainer.add(this.titleContainer);
            this.gameTitle2 = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "title_on.png");
            this.gameTitle2.anchor.set(.5);
            this.gameTitle2.tint = 0xabeafd;
            this.titleContainer.add(this.gameTitle2);
            var containerLogo = new Phaser.Group(this.game);
            containerLogo.x = 105;
            containerLogo.y = -10;
            containerLogo.scale.x = .75;
            this.titleContainer.add(containerLogo);
            this.titleLogo = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "title_logo.png");
            this.titleLogo.anchor.set(.5);
            containerLogo.add(this.titleLogo);
            this.gameTitle1 = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "title_magikm.png");
            this.gameTitle1.anchor.set(.5);
            this.gameTitle1.tint = 0xabeafd;
            this.titleContainer.add(this.gameTitle1);
            this.languagesLayer = new MagikMons.LanguagesLayer(this.game);
            this.add.existing(this.languagesLayer);
            this.audioButton = new Phaser.Button(this.game, MagikMons.GameConstants.GAME_WIDTH - 5, 5, "texture_atlas_1", this.onAudioButtonClicked, this);
            this.audioButton.anchor.set(1, 0);
            this.audioButton.forceOut = true;
            this.audioButton.fixedToCamera = true;
            this.audioButton.scale.y = MagikMons.GameVars.scaleY;
            this.audioButton.events.onInputOut.add(this.onOut, this);
            this.audioButton.events.onInputOver.add(this.onOver, this);
            this.add.existing(this.audioButton);
            if (MagikMons.GameVars.gameData.muted) {
                this.audioButton.setFrames("btn_sound_off.png", "btn_sound_off.png", "btn_sound_off.png");
            }
            else {
                this.audioButton.setFrames("btn_sound_on.png", "btn_sound_on.png", "btn_sound_on.png");
            }
            this.slot1 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 155, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 0);
            this.add.existing(this.slot1);
            this.slot2 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 1);
            this.add.existing(this.slot2);
            this.slot3 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2 + 155, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 2);
            this.add.existing(this.slot3);
            MagikMons.AudioManager.playSound("music_map", true, 1, true);
            this.titleAnimation();
        };
        SplashState.prototype.shutdown = function () {
            SplashState.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        SplashState.prototype.resetSlots = function () {
            this.stage.removeChild(this.slot1);
            this.stage.removeChild(this.slot2);
            this.stage.removeChild(this.slot3);
            this.slot1.destroy();
            this.slot2.destroy();
            this.slot3.destroy();
            this.slot1 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2 - 155, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 0);
            this.add.existing(this.slot1);
            this.slot2 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 1);
            this.add.existing(this.slot2);
            this.slot3 = new MagikMons.Slot(this.game, MagikMons.GameConstants.GAME_WIDTH / 2 + 155, (MagikMons.GameConstants.GAME_HEIGHT - 50) / MagikMons.GameVars.scaleY, 2);
            this.add.existing(this.slot3);
        };
        SplashState.prototype.titleAnimation = function () {
            this.game.add.tween(this.titleContainer.scale)
                .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Back.Out, true, 2000)
                .onStart.add(function () {
            }, this);
            this.game.time.events.add(2000, function () {
                this.game.time.events.loop(1300, function () {
                    this.game.add.tween(this.titleContainer.scale)
                        .to({ x: .97, y: .97 }, 200, Phaser.Easing.Cubic.Out, true)
                        .onComplete.add(function () {
                        if (this.count === 0) {
                            this.count++;
                            this.gameTitle1.tint = 0xB562FE;
                            this.gameTitle2.tint = 0xB562FE;
                        }
                        else if (this.count === 1) {
                            this.count++;
                            this.gameTitle1.tint = 0xfe8b01;
                            this.gameTitle2.tint = 0xfe8b01;
                        }
                        else if (this.count === 2) {
                            this.count = 0;
                            this.gameTitle1.tint = 0x01f0d8;
                            this.gameTitle2.tint = 0x01f0d8;
                        }
                        this.game.add.tween(this.titleContainer.scale)
                            .to({ x: 1, y: 1 }, 400, Phaser.Easing.Back.Out, true);
                    }, this);
                    this.game.add.tween(this.titleLogo)
                        .to({ angle: this.titleLogo.angle + 120 }, 600, Phaser.Easing.Back.Out, true)
                        .onComplete.add(function () {
                    }, this);
                }, this);
            }, this);
        };
        SplashState.prototype.hide = function (slot) {
            if (MagikMons.GameConstants.SPONSOR === MagikMons.GameConstants.POKI) {
                PokiSDK.gameplayStart();
            }
            this.game.add.tween(this.backgroundSprite)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.audioButton)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.creditsButton)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.titleContainer)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.gameImage)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.slot1)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.slot2)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.slot3)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.languagesLayer)
                .to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function () {
                this.game.state.start("MapState", true, false);
            }, this);
        };
        SplashState.prototype.onAudioButtonClicked = function () {
            if (MagikMons.GameVars.gameData.muted) {
                MagikMons.AudioManager.unmute();
                this.audioButton.setFrames("btn_sound_on.png", "btn_sound_on.png", "btn_sound_on.png");
            }
            else {
                MagikMons.AudioManager.mute();
                this.audioButton.setFrames("btn_sound_off.png", "btn_sound_off.png", "btn_sound_off.png");
            }
            MagikMons.AudioManager.playSound("click_btn");
            MagikMons.GameManager.writeGameData();
        };
        SplashState.prototype.onCreditsButtonClicked = function () {
            this.creditsLayer = new MagikMons.CreditsLayer(this.game);
            this.add.existing(this.creditsLayer);
            this.world.bringToTop(this.creditsLayer);
        };
        SplashState.prototype.onOut = function (btn) {
            btn.scale.set(1, MagikMons.GameVars.scaleY);
        };
        SplashState.prototype.onOver = function (btn) {
            btn.scale.set(1.05, 1.05 * MagikMons.GameVars.scaleY);
        };
        return SplashState;
    }(Phaser.State));
    MagikMons.SplashState = SplashState;
})(MagikMons || (MagikMons = {}));
//# sourceMappingURL=magikmons.min.js.map