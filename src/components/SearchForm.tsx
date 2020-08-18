import React from "react";

type SearchProps = {
  search: string;
  onSearchChange: Function;
  onSearchSubmit: Function;
};

let SearchForm: React.FC<SearchProps> = ({
  search,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form
      className="flex"
      onSubmit={(event) => {
        event.preventDefault();
        onSearchSubmit();
      }}
    >
      <input
        className="h-10 border border-blue-700 rounded mr-2 p-2"
        type="text"
        placeholder="Search here.."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      ></input>
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 border border-blue-700 rounded"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default SearchForm;
