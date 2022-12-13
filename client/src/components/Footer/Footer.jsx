import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { styles } from "./styles";

const Footer = () => {
  return (
    <Box sx={styles.footerContainer}>
      <Box component="footer" sx={styles.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" color="primary">
            MERN Skeleton
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link
              color="primary"
              underline="hover"
              href="https://github.com/indranildeveloper"
              target="_blank"
            >
              Indranil Halder
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
