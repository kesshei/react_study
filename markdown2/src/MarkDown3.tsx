import Editor, {  useMonaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useEffect } from 'react';

const MarkDown3 =()=>{
    const monaco = useMonaco();

    useEffect(() => {
      if (monaco) {
        console.log('here is the monaco instance:', monaco);
      }
    }, [monaco]);
 
    const data=['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n')
  return (
    <Editor 
    height="90vh" 
    defaultLanguage="javascript" 
    onChange={(value: string | undefined, ev: editor.IModelContentChangedEvent)=>{
        console.log(value,ev)
    }} 
    value={data}/>
  )
}

export default MarkDown3