import React, { useState } from "react";

const Radiobox = ({ prices, handleFilters }) => {
  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  const [value, setValue] = useState(0);
  return prices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        value={`${price._id}`}
        name={price}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default Radiobox;
