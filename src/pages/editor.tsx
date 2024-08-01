import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import CustomBoldIcon from '../assets/editor/bold-icon.svg'; // SVG를 컴포넌트로 불러오기

const TinyMceEditor: React.FC = () => {
  const editorRef = useRef<any>(null);

  const tinymcePlugins = ['link', 'lists'];
  const tinymceToolbar =
    'bold italic underline |' +
    'blocks bullist numlist |' +
    'alignleft |' +
    'link';

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        plugins: tinymcePlugins,
        toolbar: tinymceToolbar,
        min_height: 500,
        menubar: false,
        branding: false,
        statusbar: false,
        block_formats: '제목1=h2;제목2=h3;제목3=h4;내용=p;',
        setup: (editor) => {
          // 아이콘 등록
          editor.ui.registry.addIcon('customBold', CustomBoldIcon);
          // 툴바에서 커스텀 아이콘을 사용하도록 설정
          editor.ui.registry.addButton('bold', {
            icon: 'customBold',
            tooltip: 'Bold',
            onAction: () => editor.execCommand('Bold'),
          });
        },
      }}
    />
  );
};

export default TinyMceEditor;
