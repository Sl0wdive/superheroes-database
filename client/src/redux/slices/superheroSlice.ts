import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { getSuperheroes, getSuperheroById, createSuperhero, updateSuperhero, deleteSuperhero } from "../../api/superheroApi";
import type { Superhero } from "../../types/Superhero";

const PAGE_SIZE = 5;

export const fetchSuperheroes = createAsyncThunk(
  "superheroes/fetchSuperheroes",
  async (page: number) => {
    const res = await getSuperheroes(page);
    return res.data;
  }
);

export const fetchSuperheroById = createAsyncThunk(
  "superheroes/fetchSuperheroById",
  async (id: string) => {
    const res = await getSuperheroById(id);
    return res.data;
  }
);

export const createSuperheroAction = createAsyncThunk(
  "superheroes/createSuperhero",
  async (formData: FormData) => {
    const res = await createSuperhero(formData);
    return res.data;
  }
);

export const updateSuperheroAction = createAsyncThunk(
  "superheroes/updateSuperhero",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await updateSuperhero(id, formData);
    return res.data;
  }
);

export const deleteSuperheroAction = createAsyncThunk(
  "superheroes/deleteSuperhero",
  async (id: string, { getState }) => {
    await deleteSuperhero(id);
    const state = getState() as { superheroes: SuperheroState };
    return { 
      id,
      currentPage: state.superheroes.page,
      currentTotal: state.superheroes.superheroes.length
    };
  }
);

interface SuperheroState {
  superheroes: Superhero[];
  currentSuperhero: Superhero | null;
  loading: boolean;
  error: string;
  page: number;
  totalPages: number;
}

const initialState: SuperheroState = {
  superheroes: [],
  currentSuperhero: null,
  loading: false,
  error: "",
  page: 1,
  totalPages: 1,
};

const superheroSlice = createSlice({
  name: "superheroes",
  initialState,
  reducers: {
    nextPage(state) {
      if (state.page < state.totalPages) state.page += 1;
    },
    prevPage(state) {
      if (state.page > 1) state.page -= 1;
    },
    clearCurrentSuperhero(state) {
      state.currentSuperhero = null;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperheroes.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSuperheroes.fulfilled, (state, action) => {
        state.loading = false;
        state.superheroes = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / PAGE_SIZE);
      })
      .addCase(fetchSuperheroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load superheroes";
      })
      .addCase(fetchSuperheroById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSuperheroById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSuperhero = action.payload;
      })
      .addCase(fetchSuperheroById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load superhero";
      })
      .addCase(createSuperheroAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createSuperheroAction.fulfilled, (state) => {
        state.loading = false;
        state.page = 1;
      })
      .addCase(createSuperheroAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create superhero";
      })
      .addCase(updateSuperheroAction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateSuperheroAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSuperhero = action.payload;
      })
      .addCase(updateSuperheroAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update superhero";
      })
      .addCase(deleteSuperheroAction.fulfilled, (state, action) => {
        state.superheroes = state.superheroes.filter(hero => hero.id !== action.payload.id);
        const newTotal = action.payload.currentTotal - 1;
        const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
        if (state.page > newTotalPages) {
          state.page = newTotalPages > 0 ? newTotalPages : 1;
        }
        
        state.totalPages = newTotalPages;
      });
  },
});

export const { nextPage, prevPage, clearCurrentSuperhero } = superheroSlice.actions;
export default superheroSlice.reducer;