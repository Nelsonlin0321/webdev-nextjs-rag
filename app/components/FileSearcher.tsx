"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface Props {
  fileNames: string[];
  setFileName: (fileName: string) => void;
}

const FileSearcher = ({ fileNames, setFileName }: Props) => {
  const [value, setValue] = useState<string | null>(fileNames[0]);
  const [inputValue, setInputValue] = useState<string | undefined>(
    fileNames[0]
  );

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event: any, newInputValue) => {
        setInputValue(newInputValue);
        setFileName(newInputValue);
      }}
      className="rounded-lg border dark:border-gray-600 dark:bg-gray-100 dark:text-gray-400 w-full"
      disablePortal
      id="combo-box-demo"
      options={fileNames}
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
