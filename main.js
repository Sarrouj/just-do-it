let btn = document.querySelector('.headerBtn');
let header = document.querySelector('.header');
let logo = document.querySelector('.logo');
let headerP = document.querySelector('.headerP');
let about = document.querySelector('.About');
let reset = document.querySelector('.Reset');
let addBtn = document.querySelector('.button');
let taskTitle = document.querySelector('.taskTitle');
let description = document.querySelector('.descriptionTextArea');
let startDate = document.querySelector('.startDateInput');
let endDate = document.querySelector('.endDateInput');
let errorOutputStartDate = document.querySelector('.startError');
let errorOutputEndtDate = document.querySelector('.endError');
let errorTitle = document.querySelector('.errorTitle');
let errorDescription = document.querySelector('.errorDescription');
let tasksContainer = document.querySelector('.tasksContainer');
let form = document.getElementById('form');
let radioLow = document.getElementById('Low');
let radioMidle = document.getElementById('Midle');
let radioUrgent = document.getElementById('Urgent');

let existingTasks;
// Animate Header
btn.addEventListener('click', ()=>{
    header.classList.add('animation');
    logo.classList.add('animationLogo');
    headerP.classList.add('displayNone');
    btn.classList.add('displayNone');
    about.classList.add('displayLinks');
    reset.classList.add('displayLinks');
})

// key to generate tasks header once
let done = true;

// generate tasks header
function taskHeader(){
    if(done){
        done = false;
        let taskTitle = document.querySelector('.title');
        let h4 = document.createElement('h4');
        h4.textContent = 'Tasks';
        taskTitle.appendChild(h4);
     
         // filters
         let filters = document.querySelector('.filters');
         let liLow = document.createElement('li');
         let liMiddle = document.createElement('li');
         let liUrgent = document.createElement('li');
         let liCompleted = document.createElement('li');
         liLow.textContent = 'Low';
         liMiddle.textContent = 'Middle';
         liUrgent.textContent = 'Urgent';
         liCompleted.textContent = 'Completed';
         filters.appendChild(liLow);
         filters.appendChild(liMiddle);
         filters.appendChild(liUrgent);
         filters.appendChild(liCompleted); 
    }
}

// generate Colors to Output
function generateColors(p, iconsDiv, fromDiv, toDiv, remainingDiv){
    switch(true){
        case radioLow.checked:
            iconsDiv.classList.add('low');
            p.classList.add('low');
            fromDiv.classList.add('low');
            toDiv.classList.add('low');
            remainingDiv.classList.add('low');
            break;
        case radioMidle.checked:
            iconsDiv.classList.add('middle');
            p.classList.add('middle');
            fromDiv.classList.add('middle');
            toDiv.classList.add('middle');
            remainingDiv.classList.add('middle');
            break;
        case radioUrgent.checked:
            iconsDiv.classList.add('urgent');
            p.classList.add('urgent');
            fromDiv.classList.add('urgent');
            toDiv.classList.add('urgent');
            remainingDiv.classList.add('urgent');
            break;
    }
}


// Store the Data in the Local Storage
function localStorageGenerate(taskId){
    let taskObject = {
        id : taskId,
        title : taskTitle.value,
        description : description.value,
        startDate : startDate.value,
        endDate : endDate.value,
    }
    // if there's a task get it from Local Storage if not make an empty array;
    existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Push the TaskObject to existing Tasks. push the new task to existing tasks
    existingTasks.push(taskObject);
    // set the localStorage if it the first time will set it , if not we will update.$
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
}

// generate the value in the task Container
function generate(){
    let taskId = Date.now();
    localStorageGenerate(taskId);

    // Generate Task Title Bar
    let liTask = document.createElement('li');
    liTask.className = 'task';
    liTask.setAttribute('id', taskId);
    let taskTitltBarDiv = document.createElement('div');
    taskTitltBarDiv.setAttribute('class', 'taskTitleBar flexRow');
    let radioTitleDiv = document.createElement('div');
    radioTitleDiv.setAttribute('class', 'tasksHeader flexRow');
    let inputRadio = document.createElement('input');
    inputRadio.setAttribute('type', 'radio');
    let taskp = document.createElement('p');
    taskp.setAttribute('class', 'task');
    taskp.textContent = taskTitle.value;

    radioTitleDiv.appendChild(inputRadio);
    radioTitleDiv.appendChild(taskp);
    taskTitltBarDiv.appendChild(radioTitleDiv);

    let iconsDiv = document.createElement('div');
    iconsDiv.setAttribute('class','iconsContainerurgent flexRow');
    let icon1 = document.createElement('i');
    icon1.setAttribute('class', 'fa-solid fa-plus');
    let icon2 = document.createElement('i');
    icon2.setAttribute('class', 'fa-solid fa-trash');
    let icon3 = document.createElement('i');
    icon3.setAttribute('class', 'fa-solid fa-arrow-turn-down');
    icon3.setAttribute('id', taskId);
    icon2.setAttribute('id', taskId);
    icon1.setAttribute('id', taskId);

    iconsDiv.appendChild(icon1);
    iconsDiv.appendChild(icon2);
    iconsDiv.appendChild(icon3);
    taskTitltBarDiv.appendChild(iconsDiv);

    liTask.appendChild(taskTitltBarDiv);
    tasksContainer.appendChild(liTask);

    // Generate Time Bar and Description with toggeling
    icon3.addEventListener('click', (e)=> {
        let clickedElementId = e.target.id;
        let allTasks = tasksContainer.getElementsByTagName("li");
       
        for(const task of allTasks){
            if(task.id == clickedElementId){
                if(task.children.length == 3){
                    task.children[task.children.length-1].remove();
                    task.children[task.children.length-1].remove();
                    
                }else{
                    showDetails(clickedElementId);
                }
                break;
            }
        }
    })

    icon2.addEventListener('click', (e)=> {
        let clickedId = e.target.id;
        let allTasks = tasksContainer.getElementsByTagName("li");
       
        for(const task of allTasks){
            if(task.id == clickedId){
                task.remove();
                break;
            }
        }
    })

    function showDetails(clickedElementId){
        for(const task of existingTasks){
            if(task.id == clickedElementId){
                let timeBar = document.createElement('div');
                timeBar.setAttribute('class','flexRow startEndContainer');
                let fromEndContainer = document.createElement('div');
                fromEndContainer.className = 'flexRow';
                let fromDiv = document.createElement('div');
                fromDiv.className = 'from';
                let toDiv = document.createElement('div');
                toDiv.className = 'to';
                fromDiv.textContent = 'From :';
                toDiv.textContent = 'To :';
                let fromSpan = document.createElement('span');
                let toSpan = document.createElement('span');
                fromSpan.className = 'fromSpan';
                toSpan.className = 'toSpan';

                fromSpan.textContent = task.startDate;
                toSpan.textContent = task.endDate;

                fromDiv.appendChild(fromSpan);
                toDiv.appendChild(toSpan);

                fromEndContainer.appendChild(fromDiv);
                fromEndContainer.appendChild(toDiv);
                timeBar.appendChild(fromEndContainer);

                let remainingDiv = document.createElement('remaining');
                remainingDiv.className = 'remaining';
                remainingDiv.textContent = 'The Remaining Time :';

                timeBar.appendChild(remainingDiv);
                liTask.appendChild(timeBar);

                // description
                let descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'DescriptionContainer';
                let descriptionP = document.createElement('p');
                descriptionP.textContent = task.description;
                descriptionDiv.appendChild(descriptionP);
                liTask.appendChild(descriptionDiv);

                generateColors(fromDiv, toDiv, remainingDiv);
                break;
            }
        }
    }
    generateColors(taskp, iconsDiv);
}

// check if inputs not spplaying the requirements
function checkInputsGenerate(){
   let date = new Date();
   let year = date.getFullYear();
   let month = String(date.getMonth()+1).padStart(2,'0');
   let day = String(date.getDate()).padStart(2, '0');
   let currentDate = `${year}-${month}-${day}`;

   let noError = true;

    if(startDate.value < currentDate){
        errorOutputStartDate.textContent = 'The date must be greater than or equal to today  *';
        noError = false;
    }
    if (startDate.value == ''){
        errorOutputStartDate.textContent = 'Empty start date *';
        noError = false;
    }
    if (endDate.value == ''){
        errorOutputEndtDate.textContent = 'Empty end date *';
        noError = false;
    }
    if(startDate.value > endDate.value){
        errorOutputStartDate.textContent = 'The Start Date must be less than End date *';
        noError = false;
    }
    if(taskTitle.value == ""){
        errorTitle.textContent = 'Empty title *';
        noError = false;
    }
    if(description.value == ''){
        errorDescription.textContent = 'Empty Description *';
        noError = false;
    }

    if(noError == true){
        generate();
        // form.reset();
    }
    
}

addBtn.onclick = function(){
    // generate header Once
    taskHeader();
    checkInputsGenerate();
}



