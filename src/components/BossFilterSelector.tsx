import { Boss } from "../state/Boss";
import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from "@material-ui/core";

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
            label={filter}
            control={
              <Checkbox checked={checked} onChange={toggle} name={filter} />
            }
          />
        );
      })}
    </FormGroup>
  );
};

export const bossFilterFns = {
  Miniboss: (boss: Boss) => boss.tier === 0,
  "Tier 1": (boss: Boss) => boss.tier === 1,
  "Tier 2": (boss: Boss) => boss.tier === 2,
  "Tier 3": (boss: Boss) => boss.tier === 3,
};

export type BossFilter = keyof typeof bossFilterFns;

export const bossFilters: BossFilter[] = Object.keys(bossFilterFns) as any;

export const filterBosses = (bosses: Boss[], filters: BossFilter[]) => {
  if (!filters.length) {
    return bosses;
  }
  return bosses.filter((boss) =>
    filters.find((filter) => bossFilterFns[filter](boss))
  );
};
