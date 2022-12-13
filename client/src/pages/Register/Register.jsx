import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Loading from "../../components/Loading/Loading";
import registerImg from "../../assets/img/register.svg";
import { register, reset } from "../../fearutes/auth/authSlice";
import { styles } from "./styles";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const { name, email, password, confirmPassword, error } = values;
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [isSuccess, user, navigate]);

  const handleInputChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      error: "",
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      console.log("Please fill up all the fields");
      setValues({
        ...values,
        error: "Please fill up all the fields!",
      });
    } else if (password !== confirmPassword) {
      setValues({
        ...values,
        error: "Passwords do not match!",
      });
    } else if (password.length < 8) {
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
      dispatch(register(userData));
    }
  };

  const handleClearError = () => {
    setValues({
      ...values,
      error: "",
    });
    dispatch(reset());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box mt={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        gap={4}
      >
        <Box sx={styles.imageContainer}>
          <Box
            component="img"
            sx={styles.image}
            src={registerImg}
            alt="Register Image"
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Typography variant="h4" sx={styles.heading}>
            Register
          </Typography>
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
            <TextField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              margin="dense"
              fullWidth
              value={confirmPassword}
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
              Submit
            </Button>
          </Box>
          <Typography variant="body1" sx={styles.subHeading}>
            Already have an Account?{" "}
            <Button component={RouterLink} to="/login">
              Login
            </Button>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Register;
