import "./App.css";
import { AppProvider } from "./Contexts/AppContext";
import Page from "./Pages/Page";

function App() {
  return (
    <>
      <AppProvider>
        <Page />
      </AppProvider>
    </>
  );
}

export default App;
