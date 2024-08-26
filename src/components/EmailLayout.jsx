import React, { useState } from "react";
import "../styles/homePage.css";
import ToggleSwitch from "./ToggleSwitch";

function EmailLayout({ setEmails, loadingState, children }) {
  const [loading, setLoading] = useState(false);

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
    console.log("fromemail", data);
    setEmails(data);
    return data;
  };

  const resetEmail = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("No authentication token found.");
      }

      const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/reset`;

      const response = await fetch(apiUrl, {
        method: "GET", 
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        // Include the thread_id in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      return "Email thread reset successfully.";
    } catch (error) {
      console.error("Failed to reset email thread:", error);
      throw error;
    } finally {
    }
  };

  const handeleReset = async () => {
    setLoading(true);
    await resetEmail();
    await getEmails();
    setLoading(false);
  };

  return (
    <div className="mailPageContent">
      <div className="sideBar">
        <div>
          <img id="topImg" src="/images/M.svg" />
          <div className="sideBar_1">
            <img src="/images/home.svg" />
            <img src="/images/account.svg" />
            <img src="/images/mail.svg" />
            <img src="/images/telegram.svg" />
            <img src="/images/bars.svg" />
            <img src="/images/openmail.svg" />
            <img src="/images/graph.svg" />
          </div>
        </div>
        <div
          id="profile"
          style={{
            background: "green",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "50%",
            textAlign: "center",
            lineHeight: "20px",
            fontSize: "0.9rem",
          }}
        >
          C
        </div>
      </div>
      <div className="mailPageBody">
        <div className="mailPageBodyHeader">
          <p>OneBox</p>
          {loadingState && (
  <p style={{
    fontWeight: "bold",
    marginLeft: "212px",
    color: "#00FFFF" 
  }}>
    Loading...
  </p>
)}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button
              id="Account-btn"
              onClick={handeleReset}
              // disabled={loading}
              style={{
                position: "relative",
                padding: "8px 16px",
                fontSize: "14px",
                cursor: loading ? "not-allowed" : "pointer",
                backgroundColor:
                  loading ? "#f0f0f0" : "#007bff",
                color: loading ? "#a0a0a0" : "#fff",
                border: "none",
                borderRadius: "4px",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(loading) && (
                <span
                  style={{
                    position: "absolute",
                    border: "2px solid #fff",
                    borderRadius: "50%",
                    borderTop: "2px solid transparent",
                    width: "16px",
                    height: "16px",
                    animation: "spin 1s linear infinite",
                  }}
                />
              )}
              <span
                style={{
                  visibility: loading ? "hidden" : "visible",
                }}
              >
                Reset
              </span>
            </button>
            <ToggleSwitch
              width={40}
              height={21}
              knobSize={15}
              onColor="#4caf50"
              offColor="#ccc"
              knobColor="#fff"
            />
            <p style={{ marginBottom: "4px" }}>Tims Workspace</p>
          </div>
        </div>
        <div className="mailPageBodyContent">{children}</div>
      </div>
    </div>
  );
}

export default EmailLayout;
