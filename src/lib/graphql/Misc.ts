const CATEGORY_LIST_QUERY = `
  query CategoryListQuery {
    viewer {
      categories {
        music {
          name
          slug
        }
        talk {
          name
          slug
        }
      }
    }
  }
`;

export const COUNTRY_LIST_QUERY = `
  query CategoryListQuery {
    viewer {
      countries: localisation {
        currentCountry {
          code
          name
        }
        availableCountries {
          code
          name
        }
      }
    }
  }
`;

export type MiscQueryVariablesOf<T> =
  T extends 'CategoryListQuery' ? CategoryListQueryVariables :
  T extends 'CountryListQuery' ? CountryListQueryVariables :
  never;

export type CategoryListQueryVariables = null;
export type CountryListQueryVariables = null;

const MISC_QUERIES = {
  CategoryListQuery: CATEGORY_LIST_QUERY,
  CountryListQuery: COUNTRY_LIST_QUERY
};

export const MiscGraphQL = {
  getQueries: () => MISC_QUERIES
};
