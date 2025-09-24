import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../../../domain/entities/product.entity';

@Entity({ name: 'products' })
export class ProductOrmEntity implements ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  category: string;

  @Column()
  color: string;

  @Column()
  currency: string;

  @Column('float')
  price: number;

  @Column('int')
  stock: number;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
