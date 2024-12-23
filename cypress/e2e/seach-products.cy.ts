import SearchPage from '../page-objects/search-product.page';

const searchPage = SearchPage;

describe('Search Products Test', () => {
  beforeEach(() => {
    cy.accessWebPage();
  });

  afterEach(() => {
    cy.clearAllCookies();
  });

  it('Search for valid keyword', () => {
    const keyword: string = 't-shirt';
    // Search by keyword
    searchPage.searchByKeyword({ keyword });

    // Validate the search result
    searchPage.checkSearchResults({ keyword });
  });

  it('Search without results', () => {
    searchPage.searchByKeyword({ keyword: 'motorcycle' });

    // Validate the search result
    cy.get(searchPage.noticeMessage).should('be.visible')
      .and('contain.text', 'Your search returned no results.');
  });
});
