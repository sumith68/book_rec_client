import React from "react";

type BookDetailsProps = {
  selectedState: any;
  bookDetailedInfo: any;
};

let SelectedBookDetails: React.FC<BookDetailsProps> = ({
  selectedState,
  bookDetailedInfo,
}) => {
  return selectedState.selected ? (
    <div>
      <div className="flex mb-5">
        <div className="mr-5">
          <img className="mb-2 " src={bookDetailedInfo.imageUrl} alt="image" />
          <p>
            <span className="font-bold">ISBN: </span>
            <span className="text-xs font-bold">{bookDetailedInfo.isbn}</span>
          </p>
          <p>
            <span className="font-bold">ISBN13: </span>
            <span className="text-xs font-bold">{bookDetailedInfo.isbn13}</span>
          </p>
        </div>
        <p>
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: bookDetailedInfo.description,
            }}
          />
        </p>
      </div>

      <div>
        {bookDetailedInfo.similar_books.map((similar_book: any, id: number) => (
          <div key={id} className="border-2 border-blue-200 p-2 mb-2">
            <div className="flex">
              <img
                className="mr-2"
                src={similar_book.small_image_url[0]}
                alt=""
              />

              <div className="flex flex-col">
                <div>
                  <span className="font-bold">Title: </span>
                  {similar_book.title[0]}
                </div>
                <div>
                  <span className="font-bold">Authors: </span>
                  {similar_book.authors.map((author: any) => (
                    <p>{author.author[0].name[0]}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SelectedBookDetails;
