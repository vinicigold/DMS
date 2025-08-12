import {HomeIcon} from '@heroicons/react/24/solid'
export default function Dashbaord (){
    return (
        // <div className="text-[#112D4E]">
        //     <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        // </div>
        <div className="flex w-full items-center justify-start gap-2 text-[#112D4E] h-12 px-3 rounded-md">
            <HomeIcon className="size-6" />
            <div className="flex flex-col gap-0.5 leading-none">
                <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            </div>
        </div>
    )
}