import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography } from "@material-ui/core";
import { Boss } from "../state/Boss";

export type BossSelectorProps = {
  bosses: Boss[];
  onSelect: (boss: Boss) => void;
};

/**
 * A controlled Autocomplete component that allows the user to search for and select a boss from a list.
 * Once a boss has been selected it is emitted to the onSelect callback and the input field is emptied.
 */
export const BossSelector: React.FC<BossSelectorProps> = ({
  bosses,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Autocomplete<Boss, false, boolean, false>
      freeSolo={false}
      multiple={false}
      options={bosses}
      inputValue={inputValue}
      noOptionsText="No bosses available"
      onChange={(e, newValue) => {
        if (newValue) {
          // Emit selected boss
          onSelect(newValue);
        }
      }}
      onInputChange={(e, newInputValue, reason) => {
        // Ignore resets to not clear the input field when deselecting the control
        if (reason !== "reset") {
          setInputValue(newInputValue);
        }
      }}
      renderOption={(boss) => (
        <Typography noWrap>{getBossLabel(boss)}</Typography>
      )}
      getOptionLabel={getBossLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select boss to hunt"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

const getBossLabel = (boss: Boss) => `${boss.name} (${boss.map.name})`;
