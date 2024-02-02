import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Register() {
  const { setUserInfos } = useUser();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [submittedUser, setSubmittedUser] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!newUser.name || !newUser.email || !newUser.password) {
      setErrorMessage("Veuillez remplir tous les champs");
    }

    if (!newUser.email.includes("@")) {
      setErrorMessage("Veuillez fournir une adresse e-mail valide");
    } else {
      try {
        await axios.post("http://localhost:3310/api/user", newUser);
        const res2 = await axios.post("http://localhost:3310/api/login", {
          // on INSERT dans la DB avec les infos saisies
          inputEmail: newUser.email,
          inputPassword: newUser.password,
        });
        setUserInfos(res2.data);
        setSubmittedUser([...submittedUser, newUser]);
        setNewUser({ name: "", email: "", password: "" });
        setErrorMessage(
          `Félicitations ${res2.data.name}, votre compte a bien été créé !`
        );
        localStorage.setItem("token", res2.data.token);
        navigate("/contact");
      } catch (err) {
        console.error(err);
        setErrorMessage("Cet utilisateur existe déjà.");
        setNewUser({ name: "", email: "", password: "" });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Inscription</h1>
        {errorMessage !== "" && (
          <div className="message">
            <p className="error">{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <div className="add-button">
            <button type="submit">S'inscrire</button>
          </div>
          <p>
            J'ai déjà un compte ?
            <em>
              {" "}
              <NavLink to="/"> Connexion</NavLink>
            </em>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
