import "./App.css";
import { AppProvider } from "./Contexts/AppContext";
import Page from "./Pages/Page";

function App() {
  return (
    <div>
      <AppProvider>
          <Page />
      </AppProvider>
    </div>
  );
}

export default App;
