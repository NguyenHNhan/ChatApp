import Cookies from 'js-cookie';

const Message = ({content, time, token}) => {
    return (
        <div className="message-line">
            <div className={`message ${token === Cookies.get('token') ? '' : 'left'}`}>
                <span>{content}</span>
                <span className="message-time">{time}</span>
            </div>
        </div>
    );
}

export default Message;