const tarea= document.querySelector('#poner');
const ul = document.querySelector('ul');
const agregar= document.querySelector('#agregar');
const dltEvery = document.querySelector('.dlt-complete');
const total = document.querySelector('.totales');
const completos = document.querySelector('#completos');
const incompletos = document.querySelector('#incompletos');
const letras = document.querySelector('#letrasIntroducidas')
const TAREA_REGEX =/^([A-ZÁ-Ú0-9-a-zá-ú\u00d1\u00f1])[A-ZÁ-Ú0-9-a-zá-ú_ \u00d1\u00f1]{5,49}$/
const form = document.querySelector('.write')
let creacion = true;


const letters = () => {
    const howLong = document.querySelector('input').value.length;
    letras.innerHTML = howLong;
    if (howLong > 50) {
        letras.innerHTML =  50;
    }
}

const totalCount = () => {
    const howMany = document.querySelector('ul').children.length; 
	total.innerHTML = howMany;
};

const completeCount = () => {
    const howMany = document.querySelectorAll('.line-through').length;
	completos.innerHTML = howMany;
};

const incompletedCount = () => {
    const howMany = document.querySelectorAll('ul li:not(.line-through)').length; 
	incompletos.textContent = howMany;
};


const todoCount = () => {
    totalCount();
    completeCount();
    incompletedCount();
};

// Funcion para crear las tareas//
function crear(input, verificacion) {
    if (creacion) {
        agregar.disabled = false;
    } else {
        agregar.disabled = true;
    }
    if (!input.value) {
        agregar.disabled = true;
    } else if (verificacion) {
        agregar.disabled = false;
    } else {
        agregar.disabled = true;
    }
    
}   

tarea.addEventListener('input', e => {
    creacion = TAREA_REGEX.test(tarea.value);
    crear(tarea, creacion)
    letters();
});

// Funcion para borrar las tareas listas

dltEvery.addEventListener('click', e => {
    const tasksIncomplete = document.querySelectorAll('.line-through');
    [...tasksIncomplete].forEach(works =>  works.remove());
    todoCount();
    
    localStorage.setItem('todoList', listado.innerHTML);
});


form.addEventListener('submit',e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="tareas">
    <p id="tarea-indv" >${tarea.value}</p>
    <div class="pocotexto">
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" class="check" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>                  
    </button>
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" class="nono" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="crimson">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>                  
    </button>
    </div>
    </div>
    `;
    listado.append(li);
    
    
    tarea.value = '';
    creacion = false;
    agregar.disabled = true;

    letters();

    todoCount();
    
    localStorage.setItem('todoList', listado.innerHTML);
});

listado.addEventListener('click', e => {
    
        if (e.target.closest('.nono')) {
        e.target.closest ('.nono').parentElement.parentElement.parentElement.parentElement.remove();
        todoCount();
        localStorage.setItem('todoList', listado.innerHTML);
    } 
        if (e.target.closest('.check')) {
            const checando = e.target.closest('.check')
            const listItem = checando.parentElement.parentElement.parentElement.parentElement;
            if (!listItem.classList.contains('line-through')) {
                checando.classList.add('checkcheck');
                listItem.classList.add('line-through','text-color');
            } else {
                listItem.classList.remove('line-through', 'text-color');
                checando.classList.remove('checkcheck');
            }
                todoCount();
                localStorage.setItem('todoList', listado.innerHTML);
            }

    });

    window.onload= () => {
        listado.innerHTML =  localStorage.getItem('todoList')
    }