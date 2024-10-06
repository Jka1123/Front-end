import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TodoList from './TodoList';


function MyTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Welcome"  />
          <Tab label="TodoList"  />
        </Tabs>
      </Box>

      {value == 0 &&
        <h1>Welcome to TodoList </h1>}

      {value == 1 &&
        <TodoList />}
    </>
  );
}

export default MyTabs;
