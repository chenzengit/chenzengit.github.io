var Car=function(){var a={},e=.2;a.setSpeedPlan=function(a){},a.baseScale=.4,a.levelupScale=.035,a.baseRadius=40,a.radiusScale=a.baseRadius*a.levelupScale/a.baseScale,a.distort=function(a){Laya.Tween.to(a.animCanRot,{scaleX:1.1,scaleY:1.1},150,Laya.Ease.backInOut,Laya.Handler.create(null,function(){Laya.Tween.to(a.animCanRot,{scaleX:1,scaleY:1},150)}))},a.setLevelUpRate=function(){a.baseScale=.4,a.levelupScale=.8/Map1.numTotal,a.baseRadius=40,a.radiusScale=a.baseRadius*a.levelupScale/a.baseScale,e=3/Map1.numTotal},a.normalSpeed=function(a){return a===Map1.mainCar?(4.5+e*(a.level-1))*(1+(a.energy>=100?.4:0)):(4.5+e*(a.level-1)-(-1===User.rank1?1.125:0))*(1+(a.energy>=100?.4:0))},a.col=function(e,n){var t=1.7*a.normalSpeed(e),o=1.7*a.normalSpeed(n),l={x:t*Math.cos(e.dir*Math.PI/180),y:t*Math.sin(e.dir*Math.PI/180)},r={x:o*Math.cos(n.dir*Math.PI/180),y:o*Math.sin(n.dir*Math.PI/180)},i={x:n.x-e.x,y:n.y-e.y},d=V2.rot(i,90),s=V2.project(l,i),c=V2.project(r,i),h=V2.project(l,d),m=V2.project(r,d),y=V2.add(c,h),u=V2.add(s,m);e.speed=V2.getLength(y),n===Map1.mainCar&&-1===User.rank1&&(e.speed*=1.5),e.dir=V2.getAng(y),n.speed=V2.getLength(u),e===Map1.mainCar&&-1===User.rank1&&(n.speed*=1.5),n.dir=V2.getAng(u);gmath.trunkDir2(Math.abs(V2.getAng(l)-V2.getAng(i))>90)?e.stun=30:(e.stun=20,n.stun=20),gmath.trunkDir2(Math.abs(V2.getAng(r)-V2.getAng(i))<90)?n.stun=30:(e.stun=20,n.stun=20);var g=!0;e.energy>=100?(n.energy<100&&(n.speed+=12,n.tailCount=20),e.speed=Car.normalSpeed(e),e.energy=0,Effect.play("energyBoom",{x:e.x-112,y:e.y-110})):(g=!1,Car.addEnergy(e,15)),n.energy>=100?(!1===g&&(e.speed+=12,e.tailCount=20),n.speed=Car.normalSpeed(n),n.energy=0,Effect.play("energyBoom",{x:n.x-112,y:n.y-110})):Car.addEnergy(n,15)},a.showBound=function(a){a.energyBound.visible=!0},a.hideBound=function(a){a.energyBound.visible=!1};var n=["doubleKill","tripleKill","quadrakill","pentakill"],t=["killingSpree","rampage","unstoppddable","legendary"];a.kill=function(a,e){a.killCombo=Math.min(a.killCombo+1,6);var o=[];a.killCombo>=3?o.push(t[a.killCombo-3]):o.push("kill"),a.killTimer>0?(a.killCombo2=Math.min(a.killCombo2+1,5),a.killCombo2>=2&&o.push(n[a.killCombo2-2])):a.killCombo2=1,0!==o.length&&Game2.showKill(a.photo.skin,a.name.text,e.photo.skin,e.name.text,o),a.killTimer=300},a.reset=function(e,n){if(e.level=1,e.tailCount=0,e.showTailCount=0,e.speed=4.5,e.stun=0,e.aiCounter=60+Math.floor(60*Math.random()),e.forbidTurnCounter=0,e.lastHit=null,e.anim.scaleX=a.baseScale,e.anim.scaleY=a.baseScale,e.anim.visible=!0,e.dead=!1,e.energy=0,e.energyBound.visible=!1,e.killCombo=0,e.killTimer=0,e.killCombo2=0,void 0!==n&&(e.dir=gmath.trunkDir(180*n/Math.PI+180),e.animCanRot.rotation=e.dir),e===Map1.mainCar);else{var n=Math.floor(Math.random()*getDataLength("ai")),t=Math.floor(Math.random()*getDataLength("country"));e.name.text=getData("ai",1+n).name,e.country.skin="cars/"+getData("country",1+t).name+".png",a.setSkin(e,1+Math.floor(36*Math.random()),1+Math.floor(5*Math.random()))}},a.setSkin=function(e,n,t){var o=getData("cars",n);e.body.skin="cars/"+o.skin+".png",e.tailName=o.tail,e.shadow.skin="cars/"+o.shadow+".png",a.syncShadow(e)},a.setMain=function(a){var e=new Laya.Image;a.sign=e,e.skin="ui/ang.png",e.x=90,e.anchorY=.5,e.anchorX=0,a.country.visible=!1,a.name.text="",a.photo.skin=User.photo,a.animCanRot.addChild(e)},a.levelUp=function(n,t){if(n===Map1.mainCar){var o=new Laya.Label;o.text="+"+t,o.fontSize=70,o.x=320,o.y=640,o.align="center",o.width=200,o.color="#ffffff",o.stroke=5,Laya.stage.addChild(o),Laya.Tween.to(o,{y:340,alpha:.7},2500,null,Laya.Handler.create(null,function(){o.destroy()})),Game2.kill(),User.kills+=1}n.level+=t,n.speed+=e*t,Laya.Tween.to(n.anim,{scaleX:1.2*(a.baseScale+(n.level-1)*a.levelupScale),scaleY:1.2*(a.baseScale+(n.level-1)*a.levelupScale)},500,Laya.Ease.backInOut,Laya.Handler.create(null,function(){Laya.Tween.to(n.anim,{scaleX:a.baseScale+(n.level-1)*a.levelupScale,scaleY:a.baseScale+(n.level-1)*a.levelupScale},400)}))},a.addEnergy=function(a,e){a.energy<100&&a.energy+e>=100&&a===Map1.mainCar&&Laya.SoundManager.playSound("sounds/energy.mp3",1),a.energy+=e,a.energy>=100?(a.energy=100,a.energyBound.visible=!0):a.energyBound.visible=!1,a===Map1.mainCar&&Game2.setEnergy(a.energy/100)};return a.syncShadow=function(a){var e=(225-a.animCanRot.rotation)*Math.PI/180;a.shadow.x=30*Math.cos(e),a.shadow.y=30*Math.sin(e)},a.create=function(){var e={};e.level=1,e.dir=0,e.stun=0,e.speed=4.5,e.anim=new Laya.Sprite,e.animCanRot=new Laya.Sprite,e.animCanNotRot=new Laya.Sprite,e.x=0,e.y=0,e.avatar=new Laya.Sprite,e.anim.addChild(e.animCanRot),e.anim.addChild(e.animCanNotRot),e.animCanRot.addChild(e.avatar),e.body=new Laya.Image,e.body.skin="cars/b_hull_1.png",e.avatar.addChild(e.body),e.body.anchorX=.5,e.body.anchorY=.5,e.mark=new Laya.Image,e.mark.anchorX=.5,e.mark.anchorY=.5,e.mark.scale(.5,.5),e.mark.y=60,e.mark.visible=!1,e.avatar.addChild(e.mark),e.tail=new Laya.Image,e.tail.anchorX=.5,e.tail.anchorY=.5,e.tail.y=-100,e.avatar.addChild(e.tail),e.shadow=new Laya.Image,e.shadow.anchorX=.5,e.shadow.anchorY=.5,e.avatar.addChildAt(e.shadow,0),e.photo=new Laya.Image,e.photo.anchorX=.5,e.photo.anchorY=.5,e.photo.width=60,e.photo.height=60;var n=new Laya.Image;return n.skin="cars/bc_shabe.png",n.width=60,n.height=60,e.photo.mask=n,e.photo.skin="res/jpgs/3.jpg",e.avatar.addChild(e.photo),e.avatar.rotation=-90,Scene.carLayer.addChild(e.anim),e.tail,e.name=new Laya.Label,e.name.y=-160,e.name.x=-60,e.name.width=200,e.name.fontSize=50,e.name.align="center",e.name.color="#eeeeee",e.name.stroke=5,e.animCanNotRot.addChild(e.name),e.country=new Laya.Image,e.anchorX=.5,e.anchorY=.5,e.country.y=-160,e.country.x=-110,e.energyBound=new Laya.Animation,e.energyBound.play(0,!0,"zhaozi"),e.energyBound.pivot(120,118),e.energyBound.scale(1.2,1.2),e.avatar.addChild(e.energyBound,0),e.animCanNotRot.addChild(e.country),a.reset(e),e},a}();