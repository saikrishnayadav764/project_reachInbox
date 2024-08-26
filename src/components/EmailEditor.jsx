import React, { useEffect, useState } from "react";
import ErrorBanner from "./BannerError";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end", // Aligns the modal to the bottom
  },
  modal: {
    width: "40%",
    marginBottom: "20px", // Gap from the bottom of the screen
    padding: "20px",
    // backgroundColor: '#2e2e2e',
    background: "#1c1c1c",

    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  closeButton: {
    fontSize: "24px",
    cursor: "pointer",
    color: "#fff",
  },
  form: {
    width: "100%",
  },
  fieldGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#9f9f9f",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #444",
    background: "#1c1c1c",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  bodyGroup: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "120px",
    borderRadius: "4px",
    border: "1px solid #444",
    background: "#1c1c1c",
    color: "#fff",
    fontSize: "14px",
    resize: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

const spinnerStyle = {
    border: '2px solid white',
    borderRadius: '50%',
    borderTop: '4px solid #000',
    width: '15px',
    height: '15px',
    animation: 'spin 1s linear infinite'
  };
  
  const buttonStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };
  
  // Keyframes for spinner animation
  const inlinestyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;


const EmailEditor = ({ isOpen, onClose, inReplyTo, references, threadId }) => {
  const [toName, setToName] = useState("");
  const [to, setTo] = useState("");
  const [fromName, setFromName] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  async function replyEmail(thread_id, emailData) {
    console.log("thread_id", thread_id);
  
    const url = `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${thread_id}`;
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
        mode: 'cors'
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to send email: ${errorData || response.statusText}`
        );
      }
  
      return await response.json();
    } catch (error) {
      setError(error.message);
      alert(`Failed to send email: ${error.message}`);
      console.error("Error:", error.message);
      throw error;
    }
  }
  
  const handleSubmit =async (e) => {
    setLoading(true)
    e.preventDefault();
    let referencesArray = [];

    if (references.includes(",")) {
      referencesArray = references.split(",").map((ref) => ref.trim());
    } else {
      referencesArray.push(references.trim());
    }

    if (!toName || !to || !fromName || !from || !subject || !body) {
        alert('All fields (To Name, To, From Name, From, Subject, and Body) must be filled out.');
        setLoading(false);
        return; 
    }

    const emailData = {
      toName,
      to,
      fromName,
      from,
      subject,
      body,
      references:referencesArray, // Split by comma and trim spaces
      inReplyTo,
    };
    try {
        const result = await replyEmail(threadId, emailData);
        console.log('Email sent successfully:', result);
        onClose(); // Close the modal after sending
    } catch (error) {
        console.error('Failed to send email:', error.message);
        alert(`Failed to send email: ${error.message}`);
    }finally{
        setLoading(false)
        onClose()
    }
    ; // Close modal after sending
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay}>
        <style>{inlinestyles}</style>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span style={styles.closeButton} onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>To Name:</label>
            <input
              style={styles.input}
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              type="text"
              required
              placeholder="Mitrajit"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>To:</label>
            <input
              style={styles.input}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="email"
              required
              placeholder="chandra.rupam@gmail.com"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>From Name:</label>
            <input
              style={styles.input}
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              type="text"
              required
              placeholder="Mitrajit"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>From:</label>
            <input
              style={styles.input}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              type="email"
              required
              placeholder="mitrajit2022@gmail.com"
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Subject:</label>
            <input
              style={styles.input}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Optimize Your Recruitment Efforts with Expert Support"
            />
          </div>
          <div style={styles.bodyGroup}>
            <textarea
              style={styles.textarea}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Hello, how are you?"
            />
          </div>
          {/* <div style={styles.fieldGroup}>
                        <label style={styles.label}>References:</label>
                        <input
                            style={styles.input}
                            value={references}
                            onChange={(e) => setReferences(e.target.value)}
                            placeholder="Comma-separated list of references"
                        />
                    </div> */}
          {/* <div style={styles.fieldGroup}>
                        <label style={styles.label}>In Reply To:</label>
                        <input
                            style={styles.input}
                            value={inReplyTo}
                            onChange={(e) => setInReplyTo(e.target.value)}
                            placeholder="In-reply-to message ID"
                        />
                    </div> */}
          <button
            type="button"
            style={buttonStyles}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <div style={spinnerStyle}></div> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailEditor;
