import { useState } from "react";
import axios from "axios";

function FormContact(setShowForm) {
  const [file, setFile] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    birthday: "",
    image: "",
  });

  const [previewURL, setPreviewURL] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", newContact.name);
      formData.append("email", newContact.email);
      formData.append("phoneNumber", newContact.phone_number);
      formData.append("address", newContact.address);
      formData.append("birthday", newContact.birthday);
      formData.append("image", file);

      await axios.post("http://localhost:3310/api/contact", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowForm(true);
      console.info(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="formulaire-page">
      <div className="form-container">
        <h1>Ajouter un nouveau contact</h1>
        <form onSubmit={handleSubmit}>
          <div className="uploadFile">
            <input
              id="photoUpload"
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg, image/jpg, image/png"
            />
            <label htmlFor="photoUpload" className="uploadInput">
              <div className="uploadBox">
                {previewURL ? (
                  <img
                    className="uploadedPic"
                    src={previewURL}
                    alt="Pic preview"
                  />
                ) : (
                  <img
                    className="placeholderPic"
                    src="/images/icons8-camera-100.png"
                    alt="Choose a pic"
                  />
                )}
              </div>
            </label>
          </div>
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
            name="telephone"
            placeholder="N° de téléphone"
            value={newContact.phone_number}
            onChange={(e) =>
              setNewContact({ ...newContact, phone_number: e.target.value })
            }
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={newContact.address}
            onChange={(e) =>
              setNewContact({ ...newContact, address: e.target.value })
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
          <div className="add-button">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormContact;
