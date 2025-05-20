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
  { text: 'データ入力', icon: <InputIcon />, path: '/input' },
  { text: '設定', icon: <SettingsIcon />, path: '/settings' }
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />

      {/* サイドバー */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            overflowX: 'hidden',
            transition: 'width 0.3s ease-in-out',
            whiteSpace: 'nowrap',
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
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#eeeeee',
                    transition: 'background-color 0.2s'
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
<ListItemText
  primary={item.text}
  sx={{
    opacity: sidebarOpen ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    whiteSpace: 'nowrap',
  }}
/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 右側：AppBar + Main */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                mr: 2,
                color: 'inherit',
                '&:focus': { outline: 'none' },
                '&:focus-visible': { outline: 'none' }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Portfolio App
            </Typography>
            <AccountCircleIcon />
          </Toolbar>
        </AppBar>

        {/* コンテンツ */}
<Box
  component="main"
  sx={{
    flexGrow: 1,
    padding: 3,
    paddingTop: '80px',
    marginLeft: `${collapsedWidth}px`, // 初期値を最小幅に統一
    transition: 'margin-left 0.3s ease-in-out',
    ...(sidebarOpen && {
      marginLeft: `${drawerWidth}px`, // 開いてるときだけ上書き
    })
  }}
>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
