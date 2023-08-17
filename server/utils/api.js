const fetch = require("node-fetch");

const API_KEY = "AIzaSyBvugchZRkvRsDASJok9THPvCdwFUiNPGs";

const fetchBooks = async (bookSearch) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}&key=${API_KEY}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    const data = await response.json();

    return data;
}

module.exports = fetchBooks;
