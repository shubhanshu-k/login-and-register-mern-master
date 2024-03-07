import React from "react";
import { MdDelete, MdSettings } from "react-icons/md";
import "./homepage.css";

const Homepage = ({ setLoginUser }) => {
  // Sample data for the table
  const data = [
    { name: "John Doe", dateCreated: "2022-03-15", role: "Admin", status: "Active" },
    { name: "Jane Smith", dateCreated: "2022-02-20", role: "Publisher", status: "Suspended" },
    { name: "Alice Johnson", dateCreated: "2022-01-10", role: "Reviewer", status: "Inactive" },
    { name: "Bob Williams", dateCreated: "2022-04-05", role: "Moderator", status: "Active" }
  ];

  return (
    <div className="homepage">
      <h1>Users </h1>
      <div className="container">
        <ul className="transaction-header">
          <li>Name</li>
          <li>Date Created</li>
          <li>Role</li>
          <li>Status</li>
          <li>Action</li>
        </ul>
        {data.map((row, index) => (
          <ul className="transaction-item" key={index}>
            <li>{row.name}</li>
            <li>{row.dateCreated}</li>
            <li>{row.role}</li>
            <li>{row.status}</li>
            <li>
              <button className="action-button">
                <MdDelete className="delete-icon" />
              </button>
              <button className="action-button">
                <MdSettings className="settings-icon" />
              </button>
            </li>
          </ul>
        ))}
      </div>
      <div className="button" onClick={() => setLoginUser({})}>Logout</div>
    </div>
  );
};

export default Homepage;
