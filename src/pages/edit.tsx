import TinyMceEditor from '@/components/editor/Editor';
import WikiProfile from '@/components/WikiProfile';
import style from '@/styles/editpage.module.css';

const Edit = () => {
  return (
    <div className={style.container}>
      <div className={style.editor}>
        <TinyMceEditor />
      </div>
      <WikiProfile />
    </div>
  );
};

export default Edit;
