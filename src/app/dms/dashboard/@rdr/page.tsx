import RecentDocumentTable from '@/components/Recentdoctable'
export default function RecentDocumentRecord(){
    return(
        <div className="bg-white text-[#112D4E] p-4 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold text-center">Recent Document Record</h3>
            <div className="h-60 bg-[#CCE3FF] rounded-2xl p-3 overflow-hidden">
                <div className="h-full overflow-y-auto rounded-md p-2 hide-scrollbar">
                    <RecentDocumentTable />
                </div>
            </div>
        </div>
    )
}