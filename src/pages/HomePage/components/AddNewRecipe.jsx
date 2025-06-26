import { AddRecipeForm, Button, Modal } from "@/components";
import { useState } from "react";

const AddNewRecipe = () => {
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

  return (
    <section>
      <h2 className="my-8 font-bold text-2xl text-center">
        Suggest a new recipe for us
      </h2>
      <div className="flex justify-center items-center">
        <Button onClick={handleOpenModal} label={"Add new recipe"} />
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
  );
};

export { AddNewRecipe };
