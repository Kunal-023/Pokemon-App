import { useQueries, useQuery } from "@tanstack/react-query";
import Cards from "../Components/Cards";
import { Grid } from "@mui/material";
import Header from "../Components/Header";
import { usePokemonStore } from "../Store";
import PaginationControlled from "../Components/Pagination";
import PokemonCardSkeleton from "../Components/CardSkeleton";

function HomePage() {
  const currLink = usePokemonStore((state) => state.currLink);
  const limit = usePokemonStore((state) => state.limit);
  const searchTerm = usePokemonStore((state) => state.searchTerm);
  const pokemonType = usePokemonStore((state) => state.pokemonType);

  const getData = async (link: string) => {
    const res = await fetch(link);
    return res.json();
  };
  const { data, isLoading: isListLoading } = useQuery({
    queryKey: [currLink],
    queryFn: () => getData(currLink),
  });

  const queryResults = useQueries({
    queries: (data?.results ?? []).map(
      (result: { name: string; url: string }) => ({
        queryKey: [result.name],
        queryFn: () => getData(result.url),
      })
    ),
  });
  let isDetailsLoading = queryResults.some((query) => query.isLoading);

  const allPokemonDetails = queryResults
    .filter((query) => query.isSuccess && query.data)
    .map((query) => query.data);

  const pageCount = data?.count ? Math.ceil(data.count / limit) : 1;
  const shouldShowSkeletons = isListLoading || isDetailsLoading;

  return (
    <>
      <Header />
      <Grid container spacing={3} display="flex" justifyContent="center">
        {shouldShowSkeletons
          ? Array.from({ length: limit }).map((_, i) => <PokemonCardSkeleton key={i} />)
          : allPokemonDetails
              .filter((p: any) =>
                p?.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((p: any) =>
                p.types.some((p: any) =>
                  p.type.name.toLowerCase().includes(pokemonType.toLowerCase())
                )
              )
              .map((p: any) => <Cards key={p.name} details={p} />)}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "30px" }}
      >
        {!isListLoading && <PaginationControlled count={pageCount} />}
      </div>
    </>
  );
}

export default HomePage;
