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
    organization: boolean,
    username: boolean,
    email: boolean,
    phoneNumber: boolean,
    dateJoined: boolean,
    status: boolean,
}