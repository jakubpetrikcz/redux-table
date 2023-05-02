import { FC } from "react";
import { IPhone } from "../../models/Data";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteRow } from "../../features/dataSlice";

interface PhoneRowProps {
  row: IPhone;
}

const PhoneRow: FC<PhoneRowProps> = ({ row }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <TableRow>
      {Object.values(row).map((value, index) => (
        <TableCell align="left" key={index}>
          {value}
        </TableCell>
      ))}
      <TableCell>
        <IconButton
          aria-label="delete row"
          size="small"
          onClick={() => dispatch(deleteRow({ "Phone ID": row["Phone ID"] }))}
        >
          <ClearIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PhoneRow;
