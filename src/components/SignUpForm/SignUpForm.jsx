import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthLayout from "../layouts/AuthLayout";

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });

    // destructure our formstate into individual vars
    const { username, email, password, passwordConf } = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setLoading(true);
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        } finally { setLoading(false); }
    };

    const isFormInvalid = () => {
        return !(username && email && password && password === passwordConf);
    }


    return (
        <AuthLayout>
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="/placeholder.svg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                        <form className="p-6 md:p-8 md:col-start-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Create an account</h1>
                                    <p className="text-muted-foreground whitespace-nowrap">
                                        Enter your email below to create your account
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={handleChange}
                                        name="username"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="example@email.com"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="passwordConf">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        id="passwordConf"
                                        name="passwordConf"
                                        value={passwordConf}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Button type="submit" className="w-full">
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <a href="/sign-in" className="underline underline-offset-4">
                                        Sign In
                                    </a>
                                </div>
                            </div>

                        </form>

                    </CardContent>
                </Card>
            </div>
        </AuthLayout>
    );
};

export default SignUpForm;