import ChartDoughnut from '@/components/Chartdoughnut'

export default function ClientAccountSystem(){
    return(
        <div className="bg-[#ffffff] text-[#112D4E] p-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold text-center">Client Account Status</h3>
            <div className="h-65 mt-2 bg-[#CCE3FF] rounded-2xl flex items-center justify-center relative">
                <ChartDoughnut />
            </div>
        </div>
    )
}