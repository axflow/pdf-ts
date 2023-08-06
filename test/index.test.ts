import Path from 'node:path';
import fs from 'node:fs/promises';

import { pdfToText, pdfToPages } from '../src';

describe('pdf-ts', () => {
  describe('pdfToText', () => {
    it('can extract text from a pdf', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const text = await pdfToText(pdf);

      expect(text).toEqual(`PDF Test document

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.

Sub heading

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
est laborum.

Page 2

Page two text
1.
${' '}
Bullet point 1
2.
${' '}
Bullet point 2
3.
${' '}
Bullet point 3`);
    });

    it('can extract text from a pdf with an specified page separator', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const text = await pdfToText(pdf, { pageSep: '\n\n---PAGE SEP---\n\n' });

      expect(text).toEqual(`PDF Test document

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.

Sub heading

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
est laborum.

---PAGE SEP---

Page 2

Page two text
1.
${' '}
Bullet point 1
2.
${' '}
Bullet point 2
3.
${' '}
Bullet point 3`);
    });
  });

  describe('pdfToPages', () => {
    it('can extract a list of pages from a pdf', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const [page1, page2] = await pdfToPages(pdf);

      expect(page1.page).toBe(1);
      expect(page1.text).toEqual(`PDF Test document

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.

Sub heading

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
est laborum.`);

      expect(page2.page).toBe(2);
      expect(page2.text).toEqual(`Page 2

Page two text
1.
${' '}
Bullet point 1
2.
${' '}
Bullet point 2
3.
${' '}
Bullet point 3`);
    });
  });
});
