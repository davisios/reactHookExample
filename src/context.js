import React from "react";

const TodosContext = React.createContext({
  todos: [
    // { id: 66, text: "custom", complete: false }
    // { id: 2, text: "Do laundry", complete: false },
    // { id: 3, text: "Finish project", complete: true }
  ],
  currentTodo: {}
});

export default TodosContext;
