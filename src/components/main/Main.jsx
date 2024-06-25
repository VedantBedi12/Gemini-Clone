import React from 'react'
import './Main.css' 
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/context.jsx'
import { useContext } from 'react'

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)


  return (
    <>



    <div className='main'>
        <div className="nav">
            <p>Gemini-by Vedant</p>
            <img src = {assets.user_icon} alt="user_icon" />
        </div>

        <div className="main-container">

          {!showResult
          ? <><div className="greet">
          <p><span>Hello, User</span></p>
          <p>How can I help you today ?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Sugggest Beautiful places in India for a Road Trip</p>
            <img src = {assets.compass_icon} alt="compass_icon" />
          </div>
          <div className="card">
            <p>WHat is Machine Learning ?</p>
            <img src = {assets.bulb_icon} alt="bulb_icon" />
          </div>
          <div className="card">
            <p>Ecplain Like I'm Five</p>
            <img src = {assets.message_icon} alt = "message_icon" />
          </div>
          <div className="card">
            <p>Write a code to solve the twosum problem.</p>
            <img src = {assets.code_icon} alt="code_icon" />
          </div>
        </div></>
          : <div className='result'>
            <div className="result-title">
              <img src = {assets.user_icon} alt="user_icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src = {assets.gemini_icon} alt="gemini_icon" />
              {loading?<div className='loader'>
                <hr></hr>
                <hr></hr>
                <hr></hr>
              </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            </div>
          </div>
          }
          

          <div className="main-bottom">
            <div className="search-box">
              <input onChange= {(e)=>setInput(e.target.value)} value = {input} type = "text" placeholder = "Search for anything" />
              <div>
                <img src="src/assets/gallery_icon.png" alt="galllery" />
                <img src="src/assets/mic_icon.png" alt="mic" />
                {input?<img onClick = {()=>onSent()} src="src/assets/send_icon.png" alt="send" />:null}
              </div>
            </div>

            <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Main