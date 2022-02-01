import Poll from "../Poll/Poll";

export default interface DBConnection {
    getPoll(pollId: number): Promise<Poll>;
    createPoll(poll: Poll): Promise<Poll>;
}