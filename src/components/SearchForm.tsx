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
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <label>
          Search:
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          ></input>
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
