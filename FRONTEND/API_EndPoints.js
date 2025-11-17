const isLocalhost = import.meta.env?.VITE_IS_LOCALHOST_FRONTEND
let hosting = ""

if (isLocalhost === "true") {
  document.title = "Local Host";
  hosting = "http://localhost:8000"
} else {
  hosting = "https://efficiency-tracking-23ak.vercel.app"
}
// User
const siginIN_URL = `${hosting}/users/register`;
const Login_URL = `${hosting}/users/login`;
const isLoggedIN_URL = `${hosting}/users/isloggedin`;
const logout_URL = `${hosting}/users/logout`;
const delete_URL = `${hosting}/users/deleted`;
const changePassword_URL = `${hosting}/users/changePassword`;
const UplodeProfileImage_URL = `${hosting}/users/UplodeProfileImage`;

// Todo
const TodoBase = "/todos";
const addupdateTodo_url = `${hosting}${TodoBase}/add_UpdateTodos`;
const specificDateTodos_URL = `${hosting}${TodoBase}/specificDateTodos`;
const changeStatusTodo_URL = `${hosting}${TodoBase}/changeStatusTodo`;
const DeleteTodo_URL = `${hosting}${TodoBase}/DeleteTodo`;
const add_MultipleTodos_URL = `${hosting}${TodoBase}/add_MultipleTodos`;
const settedTodoDates_URL = `${hosting}${TodoBase}/settedTodoDates`;

// Efficiency
const EfficiencyBase = "/eficiency";
const PeriodEfficiency_URL = `${hosting}${EfficiencyBase}/periodEfficiency`;
const ComparisionPeriodEfficiency_URL = `${hosting}${EfficiencyBase}/ComparisionPeriodEfficiency`;
const AllTimeEfficiency_URL = `${hosting}${EfficiencyBase}/AllTimeEfficiency`;

export {
  // User
  siginIN_URL, Login_URL, isLoggedIN_URL, logout_URL, delete_URL,
  changePassword_URL, UplodeProfileImage_URL,
  // Todo
  addupdateTodo_url, specificDateTodos_URL,
  changeStatusTodo_URL, DeleteTodo_URL, add_MultipleTodos_URL,
  settedTodoDates_URL,
  // Efficiency
  PeriodEfficiency_URL, ComparisionPeriodEfficiency_URL, AllTimeEfficiency_URL
};









// let hosting = "http://localhost"

// const siginIN_URL = `${hosting}:8000/users/register`
// const Login_URL = `${hosting}:8000/users/login`
// const isLoggedIN_URL = `${hosting}:8000/users/isloggedin`
// const logout_URL = `${hosting}:8000/users/logout`
// const delete_URL = `${hosting}:8000/users/deleted`
// const changePassword_URL = `${hosting}:8000/users/changePassword`
// const UplodeProfileImage_URL = `${hosting}:8000/users/UplodeProfileImage`

// // todo
// const TodoBase = ":8000/todos"
// const addupdateTodo_url = `${hosting}${TodoBase}/add_UpdateTodos`
// const specificDateTodos_URL = `${hosting}${TodoBase}/specificDateTodos`
// const changeStatusTodo_URL = `${hosting}${TodoBase}/changeStatusTodo`
// const DeleteTodo_URL = `${hosting}${TodoBase}/DeleteTodo`
// const add_MultipleTodos_URL = `${hosting}${TodoBase}/add_MultipleTodos`
// const settedTodoDates_URL = `${hosting}${TodoBase}/settedTodoDates`

// // Efficiency
// const EfficiencyBase = ":8000/eficiency"
// const PeriodEfficiency_URL = `${hosting}${EfficiencyBase}/periodEfficiency`
// const ComparisionPeriodEfficiency_URL = `${hosting}${EfficiencyBase}/ComparisionPeriodEfficiency`
// const AllTimeEfficiency_URL = `${hosting}${EfficiencyBase}/AllTimeEfficiency`



// export {
//     // User
//     siginIN_URL, Login_URL, isLoggedIN_URL, logout_URL, delete_URL,
//     changePassword_URL, UplodeProfileImage_URL,
//     // Todo
//     addupdateTodo_url, specificDateTodos_URL,
//     changeStatusTodo_URL, DeleteTodo_URL, add_MultipleTodos_URL,
//     settedTodoDates_URL,
//     // efficiency
//     PeriodEfficiency_URL, ComparisionPeriodEfficiency_URL, AllTimeEfficiency_URL
// }


