import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <>
            <Link to={"/jobs/68c1947ae6f1f1c9b903e895"}>Link to job</Link>
            <Link to={"/jobs/68c40a2eac54a88b5e89bdcb"}>everything</Link>
            <Link to={"/jobs/68c42db467aab542a2b44305"}>none</Link>
        </>
    );
}