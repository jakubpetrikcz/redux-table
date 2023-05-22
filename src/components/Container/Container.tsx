import { useEffect } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../features/dataSlice";
import CollapsibleTable from "../CollapsibleTable/CollapsibleTable";

const ContainerTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === "loading" || data.length === 0) {
    return <div>Loading...</div>;
  }

  if (status === "failed" || !data) {
    return <div>Error loading data: {error}</div>;
  }

  return <CollapsibleTable data={data} />;
};

export default ContainerTable;
