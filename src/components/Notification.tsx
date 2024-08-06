import React, { useEffect } from "react";
import style from "@/styles/notification.module.css";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3초 후 자동으로 닫힘

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={style.notification}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
