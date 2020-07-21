export class Reimbursement {
  id: number; // primary key
  author: string; // foreign key -> User, not null
  amount: number; // not null
  dateSubmitted: String; // not null
  dateResolved: String; // not null
  description: string; // not null
  resolver: String; // foreign key -> User
  status: number; // foreign ey -> ReimbursementStatus, not null
  type: number; // foreign key -> ReimbursementType

  constructor(
    id: number,
    author: string,
    amount: number,
    dateSubmitted: String,
    dateResolved: String,
    description: string,
    resolver: String,
    status: number,
    type: number
  ) {
    this.id = id;
    this.author = author;
    this.amount = amount;
    this.dateSubmitted = dateSubmitted;
    this.dateResolved = dateResolved;
    this.description = description;
    this.resolver = resolver;
    this.status = status;
    this.type = type;
  }
}
