//handlers
let playerAnimationHandler;
let monsterAnimationHandler;

//use this function to get sprite position in image
function spritePositionToImagePosition(row, col, spriteWidth, spriteHeight) 
{
    return {
        x: (
            col * spriteWidth
        ),
        y: (
            row * spriteHeight
        )
    }
}

//use this function to animate a sprite
function animate(targetCanvas, targetImage, targetSpriteWidth, targetSpriteHeight, targetMaxSprites, targetSpriteSpeed, targetHandler, startFrame=0, nextAnim=null, loop=true)
{
    if(targetHandler == "player")
    {
        clearTimeout(playerAnimationHandler);
    }
    else if (targetHandler == "monster")
    {
        clearTimeout(monsterAnimationHandler);
    }

    let frame = startFrame;
    let currentHandler;

    const targetCanvasContext = targetCanvas.getContext('2d');

    if(frame >= targetMaxSprites-1)
    {
        if(nextAnim)
        {
            currentHandler = nextAnim();
            return;
        }
        else
        {  
            if(loop)
            {
                frame = 0;
            }
            else
            {
                return;
            }
        }
    }
    else
    {
        frame++;
    }

    const spriteRaio = targetSpriteHeight/targetSpriteWidth;

    targetCanvas.style.height = targetCanvas.clientWidth + 'px';

    targetCanvasContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

    targetCanvasContext.drawImage(
        targetImage,
        spritePositionToImagePosition(0,frame,targetSpriteWidth,targetSpriteHeight).x,
        spritePositionToImagePosition(0,frame,targetSpriteWidth,targetSpriteHeight).y,
        targetSpriteWidth,
        targetSpriteHeight,
        0,
        0,
        targetCanvas.width,
        targetCanvas.height*spriteRaio
    );


    currentHandler = setTimeout(function(){
        animate(targetCanvas, targetImage, targetSpriteWidth, targetSpriteHeight, targetMaxSprites, targetSpriteSpeed, targetHandler, frame, nextAnim,loop);
    }, targetSpriteSpeed);

    if(targetHandler == "player")
    {
        playerAnimationHandler = currentHandler;
    }
    else if (targetHandler == "monster")
    {
        monsterAnimationHandler = currentHandler;
    }
}
