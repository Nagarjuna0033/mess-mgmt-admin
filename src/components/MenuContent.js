import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Current Issues', icon: <ReportRoundedIcon />, path: '/current-issues' },
  { text: 'All Complaints', icon: <ListRoundedIcon />, path: '/all-complaints' },
];

const secondaryListItems = [
  { text: 'Mess Wise Analytics', icon: <PieChartRoundedIcon />, path: '/analytics/mess-wise' },
  { text: 'Complaints Analytics', icon: <BarChartRoundedIcon />, path: '/analytics/complaints' },
  { text: 'Feedback Analytics', icon: <FeedbackRoundedIcon />, path: '/analytics/feedback' },
];

const tertiaryListItems = [
  { text: 'Mess Menu', icon: <RestaurantMenuRoundedIcon />, path: '/menu' },
  { text: 'Edit Mess Incharges', icon: <EditRoundedIcon />, path: '/editIncharge' },
];

export default function MenuContent() {
  
  const [selectedPath, setSelectedPath] = React.useState('/');
  const navigate = useNavigate(); 
  
  const handleMenuItemClick = (path) => {
    setSelectedPath(path); 
    navigate(path); 
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedPath === item.path} 
              onClick={() => handleMenuItemClick(item.path)} 
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      
      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedPath === item.path} 
              onClick={() => handleMenuItemClick(item.path)} 
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {tertiaryListItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedPath === item.path} 
              onClick={() => handleMenuItemClick(item.path)} 
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
