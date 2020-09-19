import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from "@material-ui/core";
import { BossFilter, bossFilterLabelFns, bossFilters } from "./bossFilters";

export type BossFilterSelectorProps = Omit<FormGroupProps, "onChange"> & {
  value: BossFilter[];
  onChange: (filters: BossFilter[]) => void;
};

export const BossFilterSelector: React.FC<BossFilterSelectorProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <FormGroup row {...props}>
      {bossFilters.map((filter) => {
        const checked = value.includes(filter);
        const toggle = checked
          ? () => onChange(value.filter((other) => other !== filter)) // Remove
          : () => onChange(value.concat(filter)); // Add
        return (
          <FormControlLabel
            key={filter}
            label={bossFilterLabelFns[filter]()}
            control={
              <Checkbox
                color="default"
                checked={checked}
                onChange={toggle}
                name={filter}
              />
            }
          />
        );
      })}
    </FormGroup>
  );
};
