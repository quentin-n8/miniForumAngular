interface Message {
    id: number;
    content: string;
    date: Date;
    topic_id: Sujet;
    author_id: User;
}