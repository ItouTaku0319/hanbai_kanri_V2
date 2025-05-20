// src/pages/Settings.jsx
import React from 'react';
import { Typography, Box, Paper, Divider, Switch, FormControlLabel } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        設定
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>ユーザー設定</Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="ダークモードを有効にする"
        />
        <FormControlLabel
          control={<Switch />}
          label="通知を受け取る"
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>アプリ設定</Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Switch />}
          label="自動保存を有効にする"
        />
      </Paper>
    </Box>
  );
};

export default Settings;
