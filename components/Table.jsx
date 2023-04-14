import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, InputAdornment, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
const columns = [
  { field: "id", headerName: "", width: 0, hide: true },
  {
    field: "imageUrl",
    headerName: "",
    width: 0,
    renderCell: (params) => <img src={params.value} />,
  },
  { field: "name", headerName: "EXCHANGES", width: 200 },

  { field: "volume_1day_usd", headerName: "24H TRADE Volume", width: 200 },
];

export default function DataTable(props) {
  const [filterRows, setfilterRows] = React.useState(props.row);

  const searchHandler = (event) => {
    let searchKey = event.target.value.toLowerCase(),
      displayedfilterRows = props.row.filter((el) => {
        let searchValue = el?.name?.toLowerCase();
        return searchValue?.indexOf(searchKey) !== -1;
      });
    setfilterRows(displayedfilterRows);
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <BusinessIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Find an exchange"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={searchHandler}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div style={{ height: "80vh", width: "50%" }}>
        <DataGrid
          rows={filterRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}
