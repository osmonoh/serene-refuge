import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser();

    // 3. If there is NO authenticated user, redirect to the /login (navigate cannot be called on the top level so we have to put it in a function or useEffect like here and useEffect cannot go after a condition)
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    // 2. While loading, show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there IS a user, render the app

    if (isAuthenticated) return children;
};

export default ProtectedRoute;
