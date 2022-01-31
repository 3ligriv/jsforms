import { Control } from "../Control.js";

export class ScrollBar extends Control {
    /**
     * Create a scrollbar
     * @param {*} parent Control or Gui
     * @param {int} x Position x
     * @param {int} y Position y
     * @param {int} width Width
     * @param {int} height Heigth
     * @param {int} scrollableSize Width or height of the element to scroll
     * @param {bool} vertical True if vertical scrollbar (default), false otherwise
     * @param {int} z Z-order
     */
    constructor(parent, x, y, width, height, scrollableSize, vertical = true, z = 0) {
        super(parent, x, y, width, height, z);

        this.vertical = vertical;
        this.cursorOffset = 0;
        this.scrollableSize = scrollableSize;
        this.fillStyle = "rgba(255, 255, 255, .25)";
        this.hoverFillStyle = "rgba(255, 255, 255, .75)";
        this._hovered = false;
    }

    onpointermove(e) {
        this._hovered = true;
        window.jsforms.gui._hoveredControl = this;
        window.jsforms.gui.Render();
        return true;
    }

    Draw() {
        let ctx = window.jsforms.gui._ctx2d;
        ctx.beginPath();
        let radius = .5 * (this.vertical ? this.width : this.height);
        ctx.moveTo(this.x, this.y + radius);
        ctx.arcTo(this.x, this.y + this.height, this.x + radius, this.y + this.height, radius);
        ctx.arcTo(this.x + this.width, this.y + this.height, this.x + this.width, this.y + this.height - radius, radius);
        ctx.arcTo(this.x + this.width, this.y, this.x + this.width - radius, this.y, radius);
        ctx.arcTo(this.x, this.y, this.x, this.y + radius, radius);
        ctx.fillStyle = this._hovered ? this.hoverFillStyle : this.fillStyle;
        ctx.fill();
    }
}
