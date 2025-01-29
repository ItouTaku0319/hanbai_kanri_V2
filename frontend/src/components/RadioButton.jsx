import React from 'react';
import { Form } from 'react-bootstrap';

function RadioButton({ label, options, register, required, errors }) {
  return (
    <Form.Group controlId="formBasicRadio">
      <Form.Label>{label}</Form.Label>
      <div>
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={option.label}
            value={option.value}
            {...register('radioOption', { required })}
          />
        ))}
      </div>
      {errors.radioOption && <span>このフィールドは必須です</span>}
    </Form.Group>
  );
}

export default RadioButton; 