<script type="text/babel" src="reactWidget.js"></script>

const { useState } = React;

function QuoteWidget() {
  const quotes = [
    "A reader lives a thousand lives before he dies.",
    "Books are a uniquely portable magic.",
    "Reading gives us someplace to go when we have to stay where we are.",
    "So many books, so little time.",
  ];

  const [quote, setQuote] = useState(quotes[0]);

  function changeQuote() {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl text-center shadow-lg transition-transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-3">📖 Book Quote</h2>
      <p className="text-gray-300 italic mb-4">“{quote}”</p>
      <button
        onClick={changeQuote}
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        New Quote
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("react-widget")).render(<QuoteWidget />);
function ThemeToggle() {
  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("theme-toggle")).render(<ThemeToggle />);
