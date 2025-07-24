import { useState } from 'react'
import './App.css'
import chatgpt from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMsgToOpenAi } from './openAi';
import { useRef } from 'react';
import { useEffect } from 'react';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
      text: "Hi, I am ChatBot, Maintained and Developed by Pravesh Aggarwal",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }
, [message])

  const handleSend = async() => {
    const text = input;
    setInput('');
    setMessage([
        ...message,
        {text, isBot: false},
    ]);
    const res = await sendMsgToOpenAi(input); // its take message from sendMsgToOpenAi
    setMessage([
      ...message,
      {text, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  // for send messages when click on enter key
  const handleEnter = async(e) => {
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async (e) => {
      const text = e.target.value;
      setMessage([
          ...message,
          {text, isBot: false},
      ]);
      const res = await sendMsgToOpenAi(input); // its take message from sendMsgToOpenAi
      setMessage([
        ...message,
        {text, isBot: false},
        {text: res, isBot: true}
      ]);
  }

  return (
    <>
      <div className='App'>
        <div className="sideBar">
          <div className="upperSide">
            <div className="upperSideTop"><img src={chatgpt} alt="" className='logo'/><span className='brand'>ChatBot</span></div>
            <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="new chat" className='addBtn'/>New Chat</button>
            
            <div className="upperSideBottom">
              <button className="query" onClick={handleQuery} value={"What is programming ?"}><img src={msgIcon} alt="" className="" />What is programming ?</button><br />
              <button className="query" onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="" className="" />How to use an API ?</button>
            </div>
          </div>

          <div className="lowerSide">
            <div className="listItems"><img src={home} alt="" className="listItemImg"/>Home</div>
            <div className="listItems"><img src={saved} alt="" className="listItemImg"/>Saved</div>
            <div className="listItems"><img src={rocket} alt="" className="listItemImg"/>upgrade plan</div>
          </div>
        </div>



        <div className="main">
          <div className="chats">
            {message.map((message,i) => 
              <div key={i} className={message.isBot ?"chat bot":"chat"}>
                <img className='chatimg' src={message.isBot ? gptImgLogo : userIcon} alt="" /><p className="txt">{message.text}</p>
              </div>
            )}
            <div ref={msgEnd}/>
          </div>
          <div className="chatFooter">
            <div className="Inp">
              <input type="text" placeholder='send a message...' value={input} onKeyDown={handleEnter} onChange={(e)=> {setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="" /></button>
            </div>
            <p>ChatBot may produce inaccurate information about people, places, or facts please cross check the information.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
