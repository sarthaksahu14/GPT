import React, { createContext, useState } from "react";
import run from "../../gemini";
export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setprompt] = useState("Listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GM";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.replace("google", "GotiBazz") &&
      text.replace("Google", "GotiBazz");

    setprompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 13000);
  }

  let speechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;

    setprompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening Youtube");
      setprompt("Opening Youtube");
      setTimeout(() => {
        setSpeaking(false);
      }, 2000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening google");
      setprompt("Opening google");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening instagram");
      setprompt("Opening instagram");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setprompt,
    response,
  };

  return (
    <>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </>
  );
}

export default UserContext;
