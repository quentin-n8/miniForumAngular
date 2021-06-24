import { User } from "./User";
import { Sujet } from "./sujet";

export interface Message {
    id?: number;
    content: string;
    date: number;
    topic: Sujet;
    user: User;
}