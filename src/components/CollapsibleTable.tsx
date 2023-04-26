import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DataRow from "./DataRow/DataRow";

const CollapsibleTable = () => {
  const data = useSelector((state: RootState) => state.data.value);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead
          sx={{
            backgroundColor: "#e0e1dd",
          }}
        >
          <TableRow>
            <TableCell />
            {Object.keys(data[0])
              .filter((key) => key !== "has_relatives")
              .map((row, index) => {
                return <TableCell key={index}>{row}</TableCell>;
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <DataRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
