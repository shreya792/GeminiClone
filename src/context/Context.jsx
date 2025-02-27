import { createContext, useLayoutEffect, useState } from "react";
import run from "../config/gemini";

export const context=createContext();
const ContextProvider = (props)=>{
    const [input,setinput]=useState("");
    const [recentprompt,setrecentprompt]=useState("");
    const [previosprompt,setpreviosprompt]=useState([]);
    const [showresult,setshowresult]=useState(false);
    const [loading,setloading]=useState(false);
    const [resultdata,setresultdata]=useState("");


    const delaypara= (index,nextWord)=>{
        setTimeout(function(){
            setresultdata(prev=>prev+nextWord)

        },75*index)


    }
    const newChat=()=>{
        setloading(false)
        setshowresult(false)

    }





    const onSent=async (prompt)=>{
        setresultdata("");
        setloading(true);
        setshowresult(true);
        let response;
        if(prompt!==undefined){
            response=await run(prompt);
            setrecentprompt(prompt)

        }
        else{
            setpreviosprompt(prev=>[...prev,input]);
            setrecentprompt(input)
            response=await run(input)
        }
       
        
      const resposeArray=response.split("**");
      let newResponse="";
      for(let i=0;i< resposeArray.length;i++){
        if(i===0 || i%2!==1){
            newResponse+=resposeArray[i]
        }
        else{
            newResponse+="<b>"+resposeArray[i]+"</b>"
        }
      }
      let newResponse2=newResponse.split("*").join("</br>")
      let newResponseArray=newResponse2.split(" ")
     
      for(let i=0;i<newResponseArray.length;i++){
        const nextWord=newResponseArray[i];
        delaypara(i,nextWord+" ")
      }
      setloading(false);
      setinput("");

    }
    
    

    const context_value={
        previosprompt,
        setpreviosprompt,
        onSent,
        setrecentprompt,
        recentprompt,
        showresult,
        loading,
        resultdata,
        input,
        setinput,
        newChat


    }
    return (
        
        <context.Provider value={context_value}>
            {props.children}
        </context.Provider>
    )
}
export default ContextProvider;