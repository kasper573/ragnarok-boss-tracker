import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Hunt } from "../state/Hunt";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";

export type HuntTimeEditorProps = Pick<DialogProps, "open" | "onClose"> & {
  value: Hunt;
  onChange: (value: Hunt) => void;
};

export const HuntTimeEditor: React.FC<HuntTimeEditorProps> = ({
  value,
  open,
  onChange,
  onClose,
}) => {
  const [time, setTime] = useState<Date>(value.killTime);
  const submit = () => onChange(value.update({ killTime: time }));
  const handleTimeChange = (newTime: MaterialUiPickersDate) =>
    setTime(newTime ? newTime.toDate() : new Date(0));
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set kill time</DialogTitle>
      <DateTimePicker
        variant="static"
        openTo="hours"
        value={time}
        onChange={handleTimeChange}
        ampm
      />
      <DialogActions>
        <Button onClick={() => setTime(new Date())}>Now</Button>
        <Button onClick={submit} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
