import * as React from 'react';
import { Avatar, Box, SvgIcon, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { routes } from '~/consts/routes/routes.consts';
import AdjustName from './helper/AdjustName';
import {
  AppBar,
  Drawer,
  DrawerHeader,
  Kind,
  ProFree,
  UserField,
  UserName,
} from './styles';

const drawerWidth = 240;

type props = {
  children?: React.ReactNode;
  Title: string;
};

const MiniDrawer: React.FC<props> = ({ children, Title }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:500px)');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
      <AppBar id="AppBar" position="fixed" open={open}>
        <Toolbar sx={{ marginLeft: open ? -7 : 0 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <Image
              alt="menu"
              width="18"
              height="18"
              src={open ? '/svgs/arrows-left.svg' : '/svgs/menu.svg'}
            />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {Title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader id="DrawerHeader" />
        <UserField pl={2} display="flex">
          <Avatar src="/images/avatar.png" />
          <Box pl={2.5}>
            <UserName variant="body2" noWrap>
              {AdjustName('Débora Fernandes Rodrigues Soares')}
            </UserName>
            <Box display="flex">
              <Kind variant="caption">Mentor</Kind>
              <ProFree>PRO</ProFree>
            </Box>
          </Box>
        </UserField>
        <List>
          {Object.keys(routes).map((route, index) => (
            <ListItem
              key={routes[route].name}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 70,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    alt={routes[route].name}
                    width={routes[route].icon.width}
                    height={routes[route].icon.height}
                    src={routes[route].icon.path}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={routes[route].name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
