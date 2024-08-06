import { useRef } from 'react';
import TinyMceEditor from '@/components/editor/Editor';
import axios from '@/lib/axios';

const SaveButton = () => {
  const editorRef = useRef<any>(null);

  const handleSave = async (content: string) => {
    try {
      const response = await axios.post('/images/upload', { content });
      if (response.status === 200) {
        alert('저장 성공');
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('에러', error);
      alert('에러');
    }
  };

  const onSaveClick = () => {
    if (editorRef.current) {
      editorRef.current.saveContent();
    }
  };

  return (
    <div>
      <TinyMceEditor ref={editorRef} onSave={handleSave} />
      <button onClick={onSaveClick}>저장</button>
    </div>
  );
};

export default SaveButton;
