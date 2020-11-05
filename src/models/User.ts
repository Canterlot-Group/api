import {Table, Column, Model, Default, CreatedAt, BeforeCreate, Scopes} from 'sequelize-typescript';
import {IsUUID, Length, IsAlphanumeric, IsEmail, IsIn, HasMany, BelongsToMany} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Token } from './Token';
import { Station } from './Station';
import { UserStation } from './UserStation';

export interface UserAttributes {
  id?: string
  name: string
  avatar?: Buffer | null
  email: string
  password: string
  loginEnabled: boolean
  bannedUntil?: Date | null
  bannedReason?: string | null
  accountType: string
  createdAt: Date
}

@Scopes(() => ({
  tokens: {
    include: [{
      model: Token
    }]
  },
  memberIn: {
    include: [{
      model: Station,
      through: {attributes: ['id']}
    }]
  }
}))

// Represents an account belonging to a user.
@Table
export class User extends Model<User, UserAttributes> {

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

  @HasMany(() => Token)
  tokens: Token[];

  @BelongsToMany(() => Station, () => UserStation)
  memberIn: Station[];

  @BeforeCreate
  static beforeCreateUser(user: any) {

    // Hash password
    const salt = bcrypt.genSaltSync(12);
    if (user.password)
      user.password = bcrypt.hashSync(user.password, salt);

    // Generate and set UUIDv4 as Account ID
    user.id = uuidv4();

  }

}
