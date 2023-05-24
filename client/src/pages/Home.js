import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import SingleSelectedOption from "../components/SingleSelectedOption";
import Scale from "../components/Scale";
import CodeBlock from "../components/CodeBlock";
const Home = () => {
  const [messages, setMessages] = useState([
    { text: "Hello there, How can I help you?" },
  ]);

  const [error, setError] = useState("");

  const [personality, setPersonality] = useState("");
  const [expertise, setExpertise] = useState("");
  const [strictnessValue, setStrictnessValue] = useState(0);
  const [character, setCharacter] = useState("");

  const codeSnippet = `function helloWorld() {
    console.log('Hello, world!');
  }`;
  const personalities = [
    "default",
    "confident",
    "sarcastic",
    "funny",
    "sad",
    "happy",
    "angry",
    "romantic",
    "dramatic",
    "philosophic",
  ];

  const expertiseFields = [
    "default",
    "mathematics",
    "physics",
    "chemistry",
    "Computer Science",
    "Finance",
    "Healthcare",
    "Education",
    "Customer service",
    "E-commerce",
    "Travel and tourism",
    "Entertainment",
    "Technology",
    "Marketing",
    "Human resources",
  ];
  const characters = [
    "default",
    "Yoda (Star Wars)",
    "Gandalf (The Lord of the Rings)",
    "Hermione Granger (Harry Potter)",
    "Tony Stark (Iron Man)",
    "Miyamoto Musashi (Vagabond)",
    "Saitama (One Punch Man)",
    "Spike Spiegel (Cowboy Bebop)",
    "Vegeta (Dragon Ball Z)",
    "Captain Jack Sparrow (Pirates of the Caribbean)",
    "Ellen Ripley (Alien)",
  ];

  const [currentMessage, setCurrentMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        currentMessage,
        personality,
        expertise,
        character,
        strictnessValue,
      });

      let messagesCopy = [...messages];
      setMessages([
        ...messagesCopy,
        { text: currentMessage },
        { text: "Loading..." },
      ]);
      const { data } = await axios.post("/api/v1/openai/bot", {
        currentMessage,
        personality,
        expertise,
        character,
        strictnessValue,
        valid: true,
      });

      if (data) {
        setMessages([
          ...messagesCopy,
          { text: currentMessage },
          { text: data },
        ]);
      }
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  // write a useEffect without any dependancies
  // this useEffect will run only once when the component is mounted
  useEffect(() => {
    const updateChanges = async () => {
      try {
        setMessages([{ text: "Hello there, How can I help you?" }]);
        await axios.post("/api/v1/openai/bot", { valid: false });
      } catch (err) {
        console.log(error);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.message) {
          setError(err.message);
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    updateChanges();
  }, [personality, expertise, character, strictnessValue]);
  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="options-characters">
            <SingleSelectedOption
              options={personalities}
              type={"Personality"}
              selectedOption={personality}
              setSelectedOption={setPersonality}
            />
            <SingleSelectedOption
              options={expertiseFields}
              type={"ExpertiseField"}
              selectedOption={expertise}
              setSelectedOption={setExpertise}
            />
            <SingleSelectedOption
              options={characters}
              type={"Movie/Anime Character"}
              selectedOption={character}
              setSelectedOption={setCharacter}
            />
            <Scale
              strictnessValue={strictnessValue}
              setStrictnessValue={setStrictnessValue}
            />
          </div>
        </div>
        <div className="main">
          <div className="messages">
            {messages.map((item, index) => {
              if (index % 2 === 0) {
                const parts = item.text.split(/```/);
                const textPart = parts[0];
                const codePart = parts[1];
                console.log(parts[0]);
                console.log(parts[1]);
                return (
                  <div key={index} className="bot-message message">
                    <p>bot :</p>
                    {textPart}
                    {codePart && codePart != "" && (
                      <CodeBlock code={codePart} language="javascript" />
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="user-message message">
                    <p>user :</p>
                    {item.text}
                  </div>
                );
              }
            })}
          </div>
          <div className="input-container">
            <input
              type="text"
              id="first_name"
              className="input"
              placeholder="Enter the message......."
              onChange={(e) => setCurrentMessage(e.target.value)}
              required
            />
            <button className="button" onClick={(e) => handleSubmit(e)}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
