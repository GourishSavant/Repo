import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Data = () => {  
    const [editorContent, setEditorContent] = useState('');
  const modules = {
    toolbar: [
      [{ 'source': 'code' }, { 'save': 'save' }], // Custom icons or handlers
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],        // Text styling
      [{ 'color': [] }, { 'background': [] }],          // Color and background
      [{ 'script': 'sub' }, { 'script': 'super' }],     // Sub/superscript
      ['link', 'image', 'video'],                      // Media
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // Lists
    //   [{ 'align': [] }],                               // Alignment
      ['clean']                                        // Clear formatting
    ]
  };
  return (
    <>
      <div style={{ margin: '20px' }}>
      <h2>Custom Text Editor</h2>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        placeholder="Start typing here..."
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
    </>
  )
}
export default Data;
