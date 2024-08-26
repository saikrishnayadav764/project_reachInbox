import React, { useState } from "react";
import EmailEditor from "./EmailEditor";
import "../styles/homePage.css";

const EmailThread = ({ emailData }) => {
  const [isOpen, setIsopen] = useState(false);
  const containerStyle = {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    // width: '500px',
    fontFamily: "Arial, sans-serif",
  };

  //   messageId
  // references
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const dateStyle = {
    fontSize: "14px",
    color: "#b3b3b3",
  };

  const infoStyle = {
    marginBottom: "20px",
  };

  const infoTextStyle = {
    margin: "5px 0",
  };

  const infoLabelStyle = {
    color: "#b3b3b3",
  };

  const bodyStyle = {
    marginBottom: "10px",
    color: "rgb(186,185,186)",
  };

  const ccEmails =
    emailData?.cc?.length > 0 ? emailData?.cc?.join(", ") : "empty";

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", options); 

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")}${ampm}`;

    return `${formattedDate} : ${formattedTime}`;
  };

  const formattedDate = formatDate(emailData?.sentAt);
  

  return (
    <>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <h2>New Product Launch</h2>
            <button
              id="Account-btn"
              onClick={() => {
                setIsopen(true);
              }}
            >
              Reply
            </button>
          </div>
          <span style={dateStyle}>{formattedDate}</span>
        </div>
        <div style={infoStyle}>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={infoTextStyle}>
              <strong style={infoLabelStyle}>from :</strong>{" "}
              {emailData?.fromEmail}
            </p>
            <p style={infoTextStyle}>
              <strong style={infoLabelStyle}>cc :</strong> {ccEmails}
            </p>
          </div>
          <p style={infoTextStyle}>
            <strong style={infoLabelStyle}>to :</strong> {emailData?.toEmail}
          </p>
        </div>
        <div style={bodyStyle}>
          <p>Hi {emailData?.fromName?.split(" ")[0]},</p>
          <p style={{ marginTop: "20px" }}>
            I would like to introduce you to SaaSgrow, a productized design
            service specifically tailored for SaaS startups. Our aim is to help
            you enhance the user experience and boost the visual appeal of your
            software products.
          </p>
        </div>
      </div>
      <EmailEditor
        isOpen={isOpen}
        onClose={() => {
          setIsopen(false);
        }}
        inReplyTo={emailData.messageId}
        references={emailData.references}
        threadId = {emailData.threadId}
      />
    </>
  );
};

export default EmailThread;
