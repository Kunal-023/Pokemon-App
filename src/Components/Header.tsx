import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { usePokemonStore } from "../Store";

function Header() {
  const searchTerm = usePokemonStore((state) => state.searchTerm);
  const setSearchTerm = usePokemonStore((state) => state.setSearchTerm);
  const pokemonType = usePokemonStore((state) => state.pokemonType);
  const setPokemonType = usePokemonStore((state) => state.setPokemonType);

  return (
    <AppBar position="sticky" color="primary" elevation={4} sx={{ mb: 2 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: 90,
          px: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/favourites"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Favourites
          </Button>
        </Box>
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Pokémon Catalogue
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              minWidth: 180,
            }}
          />
          <Select
            sx={{
              m: 1,
              height: 40,
              minWidth: 120,
              backgroundColor: "white",
              borderRadius: 1,
            }}
            value={pokemonType}
            onChange={(e) => {
              setPokemonType(e.target.value);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"normal"}>Normal</MenuItem>
            <MenuItem value={"fire"}>Fire</MenuItem>
            <MenuItem value={"water"}>Water</MenuItem>
            <MenuItem value={"electric"}>Electric</MenuItem>
            <MenuItem value={"grass"}>Grass</MenuItem>
            <MenuItem value={"ice"}>Ice</MenuItem>
            <MenuItem value={"fighting"}>Fighting</MenuItem>
            <MenuItem value={"poison"}>Poison</MenuItem>
            <MenuItem value={"ground"}>Ground</MenuItem>
            <MenuItem value={"flying"}>Flying</MenuItem>
            <MenuItem value={"psychic"}>Psychic</MenuItem>
            <MenuItem value={"bug"}>Bug</MenuItem>
            <MenuItem value={"rock"}>Rock</MenuItem>
            <MenuItem value={"ghost"}>Ghost</MenuItem>
            <MenuItem value={"dragon"}>Dragon</MenuItem>
            <MenuItem value={"dark"}>Dark</MenuItem>
            <MenuItem value={"steel"}>Steel</MenuItem>
            <MenuItem value={"fairy"}>Fairy</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
