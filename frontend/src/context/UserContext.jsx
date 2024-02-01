import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  // children permet d'importer le contenu des <> de app
  const [userInfos, setUserInfos] = useState({}); // le state est porté par le UserContext

  // le useMemo permet de sauvegarder la valeur afin d'éviter des re-render inutile. C'est le tableau de dépendance qui va controller le trigger de MAJ
  const contextValue = useMemo(
    () => ({ userInfos, setUserInfos }),
    [userInfos, setUserInfos]
  );

  const location = useLocation();

  async function getbytoken() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      );
      console.info(res.data);
      setUserInfos(res.data);
    }
  }

  useEffect(() => {
    getbytoken();
  }, [location.pathname]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  // optimisation de "custom hook"
  return useContext(UserContext);
}

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
