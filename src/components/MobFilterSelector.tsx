import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from "@material-ui/core";
import { MobFilter, mobFilterLabelFns, mobFilters } from "./mobFilters";

export type MobFilterSelectorProps = Omit<FormGroupProps, "onChange"> & {
  value: MobFilter[];
  onChange: (filters: MobFilter[]) => void;
};

export const MobFilterSelector: React.FC<MobFilterSelectorProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <FormGroup row {...props}>
      {mobFilters.map((filter) => {
        const checked = value.includes(filter);
        const toggle = checked
          ? () => onChange(value.filter((other) => other !== filter)) // Remove
          : () => onChange(value.concat(filter)); // Add
        return (
          <FormControlLabel
            key={filter}
            label={mobFilterLabelFns[filter]()}
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
