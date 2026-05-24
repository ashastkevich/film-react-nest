import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  rating: number;

  @Column('varchar', { length: 255 })
  director: string;

  @Column('simple-array')
  tags: string[];

  @Column('varchar', { length: 255 })
  image: string;

  @Column('varchar', { length: 255 })
  cover: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.filmId)
  schedule: Schedule[];
}
