import { createSlice } from "@reduxjs/toolkit";
import Data from "../Data.json";
import { IData } from "../models/Data";

export interface IDataState {
  value: IData[];
}

const initialState: IDataState = {
  value: Data.map(({ data, kids }) => ({
    ...data,
    has_relatives:
      kids?.has_relatives?.records?.map(
        ({ data: relativeData, kids: relativeKids }) => ({
          ...relativeData,
          has_phone:
            relativeKids?.has_phone?.records?.map(({ data: phoneData }) => ({
              ...phoneData,
            })) ?? [],
        })
      ) ?? [],
  })),
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    deleteRow: (state, action) => {
      const parentId = action.payload["Identification number"];
      const relativeId = action.payload["Relative ID"];
      const phoneId = action.payload["Phone ID"];

      if (parentId) {
        state.value = state.value.filter(
          (item) => item["Identification number"] !== parentId
        );
      }

      if (relativeId) {
        state.value = state.value.map((item) => {
          if (item.has_relatives) {
            item.has_relatives = item.has_relatives.filter(
              (relative) => relative["Relative ID"] !== relativeId
            );
          }
          return item;
        });
      }

      if (phoneId) {
        state.value = state.value.map((item) => {
          if (item.has_relatives) {
            item.has_relatives.map((relative) => {
              relative.has_phone = relative.has_phone.filter(
                (phone) => phone["Phone ID"] !== phoneId
              );
            });
          }
          return item;
        });
      }
    },
  },
});

export const { deleteRow } = dataSlice.actions;
export default dataSlice.reducer;
