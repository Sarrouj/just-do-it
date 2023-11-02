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
function generateColors(ul, p, fromDiv, toDiv, remainingDev){
    switch(true){
        case radioLow.checked:
            ul.classList.add('low');
            p.classList.add('low');
            fromDiv.classList.add('low');
            toDiv.classList.add('low');
            remainingDev.classList.add('low');
            break;
        case radioMidle.checked:
            ul.classList.add('middle');
            p.classList.add('middle');
            fromDiv.classList.add('middle');
            toDiv.classList.add('middle');
            remainingDev.classList.add('middle');
            break;
        case radioUrgent.checked:
            ul.classList.add('urgent');
            p.classList.add('urgent');
            fromDiv.classList.add('urgent');
            toDiv.classList.add('urgent');
            remainingDev.classList.add('urgent');
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

    let li = document.createElement('li');
    li.setAttribute('class', 'flexRow');
    let div = document.createElement('div');
    div.setAttribute('class', 'tasksHeader flexRow');
    let taskinput = document.createElement('input');
    taskinput.setAttribute('type', 'radio');
    let paragprah = document.createElement('p');
    paragprah.setAttribute('class', 'task');
    let content = document.createTextNode(taskTitle.value);

    tasksContainer.appendChild(li);
    li.appendChild(div);
    div.appendChild(taskinput);
    div.appendChild(paragprah);
    paragprah.appendChild(content);

    let ul = document.createElement('ul');
    ul.setAttribute('class', 'iconsContainer flexRow');
    let liCon1 = document.createElement('li');
    let liCon2 = document.createElement('li');
    let liCon3 = document.createElement('li');
    let icon1 = document.createElement('i');
    icon1.setAttribute('class', 'fa-solid fa-plus');
    let icon2 = document.createElement('i');
    icon2.setAttribute('class', 'fa-solid fa-trash');
    let icon3 = document.createElement('i');
    icon3.setAttribute('class', 'fa-solid fa-arrow-turn-down');
    icon3.setAttribute('id', taskId)

    liCon1.appendChild(icon1);
    liCon2.appendChild(icon2);
    liCon3.appendChild(icon3);

    ul.appendChild(liCon1);
    ul.appendChild(liCon2);
    ul.appendChild(liCon3);
    li.appendChild(ul);

    // Define a variable to track visibility
    let detailsVisible = false;

    // Generate Time Bar and Description with toggeling
    icon3.addEventListener('click', (e)=> {
        let clickedElementId = e.target.id;
        
        if(detailsVisible){
            // Hide Details
            removeDetails();
        }else{
            // show Details
            showDetails(clickedElementId);
        }
        //  Toggle 
        detailsVisible = !detailsVisible;
        console.log(detailsVisible)
    })

    function showDetails(clickedElementId){
        for(const task of existingTasks){
            if(task.id == clickedElementId){
                let startEndContainer = document.createElement('li');
                startEndContainer.setAttribute('class', 'flexRow startEndContainer');
                let divContainer = document.createElement('div');
                divContainer.className = 'flexRow';

                let fromDiv = document.createElement('div');
                let toDiv = document.createElement('div');
                let fromContent = document.createTextNode('From :');
                let toContent = document.createTextNode('To :');
                let fromSpan = document.createElement('span');
                let toSpan = document.createElement('span');

                fromSpan.textContent = task.startDate;
                toSpan.textContent = task.endDate;


                fromDiv.appendChild(fromContent);
                toDiv.appendChild(toContent);
                fromDiv.appendChild(fromSpan);
                toDiv.appendChild(toSpan);

                let remainingDev = document.createElement('div');
                remainingDev.setAttribute('class', 'remaining');
                let remainingContent = document.createTextNode('The Remaining Time :');
                remainingDev.appendChild(remainingContent);
                let countDownSpan = document.createElement('span');
                remainingDev.appendChild(countDownSpan);

                let DescriptionContainer = document.createElement('li');
                DescriptionContainer.setAttribute('class', 'DescriptionContainer');
                let p = document.createElement('p');
                p.textContent = task.description;
                DescriptionContainer.appendChild(p);

                divContainer.appendChild(fromDiv);
                divContainer.appendChild(toDiv);
                startEndContainer.appendChild(divContainer);
                startEndContainer.appendChild(remainingDev);
                tasksContainer.appendChild(startEndContainer);
                tasksContainer.appendChild(DescriptionContainer);
                generateColors(fromDiv, toDiv, remainingDev);
                break;
            }
        }
    }

    function removeDetails(){
        for(const task of existingTasks){
            if(task.id == clickedElementId){
                // let startEndContainer = document.createElement('li');
                // startEndContainer.setAttribute('class', 'flexRow startEndContainer');
                // let divContainer = document.createElement('div');
                // divContainer.className = 'flexRow';

                // let fromDiv = document.createElement('div');
                // let toDiv = document.createElement('div');
                // let fromContent = document.createTextNode('From :');
                // let toContent = document.createTextNode('To :');
                // let fromSpan = document.createElement('span');
                // let toSpan = document.createElement('span');

                // fromSpan.textContent = task.startDate;
                // toSpan.textContent = task.endDate;


                // fromDiv.appendChild(fromContent);
                // toDiv.appendChild(toContent);
                // fromDiv.appendChild(fromSpan);
                // toDiv.appendChild(toSpan);

                // let remainingDev = document.createElement('div');
                // remainingDev.setAttribute('class', 'remaining');
                // let remainingContent = document.createTextNode('The Remaining Time :');
                // remainingDev.appendChild(remainingContent);
                // let countDownSpan = document.createElement('span');
                // remainingDev.appendChild(countDownSpan);

                // let DescriptionContainer = document.createElement('li');
                // DescriptionContainer.setAttribute('class', 'DescriptionContainer');
                // let p = document.createElement('p');
                // p.textContent = task.description;
                // DescriptionContainer.appendChild(p);

                // divContainer.appendChild(fromDiv);
                // divContainer.appendChild(toDiv);
                // startEndContainer.appendChild(divContainer);
                // startEndContainer.appendChild(remainingDev);
                // tasksContainer.appendChild(startEndContainer);
                // tasksContainer.appendChild(DescriptionContainer);
                // generateColors(fromDiv, toDiv, remainingDev);
                // break;

                // Remove the details elements if they exist

                let startEndContainers = document.querySelectorAll('.startEndContainer');
                let descriptionContainers = document.querySelectorAll('.DescriptionContainer');
                
                for (const container of startEndContainers) {
                    container.remove();
                }
            
                for (const container of descriptionContainers) {
                    container.remove();
                }


            }
        }
    }
    generateColors(ul, paragprah);
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



