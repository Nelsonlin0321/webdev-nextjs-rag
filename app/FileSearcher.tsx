"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface doc {
  label: string;
}

interface Props {
  docList: doc[];
}

const FileSearcher = ({ docList }: Props) => {
  return (
    <Autocomplete
      className="rounded-lg border dark:border-gray-600 dark:bg-gray-100 dark:text-gray-400 w-full"
      disablePortal
      id="combo-box-demo"
      options={docList}
      //   sx={{ width: 800 }}
      renderInput={(params) => (
        <TextField
          size="small"
          InputLabelProps={params.InputLabelProps}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
                Search PDF
              </InputAdornment>
            ),
          }}
          id={params.id}
          inputProps={params.inputProps}
          fullWidth={params.fullWidth}
        />
      )}
    />
  );
};

export default FileSearcher;
