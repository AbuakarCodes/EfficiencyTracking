let hosting = "http://localhost"

const siginIN_URL = `${hosting}:8000/users/register`
const Login_URL = `${hosting}:8000/users/login`
const isLoggedIN_URL = `${hosting}:8000/users/isloggedin`
const logout_URL = `${hosting}:8000/users/logout`
const delete_URL = `${hosting}:8000/users/deleted`
const changePassword_URL = `${hosting}:8000/users/changePassword`
const UplodeProfileImage_URL = `${hosting}:8000/users/UplodeProfileImage`

// todo
const port_TodoBase = ":8000/todos"
const addupdateTodo_url = `${hosting}${port_TodoBase}/add_UpdateTodos`
const specificDateTodos_URL = `${hosting}${port_TodoBase}/specificDateTodos`
const changeStatusTodo_URL = `${hosting}${port_TodoBase}/changeStatusTodo`
const DeleteTodo_URL = `${hosting}${port_TodoBase}/DeleteTodo`
const add_MultipleTodos_URL = `${hosting}${port_TodoBase}/add_MultipleTodos`
const settedTodoDates_URL = `${hosting}${port_TodoBase}/settedTodoDates`

// Efficiency
const port_EfficiencyBase = ":8000/eficiency"
const PeriodEfficiency_URL = `${hosting}${port_EfficiencyBase}/periodEfficiency`
const ComparisionPeriodEfficiency_URL = `${hosting}${port_EfficiencyBase}/ComparisionPeriodEfficiency`



export {
    // User 
    siginIN_URL, Login_URL, isLoggedIN_URL, logout_URL, delete_URL,
    changePassword_URL, UplodeProfileImage_URL,
    // Todo 
    addupdateTodo_url, specificDateTodos_URL,
    changeStatusTodo_URL, DeleteTodo_URL, add_MultipleTodos_URL,
    settedTodoDates_URL,
    // efficiency
    PeriodEfficiency_URL, ComparisionPeriodEfficiency_URL
}