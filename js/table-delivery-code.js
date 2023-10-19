let nameInput = document.querySelector(".nameInput");
let dateInput = document.querySelector(".dateInput");
let dateh4 = document.querySelector(".date h4");
let nameh4 = document.querySelector(".name h4");

// Set the caret position after the starting writing place
function setWidthOfNameh4_dateh4() {

    let nameInput_width = window.getComputedStyle(nameInput).getPropertyValue("height");
    let dateInput_width = window.getComputedStyle(dateInput).getPropertyValue("height");

    nameh4.style.setProperty("height", `${nameInput_width}`);
    dateh4.style.setProperty("height", `${dateInput_width}`);

}

// Set the cursor position of the "#test-input" element to the end when the page loads
setWidthOfNameh4_dateh4();

window.addEventListener("resize", function () {

    setWidthOfNameh4_dateh4();

});


