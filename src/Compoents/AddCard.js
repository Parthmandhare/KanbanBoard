import { useState } from 'react';
import { X } from 'react-feather';
import { Button, Text } from '@chakra-ui/react';
import "./AddCard.css"

const AddCard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultValue || '');

  return (
    <div className="addcard">
      {showEdit ? (
        <form
          className={`editable_edit ${props.editClass || ''}`}
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onSubmit) props.onSubmit(inputValue);
            setShowEdit(false);
            setInputValue('');
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder={props.placeholder || 'Enter item'}
            defaultValue={props.text}
          />
          <div className="editable_edit_footer">
            <Button type="submit" variant="solid" colorScheme="gray">
              {props.buttonText || 'Add'}
            </Button>
            <X onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <Text
          className={`editable_display ${props.displayClass || ''}`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || 'Add Card'}
        </Text>
      )}
    </div>
  );
};

export default AddCard;
