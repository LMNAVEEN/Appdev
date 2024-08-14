import React, { useState, useEffect } from 'react';

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = () => {
      const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
      setAdmins(storedAdmins);
    };

    fetchAdmins();
  }, []);

  return (
    <div>
      <h1>Admins List</h1>
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>{admin.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminsPage;
