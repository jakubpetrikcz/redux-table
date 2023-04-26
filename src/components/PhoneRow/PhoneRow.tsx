import React from "react";
import { IPhone } from "../../models/Data";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

interface PhoneRowProps {
  row: IPhone;
}

const PhoneRow: React.FC<PhoneRowProps> = ({ row }) => {
  return (
    <TableRow>
      {Object.values(row).map((value, index) => {
        return (
          <TableCell align="left" key={index}>
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default PhoneRow;
