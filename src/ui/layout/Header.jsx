import styled from "styled-components";
import Lougout from "../../features/authentication/Lougout";

const StyledHeader = styled.header`
    border-bottom: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
`;

const Header = () => {
    return (
        <StyledHeader>
            <Lougout />
        </StyledHeader>
    );
};

export default Header;
