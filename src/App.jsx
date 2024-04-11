import Container from "@mui/material/Container";
import { Header } from "./components";

import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
