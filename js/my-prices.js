let insertBtn = document.querySelector(".insert-btn");
let precioCompradorTable = document.querySelector(".precio-comprador-table");

let trash = document.querySelectorAll(".trash-btn");
let from = document.querySelectorAll(".from");
let to = document.querySelectorAll(".to");
let sum = document.querySelectorAll(".sum");
let row = document.querySelectorAll(".row");
//-------------------------------------------------------------------
//--------------------UTILIES----------------------------------------
function update() {
    trash = document.querySelectorAll(".trash-btn");
    from = document.querySelectorAll(".from");
    to = document.querySelectorAll(".to");
    sum = document.querySelectorAll(".sum");
    row = document.querySelectorAll(".row");
    updateValue();
    deleting();
    scale();
}
function scale() {

    row.forEach(element => {

        element.addEventListener("mouseover", () => {

            row.forEach(item => {
                if (item != element)
                    item.style.setProperty("filter", "blur(5px)");
            })

        })
        element.addEventListener("mouseout", () => {

            row.forEach(item => {
                if (item != element)
                    item.style.setProperty("filter", "none");
            })
        })
    })
}
scale()
//-------------------------------------------------------------------

//--------------------INSERT-----------------------------------------
//-------------------------------------------------------------------
const insertRow = (num) => {

    let row = `
    <div class="row row${num}" style=" display: grid;grid-template-columns: repeat(4, 1fr);text-align: center; ">

                <div class="from from${num}" style="border: 1px solid black;display:flex; justify-content:center; align-items:center;">
                    <h3 class="hfrom hfrom${num}" >-</h3>
                </div>

                <div class="to to${num}" style="border: 1px solid black;display:flex; justify-content:center; align-items:center;">
                    <h3 class="hto hto${num}" >-</h3>
                </div>

                <div class="sum sum${num}" style="border: 1px solid black;display:flex; justify-content:center; align-items:center;">
                    <h3 class="hsum hsum${num}">-</h3>
                </div>
                <button class="trash-btn trash-btn${num}">
                    <img src="img/icons8-trash-128.png" alt="">
                </button>
            </div>`;

    precioCompradorTable.innerHTML += row;

    update();

    document.querySelector(`.row${num}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
}
let max = 0;
insertBtn.addEventListener("click", () => {

    getMaxNumber();

    max++

    insertRow(max);

})
function getMaxNumber() {

    max = 0;

    for (let element of row) {

        let num = Number(element.className.split(" ")[1].substring(3));

        if (num > max) max = num;

    }
}
//--------------------UPDATE-----------------------------------------
//-------------------------------------------------------------------
function updateValue() {

    from.forEach(element => element.addEventListener("click", event => {

        let value = prompt("introduce value");

        if (Number(value)) {

            let num = String(event.target.className).split(" ")[1].substring("from".length);

            document.querySelector(`.hfrom${num}`).innerHTML = value;
        }
        else
            alert("Write a number");
    }))

    to.forEach(element => element.addEventListener("click", event => {

        let value = prompt("introduce value");

        if (Number(value)) {

            let num = String(event.target.className).split(" ")[1].substring("to".length);

            document.querySelector(`.hto${num}`).innerHTML = value;
        }

        else
            alert("Write a number");
    }))

    sum.forEach(element => element.addEventListener("click", event => {

        let value = prompt("introduce value");

        if (Number(value)) {

            let num = String(event.target.className).split(" ")[1].substring("sum".length);
            console.log(event.target.className);
            document.querySelector(`.hsum${num}`).innerHTML = value;
        }

        else
            alert("Write a number");
    }))


}
updateValue();
//--------------------DELETE-----------------------------------------
//-------------------------------------------------------------------
function removeRow(num) {

    let deleteRow = document.querySelector(`.row${num}`);
    let table = []

    for (element of row) {

        if (element != deleteRow)
            table.push(element);
    }
    precioCompradorTable.innerHTML = "";

    table.forEach(element => {

        let index = String(element.className).split(" ")[1].substring("row".length);

        precioCompradorTable.innerHTML += `<div class="row row${index}" style=" display: grid;grid-template-columns: repeat(4, 1fr);text-align: center;"> ` + element.innerHTML + `</div>`

    });

    update()
}
function deleting() {

    trash.forEach(element => element.addEventListener("click", (event) => {

        let num = String(element.className).split(" ")[1].substring("trash-btn".length);

        removeRow(num);

        update();
    }))
}
deleting();