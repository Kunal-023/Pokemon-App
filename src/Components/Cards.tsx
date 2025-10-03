import {
  Paper,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { usePokemonStore } from "../store";
import { useNavigate } from "react-router-dom";
import PokemonCardSkeleton from "./cardSkeleton";

function Cards({ details }: any) {
  const favourites = usePokemonStore((state) => state.favourites);
  const removeFavourite = usePokemonStore((state) => state.removeFavourite);
  const addFavourite = usePokemonStore((state) => state.addFavourite);

  const fav = favourites.some((p: any) => p.name === details.name);

  const navigate = useNavigate();

  if (!details) return <PokemonCardSkeleton />;

  return details ? (
    <Paper
      onClick={() => {
        navigate(`/infopage`, {state: { pokemon: details } });
      }}
      sx={{
        backgroundColor:"#ADBBDA",
        width: 250,
        height: 330,
        textAlign: "center",
        p: 2,
        m: 1,
        borderRadius: 3,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 20,
          cursor: "pointer",
        },
      }}
      elevation={4}
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fav ? removeFavourite(details.name) : addFavourite(details);
        }}
        sx={{
          top: 1,
          left: 100,
          color: fav ? "red" : "white",
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <CardMedia
        component="img"
        image={details?.sprites?.other["showdown"].front_default}
        alt={details.name}
        sx={{ height: 150, objectFit: "contain", mb: 1 }}
      />
      <CardContent>
        <Typography
          variant="h5"
          sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 1 }}
        >
          {details.name}
        </Typography>
        <Grid
          display={"flex"}
          justifyContent={"space-evenly"}
          fontFamily={"sans-serif"}
          border={"1px solid"}
        >
          <Typography>HP : {details?.stats[0]?.base_stat}</Typography>
          <Typography>Attack : {details?.stats[1]?.base_stat}</Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"space-evenly"}
          fontFamily={"sans-serif"}
          border={"1px solid"}
        >
          <Typography>Defense : {details?.stats[2]?.base_stat}</Typography>
          <Typography>Speed : {details?.stats[5]?.base_stat}</Typography>
        </Grid>
      </CardContent>
    </Paper>
  ) : (
    <PokemonCardSkeleton />
  );
}

export default Cards;
