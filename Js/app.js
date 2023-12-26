import { addTodoCreator, doTodoCreator, removeTodoCreator } from "../Redux/actionCreator.js";
import { addTodoActionType ,removeTodoActionType , doTodoActionType } from "../Redux/actionTypes.js";

const textTodo = document.querySelector('.text-todo');
const btnAddTodo = document.getElementById('btn-add-todo');
const todoItemContainer = document.querySelector('.todo-item-contaienr');


const todoReduser = (state = [] , action) =>{
    switch (action.type) {
        case addTodoActionType: {
            let newState = [...state];
            let newTodo = {
                id : newState.length +1,
                title : action.title,
                isComplited : false
            }
            newState.push(newTodo)
            return newState;
        }
            break;
        case removeTodoActionType : {
            // console.log(action.id);
            let newState = [...state];
            newState =  newState.filter(todoitem => {
                return todoitem.id != action.id
            })
            return newState;
            
        }
            break;
        case doTodoActionType : {
            
           let newState = [...state];
           newState.forEach(todoItem =>{
            if (todoItem.id == action.id) {
                todoItem.isComplited = !todoItem.isComplited;
            }
           })
           return newState;
        }
        default: {
            return state;
        }
            break;
    }
}

const store = Redux.createStore(todoReduser);

function createTodoDispatch(){
        store.dispatch(addTodoCreator(textTodo.value))
        textTodo.value = '';
        textTodo.focus()
}



btnAddTodo.addEventListener('click' , ()=>{
    textTodo.value != '' && createTodoDispatch()
   

})
window.addEventListener('keydown' , (event)=>{
    event.key == 'Enter' && textTodo.value != '' && createTodoDispatch()
    
})

window.addEventListener('load' , ()=> textTodo.focus())

function doTodoHandler (id) {
    store.dispatch(doTodoCreator(id))
}

function removeTodoHandler(id){
    store.dispatch(removeTodoCreator(id));
}

const generateTodo = ( isComplited , id ,title) =>{

    return (
        `
        <div class="todo-item-box ${isComplited == true && "complited"}" onclick = 'doTodoHandler(${id})'>
          <span class="text-todo">${title}</span>
          <span class="material-symbols-outlined" id="delet-icon" onclick = 'removeTodoHandler(${id})' type="button" > delete </span>
        </div> 
        `
    )
}
//update UI
function renderUi (){
    let todos = store.getState();
    todoItemContainer.innerHTML = ''
    todos.map((todo)=> todoItemContainer.insertAdjacentHTML('beforeend' , generateTodo(todo.isComplited , todo.id , todo.title)))
}
renderUi()

store.subscribe(()=> {
    renderUi()
    console.log(store.getState());
})  

window.doTodoHandler = doTodoHandler;
window.removeTodoHandler = removeTodoHandler;