import authApi from '@/lib/authAxios';
import useAuthStore from '@/store/AuthStore';
import useEditmodeStore from '@/store/EditStore';
import style from '@/styles/editpage.module.css';
import qstyle from '@/styles/minuteModal.module.css';
import { Profile } from '@/types/UserType';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import WikiProfile from '../WikiProfile';
import TinyMceEditor from './Editor';
import EditProfile from './EditProfile';

const Editboard: React.FC = () => {
  const editorRef = useRef<any>(null);
  const router = useRouter();

  const { resetStore, profile, code, isOverTime } = useEditmodeStore(
    (state) => ({
      profile: state.profile,
      code: state.code,
      // fet: state.fetchPing,
      isOverTime: state.isOverTime,
      resetStore: state.resetStore,
    })
  );

  const { user } = useAuthStore((state) => ({ user: state.user }));

  const [newProfile, setNewProfile] = useState<Profile>(profile);
  const [isModal, setIsModal] = useState(false);

  const saveContent = useCallback(async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      try {
        if (code === user?.profile.code) {
          // 내 위키
          const {
            name,
            teamId,
            id,
            code: profileCode,
            updatedAt,
            ...data
          } = newProfile;
          await authApi.patch(`/profiles/${profileCode}`, { ...data, content });
        } else {
          // 다른 위키
          await authApi.patch(`/profiles/${code}`, { content });
        }
        resetStore();
        router.replace(`/wiki/${code}`);
      } catch (e) {
        console.error('Patch error:', e);
      }
    }
  }, [code, newProfile, resetStore, router, user?.profile.code]);

  useEffect(() => {
    if (isOverTime) {
      setIsModal(true);
    }
  }, [isOverTime]);

  const overTimeOk = () => {
    resetStore();
    router.replace(`/wiki/${code}`);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.editor}>
          <div className={style.handleNav}>
            <button onClick={saveContent} className={style.btnSave}>
              저장
            </button>
            <button className={style.cancelButton}>취소</button>
          </div>
          <h2 className={style.h2}>{user?.name}</h2>
          <TinyMceEditor initialValue={profile.content} editorRef={editorRef} />
        </div>
        {profile &&
          (code === user?.profile.code ? (
            <EditProfile profile={newProfile} setProfile={setNewProfile} />
          ) : (
            <WikiProfile profile={profile} />
          ))}
      </div>

      {isModal && (
        <div className={qstyle.modalContainer}>
          <div className={qstyle.modalContent}>
            <div className={qstyle.contentWrap}>
              <h3 className={qstyle.h3}>
                5분 이상 글을 쓰지 않아 접속이 끊어졌어요.
              </h3>
              <p className={qstyle.p}>
                위키 참여하기를 통해 다시 위키를 수정해 주세요.
              </p>
            </div>
            <div className={qstyle.bottWrap}>
              <button className={qstyle.button} onClick={overTimeOk}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Editboard;
