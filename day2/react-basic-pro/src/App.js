import { useEffect, useRef, useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import { assignWith, orderBy } from 'lodash'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'
/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 199,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */
//封装系统请求
function useGetList() {
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    async function getList() {
      axios.get('_db.json')
        .then(response => {
          // 在这里处理读取到的JSON数据
          console.log(response.data.list);
          setCommentList(response.data.list);
        })
        .catch(error => {
          // 处理错误情况
          console.error('Error:', error);
        });
    }
    getList()
  }, [])
  return {
    commentList,
    setCommentList
  }
}
// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]
const Item = ({ item, onDel }) => {
  return (
    <div className="reply-item" key={item.rpid}>
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            alt=""
          />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {user.uid === item.user.uid && (
              <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
const App = () => {
  //const [list, setList] = useState(defaultList)
  const [activeTab, setActiveTab] = useState('hot')
  const { commentList, setCommentList } = useGetList()
  const onDelete = rpid => {
    setCommentList(commentList.filter(item => item.rpid != rpid))
  }
  const switchHightLight = type => {
    setActiveTab(type)
    let newlist;
    if (type === 'time') {
      newlist = orderBy(commentList, 'ctime', 'desc')
    }
    else {
      newlist = orderBy(commentList, 'like', 'desc')
    }
    setCommentList(newlist)
  }
  const handlPublish = () => {
    if (content == '') {
      return;
    }
    setCommentList([
      ...commentList,
      {
        rpid: uuidV4(), // 随机id
        user: {
          uid: '30009257',
          avatar,
          uname: '黑马前端',
        },
        content: content,
        ctime: dayjs(new Date()).format('MM-DD hh:mm'), // 格式化 月-日 时:分
        like: 66,
      }
    ])
    setContent('')
    inputRef.current.focus()
  }
  //发表评论
  const [content, setContent] = useState('')
  const inputRef = useRef(null)
  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => {
              return (
                <span
                  className={item.type === activeTab ? 'nav-item active' : 'nav-item'}
                  key={item.type}
                  onClick={() => switchHightLight(item.type)}>
                  {item.text}
                </span>
              )
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              ref={inputRef}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlPublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map(item => {
            return (<Item item={item} onDel={onDelete}></Item>)
          })}
        </div>
      </div>
    </div>
  )
}

export default App