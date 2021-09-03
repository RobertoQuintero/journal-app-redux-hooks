import React from "react";

const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Morning%2C_just_after_sunrise%2C_Namibia.jpg/1200px-Morning%2C_just_after_sunrise%2C_Namibia.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuevo dia</p>
        <p className="journal__entry-content">
          Ad enim tempor duis consequat ad nostrud ex.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
