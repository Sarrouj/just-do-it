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


// check if inputs is empty
function checkInputsGenerate(){
   let currentDate = new Date().toDateString();
   console.log(currentDate)
   console.log(startDate.value)
}

addBtn.onclick = function(){
    // generate header Once
    taskHeader();
    checkInputsGenerate();
}



