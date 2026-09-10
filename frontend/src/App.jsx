import React, { useEffect } from "react";
import AppRoutes from "./routes/Approutes";
import useAuthStore from "./store/authStore";


const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;