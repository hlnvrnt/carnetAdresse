import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ModifyAccount from "../components/ModifyAccount";

function ContactDetails() {
  const { id } = useParams();
  //   const { userInfos } = useUser();
  const [oneContact, setOneContact] = useState({});
  const [showModifyAccount, setShowModifyAccount] = useState(false);

  const contact = async () => {
    try {
      const res = await axios.get(`http://localhost:3310/api/contact/${id}`);
      console.info(res.data);
      setOneContact(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    contact();
  }, []);

  const handleModifyAccount = () => {
    setShowModifyAccount(true);
  };

  return (
    <div className="details-page">
      <NavLink to="/contact">
        <img src="/images/previous.png" alt="retour" />
      </NavLink>
      <div className="details-container">
        <div className="info1-container">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${oneContact.image}`}
            alt="contact"
          />
          <div className="info1">
            <p className="p">{oneContact.name}</p>
            <p className="p">{oneContact.email}</p>
          </div>
        </div>
        <div className="entry" />
        <div className="info2">
          <p>🎂{oneContact.birthday}</p>
          <p> &#9742; {oneContact.phone_number}</p>
        </div>
        <div className="entry" />
        <p className="p">🏡 {oneContact.address}</p>

        <button type="button" onClick={handleModifyAccount}>
          Modifier le contact
        </button>
        {showModifyAccount && (
          <ModifyAccount
            showModifyAccount={showModifyAccount}
            setShowModifyAccount={setShowModifyAccount}
          />
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
