import { ControlManagerMixin } from "./Mixins/ControlManagerMixin.js";

window.jsforms = {
    ctx2d: null,
    gui: null
};

export class Gui {
    constructor(canvas) {
        this._focusedControl = null;    // store the currently focused control
        this._hoveredControl = null;    // store the currently hovered control
        this._shouldRender = true;
        this._canvas = canvas;

        this.ctrlFillStyle = "lightgray";
        this.ctrlStrokeStyle = "";
        this.ctrlFont = "12px sans-serif";
        this.ctrlFontStyle = "black";
        this.ctrlTextAlign = "center";
        this.ctrlTextBaseline = "middle";
        this.ctrlFocusStrokeStyle = "rgba(0,0,0,.75)";

        if (canvas.getContext) {
            this._ctx2d = canvas.getContext("2d");
        }
        else {
            alert("Unable to initialize canvas 2d context. Your browser or machine may not support it.");
            return;
        }

        Object.assign(this, ControlManagerMixin);

        canvas.addEventListener("pointerup", e => this.offsetEvent(e));
        canvas.addEventListener("pointermove", e => this.offsetEvent(e));

        this._timer = setInterval(() => this.Draw(), 1000/60);

        window.jsforms.gui = this;
    }

    offsetEvent(e) {
        let r = e.currentTarget.getBoundingClientRect();
        e.jsformsX = e.clientX - r.left;
        e.jsformsY = e.clientY - r.top;
        this.ForwardEvent(e);
    }

    onpointermove() {
        if (this._hoveredControl != null) {
            this._hoveredControl._hovered = false;
            this._hoveredControl = null;
            this.Render();
        }
        return true;
    }

    onpointerup(e) {
        if (e.button == 0 && e.isPrimary) {
            this._focusedControl = null;
            this.Render();
            return true;
        }
        return false;
    }

    Render() {
        this._shouldRender = true;
    }

    Draw() {
        if (this._shouldRender) {
            this._ctx2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
            // Draws the controls from low z-order to high z-order.
            for (let i = this.controls.length - 1; i >= 0; --i) {
                this.controls[i].Draw();
            }
            this._shouldRender = false;
        }
    }
}
