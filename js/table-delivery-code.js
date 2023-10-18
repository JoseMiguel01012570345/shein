let nameInput = document.querySelector(".nameInput");
let dateInput = document.querySelector(".dateInput");

// Set the caret position after the starting writing place
function setCaretPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);

        // IE8 and below
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

// Set the cursor position of the "#test-input" element to the end when the page loads
setCaretPosition(nameInput, 10);
