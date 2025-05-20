import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 250;

const navItems = [
  { label: 'ホーム', path: '/' },
  { label: '検索一覧', path: '/search' },
  { label: 'データ入力', path: '/input' },
  { label: '設定', path: '/settings' }
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#212121',
            color: '#fff'
          }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Portfolio App
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)`,
          transition: 'width 0.3s ease-in-out'
        }}
      >
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton edge="start" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <IconButton edge="end">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Search Area */}
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: 200, textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            検索フォーム領域
          </Typography>
        </Box>

        {/* Results Area */}
        <Box sx={{ bgcolor: '#f1f8e9', flexGrow: 1, minHeight: 400, textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            検索結果表示領域
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
