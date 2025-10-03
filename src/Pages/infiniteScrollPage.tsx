import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { usePokemonStore } from "../store";
import { Grid, Typography } from "@mui/material";
import PokemonCardSkeleton from "../components/cardSkeleton";
import Cards from "../components/cards";
import { useEffect } from "react";

function InfiniteScroll() {
  const currLink = usePokemonStore((state) => state.currLink);

  const { ref, inView } = useInView();
  const getData = async (link: string) => {
    const res = await fetch(link);
    return res.json();
  };
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: ({ pageParam }) => getData(pageParam),
      initialPageParam: currLink,
      getNextPageParam: (lastPage) => {
        return lastPage?.next ?? undefined;
      },
    });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const queryResults = useQueries({
    queries:
      data?.pages.flatMap((page) =>
        page.results.map((result: { name: string; url: string }) => ({
          queryKey: ["pokemon-name", result.name],
          queryFn: () => getData(result.url),
        }))
      ) ?? [],
  });

  const allPokemonDetails = queryResults
    .filter((query) => query.isSuccess && query.data)
    .map((query) => query.data);
  const isDetailsLoading = queryResults.some((query) => query.isLoading);

  if (status === "pending") {
    return (
      <Grid container spacing={3} display="flex" justifyContent="center">
        {Array.from({ length: 5 }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={3} display="flex" justifyContent="center">
        {allPokemonDetails.map((p: any) => (
          <Cards key={p.name} details={p} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
      </Grid>
      {!isDetailsLoading && !isFetchingNextPage && (
        <div ref={ref} style={{ height: "50px" }}>
          {!hasNextPage && <Typography>No more Pokémon to load.</Typography>}
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
