
export interface User {
    username: string;
    password: string;
}

export interface Card {
    productNumber:     string;
    productBrand:      string;
    LimitRD:           number;
    BalanceRD:         number;
    LimitUS?:          number;
    BalanceUS?:        number;
    clientName:        string;
    productEndingDate: string;
}

export interface Transaction {
    productNumber:   string;
    amount:          number;
    description:     string;
    transactionType: number;
    date:            string;
}


