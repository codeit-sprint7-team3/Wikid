import React, { useState, useEffect } from "react";
import style from "@/styles/profile.module.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [profile, setProfile] = useState({
    overview: "코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어...",
    hobby: "식물을 키우는 것을 좋아한다...",
    additional: "걸어다니는 사전이라고 불릴 정도로 다양한 분야의 지식을 두루...",
    preference: "카페투어를 좋아한다...",
    city: "서울",
    mbti: "INFJ",
    job: "코드잇 콘텐츠 프로듀서",
    sns: "diwlwhd_official",
    birthday: "1999-12-31",
    nickname: "없음",
    bloodType: "A",
    nationality: "대한민국"
  });
  const [backupProfile, setBackupProfile] = useState({ ...profile });

  useEffect(() => {
    let timer;
    if (isEditing) {
      timer = setTimeout(() => {
        setIsEditing(false);
        setIsTimeout(true);
      }, 10 * 1000); // 10초 타이머
    }
    return () => clearTimeout(timer);
  }, [isEditing]);

  const handleJoinClick = () => {
    setBackupProfile({ ...profile });
    setIsEditing(true);
    setIsTimeout(false);
  };

  const handleSaveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsEditing(false);
      setIsLoading(false);
      alert("변경 사항이 저장되었습니다.");
    }, 2000); // 2초 후에 저장 완료
  };

  const handleCancelClick = () => {
    setProfile(backupProfile);
    setIsEditing(false);
  };

  const handleTimeoutConfirm = () => {
    setIsTimeout(false);
    setIsEditing(false);
    setProfile(backupProfile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className={style.container}>
      {isLoading && <div className={style.spinnerContainer}><div className={style.spinner}></div></div>}
      {!isLoading && (
        <>
          <div className={style.header}>
            <h1 className={style.title}>이지동</h1>
            <button onClick={() => navigator.clipboard.writeText("https://www.wikied.kr/wikicode")} className={style.link}>
              https://www.wikied.kr/wikicode
            </button>
            {!isEditing && (
              <button onClick={handleJoinClick} className={style.joinButton}>위키 참여하기</button>
            )}
          </div>
          <div className={style.main}>
            <div className={style.content}>
              <h2 className={style.sectionTitle}>01. 개요</h2>
              {isEditing ? (
                <textarea
                  className={style.textarea}
                  name="overview"
                  value={profile.overview}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p>{profile.overview}</p>
              )}
              <h2 className={style.sectionTitle}>02. 취미</h2>
              {isEditing ? (
                <textarea
                  className={style.textarea}
                  name="hobby"
                  value={profile.hobby}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p>{profile.hobby}</p>
              )}
              <h2 className={style.sectionTitle}>03. 여담</h2>
              {isEditing ? (
                <textarea
                  className={style.textarea}
                  name="additional"
                  value={profile.additional}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p>{profile.additional}</p>
              )}
              <h2 className={style.sectionTitle}>04. 취향</h2>
              {isEditing ? (
                <textarea
                  className={style.textarea}
                  name="preference"
                  value={profile.preference}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p>{profile.preference}</p>
              )}
            </div>
            <div className={style.sidebar}>
              <img src="/profile-image.png" alt="프로필 사진" className={style.profileImage} />
              <ul className={style.profileDetails}>
                <li><strong>거주 도시:</strong> {isEditing ? <input className={style.input} name="city" value={profile.city} onChange={handleChange} /> : profile.city}</li>
                <li><strong>MBTI:</strong> {isEditing ? <input className={style.input} name="mbti" value={profile.mbti} onChange={handleChange} /> : profile.mbti}</li>
                <li><strong>직업:</strong> {isEditing ? <input className={style.input} name="job" value={profile.job} onChange={handleChange} /> : profile.job}</li>
                <li><strong>SNS 계정:</strong> {isEditing ? <input className={style.input} name="sns" value={profile.sns} onChange={handleChange} /> : profile.sns}</li>
                <li><strong>생일:</strong> {isEditing ? <input className={style.input} name="birthday" value={profile.birthday} onChange={handleChange} /> : profile.birthday}</li>
                <li><strong>별명:</strong> {isEditing ? <input className={style.input} name="nickname" value={profile.nickname} onChange={handleChange} /> : profile.nickname}</li>
                <li><strong>혈액형:</strong> {isEditing ? <input className={style.input} name="bloodType" value={profile.bloodType} onChange={handleChange} /> : profile.bloodType}</li>
                <li><strong>국적:</strong> {isEditing ? <input className={style.input} name="nationality" value={profile.nationality} onChange={handleChange} /> : profile.nationality}</li>
              </ul>
            </div>
          </div>
          {isEditing && (
            <div className={style.editButtons}>
              <button onClick={handleSaveClick} className={style.saveButton}>저장</button>
              <button onClick={handleCancelClick} className={style.cancelButton}>취소</button>
            </div>
          )}
        </>
      )}
      {isTimeout && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <p>10초 이상 글을 쓰지 않아 접속이 끊어졌어요.</p>
            <button onClick={handleTimeoutConfirm}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
