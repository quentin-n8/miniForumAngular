import { User } from "./User";

export interface Sujet {
    
    id?: number;
    title: string;
    date: number;
    author_id: User;
}