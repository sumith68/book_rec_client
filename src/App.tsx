import React from "react";
import SearchForm from "./components/SearchForm";
var parseString = require("xml2js").parseString;

function App() {
  let [search, setSearch] = React.useState("");
  let [bookDetails, setBookDetails] = React.useState([]);

  let onSearchChange = (value: string) => {
    setSearch((prevValue) => value);
  };

  let onSearchSubmit = () => {
    let url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index?key=${process.env.REACT_APP_GOODREADS_API_KEY}&search=author&q=${search}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((response) => {
        parseString(response, (err: any, result: any) => {
          let searchResults =
            result.GoodreadsResponse.search[0].results[0].work;
          setBookDetails(searchResults);
        });
      });
  };

  return (
    <div>
      <div>
        <SearchForm
          search={search}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
      </div>

      {bookDetails.map((book: any) => (
        <ul>
          <li>{book.best_book[0].title[0]}</li>
          <li>{book.best_book[0].author[0].name}</li>
          <li>
            <img
              src={book.best_book[0].small_image_url[0]}
              alt={book.best_book[0].title[0]}
            />
          </li>
          <hr />
        </ul>
      ))}
    </div>
  );
}

export default App;
