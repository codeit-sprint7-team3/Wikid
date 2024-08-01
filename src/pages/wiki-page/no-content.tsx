import React, { useState } from "react";
import { useRouter } from "next/router";
import style from "@/styles/noContent.module.css";

const NoContentPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/profile");
    }, 2000); // 2초 후에 페이지 전환
  };

  const handleLinkClick = () => {
    navigator.clipboard.writeText("https://www.wikied.kr/diwlehdd")
      .then(() => alert("링크가 복사되었습니다!"))
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  return (
    <div className={style.container}>
      {loading && <div className={style.spinner}></div>}
      {!loading && (
        <>
          <div className={style.header}>
            <h1 className={style.title}>이지동</h1>
            <div className={style.linkContainer}>
              <a href="#" onClick={handleLinkClick} className={style.link}>
                https://www.wikied.kr/diwlehdd
              </a>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.noContentMessage}>
              <p>아직 작성된 내용이 없네요. 위키에 참여해 보세요!</p>
              <button onClick={handleStartClick} className={style.startButton}>시작하기</button>
            </div>
            <div className={style.sidebar}>
              <img src="/profile-image.png" alt="프로필 사진" className={style.profileImage} />
              <ul className={style.profileDetails}>
                <li><strong>거주 도시:</strong> 서울</li>
                <li><strong>MBTI:</strong> INFJ</li>
                <li><strong>직업:</strong> 코드잇 콘텐츠 프로듀서</li>
                <li><strong>SNS 계정:</strong> diwlwhd_official</li>
                <li><strong>생일:</strong> 1999-12-31</li>
                <li><strong>별명:</strong> 없음</li>
                <li><strong>혈액형:</strong> A</li>
                <li><strong>국적:</strong> 대한민국</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoContentPage;