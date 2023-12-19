import { Uuid } from '../../../shared/domain/value_objects/uuid_vo'
import { Category } from '../category_entity'

describe('Category Entity Unit Test', () => {
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({ name: 'Movie' })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })
  
    test('should create a new category with all values', () => {
      const created_at = new Date()
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBe(created_at)
    })
  
    test('should create a new category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('cayegory_id field', () => {
    const arrange = [
      { category_id: null }, { category_id: undefined }, { category_id: new Uuid()}
    ]
    test.each(arrange)('should if category_id is %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any,
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
    })
  })

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('change command', () => {
    test('should change name', () => {
      const category = Category.create({
        name: 'Movie',
      })
      category.changeName('Movie 2')
      expect(category.name).toBe('Movie 2')
    })

    test('should change description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      })
      category.changeDescription('Movie description 2')
      expect(category.description).toBe('Movie description 2')
    })

    test('should change is_active', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
      })
      category.activate()
      expect(category.is_active).toBe(true)
    })
  })
})
