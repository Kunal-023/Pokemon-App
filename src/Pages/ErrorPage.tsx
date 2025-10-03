import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Grid display="flex" justifyContent="center" alignItems= "center" flexDirection="column">
      <Typography variant="h2">404 Not Found</Typography>
      <Link to="/">
        <Typography variant="h4">Click to go back to home page</Typography>
      </Link>
    </Grid>
  );
}

export default ErrorPage;
