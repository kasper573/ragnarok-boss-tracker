import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Typography } from "@material-ui/core";
import { Boss } from "../state/Boss";
import { getTierColor } from "../functions/getTierColor";
import { BossFilterSelector } from "./BossFilterSelector";
import styled from "styled-components";
import { BossFilter, filterBosses } from "./bossFilters";

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
  const [filters, setFilters] = useState<BossFilter[]>([
    "tier1",
    "tier2",
    "tier3",
  ]);
  const visibleOptions = filterBosses(bosses, filters);
  return (
    <Autocomplete<Boss, false, boolean, false>
      ListboxComponent={({ children, ...props }) => (
        <div {...props}>
          <BossFilterDock>
            <BossFilterSelector value={filters} onChange={setFilters} />
          </BossFilterDock>
          {children}
        </div>
      )}
      value={null}
      freeSolo={false}
      multiple={false}
      options={visibleOptions}
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
        <Typography noWrap style={{ color: getTierColor(boss.tier) }}>
          {getBossLabel(boss)}
        </Typography>
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

const BossFilterDock = styled.div(({ theme }) => ({
  padding: "0 16px",
  [theme.breakpoints.up("sm")]: {
    position: "absolute",
    top: 8,
    right: 0,
  },
}));

const getBossLabel = (boss: Boss) => `${boss.name} (${boss.map.id})`;
