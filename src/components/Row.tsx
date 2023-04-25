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
import CollapsibleTable from "./CollapsibleTable";

export interface RowProps {
  row: IData;
}

const Row: React.FunctionComponent<RowProps> = ({ row }) => {
  //const { row } = props;
  const [openRelatives, setOpenRelatives] = React.useState(false);
  // const [openPhones, setOpenPhones] = React.useState(false);
  // const [expandedRelativeId, setExpandedRelativeId] = React.useState(null);
  // console.log(row.has_relatives);

  const [expandedRelativeId, setExpandedRelativeId] = React.useState<
    string | null
  >(null);

  const handleExpandRow = (relativeId: string) => {
    setExpandedRelativeId((prevState: string | null) =>
      prevState === relativeId ? null : relativeId
    );
  };

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
              {openRelatives ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
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
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ textTransform: "uppercase" }}
              >
                {Object.keys(row).slice(-1)[0]}
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
                    <React.Fragment key={index}>
                      <TableRow>
                        {historyRow?.has_phone?.length !== 0 ? (
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() =>
                                handleExpandRow(historyRow["Relative ID"])
                              }
                            >
                              {expandedRelativeId ===
                              historyRow["Relative ID"] ? (
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
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={
                              expandedRelativeId === historyRow["Relative ID"]
                            }
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                                sx={{ textTransform: "uppercase" }}
                              >
                                {Object.keys(historyRow).slice(-1)[0]}
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    {historyRow.has_phone[0] &&
                                      Object.keys(historyRow.has_phone[0]).map(
                                        (phone, index) => {
                                          return (
                                            <TableCell key={index}>
                                              {phone}
                                            </TableCell>
                                          );
                                        }
                                      )}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {historyRow?.has_phone?.map(
                                    (phone, index) => (
                                      <TableRow key={index}>
                                        <TableCell align="left">
                                          {phone["Phone ID"]}
                                        </TableCell>
                                        <TableCell align="left">
                                          {phone["ID of the relative"]}
                                        </TableCell>
                                        <TableCell align="left">
                                          {phone["Phone"]}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
