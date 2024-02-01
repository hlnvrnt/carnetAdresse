import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Login() {
  const { userInfos, setUserInfos } = useUser();

  const navigate = useNavigate();
  console.info(userInfos);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3310/api/login", {
        inputEmail,
        inputPassword,
      });
      console.info(res.data);
      setUserInfos(res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/contact");
    } catch (error) {
      console.error(error);
      setErrorMessage("Votre adresse email ou mot de passe est incorrect");
    }
  }

  return (
    <div className="login-page">
      {userInfos.id && <Navigate to="/contact" />}
      <div className="form-container">
        <h1>Se connecter</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Mot de passe"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <div className="add-button">
            <button type="submit">Connexion</button>
          </div>
          <p>
            Vous n'avez pas de compte ?
            <em>
              {" "}
              <NavLink to="/register"> S'inscrire</NavLink>
            </em>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
