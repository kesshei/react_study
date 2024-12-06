/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import MdEditor from 'for-editor'

const MdEditorView = () => {
  /** 默认工具栏按钮全部开启, 传入自定义对象
  例如: {
    h1: true, // h1
    code: true, // 代码块
    preview: true, // 预览
  }
  此时, 工具栏只显示此三个功能键（注：传入空对象则不显示工具栏）
  */
  // 工具栏菜单
  const toolbar = {
    h1: true, // h1
    h2: true, // h2
    h3: true, // h3
    h4: true, // h4
    img: true, // 图片
    link: true, // 链接
    code: true, // 代码块
    preview: true, // 预览
    expand: true, // 全屏
    /* v0.0.9 */
    undo: true, // 撤销
    redo: true, // 重做
    save: true, // 保存
    /* v0.2.3 */
    subfield: true, // 单双栏模式
  };

  // 保存Markdown文本内容
  const [mdContent, setMdContent] = useState('')

  // 上传图片
  function uploadImg (file: File, index: number) {
    console.log('file', file);
    console.log('index', index);
  }
  // 输入内容改变
  function handleEditorChange (value:string) {
    console.log('handleChange', value);
    setMdContent(value)
  }
  // 保存输入内容
  function handleEditorSave (value:string) {
    console.log('handleEditorSave', value);
  }
  return (
    <MdEditor placeholder="请输入Markdown文本" 
      toolbar={toolbar} value={mdContent} onChange={handleEditorChange} onSave={handleEditorSave} addImg={uploadImg} >
    </MdEditor>
  )
}
export default MdEditorView
