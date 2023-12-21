import { InMemoryRepository } from '../../../shared/infra/db/in_memory/in_memory_repository'
import { Uuid } from '../../../shared/domain/value_objects/uuid_vo'
import { Category } from '../../domain/category_entity'

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid> {
  getEntity(): new (...args: any[]) => Category {
    return Category
  }
}
