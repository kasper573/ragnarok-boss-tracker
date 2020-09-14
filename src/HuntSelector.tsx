import React from "react";
import { Autocomplete, AutocompleteProps } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

const options = ["lol", "omg", "foo", "bar"];

export type HuntSelectorProps = Omit<
  AutocompleteProps<string, boolean, boolean, boolean>,
  "renderInput" | "options"
>;

export const HuntSelector: React.FC<HuntSelectorProps> = (props) => (
  <Autocomplete
    freeSolo
    options={options}
    renderInput={(params) => (
      <TextField
        {...params}
        label="freeSolo"
        margin="normal"
        variant="outlined"
      />
    )}
    {...props}
  />
);
