import { useState } from 'react';
import { X } from 'react-feather';
import { Button, Text } from '@chakra-ui/react';
import "./AddCard.css";

const AddCard = (props) => {
  // State to manage the visibility of the editing interface
  const [showEdit, setShowEdit] = useState(false);
  
  // State to manage the input value, initialized with defaultValue prop or empty string
  const [inputValue, setInputValue] = useState(props.defaultValue || '');

  return (
    <div className="addcard">
      {showEdit ? (
        // Editable form when showEdit is true
        <form
          className={`editable_edit ${props.editClass || ''}`} // Apply additional classes if provided
          onSubmit={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            if (props.onSubmit) props.onSubmit(inputValue); // Call the onSubmit prop with input value
            setShowEdit(false); // Close the editing interface
            setInputValue(''); // Reset input value
          }}
        >
          <input
            value={inputValue} // Controlled input value
            onChange={(e) => setInputValue(e.target.value)} // Update input value on change
            type="text"
            placeholder={props.placeholder || 'Enter item'} // Default placeholder
            defaultValue={props.text} // Default text if provided
          />
          <div className="editable_edit_footer">
            <Button type="submit" variant="solid" colorScheme="gray">
              {props.buttonText || 'Add'} // Button text, defaulting to 'Add'
            </Button>
            <X onClick={() => setShowEdit(false)} /> {/* Close button */}
          </div>
        </form>
      ) : (
        // Display text when not in edit mode
        <Text
          className={`editable_display ${props.displayClass || ''}`} // Apply additional classes if provided
          onClick={() => setShowEdit(true)} // Enable editing on click
        >
          {props.text || props.buttonText}
        </Text>
      )}
    </div>
  );
};

export default AddCard;
