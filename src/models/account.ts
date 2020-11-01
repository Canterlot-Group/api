import {Table, Column, Model, CreatedAt, BeforeCreate} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

@Table
export default class Account extends Model<Account> {

  @Column( {primaryKey: true} )
  id?: string;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  loginEnabled!: boolean;

  @Column
  bannedUntil?: Date | null; // date, or null if not banned

  @Column
  bannedReason?: string | null;

  @CreatedAt
  @Column
  createdAt!: Date;

  @BeforeCreate
  static beforeCreateAccount(account: any) {

    // Hash password
    const salt = bcrypt.genSaltSync(12);
    if (account.password)
      account.password = bcrypt.hashSync(account.password, salt);

    // Generate and set UUIDv4 as Account ID
    account.id = uuidv4();

  }

}
