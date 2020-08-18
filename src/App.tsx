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
          setBookDetails(searchResults.slice(0, 5));
        });
      });
  };

  return (
    <div className="w-full flex">
      <div className="flex flex-col m-5 w-1/2">
        <div className="mb-5">
          <SearchForm
            search={search}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>
        <div className="flex flex-col space-y-4">
          {bookDetails.map((book: any, id: number) => (
            <div key={id} className="border border-blue-200 p-2">
              <div className="flex">
                <img
                  className="mr-2"
                  src={book.best_book[0].small_image_url[0]}
                  alt={book.best_book[0].title[0]}
                />
                <div className="flex flex-col">
                  <div>
                    <span className="font-bold">Title: </span>
                    {book.best_book[0].title[0]}
                  </div>
                  <div>
                    <span className="font-bold">Author: </span>{" "}
                    {book.best_book[0].author[0].name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
