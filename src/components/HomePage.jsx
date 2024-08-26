import React, { useEffect, useState } from "react";
import "../styles/homePage.css";
import MailContent from "./MailContent";

function HomePage() {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [activeUrl, setActiveUrl] = useState("/homePage");
  const [emails, setEmails] = useState(null);

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

  const extractTokenFromUrl = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, document.title, window.location.pathname);
      const data = await getEmails();
      if (data) {
        setActiveUrl("/mail");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setActiveUrl("/mail");
    } else {
      extractTokenFromUrl();
    }

    const fetchUserProfile = async (token) => {
      try {
        const response = await fetch(
          "https://hiring.reachinbox.xyz/api/v1/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("profileImage", data);
          setProfileImageUrl(data.picture); 
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };


    extractTokenFromUrl();
  }, []);

  const handleGoogleLogin = () => {
    const redirectUrl = "http://localhost:3000";
    const googleLoginUrl = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${encodeURIComponent(
      redirectUrl
    )}`;

    window.location.href = googleLoginUrl;
  };

  if (activeUrl === "/mail") {
    return <MailContent emails={emails} setEmails={setEmails} />;
  }

  if (activeUrl === "/homePage") {
    return (
      <div className="mainContainer">
        <div style={{ height: "10vh", padding: "10px" }} className="header">
          <img width="130px" src="/images/logo.svg" alt="Logo" />
        </div>
        <div className="bodyContent">
          <div className="loginBox">
            <p style={{ fontSize: "20px" }}>Create a new account</p>
            <div
              className="googleLoginContainer"
              onClick={handleGoogleLogin}
              style={{ cursor: "pointer" }}
            >
              <img id="googleSvg" src="/images/google.svg" alt="Google logo" />
              <p style={{ color: "#C1C2C5", marginBottom: "4.2px" }}>
                Signup with Google
              </p>
            </div>
            <button id="Account-btn" onClick={handleGoogleLogin}>
              Create an Account
            </button>
            <p style={{ color: "#C1C2C5", cursor: "pointer" }}>
              <span id="account_span_text" onClick={handleGoogleLogin}>
                Already have an account?
              </span>{" "}
              Sign In
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
