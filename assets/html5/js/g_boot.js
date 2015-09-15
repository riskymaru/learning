
function set1(GBA){
//trace('ok')

GBA.Boot = function(game){};
GBA.Boot.prototype = {
  preload: function(){

    // preload the loading indicator first before anything else
    this.load.image('preloader', 'assets/html5/img/preloader/preloader.png');
    this.load.image('preloader_bg', 'assets/html5/img/preloader/preloader_bg.png');
    //this.load.image('background','assets/html5/img/bg/background.jpg')
    //this.load.image('background2','assets/html5/img/bg/background2.jpg')
  },
  create: function(game){
    // set scale options
    this.stage.disableVisibilityChange = true;
    this.stage.smoothed = true;
    this.input.maxPointers = 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    // start the Preloader state
    this.state.start('Preloader');
  }
};

//PRELOADER

GBA.Preloader = function(game){
    //define width and height of the game
    GBA.ORIENTATION = 0
    GBA.GAME_WIDTH = game.width;
    GBA.GAME_HEIGHT = game.height;
    GBA.GAME_UPPER_MARGIN = 0
    GBA.GAME_WIDTH > GBA.GAME_HEIGHT ? GBA.GAME_SCALE = game.width/800 : GBA.GAME_SCALE = game.height/450
    //trace(GBA.GAME_WIDTH,GBA.GAME_HEIGHT)
    //You can listen for each of these events from Phaser.Loader
    //game.load.onFileComplete.add(fileComplete, this);
};

GBA.Preloader.prototype = {
    preload: function(){

        /*        Setup Preloader        */
        this.stage.backgroundColor = '#1F9BF1';
        //this.bg = this.add.sprite(0,0,(GBA.view== 0? "background" : "background2"))
        this.preloaderBar_bg = this.add.sprite((GBA.GAME_WIDTH-400)/2, (GBA.GAME_HEIGHT-20)/2, 'preloader_bg');
        this.preloadBar = this.add.sprite((GBA.GAME_WIDTH-400)/2, (GBA.GAME_HEIGHT-20)/2, 'preloader');
        this.load.setPreloadSprite(this.preloadBar);

        //load audio
        //this.load.audio('snd','assets/html5/snd/Kalimba.mp3');
        //this.load.audio('snd_btn_add',['assets/html5/snd/bet_add.mp3','assets/html5/snd/bet_add.wav','assets/html5/snd/bet_add.ogg']);
      

        //load image
        this.load.image('bg1','assets/html5/img/bg/bg.png')
        this.load.atlas( 'heroes', 'assets/html5/img/char/heroes.png', 'assets/html5/img/char/heroes.json' );
        this.load.atlas( 'btn', 'assets/html5/img/btn/btn.png', 'assets/html5/img/btn/btn.json' );

        this.load.image('hero_icon','assets/html5/img/char/fav.png')

        this.load.bitmapFont('flappy', 'assets/html5/fonts/flappy.png', 'assets/html5/fonts/flappy.fnt');
        this.load.bitmapFont('small_led', 'assets/html5/fonts/small_led.png', 'assets/html5/fonts/small_led.fnt');

        //fonts

       
        this.load.onLoadComplete.add(loadComplete, this);
        function loadComplete(){
            this.state.start('MainMenu');
        }
    },
    create: function(){
        //start the MainMenu state
        this.state.start('MainMenu');
        //music = this.add.audio('snd');
        //music.play();
        //GBA.SFX.btn1.play('',0,1,false);
    },
    render: function(){

    }
};

}

function set2(GBA){

GBA.MainMenu = function(GBA){}

GBA.MainMenu.prototype = {
    create: function(game){

        PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
        game.time.advancedTiming = true;

        var playsite = new GBA.Environment(game);
        this.add.existing(playsite);

        GBA.playsite = playsite
    },
    startGame: function() {
        //start the Game state
        //this.state.start('Game');
        //trace('yeheyehey')
    },
    render: function(game){
        //game.test ? game.debug.text('FPS:' + game.time.fps + "|D:"+ GBA.device_id +"|R:"+GBA.GameRender+"|W:" + game.width + "|H:"+ game.height + "|M:" + GBA.model + "|wW:"+GBA.window_width + "|wH:"+GBA.window_height+"|Ra:"+GBA.ratio, 8, game.height-5, "#00ff00") : 0
        
    },
    update:function(){
        GBA.playsite.update();
    }
}
}

//end set2

//config php response/request

function setRequest(GBA){

    /*GBA.addLoop = function(fnc){
            GBA.enterFrame.push(fnc);
        }

        GBA.removeLoop = function(fnc){
             for(j=0;j<GBA.enterFrame.length;j++){
                if(GBA.enterFrame[j] == fnc){
                    GBA.enterFrame.splice(j,1)
                }
             };
        }


    GBA.request_free = function(GBA){
       $.ajax({
          type: "POST",
          url: _BASE_URL + 'free_spinxc_cm',
          data: {
            data_ : JSON.stringify({"N" : 30, "BPL": 0.5, "token" : GBA.val.token})
          },
          dataType: 'text',
          success: function(response) {
            GBA.response = JSON.parse(response.split('=')[1]);
          },
          error : function (xhr, response, txt) {
            console.log(xhr);
            console.log(response);
            console.log(txt);
          }
          
        });
       */ 
    //};
    

};

