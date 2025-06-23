import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { MEAL_TYPES } from "@/constants";
import { useState } from "react";

const AddRecipeForm = ({ onSubmit, onCancel }) => {
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      ingredients: [""],
      instructions: [""],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "Easy",
      cuisine: "",
      caloriesPerServing: 0,
      tags: [""],
      image: "",
      mealType: [],
      userId: 1, // This should come from auth context
      rating: 0,
      reviewCount: 0,
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const handleImageChange = (e) => {
    const url = e.target.value;
    setValue("image", url);
    setImagePreview(url);
  };

  const onFormSubmit = (data) => {
    // Filter out empty values
    const cleanedData = {
      ...data,
      ingredients: data.ingredients.filter((item) => item.trim() !== ""),
      instructions: data.instructions.filter((item) => item.trim() !== ""),
      tags: data.tags.filter((item) => item.trim() !== ""),
      id: Date.now(), // Generate a temporary ID
    };

    if (onSubmit) {
      onSubmit(cleanedData);
      alert(`Recipe added successfully! ${cleanedData.name}`);
    }
  };

  return (
    <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-4xl">
      

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Recipe Name *
            </label>
            <Input
              {...register("name", { required: "Recipe name is required" })}
              placeholder="e.g., Chocolate Chip Cookies"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Cuisine
            </label>
            <Input
              {...register("cuisine", { required: "Cuisine is required" })}
              placeholder="e.g., Italian, Chinese, Mexican"
              className={errors.cuisine ? "border-red-500" : ""}
            />
            {errors.cuisine && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.cuisine.message}
              </p>
            )}
          </div>
        </div>

        {/* Time and Servings */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Prep Time (min) *
            </label>
            <Input
              type="number"
              {...register("prepTimeMinutes", {
                required: "Prep time is required",
                min: { value: 1, message: "Must be at least 1 minute" },
              })}
              className={errors.prepTimeMinutes ? "border-red-500" : ""}
            />
            {errors.prepTimeMinutes && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.prepTimeMinutes.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Cook Time (min) *
            </label>
            <Input
              type="number"
              {...register("cookTimeMinutes", {
                required: "Cook time is required",
                min: { value: 1, message: "Must be at least 1 minute" },
              })}
              className={errors.cookTimeMinutes ? "border-red-500" : ""}
            />
            {errors.cookTimeMinutes && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.cookTimeMinutes.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Servings *
            </label>
            <Input
              type="number"
              {...register("servings", {
                required: "Servings is required",
                min: { value: 1, message: "Must serve at least 1 person" },
              })}
              className={errors.servings ? "border-red-500" : ""}
            />
            {errors.servings && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.servings.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Calories/Serving
            </label>
            <Input
              type="number"
              {...register("caloriesPerServing", {
                min: { value: 0, message: "Cannot be negative" },
              })}
              className={errors.caloriesPerServing ? "border-red-500" : ""}
            />
            {errors.caloriesPerServing && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.caloriesPerServing.message}
              </p>
            )}
          </div>
        </div>

        {/* Difficulty and Meal Type */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Difficulty
            </label>
            <select
              {...register("difficulty")}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Meal Type
            </label>
            <div className="flex flex-wrap gap-2">
              {MEAL_TYPES.map((mealType) => (
                <label key={mealType} className="flex items-center">
                  <input
                    type="checkbox"
                    value={mealType}
                    {...register("mealType")}
                    className="mr-2"
                  />
                  <span className="text-sm">{mealType}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Image URL
          </label>
          <Input
            {...register("image")}
            onChange={handleImageChange}
            placeholder="https://example.com/image.jpg"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Recipe preview"
                className="rounded-md w-32 h-32 object-cover"
                onError={() => setImagePreview("")}
              />
            </div>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Ingredients *
          </label>
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                {...register(`ingredients.${index}`, {
                  required:
                    index === 0 ? "At least one ingredient is required" : false,
                })}
                placeholder={`Ingredient ${index + 1}`}
                className="flex-1"
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="small"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() => appendIngredient("")}
          >
            Add Ingredient
          </Button>
          {errors.ingredients?.[0] && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.ingredients[0].message}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Instructions *
          </label>
          {instructionFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <div className="flex-1">
                <textarea
                  {...register(`instructions.${index}`, {
                    required:
                      index === 0
                        ? "At least one instruction is required"
                        : false,
                  })}
                  placeholder={`Step ${index + 1}`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                  rows="2"
                />
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="small"
                  onClick={() => removeInstruction(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() => appendInstruction("")}
          >
            Add Step
          </Button>
          {errors.instructions?.[0] && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.instructions[0].message}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Tags
          </label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                {...register(`tags.${index}`)}
                placeholder={`Tag ${index + 1}`}
                className="flex-1"
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="small"
                  onClick={() => removeTag(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() => appendTag("")}
          >
            Add Tag
          </Button>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export { AddRecipeForm };
