import React, {useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css'

const MarkDown2 : React.FC = () => {
  const [md, handleMD] = useState('loading... ...');

  useEffect(()=>{
    fetch('2022世冠.md')
    .then(response => response.text())
    .then(data => {
      // 处理文件内容
      handleMD(data)
      console.log(data);
    })
    .catch(error => {
      // 处理错误
      console.log(error);
    });
  },[])
  const renderers = {
    image: ({ src, alt }) => <CustomImageComponent src={src} alt={alt} />
  };
  const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;

  return (
    <div className="App">
      <ReactMarkdown 
      children={md}
       components={{
         img({...props }){
          const {src,alt} = props
          return (<img src={src} alt={alt} style={{ maxWidth: "100%" }} />);
         }
       }} />
    </div>
  );
};
export default MarkDown2
