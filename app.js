document.getElementById("search-button").addEventListener("click", function () {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        searchBooks(query);
    } else {
        alert("Please enter a search query.");
    }
});

document.getElementById("search-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const query = document.getElementById("search-input").value.trim();
        if (query) {
            searchBooks(query);
        } else {
            alert("Please enter a search query.");
        }
    }
});

const searchBooks = (query) => {
    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.docs && data.docs.length > 0) {
                displayBooks(data.docs);
            } else {
                displayNoResults();
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            displayError();
        });
};

const displayBooks = (books) => {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    books.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.className = "book";

        const coverId = book.cover_i ? book.cover_i : null;
        const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/150";

        bookElement.innerHTML = `
            <img src="${coverUrl}" alt="${book.title}" />
            <h3>${book.title}</h3>
            <p>by ${book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
        `;

        bookElement.addEventListener("click", () => {
            fetchBookDetails(book.key);
        });

        container.appendChild(bookElement);
    });
};

const fetchBookDetails = (bookKey) => {
    const apiUrl = `https://openlibrary.org${bookKey}.json`;
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            displayBookDetails(data);
        })
        .catch((error) => {
            console.error("Error fetching book details:", error);
            displayError();
        });
};

const displayBookDetails = (book) => {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    const coverUrl = book.covers
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "https://via.placeholder.com/150";

    const authors = book.authors?.map((a) => a.name).join(", ") || "Unknown Author";
    const description = 
        typeof book.description === "string" 
            ? book.description 
            : book.description?.value || "No description available.";
    const publishDate = book.publish_date || "Not available";
    const subjects = book.subjects?.join(", ") || "Not available";
    const isbn = book.isbn?.join(", ") || "Not available";
    const pages = book.number_of_pages || "Not available";

    container.innerHTML = `
        <div class="book-details">
            <img src="${coverUrl}" alt="${book.title}" />
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${authors}</p>
            <p><strong>Publication Date:</strong> ${publishDate}</p>
            <p><strong>ISBN:</strong> ${isbn}</p>
            <p><strong>Number of Pages:</strong> ${pages}</p>
            <p><strong>Subjects:</strong> ${subjects}</p>
            <p><strong>Description:</strong> ${description}</p>
            <button id="back-button">Back to List</button>
        </div>
    `;

    document.getElementById("back-button").addEventListener("click", displayBooksList);
};

const displayBooksList = () => {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        searchBooks(query);
    }
};

const displayNoResults = () => {
    const container = document.getElementById("books-container");
    container.innerHTML = `
        <div class="no-results">
            <p>No books found. Please try a different search query.</p>
        </div>
    `;
};

const displayError = () => {
    const container = document.getElementById("books-container");
    container.innerHTML = `
        <div class="error-message">
            <p>Sorry, there was an error fetching the data. Please try again later.</p>
        </div>
    `;
};
