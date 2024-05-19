import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    //We want to populate these states as that specific input boxes filled by the user
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    {/* Why we have updated the InputBox component to take onChange as an input, So that anytime any of the input filled by the user and when click on signup, We have access to these 4 inform of state variables so i can send this request to the backend  */}
                    <InputBox onChange={e => {
                        setFirstName(e.target.value);
                    }} label={"First Name"} placeholder={"John"}></InputBox>
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value);
                    }} label={"Last Name"} placeholder={"Doe"}></InputBox>
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value);
                    }} label={"Email"} placeholder={"Johndoe@gmail.com"}></InputBox>
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value);
                    }} label={"Password"} placeholder={"123456"}></InputBox>
                    <div className="pt-4">
                        {/* Now anytime this button is clicked, we want to send the backend requests which we can do via axios or via fetch */}
                    <Button label={"Sign up"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            //this is a key value pair but we have not done firstName : firstName bcz in javascript if we know the name of the key and the value is the same we can actually put them together 
                            firstName,
                            lastName,
                            username,
                            password
                        });
                        // response.data.token where do we store this so that all your future requests contains this token
                        //we store the token in the localStorage
                        //localStorage.setItem() needs 2 arguments , 1st is the key and second is the argument 
                        //This localStorage will do, ki whenever we signedup and i get back a token We are storing it somewhere in the browser 
                        //The backend will only accept the request if they are sending the token in every request as the authorization header
                        localStorage.setItem("token", response.data.token)
                        //when we logout we have to just clear the token, whenever the user clicks on logout just remove there auth key from the localStorage  
                        //there are 2 syntax to clear out a token
                        //1st
                        // localStorage.setItem("token", "");
                        //2nd 
                        // localStorage.removeItem("token");
                        navigate("/dashboard");
                    }}></Button>
                    </div>
                    <BottomWarning label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
}
