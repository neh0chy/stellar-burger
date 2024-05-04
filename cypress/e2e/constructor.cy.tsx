import Cypress from 'cypress';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
const mock_bun_id = '643d69a5c3f7b9001cfa093c';
const mock_main_id = '643d69a5c3f7b9001cfa0941';

beforeEach('Подмена запроса ингредиентов при начале тестов', () => {
  cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BURGER_API_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BURGER_API_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BURGER_API_URL}/orders`, {
    fixture: 'order.json'
  });
  cy.visit('/');
});

describe('Проверка ингредиентов', () => {
  it('Проверка добавления ингредиента в конструктор', () => {
    cy.get(`[data-cy="${mock_bun_id}"]`).find('button').click();
    cy.get(`[data-cy="${mock_main_id}"]`).find('button').click();
    cy.get('.constructor-element').contains('Краторная булка N-200i');
    cy.get('.constructor-element').contains(
      'Биокотлета из марсианской Магнолии'
    );
  });
});

describe('Проверка открытия модального окна с деталями ингредиента', () => {
  it('Открытие модального окна', () => {
    cy.get('#modals').should('be.empty');
    cy.get(`[data-cy="${mock_bun_id}"]`).find('a').click();
    cy.get('#modals').should('be.not.empty');
    cy.get('#modals').find('h3').contains('Краторная булка N-200i');
  });

  it('Проверка закрытия модального окна', () => {
    cy.get('#modals').should('be.empty');
    cy.get(`[data-cy="${mock_bun_id}"]`).find('a').click();
    cy.get('#modals').should('be.not.empty');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
  });

  it('Проверка закрытия модального окна по оверлею', () => {
    cy.get('#modals').should('be.empty');
    cy.get(`[data-cy="${mock_bun_id}"]`).find('a').click();
    cy.get('#modals').should('be.not.empty');
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    cy.get('#modals').should('be.empty');
  });
});

describe('Проверка создания заказа', () => {
  beforeEach('Проверка создания фейковых токенов', () => {
    window.localStorage.setItem('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });

  it('Проверка добавления ингредиента в конструктор', () => {
    cy.get(`[data-cy="${mock_bun_id}"]`).find('button').click();
    cy.get(`[data-cy="${mock_main_id}"]`).find('button').click();
    cy.get(`[data-cy='order-submit-button']`).click();
    cy.get('#modals').find('h2').contains('38899');
  });

  afterEach('Проверка очистки хранилища', () => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });
});
