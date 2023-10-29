import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: 'varchar', length: 255, unique: true})
    title: string;

    @Column({type: 'text'})
    coverLink: string;

    @Column('float')
    averageRating: number;

    @Column('float')
    userRating: number;

    @Column('int')
    followers: number;

    @Column('jsonb')
    systemRequirements: {
        minimum: {
            [key: string]: string | boolean;
        };

        recommended: {
            [key: string]: string | boolean;
        };
    };

    @Column('float')
    userCompilationDuration: number;

    @Column('float')
    averageUserCompilationDuration: number;

    @Column('text', {array: true})
    predecessors: string[];

    @Column('text', {array: true})
    successors: string[];

    @Column('text')
    gameGuide: string;

    @Column('text')
    gameStory: string;

    @Column('text', {array: true})
    platforms: string[];

    @Column({type: 'varchar', length: 50})
    ageRestriction: string;

    @Column('text', {array: true})
    characters: string[];

    @Column('text', {array: true})
    areas: string[];

    @Column('text', {array: true})
    packages: string[];

    @Column('text', {array: true})
    items: string[];

    @Column('text')
    gameBio: string;

    @Column('text', {array: true})
    groups: string[];

    @Column('text', {array: true})
    tags: string[];

    @Column({type: 'date'})
    releaseDate: Date;

    @Column({type: 'varchar', length: 255})
    developer: string;

    @Column({type: 'varchar', length: 255})
    publisher: string;

    @Column('text')
    trivia: string;
}
