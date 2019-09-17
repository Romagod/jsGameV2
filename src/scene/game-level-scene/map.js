import {Sprite} from "./sprite/sprite"

export class Map {
    constructor(game) {
        this.game = game
        // this.scene = scene
        const mapData = this.game.storage.maps.default
        this.coordinates = this.game.storage.tiles['default']

        this.tiles = new Sprite({
            imageName: 'tiles',
            imageWidth: 576,
            imageHeight: 384
        })

        this.props = {
            badManTiles: new Sprite({
                imageName: 'npc',
                imageWidth: 832,
                imageHeight: 1344,
                type: 'npc',
                sourceY: 0,
                sourceX: 0,
            }),

            world: this.game.currentScene.screen.createMap("ritflecOfec", mapData, this.tiles)
        }
    }

    drawMap() {
        return this.game.currentScene.screen.drawSprite(this.props.world)
    }

    drawEnvironmetn() {
        return this.game.currentScene.screen.drawSprite(this.props.badManTiles)
    }

    drawNpc() {
        return this.game.currentScene.screen.drawSprite(this.props.badManTiles.animation)
    }

    drawPlayer() {
        return this.game.currentScene.screen.drawSprite(this.game.control.player.animation)
    }

    setXY(x, y) {
        this.coordinates.x = x
        this.coordinates.y = y
        let prop
        for (prop in this.props) {
            this.props[prop].setXY(x,y)
        }
    }
}
