import { useState } from "react";
import chatIcon from "../../assets/newUi/chat.svg";
import "./ChatButton.css";
import Assistant from "./assistant/Assistant";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chat-button" onClick={toggleModal}>
        <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
      </button>
      {isOpen && (
        <div className="chat-modal">
          <div className="modal-content">
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>
            {/* <p>This is your chatbot modal content!</p> */}
            <Assistant />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
