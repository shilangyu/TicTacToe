/**
 * Creates an instance of Tile.
 * @param {p5.Vector} position x and y of the tile
 * @param {p5.Vector} size width and height of the tile
 */
class Tile {
    constructor(pos, size) {
        this.pos = pos
        this.size = size
        this.type = null
    }

    draw() {
        let sign = this.type || ''

        push()
        textSize(64)
        textAlign(CENTER, CENTER)
        fill(0)
        text(sign, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2)
        pop()
    }

    wasClicked(point) {
        return point.x > this.pos.x && point.x < this.pos.x + this.size.x && point.y > this.pos.y && point.y < this.pos.y + this.size.y
    }


}