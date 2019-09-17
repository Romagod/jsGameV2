import {SpriteAnimation} from "../../../screen/game-visual/sprite-animation"

export class Sprite {
    constructor({imageName, imageWidth, imageHeight, spriteWidth = 64, spriteHeight = 64, type = 'sprite', sourceX, sourceY, width, height}) {
        this.imageName = imageName
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
        this.type = type
        this.animation = null


        this.sourceX = sourceX
        this.sourceY = sourceY
        this.width = width
        this.height = height
        this.x = 0
        this.y = 0
        this.generateSprite()
        this.changeState = new CustomEvent('changeState')

        this.state = {
            left:false,
            right:false,
            up:false,
            down:false,
            // stop:false
        }

    }

    setState(state, value) {
        let oldValue = this.state[state]
        this.state[state] = value
        if (oldValue !== value) {
            document.dispatchEvent(this.changeState)
        }
        if (oldValue && !value && state !== 'fire') {
            this.animation.resetFrame()
        }
    }

    updateAnimation() {

    }

    generateSprite() {
        if (this.type === 'sprite') {
            return
        }
        this.animation = this.getAnimation({indexes:[1,2,3,4,5,6,7], speed:300})
    }

    getAnimation({indexes, speed, repeat = true, autorun = true}) {
        console.log('indexes: ', indexes)
        return new SpriteAnimation({
            imageName: this.imageName,
            frames: indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
            speed: speed,
            repeat: repeat,
            autorun: autorun,
            width: this.spriteWidth,
            height: this.spriteHeight,
            sprite: this
        })
    }

    getSprite(index) {
        return new Sprite({
            imageName: this.imageName,
            sourceX: this.getSourceX(index),
            sourceY: this.getSourceY(index),
            width: this.spriteWidth,
            height: this.spriteHeight
        })
    }

    getSourceX(index) {
        return (--index * this.spriteWidth) % this.imageWidth
    }

    getSourceY(index) {
        return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight
    }

    setXY(x, y) {
        this.x = x
        this.y = y
    }
}
