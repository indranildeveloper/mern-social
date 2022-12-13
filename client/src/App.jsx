import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Navbar, Footer } from "./components";
import { Home, Register, Login, Users, Profile, EditProfile } from "./pages";
import { PrivateRoute } from "./PrivateRoute";
import { styles } from "./styles/styles";
import "./styles/styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg" sx={styles.global}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<PrivateRoute />}>
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/users/:userId" element={<PrivateRoute />}>
            <Route path="/users/:userId" element={<Profile />} />
          </Route>
          <Route path="/users/:userId/edit" element={<PrivateRoute />}>
            <Route path="/users/:userId/edit" element={<EditProfile />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
