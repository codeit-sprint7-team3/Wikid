import TinyMceEditor from '@/components/editor/Editor';
import WikiProfile from '@/components/WikiProfile';
import style from '@/styles/editpage.module.css';
import { useRouter } from 'next/router';

const EditWikiPage = () => {
  const router = useRouter();
  const { code } = router.query;

  if (!code || Array.isArray(code)) {
    return <div>Invalid code</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.editor}>
        <TinyMceEditor code={code} />
      </div>
      <div className={style.profile}>
        <WikiProfile />
      </div>
    </div>
  );
};

export default EditWikiPage;
