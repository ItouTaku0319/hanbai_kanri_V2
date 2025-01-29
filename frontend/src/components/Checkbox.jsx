import React from 'react';
import { Form } from 'react-bootstrap';

function Checkbox({ label, register }) {
  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check
        type="checkbox"
        label={label}
        {...register('checkbox')}
      />
    </Form.Group>
  );
}

export default Checkbox; 