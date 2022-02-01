import DBConnection from "./DBConnection";
import mysql from "mysql";
import Poll from "../Poll/Poll";

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
  async getPoll(pollId: number): Promise<Poll> {
    throw new Error("Method not implemented.");
  }

  async createPoll(poll: Poll): Promise<Poll> {
    const result = await this.insert("poll", ["name"], [poll.name]);
    if (result.id) {
      return { ...poll, id: result.id };
    }
    throw result.error;
  }

  private async insert(
    table: string,
    columns: string[],
    values: string[]
  ): Promise<{ id: number; error?: any }> {
    return await new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values
          .map((item) => `'${item}'`)
          .join(", ")})`,
        (err, res) => {
          if (err) {
            console.log(err);
            reject({ id: 0, error: err });
          } else {
            resolve({ id: res.insertId, error: undefined });
          }
        }
      );
    });
  }
}

export default getConnection;
