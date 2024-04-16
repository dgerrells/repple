import React from 'react';
import {
  AppBar as AppBarHeader,
  IconButton,
  Typography,
  Box
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

export const BackButton = styled(IconButton)({
  marginLeft: -8,
  marginRight: 16
});

export const AppBar = styled(AppBarHeader)({
  position: 'sticky',
  top: 0
});

export const HeaderText = styled(Typography)({
  flexGrow: '1'
});

export const TextStatHighlight = ({ children, p = 1, size = 'h5' }) => {
  return (
    <Box p={p} component="span">
      <Typography variant={size} color="primary" component="span">
        {children}
      </Typography>
    </Box>
  );
};

export const Page = styled(Box)({
  maxWidth: '768px',
  marginLeft: 'auto',
  marginRight: 'auto'
});
