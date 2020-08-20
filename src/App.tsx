import React from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
var parseString = require("xml2js").parseString;

function App() {
  let [search, setSearch] = React.useState("");
  let [bookDetails, setBookDetails] = React.useState([]);
  let [selectedState, setSeletedState] = React.useState({
    selected: false,
    selectedId: "",
  });

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

  let handleSelected = (id: string) => {
    setSeletedState({ selected: true, selectedId: id });
  };

  let selectedCss = (id: string) => {
    return id !== selectedState.selectedId
      ? "border-2 border-blue-200 p-2 mb-2"
      : "border-2 border-red-900 p-2 mb-2";
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
          <BookList
            bookDetails={bookDetails}
            handleSelected={handleSelected}
            selectedCss={selectedCss}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
