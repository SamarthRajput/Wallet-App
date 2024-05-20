import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
export function HomeBar(){

    const navigate = useNavigate();

    return <div className="flex flex-row shadow h-14 justify-between"> 
        <div className="flex flex-col justify-center h-full ml-4">   
            Wallet App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <Button label={"Dashboard"} onClick={() => {
                    navigate("/dashboard");
                }}></Button>
            </div>
        </div>
    </div>

}