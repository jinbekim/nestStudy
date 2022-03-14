import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const changeId = (value: string) => {
    setId(value);
  };
  const changePw = (value: string) => {
    setPw(value);
  };
  const SignUp = async () => {
    try {
      await axios.post('http://localhost:5000/auth/sign_up', {
        //post하는 경로도 본인의 백엔드에 알맞게 수정해주세요!
        userId: id, //userId와 userPassword는 제 백엔드 api에서 post 해주는 body값이라
        userPassword: pw, //본인의 body에 맞게 post하시면 됩니다!
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 style={{ marginTop: '20px' }}>NESTJS</h1>
        <h2 style={{ margin: '0px' }}>Sign Up</h2>
        <form className="inputBox">
          <input
            autoComplete="false"
            placeholder="ID"
            className="input inputID"
            onChange={(e) => {
              changeId(e.target.value);
            }}
          />
          <input
            autoComplete="false"
            placeholder="PASSWORD"
            className="input inputPW"
            type="password"
            onChange={(e) => {
              changePw(e.target.value);
            }}
          />
        </form>
        <div className="buttonBox">
          <div
            className="Button"
            onClick={() => {
              SignUp();
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
