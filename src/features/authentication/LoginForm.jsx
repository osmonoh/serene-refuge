import { useState } from "react";
import Button from "../../ui/interactive/Button";
import Form from "../../ui/form/Form";
import Input from "../../ui/form/Input";
import SpinnerMini from "../../ui/layout/SpinnerMini";
import FormRowVertical from "../../ui/form/FormRowVertical";
import { useLogin } from "./useLogin";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isPending: isLoggingIn, mutate: login } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) return;

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                }
            }
        );
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoggingIn}>
                    {isLoggingIn ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
};

export default LoginForm;
