'use client'

export default function File() {

  const handleClickEmp = () => {
    console.log('Employee card clicked')
  }

return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <button onClick={handleClickEmp}>
            <div className="bg-white text-[#0b4d2a] p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out text-left">
                <h3 className="text-lg font-medium">Total Employees</h3>
                <p className="text-3xl font-bold mt-2">69</p>
            </div>
        </button>
    </div>
)
}