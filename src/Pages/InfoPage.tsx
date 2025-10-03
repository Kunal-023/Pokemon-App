import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function InfoPage() {
  const { state }: any = useLocation();
  const pokemon = state?.pokemon;

  if (!pokemon) {
    return (
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4">No information available...</Typography>
        <Typography variant="h4">
          Click on the card to get the information
        </Typography>
      </Grid>
    );
  }

  const image = pokemon.sprites.other["showdown"].front_default;
  return (
    <Box display="flex" justifyContent="center" minHeight="60vh" p={2}>
      <Paper
        sx={{
          width: { xs: "95%", md: 900, backgroundColor: "#ADBBDA" },
          p: 4,
          borderRadius: 4,
          boxShadow: 6,
          textAlign: "center",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={pokemon.name}
          sx={{
            height: 250,
            width: 250,
            objectFit: "contain",
            mx: "auto",
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 3 }}
        >
          {pokemon.name}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="wrap"
          mb={3}
        >
          <Button variant="contained">HP: {pokemon.stats[0].base_stat}</Button>
          <Button variant="contained">
            Attack: {pokemon.stats[1].base_stat}
          </Button>
          <Button variant="contained">
            Defense: {pokemon.stats[2].base_stat}
          </Button>
          <Button variant="contained">
            Speed: {pokemon.stats[5].base_stat}
          </Button>
          <Button variant="contained">
            Base Exp: {pokemon.base_experience}
          </Button>
        </Box>
        <Box mb={2}>
          <Typography variant="h6" mb={1}>
            Moves:
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
            {pokemon.moves
              .slice(0, 10)
              .map((m: { move: { name: string } }, index: number) => (
                <Chip key={index} label={m.move.name} color="primary" />
              ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" mb={1}>
            Types:
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1}>
            {pokemon.types.map(
              (t: { type: { name: string } }, index: number) => (
                <Chip key={index} label={t.type.name} color="secondary" />
              )
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default InfoPage;
