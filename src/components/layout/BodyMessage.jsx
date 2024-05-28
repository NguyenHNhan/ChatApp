import moment from "moment";
import Message from "./Message";

const BodyMessage = ({ messages }) => {
  return (
    <div className="bodymessage">
      {messages.map((messages, index) => (
        <Message key={index} content={messages.content} time={moment(messages.timestamp).format("HH:mm")} token={messages.token} />
      ))}
    </div>
  );
}

export default BodyMessage;
