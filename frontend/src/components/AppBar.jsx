export function AppBar({label}){

    return <div className="flex flex-row shadow h-14 justify-between"> 
        <div className="flex flex-col justify-center h-full ml-4">   
            Wallet App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {label}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {label[0]}
                </div>
            </div>
        </div>
    </div>

}