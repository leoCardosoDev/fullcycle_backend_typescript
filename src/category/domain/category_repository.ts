import { ISearchableRepository } from '../../shared/domain/repository/repository_interface'
import { SearchParams } from '../../shared/domain/repository/search_params'
import { SearchResult } from '../../shared/domain/repository/search_result'
import { Uuid } from '../../shared/domain/value_objects/uuid_vo'
import { Category } from './category_entity'

export type CategoryFilter = string

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository extends ISearchableRepository<Category, Uuid, CategoryFilter, CategorySearchParams, CategorySearchResult> {}
