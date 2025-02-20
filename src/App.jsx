import { useState, useEffect } from "react";
import { FaSync, FaHeart, FaSun, FaMoon } from "react-icons/fa";



function App() {
  const [quote, setQuote] = useState({
    anime: "",
    character: "",
    quote: "",
    animeImage: "",
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  //Initialize default theme to be light
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [flip, setFlip] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState)
  }

  const toggleLike = () => {
    setLiked(prevState => !prevState)
  }


  const getQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/random"); // Fetch quote data from backend API
      if (!response.ok) {
        throw new Error("Failed to fetch quote...");
      }
      const data = await response.json();

      if (data && data.quote && data.anime && data.character) {
        setQuote({
          anime: data.anime,
          character: data.character,
          quote: data.quote,
          animeImage: data.animeImage || "https://via.placeholder.com/150", // Fallback image
        });
        setLiked(false);
      } else {
        throw new Error("Invalid quote format from API");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  //Fetching the quote on initial render
  useEffect(() => {
    getQuote();
  }, [])



  const getNewQuote = () => {
    setFlip(true);
    setTimeout(() => {
      setFlip(false); //reseting flip state after animation completes
      getQuote(); //Fetch new quote after flip animation
    }, 800)
  }


  //Save the last selected theme in localstorage
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);


  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className={`quote-card ${darkMode ? "dark-mode" : ""} ${flip ? "flip" : ""}`}>
        <div className="quote-content">
          {/* Display loading, error, or quote */}
          {loading ? (
            <div className="loading-spinner">Loading...</div> // Show loading indicator
          ) : error ? (
            <div className="error-message">{error}</div> // Show error message
          ) : (
            <>
              <div className="anime-image-container">
                <img
                  src={quote.animeImage}
                  alt={quote.anime}
                  className="anime-image"
                />
              </div>
              <div className="quote-text-container">
                <h3 className="anime-title">{quote.anime}</h3>
                <blockquote className="quote-text">
                  <p>"{quote.quote}"</p>
                  <footer>— {quote.character}</footer>
                </blockquote>
              </div>
            </>
          )}
        </div>
        <div className="buttons-container">
          {/* Get New Quote Button*/}
          <button
            onClick={getNewQuote}
            className="btn get-quote-btn"
            disabled={loading}>
            <FaSync />
          </button>

          {/* Like Button*/}
          <button
            onClick={toggleLike}
            className={`btn like-btn ${liked ? "liked" : ""}`}
            disabled={loading}
          >
            <FaHeart />
          </button>
          {/* Dark/Light theme button */}
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}

          </button>
        </div>
      </div>

    </div>
  )
}




export default App;