// INTERFACES --------------------------//
interface SeachByKeywordParams {
  keyword: string;
}

interface CheckSearchResultsParams {
  keyword: string;
}
//-------------------------------------//

class SearchPage {
  get searchInput(): string {
    return '#search';
  }

  get resultPageTitle(): string {
    return '[data-ui-id="page-title-wrapper"]'
  }

  get relatedSearchTermsItems(): string {
    return 'dl > dd';
  }

  get productItems(): string {
    return '.product-items > li';
  }

  get noticeMessage(): string {
    return '.notice';
  }

  // FUNCTIONS --------------------------//

  /**
   * Search by keyword
   *
   * @param {object} params
   * @param {string} params.keyword - Keyword to search
   */
  searchByKeyword(params: SeachByKeywordParams) {
    const { keyword } = params;
    cy.get(this.searchInput).type(`${keyword} {enter}`);
    cy.url().should('include', `result/?q=${keyword}`);
    cy.get(this.resultPageTitle).should('contain.text', keyword);
  }

  /**
   * Check search results
   *
   * @param {object} params
   * @param {string} params.keyword - Keyword to search
   */
  checkSearchResults(params: CheckSearchResultsParams) {
    cy.get(this.relatedSearchTermsItems).each(terms => {
      cy.wrap(terms).invoke('text').then(text => {
        expect(text.toLowerCase()).to.contain(params.keyword);
      });
    })

    // Check if the product items are listed
    cy.get(this.productItems).should('have.length.greaterThan', 0);
  }
}

export default new SearchPage();
