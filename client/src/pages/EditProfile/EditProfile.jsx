import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Loading } from "../../components";
import {
  updateUser,
  getUser,
  resetUpdate,
} from "../../fearutes/user/userSlice";
import { styles } from "./styles";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, isLoading, isUpdated, isError, message } = useSelector(
    (state) => state.user
  );

  const [values, setValues] = useState({
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
    error: "",
  });

  const { name, email, password, error } = values;

  useEffect(() => {
    dispatch(getUser(userId));
    if (isUpdated) {
      navigate(`/users/${userId}`);
      dispatch(resetUpdate());
    }
  }, [dispatch, isUpdated, userId, navigate]);

  const handleInputChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      error: "",
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setValues({
        ...values,
        error: "Password must be at least 8 characters!",
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(updateUser(userData));
    }
  };

  const handleClearError = () => {
    setValues({
      ...values,
      error: "",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        maxWidth: "60vw",
        mx: "auto",
      }}
    >
      <Typography variant="h4">Edit Your Profile</Typography>
      <Box sx={{ mt: 2 }}>
        {isError ? (
          <Alert
            sx={styles.alert}
            severity="error"
            onClose={() => handleClearError()}
          >
            {message}
          </Alert>
        ) : error !== "" ? (
          <Alert
            sx={styles.alert}
            severity="error"
            onClose={() => handleClearError()}
          >
            {error}
          </Alert>
        ) : null}
        <Box component="form" onSubmit={(e) => handleFormSubmit(e)}>
          <TextField
            id="name"
            type="text"
            name="name"
            label="Name"
            variant="outlined"
            margin="dense"
            fullWidth
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            margin="dense"
            fullWidth
            value={password}
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            sx={styles.button}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
