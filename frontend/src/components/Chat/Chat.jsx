import { useState } from 'react'
import './Chat.scss'

const Chat = () => {
    const [chat,setChat] = useState(true);
  return (
    <div className='chat'>
        <div className="messages">
            <h1>Messages </h1>
            <div className="message">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>Kashif Ali</span>
                <p>hello i hope you are doing great can you tell how to get the details?</p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>Kashif Ali</span>
                <p>please soon respond</p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>Kashif Ali</span>
                <p>i think the server is busy?</p>
            </div>
            <div className="message">
                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <span>Kashif Ali</span>
                <p>hello i hope you are doing great can you tell how to get the details?</p>
            </div>
        </div>
        { chat &&
        <div className="chatBox">
            <div className="top">
                <div className="user">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                Kashif Ali
                </div>
                <span className="close" onClick={()=> setChat(null)}>X</span>
            </div>
            <div className="center">
                <div className="chatMessages">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages own">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages own">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages own">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages own">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
                <div className="chatMessages">
                    <p>this is just a demo.</p>
                    <span className='date'>1 hour ago</span>
                </div>
            </div>
            <div className="bottom">
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div> }
    </div>
  )
}

export default Chat