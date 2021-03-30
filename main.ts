namespace SpriteKind {
    export const Enemy2 = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy += -5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        1 
        1 
        `, mySprite, 0, -100)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx += -5
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx += 5
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy += 5
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy2, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy2, function (sprite, otherSprite) {
    for (let value of list) {
        value.destroy()
    }
    list = []
    mySprite.setPosition(80, 60)
    mySprite.setVelocity(0, 0)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    smallRock = sprites.create(img`
        . . 1 1 1 . . . 
        . 1 1 . 1 1 . . 
        1 1 . . . 1 1 . 
        1 . . . . . 1 1 
        1 . . . . . . 1 
        1 1 . . . . 1 1 
        . 1 . . . 1 1 1 
        . 1 1 1 1 1 . . 
        `, SpriteKind.Enemy2)
    smallRock.setPosition(otherSprite.x - -10, otherSprite.y - -10)
    smallRock.setVelocity(randint(-25, 25), randint(-25, 25))
    list.push(smallRock)
    smallRock2 = sprites.create(img`
        . . 1 1 1 . . . 
        . 1 1 . 1 1 . . 
        1 1 . . . 1 1 . 
        1 . . . . . 1 1 
        1 . . . . . . 1 
        1 1 . . . . 1 1 
        . 1 . . . 1 1 1 
        . 1 1 1 1 1 . . 
        `, SpriteKind.Enemy2)
    smallRock2.setPosition(otherSprite.x + -10, otherSprite.y + -10)
    smallRock2.setVelocity(randint(-25, 25), randint(-25, 25))
    list.push(smallRock2)
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy()
    numRocks += -1
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    for (let value of list) {
        value.destroy()
    }
    list = []
    mySprite.setPosition(80, 60)
    mySprite.setVelocity(0, 0)
    info.changeLifeBy(-1)
})
let bigRock: Sprite = null
let smallRock2: Sprite = null
let smallRock: Sprite = null
let projectile: Sprite = null
let list: Sprite[] = []
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . 1 1 . . . . . 
    . . . . 1 . . 1 . . . . 
    . . . . 1 . . 1 . . . . 
    . . . 1 . . . . 1 . . . 
    . . . 1 . . . . 1 . . . 
    . . 1 . . . . . . 1 . . 
    . . 1 . . . . . . 1 . . 
    . . 1 . . . . . . 1 . . 
    . 1 . . . . . . . . 1 . 
    . 1 . . 1 1 1 1 . . 1 . 
    1 . 1 1 . . . . 1 1 . 1 
    1 1 . . . . . . . . 1 1 
    `, SpriteKind.Player)
let numRocks = 0
list = []
info.setScore(0)
info.setLife(3)
let difficulty = 3
game.onUpdateInterval(5000, function () {
    if (numRocks < difficulty) {
        bigRock = sprites.create(img`
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . 1 1 . . . . . 1 1 1 . . . 
            . . 1 1 . . . . . . . . 1 1 . . 
            . . 1 . . . . . . . . . . 1 1 . 
            . 1 1 . . . . . . . . . . . 1 . 
            1 1 . . . . . . . . . . . . 1 1 
            1 . . . . . . . . . . . . . . 1 
            1 . . . . . . . . . . . . . 1 1 
            1 . . . . . . . . . . . . 1 1 . 
            1 1 . . . . . . . . . . 1 1 . . 
            . 1 . . . . . . . . . . 1 1 . . 
            . 1 . . . . . . . . . . . 1 1 . 
            . 1 . . . . . . . . . . . . 1 . 
            . 1 . . . 1 1 1 1 . . . . 1 1 . 
            . 1 1 . 1 1 . . 1 . . . 1 1 . . 
            . . 1 1 1 . . . 1 1 1 1 1 . . . 
            `, SpriteKind.Enemy)
        bigRock.setPosition(randint(20, 140), -5)
        bigRock.setVelocity(randint(-15, 15), randint(-15, 15))
        numRocks += 1
        list.push(bigRock)
    }
})
game.onUpdateInterval(15000, function () {
    difficulty += 1
})
forever(function () {
    if (mySprite.x <= -10) {
        mySprite.setPosition(170, Math.abs(120 - mySprite.y))
    } else if (mySprite.x >= 170) {
        mySprite.setPosition(-10, Math.abs(120 - mySprite.y))
    } else if (mySprite.y <= -10) {
        mySprite.setPosition(Math.abs(160 - mySprite.x), 130)
    } else if (mySprite.y >= 130) {
        mySprite.setPosition(Math.abs(160 - mySprite.x), -10)
    }
})
forever(function () {
    for (let value of list) {
        if (value.x <= -10) {
            value.setPosition(170, Math.abs(120 - value.y))
        } else if (value.x >= 170) {
            value.setPosition(-10, Math.abs(120 - value.y))
        } else if (value.y <= -10) {
            value.setPosition(Math.abs(160 - value.x), 130)
        } else if (value.y >= 130) {
            value.setPosition(Math.abs(160 - value.x), -10)
        }
    }
})
