import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import SpacesDashboard from '../pages/SpacesDashboard';
import Invitations from './Invitations';
import UserCourses from './UserCourses';
import '../css/UserPersonalArea.css';




const UserAsideTabs = () => {

  const [value, setValue] = useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          // variant="scrollable"
          scrollButtons="auto"
          aria-label="user tabs"
          centered
          indicatorColor='rgb(174, 124, 61)'
          sx={{
            color:'rgb(174, 124, 61)',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            overflowX: 'auto',
            // color: 'rgb(174, 124, 61)',
            "& .MuiTabs-indicator": {
              backgroundColor: 'rgb(174, 124, 61)'
            },
            "& .Mui-selected": {
              color: 'rgb(174, 124, 61)', // צבע החום גם לטקסט של הטאב הנבחר
            },
          }}
        >
          <Tab label="My invitations" value="0" />
          <Tab label="My Spaces" value="1" />
          <Tab label="My Courses" value="2" />
        </Tabs>

        <TabPanel value="0">
          <Invitations />
        </TabPanel>

        <TabPanel value="1">
          <SpacesDashboard />
        </TabPanel>

        <TabPanel value="2">
          <UserCourses />
        </TabPanel>

      </Box>
    </TabContext>
  );
};

export default UserAsideTabs;
