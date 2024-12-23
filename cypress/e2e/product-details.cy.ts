import ProductDetailsPage from '../page-objects/product-details.page';
import SearchPage from '../page-objects/search-product.page';

const productDetailsPage = ProductDetailsPage
const searchPage = SearchPage

describe('Product Details Page test', () => {
  beforeEach(() => {
    cy.accessWebPage();
  });

  it('View product details', () => {
    searchPage.searchByKeyword({ keyword: 'shirt' });

    productDetailsPage.checkProductDetails();
  });

  it('Add a product to the cart', () => {
    // Select a product
    productDetailsPage.addProductToCart();

    // Check if the product was added to the cart
    productDetailsPage.checkProductAddedToCart()
  });
})