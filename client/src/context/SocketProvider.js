import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    (async () => {
      const val = await io("ws://localhost:8900", {
        transports: ["websocket"],
        query: {
          userId: id,
        },
      });
      setSocket(val);

      val.on("connect", () => {
        console.log("Socket connected");
      });
    })();

    return () => socket && socket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={{ name: "hello", socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
