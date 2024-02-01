import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function ModifyAccount({ modifyAccount, setShowModifyAccount }) {
  const { id } = useParams();
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    address: "",
    phone_number: "",
    birthday: "",
    image: "",
  });

  const handleModify = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`, {
        name: newContact.name,
        email: newContact.email,
        address: newContact.address,
        phone_number: newContact.phone_number,
      });
      setNewContact("");
    } catch (err) {
      console.error(err);
    } finally {
      setShowModifyAccount(false);
    }
  };
  return (
    <div className={`modify-modal ${modifyAccount ? "open" : ""}`}>
      <div className="modify-modal-content">
        <h2>Modifier le contact</h2>
        <form onSubmit={handleModify}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={newContact.address}
            onChange={(e) =>
              setNewContact({ ...newContact, address: e.target.value })
            }
          />
          <input
            type="text"
            name="phone number"
            placeholder="N° de téléphone"
            value={newContact.phone_number}
            onChange={(e) =>
              setNewContact({ ...newContact, phone_number: e.target.value })
            }
          />
          <input
            type="text"
            name="birthday"
            placeholder="Anniversaire"
            value={newContact.birthday}
            onChange={(e) =>
              setNewContact({ ...newContact, birthday: e.target.value })
            }
          />
          <button type="submit" className="terminer-button">
            Terminer
          </button>
        </form>
      </div>
    </div>
  );
}

ModifyAccount.propTypes = {
  modifyAccount: PropTypes.bool.isRequired,
  setShowModifyAccount: PropTypes.bool.isRequired,
};

export default ModifyAccount;
