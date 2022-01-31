import { Control } from "../Control.js";

export class Button extends Control {
    /**
     * Create a scrollbar
     * @param {*} parent Control or Gui
     * @param {int} x Position x
     * @param {int} y Position y
     * @param {int} width Width
     * @param {int} height Heigth
     * @param {string} text The text of the button
     * @param {int} z Z-order
     */
    constructor(parent, x, y, width, height, text, z = 0) {
        super(parent, x, y, width, height, z);

        this.text = text;
        this.fillStyle = window.jsforms.gui.ctrlFillStyle;
        this.strokeStyle = window.jsforms.gui.ctrlStrokeStyle;
        this.font = window.jsforms.gui.ctrlFont;
        this.fontStyle = window.jsforms.gui.ctrlFontStyle;
        this.textAlign = window.jsforms.gui.ctrlTextAlign;
        this.textBaseline = window.jsforms.gui.ctrlTextBaseline;
        this.focusStrokeStyle = window.jsforms.gui.ctrlFocusStrokeStyle;
    }

    Click(e) {
        alert("No click method!");
    }

    onpointerup(e) {
        if (e.button == 0 && e.isPrimary) {
            this.Click(e);
            return true;
        }
        return false;
    }

    Draw() {
        let ctx = window.jsforms.gui._ctx2d;
        ctx.beginPath();
        let radius = 3;
        ctx.moveTo(this.x, this.y + radius);
        ctx.arcTo(this.x, this.y + this.height, this.x + radius, this.y + this.height, radius);
        ctx.arcTo(this.x + this.width, this.y + this.height, this.x + this.width, this.y + this.height - radius, radius);
        ctx.arcTo(this.x + this.width, this.y, this.x + this.width - radius, this.y, radius);
        ctx.arcTo(this.x, this.y, this.x, this.y + radius, radius);
        if (this.strokeStyle > "") {
            let t = this.strokeStyle.split(' ');
            ctx.lineWidth = parseInt(t[0].replace("px"));
            ctx.strokeStyle = t[1];
            ctx.stroke();
        }
        if (this.fillStyle > "") {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        if (window.jsforms.gui._focusedControl == this) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.focusStrokeStyle;
            ctx.setLineDash([4,2]);
            ctx.moveTo(this.x + 2, this.y + 2 + radius);
            ctx.arcTo(this.x + 2, this.y - 2 + this.height, this.x + 2 + radius, this.y - 2 + this.height, radius);
            ctx.arcTo(this.x - 2 + this.width, this.y - 2 + this.height, this.x - 2 + this.width, this.y - 2 + this.height - radius, radius);
            ctx.arcTo(this.x - 2 + this.width, this.y + 2, this.x - 2 + this.width - radius, this.y + 2, radius);
            ctx.arcTo(this.x + 2, this.y + 2, this.x + 2, this.y + 2 + radius, radius);
            //ctx.closePath();
            ctx.stroke();
        }
        ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.fillStyle = this.fontStyle;
        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        // workaround because textAlign = center doesn't work :(
        if (this.textAlign == "center") {
            ctx.textAlign = "left";
            ctx.fillText(this.text, this.x + this.width / 2 - Math.min(ctx.measureText(this.text).width / 2, (this.width - 10) / 2), this.y + this.height / 2, this.width - 10);
        } else {
            ctx.textAlign = this.textAlign;
            ctx.fillText(this.text, this.x + 5, this.y + this.height / 2, this.width - 10);
        }
    }
}
