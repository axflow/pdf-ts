import Path from 'node:path';
import fs from 'node:fs/promises';

import { pdfToText, pdfToPages } from '../src';

describe('pdf-ts', () => {
  describe('pdfToText', () => {
    it('can extract text from a pdf', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const text = await pdfToText(pdf);

      expect(text).toContain('PDF Test document');
      expect(text).toContain(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      );
      expect(text).toContain(
        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      );
      expect(text).toContain('laboris nisi ut aliquip ex ea commodo consequat.');
      expect(text).toContain('Sub heading');
      expect(text).toContain(
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      );
      expect(text).toContain(
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id',
      );
      expect(text).toContain('est laborum.');

      expect(text).toContain('Page 2');
      expect(text).toContain('Page two text');

      expect(text).toContain('1. \n \nBullet point 1');
      expect(text).toContain('2. \n \nBullet point 2');
      expect(text).toContain('3. \n \nBullet point 3');
    });

    it('can extract text from a pdf with an specified page separator', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const text = await pdfToText(pdf, { pageSep: '\n\n---PAGE SEP---\n\n' });

      expect(text).toContain('PDF Test document');
      expect(text).toContain(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      );
      expect(text).toContain(
        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      );
      expect(text).toContain('laboris nisi ut aliquip ex ea commodo consequat.');
      expect(text).toContain('Sub heading');
      expect(text).toContain(
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      );
      expect(text).toContain(
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id',
      );
      expect(text).toContain('est laborum.');

      expect(text).toContain('\n\n---PAGE SEP---\n\n');

      expect(text).toContain('Page 2');
      expect(text).toContain('Page two text');

      expect(text).toContain('1. \n \nBullet point 1');
      expect(text).toContain('2. \n \nBullet point 2');
      expect(text).toContain('3. \n \nBullet point 3');
    });
  });

  describe('pdfToPages', () => {
    it('can extract a list of pages from a pdf', async () => {
      const pdf = await fs.readFile(Path.resolve(__dirname, 'test.pdf'));
      const [page1, page2] = await pdfToPages(pdf);

      expect(page1.page).toBe(1);
      expect(page1.text).toContain('PDF Test document');
      expect(page1.text).toContain(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      );
      expect(page1.text).toContain(
        'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      );
      expect(page1.text).toContain('laboris nisi ut aliquip ex ea commodo consequat.');
      expect(page1.text).toContain('Sub heading');
      expect(page1.text).toContain(
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      );
      expect(page1.text).toContain(
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id',
      );
      expect(page1.text).toContain('est laborum.');

      expect(page2.page).toBe(2);
      expect(page2.text).toContain('Page 2');
      expect(page2.text).toContain('Page two text');
      expect(page2.text).toContain('1. \n \nBullet point 1');
      expect(page2.text).toContain('2. \n \nBullet point 2');
      expect(page2.text).toContain('3. \n \nBullet point 3');
    });
  });
});
