// Selectors 

const todoForm = document.querySelector('#form');
const todoInput = document.querySelector('#add__todo');
const todoBtn = document.querySelector('.todo__btn');
const todoContainer = document.querySelector('.todo__container');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const selectInput = document.querySelector('select');

const selectOptions = selectInput.options;

// Events Listeners

document.addEventListener('DOMContentLoaded',getTodos);
todoBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteChecked);
filterOption.addEventListener('click',filterTodo);


for (let i=0; i<selectOptions.length; i++){
    const option =selectOptions[i];
    option.addEventListener('click',function(){
        option.style.backgroundColor = "#111";
        option.style.color = "#fff";
    })
}
    



// Functions

/**
 * function that creates todo div as element to whom 
 * we append child nodes
 * @param {*} e as event 
 * 
 */
function addTodo(e){
    // Prevent form from submitting
    e.preventDefault();
    if(todoInput.value===''){
        alert('Please enter a todo element !')
    }else{

   
    // Creating a div element with the className todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo_item')
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value)

    // Create a completed button
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed_btn');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedBtn);

      // Create a trash button
      const trashBtn = document.createElement('button')
      trashBtn.classList.add('trash_btn');
      trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
      todoDiv.appendChild(trashBtn);
      // Append to TODO List
      todoList.appendChild(todoDiv);
      // Clear todoInput value 

      todoInput.value = '';
    }
}
/** 
 * 
 * function that remove the accurate todo element on click
 * @param e as event 
 * 
 */

// function deleteChecked

function deleteChecked(e){
    console.log(e.target)
    const item = e.target;
    // deleting todo
    if(item.classList[0]==='trash_btn'){
        if(confirm('Do you really want to delete this todo ?')){

            const todo = item.parentElement;
            // animate the todo element
            todo.classList.add('fall');
            // adding en event listener to the todo element after the animation 
            removeLocalStorageTodos(todo)
            todo.addEventListener('transitionend',function(){
                todo.remove();
            })
        }else{
            return false;
        }
    }
    // checking todo
    if(item.classList[0]==='completed_btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

// filter todo 

function filterTodo(e){
   const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!(todo.classList.contains('completed'))){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'; 
                }
                break;
            default :
            todo.style.display = 'flex';
                break;
        }
    })
}
// save todo list in local storage

function saveLocalTodos(todo){
 let todos;
 if(localStorage.getItem('todos')=== null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem('todos'));
 }
 todos.push(todo);
 localStorage.setItem('todos',JSON.stringify(todos));
 console.log(todos)
}

// get todos 

function getTodos(){
    console.log('Hello')
    let todos;
 if(localStorage.getItem('todos')=== null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem('todos'));
 }
 todos.forEach(function(todo){
    // Creating a div element with the className todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo_item')
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
   

    // Create a completed button
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed_btn');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedBtn);

      // Create a trash button
      const trashBtn = document.createElement('button')
      trashBtn.classList.add('trash_btn');
      trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
      todoDiv.appendChild(trashBtn);
      // Append to TODO List
      todoList.appendChild(todoDiv);
 });
}
// remove todos from local storage 

function removeLocalStorageTodos(todo){
    let todos;
 if(localStorage.getItem('todos')=== null){
     todos = [];
 }else{
     todos = JSON.parse(localStorage.getItem('todos'));
 }
 const todoIndexText = todo.children[0].innerText;
 console.log(todoIndexText);
 console.log(todos.indexOf(todoIndexText));
 todos.splice(todos.indexOf(todoIndexText), 1);
 localStorage.setItem("todos",JSON.stringify(todos));
}
