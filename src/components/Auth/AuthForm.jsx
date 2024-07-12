import { useState } from "react";
import style from "./AuthForm.module.css";

const AuthForm = ({ checkLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    checkLogin(login, password);
    setLogin("");
    setPassword("");
  };

  return (
    <div className={style.block}>
      <form className={style.form} onSubmit={handleLogin}>
        <h2>InPlay TV</h2>
        <div>
          <h3>Логин:</h3>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className={style.login}
            type="text"
          />
        </div>
        <div>
          <h3>Пароль:</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.password}
            type="password"
          />
        </div>
        <div>
          <button className={style.auth}>Войти</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
