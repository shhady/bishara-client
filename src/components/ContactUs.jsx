

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import "./contactUs.css"

export default function ContactUs({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }

    function handleEscapeKey(event) {
      if (event.keyCode === 27) {
        setShowForm(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  async function sendEmail(event) {
    event.preventDefault();

    try {
      // Create a POST request to the backend route
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL +'/send-email', { name, email, message });
      if (response.status === 200) {
        alert('Email sent successfully!');
        setName(user ? `${user.firstName} ${user.lastName}` : '');
        setEmail(user ? user.email : '');
        setMessage('');
        setShowForm(false); // Close the form after successful email sending
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the email. Please try again later.');
    }
  }

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <div>
      {showForm ? (
        <div className="overlay">
          <form onSubmit={sendEmail} ref={formRef} className="contact-form">
            <div className="form-header">
              <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
              <h3 className="form-title">تواصل معنا</h3>
            </div>
            <div className="form-group">
              <label htmlFor="name">الاسم</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">البريد الالكتروني</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">الرسالة</label>
              <textarea
                id="message"
                placeholder="Your Message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">ارسال</button>
              <button type="button" className="cancel-button" onClick={toggleForm}>الغاء</button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={toggleForm} className="contact-button">
          تواصل معنا
        </button>
      )}
    </div>
  );
}
