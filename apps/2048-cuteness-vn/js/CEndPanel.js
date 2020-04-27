function CEndPanel(iScore){
    var _oBg;
    var _oButExit;
    var _oButRestart;
    var _oMsgText;
    var _oThis;

    var _oContainer;
    
    this._init = function(iScore){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_end_panel"));
        _oContainer.addChild(_oBg);

        _oMsgText = new createjs.Text(TEXT_END_PANEL+": "+iScore, "54px " + PRIMARY_FONT, "#8ce5e6");
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
	_oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = CANVAS_HEIGHT/2;
	_oContainer.addChild(_oMsgText);
        
        _oButExit = new CGfxButton(CANVAS_WIDTH/2 - 180, 900, s_oSpriteLibrary.getSprite('but_home'), _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        
        _oButRestart = new CGfxButton(CANVAS_WIDTH/2 + 180, 900, s_oSpriteLibrary.getSprite('but_restart'), _oContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
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
    
    _oThis = this;
    this._init(iScore);
}