import styled from "styled-components"

const S = {};

S.LoginSection = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

S.LoginHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`;

S.LoginLogoBox = styled.div`
    display: flex;
    justify-content: flex-end;
    & img {
        width: 65px;
        height: 65px;
        margin-right: 0.3rem;
    }

    & h2 {
        font-size: 1.3rem;
        margin: 0;
        display: flex;
        align-items: flex-end;
    }
`

S.LoginButtonBox = styled.div`
    border: 1px solid #C6C6C6;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
`

S.LoginButton = styled.button`
    width: 100%;
    border: none;
    min-width: 210px;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.3rem;
    cursor: pointer;
    &#kakao {
        background-color: #fee501;
        color: #443f1c;
        margin-bottom: 0.9rem;
    }
    &#naver {
        background-color: #2db500;
        color: #ffffff;
    }
`

export default S;