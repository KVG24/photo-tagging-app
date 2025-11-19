import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import formatTime from "../utils/formatTime";
import Loading from "./Loading";
import BackgroundComponent from "./BackgroundComponent";
const API_URL = import.meta.env.VITE_API_URL;

export default function Leaderboards() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const { data, loading, error } = useFetch(`${API_URL}/leaderboard`);

    useEffect(() => {
        if (data) {
            setRecords(data);
        }
    }, [data]);

    // filter all records by game mode
    const wallyRecords = records.filter((record) => record.mode == "wally");
    const simpsonsRecords = records.filter(
        (record) => record.mode == "simpsons"
    );
    const futuramaRecords = records.filter(
        (record) => record.mode == "futurama"
    );
    const tmntRecords = records.filter((record) => record.mode == "tmnt");

    // server loading warning
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWarning(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (loading)
        return (
            <>
                <InfoDiv>
                    <BackgroundComponent />
                    <Loading />
                    {showWarning && (
                        <div>
                            <p>Staring server</p>
                            <p> Might take around 15 seconds</p>
                        </div>
                    )}
                </InfoDiv>
            </>
        );

    if (error) {
        return (
            <>
                <InfoDiv>
                    <BackgroundComponent />
                    <p>Server failure</p>
                    <p>Error: {error}</p>
                    <a href="/">Back</a>
                </InfoDiv>
            </>
        );
    }

    return (
        <>
            <BackgroundComponent />
            <Container>
                <ModeContainer>
                    <h2>Wally</h2>
                    <RecordContainer>
                        {wallyRecords.map((record, index) => {
                            return (
                                <Record key={index}>
                                    <div>{record.name}</div>
                                    <div>{formatTime(record.time)}</div>
                                </Record>
                            );
                        })}
                    </RecordContainer>
                </ModeContainer>
                <ModeContainer>
                    <h2>Simpsons</h2>
                    <RecordContainer>
                        {simpsonsRecords.map((record, index) => {
                            return (
                                <Record key={index}>
                                    <div>{record.name}</div>
                                    <div>{formatTime(record.time)}</div>
                                </Record>
                            );
                        })}
                    </RecordContainer>
                </ModeContainer>
                <ModeContainer>
                    <h2>Futurama</h2>
                    <RecordContainer>
                        {futuramaRecords.map((record, index) => {
                            return (
                                <Record key={index}>
                                    <div>{record.name}</div>
                                    <div>{formatTime(record.time)}</div>
                                </Record>
                            );
                        })}
                    </RecordContainer>
                </ModeContainer>
                <ModeContainer>
                    <h2>TNMT</h2>
                    <RecordContainer>
                        {tmntRecords.map((record, index) => {
                            return (
                                <Record key={index}>
                                    <div>{record.name}</div>
                                    <div>{formatTime(record.time)}</div>
                                </Record>
                            );
                        })}
                    </RecordContainer>
                </ModeContainer>
            </Container>
            <HomeBtn type="button" onClick={() => navigate("/")}>
                Home
            </HomeBtn>
        </>
    );
}

const Container = styled.div`
    padding-top: 5rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const ModeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid white;
    box-shadow: 0 0 10px 2px #a5a5f5;
    border-radius: 10px;
    padding: 1rem;
    background-color: #1a1a1a;

    & h2 {
        text-shadow: #a5a5f5 0 0 13px;
        text-align: center;
    }
`;

const RecordContainer = styled.div`
    width: 150px;
    border-radius: 10px;
    background-color: #4b4b4b;
    box-shadow: inset 0 0 5px 1px #000000;
    padding: 0.5rem;
`;

const Record = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-weight: 500;
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

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    text-align: center;

    & a {
        background-color: #a5a5f5;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        color: black;
    }
`;
