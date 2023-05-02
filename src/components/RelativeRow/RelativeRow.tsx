import { FC, useState } from "react";
import { IRelative } from "../../models/Data";
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
import PhoneRow from "../PhoneRow/PhoneRow";
import { deleteRow } from "../../features/dataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

interface RelativeRowProps {
  row: IRelative;
}

const RelativeRow: FC<RelativeRowProps> = ({ row }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleExpandRow = (id: string) => {
    setExpandedRow((prevState: string | null) =>
      prevState === id ? null : id
    );
  };

  return (
    <>
      <TableRow>
        {row?.has_phone?.length > 0 ? (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleExpandRow(row["Relative ID"])}
            >
              {expandedRow === row["Relative ID"] ? (
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
              dispatch(deleteRow({ "Relative ID": row["Relative ID"] }))
            }
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {row?.has_phone.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse
              in={expandedRow === row["Relative ID"]}
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
                  {Object.keys(row).slice(-1)[0]}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {row.has_phone[0] &&
                        Object.keys(row.has_phone[0]).map((phone, index) => (
                          <TableCell key={index}>{phone}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.has_phone.map((phone) => (
                      <PhoneRow key={phone["Phone ID"]} row={phone} />
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

export default RelativeRow;
