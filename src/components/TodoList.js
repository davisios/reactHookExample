import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import TodosContext from "../context";
import { toggleTodo, setCurrentTodo, removeTodo } from "../actions/todosActions";
import '../css/classes.css'
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const [ isLoading, setIsLoading ] = useState(false);



  const title =
    _.filter(state.todos, { 'complete': false }).length > 0 ? `You have ${_.filter(state.todos, { 'complete': false }).length} pending Todos` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className= {`flex items-center ${todo.complete?"bg-red-light":"bg-green-light"} border-black border-dashed border-2 my-2 py-4`}
          >
            {isLoading?<FontAwesomeIcon className=" ml-12" spin={true} icon={faSpinner} color="black" size="lg" />
            :null}

            <span
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `https://todos-api-nuquyjkqpx.now.sh/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch(toggleTodo(response.data));
              }}
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                "line-through text-black"}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch(setCurrentTodo(todo))
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-12"
              />
            </button>
            <button
              onClick={async () => {
                setIsLoading(true)
                await axios.delete(
                  `https://todos-api-nuquyjkqpx.now.sh/todos/${todo.id}`
                );
                dispatch(removeTodo(todo));
              }}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-12"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
