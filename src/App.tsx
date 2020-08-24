import React from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import SelectedBookDetails from "./components/SelectedBookDetails";
var parseString = require("xml2js").parseString;

interface BookInfo {
  isbn: string;
  isbn13: string;
  imageUrl: string;
  description: string;
  similar_books: any;
}

interface Selected {
  selected: boolean;
  selectedId: string;
}

interface copyClipboard {
  isbn: boolean;
  isbn13: boolean;
}

function App() {
  let [search, setSearch] = React.useState<string>("");
  let [bookDetails, setBookDetails] = React.useState<any>([]);
  let [selectedState, setSeletedState] = React.useState<Selected>({
    selected: false,
    selectedId: "",
  });
  let [bookDetailedInfo, setBookDetailedInfo] = React.useState<BookInfo>({
    isbn: "",
    isbn13: "",
    imageUrl: "",
    description: "",
    similar_books: [],
  });

  let [copySuccess, setCopySuccess] = React.useState<copyClipboard>({
    isbn: false,
    isbn13: false,
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
    let url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show?key=${process.env.REACT_APP_GOODREADS_API_KEY}&id=${id}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((response) => {
        parseString(response, (err: any, result: any) => {
          let searchResults = result.GoodreadsResponse.book[0];
          console.log(searchResults);
          setBookDetailedInfo({
            isbn: searchResults.isbn[0],
            isbn13: searchResults.isbn13[0],
            imageUrl: searchResults.image_url[0],
            description: searchResults.description[0],
            similar_books: searchResults.similar_books
              ? searchResults.similar_books[0].book.slice(0, 5)
              : [],
          });
        });
      });
  };

  let selectedCss = (id: string) => {
    return id !== selectedState.selectedId
      ? "border-2 border-blue-200 p-2 mb-2"
      : "border-2 border-red-900 p-2 mb-2";
  };

  let copyToClipboard = (event: any) => {
    event.target.select();
    setCopySuccess({ ...copySuccess, [event.target.name]: true });
    document.execCommand("copy");
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
      <div className="flex flex-col m-5 mt-20 w-1/2">
        <SelectedBookDetails
          selectedState={selectedState}
          copySuccess={copySuccess}
          copyToClipboard={copyToClipboard}
          bookDetailedInfo={bookDetailedInfo}
        />
      </div>
    </div>
  );
}

export default App;
