import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string
}