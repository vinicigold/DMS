interface StaffInfo {
    StaffId: string
	FirstName: string
    MiddleName: string
    LastName: string
    Email: string
    MobileNumber: string
    DateOfBirth: string
}

export async function GetUserInfo(staffId: string): Promise<StaffInfo | null> {
    try{
        const res = await fetch("http://localhost:4000/dms/getuserinfo", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
        body: JSON.stringify({staffId}), 
    })

        if (!res.ok) {
            console.error("Failed to fetch staff info")
            return null
        }
        const data:StaffInfo = await res.json()
        return data

    }catch(err){
        console.error("Error fetching staff info", err)
        return null
    }
}