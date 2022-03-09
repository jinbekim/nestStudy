import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const changeId = (value: string) => {
    setId(value);
  };
  const changePw = (value: string) => {
    setPw(value);
  };
  const signUp = () => {
    console.log(id, pw);
    axios.post('http://localhost:5000/signup', {
      id: id,
      password: pw,
    });
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 style={{ marginTop: '40px' }}>NESTJS</h1>
        <div className="inputBox">
          <input
            placeholder="ID"
            className="input inputID"
            onChange={(e) => {
              changeId(e.target.value);
            }}
          />
          <input
            placeholder="PASSWORD"
            className="input inputPW"
            type="password"
            onChange={(e) => {
              changePw(e.target.value);
            }}
          />
        </div>
        <div className="buttonBox">
          <div
            className="Button"
            onClick={() => {
              signUp();
            }}
          >
            Sign up
          </div>
          <Link to="/" className="Button" style={{ textDecoration: 'none' }}>
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
};
