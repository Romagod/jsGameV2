import {Screen} from "./screen/screen"
import {Scene} from "./scene/scene"
import {LoadingScene} from "./scene/loading-scene"
import {MenuScene} from "./scene/menu-scene/menu-scene"
import {GameVisual} from "./screen/game-visual/game-visual"
import {Settings} from "./settings"
import {GameControl} from "./game-control/game-control"
import {Storage} from "./storage"
import {GameLevelScene} from "./scene/game-level-scene/game-level-scene"

export class Game {
    constructor({width = 640, height = 640} = {}) {
        this.storage = new Storage(this)
        this.settings = new Settings(this, width, height)

        this.scenes = {
            loading: new LoadingScene(this),
            mainMenu: new MenuScene(this),
            gameLevel: new GameLevelScene(this),
        }
        this.currentScene = this.scenes.loading
        this.currentScene.init()
        this.move = false

        this.eventAction = new CustomEvent('actionMove', {
            detail:{}
        })

        this.control = new GameControl(this)
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return this.scenes.mainMenu
            case Scene.START_GAME:
                this.move = true
                return this.scenes.gameLevel
            default:
                return this.scenes.loading
        }
    }

    frame(time) {
        if(this.currentScene.status !== Scene.WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status)
            this.currentScene.init()
        }
        this.currentScene.render(time)
        requestAnimationFrame(time => this.frame(time))
        this.control.player.animation.update(time)
        if (this.move) {
            this.control.move(this.control.player)
        }
    }

    run() {
        requestAnimationFrame(time => this.frame(time))
    }
}
