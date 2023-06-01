import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const modeStyle = {
    day: {
      backgroundColor: "white",
    },
    night: {
      backgroundColor: "black",
    },
  };

  const [mode, setMode] = useState(true);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        modeStyle: modeStyle[mode ? "day" : "night"],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
