import React from "react";
import Form from "react-bootstrap/Form";
import "./Searchbar.css";

function Searchbar({ searchText, setSearchText }) {
  return (
    <Form className="searchbar d-flex align-items-center border border-dark rounded-pill">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-2"
      >
        <path
          d="M12.5001 11.0001H11.7101L11.4301 10.7301C12.6301 9.33014 13.2501 7.42014 12.9101 5.39014C12.4401 2.61014 10.1201 0.390137 7.32014 0.0501373C3.09014 -0.469863 -0.469863 3.09014 0.0501373 7.32014C0.390137 10.1201 2.61014 12.4401 5.39014 12.9101C7.42014 13.2501 9.33014 12.6301 10.7301 11.4301L11.0001 11.7101V12.5001L15.2501 16.7501C15.6601 17.1601 16.3301 17.1601 16.7401 16.7501C17.1501 16.3401 17.1501 15.6701 16.7401 15.2601L12.5001 11.0001ZM6.50014 11.0001C4.01014 11.0001 2.00014 8.99014 2.00014 6.50014C2.00014 4.01014 4.01014 2.00014 6.50014 2.00014C8.99014 2.00014 11.0001 4.01014 11.0001 6.50014C11.0001 8.99014 8.99014 11.0001 6.50014 11.0001Z"
          fill="#666666"
        />
      </svg>
      <Form.Control
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="searchinput shadow-none p-0"
        value={searchText || ""}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </Form>
  );
}

export default Searchbar;
