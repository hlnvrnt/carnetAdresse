import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const ContactContext = createContext();

export function ContactProvider({ children }) {
  // children permet d'importer le contenu des <> de app
  const [contactInfos, setContactInfos] = useState({}); // le state est porté par le UserContext

  // le useMemo permet de sauvegarder la valeur afin d'éviter des re-render inutile. C'est le tableau de dépendance qui va controller le trigger de MAJ
  const contextValue = useMemo(
    () => ({ contactInfos, setContactInfos }),
    [contactInfos, setContactInfos]
  );

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  // optimisation de "custom hook"
  return useContext(ContactContext);
}

export default ContactContext;

ContactProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
