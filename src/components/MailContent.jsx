import React, { useEffect, useState } from "react";
import EmailLayout from "./EmailLayout";
import EmailBox from "./EmailBox";
import EmailThread from "./EmailThread";

function MailContent({ emails, setEmails }) {
  const [currThread, setCurrThread] = useState(0);
  const [loading, setLoading] = useState(false)
  async function fetchEmails() {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true)
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
    }finally{
      setLoading(false)
    }
  }

  const getEmails = async () => {
    const data = await fetchEmails();
    console.log("fromemail");
    setEmails(data);
    return data;
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <EmailLayout loadingState={loading} emails={emails} setEmails={setEmails}>
      {!emails || emails.length == 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img src="/images/bigMail.svg" />
          <h3 style={{ marginBottom: "20px", marginTop: "30px" }}>
            It’s the beginning of a legendary sales pipeline{" "}
          </h3>
          <p style={{ color: "#9E9E9E" }}>When you have inbound E-mails</p>
          <p style={{ color: "#9E9E9E" }}>you’ll see them here</p>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
            padding: "10px",
          }}
        >
          <div style={{ height: "100%", borderRight: "1px solid #33383F" }}>
            <h3>All Mails</h3>
            <input
              placeholder="Search"
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                width: "96.5%",
                padding: "6px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "3px",
              }}
              type="search"
            />
            {emails?.map((emailData, ind) => (
              <EmailBox
                key={ind}
                ind={ind}
                currThread={currThread}
                setCurrThread={setCurrThread}
                {...emailData}
                getEmails={getEmails}
                setEmails={setEmails}
              />
            ))}
          </div>
          <div style={{ padding: "10px" }}>
            <EmailThread emailData={emails?.[currThread]} />
          </div>
        </div>
      )}
    </EmailLayout>
  );
}

export default MailContent;
