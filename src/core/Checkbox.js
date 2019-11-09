import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state then we want to push else take out
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        onChange={handleToggle(category._id)}
        value={checked.indexOf(category._id) === -1}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
