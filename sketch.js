// Variable's
var bg, bg_Image, steve;
var gameover_image;
var PLAY = 0;
var END = 2;
var WIN = 1;
var diamond;
var gameState = PLAY;

// Score
var score = 0;

// PreLoad
function preload()
{
    backGround = loadImage("bg.jpg");
    player_image = loadImage("player.png");
    fireball_image = loadImage("fireball.png")
    apple_image = loadImage("apple.png")
    gameover_image = loadImage("gameover.jpg");
}

function setup()
{
    // Canvas
    createCanvas(500, 400)

    text("Score:"+score, 400, 300);

    bg = createSprite(250, 200, 100, 100);
    bg.addImage(backGround);
    bg.scale = 4

    player = createSprite(250, 300, 10, 10);
    player.addImage(player_image);
    player.velocityX = 5;
    player.scale = 0.03;

    invis_platform = createSprite(250, 340, 1000000000000000000, 10);
    invis_platform.visible = true

    fireballGroup = createGroup();
    appleGroup = createGroup();

}

function draw()
{
    text("SCORE:"+score, 250, 200)
    background(0);
    // Player Camera
    camera.position.x = player.x;

    // Infinite look 
    if(bg.x < camera.position.x - 600)
    {
        bg.x = camera.position.x;
    }

    // Player Ground
    if(invis_platform.x < 0)
    {
        invis_platform.x = 200
    }

    // GamerState's
    if (gameState === PLAY) 
    {
        if (keyDown("UP_ARROW") && player.y >= 290) 
        {
          player.velocityY = -15;
        }

        if (keyDown(RIGHT_ARROW)) 
        {
            player.x = player.x + 10;
            bg.velocityX = -1
        }

        // Console
        //console.log(player.y)

        if(player.isTouching(appleGroup))
        {

            appleGroup.destroyEach();
            score+= 1
            if(score>3){
                gameState = WIN;
            }
        }
      
        if(gameState === WIN)
        {
            textSize(30)
            fill(255);
            text("CONGRATS || YOU WON || RELOAD TO PLAY AGAIN", camera.position.x-250, 200);
            end();
        }

        if(player.isTouching(fireballGroup))
        {
            fireballGroup.destroyEach();
            score = -1
            if(score=-1){
               gameState = END;
            }
        }

        if (gameState === END)
        {
            textSize(30)
            fill(255);
            text("LOST || Reload to play again", camera.position.x-250, 200);
            end();
        }
    
        // Player Gravity
        player.velocityY++;
        player.collide(invis_platform);

    spawnApple();
    spawnFireball();
    drawSprites()

}
}

// End State
function end()
{
    
    player.visible = false;
    bg.visible = false;
    
    appleGroup.destroyEach();
    fireballGroup.destroyEach();
}

// Obstacle's
function spawnFireball()
{

    if(frameCount % 100 === 0)
    {
        fireball = createSprite(player.x+350, 300, 20, 20);
        fireball.addImage(fireball_image);
        fireball.lifetime = 2000;
        fireball.scale = 0.3
        fireballGroup.add(fireball);
        fireball.velocity.x = -4
    }
}

// Point's
function spawnApple()
{
    if (frameCount%70 === 0)
    {
        apple = createSprite(player.x+500, 200, 20, 20);
        apple.addImage(apple_image);
        apple.scale = 0.03;
        apple.lifetime = 2000;
        appleGroup.add(apple);
    }
}