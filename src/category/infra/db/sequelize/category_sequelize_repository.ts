import { Entity } from '../../../../shared/domain/entity'
import { SearchParams } from '../../../../shared/domain/repository/search_params'
import { SearchResult } from '../../../../shared/domain/repository/search_result'
import { Uuid } from '../../../../shared/domain/value_objects/uuid_vo'
import { Category } from '../../../domain/category_entity'
import { ICategoryRepository } from '../../../domain/category_repository'
import { CategoryModel } from './category_model'

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at']

  constructor (private readonly categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    this.categoryModel.create({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    })
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async update(entity: Category): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(entity_id: Uuid): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(entity_id: Uuid): Promise<Category> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }

  async search(props: SearchParams<string>): Promise<SearchResult<Entity>> {
    throw new Error('Method not implemented.')
  }
  getEntity(): new (...args: any[]) => Category {
    throw new Error('Method not implemented.')
  }
}
