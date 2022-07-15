import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const printRef = React.useRef();
  const [quoteText, setQuoteText] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [userQuote, setUserQuote] = useState("");
  const [quoteForm, setQuoteForm] = useState("");

  function handleQuote() {
    fetch("https://api.kanye.rest")
      .then((response) => response.json())
      .then((json) => {
        setQuoteText(json.quote);
      });
  }

  const handleFavorite = (event) => {
    event.preventDefault();
    setQuoteText([...quoteText, userQuote]);
    setUserQuote("");
    console.log(userQuote) 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuoteList([...quoteList, quoteForm]);
    setQuoteForm("");
  };
  const handleChange = (event) => {
    setUserQuote(event.target.value);
    setQuoteForm(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p quoteText={quoteText} printRef={printRef}>
          {quoteText}
        </p>
        <button onClick={handleQuote}>Get Quote</button>
        <button onClick={handleFavorite}>Add Favorites</button>
        <p onChange={handleChange} userQuote={userQuote} printRef={printRef}>
          {userQuote}
        </p>
        
        <form onSubmit={handleSubmit}>
          <label>Input your quote:</label>
          <input type="text" value={quoteForm} onChange={handleChange} />
          <button>submit</button>
        </form>
        <h3>Daftar Quote</h3>
        <table>
          <tbody>
            {quoteList.map((val) => {
              return (
                <tr>
                  <td>{val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
