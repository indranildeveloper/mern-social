import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout, reset } from "../../fearutes/auth/authSlice";
import { styles } from "./styles";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Box sx={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.heading}>
            MERN Skeleton
          </Typography>
          <Button
            sx={styles.navLinks}
            component={RouterLink}
            color="inherit"
            to="/"
          >
            Home
          </Button>
          {user ? (
            <>
              <Button
                sx={styles.navLinks}
                component={RouterLink}
                color="inherit"
                to="/users"
              >
                Users
              </Button>
              <Button
                sx={styles.navLinks}
                component={RouterLink}
                color="inherit"
                to={`/users/${user._id}`}
              >
                My Profile
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={styles.navLinks}
                onClick={() => handleLogout()}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                component={RouterLink}
                sx={styles.navLinks}
                color="inherit"
                to="/register"
              >
                Register
              </Button>
              <Button
                component={RouterLink}
                sx={styles.navLinks}
                color="inherit"
                to="/login"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
