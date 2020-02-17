export interface Match {
    dateTime: Date;
    home: Player[];
    guest: Player[];
    score: Score;
    comment: string;
}


export interface Score {
    home: number;
    guest: number;
}