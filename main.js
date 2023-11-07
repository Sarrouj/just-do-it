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

// Array Contains the Data
let existingTasks;

// Reset All
reset.addEventListener('click', ()=>{
    existingTasks = [];
    localStorage.clear();
    while(tasksContainer.firstChild){
        tasksContainer.removeChild(tasksContainer.firstChild);
    }

})

// Reset the Inputs 
function clearInputs(){
    taskTitle.value = '';
    description.value = '';
    startDate.value = '';
    endDate.value = '';
}

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
function generateColors(p, iconsDiv){
    switch(true){
        case radioLow.checked:
            iconsDiv.classList.add('low');
            p.classList.add('low');
            // fromDiv.classList.add('low');
            // toDiv.classList.add('low');
            // remainingDiv.classList.add('low');
            break;
        case radioMidle.checked:
            iconsDiv.classList.add('middle');
            p.classList.add('middle');
            // fromDiv.classList.add('middle');
            // toDiv.classList.add('middle');
            // remainingDiv.classList.add('middle');
            break;
        case radioUrgent.checked:
            iconsDiv.classList.add('urgent');
            p.classList.add('urgent');
            // fromDiv.classList.add('urgent');
            // toDiv.classList.add('urgent');
            // remainingDiv.classList.add('urgent');
            break;
    }

}


// Store the Data in the Local Storage
function localStorageGenerate(taskId){
    let checkedInput = document.querySelector('input[type=radio]:checked');
    let taskObject = {
        id : taskId,
        title : taskTitle.value,
        description : description.value,
        startDate : startDate.value,
        endDate : endDate.value,
        priority : checkedInput.value,
        remaining : '',
    }
    // if there's a task get it from Local Storage if not make an empty array;
    existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Push the TaskObject to existing Tasks. push the new task to existing tasks
    existingTasks.push(taskObject);
    countDown();
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
    let label = document.createElement('label');
    label.setAttribute('class', 'custom-checkbox');

    let inputRadio = document.createElement('input');
    inputRadio.setAttribute('type', 'checkbox');
    let checkSpan = document.createElement('span');
    checkSpan.setAttribute('class', 'checkmark');

    label.appendChild(inputRadio);
    label.appendChild(checkSpan);

    let taskp = document.createElement('p');
    taskp.setAttribute('class', 'task');
    taskp.textContent = taskTitle.value;

    radioTitleDiv.appendChild(label);
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

    // Adjust on your Task
    icon1.addEventListener('click', (e)=> {
        let icon1Id = e.target.id;
        let allTasks = tasksContainer.getElementsByTagName("li");
        for(const task of existingTasks){
            if(task.id == icon1Id){
                taskTitle.value = task.title;
                description.value = task.description;
                startDate.value = task.startDate;
                endDate.value = task.endDate;
                for(const task of allTasks){
                    if(task.id == icon1Id){
                        task.remove();
                        break;
                    }
                }
                break;
            }
        }
        existingTasks = existingTasks.filter(task => task.id != icon1Id);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    })

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

    // Remove Task
    icon2.addEventListener('click', (e)=> {
        let clickedId = e.target.id;
        let allTasks = tasksContainer.getElementsByTagName("li");
       
        for(const task of allTasks){
            if(task.id == clickedId){
                task.remove();
                break;
            }
        }
        existingTasks = existingTasks.filter(task => task.id != clickedId);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    })


    // checked
    label.addEventListener('change', ()=>{
        if(inputRadio.checked){
            taskTitltBarDiv.classList.add('checked');
            iconsDiv.classList.add('checked');
            taskp.classList.add('checked');
        }else{
            taskTitltBarDiv.classList.remove('checked');
            iconsDiv.classList.remove('checked');
            taskp.classList.remove('checked');
        }
        updateCheckedState(taskId, inputRadio.checked);
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
                let remainingDiv = document.createElement('div');
                remainingDiv.className = 'remaining';
                remainingDiv.textContent = 'The Remaining Time : ';
                let remainingSpan = document.createElement('span');
                remainingSpan.setAttribute('class', 'countdown');
                remainingDiv.appendChild(remainingSpan)
                timeBar.appendChild(remainingDiv);
                liTask.appendChild(timeBar);

                // description
                let descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'DescriptionContainer';
                let descriptionP = document.createElement('p');
                descriptionP.textContent = task.description;
                descriptionDiv.appendChild(descriptionP);
                liTask.appendChild(descriptionDiv);

                // color 
                switch(task.priority){
                    case 'midle':
                        toDiv.classList.add('middle');
                        remainingDiv.classList.add('middle');
                        fromDiv.classList.add('middle');
                        break;
                    case 'low':
                        toDiv.classList.add('low');
                        remainingDiv.classList.add('low');
                        fromDiv.classList.add('low');
                        break;
                    case 'urgent':
                        toDiv.classList.add('urgent');
                        remainingDiv.classList.add('urgent');
                        fromDiv.classList.add('urgent');
                        break;
                }
                break;
            }
        }
    }
    clearInputs();
    generateColors(taskp, iconsDiv);
}

// check if inputs not applaying the requirements
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
    }

    
}

addBtn.onclick = function(){
    // generate header Once
    taskHeader();
    checkInputsGenerate();
}


// get data from localStorage
function displayTasksFromLocalStorage(){
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        existingTasks = storedTasks;
        
    }

    for(const task of existingTasks){
        generateTaskElement(task);
    }

    if(storedTasks.length >= 1){
        taskHeader();
    }

    dispalyCheckedState();
    countDown();
}

// when the tasks is loaded display it
window.addEventListener('load', displayTasksFromLocalStorage());

// generate the task based on data
function generateTaskElement(task){
    let liTask = document.createElement('li');
    liTask.className = 'task';
    liTask.setAttribute('id', task.id);
    let taskTitltBarDiv = document.createElement('div');
    taskTitltBarDiv.setAttribute('class', 'taskTitleBar flexRow');
    let radioTitleDiv = document.createElement('div');
    radioTitleDiv.setAttribute('class', 'tasksHeader flexRow');
    let label = document.createElement('label');
    label.setAttribute('class', 'custom-checkbox');

    let inputRadio = document.createElement('input');
    inputRadio.setAttribute('type', 'checkbox');
    let checkSpan = document.createElement('span');
    checkSpan.setAttribute('class', 'checkmark');

    label.appendChild(inputRadio);
    label.appendChild(checkSpan);


    let taskp = document.createElement('p');
    taskp.setAttribute('class', 'task');
    taskp.textContent = task.title;

    radioTitleDiv.appendChild(label);
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
    icon3.setAttribute('id', task.id);
    icon2.setAttribute('id', task.id);
    icon1.setAttribute('id', task.id);

    iconsDiv.appendChild(icon1);
    iconsDiv.appendChild(icon2);
    iconsDiv.appendChild(icon3);
    taskTitltBarDiv.appendChild(iconsDiv);

    liTask.appendChild(taskTitltBarDiv);
    tasksContainer.appendChild(liTask);

    switch(task.priority){
        case 'midle':
            taskp.classList.add('middle');
            iconsDiv.classList.add('middle');
            break;
        case 'low':
            taskp.classList.add('low');
            iconsDiv.classList.add('low');
            break;
        case 'urgent':
            taskp.classList.add('urgent');
            iconsDiv.classList.add('urgent');
            break;
    }

    icon1.addEventListener('click', (e)=> {
        let icon1Id = e.target.id;
        let allTasks = tasksContainer.getElementsByTagName("li");
        for(const task of existingTasks){
            if(task.id == icon1Id){
                taskTitle.value = task.title;
                description.value = task.description;
                startDate.value = task.startDate;
                endDate.value = task.endDate;
                for(const task of allTasks){
                    if(task.id == icon1Id){
                        task.remove();
                        break;
                    }
                }
                break;
            }
        }
        existingTasks = existingTasks.filter(task => task.id != icon1Id);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
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
        existingTasks = existingTasks.filter(task => task.id != clickedId);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    })

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

    // checked
    label.addEventListener('change', ()=>{
        if(inputRadio.checked){
            taskTitltBarDiv.classList.add('checked');
            iconsDiv.classList.add('checked');
            taskp.classList.add('checked');
        }else{
            taskTitltBarDiv.classList.remove('checked');
            iconsDiv.classList.remove('checked');
            taskp.classList.remove('checked');
        }
        updateCheckedState(task.id, inputRadio.checked);
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

                let remainingDiv = document.createElement('div');
                remainingDiv.className = 'remaining';
                remainingDiv.textContent = 'The Remaining Time : ';
                let remainingSpan = document.createElement('span');
                remainingSpan.setAttribute('class', 'countdown');
                remainingDiv.appendChild(remainingSpan)
                timeBar.appendChild(remainingDiv);
                liTask.appendChild(timeBar);

                // description
                let descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'DescriptionContainer';
                let descriptionP = document.createElement('p');
                descriptionP.textContent = task.description;
                descriptionDiv.appendChild(descriptionP);
                liTask.appendChild(descriptionDiv);

                // color 
                switch(task.priority){
                    case 'midle':
                        toDiv.classList.add('middle');
                        remainingDiv.classList.add('middle');
                        fromDiv.classList.add('middle');
                        break;
                    case 'low':
                        toDiv.classList.add('low');
                        remainingDiv.classList.add('low');
                        fromDiv.classList.add('low');
                        break;
                    case 'urgent':
                        toDiv.classList.add('urgent');
                        remainingDiv.classList.add('urgent');
                        fromDiv.classList.add('urgent');
                        break;
                }

                
                break;
            }
        }
    }
    clearInputs();
}

// Update checkedState in LocalStorage
function updateCheckedState(taskId, isChecked){
    for(const task of existingTasks){
        if(task.id == taskId){
            task.checked = isChecked;
             break;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
}

// display the checked State when the page is loaded
function dispalyCheckedState(){
    for(const task of existingTasks){
        if(task.checked){
            let element = document.getElementById(task.id);
            let taskBar = element.firstElementChild;
            let input = taskBar.children[0].children[0].children[0];
            let taskContent = taskBar.firstElementChild.children[1];
            let icons = taskBar.children[1];
            taskBar.classList.add('checked');
            input.checked = true;
            taskContent.classList.add('checked');
            icons.classList.add('checked');
        }
    }
}

// Generate countDown
function countDown(){
    for(const task of existingTasks){
        let startValue = task.startDate;
        let endValue = task.endDate;
        let startEnMillSeconds = new Date(startValue).getTime();
        let endEnMillSeconds = new Date(endValue).getTime();
        let counter = setInterval(() => {
        let current = new Date().getTime();
        if(startEnMillSeconds >= current){
            if(current >= endEnMillSeconds){
                clearInterval(counter);
            }else{
                let differnce =  endEnMillSeconds - current;
                let days = Math.floor(differnce/1000 / 60 / 60 / 24);
                let hours = Math.floor(differnce % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                let minutes = Math.floor(differnce % (1000 * 60 * 60) / (1000 * 60 ));
                let seconds = Math.floor(differnce % (1000 * 60) / 1000);
                let daysNumber = days < 10 ? `0${days}`: days;
                let hoursNumber = hours < 10 ? `0${hours}`: hours;
                let minutesNumber = minutes < 10 ? `0${minutes}`: minutes;
                let secondsNumber = seconds < 10 ? `0${seconds}`: seconds;
                let results = `${daysNumber} : ${hoursNumber} : ${minutesNumber} : ${secondsNumber}`;
                task.remaining = results;
                let li = document.getElementById(task.id);
                let countdownSpan = document.getElementById(task.id).children[1].children[1].children[0];
                countdownSpan.textContent = results;
        
            }
        }else{
            let differnce =  endEnMillSeconds - startEnMillSeconds;
            let days = Math.floor(differnce/1000 / 60 / 60 / 24);
            let hours = Math.floor(differnce % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let minutes = Math.floor(differnce % (1000 * 60 * 60) / (1000 * 60 ));
            let seconds = Math.floor(differnce % (1000 * 60) / 1000);
            let daysNumber = days < 10 ? `0${days}`: days;
            let hoursNumber = hours < 10 ? `0${hours}`: hours;
            let minutesNumber = minutes < 10 ? `0${minutes}`: minutes;
            let secondsNumber = seconds < 10 ? `0${seconds}`: seconds;
            let results = `${daysNumber} : ${hoursNumber} : ${minutesNumber} : ${secondsNumber}`;
            task.remaining = results;
            let countdownSpan = document.getElementById(task.id).children[1].children[1].children[0];
            countdownSpan.textContent = results;
        }
    }, 1000)
    }
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
    console.log(existingTasks)
}
