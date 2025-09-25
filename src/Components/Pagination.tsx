import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { usePokemonStore } from "../Store";

type PaginationProps = {
  count: number;
};

function PaginationControlled({ count }: PaginationProps) {
  const setPage = usePokemonStore((state) => state.setPage);
  const limit = usePokemonStore((state) => state.limit);
  const setCurrLink = usePokemonStore((state) => state.setCurrLink);
  const page = usePokemonStore((state) => state.page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const offset = (value - 1) * limit;
    const newLink = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    setCurrLink(newLink);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default PaginationControlled;
