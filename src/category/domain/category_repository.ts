import { IRepository } from '../../shared/domain/repository/repository_interface'
import { Uuid } from '../../shared/domain/value_objects/uuid_vo'
import { Category } from './category_entity'

export interface ICategoryRepository extends IRepository<Category, Uuid> {}
