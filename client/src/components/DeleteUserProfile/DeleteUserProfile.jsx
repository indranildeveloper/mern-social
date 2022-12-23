import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "../../features/user/userSlice";
import { logout, reset } from "../../features/auth/authSlice";

const DeleteUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user._id));
    dispatch(logout());
    dispatch(reset());
    navigate("/register");
  };

  return (
    <Box>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-user-profile-title"
        aria-describedby="delete-user-profile-description"
      >
        <DialogTitle id="delete-user-profile-title">
          Delete Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-profile-description">
            Are you sure? Your account will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUser} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteUserProfile;
