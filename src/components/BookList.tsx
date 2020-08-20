import React from "react";

type ListProps = {
  bookDetails: any[];
  handleSelected: Function;
  selectedCss: Function;
};

let BookList: React.FC<ListProps> = ({
  bookDetails,
  handleSelected,
  selectedCss,
}) => {
  return (
    <div>
      {bookDetails.map((book: any, id: number) => (
        <div
          key={id}
          onClick={() => handleSelected(book.best_book[0].id[0]._)}
          className={selectedCss(book.best_book[0].id[0]._)}
        >
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
  );
};

export default BookList;
