import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PrettyChatWindow } from 'react-chat-engine-pretty';

export default function NewMessenger({ user }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/teachers`);
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const addCurrentUser = async () => {
      try {
        await axios.put(
          'https://api.chatengine.io/users',
          {
            username: user.email,
            secret: user._id,
            first_name: `${user.firstName} ${user.lastName}`,
          },
          { headers: { 'private-key': 'b87de751-f21a-4a78-abbc-586ed9cfe444' } }
        );
      } catch (error) {
        console.error('Error adding current user:', error);
      }
    };

    addCurrentUser();
  }, [user]);

  const allowedUsers = teachers.map((teacher) => teacher.firstName);

  return (
    <div style={{ marginTop: '80px', height: '90vh' }}>
      <PrettyChatWindow
        projectId="ff483a3e-585e-460f-808e-2f689c79e215"
        username={user.email}
        secret={user._id}
        allowedUsers={allowedUsers}
        style={{ height: '100vh' }}
      />
    </div>
  );
}
