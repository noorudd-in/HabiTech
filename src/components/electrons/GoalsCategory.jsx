import React from "react";

const GoalsCategory = () => {
  return (
    <div>
      <label>Category: </label>
      <select
        name="goalsCategory"
        id="goalsCategory"
        className="text-black rounded-md px-1 bg-gray-100 dark:bg-amber-50"
      >
        <option value="tag1">Show by Tag 1</option>
        <option value="tag2">Show by Tag 2</option>
        <option value="tag3">Show by Tag 3</option>
      </select>
    </div>
  );
};

export default GoalsCategory;
