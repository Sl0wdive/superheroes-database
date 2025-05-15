import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchSuperheroById, clearCurrentSuperhero, deleteSuperheroAction } from "../redux/slices/superheroSlice";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";

export const SuperheroDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentSuperhero, loading, error } = useSelector(
    (state: RootState) => state.superheroes
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSuperheroById(id));
    }
    return () => {
      dispatch(clearCurrentSuperhero());
    };
  }, [id, dispatch]);

  const handleDelete = () => {
    if (id) {
      dispatch(deleteSuperheroAction(id))
        .unwrap()
        .then(() => {
          navigate("/");
        });
    }
  };

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

  if (!currentSuperhero) return <Typography variant="h6">Superhero not found</Typography>;

  const images = Array.isArray(currentSuperhero.images)
    ? currentSuperhero.images
    : currentSuperhero.images
    ? [currentSuperhero.images]
    : [];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          {currentSuperhero.nickname}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to={`/edit/${id}`}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Superhero</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {currentSuperhero.nickname}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

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
              <Typography paragraph>{currentSuperhero.origin_description}</Typography>
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