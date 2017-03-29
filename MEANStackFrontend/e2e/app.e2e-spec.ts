import { MEANStackFrontendPage } from './app.po';

describe('meanstack-frontend App', () => {
  let page: MEANStackFrontendPage;

  beforeEach(() => {
    page = new MEANStackFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
