import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Paslon } from "./Paslon"
import { Article } from "./Article"


@Entity({ name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    username: string

    @Column({ length: 100 })
    password: string

    @Column({ length: 100 })
    fullName: string

    @Column({ nullable: true, length: 100 })
    address: string

    @Column({ nullable: true, length: 10 })
    gender: string

    @ManyToOne(type => Paslon, paslon => paslon.voter, {
        cascade: true
    })
    paslon: Paslon

    @OneToMany(type => Article, article => article.author)
    articles: Article[]

    @Column({ default: false })
    isAdmin: boolean

}