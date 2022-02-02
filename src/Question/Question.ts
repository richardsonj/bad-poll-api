import Option from '../Option/Option'

export default class Question {
    id?: number;
    pollId?: number;
    text?: string;
    seq?: number
    options?: Option[];
}