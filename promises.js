function fetchJson(url) {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error('HTTP error: ' + response.status);
    return response.json();
  });
}

function getUsers() {
  return fetchJson('https://jsonplaceholder.typicode.com/users');
}

function pickUserFields(user) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };
}

function filterUsersFields(users) {
  return users.map(pickUserFields);
}

function getFilteredUsers() {
  return getUsers().then(filterUsersFields);
}

function getTodos() {
  return fetchJson('https://jsonplaceholder.typicode.com/todos');
}

function filterIncompleteTodos(todos) {
  return todos.filter((todo) => !todo.completed);
}

function getIncompleteTodos() {
  return getTodos().then(filterIncompleteTodos);
}

getFilteredUsers()
  .then((users) => console.log('PROMISES /users:', users))
  .catch((err) => console.error('PROMISES /users ERROR:', err));

getIncompleteTodos()
  .then((todos) => console.log('PROMISES /todos:', todos))
  .catch((err) => console.error('PROMISES /todos ERROR:', err));