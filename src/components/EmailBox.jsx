import React, { useState } from "react";
import Modal from "./Modal";

function EmailBox({
  ind,
  fromEmail,
  sentAt,
  subject,
  isRead,
  folder,
  setCurrThread,
  currThread,
  threadId,
  setEmails,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  async function fetchEmails() {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  const getEmails = async () => {
    const data = await fetchEmails();
    console.log("fromemail");
    setEmails(data);
    return data;
  };

  const handlePrimaryAction = async () => {
    console.log("Primary action clicked");
    setLoading(true);
    try {
        await deleteEmailThread(threadId);
        await getEmails();
        closeModal();
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSecondaryAction = () => {
    console.log("Secondary action clicked");
    closeModal();
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const deleteEmailThread = async (thread_id) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("No authentication token found.");
      }

      const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      return "Email thread deleted successfully.";
    } catch (error) {
      console.error("Failed to delete email thread:", error);
      throw error;
    }
  };


  

  const handleKeyDown = (e) => {
    if (e.key == "d" || e.key == "D" || e.key=="Delete") {
      openModal();
    }
  };
  return (
    <>
      <div
        key={ind}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: currThread == ind ? "#1c1c1c" : "",
          borderTop: "1px solid #33383F",
        }}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onClick={() => {
          console.log("hello");
          setCurrThread(ind);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            paddingTop: "10px",
          }}
        >
          <h4>{fromEmail}</h4>
          <p style={{ color: "#FCFCFC66" }}>{formatDate(sentAt)}</p>
        </div>
        <p style={{ color: "#E1E0E0" }}>{subject}</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <p
            style={{
              background: "#222426",
              padding: "6px",
              borderRadius: "10px",
            }}
          >
            {isRead ? "read" : "unread"}
          </p>
          <p
            style={{
              background: "#222426",
              padding: "6px",
              borderRadius: "10px",
            }}
          >
            {folder}
          </p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirmation"
        content={
          <p style={{ color: "black", marginTop: "10px" }}>
            Are you sure you want to delete this email?
          </p>
        }
        primaryAction={{ label: "Delete", onClick: handlePrimaryAction }}
        secondaryAction={{ label: "Cancel", onClick: closeModal }}
        primaryColor="#d72d2a"
        secondaryColor="#fffff"
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default EmailBox;
