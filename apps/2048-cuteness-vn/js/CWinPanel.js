function CWinPanel(){
    
    var _oBg;
    var _oButExit;
    var _oButRestart;
    var _oButContinue;
    var _oMsgText;
    var _oThis;

    var _oContainer;
    
    this._init = function(iScore){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_end_panel"));
        _oContainer.addChild(_oBg);

        _oMsgText = new createjs.Text(TEXT_CONGRATS + " " + GOAL_NUMBER + "!", "74px " + PRIMARY_FONT, "#8ce5e6");
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 500;
	_oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = CANVAS_HEIGHT/2 ;
	_oContainer.addChild(_oMsgText);
        
        _oButExit = new CGfxButton(CANVAS_WIDTH/2 - 200, 900, s_oSpriteLibrary.getSprite('but_home'), _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _oButRestart = new CGfxButton(CANVAS_WIDTH/2, 900, s_oSpriteLibrary.getSprite('but_restart'), _oContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        _oButContinue = new CGfxButton(CANVAS_WIDTH/2 + 200, 900, s_oSpriteLibrary.getSprite('but_continue'), _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onContinue, this);
        
        _oContainer.alpha = 0;
	new createjs.Tween.get(_oContainer).to({alpha:1},500).call(function(){$(s_oMain).trigger("show_interlevel_ad");});	
    };
    
    this.unload = function(){
        _oButExit.unload(); 
        _oButExit = null;

        _oButRestart.unload();
        _oButRestart = null;
        
        s_oStage.removeChild(_oContainer);
    };
    
    this._onExit = function(){
        _oThis.unload();
        s_oMain.gotoMenu();
    };
    
    this._onRestart = function(){
        _oThis.unload();
        s_oGame.restart();
    };
    
    this._onContinue = function(){
        _oThis.unload();
        s_oGame.resumeGame();
    };
    
    _oThis = this;
    this._init();
    
}