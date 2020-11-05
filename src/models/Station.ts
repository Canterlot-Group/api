import {Table, Column, Model, UpdatedAt, CreatedAt, BeforeCreate, Scopes} from 'sequelize-typescript';
import {IsUUID, Length, IsAlphanumeric, IsIn, IsInt, Is, BelongsToMany} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { UserStation } from './UserStation';

interface StationAttributes {
  id?: string
  name: string
  description: string
  logo?: Buffer | null
  streamFormat: string
  streamBitrate: number
  streamSampleRate: number
  createdAt: Date
  updatedAt: Date
}

@Scopes(() => ({
  members: {
    include: [{
      model: User,
      through: {attributes: ['id']}
    }]
  }
}))

// Represents a media source/radio station/stream
@Table
export class Station extends Model<Station, StationAttributes> {

  @IsUUID(4)
  @Column( {primaryKey: true} )
  id?: string;

  @IsAlphanumeric
  @Length({min: 2, max: 24})
  @Column
  name!: string;

  @Length({min: 0, max: 1024})
  @Column
  description!: string;

  @Column
  logo?: Buffer | null;

  @IsIn([['MP3', 'OGG', 'FLAC', 'OPUS']])
  @Column
  streamFormat!: string;

  @IsInt
  @Is('acceptable bitrate', val =>
    [64, 96, 128, 192, 220, 320].includes(val))
  @Column
  streamBitrate!: number;

  @IsInt
  @Is('acceptable sample rate', val => [44100, 48000].includes(val))
  @Column
  streamSampleRate!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsToMany(() => User, () => UserStation)
  members: User[];

  @BeforeCreate
  static beforeCreateStation(station: any) {

    // Generate and set UUIDv4 as Station ID
    station.id = uuidv4();

  }

}
