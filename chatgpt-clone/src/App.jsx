import './App.css'
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg'


function App() {

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
              w-96 justify-center m-0 mb-12 mt-4 rounded-lg' >
                <img src={addBtn} alt="new chat" className='addBtn h-8 pr-4'/>
                New Chat
              </button>

              <div className='upperSideBottom'>
                <button className='query flex items-center bg-transparent p-6 w-96 ml-4 mr-4 rounded-lg
                border-[1px] text-2xl mb-4 '>
                  <img src={msgIcon} alt="Query" className='mr-8 h-7' />
                  <span>what is Programming</span>
                </button>
                <button className='query flex items-center bg-transparent p-6 w-96 ml-4 mr-4 rounded-lg
                border-[1px] text-2xl'>
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

      <div className='main'>


      </div>
    </div>
  )
}

export default App
