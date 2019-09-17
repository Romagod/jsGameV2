export class SpriteAnimation {
    constructor({imageName, frames, speed, repeat = true, autorun = true, width = 64, height = 64, sprite, endFrames}) {
        this.sprite = sprite
        this.width = width
        this.height = height
        this.imageName = sprite.imageName
        this.frames = frames
        this.endFrames = endFrames
        this.speed = speed
        this.repeat = repeat
        this.running = autorun
        this.lastTime = 0
        this.currentFrame = 0
        this.totalFrames = this.frames.length
        this.sourceX = this.sprite.sourceX
        this.sourceY = this.sprite.sourceY
        // this.type = 'animation'
    }

    setFrames(frames) {
        this.frames = frames
        this.totalFrames = this.frames.length
    }

    setEndFrames(frames) {
        this.endFrames = frames
    }

    setFrame(index) {

        this.currentFrame = index
        this.sourceX = this.frames[index].sx
        this.sourceY = this.frames[index].sy
    }

    run() {
        this.setFrame(0)
        this.running = true
    }

    stop() {
        console.log('stop: ')
        this.running = false
    }

    resetFrame() {
        // this.setFrame(0)
        this.setFrames(this.endFrames)
        this.repeat = false
        // this.endTotalFrames = this.endFrames.length
    }

    nextFrame() {
        if (this.imageName == "player") {
            console.log('this.currentFrame: ', this.currentFrame)
        }
        if((this.currentFrame + 1) == this.totalFrames) {
            if(this.repeat) {
                this.setFrame(0)
                return
            }
            this.stop()
            return
        }
        this.setFrame(this.currentFrame + 1)
    }

    update(time) {
        if(!this.running) {
            return
        }
        if(this.lastTime == 0) {
            this.lastTime = time
            return
        }
        if((time - this.lastTime) > this.speed) {
            if (this.lastTime + 50 < time) {
                this.lastTime = time
            }
            this.nextFrame()
            this.lastTime += this.speed
            console.log('this.speed: ', this.speed)
        }
    }
}
