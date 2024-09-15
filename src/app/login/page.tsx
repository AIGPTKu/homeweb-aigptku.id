"use client";
// pages/video.js
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/context/global";
import styles from "./Login.module.css";

const LoginPage: React.FC = () => {
  const { innerWidth, contextLoading } = useGlobalContext();
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {}, [contextLoading]);
  return (
    !contextLoading && (
      <div className={styles.container}>
        <div
          style={{
            // backgroundColor: "red",
            position: innerWidth > 768 ? "relative" : "absolute",
            top: 0,
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
        <Video videoRef={videoRef} />
        {showPopup && (
          <FirstTimePage
            action={() => {
              localStorage.setItem("firstTime", "N");
              setShowPopup(false);
              if (videoRef?.current) {
                videoRef.current?.play();
              } else {
                setTimeout(() => {
                  videoRef.current?.play();
                }, 1000);
              }
            }}
          />
        )}
      </div>
    )
  );
};

const Video = ({
  videoRef,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}) => {
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
            position: "fixed",
            top: 0,
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
                top: 0,
                zIndex: 0,
                transform: "scale(2)",
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
        <video ref={videoRef} muted loop playsInline>
          <source src="/login1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

const FirstTimePage = ({ action }: { action: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 11,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        backgroundColor: "#10001b",
        color: "white",
      }}
    >
      <img
        src="/aigptku.id-white1.png"
        style={{
          width: "40%",
        }}
        alt=""
      />
      <button
        type="button"
        onClick={action}
        style={{
          // backgroundColor: "#056700",
          border: "2px solid white",
          color: "white",
          padding: "0.8rem",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Masuk / Daftar
      </button>
    </div>
  );
};

export default LoginPage;
