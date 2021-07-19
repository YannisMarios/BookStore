import { Category } from 'common';
import { categoriesMockData } from '../mocks/categories.mocks';

export class CategoryService {
  private readonly categories: Category[];
  static instance: CategoryService;

  private constructor() {
    this.categories = categoriesMockData;
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getCategory(id: string): Category | undefined {
    return this.categories.find((x) => x.id === id);
  }

  public searchCategory(term: string): Category[] {
    return this.categories.filter((category) => category.name.includes(term));
  }
}
