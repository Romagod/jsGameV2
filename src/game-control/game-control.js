import {Unit} from "./unit/unit"
import {Sprite} from "../scene/game-level-scene/sprite/sprite"

export class GameControl {

    constructor(game) {
        this.game = game
        this.up = 0
        this.down = 0
        this.left = 0
        this.right = 0
        this.fire = 0
        this.keyMap = new Map([
            [37,'left'],[39,'right'],[38,'up'],[40,'down'],[32,'fire']
        ])
        document.addEventListener('keydown', (event) => this.update(event, true))
        document.addEventListener('keyup', (event) => this.update(event, false))
        this.player = this.getPlayer()
    }

    getPlayer() {
        return new Unit({
            sprite: new Sprite({
                imageName: 'player',
                imageWidth: 832,
                imageHeight: 1344,
                type: 'player',
                sourceY: this.game.storage.tiles['default'].sourceY,
                sourceX: this.game.storage.tiles['default'].sourceX,
            })
        })
    }

    update(event, pressed) {
        if(this.keyMap.has(event.keyCode)) {
            event.preventDefault()
            event.stopPropagation()
            this[this.keyMap.get(event.keyCode)] = pressed
            this.player.setState(this.keyMap.get(event.keyCode), pressed)
            // if (!pressed) {
            //     this.player.animation.stop()
            // }else {
            //     this.player.animation.run()
            // }
        }
    }

    move(target) {
        dispatchEvent(this.game.eventAction)
        if(this.right) {

            if (target.type == 'player') {
                // target.changeAnimation('right')
            }
            if (this.game.settings.width <= target.x + this.game.settings.width/3 && this.game.currentScene.map.props.world.width >= (this.game.currentScene.map.coordinates.x*-1) + this.game.settings.width + 5) {
                this.game.currentScene.map.setXY(this.game.currentScene.map.coordinates.x - 5, this.game.currentScene.map.coordinates.y)
            }else {
                target.setXY(target.x + 5, target.y)
            }
        }
        if(this.left) {
            if (this.game.settings.width/3 >= target.x && this.game.currentScene.map.coordinates.x <= -5) {
                this.game.currentScene.map.setXY(this.game.currentScene.map.coordinates.x + 5, this.game.currentScene.map.coordinates.y)
            }else {
                target.setXY(target.x - 5, target.y)
            }
        }
        if(this.up) {
            if (this.game.settings.height/3 >= target.y && this.game.currentScene.map.coordinates.y <= -5) {
                this.game.currentScene.map.setXY(this.game.currentScene.map.coordinates.x, this.game.currentScene.map.coordinates.y  + 5)
            }else {
                target.setXY(target.x, target.y - 5)

            }
        }
        if(this.down) {
            if (this.game.settings.height <= target.y + this.game.settings.height/3 && this.game.currentScene.map.props.world.height >= (this.game.currentScene.map.coordinates.y*-1) + this.game.settings.height + 5) {
                this.game.currentScene.map.setXY(this.game.currentScene.map.coordinates.x, this.game.currentScene.map.coordinates.y  - 5)
            }else {
                target.setXY(target.x, target.y + 5)
            }
        }
    }
}
