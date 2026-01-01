import React, { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import ReactMarkdown from "react-markdown";

const knownSymptoms = [
  "fever","headache","migraine","cough","dry cough","wet cough","cold","sore throat",
  "runny nose","nasal congestion","sinus pressure","sinus pain","chest pain","chest tightness",
  "shortness of breath","breathlessness","fatigue","weakness","body ache","joint pain","back pain",
  "neck stiffness","shoulder pain","knee pain","hip pain","abdominal pain","lower abdominal pain",
  "upper abdominal pain","nausea","vomiting","diarrhea","constipation","heartburn","acidity",
  "bloating","gas","indigestion","loss of appetite","increased appetite","unintended weight loss",
  "unintended weight gain","dizziness","lightheadedness","vertigo","fainting","excessive sweating",
  "night sweats","shivering","chills","high blood pressure","low blood pressure","rapid heart rate",
  "slow heart rate","palpitations","hand tremors","leg tremors","numbness","tingling",
  "pins and needles","muscle spasm","muscle cramps","muscle weakness","skin rash","itching","dry skin",
  "oily skin","red eyes","dry eyes","watery eyes","blurred vision","double vision","eye pain",
  "eye irritation","ear pain","hearing loss","tinnitus","toothache","bleeding gums","mouth ulcers",
  "burning mouth","difficulty swallowing","hoarse voice","throat swelling","chest burning",
  "dry mouth","excessive thirst","dehydration","frequent urination","burning urination",
  "blood in urine","dark urine","yellow skin","pale skin","cold hands","cold feet","hot flashes",
  "heat intolerance","cold intolerance","hair loss","dandruff","scalp pain","acne","psoriasis flare",
  "eczema patch","swollen lymph nodes","leg cramps","stomach cramps","allergy sneezing",
  "allergic cough","allergic rash","breathing difficulty during exercise","rapid breathing",
  "slow breathing","chest congestion","difficulty concentrating","short-term memory loss",
  "long-term memory loss","confusion","anxiety","panic attack","depression","irritability",
  "mood swings","restlessness","excessive sleepiness","insomnia","nightmares","low energy",
  "loss of smell","loss of taste","sinus drainage","swollen feet","swollen hands","joint swelling",
  "finger numbness","toe numbness","sunburn","heat rash","bruising easily","chest heaviness",
  "throat irritation","ear fullness","chest infection","bronchitis","asthma wheezing","nerve pain",
  "sharp ear pain","gallbladder pain","liver pain","kidney stone pain","appendix pain",
  "vomiting blood","severe back spasm","eye swelling","eyelid drooping","hand weakness",
  "leg weakness","loss of balance","severe joint stiffness","cold sweats","heat exhaustion",
  "heat stroke","allergic swelling","food allergy reaction","throat dryness severe",
  "pain during urination","swollen tonsils","gum infection","mouth burning","stomach burning",
  "ulcer pain","severe indigestion","nasal burning","sinus infection","eye redness severe",
  "foot burning","heel swelling","wrist swelling","forearm pain","arm numbness","leg numbness",
  "swollen eyelids","chest pressure heavy","severe heart palpitations","irregular heartbeat",
  "blackout episodes","severe fatigue","muscle tear pain","joint locking","bone pain",
  "hip stiffness","groin pain","inguinal pain","lower rib pain","upper rib pain","jaw clicking",
  "jaw locking","face numbness","face pain","ear blockage","water in ear","stomach infection",
  "intestinal cramps","rectal pain","rectal bleeding","severe gas pain","severe abdominal tightness",
  "pelvic pressure","pelvic cramps","menstrual cramps severe","ovarian pain","testicular pain",
  "urinary retention","high fever","low fever","throat infection","body itching severe",
  "skin infection","red patches","white patches","skin burning severe","cold urticaria",
  "heat urticaria","skin blisters","fluid retention","water retention","ankle swelling severe",
  "foot infection","hand infection","neck swelling severe","lymph node infection","voice loss",
  "breathlessness severe","air hunger","sharp rib pain","lower back burning","upper back burning",
  "bone crack feeling","bone weakness","severe muscle knots","upper chest discomfort",
  "lower chest discomfort","deep lung pain","sharp lung pain","choking feeling","tickling throat",
  "burning throat","deep cough pain","abdominal tightness","severe chest vibration","ear pressure",
  "full body shaking","hand coldness","face tingling","toe tingling","sharp heel pain",
  "collapsed feeling","breathing pain","cold shiver waves","warm skin feeling","forehead pressure",
  "eye burning","severe watery eyes","internal burning sensation","stomach knot",
  "stomach pulling pain","left side chest ache","right side chest ache","internal tremors",
  "mid back tightness","upper spine pain","lower spine pain","deep joint throbbing",
  "muscle pull pain","sudden weakness waves","mind fog","severe disorientation","eye strain",
  "ear buzzing","internal cold feeling","leg heaviness","arm heaviness","sinus swelling",
  "inner ear itching","inner nose burning","skin stretching pain","hip locking","muscle twitching",
  "sudden chest pulse","internal fluctuation feeling","jaw pressure","neck burning",
  "throat itching severe","body heat waves","body shaking mild","chest flutter",
  "abdominal vibration","internal vibration","fatigue waves","energy drop","chest numbness",
  "face heat","face cold","sudden face redness","knee locking","foot nerve twinge",
  "palm burning","palm itching","ear warmth","ear coldness","scalp tingling",
  "scalp itching severe","deep eye pressure","upper back pulse","lower back pulse","abdominal pulse",
  "chest pulse","body pulse awareness","rapid body temperature change","internal pressure",
  "deep internal ache","throat pulse","eye twitch severe","leg pulse feeling","toe burning",
  "chest stabbing pain","back stabbing pain","low spine tightness","mid spine tightness",
  "collarbone pain","shoulder blade pain","deep shoulder pressure","ankle tightness",
  "ankle nerve pain","heel vibration","foot pulse","hand pulse feeling","rib cramps","side cramps",
  "inner side pain","kidney throbbing","liver throbbing","stomach burning severe",
  "heart region uneasiness","heart flutter sudden","severe nose tingling","dry nasal passage",
  "hot nasal passage","mouth drying fast","inner mouth burning","tongue dryness","tongue tingling",
  "cheek pain","cheek numbness","jaw numbness","entire body heaviness","sudden limb weakness",
  "deep bone stiffness","deep bone pressure","eye drying fast","upper abdomen stretching",
  "lower abdomen stretching","inner chest stretching","inner leg tightness","inner arm tightness",
  "stomach rolling feeling","sudden sweating burst","sudden cold burst","moist skin feeling",
  "dry skin feeling","skin tightening","skin loosening feeling","rapid muscle fatigue",
  "delayed muscle fatigue","muscle burning inside","inner muscle tension","lower neck pulling",
  "upper neck pulling","shoulder tension deep","arm joint vibration","leg joint vibration",
  "heart skip feeling","breathing skip feeling","inner chest heat","inner chest cold",
  "full body warmth","full body cold","sudden light sensitivity","sudden sound sensitivity",
  "brain pressure","brain fog waves","mental dullness","nerve shock feeling","nerve pulling",
  "nerve burning","throat tightening sudden","sudden air hunger","shallow breathing episodes",
  "heat triggers","cold triggers","sharp organ pain","undefined body pain","localized pressure",
  "diffuse pressure"
];

function Chatbot() {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Healio, your medical assistant. How are you feeling today?" }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setTyping] = useState(false);

  const handleQuick = (type) => {
    if (type === "book") {
      setMessages((prev) => [...prev, { sender: "user", text: "I want to book a session" }]);
      setTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: "You can book a session from the Doctors page or any doctor profile." }]);
        setTyping(false);
      }, 700);
    }

    if (type === "doctors") {
      setMessages((prev) => [...prev, { sender: "user", text: "Show me all doctors" }]);
      setTimeout(() => {
        window.location.href = "/doctors";
      }, 400);
    }

    if (type === "emergency") {
      setMessages((prev) => [...prev, { sender: "user", text: "Emergency help" }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: "🚨If this is a real emergency, call 108 immediately." }]);
      }, 700);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTyping(true);

    try {
      const lowerInput = input.toLowerCase();

      const symptoms = knownSymptoms.filter(sym =>
        lowerInput.includes(sym.toLowerCase())
      );

      if (symptoms.length === 0) {
        symptoms.push(input.trim());
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/predict/analyzeSymptoms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms })
      });

      const data = await response.json();
      setTyping(false);

      if (!data.success) {
        return setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't analyze your symptoms." }
        ]);
      }

      let reply = `
.**Possible Condition:** ${data.predictedDisease}
.**Recommended Doctor:** ${data.specialization}
.**Description:** ${data.descriptions.join(" ")}
.**Severity:** ${data.severity.join(", ")}
.**Precautions:**
.${data.precautions.join(".\n")}.
.`;

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting server." }
      ]);
    }
  };

  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-window">

        {messages.map((msg, index) => (
          <div key={index} className={`chat-row ${msg.sender}`}>
            {msg.sender === "bot" && (
              <img src="/bot.png" alt="bot" className="avatar" />
            )}

            {msg.sender === "user" && (
              <img src="/user.png" alt="user" className="avatar user-avatar" />
            )}

            <div className={`chat-bubble ${msg.sender}`} style={{ whiteSpace: "pre-wrap" }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row bot">
            <img src="/bot.png" alt="bot" className="bot-avatar" />
            <div className="typing-bubble">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="quick-buttons">
        <button onClick={() => handleQuick("book")}>Book Session</button>
        <button onClick={() => handleQuick("doctors")}>Show Doctors</button>
        <button onClick={() => handleQuick("emergency")}>Emergency Help</button>
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Describe how you're feeling... (eg: Fever, Cough)"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
