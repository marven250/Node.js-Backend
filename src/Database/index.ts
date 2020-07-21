import { Pool } from "pg";

export const connectionPool: Pool = new Pool({
  host: "database-1.cxe8pknkvv4w.us-east-2.rds.amazonaws.com", //"database-1.cxe8pknkvv4w.us-east-2.rds.amazonaws.com", //process.env["PG_HOST"],
  user: "postgres", //process.env["PG_USER"]
  password: "postgres", //process.env["PG_PASSWORD"]
  database: "postgres", //process.env["PG_DATABASE"]
  port: 5432,
  max: 5, //max number of connections
});
