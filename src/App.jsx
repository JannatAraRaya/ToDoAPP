import { useState,useReducer } from 'react'
import {TodoProvider} from './context'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  
  const addTodo =(todo)=>{
    setTodos((previousTodos)=>[...previousTodos,{ ...todo}])
    
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  } 
  const updateTodo =(id,todo) =>{
    setTodos ((previousTodos)=>previousTodos.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)))
  }
  const completedTodo =(id)=>{
    setTodos ((previousTodos)=>previousTodos.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
  }

  return (
    
    <TodoProvider value={{todos, addTodo,deleteTodo,updateTodo,completedTodo}}>
      <div className="bg-[#471d23] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Your Todo App</h1>
                    <div className="mb-4">
                       <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">                      
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoList todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App