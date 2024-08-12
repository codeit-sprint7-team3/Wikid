import { dateConv } from "@/lib/common";
import useNotificationStore from "@/store/NotiStore";
import styles from "@/styles/Notification.module.css"; // CSS 모듈을 사용한다고 가정
import React, { ReactNode, useEffect, useRef, useState } from "react";

const NotificationPopover: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const { notis, totalCount, fetchNotifications, fetchNextPage, deleteNotification } = useNotificationStore();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      fetchNotifications();
    }
  }, [visible, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  const handleDelete = async (id: number) => {
    await deleteNotification(id);
  };

  const handleNextPage = async () => {
    await fetchNextPage();
  };

  return (
    <div className={styles.popoverContainer}>
      <button onClick={() => setVisible(!visible)} style={{ background: "none", border: "none", padding: 0 }}>
        {children}
      </button>
      {visible && (
        <div ref={popoverRef} className={styles.popoverContent}>
          {notis.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <div>
              {notis.map((noti) => (
                <div key={noti.id} className={styles.notificationCard}>
                  <div>
                    <p>{noti.content}</p>
                    <button onClick={() => handleDelete(noti.id)} className={styles.deleteButton}>
                      X
                    </button>
                  </div>
                  <span>{dateConv(noti.createdAt)}</span>
                </div>
              ))}
              {notis.length < totalCount && (
                <button onClick={handleNextPage} className={styles.nextPageButton}>
                  다음
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPopover;
