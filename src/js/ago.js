// ago.js
// Written by Daichi Seki.
const $ = require("jquery");

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
planck.testbed(function(testbed) {
  $('canvas').attr('id','stage');

  var pl = planck, Vec2 = pl.Vec2, Math = pl.Math;
  var SPI4 = Math.sin(Math.PI / 4), SPI3 = Math.sin(Math.PI / 3);

  var width = 6.00, height = 20.00;

  // 障害物の速度
  var speed = 5;

  // 動く障害物
  var m_platform_01,m_platform_02,m_platform_03,m_platform_04;

  // var PLAYER_R = 0.35;
  // var BALL_R = 0.23;
  var BALL_R = 0.30;
  var POCKET_R = 0.6;
  var CIRCLE_R = 1;

  var count = 0;
  var pastVx,pastVy;

  testbed.x = 0;
  testbed.y = 0;
  testbed.width = width * 1.2;
  testbed.height = height * 1.2;
  testbed.ratio = 12;
  testbed.mouseForce = -50;
  testbed.info('あごあご','ago');

  pl.internal.Settings.velocityThreshold = 0;

  var world = pl.World({
    // 重力の設定(x,y)
    gravity : Vec2(0,0)
  });

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

  //var circleObstacle_1 = world.createBody().createFixture(pl.circle(Vec2(-10,CIRCLE_R),obstacleFixDef);
   // var goal = [
   //   Vec2(0, -height * 0.2),
   //   Vec2(0, +height * 0.2)
   // ];
  // var goal = [
  //   Vec2(0, 0),
  //   Vec2(0, 0)
  // ];

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

  // world.createBody(Vec2(-width * 0.5 - BALL_R, 0)).createFixture(pl.Chain(goal), goalFixDef);
  // world.createBody(Vec2(+width * 0.5 + BALL_R, 0)).createFixture(pl.Chain(goal), goalFixDef);

  world.createBody().createFixture(pl.Circle(Vec2(-14.2,7.5), POCKET_R), pocketFixDef);

  // 障害物の配置
  world.createBody().createFixture(pl.Chain(obstacle_1, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_2, true), obstacleFixDef);
  world.createBody().createFixture(pl.Chain(obstacle_3, true), obstacleFixDef);

  // 動く障害物を設置
  m_platform_01 = world.createDynamicBody(Vec2(0,0));
  m_platform_01.createFixture(pl.Box(.5, 2, Vec2(6,7), .5 * Math.PI), moveObstacleFixDef)
  m_platform_01.setKinematic();
  m_platform_01.setLinearVelocity(Vec2(-speed, 0));
  m_platform_01.setAngularVelocity(0);

  m_platform_02 = world.createDynamicBody(Vec2(0,0));
  m_platform_02.createFixture(pl.Box(.5, 2, Vec2(6,7), 1 * Math.PI), moveObstacleFixDef)
  m_platform_02.setKinematic();
  m_platform_02.setLinearVelocity(Vec2(-speed, 0));
  m_platform_02.setAngularVelocity(0);

  m_platform_03 = world.createDynamicBody(Vec2(-2,2.5));
  m_platform_03.createFixture(pl.Box(.5, .5, Vec2(-2,4), .5 * Math.PI), moveObstacleFixDef)
  m_platform_03.setKinematic();
  m_platform_03.setLinearVelocity(Vec2(0, speed));
  m_platform_03.setAngularVelocity(0);

  m_platform_04 = world.createDynamicBody(Vec2(-6,2.5));
  m_platform_04.createFixture(pl.Box(.5, .5, Vec2(-2,4), .5 * Math.PI), moveObstacleFixDef)
  m_platform_04.setKinematic();
  m_platform_04.setLinearVelocity(Vec2(0, speed/2));
  m_platform_04.setAngularVelocity(0);

  m_platform_04.lineThickness = 10;

  // ボールの初期位置を設定
  var ball = world.createDynamicBody(ballBodyDef);
  ball.createFixture(pl.Circle(BALL_R), ballFixDef);
  ball.setPosition(Vec2(7.5,-9));
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

  // ここに打数管理のプログラムを記述する
  // ボールをクリックしている場合のみ動作するよう変更
  $('#stage').on('click', function(){
    console.log("aaa");
  });


  var mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    color: "black",
    isDrawing: false
  };
  $('#stage')

  addEventListener("mousemove", function(e){
    //2.マウスが動いたら座標値を取得
  	var rect = e.target.getBoundingClientRect();
  	mouse.x = e.clientX - rect.left;
  	mouse.y = e.clientY - rect.top;
    console.log(mouse.x);
    console.log(mouse.y);
    console.log(ball.getPosition());
  });

  world.on('post-solve', function(contact) {
    count++;
    console.log("現在の壁への衝突回数は"+count+"回です");
    $('#data_view').html("現在の壁への衝突回数は"+count+"回です");

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
        console.log("おめでとう！あごがカップに突き刺さりました！！");
        $('#data_view').html("おめでとう！あごがカップに突き刺さりました！！");
      }
    }, 1);
  });

  // world.on('fixture-removed', function(contact) {
  //   setTimeout(function() {
  //     console.log("おめでとう！あごが伸びました！");
  //   }, 1);
  //   console.log("あごおおおお");
  // });

  testbed.step = function() {
    var v = ball.getLinearVelocity();
    var gravityX = 50;
    var gravityY = 50;

    windDataSet(gravityX,gravityY);

    // ボールが動いている間
    if(Math.sqrt(Math.round(v.x)) != 0 || Math.sqrt(Math.round(v.y)) != 0){
      world.setGravity(Vec2(gravityX,gravityY));
      setTimeout(function(){
        world.setGravity(Vec2(0,0));
      },(gravityX+gravityY)*3);
    }

    // 障害物を動かす
    if (m_platform_01.isKinematic()) {
      var p1 = m_platform_01.getTransform().p;
      var v1 = m_platform_01.getLinearVelocity();

      // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
      if ((p1.x < 0 && v1.x < 0) || (p1.x > 5.0 && v1.x > 0.0)) {
        v1.x = -v1.x;
        m_platform_01.setLinearVelocity(v1);
      }
    }

    if (m_platform_02.isKinematic()) {
      var p2 = m_platform_02.getTransform().p;
      var v2 = m_platform_02.getLinearVelocity();

      // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
      if ((p2.x < 0 && v2.x < 0) || (p2.x > 5.0 && v2.x > 0.0)) {
        v2.x = -v2.x;
        m_platform_02.setLinearVelocity(v2);
      }
    }

    if (m_platform_03.isKinematic()) {
      var p3 = m_platform_03.getTransform().p;
      var v3 = m_platform_03.getLinearVelocity();

      // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
      if ((p3.y < 2.5 && v3.y < 0) || (p3.y > 4.5 && v3.y > 0)) {
        v3.y = -v3.y;
        m_platform_03.setLinearVelocity(v3);
      }
    }

    if (m_platform_04.isKinematic()) {
      var p4 = m_platform_04.getTransform().p;
      var v4 = m_platform_04.getLinearVelocity();

      // if ((p.x < -5.0 && v.x < 0.0) || (p.x > 5.0 && v.x > 0.0)) {
      if ((p4.y < 2.5 && v4.y < 0) || (p4.y > 4.5 && v4.y > 0)) {
        v4.y = -v4.y;
        m_platform_04.setLinearVelocity(v4);
      }
    }
  }

  return world;


  // function row() {
  //   var balls = [];
  //   balls.push(Vec2(-width * .45, 0));
  //   // balls.push(Vec2(-width * .3, -height * 0.2));
  //   // balls.push(Vec2(-width * .3, +height * 0.2));
  //   // balls.push(Vec2(-width * .1, -height * 0.1));
  //   // balls.push(Vec2(-width * .1, +height * 0.1));
  //   return balls;
  // }

  function windDataSet(x,y){
    $('#wind_data').html("現在の風向きは追い風"+x+"・横風"+y+"です");
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
