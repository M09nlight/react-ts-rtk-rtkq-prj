import React, { FC, useEffect } from "react";
import Header from "./common/components/header/Header";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { routes } from "./core/routes";
import { useAuth } from "./modules/auth/hooks/use-auth";
import PrivateRoute from "./modules/auth/components/PrivateRoute";
interface AppProps {}

const App: FC<AppProps> = () => {
  const isGlobalFeedPage = useMatch(routes.globalFeed.path);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (isGlobalFeedPage && auth.isLoggedIn) {
      navigate(routes.personalFeed.path);
    }
  }, []);
  return (
    <div className="pb-16">
      <Header />
      <Routes>
        {Object.values(routes).map((route, idx) => {
          if (route.private) {
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.Element />
                  </PrivateRoute>
                }
              />
            );
          }
          return (
            <Route key={idx} path={route.path} element={<route.Element />} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
