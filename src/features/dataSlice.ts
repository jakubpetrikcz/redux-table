import { createSlice } from "@reduxjs/toolkit";
import Data from "../Data.json";
import { IData, IRelative } from "../models/Data";

export interface IDataState {
  value: IData[];
}

const initialState: IDataState = {
  value: Data.map(({ data, kids }) => ({
    ...data,
    has_relatives:
      kids?.has_relatives?.records?.map(({ data, kids }) => ({
        ...data,
        has_phone:
          kids?.has_phone?.records?.map(({ data }) => ({
            ...data,
          })) ?? [],
      })) ?? [],
  })),
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {},
});

export default dataSlice.reducer;
