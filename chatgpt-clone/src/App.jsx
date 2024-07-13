import './App.css'
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg'
import sentBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useState,useRef,useEffect} from 'react';


function App() {

  const msgEnd = useRef(null);

  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([{
    text: "Hi, I am ChatGPT , How can i help you",
    isBot : true,
   }
  ]);

  useEffect( () => {
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleSend = async() =>{
    const text = input;
    setMessages([
      ...messages,
      { text: input, isBot: false},
    ])
    setInput("");
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: res, isBot:true}
    ])
  }

  const handleEnter = async (e) => {
    if(e.key == 'Enter'){
      await handleSend();
    }
  }

  const handleQuery = async (e) =>{
    const text = e.target.value;
    setMessages([
      ...messages,
      { text: text, isBot: false},
    ])
    setInput("");
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: res, isBot:true}
    ])
  }
 
  return (
    <div className='App'>

      <div className='sideBar'>

          <div className='upperSide p-10 border-b-[1px] h-[70%]'>

            <div className='upperSideTop flex flex-col items-center mb-10'>
              <div className='flex'>
              <img src={gptLogo} alt="Logo" className='logo mr-[10px]'/>
              <span className='brand text-[32px]'>ChatGPT</span>
              </div>
              <button className='midBtn flex bg-[#5A4BFF] border-none text-white p-6 text-2xl items-center
              w-96 justify-center m-0 mb-12 mt-4 rounded-lg' onClick={()=>window.location.reload()} >
                <img src={addBtn} alt="new chat" className='addBtn h-8 pr-4'/>
                New Chat
              </button>

              <div className='upperSideBottom'>
                <button className='query flex items-center bg-transparent p-6 w-96 ml-4 mr-4 rounded-lg
                border-[1px] text-2xl mb-4 ' value={"What is Programming"} onClick={handleQuery}>
                  <img src={msgIcon} alt="Query" className='mr-8 h-7' />
                  <span>what is Programming</span>
                </button>
                <button className='query flex items-center bg-transparent p-6 w-96 ml-4 mr-4 rounded-lg
                border-[1px] text-2xl' value={"How to use an Api"} onClick={handleQuery}>
                  <img src={msgIcon} alt="Query" className='mr-8 h-7' />
                  <span>How to Use an Api</span>
                </button>
              </div>
            </div>

          </div>

          <div className='lowerSide p-8'>

            <div className="listItems flex m-[12px] items-center text-xl">
              <img src={home} alt="Home" className="listitemsImg mr-2 mt-4 mb-4 ml-4 pr-4" /><span>Home</span>
            </div>
            <div className="listItems flex m-[12px] items-center text-xl">
              <img src={saved} alt="Saved" className="listitemsImg m-4 pr-4" /><span>Saved</span>
            </div>
            <div className="listItems flex m-[12px] items-center text-xl">
              <img src={rocket} alt="Upgrade" className="listitemsImg mr-3 mt-4 mb-4 ml-4 pr-4" /><span>Upgrade to Pro</span>
            </div>

          </div>
      </div>

      <div className='main min-h-[100vh-224px] flex flex-col items-center justify-center ml-40 mr-40 mt-24'>
        <div className="chats overflow-hidden overflow-y-scroll scroll-smooth w-[100%] max-w-[1120px]">
          {/* Response From Chatgpt */} 
          {
            messages.map( (message,i)=>(
            <div key={i} className={message.isBot?"chat bot m-4 pl-12 pr-12 pt-8 pb-8 text-xl flex items-center justify-center text-justify"
            :"chat m-4 pl-12 pr-12 pt-8 pb-8 text-xl flex items-start  justify-center text-justify"}>
            <img className=' object-cover w-14 mr-8 rounded-lg'
            src={message.isBot ? gptImgLogo : userIcon} alt="" />
            <p className='txt leading-8'>{message.text}</p>
           </div>
            ))}
            <div ref={msgEnd}/>
        </div>

        <div className="chatFooter mt-auto w-[100%] flex flex-col items-center justify-center">
          <div className="inp p-2 bg-slate-800 flex items-center rounded-lg">
            <input type="text" name='' id='' placeholder='Send a message' className='bg-transparent
            border-none w-[100%-48px] outline-none p-5' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} />
            <button className="send bg-current border-none" onClick={handleSend}>
              <img src={sentBtn} alt="send" className='bg-transparent'/></button>
          </div>
          <p className='mt-8 mb-8'>ChatGPT may produce inaccurate information about people, places or facts.</p>
        </div>

      </div>
    </div>
  )
}

export default App
