import { IconArrowDown } from "@/assets";
import { AddRecipeForm, Button, Recipe, Select, Modal } from "@/components";
import { MEAL_TYPES } from "@/constants";
import { useRecipeOfTheDay } from "@/services/recipe";
import { useState } from "react";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRecipeSubmit = (recipeData) => {
    console.log("New recipe submitted:", recipeData);
    // Here you would typically send the data to your API
    // For now, we'll just close the modal
    setIsModalOpen(false);
    // You could also show a success message here
  };

  const { data: recipeOfTheDay, isLoading } = useRecipeOfTheDay();

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[url('./assets/hero-background.jpg')] bg-cover bg-no-repeat h-screen text-left">
        <header className="bg-black/40 p-2 rounded-lg text-white">
          <h1 className="mb-2 w-[22ch] font-extrabold text-3xl">
            Place where <span className="text-orange-400">recipes</span> meets
            with your taste
          </h1>
          <p>
            Find over{" "}
            <span className="font-bold text-orange-400 text-xl">
              200+ recipes
            </span>{" "}
          </p>
        </header>
        <p className="bottom-0 absolute bg-slate-50/40 p-1 font-medium text-base uppercase">
          scroll down to see more <IconArrowDown className="animate-bounce" />
        </p>
      </div>
      <section className="mx-auto">
        <h2 className="my-8 font-bold text-2xl text-center">
          Recipe of a day for {new Date().toLocaleDateString("en-GB")}
        </h2>
        {/* Recipe of the day */}
        {isLoading && recipeOfTheDay ? (
          <div className="flex justify-center items-center">
            <Recipe {...recipeOfTheDay} />
          </div>
        ) : (
          <div className="mx-auto p-6 max-w-md text-center">
            <p className="text-gray-600">No recipe available today</p>
          </div>
        )}
      </section>
      <section>
        <h2 className="my-8 font-bold text-2xl text-center">
          Pick a recipe for your meal type
        </h2>
        <Select options={MEAL_TYPES} />
      </section>
      <section>
        <h2 className="my-8 font-bold text-2xl text-center">
          Suggest a new recipe for us
        </h2>
        <div className="flex justify-center items-center">
          <Button onClick={handleOpenModal}>Add new recipe</Button>
        </div>

        {/* Modal for Add Recipe Form */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add New Recipe"
          size="large"
        >
          <AddRecipeForm
            onSubmit={handleRecipeSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </section>
    </>
  );
};

export { HomePage };
