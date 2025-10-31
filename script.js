const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const loader = document.getElementById("loader");

// Fetch books from OpenLibrary
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a book title!");
    return;
  }

  results.innerHTML = "";
  loader.classList.remove("hidden");

  fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");

      if (!data.docs || data.docs.length === 0) {
        results.innerHTML = `
          <div class="text-center text-gray-400 mt-8">
            <p class="text-xl font-semibold">No Results Found 📖</p>
            <p class="text-gray-500">Try searching for another title.</p>
          </div>
        `;
        return;
      }

      results.innerHTML = data.docs
        .slice(0, 12)
        .map((book) => {
          const title = book.title || "No Title";
          const author = book.author_name ? book.author_name[0] : "Unknown Author";
          const coverId = book.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : "https://via.placeholder.com/150x200/111111/ffffff?text=No+Cover";

          return `
            <div class="bg-gray-900 border border-gray-700 rounded-xl shadow-md p-4 text-center transition-all hover:scale-105 hover:shadow-xl hover:border-gray-500">
              <img src="${coverUrl}" alt="${title}" class="mx-auto mb-3 h-56 w-auto rounded-md object-cover">
              <h2 class="font-semibold text-lg text-white">${title}</h2>
              <p class="text-gray-400 text-sm mt-1">${author}</p>
            </div>
          `;
        })
        .join("");

      saveSearch(query);
      displaySearchHistory();
    })
    .catch(() => {
      loader.classList.add("hidden");
      results.innerHTML = `<p class="text-center text-red-500 mt-6">Error fetching data. Please try again.</p>`;
    });
});

// Clear button functionality
clearBtn.addEventListener("click", () => {
  results.innerHTML = "";
  searchInput.value = "";
});

// Save searches in localStorage
function saveSearch(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 5) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

// Display search history
function displaySearchHistory() {
  const historyContainer = document.getElementById("history");
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (history.length === 0) {
    historyContainer.innerHTML = `<p class="text-gray-500 text-sm">No recent searches yet.</p>`;
    return;
  }

  historyContainer.innerHTML = history
    .map(
      (item) => `
      <button class="bg-gray-800 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-1.5 rounded-full text-sm transition-all" onclick="searchFromHistory('${item}')">
        ${item}
      </button>
    `
    )
    .join("");
}

// Re-search from history
function searchFromHistory(query) {
  searchInput.value = query;
  searchBtn.click();
}

// Load search history on page load
displaySearchHistory();
