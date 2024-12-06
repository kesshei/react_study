// import React, { useEffect } from 'react';
// import { render } from 'react-dom';
// import MonacoEditor2, { ChangeHandler } from 'react-monaco-editor';
 

// const MarkdownEditor =()=>{

//  const editorDidMount=(editor, monaco) =>{
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }
//   const onChange=(value: string, event: ChangeHandler)=> {
//     console.log('onChange', value, event);
//   }
//   const code= ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n')
//   const options = {
//     selectOnLineNumbers: true
//   };

//   return (
//   <MonacoEditor2
//         width="800"
//         height="600"
//         language="plaintext"
//         theme="vs"
//         value={code}
//         options={options}
//         onChange={onchange}
//         editorDidMount={editorDidMount}
//       />
//   )
// }

// export default MarkdownEditor