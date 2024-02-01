import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import FormContact from "../components/FormContact";
import { useUser } from "../context/UserContext";

function Carnet() {
  const { userInfos, setUserInfos } = useUser();
  // const { id } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [allContacts, setAllContacts] = useState([]);

  const navigate = useNavigate();
  function handleClick() {
    setShowForm((current) => !current);
  }

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:3310/api/contact");
        setAllContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/${contactId}`
      );
      const updatedContacts = allContacts.filter(
        (contact) => contact.id !== contactId
      );
      setAllContacts(updatedContacts);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUserInfos({});
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="page">
      {userInfos.name ? (
        <div className="connexion">
          <div className="connecté">
            <img src="/images/user.png" alt="logo" />
            <h2>{userInfos.name}</h2>
          </div>
          <button type="button" onClick={logout}>
            Déconnexion
          </button>
        </div>
      ) : (
        <div className="home-message">
          <p>
            Vous n'êtes pas connecté, vos contacts ne seront pas sauvegardés.
          </p>
          <div className="link">
            <NavLink to="/">
              <p>Se connecter</p>
            </NavLink>
            <p>/</p>
            <NavLink to="/register">
              <p>S'inscrire</p>
            </NavLink>
          </div>
        </div>
      )}
      <h1>Mon Carnet d'adresse</h1>
      <div className="container">
        <div className="section">
          <h2>Mes contacts</h2>
          {allContacts.map((contact) => (
            <div className="entry" key={contact.id}>
              <NavLink to={`/contact/${contact.id}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${contact.image}`}
                  alt="Contact"
                  className="icon"
                />
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.address}</p>
                <p>{contact.phone_number}</p>
              </NavLink>
              <button type="button" onClick={() => handleDelete(contact.id)}>
                ❌
              </button>
            </div>
          ))}
        </div>
        <button className="button" type="button" onClick={handleClick}>
          Ajouter un contact
        </button>
        {showForm && (
          <FormContact showForm={showForm} setShowForm={setShowForm} />
        )}
      </div>
    </div>
  );
}

export default Carnet;
