import ChartBar from '@/components/ChartBar'
export default function TopBranch(){
    return(
        <div className="bg-[#ffffff]  text-[#112D4E] p-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold text-center">Top Branch</h3>
            <div className="mt-2 h-60 bg-[#CCE3FF] rounded-2xl flex items-center justify-center relative">
                <ChartBar />
            </div>
        </div>
    )
}