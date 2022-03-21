import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
export const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const changeId = (value: string) => {
    setId(value);
  };
  const changePw = (value: string) => {
    setPw(value);
  };
  const signIn = async () => {
    const response = await axios.post('http://localhost:5000/auth/sign_in', {
      //post하는 경로도 본인의 백엔드에 알맞게 수정해주세요!
      userId: id, //userId와 userPassword는 제 백엔드 api에서 post 해주는 body값이라
      userPassword: pw, //본인의 body에 맞게 post하시면 됩니다!
    });
    alert(response.data);
  };
  const signInWith42 = async () => {
    window.location.href =
      'https://api.intra.42.fr/oauth/authorize?client_id=c178551e523b009994be1d911e271f6b2c978e36523ce74a1d56ac50ddf7aed1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Floading&response_type=code';
  };
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="nestjsBox">NESTJS</div>
        <div className="signUpBox">Sign In</div>
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
              signIn();
            }}
          >
            Login
          </div>
          <Link
            to="/signup"
            className="Button"
            style={{ textDecoration: 'none' }}
          >
            Go to signUp
          </Link>
        </div>
        <div className="ftBtn" onClick={() => signInWith42()}>
          Sign in with "42Seoul"
        </div>
      </div>
    </div>
  );
};
