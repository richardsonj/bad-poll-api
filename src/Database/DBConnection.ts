import Question from "../Question/Question";
import Option from "../Option/Option";
import Poll from "../Poll/Poll";

export default interface DBConnection {
    getPolls(): Promise<Poll[]>;
    getPoll(pollId: number): Promise<Poll>;
    createPoll(poll: Poll): Promise<Poll>;

    getQuestions(pollId: number): Promise<Question[]>;
    getQuestion(questionId: number): Promise<Question>;
    createQuestion(question:Question): Promise<Question>;

    getOptions(questionId: number): Promise<Option[]>;
    getOption(optionId: number): Promise<Option>;
    createOption(option: Option): Promise<Option>;
}