import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './allusers.css';

export default function Allusers() {
  const [users, setUsers] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('none');

  // Function to fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to apply the selected filter option
  const applyFilter = (option) => {
    setFilterOption(option);
  };

  // Function to apply the selected sort option
  const applySort = (option) => {
    setSortOption(option);
  };

  // Function to filter and sort users based on the selected options
  const filteredAndSortedUsers = users.filter((user) => {
    if (filterOption === 'all') {
      return true; // Show all users
    } else if (filterOption === 'canTry') {
      return user.status === 'canTry' && !user.subscriptionPlan;
    } else if (filterOption === 'triedOnce') {
      return user.status === 'triedOnce' && !user.subscriptionPlan;
    } else if (filterOption === 'subscriptionPlan') {
      return user.subscriptionPlan;
    }
    return false;
  }).sort((a, b) => {
    if (sortOption === 'ascending') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOption === 'descending') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0;
    }
  });

  // JSX for the table
  return (
    <div style={{ marginTop: '100px', marginBottom: '80px' }} dir='ltr'>
      <h2 style={{ textAlign: 'center' }}>جميع المستخدمين</h2>
      <div className="filter-container">
        <label htmlFor="filterOption" style={{marginRight:"15px"}}>Filter:</label>
        <select
          id="filterOption"
          value={filterOption}
          onChange={(e) => applyFilter(e.target.value)}
        >
          <option value="all">جميع المستخدمين</option>
          <option value="canTry">لم يجرب</option>
          <option value="triedOnce">جرب مره</option>
          <option value="subscriptionPlan">مشترك</option>
        </select>
            <br/>
        <label htmlFor="sortOption" style={{marginRight:"15px"}}>Sort:</label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => applySort(e.target.value)}
        >
          <option value="none">ترتيب</option>
          <option value="ascending">الاقدم</option>
          <option value="descending">الاحدث</option>
        </select>
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map((user) => (
              <tr
                key={user.email}
                style={{
                  background: user.subscriptionPlan ? '#fcedd5' : '',
                }}
              >
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  {user.email.split('@')[0]}
                  <br />
                  @{user.email.split('@')[1]}
                </td>
                <td>{user.subscriptionPlan ? 'Active' : user.status}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
