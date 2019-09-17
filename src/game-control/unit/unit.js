import {Sprite} from "../../scene/game-level-scene/sprite/sprite"

export class Unit extends Sprite{
    constructor({sprite}) {
        super(sprite)
        this.walk = {
            right: {
                indexes:[145,146,147,148,149,150,151,152],
                endIndexes:[153,144,144,144,144,144,144,144],
                speed: 100,
                autorun: false,
                repeat: true,
            },
            left: {
                indexes:[119,120,121,122,123,124,125,126],
                endIndexes:[127,118,118,118,118,118,118,118],
                speed: 100,
                autorun: false,
                repeat: true,
            },
            down: {
                indexes:[132,133,134,135,136,137,138,139],
                speed: 100,
                autorun: false,
                repeat: true,
            },
            up: {
                indexes:[106,107,108,109,110,111,112,113],
                speed: 100,
                autorun: false,
                repeat: true,
            },
        }
        this.defaultAnim = {
                indexes:[1,2,3,4,5,6,7],
                speed: 100,
                autorun: false,
                repeat: true,
        }

        document.addEventListener('changeState', (event) => this.updateAnimation(event))
    }

    init(){
        if (this.type == 'player') {

        }
    }

    changeAnimation(name) {
        console.log('this.walk[name]: ', this.walk[name])
        console.log('name: ', name)
        this.animation.setFrames(this.walk[name].indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})))
        this.animation.setEndFrames(this.walk[name].endIndexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})))
        this.animation.speed = this.walk[name].speed
        this.animation.autorun = this.walk[name].autorun
        this.animation.repeat = this.walk[name].repeat
        this.animation.running = true
    }

    updateAnimation(event) {
        for (let index in this.state) {

            if (this.state[index] && index !== 'fire') {
                console.log('event: ', index)
                this.changeAnimation(index)
            }
        }

    }
}
