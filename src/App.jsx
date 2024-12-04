import { FaMicrophone } from "react-icons/fa";
import React, { useContext } from "react";
import { datacontext } from "./context/UserContext";

function App() {
  let { recognition, speaking, setSpeaking, prompt, setprompt, response } =
    useContext(datacontext);
  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen bg-black ">
        <img
          src="/robo.png"
          alt="Robo"
          className="sm:h-[50%] sm:w-[70%] md:h-[60%] md:w-[40%] xl:h-[66%] xl:w-[40%] 2xl:h-[66%] 2xl:w-[30%] mb-[1%] mt-10"
        />
        <h1 className="text-transparent bg-clip-text font-semibold text-xl sm:text-3xl bg-gradient-to-r from-[#01B9F1] to-[#EE50BA] mb-[1%]">
          I'm Goti, Your Virtual Assistant
        </h1>

        {!speaking ? (
          <button
            onClick={() => {
              setprompt("Listening...");
              setSpeaking(true);
              recognition.start();
            }}
            className="bg-[#01B9F1] py-2 px-3 flex gap-2 items-center rounded-full shadow-[0_0_10px_5px_#36D6F3] transform transition-all duration-300 hover:shadow-[0_0_15px_8px_#AC006A]"
          >
            {" "}
            Click Here <FaMicrophone />
          </button>
        ) : (
          <div className="flex flex-col items-center">
            {!response ? (
              <img src="/speak.gif" className="w-24 object-cover" />
            ) : (
              <img
                src="/aiVoice.gif"
                className="w-80 h-16 mb-5 object-cover origin-center items-center justify-center"
              />
            )}

            <h3 className="font-semibold text-xl text-white text-center">
              {prompt}
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
