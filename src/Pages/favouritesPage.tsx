import { Grid, Typography } from "@mui/material";
import { usePokemonStore } from "../store";
import Cards from "../components/cards";

function Favourites() {
  const FavList = usePokemonStore((state) => state.favourites);
  const searchTerm = usePokemonStore((state) => state.searchTerm);
  const pokemonType = usePokemonStore((state) => state.pokemonType);

  return (
    <>
      {FavList.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) translateY(50%)",
          }}
        >
          No Favrouites Selected...
        </Typography>
      ) : (
        <>
          <Typography variant="h4" display={"flex"} justifyContent={"center"}>
            Favourites
          </Typography>
          <Grid
            container
            spacing={3}
            display={"flex"}
            justifyContent={"center"}
          >
            {FavList.filter((p: any) =>
              p?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((p) =>
              p.types.some((p: any) =>
                p.type.name.toLowerCase().includes(pokemonType)
              )
            )
            .map((p) => (
              <Cards key={p.name} details={p} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Favourites;
