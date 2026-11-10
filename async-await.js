async function fetchJsonAsync(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('HTTP error: ' + response.status);
  return response.json();
}

async function getAndSortPostsAsync() {
  const posts = await fetchJsonAsync('https://jsonplaceholder.typicode.com/posts');
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

async function getAndSortCommentsAsync() {
  const comments = await fetchJsonAsync('https://jsonplaceholder.typicode.com/comments');
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}

async function getFilteredUsersAsync() {
  const users = await fetchJsonAsync('https://jsonplaceholder.typicode.com/users');
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));
}

async function getIncompleteTodosAsync() {
  const todos = await fetchJsonAsync('https://jsonplaceholder.typicode.com/todos');
  return todos.filter((todo) => !todo.completed);
}

async function main() {
  try {
    const posts = await getAndSortPostsAsync();
    console.log('ASYNC /posts:', posts);

    const comments = await getAndSortCommentsAsync();
    console.log('ASYNC /comments:', comments);

    const users = await getFilteredUsersAsync();
    console.log('ASYNC /users:', users);

    const todos = await getIncompleteTodosAsync();
    console.log('ASYNC /todos:', todos);
  } catch (err) {
    console.error('ASYNC ERROR:', err);
  }
}

main();