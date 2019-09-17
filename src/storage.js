export class Storage {

    constructor(game) {
        this.game = game
        this.maps = {
            default: require('./maps/firstMap.json')
        }
        this.tiles = {
            'default': {
                sourceX: 0,
                sourceY: 0,
                x: 0,
                y: 0,
            }
        }
    }

}
