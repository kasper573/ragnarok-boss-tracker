import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography } from "@material-ui/core";
import { Boss } from "./Boss";

export type BossSelectorProps = {
  bosses: Boss[];
  onSelect: (boss: Boss) => unknown;
};

/**
 * A controlled Autocomplete component that allows the user to search for and select a boss from a list.
 * Once a boss has been selected it is emitted to the onSelect callback and the input field is emptied.
 */
export const BossSelector: React.FC<BossSelectorProps> = ({
  bosses,
  onSelect,
}) => {
  const [value, setValue] = useState<Boss | null>(null);
  const [inputValue, setInputValue] = useState("");
  return (
    <Autocomplete<Boss, false, boolean, false>
      freeSolo={false}
      multiple={false}
      options={bosses}
      value={value}
      inputValue={inputValue}
      onChange={(e, newValue) => {
        if (newValue) {
          // Reset autocomplete input field whenever a boss gets selected
          setValue(null);
          setInputValue("");
          // Emit selected boss
          onSelect(newValue);
        }
      }}
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      renderOption={(boss) => <Typography noWrap>{boss.name}</Typography>}
      getOptionLabel={getBossName}
      renderInput={(params) => (
        <TextField
          {...params}
          label="freeSolo"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

const getBossName = (boss: Boss) => boss.name;
