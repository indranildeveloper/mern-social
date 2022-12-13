import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { styles } from "./styles";

const Loading = () => {
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
