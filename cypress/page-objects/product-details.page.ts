import SearchPage from './search-product.page';

const searchPage = SearchPage;

class ProductDetailsPage {
  get productName(): string {
    return '.product-item-name > a';
  }

  get productPrice(): string {
    return '.price-wrapper';
  }

  get productRating(): string {
    return '.rating-result';
  }

  get productPageTitle(): string {
    return '[data-ui-id="page-title-wrapper"]'
  }

  get productInfo(): string {
    return '.product-info-main';
  }

  get size(): string {
    return '.size';
  }

  get color(): string {
    return '.color';
  }

  get attributeOptions(): string {
    return '.swatch-option';
  }

  get chartLoader(): string {
    return '.loader > img';
  }

  get cartCounter(): string {
    return '.counter-number';
  }

  // FUNCTIONS -------------------------------------//

  /**
   * Check product details
   */
  checkProductDetails() {
    const productDetails: { name: string, price: string, rating: string} = {
      name: '',
      price: '',
      rating: ''
    }

    cy.get(searchPage.productItems).first().within(() => {
      const detaisl: string[] = [
        this.productName,
        this.productPrice,
        this.productRating
      ]
      detaisl.forEach((detail: string, index: number) => {
        cy.get(detail).invoke('text').then((text: string) => {
          const textCleaned: string = text.trim();
          if (index === 0) {
            productDetails.name = textCleaned;
          } else if (index === 1) {
            productDetails.price = textCleaned;
          } else {
            productDetails.rating = textCleaned;
          }
        })
      })
    }).click();

    cy.wait(1000)

    cy.then(() => {
      const productReference: string = productDetails.name.toLowerCase().replace(/ /g, '-');
      cy.url().should('include', productReference);

      const detailsAndValues = [
        { detail: this.productPageTitle, value: productDetails.name },
        { detail: this.productPrice, value: productDetails.price },
        { detail: this.productRating, value: productDetails.rating }
      ]
      detailsAndValues.forEach(({ detail, value }: { detail: string, value: string}) => {
        cy.get(this.productInfo).find(detail).should('contain.text', value);
      });
    });
  }

  /**
   * Add product to cart
   */
  addProductToCart() {
    // Select a product
    cy.get(searchPage.productItems).first().click();
    cy.get(this.productPageTitle).should('be.visible', {setTimeout: 5000});

    // Select product attributes
    cy.get(this.productInfo).within(() => {
      cy.get(this.size).find(this.attributeOptions).eq(3).click();
      cy.get(this.color).find(this.attributeOptions).eq(1).click();
    });

    cy.contains('button', 'Add to Cart').click(); // Add product to cart
  }

  /**
   * Check if the product was added to the cart
   */
  checkProductAddedToCart() {
    cy.get(this.chartLoader).should('not.exist', { setTimeout: 5000 });
    cy.get(this.cartCounter).should('not.eq', '0');
  }
}

export default new ProductDetailsPage();
