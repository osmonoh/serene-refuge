import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
`;

// const Img = styled.img`
//     display: block;
//     margin: 0 auto;
//     height: 8rem;
//     width: auto;
// `;

const Text = styled.p`
    color: #476044;
    font-size: 1.8rem;
    font-size: 1.6rem;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const Logo = () => {
    return (
        <StyledLogo>
            <Img src="/logo-light.png" alt="Logo" />
            {/* <Img src="/logo-light_no-text.png" alt="Logo" /> */}
            {/* <Text>Serene refuge</Text> */}
        </StyledLogo>
    );
};

export default Logo;
