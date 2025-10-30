let hosting = "http://localhost"

let siginIN_URL = `${hosting}:8000/users/register`
let Login_URL = `${hosting}:8000/users/login`
let isLoggedIN_URL = `${hosting}:8000/users/isloggedin`
let logout_URL = `${hosting}:8000/users/logout`
let delete_URL = `${hosting}:8000/users/deleted`
let changePassword_URL = `${hosting}:8000/users/changePassword`

// todo
let port_base = ":8000/todos"
let addupdateTodo_url = `${hosting}${port_base}/add_UpdateTodos`
let specificDateTodos_URL = `${hosting}${port_base}/specificDateTodos`
let changeStatusTodo_URL = `${hosting}${port_base}/changeStatusTodo`
let DeleteTodo_URL = `${hosting}${port_base}/DeleteTodo`
let add_MultipleTodos_URL = `${hosting}${port_base}/add_MultipleTodos`


export {
    siginIN_URL, Login_URL, isLoggedIN_URL, logout_URL, delete_URL,
    changePassword_URL, addupdateTodo_url, specificDateTodos_URL,
    changeStatusTodo_URL, DeleteTodo_URL, add_MultipleTodos_URL
}