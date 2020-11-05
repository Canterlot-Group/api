import {Table, Column, Model, Default, CreatedAt, BeforeCreate} from 'sequelize-typescript';
import {IsUUID, Length, IsAlphanumeric, IsEmail, IsIn} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

// Represents a user
@Table
export default class Account extends Model<Account> {

  @IsUUID(4)
  @Column( {primaryKey: true} )
  id?: string;

  @IsAlphanumeric
  @Length({min: 4, max: 16})
  @Column
  name!: string;

  @Column
  avatar?: Buffer | null;

  @IsEmail
  @Length({min: 6, max: 32})
  @Column
  email!: string;

  @Length({min: 6, max: 64})
  @Column
  password!: string;

  @Default(true)
  @Column
  loginEnabled!: boolean;

  @Default(null)
  @Column
  bannedUntil?: Date | null; // date, or null if not banned

  @Default(null)
  @Column
  bannedReason?: string | null; // reason, or null if not banned

  @Default('regular')
  @IsIn([['regular', 'member', 'administrator']])
  @Column
  accountType!: string;

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
