const isLocalhost = import.meta.env?.VITE_IS_LOCALHOST_FRONTEND === "true";

let prefix = "";
let hosting = "";

if (isLocalhost) {
  document.title = "Local Host";
  hosting = "http://localhost:8000";
  prefix = ""; // no /api for local
} else {
  hosting = ""; // proxy path
  prefix = "/api"; // deployed uses proxy
}

// ----------------- User -----------------
const siginIN_URL = `${hosting}${prefix}/users/register`;
const Login_URL = `${hosting}${prefix}/users/login`;
const isLoggedIN_URL = `${hosting}${prefix}/users/isloggedin`;
const logout_URL = `${hosting}${prefix}/users/logout`;
const delete_URL = `${hosting}${prefix}/users/deleted`;
const changePassword_URL = `${hosting}${prefix}/users/changePassword`;
const UplodeProfileImage_URL = `${hosting}${prefix}/users/UplodeProfileImage`;

// ----------------- Todo -----------------
const TodoBase = `${prefix}/todos`;
const addupdateTodo_url = `${hosting}${TodoBase}/add_UpdateTodos`;
const specificDateTodos_URL = `${hosting}${TodoBase}/specificDateTodos`;
const changeStatusTodo_URL = `${hosting}${TodoBase}/changeStatusTodo`;
const DeleteTodo_URL = `${hosting}${TodoBase}/DeleteTodo`;
const add_MultipleTodos_URL = `${hosting}${TodoBase}/add_MultipleTodos`;
const settedTodoDates_URL = `${hosting}${TodoBase}/settedTodoDates`;

// ----------------- Efficiency -----------------
const EfficiencyBase = `${prefix}/eficiency`;
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
