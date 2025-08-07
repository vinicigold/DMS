export default function DocumentManagementSystem(){
    return(
        <div className="bg-[#fffff] text-[#112D4E] p-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold text-center  ">Document Management System</h3>
            <div className="h-65 mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#CCE3FF] p-4 rounded-xl text-center">
                <h4 className="text-sm font-medium text-[#3F72AF]">DMS User</h4>
                    <p className="text-xl font-medium text-[#112D4E] mt-2">12</p>
                </div>
                <div className="bg-[#CCE3FF] p-4 rounded-xl text-center">
                <h4 className="text-sm font-medium text-[#3F72AF]">Documents</h4>
                    <p className="text-xl font-medium text-[#112D4E] mt-2">31</p>
                </div>
                <div className="bg-[#CCE3FF] p-4 rounded-xl text-center">
                <h4 className="text-sm font-medium text-[#3F72AF]">Files</h4>
                    <p className="text-xl font-medium text-[#112D4E] mt-2">26</p>
                </div>
            </div>
        </div>
    )
}