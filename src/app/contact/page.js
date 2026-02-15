"use client"; // Etkileşim için bu şart!

import { useState } from "react"; //react'ten useState hook'unu import ettim.

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Burada gerçek bir API çağrısı yapabilirsiniz. Şimdilik sadece gönderildi durumunu göstermek için setSent(true) kullanıyoruz.
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1
          style={{ fontSize: "2rem", marginBottom: "10px", color: "#b8860b" }}
        >
          İletişim
        </h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Sorularınız için aşağıdaki formu doldurabilirsiniz.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Adınız Soyadınız"
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="E-posta Adresiniz"
            required
            style={inputStyle}
          />
          <input type="text" placeholder="Konu" style={inputStyle} />
          <textarea
            placeholder="Mesajınız"
            rows="5"
            required
            style={{ ...inputStyle, resize: "none" }}
          ></textarea>

          <button type="submit" style={buttonStyle}>
            {sent ? "Gönderildi!" : "Gönder"}
          </button>

          {sent && (
            <p
              style={{
                color: "#b8860b",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Mesajınız başarıyla gönderildi! Teşekkürler.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// Görseldeki havayı yakalamak için stiller
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5", // Hafif gri arka plan
  fontFamily: "sans-serif",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "450px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#b8860b", // Koçlar Mobilya'ya uygun altın/kahve tonu
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "background 0.3s",
};
