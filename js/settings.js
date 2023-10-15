let title = document.querySelector(".title");
let buttons = document.querySelector(".buttons");
let setting = document.querySelector(".settings");
//--------------------------------------------------------------------------
//-----------------------prices---------------------------------------------
let priceBuyer = document.querySelector(".precio-comprador");
let myPrice = document.querySelector(".mi-precio");
let mySettings = document.querySelector(".my-settings");
//--------------------------------------------------------------------------

document.addEventListener("click", (event) => {

    if (event.target != priceBuyer && event.target != myPrice && event.target != setting) {

        title.style.setProperty("filter", "none");

        taskList.style.setProperty("filter", "none");

        buttons.style.setProperty("filter", "none");

        mySettings.style.setProperty("display", "none");
    }
    else
        if (event.target == setting) {

            mySettings.style.setProperty("display", "grid");

            title.style.setProperty("filter", "blur(5px)");

            taskList.style.setProperty("filter", "blur(5px)");

            buttons.style.setProperty("filter", "blur(5px)");
        }

})