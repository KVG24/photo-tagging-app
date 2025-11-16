import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function Leaderboards() {
    const navigate = useNavigate();

    const {
        data: records,
        loading,
        error,
    } = useFetch(`${API_URL}/leaderboard`);

    if (loading) return <p>Loading records...</p>;

    if (error)
        return (
            <>
                <p>An error occurred during fetching records data</p>
                <p>{error}</p>
            </>
        );

    return (
        <>
            <Container>
                {records &&
                    records.map((record, index) => {
                        return (
                            <Record key={index}>
                                <div>{record.name}</div>
                                <div>{record.time}</div>
                                <div>{record.mode}</div>
                            </Record>
                        );
                    })}
            </Container>
            <HomeBtn type="button" onClick={() => navigate("/")}>
                Home
            </HomeBtn>
        </>
    );
}

const Container = styled.div`
    margin: 5rem auto 0 auto;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Record = styled.div`
    width: max-content;
    display: flex;
    gap: 1rem;
`;

const HomeBtn = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #a5a5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 900;

    &:hover {
        background-color: #58589c;
        color: white;
    }
`;
