import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScreenNotification } from "../shared/ScreenNotification/ScreenNofitication";

export const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        if (location.state?.notification) {
            setPopupMessage(location.state.message);

            const timer = setTimeout(() => {
                setPopupMessage('');
                navigate(location.pathname, { replace: true });
            }, 6500);

            return () => {
                clearTimeout(timer)
            };
        }
    }, [location.state]);

    return (
        <>
            {popupMessage && <ScreenNotification message={popupMessage} />}
            <Link to={"/jobs/68c1947ae6f1f1c9b903e895"}>Link to job</Link>
            <Link to={"/jobs/68c40a2eac54a88b5e89bdcb"}>everything</Link>
            <Link to={"/jobs/68c9bd991041a4947cb8f682"}>none</Link>
        </>
    );
}