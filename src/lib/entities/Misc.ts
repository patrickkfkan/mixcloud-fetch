export interface Category {
  type: 'category';
  name: string;
  slug: string;
}

export type CategoryBundleName = string;
export type CategoryBundle = Record<CategoryBundleName, Category[]>;

export interface Country {
  code: string;
  name: string;
}

export interface CountryBundle {
  default: Country | null;
  available: Country[];
}
