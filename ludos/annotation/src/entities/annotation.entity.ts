import { Entity, Column, PrimaryColumn } from 'typeorm';
export interface AnnotationTarget {
  source: string;
  selector?: {
    start: number;
    end: number;
  };
  type?: string;
  id?: string;
  format?: string;
}
@Entity("annotations")
export class Annotation {
  @Column({default: "http://www.w3.org/ns/anno.jsonld"})
  "@context": string;
  @PrimaryColumn()
  id: string;
  @Column({default: "Annotation"})
  type: string;
  @Column()
  body: string;
  @Column({type: "jsonb", default: {}})
  target: AnnotationTarget;
}