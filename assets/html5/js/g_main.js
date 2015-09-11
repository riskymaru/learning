function set3(game,GBA){

	GBA.Environment  = function _Environment(game){
		Phaser.Group.call(this,game);
		self = this;
		var hotkey = game.input.keyboard.createCursorKeys();

		var bg = new GBA.BG(game);
		bg.x = 400;
		bg.y = 200;
		this.addChild(bg)

		var hero1 = new GBA.Hero(game,120,120);
		hero1.tbody.frameName = "hero20000"
		this.addChild(hero1)

		var hero2= new GBA.Hero(game,150,210);
		hero2.tbody.frameName = "hero20000"
		this.addChild(hero2)

		var hero3= new GBA.Hero(game,120,300);
		hero3.tbody.frameName = "hero20000"
		this.addChild(hero3)


		var enemy1 = new GBA.Hero(game,680,120);
		enemy1.tbody.frameName = "hero30000"
		enemy1.tbody.scale.x =-1
		this.addChild(enemy1)

		var enemy2= new GBA.Hero(game,650,210);
		enemy2.tbody.frameName = "hero30000"
		enemy2.tbody.scale.x =-1
		this.addChild(enemy2)

		var enemy3 = new GBA.Hero(game,680,300);
		enemy3.tbody.frameName = "hero30000"
		enemy3.tbody.scale.x =-1
		this.addChild(enemy3)

		/*this.update = function _update(){
			if(hotkey.left.isDown){
				hero.x -= 0.5
				hero.scale.x = -1
			}//
			if(hotkey.right.isDown){
				hero.x += 0.5
				hero.scale.x = 1
			}//
		}*/

		this.AttackMode = function atk(hero,tgt){
			if(hero!=undefined && tgt!=undefined){
				TweenMax.to(hero,0.2,{delay:0,x:tgt.x + (hero.tbody.scale.x== -1? 60 : -60 ),y:tgt.y,alpha:1,ease:Back.easeIn,startAt:{alpha:0},
					onComplete:function(){
						tgt.tbody.tint = "0xff0000"
						TweenMax.to(tgt,0.1,{x:tgt.x-3,yoyo:true,repeat:5,onComplete:function(){tgt.tbody.tint = "0xffffff";}});
					}});
				TweenMax.to(hero,0.1,{delay:2,x:hero._x,y:hero._y,ease:Back.easeOut});
			}
			trace(hero.pos)
		}

		var TL = new TimelineMax();
			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[hero1,enemy3])	); 
			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[hero2,enemy1])	); 
			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[hero3,enemy2])	); 

			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[enemy1,hero3])	); 
			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[enemy2,hero2])	); 
			TL.append(	TweenMax.delayedCall(4,this.AttackMode,[enemy3,hero1])	); 
	}
	GBA.Environment.prototype = Object.create(Phaser.Group.prototype);
    GBA.Environment.prototype.constructor = GBA.Environment;
    //-------------------------------------------------------------------------
    GBA.BG = function _BG(game){
         Phaser.Sprite.call(this,game,0,0,"");
  		 var layer1 = new Sprite(0,0,"bg1");
  		 this.addChild(layer1);
    };
    GBA.BG.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.BG.prototype.constructor = GBA.BG;
    //-------------------------------------------------------------------------
    GBA.Hero = function _Hero(game,_x,_y){
         Phaser.Sprite.call(this,game,0,0);
  		 this.tbody = new Sprite(0,0,"heroes")
  		 this.addChild(this.tbody);
  		 this.anchor.setTo(0.5,0.5)
  		 this.tbody.anchor.setTo(0.5,1)
  		 trace("###",_x,_y)
  		 this.pos = new Array();
  		 this._x = _x
  		 this._y = _y
  		 this.x = _x
  		 this.y = _y
  		 this.stat_bar = new GBA.STAT_BAR(game)
  		 this.stat_bar.y = -70
  		 this.addChild(this.stat_bar)
    };
    GBA.Hero.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Hero.prototype.constructor = GBA.Hero;
    //-------------------------------------------------------------------------
    GBA.STAT_BAR = function _STAT_BAR(game,_hp,_mp,_mhp,_mhp){
    	Phaser.Sprite.call(this,game,0,0);
    	var _mhp,_mmp;
    	this.hp_pool =_mhp
    	this.mp_pool = _mmp

	    this.hpbarbg = game.add.graphics(0,0)
		this.hpbarbg.lineStyle(2, 0x151515, 0.5);
		this.hpbarbg.beginFill(0x990000,1)
	    this.hpbarbg.drawRect(-25, 0,50,5);
	    this.addChild(this.hpbarbg);

	    this.mpbarbg = game.add.graphics(0,0)
		this.mpbarbg.lineStyle(2, 0x151515, 0.5);
		this.mpbarbg.beginFill(0x333333,1)
	    this.mpbarbg.drawRect(-25, 5,50,5);
	    this.addChild(this.mpbarbg);

    	this.hpbar = game.add.graphics(0,0)
		//this.hpbar.lineStyle(2, 0x151515, 0.5);
		this.hpbar.beginFill(0x33ff00,1)
	    this.hpbar.drawRect(-25, 0,10,5);
	    this.addChild(this.hpbar);

	    this.mpbar = game.add.graphics(0,0)
		//this.mpbar.lineStyle(2, 0x151515, 0.5);
		this.mpbar.beginFill(0x0066ff,1)
	    this.mpbar.drawRect(-25, 5,25,5);
	    this.addChild(this.mpbar);
    }
    GBA.STAT_BAR.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.STAT_BAR.prototype.constructor = GBA.STAT_BAR;

    	


    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
};

