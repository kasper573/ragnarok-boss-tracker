import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";

export type KillTimeEditorProps = Pick<DialogProps, "open" | "onClose"> & {
  value?: number;
  onChange: (value: number) => void;
};

export const KillTimeEditor: React.FC<KillTimeEditorProps> = ({
  value: killTime,
  open,
  onChange,
  onClose,
}) => {
  const [time, setTime] = useState(killTime ?? Date.now());
  const submit = () => onChange(time);
  const handleTimeChange = (newTime: MaterialUiPickersDate) =>
    setTime(newTime ? newTime.toDate().getTime() : new Date(0).getTime());
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
        <Button onClick={() => setTime(Date.now())}>Now</Button>
        <Button onClick={submit} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
