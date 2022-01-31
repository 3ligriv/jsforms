export let ControlManagerMixin = {
    _clientX: 0,                        // Position X of the control client view
    _clientY: 0,                        // Position Y of the control client view
    _clientWidth: 0,                    // Width of the control client view
    _clientHeight: 0,                   // Height of the control client view
    _clientZoom: 1.,                    // Zoom of the control client view
    controls: Array(),                  // list of controls
    excludeChildrenAreaOnClick: true,   // Should the area of the child controls be excluded on click events
    SortControls() {
        this.controls.sort((a, b) =>
            (a.z - b.z) + 1 / (a.width * a.height - b.width * b.height)
        );
        // order by z-order and surface: controls in the foreground and bigger have greater chance to be interracted with.
    },
    /**
     * Forward an event to a child of this control.
     * @param {Event} e An event to propagate.
     * @returns True if the event has been managed by a child, false otherwise.
     */
    ForwardEvent(e) {
        let eventManaged = false;
        if (e.type.startsWith("key") || e.type.startsWith("composition")) { // text input or keyboard interaction
            if (window.jsforms.gui._focusedControl == null) {
                eventManaged = false;
            }
            else {
                // get the symbol "focusedControl" from current Parent (this) and call method "on" + event type (eg: onkeyup()).
                // this method should return true if event has been handeld successfully or false otherwise
                try {
                    eventManaged = window.jsforms.gui._focusedControl["on" + e.type](e);
                }
                catch (err) {
                    if (err.name == "TypeError") {
                        // there is no handler for this event
                        eventManaged = false;
                    }
                    else {
                        throw err;
                    }
                }
            }
        }
        else { // pointer events or other position-dependant events
            // find the first control for which the event pos is within its boundaries.
            // if multiple controls are found, the first one has the greatest z-order (hence why we order by z-order and then surface).
            let ctrl = this.controls.find(c =>
                c.x < e.jsformsX && e.jsformsX < c.rightBorder &&
                c.y < e.jsformsY && e.jsformsY < c.bottomBorder);
            if (ctrl === undefined) {
                eventManaged = false;
            }
            else {
                try {
                    // call method on<eventtype>(event)
                    eventManaged = ctrl["on" + e.type](e);
                    if (e.type == "pointerup") {
                        // change focus on mouse click
                        if (eventManaged && window.jsforms.gui._focusedControl != ctrl) {
                            window.jsforms.gui._focusedControl = ctrl;
                            window.jsforms.gui.Render();
                        }
                        // if the event was a click, consider it managed, otherwise the parent control would try to manage clicks on children.
                        if (this.excludeChildrenAreaOnClick) {
                            eventManaged = true;
                        }
                    }
                }
                catch (err) {
                    if (err.name == "TypeError") {
                        eventManaged = false;
                    }
                    else {
                        throw err;
                    }
                }
            }
        }
        // if no child has managed the event, search a method on this control
        if (!eventManaged) {
            try {
                eventManaged = this["on" + e.type](e);
            }
            catch (err) {
                if (err.name == "TypeError") {
                    eventManaged = false;
                }
                else {
                    throw err;
                }
            }
        }
        return eventManaged;
    }
}
