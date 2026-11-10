function requestGet(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
    } else {
      onError(new Error('HTTP error: ' + xhr.status));
    }
  };

  xhr.onerror = function () {
    onError(new Error('Network error'));
  };

  xhr.send();
}

function getPosts(callback, onError) {
  requestGet('https://jsonplaceholder.typicode.com/posts', callback, onError);
}

function sortPostsByTitleLengthDesc(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

function getAndSortPosts(callback, onError) {
  getPosts(function (posts) {
    callback(sortPostsByTitleLengthDesc(posts));
  }, onError);
}

function getComments(callback, onError) {
  requestGet('https://jsonplaceholder.typicode.com/comments', callback, onError);
}

function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}

function getAndSortComments(callback, onError) {
  getComments(function (comments) {
    callback(sortCommentsByName(comments));
  }, onError);
}

getAndSortPosts(
  (posts) => console.log('CALLBACKS /posts:', posts),
  (err) => console.error('CALLBACKS /posts ERROR:', err)
);

getAndSortComments(
  (comments) => console.log('CALLBACKS /comments:', comments),
  (err) => console.error('CALLBACKS /comments ERROR:', err)
);