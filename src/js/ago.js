// ago.js
// Written by Daichi Seki.
const $    = require("jquery");
const swal = require("sweetalert");

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
planck.testbed(function(testbed) {
  $('canvas').attr('id','stage');

  // ステージ番号
  var stage_id = sessionStorage.getItem("stage_id")

  var pl = planck, Vec2 = pl.Vec2, Math = pl.Math;
  var SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

  var gravityX = 0;
  var gravityY = 0;

  var width = 6.00, height = 20.00;

  // 障害物の速度
  var speed = 5;

  // 動く障害物
  var m_platform_01,m_platform_02,m_platform_03,m_platform_04;

  // var PLAYER_R = 0.35;
  // var BALL_R = 0.23;
  var BALL_R   = 0.55;
  var POCKET_R = 0.5;
  var CIRCLE_R = 1;

  var count = 0;
  var score = 15000;
  $('#score').html("あなたの現在のスコアは<span>"+score+"</span>です！");

  // タイマー用
  var timerID;
  var remainTimer = 100;
  var pauseTimer;

//  var pastVx,pastVy;

  testbed.x = 0;
  testbed.y = 0;
  testbed.width  = width * 1.3;
  testbed.height = height * 1.3;
  testbed.ratio  = 12;
  testbed.mouseForce = -100;

  pl.internal.Settings.velocityThreshold = 0;

  var skill;

  skill = skillDataSet(urlParamGet());
  weatherGet();

  // タイマー開始
  timerStart();

  var world = pl.World({
    // 重力の設定(x,y)
    gravity : Vec2(gravityX,gravityY)
  });

  if(stage_id == "1th"){
    var walls = [
      Vec2(-15,-10),
      Vec2(-15,-5),
      Vec2(5,-5),
      Vec2(5,3),
      Vec2(-15,3),
      Vec2(-15,10),
      Vec2(15,10),
      Vec2(15,-10)
    ];

    var obstacle_1 = [
      Vec2(8,-5),
      Vec2(8,-2),
      Vec2(15,-2),
      Vec2(15,-5)
    ];

    var obstacle_2 = [
      Vec2(5,3),
      Vec2(5,8),
      Vec2(13,8),
      Vec2(13,3)
    ];

    var obstacle_3 = [
      Vec2(-10,6),
      Vec2(-10,10),
      Vec2(-2,10),
      Vec2(-2,6)
    ];
  }else if(stage_id == "2th"){
    var walls = [
      Vec2(-15,-10),
      Vec2(-15,10),
      Vec2(15,10),
      Vec2(15,-10)
    ];

    var obstacle_1 = [
      Vec2(-8,-5),
      Vec2(-8,5),
      Vec2(8,5),
      Vec2(8,-5)
    ];

    var obstacle_2 = [
      Vec2(-15,-5),
      Vec2(-15,-2),
      Vec2(-11,-2),
      Vec2(-11,-5)
    ];

    var obstacle_3 = [
      Vec2(-12,2),
      Vec2(-12,5),
      Vec2(-8,5),
      Vec2(-8,2)
    ];

    var obstacle_4 = [
      Vec2(-8,5),
      Vec2(-8,8),
      Vec2(-2,8),
      Vec2(-2,5),
    ];

    var obstacle_5 = [
      Vec2(2,7),
      Vec2(2,10),
      Vec2(8,10),
      Vec2(8,7),
    ];

    var obstacle_6 = [
      Vec2(-8,-7),
      Vec2(-8,-10),
      Vec2(-2,-10),
      Vec2(-2,-7)
    ];

    var obstacle_7 = [
      Vec2(2,-5),
      Vec2(2,-8),
      Vec2(8,-8),
      Vec2(8,-5),
    ];

    var obstacle_8 = [
      Vec2(8,-5),
      Vec2(8,-2),
      Vec2(12,-2),
      Vec2(12,-5)
    ];

    var obstacle_9 = [
      Vec2(11,2),
      Vec2(11,5),
      Vec2(15,5),
      Vec2(15,2)
    ];

  }else if(stage_id == "3th"){
    var walls = [
      Vec2(-15,-10),
      Vec2(-15,2),
      Vec2(7.5,2),
      Vec2(7.5,6),
      Vec2(-15,6),
      Vec2(-15,10),
      Vec2(15,10),
      Vec2(15,-2),
      Vec2(-7.5,-2),
      Vec2(-7.5,-6),
      Vec2(15,-6),
      Vec2(15,-10)
    ];

    var obstacle_1 = [
      Vec2(0,-10),
      Vec2(5,-8),
      Vec2(10,-10)
    ];

    var obstacle_2 = [
      Vec2(-7.5,-6),
      Vec2(2.5,-6),
      Vec2(-2.5,-8)
    ];

    var obstacle_3 = [
      Vec2(-12.5,-4),
      Vec2(-7.5,-2),
      Vec2(-7.5,-6)
    ];

    var obstacle_4 = [
      Vec2(-7.5,0),
      Vec2(-7.5,2),
      Vec2(0,2),
      Vec2(0,0),
    ];

    var obstacle_5 = [
      Vec2(2.5,-2),
      Vec2(2.5,0),
      Vec2(10,0),
      Vec2(10,-2),
    ];

    var obstacle_6 = [
      Vec2(10,10),
      Vec2(10,2),
      Vec2(15,2),
      Vec2(15,10),
    ];

  }else if(stage_id == "4th"){
    var walls = [
      Vec2(0,-10),
      Vec2(0,5),
      Vec2(-15,5),
      Vec2(-15,10),
      Vec2(15,10),
      Vec2(15,-10)
    ];

    // 左下から時計回り？
    var obstacle_1 = [
      Vec2(0,-7),
      Vec2(0,-5),
      Vec2(8,-5),
      Vec2(8,-7)
    ];

    var obstacle_2 = [
      Vec2(7,-3),
      Vec2(7,-1),
      Vec2(15,-1),
      Vec2(15,-3)
    ];

    // 左下から時計回り？
    var obstacle_3 = [
      Vec2(0,3),
      Vec2(0,1),
      Vec2(8,1),
      Vec2(8,3)
    ];
  }else if(stage_id == "5th"){

  }else{

  }

  var wallFixDef = {
    friction: 0,
    restitution: 0,
    userData : 'wall'
  };

  var obstacleFixDef = {
    friction: 0,
    restitution: 0,
    userData : 'obstacle'
  }

  var moveObstacleFixDef = {
      friction: 0,
      restitution: 2,
      userData : 'moveObstacle'
  }

  var pocketFixDef = {
    userData: 'pocket'
  };

  /*--- 各オプションについて ---*/
  // friction     : 摩擦係数
  // restitution  : 反発係数
  // density      : 密度
  var ballFixDef = {
    friction: .7,
    restitution: .99,
    density: .5,
    userData : 'ball'
  };
  var ballBodyDef = {
    bullet: true,
    linearDamping : 5.5,
    angularDamping : 1.6
  };

  // var playerFixDef = {
  //   friction: .1,
  //   restitution: .99,
  //   density: .8,
  //   userData : 'player'
  // };
  // var playerBodyDef = {
  //   bullet: true,
  //   linearDamping : 4,
  //   angularDamping : 1.6
  // };

  var goalFixDef = {
    friction: 0,
    restitution: 1,
    userData : 'goal'
  };

  world.createBody().createFixture(pl.Chain(walls, true), wallFixDef);

  if(stage_id == "1th"){
    world.createBody().createFixture(pl.Circle(Vec2(-12.5,8), POCKET_R), pocketFixDef);
  }else if(stage_id == "2th"){
    world.createBody().createFixture(pl.Circle(Vec2(13,8), POCKET_R), pocketFixDef);
  }else if(stage_id == "3th"){
    world.createBody().createFixture(pl.Circle(Vec2(-13,8), POCKET_R), pocketFixDef);
  }else if(stage_id == "4th"){
    world.createBody().createFixture(pl.Circle(Vec2(-13,7.5), POCKET_R), pocketFixDef);
  }else if(stage_id == "5th"){

  }else{

  }

  // 障害物の配置
  world.createBody().createFixture(pl.Chain(obstacle_1, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_2, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_3, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_4, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_5, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_6, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_7, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_8, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_9, true), obstacleFixDef);

  // 動く障害物を設置
  // m_platform_01 = world.createDynamicBody(Vec2(0,0));
  // m_platform_01.createFixture(pl.Box(.5, 2, Vec2(6,7), .5 * Math.PI), moveObstacleFixDef)
  // m_platform_01.setKinematic();
  // m_platform_01.setLinearVelocity(Vec2(-speed, 0));
  // m_platform_01.setAngularVelocity(0);
  //
  // m_platform_02 = world.createDynamicBody(Vec2(0,0));
  // m_platform_02.createFixture(pl.Box(.5, 2, Vec2(6,7), 1 * Math.PI), moveObstacleFixDef)
  // m_platform_02.setKinematic();
  // m_platform_02.setLinearVelocity(Vec2(-speed, 0));
  // m_platform_02.setAngularVelocity(0);
  //
  // m_platform_03 = world.createDynamicBody(Vec2(-2,2.5));
  // m_platform_03.createFixture(pl.Box(.5, .5, Vec2(-2,4), .5 * Math.PI), moveObstacleFixDef)
  // m_platform_03.setKinematic();
  // m_platform_03.setLinearVelocity(Vec2(0, speed));
  // m_platform_03.setAngularVelocity(0);
  //
  // m_platform_04 = world.createDynamicBody(Vec2(-6,2.5));
  // m_platform_04.createFixture(pl.Box(.5, .5, Vec2(-2,4), .5 * Math.PI), moveObstacleFixDef)
  // m_platform_04.setKinematic();
  // m_platform_04.setLinearVelocity(Vec2(0, speed/2));
  // m_platform_04.setAngularVelocity(0);

  // m_platform_04.lineThickness = 10;

  // ボールの初期位置を設定
  var ball = world.createDynamicBody(ballBodyDef);
  ball.createFixture(pl.Circle(BALL_R), ballFixDef);

  if(stage_id == "1th"){
    ball.setPosition(Vec2(-14,-7.5));
  }else if(stage_id == "2th"){
    ball.setPosition(Vec2(-14,-9));
  }else if(stage_id == "3th"){
    ball.setPosition(Vec2(13,-8));
  }else if(stage_id == "4th"){
    ball.setPosition(Vec2(1.5,-8.5));
  }else if(stage_id == "5th"){
    ball.setPosition(Vec2(7.5,-9));
  }else{
    ball.setPosition(Vec2(1.5,-8.5));
  }

  ball.render = {fill: 'white', stroke : 'green'};

  // row().forEach(function(p) {
  //   var player = world.createDynamicBody(playerBodyDef);
  //   player.setPosition(p);
  //   player.createFixture(pl.Circle(PLAYER_R), playerFixDef);
  //   player.render = {fill : '#0077ff', stroke: 'black'};
  // });
  //
  // row().map(scale(-1, 1)).forEach(function(p) {
  //   var player = world.createDynamicBody(playerBodyDef);
  //   player.setPosition(p);
  //   player.setAngle(Math.PI);
  //   player.createFixture(pl.Circle(PLAYER_R), playerFixDef);
  //   player.render = {fill : '#ff411a', stroke: 'black'};
  // });


  var mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    color: "black",
    isDrawing: false
  };

  // $('#overlay_delete').on('click', function(){
  //   $('.overlay').hide();
  // });


  world.on('post-solve', function(contact) {
    count++;

    soundStart()

    console.log("現在の壁への衝突回数は"+count+"回です");
    $('#data_view').html("現在の壁への衝突回数は"+count+"回です");

    score -= 100;

    $('#score').html("あなたの現在のスコアは<span>"+score+"<span>です！");

    var fA = contact.getFixtureA(), bA = fA.getBody();
    var fB = contact.getFixtureB(), bB = fB.getBody();

    var wall = fA.getUserData() == wallFixDef.userData && bA || fB.getUserData() == wallFixDef.userData && bB;
    var ball = fA.getUserData() == ballFixDef.userData && bA || fB.getUserData() == ballFixDef.userData && bB;
    var goal = fA.getUserData() == goalFixDef.userData && bA || fB.getUserData() == goalFixDef.userData && bB;
    var pocket = fA.getUserData() == pocketFixDef.userData && bA || fB.getUserData() == pocketFixDef.userData && bB;


    //do not change world immediately
    // setTimeout(function() {
    //   if (ball && goal) {
    //     ball.setPosition(0,0);
    //     ball.setLinearVelocity(Vec2(0, 0));
    //     // world.destroyBody(ball);
    //     console.log("ago");
    //   }
    // }, 1);

    setTimeout(function() {
      if (ball && pocket) {
        world.destroyBody(ball);

        timerStop();

        // 壁反射減を選択時
        skill == 2 && count <= 10 ? score += count*100 : score += 1000;

        swal({
          title : "あなたのスコアは"+score+"です！",
          text  : "登録したいユーザー名を入力してください",
          type  : "success",
          content : "input",
          closeOnClickOutside: false
        }).then((value) => {
          swal({
            title : value,
            text  : "上記の名前で登録します！",
            type  : "success",
            closeOnClickOutside: false
          }).then((isConfirm) => {
            // $('user_name').val(value);
            // $('user_score').val(score);
            // $('#form_area').submit()
            var param = {userName: value,userScore: score};

            $.ajax({
            type: "POST",
            url: "http://mayomayooo.sakura.ne.jp/golf_db/insert_score.php",
            dataType : "json",
            data: param,
            cache: "false"
            }).done(function(){
              //  保存成功をアラート表示
              console.log("データの保存に成功しました");

              window.location.href = "/";

            }).fail(function(XMLHttpRequest, textStatus, errorThrown){
              console.log("失敗！");
              console.log(XMLHttpRequest);
              console.log(textStatus);
              console.log(errorThrown);
            });

          });
        });
      }
    }, 1);
  });

  testbed.step = function() {
    var v = ball.getLinearVelocity();

    // windDataSet(gravityX,gravityY);

    // ボールが動いている間
    if(Math.sqrt(Math.round(v.x)) != 0 || Math.sqrt(Math.round(v.y)) != 0){
      world.setGravity(Vec2(gravityX,gravityY));
      setTimeout(function(){
        world.setGravity(Vec2(0,0));
      },(Math.abs(gravityX)+Math.abs(gravityY))*2);
    }

    // // 障害物を動かす
    // if (m_platform_01.isKinematic()) {
    //   var p1 = m_platform_01.getTransform().p;
    //   var v1 = m_platform_01.getLinearVelocity();
    //
    //   // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
    //   if ((p1.x < 0 && v1.x < 0) || (p1.x > 5.0 && v1.x > 0.0)) {
    //     v1.x = -v1.x;
    //     m_platform_01.setLinearVelocity(v1);
    //   }
    // }
    //
    // if (m_platform_02.isKinematic()) {
    //   var p2 = m_platform_02.getTransform().p;
    //   var v2 = m_platform_02.getLinearVelocity();
    //
    //   // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
    //   if ((p2.x < 0 && v2.x < 0) || (p2.x > 5.0 && v2.x > 0.0)) {
    //     v2.x = -v2.x;
    //     m_platform_02.setLinearVelocity(v2);
    //   }
    // }
    //
    // if (m_platform_03.isKinematic()) {
    //   var p3 = m_platform_03.getTransform().p;
    //   var v3 = m_platform_03.getLinearVelocity();
    //
    //   // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
    //   if ((p3.y < 2.5 && v3.y < 0) || (p3.y > 4.5 && v3.y > 0)) {
    //     v3.y = -v3.y;
    //     m_platform_03.setLinearVelocity(v3);
    //   }
    // }
    //
    // if (m_platform_04.isKinematic()) {
    //   var p4 = m_platform_04.getTransform().p;
    //   var v4 = m_platform_04.getLinearVelocity();
    //
    //   // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
    //   if ((p4.y < 2.5 && v4.y < 0) || (p4.y > 4.5 && v4.y > 0)) {
    //     v4.y = -v4.y;
    //     m_platform_04.setLinearVelocity(v4);
    //   }
    // }
  }

  return world;


  /**---------- openweathermapの利用 ----------**/
  function weatherGet(){
    var cityName = ['Tokyo,jp','London,gb','Wellington,nz','Moscow,ru','Berlin,de','Nagoya,jp','Osaka,jp','Beijing,cn','Santiago,cl'];

    const apiKey = '8032c7477be265800cfe8035f5c084f0';
    const city   = cityName[Math.floor(Math.random()*cityName.length)];
    const url    = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',jp&units=metric&APPID=' + apiKey;

    $.ajax({
      url: url,
      dataType: "json",
      type: 'GET',
    })
    .done(function(data){
      var weatherInfo   = weatherEnToJp(data.list[0].weather[0].main,skill);
      var windSpeedInfo = windSpeedDataSet(data.list[0].wind.speed);
      var windDegInfo   = windDegDataSet(data.list[0].wind.deg);

      var gravityObj = gravityNumberSet(windDegInfo,windSpeedInfo);
      gravityX = gravityObj.gravityX;
      gravityY = gravityObj.gravityY;

      stageTitleSet(city,weatherInfo,windDegInfo,windSpeedInfo);

      console.log(gravityX+"と"+gravityY);

      console.log('成功');
      console.log("東京の天気は"+weatherInfo);
      console.log("風の強さは"+windSpeedInfo+"/風向きは"+windDegInfo);
      $('#weather_data').html(city+"の天気は"+weatherInfo+"です<br>風の強さは"+windSpeedInfo+"/風向きは"+windDegInfo);
    })
    .fail(function(data){
      console.log('再読み込みしてください');
    });
  }


  /**---------- 天気(clear,clouds,rain,snow)を英語から日本語へ変換 ----------**/
  function weatherEnToJp(weather,skill){
    console.log(weather);

    if(skill === 4){
      return "晴れ";
    }else{
      if(weather === "Clear"){
        return "晴れ";
      }else if(weather === "Clouds"){
        return "曇り";
      }else if(weather === "Rain"){
        return "雨";
      }else if(weather === "Snow"){
        return "雪";
      }else{
        return "雨";
      }
    }
  }


  /**---------- 重力の強さを補正 ----------**/
  function windSpeedDataSet(windSpeed){
    // 仮
    return windSpeed*4;
  }


  /**---------- 重力の向きを設定 ----------**/
  function windDegDataSet(windDeg){
    if(337.5 <= windDeg || windDeg < 22.5){
      return "北";
    }else if(22.5 <= windDeg && windDeg < 67.5){
      return "北東";
    }else if(67.5 <= windDeg && windDeg < 112.5){
      return "東";
    }else if(112.5 <= windDeg && windDeg < 157.5){
      return "南東";
    }else if(157.5 <= windDeg && windDeg < 202.5){
      return "南";
    }else if(202.5 <= windDeg && windDeg < 247.5){
      return "南西";
    }else if(247.5 <= windDeg && windDeg < 292.5){
      return "西";
    }else if(292.5 <= windDeg && windDeg < 337.5){
      return "北西";
    }
  }


  /**---------- 重力の強さを設定 ----------**/
  function gravityNumberSet(windDegInfo,windSpeedInfo){
    var obj = new Object();

    if(windDegInfo === "北"){
      obj.gravityX = 0;
      obj.gravityY = windSpeedInfo;
    }else if(windDegInfo === "北東"){
      obj.gravityX = windSpeedInfo;
      obj.gravityY = windSpeedInfo;
    }else if(windDegInfo === "東"){
      obj.gravityX = windSpeedInfo;
      obj.gravityY = 0;
    }else if(windDegInfo === "南東"){
      obj.gravityX = windSpeedInfo;
      obj.gravityY = -windSpeedInfo;
    }else if(windDegInfo === "南"){
      obj.gravityX = 0;
      obj.gravityY = -windSpeedInfo;
    }else if(windDegInfo === "南西"){
      obj.gravityX = -windSpeedInfo;
      obj.gravityY = -windSpeedInfo;
    }else if(windDegInfo === "西"){
      obj.gravityX = -windSpeedInfo;
      obj.gravityY = 0;
    }else if(windDegInfo === "北西"){
      obj.gravityX = -windSpeedInfo;
      obj.gravityY = windSpeedInfo;
    }

    return obj;
  }


  /**---------- ステージ情報欄にデータを格納 ----------**/
  function stageTitleSet(city,weather,windDeg,windSize){
    var $stageName = $('#stage_name');
    var weatherEn,windDegTag;

    // 天候アイコンをセット
    weather === "晴れ" ? weatherEn = "clear" : weatherEn;
    weather === "曇り" ? weatherEn = "cloud" : weatherEn;
    weather === "雨" ? weatherEn = "rain" : weatherEn;
    weather === "雪" ? weatherEn = "snow" : weatherEn;
    $stageName.find('#weather_icon').addClass(weatherEn);

    // 風向きアイコンをセット
    windDeg === "北" ? windDegTag = "wind_n" : windDegTag;
    windDeg === "北東" ? windDegTag = "wind_ne" : windDegTag;
    windDeg === "東" ? windDegTag = "wind_e" : windDegTag;
    windDeg === "南東" ? windDegTag = "wind_se" : windDegTag;
    windDeg === "南" ? windDegTag = "wind_s" : windDegTag;
    windDeg === "南西" ? windDegTag = "wind_sw" : windDegTag;
    windDeg === "西" ? windDegTag = "wind_e" : windDegTag;
    windDeg === "北西" ? windDegTag = "wind_nw" : windDegTag;
    $stageName.find('#wind_icon').addClass(windDegTag);

    // 都市名をセット
    $stageName.find('#city').html(city);
  }


  /**---------- URLから値取得 ----------**/
  function urlParamGet(){
    var arg = new Object;
    var url = location.search.substring(1).split('&');

    for(var i=0; url[i]; i++){
      var k = url[i].split('=');
      arg[k[0]] = k[1];
    }

     return arg.counter_num;
  }


  /**---------- 選択スキル情報の格納 ----------**/
  function skillDataSet(skillNumber){
    skillNumber == 1 ? (testbed.mouseForce = -150,skill = 1) : false;
    skillNumber == 2 ? skill = 2 : false;
    skillNumber == 3 ? (POCKET_R = 1.5,skill = 3) : false;
    skillNumber == 4 ? skill = 4 : false;
    $('#skill').addClass('skill_'+skill);
    return skill;
  }


  /**---------- 壁衝突時の音 ----------**/
  function soundStart(){
    // 初回以外だったら音声ファイルを巻き戻す
    if(typeof(document.getElementById('audio').currentTime) != 'undefined' ){
      document.getElementById('audio').currentTime = 0;
    }
    $('#audio').get(0).play();
  }


  /**---------- タイマー ----------**/
  function timerStart(){
    remainTimer == 100 ? ($('#timer').text(remainTimer),scoreChange()) : false;
    remainTimer == 0 ? timerStom() : false;
    console.log(score);

    timerID = setInterval(function(){
      remainTimer <= 0 ? clearInterval(timerID) : timerCountDown();
    },1000);
  }

  function timerCountDown(){
    remainTimer--;
    scoreChange();

    pauseTimer = remainTimer;

    $('#timer').text(remainTimer);
  }

  function timerStop(){
    clearInterval(timerID);
  }


  /**---------- スコア変更 ----------**/
  function scoreChange(){
    score = 5000-count*100 + remainTimer*100;
    $('#score').html("あなたの現在のスコアは<span>"+score+"<span>です！");
  }

  function scale(x, y) {
    return function (v) {
      return pl.Vec2(v.x * x, v.y * y);
    };
  }

  function translate(x, y) {
    return function (v) {
      return pl.Vec2(v.x + x, v.y + y);
    };
  }

});
