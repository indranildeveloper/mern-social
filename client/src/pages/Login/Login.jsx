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
import loginImg from "../../assets/img/login.svg";
import { login, reset } from "../../features/auth/authSlice";
import { styles } from "./styles";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = values;
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

    if (!email || !password) {
      setValues({
        ...values,
        error: "Please fill up all the fields!",
      });
    } else {
      const userData = { email, password };
      dispatch(login(userData));
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
            src={loginImg}
            alt="Login Image"
          />
        </Box>
        <Box sx={styles.formContainer}>
          <Typography variant="h4" sx={styles.heading}>
            Log In
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
              Submit
            </Button>
          </Box>
          <Typography variant="body1" sx={styles.subHeading}>
            Do not have an Account?{" "}
            <Button component={RouterLink} to="/register">
              Register
            </Button>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
