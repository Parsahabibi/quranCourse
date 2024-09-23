import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMediaQuery } from "react-responsive";


const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(animation);
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const ImageGallery = () => {
  const correctOrder = [
    { id: "1", src: "/assets/images/putInOrder/Picture1.png", name: "Image 1" },
    { id: "2", src: "/assets/images/putInOrder/Picture2.png", name: "Image 2" },
    { id: "3", src: "/assets/images/putInOrder/Picture3.png", name: "Image 3" },
    { id: "4", src: "/assets/images/putInOrder/Picture4.png", name: "Image 4" },
  ];

  const shuffledImages = [...correctOrder].sort(() => Math.random() - 0.5);
  const [images, setImages] = useState(shuffledImages);
  const [boxes, setBoxes] = useState([null, null, null, null]);
  const [orderInput, setOrderInput] = useState(["", "", "", ""]); // Empty inputs
  const [isCorrect, setIsCorrect] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [incorrectInputs, setIncorrectInputs] = useState([]); // Track incorrect inputs
  const [incorrectBoxes, setIncorrectBoxes] = useState([]);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId.startsWith("box")) {
      const boxIndex = parseInt(destination.droppableId.replace("box-", ""));
      if (boxes[boxIndex]) return; // Prevent overwriting box

      const draggedImage = images[source.index];

      const newBoxes = [...boxes];
      newBoxes[boxIndex] = draggedImage;

      const newImages = [...images];
      newImages.splice(source.index, 1); // Remove the image from the list

      setBoxes(newBoxes);
      setImages(newImages);
    }

    if (destination.droppableId === "images" && source.droppableId === "images") {
      const reorderedImages = Array.from(images);
      const [removed] = reorderedImages.splice(source.index, 1);
      reorderedImages.splice(destination.index, 0, removed);
      setImages(reorderedImages);
    }
  };

  const checkOrder = () => {
    let isCorrectOrder;

    if (isMobile) {
      // Check if all inputs are filled
      if (orderInput.some(input => input === "")) {
        alert("Please enter numbers for all the images.");
        return;
      }

      // Compare each input value with the image's ID
      const incorrect = images.map((image, idx) => {
        if (orderInput[idx] !== image.id) {
          return true; // Input is incorrect
        }
        return false; // Input is correct
      });

      isCorrectOrder = incorrect.every((item) => item === false);
      setIncorrectInputs(incorrect); // Save incorrect inputs
    } else {
      const incorrect = boxes.map((box, idx) => {
        if (!box || box.id !== correctOrder[idx].id) {
          return true; // Box is incorrect
        }
        return false; // Box is correct
      });

      isCorrectOrder = incorrect.every((item) => item === false);
      setIncorrectBoxes(incorrect);
    }

    setIsCorrect(isCorrectOrder);
    setIsChecked(true);

    if (isCorrectOrder) {
      const audio = new Audio('/assets/sound/success.mp3');
      audio.play();
    }else{
      const audio = new Audio('/assets/sound/error.mp3');
      audio.play();
    }

  };

  const retry = () => {
    setBoxes([null, null, null, null]); // Empty the boxes
    setImages(shuffledImages); // Reset the images
    setOrderInput(["", "", "", ""]); // Reset order inputs to empty
    setIsChecked(false); // Reset the check status
    setIsCorrect(false); // Reset the correctness flag
    setIncorrectInputs([]); // Reset incorrect inputs
  };


  console.log(incorrectInputs)

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-16">Images Gallery</h1>

        {!isMobile ? (
          <>
            {/* Boxes for dropping */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {boxes.map((box, index) => (
                <StrictModeDroppable droppableId={`box-${index}`} key={index}>
                  {(provided) => (
                    <div
                      className={`relative w-40 h-40 border-2 ${isChecked && incorrectBoxes[index] ? 'border-4 border-dashed border-red-500' : 'border-4 border-dashed border-gray-400'} rounded-md flex items-center justify-center bg-gray-100`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {box ? (
                        <img
                          src={box.src}
                          alt={`Box ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400"></span>
                      )}
                      <span className="absolute top-2 left-2 bg-gray-700 text-white p-1 rounded-full text-xs w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              ))}
            </div>
            <StrictModeDroppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-4 justify-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {images.map(({ id, src }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          className="w-40 h-40"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={src}
                            alt={`img-${id}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </>
        ) : (
          <>
            {/* Inputs for specifying the order */}
            <div className="mb-8">
              {images.map((image, index) => (
                <div key={image.id} className="flex justify-center items-center gap-6 mb-4">
                  <div className="w-20 h-20">
                    <img src={image.src} alt={`img-${image.id}`} style={{ border: incorrectInputs.length > 0 ? `2px solid ${!incorrectInputs[index] ? '#dc2626' : '#a3e635'}` : '2px solid transparent' }} className="w-20 h-20 object-cover rounded-md mb-4" />
                  </div>
                  <input
                    style={{ backgroundColor: 'white', color: 'black', marginTop: '8px', width: '30px', height: '30px',  border: incorrectInputs.length > 0 ? `2px solid ${!incorrectInputs[index] ? '#dc2626' : '#a3e635'}` : '2px solid transparent' , outline: 'none' }}
                    type="number"
                    min="1"
                    max="4"
                    value={orderInput[index]}
                    onChange={(e) => {
                      const newOrderInput = [...orderInput];
                      newOrderInput[index] = e.target.value;
                      setOrderInput(newOrderInput);
                    }}
                    className={` rounded-md p-2 w-20`}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Check Order Button */}
        <div className="mt-2 sm:mt-8 text-center relative z-[100000000000]">
          <button
            onClick={checkOrder}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 "
          >
            Check
          </button>

          {/* Retry Button */}
          {isChecked && !isCorrect && (
            <button
              onClick={retry}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Retry
            </button>
          )}
        </div>

        {/* Success or Failure message */}
        {isChecked && (
          <div className="mt-2 text-center">
            <p className={`text-base sm:text-lg	 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect
                ? "Congratulations! You've put the images in the correct order!"
                : "Oops! Some inputs are incorrect. Try again!"}
            </p>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default ImageGallery;

