import NullUser from '@/assets/header/basicUserProfile.png';
import { imgUpload } from '@/lib/imageUpload';
import style from '@/styles/wikiprofile.module.css';
import { Profile } from '@/types/UserType';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

interface Props {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

function EditProfile({ profile, setProfile }: Props) {
  const [uploading, setUploading] = useState(false);

  // 이미지 파일 선택 시 호출되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        setUploading(true); // 업로드 중 상태로 변경

        const response = await imgUpload(formData);

        // 업로드 완료 후 프로필 이미지 URL 업데이트
        const imageUrl = response.data.url;
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: imageUrl,
        }));
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setUploading(false); // 업로드 완료 상태로 변경
      }
    }
  };

  return (
    <>
      <div className={style.wrapper}>
        <div
          className={style.profileImageWrapper}
          onClick={() => document.getElementById('imageUpload')?.click()}
        >
          <Image
            width={150}
            height={150}
            src={profile?.image || NullUser} //ProfileImg
            alt='프로필 이미지'
            className={style.wikiProfileImg}
            priority
          />
          <div className={style.imgLayer}>
            <span>수정</span>
          </div>
          {uploading && (
            <div className={style.uploadingOverlay}>Uploading...</div>
          )}
        </div>
        <input
          id='imageUpload'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <div className={style.profileDetails}>
          <div className={style.profileItem}>
            <span className={style.label}>거주 도시</span>
            <span className={style.value}>
              <input name='city' value={profile.city} onChange={handleChange} />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={style.label}>MBTI</span>
            <span className={style.value}>
              <input name='mbti' value={profile.mbti} onChange={handleChange} />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={style.label}>직업</span>
            <span className={style.value}>
              <input name='job' value={profile.job} onChange={handleChange} />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>
              SNS 계정
            </span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input name='sns' value={profile.sns} onChange={handleChange} />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>생일</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='birthday'
                value={profile.birthday}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>별명</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='nickname'
                value={profile.nickname}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>혈액형</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='bloodType'
                value={profile.bloodType}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>국적</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='nationality'
                value={profile.nationality}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>

        <div className={style.quizWrap}>
          <h3>퀴즈</h3>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>질문</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='securityQuestion'
                value={profile.securityQuestion}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className={style.profileItem}>
            <span className={`${style.label} ${style.hideLabel}`}>답변</span>
            <span className={`${style.value} ${style.hideValue}`}>
              <input
                name='securityAnswer'
                value={profile.securityAnswer}
                onChange={handleChange}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
