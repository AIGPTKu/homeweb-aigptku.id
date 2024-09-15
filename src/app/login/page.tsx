"use client";
import { useGlobalContext } from "@/context/global";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
  const { innerWidth } = useGlobalContext();
  return (
    <div className={styles.container}>
      <div
        style={{
          position: innerWidth > 768 ? "relative" : "absolute",
          zIndex: 10,
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px 20px",
          //   backgroundColor: "#170027",
        }}
      >
        <form className={styles.form}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img
              src="/aigptku.id-white1.png"
              style={{
                width: "40%",
              }}
              alt=""
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <button type="submit" className={styles.button}>
              Masuk
            </button>
            <button type="button" className={styles.button_register}>
              Daftar
            </button>
          </div>
        </form>
      </div>

      <Video />
    </div>
  );
};

// pages/video.js
import React, { useEffect } from "react";

const Video = () => {
  const { innerWidth } = useGlobalContext();
  return (
    <>
      {innerWidth <= 768 && (
        <div
          style={{
            boxShadow: "inset 20px 0 20px #10001b, inset -20px 0 20px #10001b",
            // backgroundColor: "red",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        ></div>
      )}
      <div
        style={
          innerWidth > 768
            ? {
                // backgroundColor: "red",
                position: "relative",
                zIndex: 0,
                flex: 1,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 20px",
              }
            : {
                position: "fixed",
                zIndex: 0,
                transform:
                  "perspective(300px) rotateY(15deg) scale(3) translateX(-25%)",
                opacity: 0.2,
                flex: 1,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 20px",
              }
        }
      >
        <video autoPlay muted loop>
          <source src="/login1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default LoginPage;
