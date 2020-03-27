export const toggleTodo = payload => {
    return {
        type: "TOGGLE_TODO",
        payload: payload
    };
}

export const setCurrentTodo = payload => {
    return {
        type: "SET_CURRENT_TODO",
        payload: payload
    }
}

export const removeTodo = payload => {
    return {
        type: "REMOVE_TODO",
        payload: payload
    }
}
