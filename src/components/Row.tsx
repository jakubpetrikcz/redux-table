import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IData } from "../models/Data";

export interface RowProps {
  row: IData;
}

const Row: React.FunctionComponent<RowProps> = ({ row }) => {
  //const { row } = props;
  const [openRelatives, setOpenRelatives] = React.useState(false);
  const [openPhones, setOpenPhones] = React.useState(false);
  // console.log(row.has_relatives);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {row?.has_relatives?.length !== 0 ? (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenRelatives(!openRelatives)}
            >
              {openRelatives ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
        <TableCell align="left">{row["Identification number"]}</TableCell>
        <TableCell align="left">{row["Name"]}</TableCell>
        <TableCell align="left">{row["Gender"]}</TableCell>
        <TableCell align="left">{row["Risk"]}</TableCell>
        <TableCell align="left">{row["Hair length"]}</TableCell>
        <TableCell align="left">{row["IQ"]}</TableCell>
        <TableCell align="left">{row["Admission date"]}</TableCell>
        <TableCell align="left">{row["Last breakdown"]}</TableCell>
        <TableCell align="left">{row["Yearly fee"]}</TableCell>
        <TableCell align="left">{row["Knows the Joker?"]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRelatives} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {row.has_relatives[0] &&
                      Object.keys(row.has_relatives[0])
                        .filter((key) => key !== "has_phone")
                        .map((relatives, index) => {
                          return <TableCell key={index}>{relatives}</TableCell>;
                        })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.has_relatives?.map((historyRow, index) => (
                    <TableRow key={index}>
                      {historyRow?.has_phone?.length !== 0 ? (
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpenPhones(!openPhones)}
                          >
                            {openPhones ? (
                              <KeyboardArrowDownIcon />
                            ) : (
                              <KeyboardArrowRightIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell></TableCell>
                      )}
                      <TableCell align="left">
                        {historyRow["Relative ID"]}
                      </TableCell>
                      <TableCell align="left">
                        {historyRow["Patient ID"]}
                      </TableCell>
                      <TableCell align="left">
                        {historyRow["Is alive?"]}
                      </TableCell>
                      <TableCell align="left">
                        {historyRow["Frequency of visits"]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
