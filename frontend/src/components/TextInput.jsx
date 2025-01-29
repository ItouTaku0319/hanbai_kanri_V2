import React from 'react';
import { Form } from 'react-bootstrap';

function TextInput({ label, register, required, errors }) {
  return (
    <Form.Group controlId="formBasicText">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={`${label}を入力してください`}
        {...register('textInput', { required })}
      />
      {errors.textInput && <span>このフィールドは必須です</span>}
    </Form.Group>
  );
}

export default TextInput; 