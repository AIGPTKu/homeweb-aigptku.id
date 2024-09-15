// components/Sidebar.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { defaultFirstMessage, useGlobalContext } from "@/context/global";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiSidebarFill } from "react-icons/pi";
import { RiEditFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { addToStore, deleteFromStore } from "./db";
import { FaBarsStaggered, FaFolder } from "react-icons/fa6";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Sidebar = ({
  width,
  active,
  setActive,
  action,
}: {
  width: number;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
}) => {
  const router = useRouter();

  const { innerWidth, rooms, setRooms, handleAddRoom } = useGlobalContext();
  const searchParams = useSearchParams();
  const [room, setRoom] = useState("");

  const handleDelRoom = (id: string) => {
    const roomId = searchParams.get("room") as string;
    if (roomId === id) {
      return;
    }
    setRooms(rooms.filter((r) => r.id !== id));
    deleteFromStore("rooms", id);
  };

  useEffect(() => {
    setRoom(searchParams.get("room") as string);
  }, [searchParams]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          position: "fixed",
          backgroundColor: "#10001b",
          zIndex: 10,
          width: active ? (innerWidth < 768 ? width : `${width}px`) : "0",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          borderRight: "1px solid #272727",
          transition: "width 300ms ease-in-out",
          overflow: "hidden", // To prevent content overflow during shrinking
        }}
      >
        <div // navbar
          style={{
            height: 60,
            borderBottom: "1px solid #272727",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <button
            onClick={() => {
              const e = document.getElementById("navbar") as HTMLElement;
              e.style.transition = "ease-in-out 300ms";
              document.body.style.overflow = "auto";
              setActive(false);
              setTimeout(() => {
                e.style.transition = "";
              }, 300);
            }}
            className="room"
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            {innerWidth >= 768 ? (
              <PiSidebarFill size={20} color="white" />
            ) : (
              <FaBarsStaggered size={20} color="white" />
            )}
          </button>
          <button
            onClick={() => handleAddRoom()}
            className="room"
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            <RiEditFill size={20} color="white" />
          </button>
        </div>
        <div // content
          style={{
            height: "calc(100vh - 60px - 50px)",
            overflowY: "auto",
            // backgroundColor: "white",
            padding: "10px 10px",
            color: "white",
          }}
        >
          {[{ id: "1", title: "New Folder" }].map((data, i) => (
            <Folder
              key={i}
              data={data}
              onDrop={() => {
                console.log("drop", i);
              }}
            />
          ))}
          {rooms.map((data, i) => (
            <Room
              handleDelete={handleDelRoom}
              action={action}
              key={i}
              active={data.id === room}
              data={data}
            />
          ))}
        </div>
        <div // footer
          style={{
            height: 50,
            borderTop: "1px solid #272727",
          }}
        ></div>
      </div>
    </DndProvider>
  );
};

const Folder = ({
  data,
  onDrop,
}: {
  data: {
    id: string;
    title: string;
  };
  onDrop: (item: any) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop as any}
      style={{
        opacity: 1,
        position: "relative",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        className="room"
        style={{
          border: isOver ? "2px dashed green" : "none",
          boxSizing: "border-box",
          padding: "7px 10px",
          borderRadius: 10,
          fontSize: 14,
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          height: 36,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <FaFolder size={15} color="white" />
        <span style={{ minWidth: 180 }}>
          {data.title.length > 20
            ? data.title.substring(0, 20) + "..."
            : data.title || "Chat Baru"}
        </span>
      </div>

      <button
        style={{
          position: "absolute",
          right: 10,
          top: 8,
        }}
        // onClick={() => handleDelete(data.id)}
      >
        <BsThreeDots className="btnthree" size={20} />
      </button>
    </div>
  );
};

const Room = ({
  active,
  data,
  action,
  handleDelete,
}: {
  active: boolean;
  action: () => void;
  handleDelete: (id: string) => void;
  data: {
    id: string;
    title: string;
  };
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: 1 },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      console.log("Dragging", data.title);
    } else {
      console.log("Not dragging");
    }
  }, [isDragging]);
  return (
    <div
      ref={drag as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: "relative",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link
        onClick={() => (active ? null : action())}
        href={"?room=" + data.id}
      >
        <div
          className="room"
          style={{
            boxSizing: "border-box",
            backgroundColor: active ? "#270042" : "",
            padding: "7px 10px",
            borderRadius: 10,
            fontSize: 14,
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            height: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <span style={{ minWidth: 180 }}>
            {data.title.length > 20
              ? data.title.substring(0, 20) + "..."
              : data.title || "Chat Baru"}
          </span>
        </div>
      </Link>
      <button
        style={{
          position: "absolute",
          right: 10,
          top: 8,
        }}
        onClick={() => handleDelete(data.id)}
      >
        <BsThreeDots className="btnthree" size={20} />
      </button>
    </div>
  );
};

export default Sidebar;