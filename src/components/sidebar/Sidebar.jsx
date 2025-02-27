import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { context } from '../../context/Context';
const Sidebar = () => {
    const [extended ,setextended]=useState(false);
    const {onSent ,   setrecentprompt,previosprompt,newChat} = useContext(context)

   const loadprompt=async (prompt)=>{
    setrecentprompt(prompt)
    await onSent(prompt)
   }















  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setextended(prev=>!prev)} src={assets.menu_icon} className='menu' alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New chat</p>:null}

            </div>
            {extended?
            
        
        
            <div className="recent">
                <p className='recent-title'>Recent</p>{previosprompt.map((item,index)=>{
                    return (

                <div onClick={()=>loadprompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ...</p>
            </div>
                    )

                })}
                </div>  :null }
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
               {extended?<p>help</p>:null} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null} 
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>settings</p>:null} 
               
            </div>






        </div>











    </div>
  )
}

export default Sidebar