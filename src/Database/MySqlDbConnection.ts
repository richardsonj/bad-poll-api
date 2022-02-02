import DBConnection from "./DBConnection";
import mysql from "mysql";
import Poll from "../Poll/Poll";
import Option from "../Option/Option";
import Question from "../Question/Question";

let dbConnection: MySqlDBConnection;

const getConnection: () => DBConnection = () => {
  if (!dbConnection) {
    dbConnection = new MySqlDBConnection(
      process.env.DATABASE_HOST,
      parseInt(process.env.DATABASE_PORT, 10),
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      process.env.DATABASE_NAME
    );
  }
  return dbConnection;
};

class MySqlDBConnection implements DBConnection {
  db: mysql.Connection;
  constructor(
    host: string,
    port: number,
    user: string,
    password: string,
    dbName: string
  ) {
    this.db = mysql.createConnection({
      host,
      port,
      user,
      password,
      database: dbName,
    });
    this.db.connect();
  }

  async getPolls(): Promise<Poll[]> {
    throw new Error("Method not implemented.");
  }

  async getPoll(pollId: number): Promise<Poll> {
    throw new Error("Method not implemented.");
  }

  async createPoll(poll: Poll): Promise<Poll> {
    const result = await this.insert("poll", ["name"], [poll.name]);
    let questions: Question[];
    if (poll.questions) {
      questions = [];
      for (const question of poll.questions) {
        const writtenQuestion = await this.createQuestion({
          ...question,
          pollId: result.id,
        });
        questions.push(writtenQuestion);
      }
    }
    if (result.id) {
      return {
        ...poll,
        id: result.id,
        questions: questions ? questions : undefined,
      };
    }
    throw result.error;
  }

  async getQuestions(pollId: number): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }

  async getQuestion(questionId: number): Promise<Question> {
    throw new Error("Method not implemented.");
  }

  async createQuestion(question: Question): Promise<Question> {
    const result = await this.insert(
      "question",
      ["poll_id", "text", "seq"],
      [question.pollId, question.text, question.seq]
    );
    let options: Option[];
    if (question.options) {
      options = [];
      for (const option of question.options) {
        const writtenOption = await this.createOption({
          ...option,
          questionId: result.id,
        });
        options.push(writtenOption);
      }
    }
    if (result.id) {
      return {
        ...question,
        id: result.id,
        options: options ? options : undefined,
      };
    }

    throw result.error;
  }

  async getOptions(questionId: number): Promise<Option[]> {
    throw new Error("Method not implemented.");
  }

  async getOption(optionId: number): Promise<Option> {
    throw new Error("Method not implemented.");
  }

  async createOption(option: Option): Promise<Option> {
    const result = await this.insert(
      "option",
      ["question_id", "text", "seq"],
      [option.questionId, option.text, option.seq]
    );
    if (result.id) {
      return { ...option, id: result.id };
    }
    throw result.error;
  }

  private async insert(
    table: string,
    columns: string[],
    values: any[]
  ): Promise<{ id: number; error?: any }> {
    return await new Promise((resolve) => {
      this.db.query(
        `INSERT INTO ${mysql.escapeId(table)} (${columns.map(item=>mysql.escapeId(item)).join(", ")}) VALUES (${values
          .map((item) => mysql.escape(item))
          .join(", ")})`,
        (err, res) => {
          if (err) {
            console.log(err);
            resolve({ id: 0, error: err });
          } else {
            resolve({ id: res.insertId, error: undefined });
          }
        }
      );
    });
  }
}

export default getConnection;
