import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NemesisRecord, PersonRecord, SecreteRecord } from "../../models/data";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../features/dataSlice";

type CollapsibleTableProps = {
  data: PersonRecord[];
};

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const handleExpandClick = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: string) => expanded.includes(id);

  const renderTable = (data: (PersonRecord | NemesisRecord | SecreteRecord)[]) => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {Object.keys(data[0].data).map((key) => {
              return <TableCell key={key}>{key}</TableCell>;
            })}
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        {data.map((record) => {
          const hasChildren = Object.keys(record.children).length > 0;
          return (
            <TableBody key={record.data.ID}>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  {hasChildren && (
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleExpandClick(record.data.ID)}
                    >
                      {isExpanded(record.data.ID) ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </IconButton>
                  )}
                </TableCell>
                {Object.values(record.data).map((value, index) => (
                  <TableCell key={index}>{value as React.ReactNode}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    aria-label="delete row"
                    size="small"
                    onClick={() => dispatch(deleteItem(record.data.ID))}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              {hasChildren &&
                Object.keys(record.children).map((key: string) => {
                  const childRecords = record.children[key].records;
                  if (childRecords.length === 0) {
                    return null;
                  }

                  return (
                    <TableRow key={key}>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={Object.keys(record.data).length}
                      >
                        <Collapse
                          in={isExpanded(record.data.ID)}
                          timeout="auto"
                          unmountOnExit
                        >
                          {renderTable(childRecords)}
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          );
        })}
      </Table>
    );
  };

  return <TableContainer component={Paper}>{renderTable(data)}</TableContainer>;
};

export default CollapsibleTable;
