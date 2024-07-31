import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const tinyMceEditor: React.FC = () => {
  const editorRef = useRef<any>(null);

  const tinymcePlugins = ['link', 'lists', 'autoresize', 'media', 'quickbars'];
  const tinymceToolbar =
    'bold italic underline |' +
    'blocks bullist numlist|' +
    'alignleft |' +
    'quickimage media link';

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
      }}
    />
  );
};

export default tinyMceEditor;
