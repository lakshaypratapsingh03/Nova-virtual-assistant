let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function Speak(text) {
    let synth = window.speechSynthesis;
    let voices = synth.getVoices();


    let hindiFemale = voices.find(voice =>
        voice.lang === "hi-IN" && (
            voice.name.toLowerCase().includes("google") ||  
            voice.name.toLowerCase().includes("heera") ||    
            voice.name.toLowerCase().includes("female")     
        )
    );

    let text_Speak = new SpeechSynthesisUtterance(text);
    text_Speak.rate = 1;
    text_Speak.pitch = 1;
    text_Speak.volume = 1;
    text_Speak.lang = "hi-IN";

    let heeraVoice = voices.find(voice => voice.name.includes("Heera"));
    if (heeraVoice) {
        text_Speak.voice = heeraVoice;
    } else if (hindiFemale) {
        text_Speak.voice = hindiFemale;
    }

    synth.speak(text_Speak);
}

speechSynthesis.onvoiceschanged = () => {
    console.log("Available voices:", speechSynthesis.getVoices());
};


function wishMe() {
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 0 && hours < 12) {
        Speak("Good Morning sir");
    }
    else if (hours >= 12 && hours < 18) {
        Speak("Good Afternoon sir");
    }
    else {
        Speak("Good Evening sir");
    }
}

    window.addEventListener("load", () => {
    wishMe();
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript);
}

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
}), {once: true} ;

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    message = message.toLowerCase();
    if (message.includes("hello nova") || message.includes("hello")) {
        Speak("hi sir, how can I help you ");
    }
    else if (message.includes("how are you") || message.includes("kaise ho")) {
        Speak("I am fine , what's about you ");
    }

    else if (message.includes("i am good") || message.includes("main theek hun") || message.includes("i am fine") || message.includes("main achha hun") || message.includes("i am well") || message.includes("i am great")) {
        Speak("It's good to hear that , how can I help you ");
    }

    else if (message.includes("who are you") || message.includes("tell me about yourself")) {
        Speak("I am virtual assistant created by lakshay pratap singh shekhawat & Team");
    }

    else if (message.includes("thank you nova") || message.includes("thanks")) {
        Speak("It's my pleasure sir");
    }

    else if (message.includes("nova open youtube")) {
        Speak("Opening YouTube");
        window.open("https://www.youtube.com/", "_blank");
    }

    else if (message.includes("nova open telegram")) {
        Speak("Opening Telegram");
        window.open("https://web.telegram.org", "_blank");
    }

    else if (message.includes("nova open google")) {
        Speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }

    else if (message.includes("mujhe gadi de do")) {
        Speak("sorry sir, I am not able to give you a gadi");
    }

    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        Speak(time);
    }

    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric"});
        Speak(date);
    }

    else {
        let finalText = "this is what I found on internet regarding" + message.replace("nova", "");
        Speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("nova", "")}`, "_blank");
    }
}

