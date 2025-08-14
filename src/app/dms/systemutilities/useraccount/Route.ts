interface StaffInfo {
    StaffId: string
	FirstName: string
    MiddleName: string
    LastName: string
    Email: string
    MobileNumber: string
    DateOfBirth: string
}
interface RegisterUserPayload {
    staffID: string
    firstname: string
    middlename: string
    lastname: string
    email: string
    mobilenumber: string
    dateofbirth: string
    employeeStatusId: number
    roleId: number
    accountStatusId: number
}

export async function GetUserInfo(staffId: string): Promise<StaffInfo | null> {
    try{
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
        const res = await fetch(`${API_BASE}/dms/getuserinfo`, {
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
export async function RegisterUser(payload: RegisterUserPayload): Promise<boolean> {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_BASE}/dms/registeruser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
        console.error("Failed to register user");
        return false;
        }

        console.log("User registered successfully");
        return true;
    }catch (err) {
        console.error("Error registering user", err);
        return false;
    }
}