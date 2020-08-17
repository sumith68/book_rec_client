import React from "react";
import SearchForm from "./components/SearchForm";

function App() {
  let [search, setSearch] = React.useState("");

  let onSearchChange = (value: string) => {
    setSearch((prevValue) => value);
  };

  let onSearchSubmit = () => {
    console.log("-------------------");
    console.log(search);
    console.log("-------------------");
  };

  return (
    <div className="App">
      <div>
        <SearchForm
          search={search}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
      </div>
    </div>
  );
}

export default App;
