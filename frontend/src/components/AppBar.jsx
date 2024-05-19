import { useSearchParams } from "react-router-dom"


export function AppBar(){

    const [ searchParams ] = useSearchParams();
    const name = searchParams.get("name");

    return <div className="flex flex-row shadow h-14 justify-between"> 
        <div className="flex flex-col justify-center h-full ml-4">   
            PayTM APP
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {name}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>


}