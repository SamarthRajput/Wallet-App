import { Send } from "lucide-react";

export function AppBar({label}){

    return <div className="flex flex-row shadow h-14 justify-between"> 
        <div className="flex items-center ml-12 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">PayWallet</span>
        </div>
        <div className="flex mr-12">
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