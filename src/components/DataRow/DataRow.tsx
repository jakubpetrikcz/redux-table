import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import { IData } from "../../models/Data";
import RelativeRow from "../RelativeRow/RelativeRow";
import { FC, useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { deleteRow } from "../../features/dataSlice";

export interface DataRowProps {
  row: IData;
}

const DataRow: FC<DataRowProps> = ({ row }) => {
  const [openRelatives, setOpenRelatives] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {row?.has_relatives?.length > 0 ? (
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
        {Object.values(row)
          .slice(0, -1)
          .map((value, index) => (
            <TableCell align="left" key={index}>
              {value}
            </TableCell>
          ))}
        <TableCell>
          <IconButton
            aria-label="delete row"
            size="small"
            onClick={() =>
              dispatch(
                deleteRow({
                  "Identification number": row["Identification number"],
                })
              )
            }
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {row?.has_relatives?.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
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
                      <TableCell></TableCell>
                      {row?.has_relatives[0] &&
                        Object.keys(row?.has_relatives[0])
                          .filter((key) => key !== "has_phone")
                          .map((relatives, index) => (
                            <TableCell key={index}>{relatives}</TableCell>
                          ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.has_relatives.map((relative) => (
                      <RelativeRow
                        key={relative["Relative ID"]}
                        row={relative}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default DataRow;
