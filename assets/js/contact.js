fetchBookmarks()

document.querySelector('#footer').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    var Name = document.querySelector('#name').value;
    var Email = document.querySelector('#email').value;
    var Message = document.querySelector('#message').value;


    if (!validateForm(Name, Email, Message)) {
        return false;
    }

    var bookmark = {
        name: Name,
        email: Email,
        message: Message
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }


    // Clear fields
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';

    fetchBookmarks()
}


function deleteBookmark(email) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].email === email) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}



function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.querySelector('#bookmarksResults');

    bookmarksResults.innerHTML = '';



    var str = '<div class="output">';
    console.log(str);
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var email = bookmarks[i].email;
        var message = bookmarks[i].message;

        str += `<table><tr>`
            + `<h5>Name : </h5><p>${name}</p>`
            + `<h5>Email: </h5><p>${email}</p>`
            + `<h5>Message : </h5><p>${message}</p>`
            + `<a onclick="deleteBookmark('${email}')" class="btn btn-danger" style="color:white;">Delete</a>`
    }
    str += '<tr></table></div>'


    bookmarksResults.innerHTML = str;
}

function validateForm(Name, Email, Message) {
    if (!Name || !Email || !Message) {
        alert('Please fill in all data fields');
        return false;
    }

    var expEmail = /[-a-zA-Z0-9:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9:%_\+.~#?&//=]*)?/gi;
    var regexEmail = new RegExp(expEmail);

    if (!Email.match(regexEmail)) {
        alert('Please a valid Email');
        return false;
    }

    return true;
}
