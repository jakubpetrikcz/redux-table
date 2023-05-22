import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NemesisRecord, PersonRecord, SecreteRecord } from "../models/data";

interface State {
  data: PersonRecord[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("/src/data/example-data.json");
  return response.data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    deleteItem(state, action) {
      const itemId = action.payload;

      const deleteRecursive = (items: (PersonRecord | NemesisRecord | SecreteRecord)[]) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (item.data.ID === itemId) {
            items.splice(i, 1);
            return true;
          }

          for (const key in item.children) {
            const child = item.children[key];
            if (child.records) {
              const childItems = child.records;
              const deleted = deleteRecursive(childItems);
              if (deleted && childItems.length === 0) {
                delete item.children[key];
              }
            }
          }
        }

        return false;
      };

      deleteRecursive(state.data);

      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export const { deleteItem } = dataSlice.actions;
export default dataSlice.reducer;
