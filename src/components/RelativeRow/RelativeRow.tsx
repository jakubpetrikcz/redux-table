import React, { useState } from "react";
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
import PhoneRow from "../PhoneRow/PhoneRow";

interface RelativeRowProps {
  row: IRelative;
}

const RelativeRow: React.FC<RelativeRowProps> = ({ row }) => {
  const [expandedRelativeId, setExpandedRelativeId] = useState<string | null>(
    null
  );

  const handleExpandRow = (relativeId: string) => {
    setExpandedRelativeId((prevState: string | null) =>
      prevState === relativeId ? null : relativeId
    );
  };

  return (
    <>
      <TableRow>
        {row?.has_phone?.length !== 0 ? (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleExpandRow(row["Relative ID"])}
            >
              {expandedRelativeId === row["Relative ID"] ? (
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
          .map((value, index) => {
            return (
              <TableCell align="left" key={index}>
                {value}
              </TableCell>
            );
          })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={expandedRelativeId === row["Relative ID"]}
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
                      Object.keys(row.has_phone[0]).map((phone, index) => {
                        return <TableCell key={index}>{phone}</TableCell>;
                      })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.has_phone.map((phone, index) => (
                    <PhoneRow key={index} row={phone} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RelativeRow;
