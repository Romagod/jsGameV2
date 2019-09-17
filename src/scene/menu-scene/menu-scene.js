import {Scene} from "../scene"

export class MenuScene extends Scene{
    constructor(game) {
        super(game)
    }

    init() {
        super.init()
    }

    update(time) {
        if(this.game.control.fire) {
            this.finish(Scene.START_GAME)
        }
    }

    render(time) {
        this.update(time)
        this.screen.drawImage(0, 0, 'title')
        this.screen.print(250, 500, "Прес спасе", "#343434")
        super.render(time)
    }
}
