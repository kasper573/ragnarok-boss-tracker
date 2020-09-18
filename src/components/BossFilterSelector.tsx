import { Boss } from "../state/Boss";
import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from "@material-ui/core";
import { getTierColor } from "../functions/getTierColor";

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

export const bossFilterFns = {
  miniboss: (boss: Boss) => boss.tier === 0,
  tier1: (boss: Boss) => boss.tier === 1,
  tier2: (boss: Boss) => boss.tier === 2,
  tier3: (boss: Boss) => boss.tier === 3,
};

export const bossFilterLabelFns = {
  miniboss: () => <span style={{ color: getTierColor(0) }}>Miniboss</span>,
  tier1: () => <span style={{ color: getTierColor(1) }}>Tier 1</span>,
  tier2: () => <span style={{ color: getTierColor(2) }}>Tier 2</span>,
  tier3: () => <span style={{ color: getTierColor(3) }}>Tier 3</span>,
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
