import { Link } from 'react-router-dom';
import './login.css';
export const Login = () => {
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 style={{ marginTop: '40px' }}>NESTJS</h1>
        <div className="inputBox">
          <input placeholder="ID" className="input inputID" />
          <input
            placeholder="PASSWORD"
            className="input inputPW"
            type="password"
          />
        </div>
        <div className="buttonBox">
          <div className="Button">Login</div>
          <Link
            to="/signup"
            className="Button"
            style={{ textDecoration: 'none' }}
          >
            Go to signUp
          </Link>
        </div>
      </div>
    </div>
  );
};