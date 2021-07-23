import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography } from "@material-ui/core";
import { Mob } from "../state/Mob";
import { getTierColor } from "../functions/getTierColor";
import { MobFilterSelector } from "./MobFilterSelector";
import styled from "styled-components";
import { MobFilter, filterMobs } from "./mobFilters";

export type MobSelectorProps = {
  mobs: Mob[];
  onSelect: (mob: Mob) => void;
};

/**
 * A controlled Autocomplete component that allows the user to search for and select a mob from a list.
 * Once a mob has been selected it is emitted to the onSelect callback and the input field is emptied.
 */
export const MobSelector: React.FC<MobSelectorProps> = ({ mobs, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState<MobFilter[]>([
    "tier1",
    "tier2",
    "tier3",
  ]);
  const visibleOptions = filterMobs(mobs, filters);
  return (
    <Autocomplete<Mob, false, boolean, false>
      ListboxComponent={React.forwardRef(({ children, ...props }, ref) => (
        <div {...props}>
          <MobFilterDock>
            <MobFilterSelector value={filters} onChange={setFilters} />
          </MobFilterDock>
          {children}
        </div>
      ))}
      value={null}
      freeSolo={false}
      multiple={false}
      options={visibleOptions}
      inputValue={inputValue}
      noOptionsText="No mobs available"
      onChange={(e, newValue) => {
        if (newValue) {
          // Emit selected mob
          onSelect(newValue);
        }
      }}
      onInputChange={(e, newInputValue, reason) => {
        // Ignore resets to not clear the input field when deselecting the control
        if (reason !== "reset") {
          setInputValue(newInputValue);
        }
      }}
      renderOption={(mob) => (
        <Typography noWrap style={{ color: getTierColor(mob.tier) }}>
          {getMobLabel(mob)}
        </Typography>
      )}
      getOptionLabel={getMobLabel}
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

const MobFilterDock = styled.div(({ theme }) => ({
  padding: "0 16px",
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    top: 8,
    right: 0,
  },
}));

const getMobLabel = (mob: Mob) => `${mob.name} (${mob.mapId})`;
