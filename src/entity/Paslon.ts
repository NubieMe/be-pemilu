import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm"
import { Party } from "./Party"
import { User } from "./User"

@Entity({ name: "paslons"})
export class Paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ length: 255 })
    image: string
    
    @Column({ type: String, array: true })
    visimisi: string[]

    @OneToMany(type => Party, party => party.paslon, {
    })
    coalition: Party[]

    @OneToMany(type => User, user => user.paslon)
    voter: User[]

}