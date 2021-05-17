import React from 'react';
import useAuth from './useAuth';

function Dashboard({ code }) {
  const accessToken = useAuth(code);
  return (
    <div>{code}</div>
  )
};

export default Dashboard;