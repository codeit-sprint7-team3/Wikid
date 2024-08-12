import {
  alignleftIcon,
  boldIcon,
  bullistIcon,
  imageIcon,
  italicIcon,
  linkIcon,
  numlistIcon,
  underlineIcon,
  videoIcon,
} from '@/assets/icon/TinyIcon';
import { imgUpload } from '@/lib/imageUpload';
import { Editor } from '@tinymce/tinymce-react';
import { forwardRef } from 'react';

interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

type ProgressFn = (percent: number) => void;

const addCustomButton = (
  editor: any,
  iconName: string,
  icon: string,
  tooltipText: string,
  command: string
) => {
  editor.ui.registry.addIcon(iconName, icon);
  editor.ui.registry.addButton(iconName, {
    icon: iconName,
    tooltip: tooltipText,
    onAction: () => editor.execCommand(command),
  });
};

const handleImageUpload = async (blobInfo: BlobInfo, progress: ProgressFn) => {
  try {
    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());

    const response = await imgUpload(formData);

    return response.data.url;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

interface Props {
  editorRef: React.MutableRefObject<any>;
  initialValue: string;
}
const TinyMceEditor = forwardRef<any, Props>(
  ({ initialValue, editorRef }): JSX.Element => {
    const tinymcePlugins = [
      'link',
      'lists',
      'autoresize',
      'media',
      'quickbars',
      'image',
      'noneditable',
    ];
    const tinymceToolbar =
      'customBold customItalic customUnderline |' +
      'blocks customBullist customNumlist |' +
      'customAlignleft |' +
      'customImage customVideo customLink';

    return (
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={
          initialValue ||
          `<h2 class="noneditable">01. 개요</h2>
          <p>여기에 기본 내용을 입력하세요.</p>
          <h2 class="noneditable">02. 취미</h2>
          <p>여기에 취미에 관한 내용을 입력하세요.</p>
          <h2 class="noneditable">03. 여담</h2>
          <p>여기에 여담에 관한 내용을 입력하세요.</p>
          <h2 class="noneditable">04. 취향</h2>
          <p>여기에 취향에 관한 내용을 입력하세요.</p>
        `
        }
        init={{
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          min_height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;내용=p;',
          noneditable_noneditable_class: 'noneditable',

          images_upload_handler: handleImageUpload,
          setup: (editor) => {
            addCustomButton(editor, 'customBold', boldIcon, 'Bold', 'Bold');
            addCustomButton(
              editor,
              'customItalic',
              italicIcon,
              'Italic',
              'Italic'
            );
            addCustomButton(
              editor,
              'customUnderline',
              underlineIcon,
              'Underline',
              'Underline'
            );
            addCustomButton(
              editor,
              'customBullist',
              bullistIcon,
              'Bullet list',
              'InsertUnorderedList'
            );
            addCustomButton(
              editor,
              'customNumlist',
              numlistIcon,
              'Numbered list',
              'InsertOrderedList'
            );
            addCustomButton(
              editor,
              'customAlignleft',
              alignleftIcon,
              'Align left',
              'JustifyLeft'
            );
            addCustomButton(
              editor,
              'customImage',
              imageIcon,
              'Insert Image',
              'mceImage'
            );
            addCustomButton(
              editor,
              'customVideo',
              videoIcon,
              'Media',
              'mceMedia'
            );
            addCustomButton(editor, 'customLink', linkIcon, 'Link', 'mceLink');
          },
        }}
      />
    );
  }
);

TinyMceEditor.displayName = 'TinyMceEditor';
export default TinyMceEditor;
