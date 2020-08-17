import React from "react";

let SearchForm = () => {
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("Submitting...");
        }}
      >
        <label>
          Search:
          <input
            type="text"
            onChange={() => {
              console.log("On Change...");
            }}
          ></input>
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SearchForm;
