import { memo, useEffect, useState } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { openDB } from 'idb';
const HeaderMessage = () => {

    const location = useLocation();
    const cvs_id = window.location.hash.substring(1);
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!cvs_id) {
                return;
            }
            const db = await openDB('data', 1);
            const tx = db.transaction('conversations', 'readonly');
            const store = tx.objectStore('conversations');

            const data = await store.get(cvs_id);
            if (!data) {
                return;
            }
            setFullname(data.fullname)
        };

        fetchData();
    }, [location]);
    return (
        <div className="headermessage">
            <div className="headermessage-left">
                <div className="avt"></div>
            </div>
            <div className="headermessage-right">
                <div className="headermessage-infor">
                    <div>
                        <div className="infor-name">{fullname}</div>
                        <div className="subtitle">Online</div>
                    </div>
                    <div className="infor-icon">
                        <div>
                            <FaSearch size={20} />
                        </div>
                        <div>
                            <FaEllipsisV size={20} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default memo(HeaderMessage);