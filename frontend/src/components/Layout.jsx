import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import InputIcon from '@mui/icons-material/Input';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;
const collapsedWidth = 64;

const menuItems = [
  { text: 'ホーム', icon: <HomeIcon />, path: '/' },
  { text: '検索一覧', icon: <SearchIcon />, path: '/search' },
  { text: '商品一覧', icon: <SearchIcon />, path: '/ProductList' },
  { text: 'データ入力', icon: <InputIcon />, path: '/input' },
  { text: '設定', icon: <SettingsIcon />, path: '/settings' }
];

const Layout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton onClick={() => setOpen(!open)} sx={{ mr: 2, color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Portfolio App
          </Typography>
          <AccountCircleIcon />
        </Toolbar>
      </AppBar>

      {/* 標準的な permanent Drawer */}
      <Drawer
        variant="permanent"
        open={open} // ← ★正式な API
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
<ListItemText
  primary={item.text}
  sx={{
    position: 'absolute',
    left: open ? 60 : 32,        // ← アイコンの近くまで寄る！（重なり効果）
    opacity: open ? 1 : 0,       // ← 透明にするだけ
    transition: 'opacity 0.25s ease, left 0.3s ease',
    whiteSpace: 'nowrap',
    pointerEvents: 'none'
  }}
/>

              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: '80px',
          ml: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
