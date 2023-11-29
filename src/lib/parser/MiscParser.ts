import { CategoryBundle, Country, CountryBundle } from '../entities/Misc.js';
import ObjectHelper from '../utils/ObjectHelper.js';
import BaseParser from './BaseParser.js';

export default class MiscParser extends BaseParser {

  static parseCategories(data: any): CategoryBundle {
    const categories = ObjectHelper.getProperty(data, 'data.viewer.categories');
    if (categories) {
      const result: CategoryBundle = {};
      if (typeof categories === 'object') {
        for (const [ k, v ] of Object.entries(categories)) {
          result[k] = [];
          if (Array.isArray(v)) {
            v.forEach((category) => {
              if (ObjectHelper.hasProperty(category, 'name', 'slug')) {
                result[k].push({
                  type: 'category',
                  name: category.name,
                  slug: category.slug
                });
              }
            });
          }
        }
      }
      return result;
    }

    this.throwNoEntryPointError('categories');
  }

  static parseCountries(data: any): CountryBundle {
    const countries = ObjectHelper.getProperty(data, 'data.viewer.countries');
    if (countries) {
      const result: CountryBundle = {
        default: null,
        available: []
      };
      if (ObjectHelper.hasProperty(countries, 'currentCountry')) {
        result.default = this.parseCountry(countries.currentCountry);
      }
      if (ObjectHelper.hasProperty(countries, 'availableCountries') && Array.isArray(countries.availableCountries)) {
        result.available = countries.availableCountries.reduce<Country[]>((result, country) => {
          const parsed = this.parseCountry(country);
          if (parsed) {
            result.push(parsed);
          }
          return result;
        }, []);
      }
      return result;
    }

    this.throwNoEntryPointError('countries');
  }

  protected static parseCountry(country: any): Country | null {
    if (!ObjectHelper.hasProperty(country, 'code', 'name')) {
      return null;
    }
    return {
      code: country.code,
      name: country.name
    };
  }

}
