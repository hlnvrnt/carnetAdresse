import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <UserProvider>
      <ContactProvider>
        <div className="App">
          <Outlet />
        </div>
      </ContactProvider>
    </UserProvider>
  );
}

export default App;
