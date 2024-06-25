import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData,setResultData] = useState("");    

    const delayPara = (index, nextword) => {
        setTimeout(function () {
            setResultData(prev => prev + nextword + " " )
        }, 75*index)
    }

    const newchat = () => {
        setLoading(false)
        setShowResult(false)

    }

    const onSent = async (prompt) => {
       
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input);
        }
        let responsearray = response.split("**");
        let newresponse ="";
        for(let i =0; i< responsearray.length; i++){
            if (i ===0 || i%2 !== 1){
                newresponse += responsearray[i]
            }
            else {
                newresponse +="<br>"+responsearray[i]+"<br>"
            }
        }
        let newresponse2 = newresponse.split("*").join("</br>");
        let newresponsearray = newresponse2.split(" ");
        for(let i = 0; i< newresponsearray.length; i++){
            delayPara(i, newresponsearray[i] + " ")
        }

        setLoading(false)
        setInput("")
    }


    const contextValue = {
        input,
        setInput,
        onSent,
        loading,
        resultData,
        showResult,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        newchat

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;