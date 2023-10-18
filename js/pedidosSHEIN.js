//-------------------------------------------------
//---------------BUTTONS---------------------------
let buttoms = document.querySelector(".buttoms")
let optionBtnImg = document.querySelector(".option-btn img");
let optionBtn = document.querySelector(".option-btn");
let insert = document.querySelector(".insert");
let update = document.querySelector(".update");
let Delete = document.querySelector(".delete");
let completed = document.querySelector(".completed");
//-------------------------------------------------
let p = document.querySelectorAll(".p");
let taskSet = document.querySelectorAll(".task");
let taskList = document.querySelector(".task-list");
let checkBox = document.querySelectorAll("input");
let containerTask = document.querySelector(".container-task");
//----------------------------------------------------
//EVENTS
//...............................
//.......GLOBAL VARIABLES........
let operation = "";
let option = false;
//deletion
let task = []

//insertion
let max = 0;
let firstClicked = 1;

//update
let activated = true;
let updateTask = "";
let indexCheckBox = "";
//................................

completed.addEventListener("click", (event) => {// completed delivery

    for (let element of checkBox) {

        if (element.checked == true) {

            if (contains(task, element)) {


                let index = element.className.split(" ")[2];
                console.log(index + " contained");

                document.querySelector(`.p${index}`).style.setProperty("text-decoration", "none");

                task = remove(task, element);

                element.checked = false;

            }
            else {
                task.push(element);

                let index = element.className.split(" ")[2];
                console.log(index + " not contained");
                document.querySelector(`.p${index}`).style.setProperty("text-decoration", "line-through");

                element.checked = false;
            }
        }
    }
})

const remove = (list, target) => {

    let newList = [];

    for (let element of list) {

        if (element === target) continue;

        newList.push(element);
    }
    return newList;
}

const contains = (list, target) => {

    for (element of list) {

        if (element === target)
            return true;
    }
    return false
}

const makeBluur = () => {//events
    p.forEach(element => element.addEventListener("mouseenter", (event) => {

        p.forEach(element => {
            if (element != event.target) {
                element.style.setProperty("filter", "blur(2px)");
            }
        })
        checkBox.forEach(element => {
            element.style.setProperty("filter", "blur(2px)");
        })

    }))
    p.forEach(element => element.addEventListener("mouseout", (event) => {
        p.forEach(element => {
            if (element != event.target)
                element.style.setProperty("filter", "none");
        })
        checkBox.forEach(element => {
            element.style.setProperty("filter", "none");
        })
    }))
}

document.addEventListener("keydown", (event) => {// manage enter key

    let intro = document.querySelector(".intro-task")

    if (event.keyCode == 13 && intro != null) {

        if (operation == "insert" || operation == "")
            insertOnKeyPress(event);

        else
            if (operation == "update" || operation == "")
                updateOnKeyPress();
    }
    else {

        if (event.key.length == 1 && event.key != "" && intro != null && event.target != intro) {
            intro.value += event.key;
        }
    }
})

makeBluur();// paragraph blur

const updating = () => {
    p = document.querySelectorAll(".p");
    taskSet = document.querySelectorAll(".task");
    taskList = document.querySelector(".task-list");
    checkBox = document.querySelectorAll("input");
}
document.addEventListener("click", (event) => {

    intro = document.querySelector(".intro-task");

    if (intro != null && taskSet.length > 1 && event.target != intro) {

        intro.parentNode.remove();

        operation = "";

        firstClicked = 0;

        updating()
        makeBluur();
    }
    else if (event.target == insert) {

        insertHandler();

    }
    else if (event.target == update) {

        updateHandler();


    } else if (event.target == Delete || event.target == setting || event.target == completed) {


    }
    else {

        if (event.target == optionBtn || event.target == optionBtnImg) {
            if (option == true) {
                buttoms.style.setProperty("animation", "fall .4s linear");
                buttoms.style.setProperty("top", "-10px");

                setTimeout(() => {
                    buttoms.style.setProperty("display", "none");
                }, 300);

                option = false;
            }
            else {
                buttoms.style.setProperty("display", "flex");
                buttoms.style.setProperty("top", "22px");
                buttoms.style.setProperty("animation", "menu .35s linear");
                option = true;
            }
        }
        else if (option == true) {

            buttoms.style.setProperty("animation", "fall .4s linear");
            buttoms.style.setProperty("top", "-20px");

            setTimeout(() => {
                buttoms.style.setProperty("display", "none");
            }, 300);

            option = false;

        }
    }
})
//..............................................................
//.........................DELETE...............................
const buildInputTaskForDelete = () => {
    taskList.innerHTML = `
    <div class="task task1">
    <input class="intro-task"  type="text" placeholder="task">
    </div>
    `;

    activated = true;
    firstClicked = 1;

    updating();
    makeBluur();
}
const taskToDelete = () => {

    let index = 0;
    let newTaskList = [];
    let numberCheckBox = 0;

    checkBox.forEach(element => {

        index++;

        if (!element.checked) {

            let taskIndex = element.className.split(" ")[2];

            newTaskList.push(`<div class="task task${taskIndex}">` + document.querySelector(`.task${taskIndex}`).innerHTML + `</div>`);

            task = remove(task, element);//remove element from done tasks

        } else
            numberCheckBox++;
    })
    return { index: index, newTaskList: newTaskList, numberCheckBox: numberCheckBox };
}
Delete.addEventListener("click", () => {//deletion buttom

    if (operation != "delete" && operation != "") {
        alert("finish " + operation);
        return;
    }

    if (checkBox.length > 1) {

        let aux = taskToDelete();
        let index = aux.index;
        let newTaskList = aux.newTaskList;
        let numberCheckBox = aux.numberCheckBox;

        if (numberCheckBox == index) {//all tasks will be deleted

            buildInputTaskForDelete();

        } else {//paste non-marked elements into task-list

            taskList.innerHTML = "";

            newTaskList.forEach(element => {

                taskList.innerHTML += element;
            })
        }
    }
    else {

        alert("Can't delete");
    }
    updating();
    makeBluur();
})
//.........................DELETE...............................
//..............................................................
/*                          ||||                                */
//..............................................................
//.........................UPDATE...............................
const check_checkBox_for_update = () => {

    let numbChecked = 0;

    for (let element of checkBox) {

        if (element.checked) {

            numbChecked++;

            if (numbChecked > 1) {

                alert("you can't update more than a task at a time");

                return [numbChecked, true];
            }
        }
    }

    return [numbChecked, false];
}
const buildIntroTaskForUpdate = () => {

    for (element of checkBox) {

        if (element.checked) {//pick the checkbox's number up to reach the task's number

            let indexCheckBox = element.className.split(" ")[2];

            updateTask = document.querySelector(`.task${indexCheckBox}`).innerHTML;

            document.querySelector(`.task${indexCheckBox}`).innerHTML =//set input text up
                `<input class="intro-task"  type="text" placeholder="task">`;

            task = remove(task, element);

            updating();
            makeBluur();

            activated = true;

            return indexCheckBox;
        }
    }
}
const buildNewUpdatedTask = (indexCheckBox, activatedInput) => {

    document.querySelector(`.task${indexCheckBox}`).innerHTML = `
    <input class="in in${indexCheckBox} ${indexCheckBox}" type="checkbox" style="margin: 10px;">
    <a href="">
        <p class="p p${indexCheckBox}" style="text-decoration:none;">
        ${activatedInput.value}
    </p>
    </a>
     `;

    activated = false;

    updating();
    makeBluur();

    operation = "";

    return;
}
const updateHandler = () => {

    if (operation != "update" && operation != "") {
        alert("finish " + operation);
        return;
    }

    let aux = check_checkBox_for_update();

    let numbChecked = aux[0];

    let exit = aux[1];

    if (activated == false && exit == false) {

        indexCheckBox = buildIntroTaskForUpdate();

        operation = "update";
    }

    else
        if (activated == true && numbChecked == 0) {

            let activatedInput = document.querySelector(".intro-task");

            if (activatedInput.value != "") {

                buildNewUpdatedTask(indexCheckBox, activatedInput);

            } else
                alert("fill the empty task");
        }
        else
            if ((activated == false && exit == true) || (activated == true && numbChecked != 0)) {

                alert("Can't update, please unmark all check boxs");
            }
}
const updateOnKeyPress = () => {

    if (insertValidation() == true) {


        for (element of checkBox) {//check if there are inputs activated

            if (element.checked) {

                alert("Can't update, please unmark all check boxs");

                return;
            }
        }

        let activatedInput = document.querySelector(".intro-task");

        if (activatedInput.value != "") {

            buildNewUpdatedTask(indexCheckBox, activatedInput);

        }
    }

}
//.........................UPDATE...............................
//..............................................................
/*                          ||||                                */
//..............................................................
//.........................INSERT...............................
const bodyInsert = () => {


    //insert the value of the input box into paragraphs tags
    let newTask = document.querySelector(`.task${max} `);

    newTask.innerHTML = `
    <input class="in in${max} ${max}" type = "checkbox" style = "margin: 10px;">
        <a href="">
        <p class="p p${max}">
            ${document.querySelector(".intro-task").value}
        </p>
    </a>   `;
    firstClicked = 0;//resert click count

    activated = false;//intro-task is not actived any longer

    newTask.scrollIntoView({ behavior: 'smooth', block: 'start' });

    operation = "";

    updating();
    makeBluur();

}
const insertHandler = () => {

    if (operation != "insert" && operation != "") {
        alert("finish " + operation);
        return;
    }

    firstClicked++;

    if (insertValidation() == false && firstClicked >= 2) {

        alert("Can't insert,please fill an empty task");

        return;
    }

    getNumberTask();//find the last task created

    if (document.querySelector(".intro-task") != null)
        bodyInsert();
    else {

        max++;

        taskList.innerHTML += ` <div class="task task${max}" > <input class="intro-task" type="text" placeholder="task"></div>`;

        operation = "insert";

        document.querySelector(".intro-task").scrollIntoView({ behavior: 'smooth', block: 'start' });

        updating();
        makeBluur();
    }
}
const insertOnKeyPress = (event) => {

    if (insertValidation() == false) {

        alert("Can't insert,please fill an empty task");

        return;
    }

    getNumberTask();//find the last task created

    if (document.querySelector(".intro-task") != null)
        bodyInsert();
}
const getNumberTask = () => {
    let num = 0;
    max = 0;
    taskSet.forEach(element => {

        num = Number(element.className.split(" ")[1].substring(4));

        if (num > max)
            max = num;

    });
}
//.........................INSERT...............................
//..............................................................

//--------------------------------------------------------------
//----Validation------------------------------------------------
const insertValidation = () => {

    let introTask = document.querySelector(".intro-task");

    if (introTask != null) {

        if (introTask.value != "")
            return true;
        else
            return false
    }
    else
        return false;
}
//--------------------------------------------------------------