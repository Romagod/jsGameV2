import {Screen} from "../screen/screen"

export class Scene{
    constructor(game) {
        this.game = game
        this.status = this.constructor.WORKING
        this.screen = new Screen(this.game.settings.width, this.game.settings.height)
        this.screen.loadImages({
            npc: 'img/npc.png',
            player: 'img/hero.png',
            title: 'img/tileset/title.png',
            tiles: 'img/tileset/newTiles.png'
        })
    }
    static get WORKING() { return 'WORKING' }
    static get LOADED() { return 'LOADED' }
    static get START_GAME() { return 'START_GAME' }
    static get GAME_OVER() { return 'GAME_OVER' }
    static get GAME_WIN() { return 'GAME_WIN' }
    static get FINISHED() { return 'FINISHED' }

    init() {
        this.status = this.constructor.WORKING
    }

    finish(status) {
        this.status = status
    }

    render (time) {

    }
}
