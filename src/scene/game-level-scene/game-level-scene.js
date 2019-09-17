import {Scene} from "../scene"
import {Map} from "./map"

export class GameLevelScene extends Scene {
    constructor(game) {
        super(game)


        // this.badManTiles = this.badManTiles.getAnimation([1,2,3,4,5,6,7], 300)
    }

    init() {
        this.map = new Map(this.game)
        this.screen.loadImages({
            npc: 'img/npc.png',
            player: 'img/hero.png',
            title: 'img/tileset/title.png',
            tiles: 'img/tileset/newTiles.png'
        })
        super.init()
    }

    update(time) {
        let prop
        for (prop in this.map.props) {
            if (this.map.props[prop].type !== 'map') {
                this.map.props[prop].animation.update(time)
            }
        }
    }

    render(time) {
        this.update(time)
        this.game.currentScene.screen.fill('#000000')
        this.map.drawMap()
        // this.map.drawEnvironmetn()
        this.map.drawNpc()
        this.map.drawPlayer()

        //this.game.screen.drawSprite(this.tree)
        // this.game.screen.drawSprite(this.badManTiles.animation)
        super.render(time)
    }
}
