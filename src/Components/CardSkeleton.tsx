import {
  Paper,
  Skeleton,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PokemonCardSkeleton() {
  return (
    <Paper
      sx={{
        width: 250,
        height: 330,
        textAlign: "center",
        p: 2,
        m: 1,
        borderRadius: 3,
      }}
      elevation={4}
    >
      <IconButton
        disabled
        sx={{
          top: 1,
          left: 100,
          color: "grey",
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        sx={{ mb: 1, borderRadius: 1 }}
      />

      <CardContent>
        <Skeleton variant="text" width="60%" sx={{ mx: "auto", mb: 1 }} />
        <Grid
          display="flex"
          justifyContent="space-evenly"
          border="1px solid"
          sx={{ mb: 1 }}
        >
          <Typography>
            <Skeleton variant="text" width={70} />
          </Typography>
          <Typography>
            <Skeleton variant="text" width={70} />
          </Typography>
        </Grid>
        <Grid display="flex" justifyContent="space-evenly" border="1px solid">
          <Typography>
            <Skeleton variant="text" width={70} />
          </Typography>
          <Typography>
            <Skeleton variant="text" width={70} />
          </Typography>
        </Grid>
      </CardContent>
    </Paper>
  );
}

export default PokemonCardSkeleton;
