import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Person from "@mui/icons-material/Person";
import { Loading, DeleteUserProfile } from "../../components";
import { getUser } from "../../fearutes/user/userSlice";
import { styles } from "./styles";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUser(userId));
    if (isError) {
      setOpen(true);
    }
  }, [dispatch, isError, userId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={styles.errorAlert}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Box component="div">
      <Typography variant="h4">User Profile</Typography>
      {user !== null && (
        <Box sx={styles.container}>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            gap={4}
          >
            <Avatar>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Typography variant="body1">Joined: {user.createdAt}</Typography>
            </Box>
          </Stack>
          <Divider sx={styles.divider} />
          {userId === loggedInUser._id && (
            <Stack direction="row" gap={2}>
              <Button
                component={RouterLink}
                variant="contained"
                color="primary"
                to={`/users/${userId}/edit`}
              >
                Edit Profile
              </Button>
              <DeleteUserProfile />
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
