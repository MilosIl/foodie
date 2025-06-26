import { useState } from "react";
import { List } from "./List";
import { Button } from "./ui";

const Recipe = ({
  id,
  name,
  ingredients,
  instructions,
  prepTimeMinutes,
  cookTimeMinutes,
  servings,
  cuisine,
  caloriesPerServing,
  tags,
  // userId,
  image,
  rating,
  reviewCount,
  mealType,
}) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
    <div id={id} className="flex bg-orange-200 shadow-md p-4 rounded-lg h-full">
      <div className="max-w-sm">
        <h3 className="mb-2 font-semibold text-lg">{name}</h3>
        {tags.map((tag, index) => (
          <span
            className="inline-block bg-orange-500 mr-2 mb-2 px-2 py-1 rounded-md text-white"
            key={index}
          >
            {tag}
          </span>
        ))}
        <img src={image} alt={image} className="rounded-lg" />
        <div className="flex justify-between items-center mt-2 w-full">
          icon like
          <Button onClick={toggle} label={"See more"} />
        </div>
      </div>
      {show ? (
        <>
          <div className="gap-4 grid grid-cols-2 grid-rows-1 my-2 ml-4 max-w-sm">
            <div className="col-span-2 rows-span-2">
              <List label={"Ingredients"} listItems={ingredients} />
              <List label={"Instructions"} listItems={instructions} />
            </div>
            <div>
              <p>Prep Time: {prepTimeMinutes} min.</p>
              <p>Cook Time: {cookTimeMinutes} min.</p>
              <p>Plate: {servings}</p>
              <p>Cuisine: {cuisine}</p>
              <p>Calories per plate: {caloriesPerServing}</p>
              <p>
                Rating: {rating} ({reviewCount} reviews)
              </p>
              <p>Type: {mealType}</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export { Recipe };
