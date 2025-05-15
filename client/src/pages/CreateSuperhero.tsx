import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  createSuperheroAction,
  updateSuperheroAction,
  fetchSuperheroById,
  clearCurrentSuperhero,
} from "../redux/slices/superheroSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

export const SuperheroCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { loading, error } = useSelector(
    (state: RootState) => state.superheroes
  );

  const [formData, setFormData] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFormData({
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: "",
      catch_phrase: "",
    });
    setFiles([]);
    dispatch(clearCurrentSuperhero());

    if (isEditMode && id) {
      dispatch(fetchSuperheroById(id))
        .unwrap()
        .then((hero) => {
          setFormData({
            nickname: hero.nickname || "",
            real_name: hero.real_name || "",
            origin_description: hero.origin_description || "",
            superpowers: hero.superpowers || "",
            catch_phrase: hero.catch_phrase || "",
          });
        });
    }
  }, [id, isEditMode, dispatch, location.pathname]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    files.forEach((file) => {
      form.append("images", file);
    });

    try {
      if (isEditMode && id) {
        await dispatch(updateSuperheroAction({ id, formData: form })).unwrap();
      } else {
        await dispatch(createSuperheroAction(form)).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to submit superhero", err);
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? "Edit Superhero" : "Add New Superhero"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            <TextField
              label="Real Name"
              name="real_name"
              value={formData.real_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Origin Description"
              name="origin_description"
              value={formData.origin_description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <TextField
              label="Superpowers"
              name="superpowers"
              value={formData.superpowers}
              onChange={handleChange}
              required
            />
            <TextField
              label="Catch Phrase"
              name="catch_phrase"
              value={formData.catch_phrase}
              onChange={handleChange}
              required
            />
            <Button variant="outlined" component="label">
              {isEditMode ? "Add new images" : "Add images"}
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {files.length > 0 && (
              <Typography variant="body2">
                {files.length} file(s) selected
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "Update Superhero" : "Create Superhero"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
