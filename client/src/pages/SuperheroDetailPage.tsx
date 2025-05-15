import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import {
  fetchSuperheroById,
  clearCurrentSuperhero,
} from "../redux/slices/superheroSlice";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";

export const SuperheroDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentSuperhero, loading, error } = useSelector(
    (state: RootState) => state.superheroes
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSuperheroById(id));
    }
    return () => {
      dispatch(clearCurrentSuperhero());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!currentSuperhero)
    return <Typography variant="h6">Superhero not found</Typography>;

  const images = Array.isArray(currentSuperhero.images)
    ? currentSuperhero.images
    : currentSuperhero.images
    ? [currentSuperhero.images]
    : [];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h3" gutterBottom>
          {currentSuperhero.nickname}
        </Typography>
        <Button
          component={Link}
          to={`/edit/${id}`}
          variant="contained"
          color="primary"
        >
          Edit Page
        </Button>
      </Stack>

      {images.length > 0 ? (
        <ImageList cols={3} gap={16} sx={{ mb: 4 }}>
          {images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${image}`}
                alt={`${currentSuperhero.nickname} ${index + 1}`}
                loading="lazy"
                style={{ borderRadius: 8 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography>No images available</Typography>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {currentSuperhero.real_name && (
            <>
              <Typography variant="h6" gutterBottom>
                Real Name
              </Typography>
              <Typography paragraph>{currentSuperhero.real_name}</Typography>
            </>
          )}
          {currentSuperhero.superpowers && (
            <>
              <Typography variant="h6" gutterBottom>
                Superpowers
              </Typography>
              <Typography paragraph>{currentSuperhero.superpowers}</Typography>
            </>
          )}
          {currentSuperhero.origin_description && (
            <>
              <Typography variant="h6" gutterBottom>
                Origin Story
              </Typography>
              <Typography paragraph>
                {currentSuperhero.origin_description}
              </Typography>
            </>
          )}
          {currentSuperhero.catch_phrase && (
            <>
              <Typography variant="h6" gutterBottom>
                Catchphrase
              </Typography>
              <Typography paragraph sx={{ fontStyle: "italic" }}>
                "{currentSuperhero.catch_phrase}"
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
