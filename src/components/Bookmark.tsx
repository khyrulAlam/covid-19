import React from 'react';

interface IProps {
  countryName: string;
  isBookmark: Boolean | undefined;
  handleChildEvent: Function;
}

function BookMark(props: IProps) {
  let { countryName, isBookmark } = props;

  const handleBookmark = (countryName: string) => {
    props.handleChildEvent(countryName);
  };
  if (!isBookmark) {
    return (
      <span
        onClick={() => {
          handleBookmark(countryName);
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="bookmark"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="svg-inline--fa fa-bookmark fa-w-12 fa-2x"
        >
          <path
            fill="currentColor"
            d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"
            className=""
          ></path>
        </svg>
      </span>
    );
  } else {
    return (
      <span
        className="mark"
        onClick={() => {
          handleBookmark(countryName);
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bookmark"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="svg-inline--fa fa-bookmark fa-w-12 fa-2x"
        >
          <path
            fill="currentColor"
            d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
            className=""
          ></path>
        </svg>
      </span>
    );
  }
}

export default BookMark;
