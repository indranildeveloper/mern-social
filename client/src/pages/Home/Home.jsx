import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import homeImg from "../../assets/img/home.svg";
import { styles } from "./styles";

const Home = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">Welcome to MERN Social</Typography>
      <Divider variant="middle" sx={styles.divider} />
      <Box component="div" sx={styles.imgContainer}>
        <Box component="img" src={homeImg} />
      </Box>
    </Box>
  );
};
export default Home;
