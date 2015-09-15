function set3(game,GBA){

	GBA.UNIT = new Array();

	GBA.Environment  = function _Environment(game){
		Phaser.Group.call(this,game);
		self = this;

		//set up character position
		var ypos = [130,210,300]
		var xpos = [80,650]

		var whosturn = new Array();
		var whostgt = new Array(); // enemy will attack this targets
	
		//set keyboard
		var hotkey = game.input.keyboard.createCursorKeys();

		var set1 = new Array()
		var set2 = new Array();

		set1 = [0,1,2]
		set2 = [1,0,1]

		var bg = new GBA.BG(game);
		bg.x = 400;
		bg.y = 200;
		this.addChild(bg)

		this.hud = new GBA.HUD(game,set1,set2)
		this.addChild(this.hud)

		var hero = new Array();
			if(set1.length>0){
					for(k=0;k<set1.length;k++){
						hero[k] = new GBA.Hero(game,k==0? 120 : xpos[0],ypos[k],set1[k]);
						hero[k].stat_bar = this.hud.bars1[k]
						this.addChild(hero[k])
					}
			}

		var enemy = new Array();
			if(set2.length>0){
					for(k=0;k<set2.length;k++){
						enemy[k] = new GBA.Enemy(game,k==0? 610 : xpos[1],ypos[k],set2[k]);
						enemy[k].tbody.scale.x =-1
						this.addChild(enemy[k])
					}
			}

		this.cursor = new Sprite(200,200,"hero_icon");
		this.addChild(this.cursor);

		//---------------------------------------------------------------------------
		//functions

		whosturn = hero.concat(enemy);

		function compare(a,b) {
		  if (a.spd < b.spd)
		    return -1;
		  if (a.spd > b.spd)
		    return 1;
		  return 0;
		}


		whosturn.sort(compare);	


		var nm = whosturn.length
		for(k=0;k<nm;k++){
			trace(whosturn[k].role )
			if(whosturn[k].role == "enemy"){
				whostgt.push(hero[parseInt(Math.random()*hero.length)])
			}else{
				whostgt.push(enemy[2]);
			}
		}


		this.AttackMode = function atk(hero,tgt,type){
			//type 0 is melee//type 1 range//type 2 melee special//type 3 = range special
			type==undefined? type = 0 : 0
			
			//melee
			if(hero!=undefined && tgt!=undefined && type == 0){
				TweenMax.to(hero,0.2,{delay:0,x:tgt.x + (hero.tbody.scale.x== -1? 60 : -60 ),y:tgt.y,alpha:1,ease:Back.easeIn,startAt:{alpha:0},
					onComplete:function(){
						tgt.hp -= 5
						tgt.stat_bar.updateStat(tgt.hp,tgt.fhp,tgt.mp,tgt.fmp)

						tgt.tbody.tint = "0xff0000"
						TweenMax.to(tgt,0.1,{x:tgt.x-3,yoyo:true,repeat:5,onComplete:function(){tgt.tbody.tint = "0xffffff";}});
					}});
				TweenMax.to(hero,0.1,{delay:2,x:hero._x,y:hero._y,ease:Back.easeOut});
			}else 
			//range
			if(hero!=undefined && tgt!=undefined && type == 1){
				TweenMax.to(hero,0.3,{delay:0,alpha:1,ease:Back.easeIn,startAt:{alpha:0},
					onComplete:function(){
						tgt.hp -= 5
						tgt.stat_bar.updateStat(tgt.hp,tgt.fhp,tgt.mp,tgt.fmp)

						tgt.tbody.tint = "0xff0000"
						TweenMax.to(tgt,0.1,{x:tgt.x-3,yoyo:true,repeat:5,onComplete:function(){tgt.tbody.tint = "0xffffff";}});
					}});
				TweenMax.to(hero,0.1,{delay:2,ease:Back.easeOut});
			}
		}//<AttackMode

			var TL = new TimelineMax();

			for(k=0;k<whosturn.length;k++){
				TL.append(	TweenMax.delayedCall(3,this.AttackMode,[whosturn[k],whostgt[k],whosturn[k].ftype])	); 
			}

			TL.repeat(1)


		return this;
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
    GBA.Hero = function _Hero(game,_x,_y,unit){
         Phaser.Sprite.call(this,game,0,0);
  		 this.tbody = new Sprite(0,0,"heroes")
  		 this.addChild(this.tbody);
  		 this.anchor.setTo(0.5,0.5)
  		 this.tbody.anchor.setTo(0.5,1)
  		 this.pos = new Array();
  		 this._x = _x
  		 this._y = _y
  		 this.x = _x
  		 this.y = _y
  		 this.role = "hero"

  		 this.hp = GBA.UNIT[unit].hp
  		 this.fhp = GBA.UNIT[unit].fhp
  		 this.mp = GBA.UNIT[unit].mp
  		 this.fmp = GBA.UNIT[unit].fmp
  		 this.spd = GBA.UNIT[unit].spd
  		 this.ailments = GBA.UNIT[unit].ailments
  		 this.ftype = GBA.UNIT[unit].ftype

  		 this.unit = 
  		 this.tbody.frameName = "hero"+(unit+1)+"0000"

  		 this.stat_bar = {};
  		 /*this.stat_bar = new GBA.STAT_BAR(game)
  		 this.stat_bar.y = -70
  		 this.addChild(this.stat_bar)*/
    };
    GBA.Hero.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Hero.prototype.constructor = GBA.Hero;
    //-------------------------------------------------------------------------
    GBA.Enemy = function _Enemy(game,_x,_y,unit){
         Phaser.Sprite.call(this,game,0,0);
  		 this.tbody = new Sprite(0,0,"heroes")
  		 this.addChild(this.tbody);
  		 this.anchor.setTo(0.5,0.5)
  		 this.tbody.anchor.setTo(0.5,1)
  		 this.pos = new Array();
  		 this._x = _x
  		 this._y = _y
  		 this.x = _x
  		 this.y = _y
  		 this.role = "enemy"

  		 this.hp = GBA.UNIT[unit].hp
  		 this.fhp = GBA.UNIT[unit].fhp
  		 this.mp = GBA.UNIT[unit].mp
  		 this.fmp = GBA.UNIT[unit].fmp
  		 this.spd = GBA.UNIT[unit].spd
  		 this.ailments = GBA.UNIT[unit].ailments
  		 this.ftype = GBA.UNIT[unit].ftype


  		 this.tbody.frameName = "hero"+(unit+1)+"0000"

  		 this.stat_bar = new GBA.STAT_BAR(game,GBA.UNIT[unit].hp,
	    									   GBA.UNIT[unit].fhp,
	    									   GBA.UNIT[unit].mp,
	    									   GBA.UNIT[unit].fmp)
  		 this.stat_bar.y = -70
  		 this.stat_bar.x = -25
  		 this.addChild(this.stat_bar)
    };
    GBA.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Enemy.prototype.constructor = GBA.Enemy;
    //-------------------------------------------------------------------------
    GBA.STAT_BAR = function _STAT_BAR(game,_hp,_fhp,_mp,_fmp,mini){
    	Phaser.Sprite.call(this,game,0,0);
		
		var box_width = (mini != undefined ?  80 : 50)
		var box_height = (mini != undefined ?  20 : 5)
    	var _mhp,_mmp;//full_hp & full_mp

    	this.mini = mini

    	this.hp_pool =_fhp
    	this.mp_pool = _fmp

    	this.cur_hp = _hp
    	this.cur_mp = _mp

    	if(mini != undefined){
    		this.icon = new Sprite(-20,10,"hero_icon");
    		this.addChild(this.icon)
    	}

	    this.hpbarbg = game.add.graphics(0,0)
		this.hpbarbg.lineStyle(2, 0x151515, 0.5);
		this.hpbarbg.beginFill(0x990000,1)
	    this.hpbarbg.drawRect(0, 0,box_width,box_height);
	    this.addChild(this.hpbarbg);

	    this.mpbarbg = game.add.graphics(0,0)
		this.mpbarbg.lineStyle(2, 0x151515, 0.5);
		this.mpbarbg.beginFill(0x333333,1)
	    this.mpbarbg.drawRect(0, box_height,box_width,box_height);
	    this.addChild(this.mpbarbg);

	    //status bars
    	this.hpbar = game.add.graphics(0,0)
		//this.hpbar.lineStyle(2, 0x151515, 0.5);
		this.hpbar.beginFill(0x33bb00,1)
	    this.hpbar.drawRect(0, 0,box_width,box_height);
	    this.addChild(this.hpbar);

	    this.mpbar = game.add.graphics(0,0)
		//this.mpbar.lineStyle(2, 0x151515, 0.5);
		this.mpbar.beginFill(0x0066ff,1)
	    this.mpbar.drawRect(0, box_height,box_width,box_height);
	    this.addChild(this.mpbar);

	    //shadow
	    this.hpbar_shadow = game.add.graphics(0,0)
		//this.hpbar_shadow.lineStyle(2, 0x151515, 0.5);
		this.hpbar_shadow.beginFill(0xffffff,1)
	    this.hpbar_shadow.drawRect(0, 0,box_width,box_height);
	    this.hpbar_shadow.alpha = 0.2
	    this.addChild(this.hpbar_shadow);

	    this.mpbar_shadow = game.add.graphics(0,0)
		//this.mpbar_shadow.lineStyle(2, 0x151515, 0.5);
		this.mpbar_shadow.beginFill(0xffffff,1)
	    this.mpbar_shadow.drawRect(0, box_height,box_width,box_height);
	    this.mpbar_shadow.alpha = 0.2
	    this.addChild(this.mpbar_shadow);

	    //text
	   if( mini!= undefined ){
		    this.hp_txt =  new TextField(game,_hp+"/"+_fhp,0,5,"flappy",12,false);//_TextField(game,str,w,h,style,sz,border){
		    this.hp_txt.x = 4
		    this.addChild(this.hp_txt);

		    this.mp_txt =  new TextField(game,_mp+"/"+_fmp,0,50,"flappy",12,false);//_TextField(game,str,w,h,style,sz,border){
		    this.mp_txt.x = 4 
		    this.addChild(this.mp_txt);
		}

	    this.updateStat = function _updateStat(_hp,_fhp,_mp,_fmp){
	    	this.hpbar.width = ((_hp/_fhp)*box_width <=0 ? 0 : (_hp/_fhp)*box_width	) 
	    	this.mini!= undefined ? this.hp_txt.text.setText(_hp+"/"+_fhp) : 0
	    	this.mpbar.width = ((_mp/_fmp)*box_width <=0 ? 0 : (_mp/_fmp)*box_width	) 
	    	this.mini!= undefined ? this.mp_txt.text.setText(_mp+"/"+_fmp) : 0
	    }

	    this.updateStat(_hp,_fhp,_mp,_fmp);
    }
    GBA.STAT_BAR.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.STAT_BAR.prototype.constructor = GBA.STAT_BAR;

    
    //-------------------------------------------------------------------------
    GBA.HUD = function _HUD(game,g1,g2){
    	Phaser.Sprite.call(this,game,0,0);

    	this.bars1 = new Array();

    	this.btn = new Array();

    	if(g1.length>0){
	    		for(h=0;h<g1.length;h++){
				    	this.bars1[h] = new GBA.STAT_BAR(game,GBA.UNIT[g1[h]].hp,
				    									GBA.UNIT[g1[h]].fhp,
				    									GBA.UNIT[g1[h]].mp,
				    									GBA.UNIT[g1[h]].fmp,true)
			  			this.bars1[h].y = 340
			  			this.bars1[h].x = 55 + (120*h)
			  			this.addChild(this.bars1[h])
	  			}
  		}

  		for(b=0;b<4;b++){
  			this.btn[b] = new Sprite(500 +(80*b),360,"btn");
  			this.addChild(this.btn[b]);
  		}

  		return this;
    }
    GBA.HUD.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.HUD.prototype.constructor = GBA.HUD;
    //-------------------------------------------------------------------------

    GBA.MENU = function _MENU(game){
    	Phaser.Sprite.call(this,game,0,0);

  		return this;
    }
    GBA.MENU.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.MENU.prototype.constructor = GBA.MENU;
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
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------


    //UNITS
    //hero1
    GBA.UNIT[0] = {
		hp:20,
		fhp:20,
		mp:10,
		fmp:10,
		atk:4,
		mgc:2,
		def:1,
		res:5,
		spd:10,
		ailments:"normal",
		ftype:0,
		lvl:2,
		

	};
	//hero 2
	GBA.UNIT[1] = {
		hp:24,
		fhp:24,
		mp:3,
		fmp:3,
		atk:6,
		mgc:2,
		def:3,
		res:5,
		spd:6,
		ailments:"normal",
		ftype:0,
		lvl:2,
		
	};

	//blob
	GBA.UNIT[2] = {
		hp:24,
		fhp:24,
		mp:3,
		fmp:3,
		atk:6,
		mgc:2,
		def:3,
		res:5,
		spd:24,
		ailments:"normal",
		ftype:0,
		lvl:2,
	};

	//blob
	GBA.UNIT[3] = {
		hp:24,
		fhp:24,
		mp:3,
		fmp:3,
		atk:6,
		mgc:2,
		def:3,
		res:5,
		spd:20,
		ailments:"normal",
		ftype:0,
		lvl:2,
	};

};//end of set


/*
0: _Hero
1: _Enemy
2: _Enemy
3: _Hero
4: _Enemy
5: _Hero

0: _Enemy
1: _Enemy
2: _Enemy
3: _Hero
4: _Hero
5: _Hero

*/