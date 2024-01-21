import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "articles"})
export class Article {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    title: string

    @Column("text")
    description: string
    
    @Column({ nullable: true, length: 255 })
    image: string

    @ManyToOne(type => User, user => user.fullName, {
        cascade: true
    })
    author: User

    @Column({ default: () => "NOW()" })
    createdAt: Date

}