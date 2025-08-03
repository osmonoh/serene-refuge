import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

// const Img = styled.img`
//     height: 9.6rem;
//     width: auto;
// `;

const Img = styled.img`
    display: block;
    margin: 0 auto 0.4rem;
    height: 7.4rem;
    width: auto;
`;

const Text = styled.p`
    color: #476044;
    font-size: 1.4rem;
    /* font-family: Sono; */
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 1px #476044;
`;

const Logo = () => {
    return (
        <StyledLogo>
            {/* <Img src="/logo-light.png" alt="Logo" /> */}
            <Img src="/logo-light_no-text.png" alt="Logo" />
            <Text>Serene refuge</Text>
        </StyledLogo>
    );
};

export default Logo;
