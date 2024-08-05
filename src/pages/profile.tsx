import React from "react";
import Profile from "@/components/Profile";
import style from "@/styles/profile.module.css";

const ProfilePage = () => {
  return (
    <div className={style.profilePage}>
      <Profile />
    </div>
  );
};

export default ProfilePage;
