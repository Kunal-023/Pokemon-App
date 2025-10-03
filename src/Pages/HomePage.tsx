import { useQueries, useQuery } from "@tanstack/react-query";
import Cards from "../components/cards";
import { Grid, Typography } from "@mui/material";
import { usePokemonStore } from "../store";
import PaginationControlled from "../components/pagination";
import PokemonCardSkeleton from "../components/cardSkeleton";

function HomePage() {
  const currLink = usePokemonStore((state) => state.currLink);
  const limit = usePokemonStore((state) => state.limit);
  const searchTerm = usePokemonStore((state) => state.searchTerm);
  const pokemonType = usePokemonStore((state) => state.pokemonType);

  const getData = async (link: string) => {
    const res = await fetch(link);
    return res.json();
  };
  const {
    data,
    isLoading: isListLoading,
  } = useQuery({
    queryKey: [currLink],
    queryFn: () => getData(currLink),
  });

  const queryResults = useQueries({
    queries: (data?.results ?? []).map(
      (result: { name: string; url: string }) => ({
        queryKey: [result.url],
        queryFn: () => getData(result.url),
      })
    ),
  });

  const allPokemonDetails = queryResults
    .filter((query) => query.isSuccess && query.data)
    .map((query) => query.data);

  const isDetailsLoading = queryResults.some((query) => query.isLoading);
  const numberOfPages = data?.count ? Math.ceil(data.count / limit) : 1;
  const shouldShowSkeletons = isListLoading || isDetailsLoading;
  let filteredDetails = allPokemonDetails
    .filter((p: any) =>
      p?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p: any) =>
      p.types.some((p: any) =>
        p.type.name.toLowerCase().includes(pokemonType.toLowerCase())
      )
    );

  return (
    <>
      <Grid container spacing={3} display="flex" justifyContent="center">
        {shouldShowSkeletons ? (
          Array.from({ length: 5 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))
        ) : filteredDetails.length === 0 ? (
          <Typography variant="h4">No details found...</Typography>
        ) : (
          filteredDetails.map((p: any) => <Cards key={p.name} details={p} />)
        )}
      </Grid>
      <PaginationControlled count={numberOfPages} />
    </>
  );
}

export default HomePage;
