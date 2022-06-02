import React from "react";

import Dialog from '@mui/material/Dialog';

export function DialogMain(props) {
  const { onClose, open, children } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={false}
      maxWidth={''}
    >
      {children}
    </Dialog>
  );
}