import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Paslon } from "./Paslon"

@Entity({ name: "parties"})
export class Party {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    leader: string

    @Column({ length: 255 })
    image: string

    @Column({ type: String, array: true, nullable: true })
    visimisi: string[]

    @Column({ nullable: true, length: 100 })
    address: string

    @ManyToOne(type => Paslon, user => user.name, {
        cascade: true
    })
    paslon: Paslon

}