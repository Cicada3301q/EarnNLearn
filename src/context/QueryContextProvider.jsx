import React, { createContext, useState } from "react";

export const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
  const [queryKeys, setQueryKeys] = useState({});

  const invalidateQueryKey = (key) => {
    setQueryKeys((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  return (
    <QueryContext.Provider value={{ queryKeys, invalidateQueryKey }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
