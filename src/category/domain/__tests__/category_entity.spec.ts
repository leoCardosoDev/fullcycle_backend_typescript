import { Uuid } from '../../../shared/domain/value_objects/uuid_vo'
import { Category } from '../category_entity'

describe('Category Entity Unit Test', () => {
  let validateSpy: any
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

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

  describe('category_id field', () => {
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
      expect(validateSpy).toHaveBeenCalledTimes(1)
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
      expect(validateSpy).toHaveBeenCalledTimes(1)
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
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('change command', () => {
    test('should change name', () => {
      const category = Category.create({
        name: 'Movie',
      })
      category.changeName('Movie 2')
      expect(category.name).toBe('Movie 2')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    test('should change description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      })
      category.changeDescription('Movie description 2')
      expect(category.description).toBe('Movie description 2')
      expect(validateSpy).toHaveBeenCalledTimes(2)
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

describe('Category Validator', () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: undefined })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })

      expect(() => Category.create({ name: 12345 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => Category.create({ name: 'a'.repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    test('should an invalid category with description property', () => {
      expect(() => Category.create({ description: 12345 } as any)).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      })
    })

    test('should an invalid category with is_active property', () => {
      expect(() => Category.create({ is_active: 12345 } as any)).containsErrorMessages({
        is_active: [
          'is_active must be a boolean value',
        ]
      })
    })
  })

  describe('change command', () => {
    test('should an invalid category with name property', () => {
      const category = Category.create({
        name: 'Movie',
      })
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.changeName(undefined)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.changeName('')).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })
    })

    test('should an invalid category with description property', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      })
      expect(() => category.changeDescription(12345 as any)).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      })
    })
  })
})
