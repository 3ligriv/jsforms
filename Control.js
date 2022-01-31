export class Control {
    /**
     * 
     * @param {*} parent Control or Gui
     * @param {int} x Position x
     * @param {int} y Position y
     * @param {int} width Width
     * @param {int} height Height
     * @param {int} z Z-order
     */
    constructor(parent, x, y, width, height, z = 0) {
        this._parent = parent;
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
    }

    get rightBorder() {
        return this.x + this.width;
    }

    get bottomBorder() {
        return this.y + this.height;
    }

    Draw() {
        let ctx = window.jsforms.gui._ctx2d;
        let no_texture = new Image();
        let ctrl = this;
        no_texture.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAGUExURQAAAP8A/zb9Yq8AAAAUSURBVAjXY/h/gIGBGMxg/4EYDAAFkR1NQArf8AAAAABJRU5ErkJggg==";
        no_texture.onload = function() {
            ctx.fillStyle = ctx.createPattern(no_texture, "repeat");
            ctx.fillRect(ctrl.x, ctrl.y, ctrl.width, ctrl.height)
            ctx.font = "10px sans-serif";
            ctx.fillStyle = "Black";
            ctx.fillText("No Draw() method!", 0, 0, ctrl.width);
        }
    }
}
