import { addTodoActionType , removeTodoActionType ,doTodoActionType } from "./actionTypes.js"

export const addTodoCreator = (title)=>{
    return {
        type :addTodoActionType,
        title : title
    }
}

export const removeTodoCreator = (id)=>{
    return {
        type : removeTodoActionType ,
        id
    }
}

export const doTodoCreator = (id)=>{
    return {
        type : doTodoActionType,
        id
    }
}