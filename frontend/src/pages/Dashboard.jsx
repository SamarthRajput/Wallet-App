import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {

   const [amount, setAmount] = useState(0);
   const [user, setUser] = useState("User");

   useEffect(() => {
      axios.get("http://localhost:3000/api/v1/account/balance", {
         headers: {
            Authorization : "Bearer " + localStorage.getItem("token") 
         }
      })
      .then(response => { 
         setAmount(response.data.balance);
      })
   }, [amount])


   return <div>
      <AppBar label={user}></AppBar>
      <div className="m-8">
         {/* toFixed() function javaScript is used formats a number using fixed-point notation */}
         <Balance value={amount.toFixed(2)} />
         <Users></Users>
      </div>
   </div>
}