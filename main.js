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
function generateColors(ul, p){
    if(radioLow.checked){
        ul.classList.add('low');
        p.classList.add('low');
    }
    switch(true){
        case radioLow.checked:
            ul.classList.add('low');
            p.classList.add('low');
            break;
        case radioMidle.checked:
            ul.classList.add('middle');
            p.classList.add('middle');
            break;
        case radioUrgent.checked:
            ul.classList.add('urgent');
            p.classList.add('urgent');
            break;
    }
}

// generate the value in the task Container
function generate(){
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

    liCon1.appendChild(icon1);
    liCon2.appendChild(icon2);
    liCon3.appendChild(icon3);

    ul.appendChild(liCon1);
    ul.appendChild(liCon2);
    ul.appendChild(liCon3);
    li.appendChild(ul);

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
        form.reset();
    }
    
}

addBtn.onclick = function(){
    // generate header Once
    taskHeader();
    checkInputsGenerate();
}



