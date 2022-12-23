import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Person from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getUsers } from "../../features/user/userSlice";
import { styles } from "./styles";

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());

    if (isError) {
      setOpen(true);
    }
  }, [dispatch, isError]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
      <Paper elevation={4} sx={styles.containerPaper}>
        <Typography variant="h4" sx={styles.title}>
          All Users
        </Typography>
        {isLoading ? (
          <Box sx={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemAvatar>
                      {user.photo ? (
                        <Avatar
                          sx={styles.avatar}
                          src={user.photo}
                          alt={user.name}
                        />
                      ) : (
                        <Avatar sx={styles.avatar}>
                          <Person />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                  <ListItemIcon>
                    <IconButton
                      component={RouterLink}
                      color="primary"
                      to={`/users/${user._id}`}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Users;
