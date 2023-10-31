btn = document.querySelector('.headerBtn');
header = document.querySelector('.header');
logo = document.querySelector('.logo');
headerP = document.querySelector('.headerP');
about = document.querySelector('.About');
reset = document.querySelector('.Reset');
addBtn = document.querySelector('.button');


// Animate Header
btn.addEventListener('click', ()=>{
    header.classList.add('animation');
    logo.classList.add('animationLogo');
    headerP.classList.add('displayNone');
    btn.classList.add('displayNone');
    about.classList.add('displayLinks');
    reset.classList.add('displayLinks');
})

// Add tasks area
addBtn.onclick = function(){
   let taskTitle = document.querySelector('.title');
   let h4 = document.createElement('h4');
   h4.textContent = 'Tasks';
   taskTitle.appendChild(h4);
}