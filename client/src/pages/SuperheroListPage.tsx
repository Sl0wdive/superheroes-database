import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchSuperheroes,
  nextPage,
  prevPage,
} from "../redux/slices/superheroSlice";
import { SuperheroCard } from "../components/SuperheroCard";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";

const CARD_WIDTH = 280;

export const SuperheroListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { superheroes, loading, error, page, totalPages } = useSelector(
    (state: RootState) => state.superheroes
  );

  useEffect(() => {
    dispatch(fetchSuperheroes(page));
  }, [dispatch, page]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          overflowX: "auto",
          gap: 3,
          py: 2,
          px: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {superheroes.map((hero) => (
          <Box
            key={hero.id}
            sx={{
              width: CARD_WIDTH,
              flex: "0 0 auto",
              overflow: "hidden",
            }}
          >
            <SuperheroCard hero={hero} />
          </Box>
        ))}
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button
          variant="outlined"
          onClick={() => dispatch(prevPage())}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => dispatch(nextPage())}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};
