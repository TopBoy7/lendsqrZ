export interface Stat {
    id: number,
    image: string,
    title: string,
    value: string
}

export interface UserObject {
    createdAt: string;
    orgName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    lastActiveDate: string;
    profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
    },
    guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
    },
    accountBalance: string;
    accountNumber: string;
    socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    },
    education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [ string, string ];
    loanRepayment: string;
    },
    status: string;
    id: string;
}

export interface OpenFilterObject {
    [x: string]: boolean;
    organization: boolean,
    username: boolean,
    email: boolean,
    phoneNumber: boolean,
    dateJoined: boolean,
    status: boolean,
}

export interface FilterFormObject {
    organization: string,
    username: string,
    email: string,
    date: string,
    phoneNumber: string,
    status: string
}

export interface FilterPropObject {
    resetFilter: (event: React.MouseEvent<HTMLButtonElement>) => void,
    filter: (event: React.MouseEvent<HTMLButtonElement>, formEntries: FilterFormObject) => void,
    handleSelect: (event:React.ChangeEvent<HTMLSelectElement>, input: string) => void,
    handleChange: (event:React.ChangeEvent<HTMLInputElement>, input: string) => void,
    formEntries: FilterFormObject,
    users: UserObject[],
}