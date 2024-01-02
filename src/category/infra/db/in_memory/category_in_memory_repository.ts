import { InMemorySearchableRepository } from '../../../../shared/infra/db/in_memory/in_memory_repository'
import { Uuid } from '../../../../shared/domain/value_objects/uuid_vo'
import { Category } from '../../../domain/category_entity'
import { SortDirection } from '../../../../shared/domain/repository/search_params'
import { CategoryFilter, ICategoryRepository } from '../../../domain/category_repository'

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at']
  protected async applyFilter(items: Category[], filter: CategoryFilter): Promise<Category[]> {
    if (!filter) {
      return items
    }
    return items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))
  }
  protected applySort (items: Category[], sort: string | null, sort_dir: SortDirection | null) {
    return sort ? super.applySort(items, sort, sort_dir) : super.applySort(items, 'created_at', 'desc')
  }
  getEntity(): new (...args: any[]) => Category {
    return Category
  }
}
