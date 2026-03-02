let player
let ball
let stats
let floor

function setup() {

   new Canvas(700, 700, 'fullscreen');
   walk = new Sprite();
   player = new Sprite();
   let block = new Sprite();
   block.x = 510
   block.y = 390
   ball = new Sprite();
   block.physics = STA
   ball.physics = STA
   player.physics = DYN
   player.x = 500
   player.y = 650
   player.addCollider(60, 50);
   player.debug = true;
   player.mass = 35;
   player.addAnis('sonic spritesheet/standing.png', {
      stand: { row: 0, frames: 1 }

   });

   player.addAnis('sonic spritesheet/walking.png', {
      walk: { row: 0, frames: 12, frameDelay: 6 },
      speedwalk: { row: 0, frames: 12, frameDelay: 3 }
   });

   player.addAnis('sonic spritesheet/rolling.png', {
      roll: { row: 0, frames: 8 }
   });

   player.addAnis('sonic spritesheet/idle.png', {
      idle: { row: 0, frames: 5 }
   });

   player.addAnis('sonic spritesheet/running.png', {
      run: { row: 0, frames: 4 }
   });

   player.addAnis('sonic spritesheet/lookup.png', {
      lookup : { row: 0, frames: 3}

      
   });

    player.addAnis('sonic spritesheet/crouch.png', {
      crouch : { row: 0, frames: 2}

      
   });



   stats = new Sprite(player.x - 300, player.y - 400, 100, 100, STA)


   

   environment();
   player.rotationLock = true;
   p5play.renderStats = true
   
   player.bounciness = 0

}

function designs() {
   //player.img = 'assets/sr5zb748842ee2aws3.png'




}



function environment() {
   world.gravity.y = 10
   floor = new Sprite(860, 550, 1000000, 500, STA)
   floor.color = 'green'
   floor.offset.y = 250
   floor.friction = 4.5
   floor.bounciness = 0
   ball.friction = floor.friction 
}

function grounded(){
   if(player.colliding(floor)){
      return true;
   }
   return false;
}

function basiccontrols() {

   if (player.vel.x == 0 && grounded()) {
      player.changeAni('stand')
      stats.speed = player.vel.x
   }

   if (kb.pressing('left')) {
      
      player.changeAni('walk');
      player.scale.x = -1
      player.vel.x -= 0.3
      stats.speed = player.speed
      stats.direction = player.direction
   } else if (kb.pressing('right')) {
      
      player.changeAni('walk');
      player.scale.x = 1
      player.vel.x += 0.3



      stats.speed = player.speed
      stats.direction = player.direction
   }


   if (kb.presses('space') && grounded()) {
      player.vel.y = -10
      player.changeAni('roll')
   }


   if (player.vel.x >= 5) {
      player.changeAni('speedwalk')
   }

   if (player.speed >= 10 && player.vel.y === 0) {
      player.changeAni('run')
      player.drag = 0.27
   } else if (player.vel.x < 10 && player.vel.x >= 5) {
      player.changeAni('walk')
   }

    if (player.speed === 0 && kb.pressing('up')){
      player.changeAni('lookup')
    }

        if (player.speed === 0 && kb.pressing('down')){
      player.changeAni('crouch')
    }


    
}



function update() {

   stats.text = player.speed.toFixed(0)

   basiccontrols();
   console.log(grounded())

   background(20);


    if (player.vel.x !== 0 && kb.pressing('down')){
   player.changeAni('roll')
}

   if (player.vel.y !== 0) {
      player.changeAni('roll')
   }

  

}

function drawFrame() {
   camera.x = player.x
   camera.y = player.y
}