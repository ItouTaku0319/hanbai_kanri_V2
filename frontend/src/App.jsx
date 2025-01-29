import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextInput from './components/TextInput';
import Checkbox from './components/Checkbox';
import RadioButton from './components/RadioButton';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [count, setCount] = useState(0)
  const [pingResponse, setPingResponse] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/ping")
      .then(response => response.text())
      .then(data => setPingResponse(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container>
      <h1>フォーム例</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ border: '1px solid red' }}>
          <Col md={6}>
            <TextInput label="テキスト入力1" register={register} required={true} errors={errors} />
          </Col>
          <Col md={6}>
            <TextInput label="テキスト入力2" register={register} required={true} errors={errors} />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Checkbox label="チェックボックス" register={register} />
          </Col>
          <Col md={6}>
            <RadioButton
              label="ラジオボタン"
              options={[
                { label: 'オプション1', value: 'option1' },
                { label: 'オプション2', value: 'option2' }
              ]}
              register={register}
              required={true}
              errors={errors}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          送信
        </Button>
      </Form>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="ping-response">
        <h2>Ping Response:</h2>
        <p>{pingResponse || 'Waiting for response...'}</p>
      </div>
    </Container>
  );
}

export default App;
