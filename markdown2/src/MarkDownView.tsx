/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React, {useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkDownView : React.FC = () => {
  const [md, handleMD] = useState('loading... ...');

  useEffect(()=>{
    fetch('2022世冠.md')
    .then(response => response.text())
    .then(data => {
      // 处理文件内容
      handleMD(data)
      //console.log(data);
    })
    .catch(error => {
      // 处理错误
      console.log(error);
    });
  },[])

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <ReactMarkdown
        children={md}
         urlTransform = {(url: string, key: string,ele:any)=>  {
            console.log(url)
            console.log(key)
            console.log(ele)
            return url
         }}
          className={'markdown-body'}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            }, 
            // img({...props }){
            //   const {src,alt} = props
            //   return (<img src={src} alt={alt} style={{ maxWidth: "100%" }} />);
            //  }
          }}
        />
      </Card>
    </PageContainer>
  );
};
export default MarkDownView
