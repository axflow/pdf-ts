import { getDocument } from 'pdfjs-dist/legacy/build/pdf.js';
import type { PDFPageProxy } from 'pdfjs-dist/legacy/build/pdf.js';
import { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

/*
 * The following examples influenced this code:
 *
 *   1. https://github.com/mozilla/pdf.js/blob/v2.16.105/examples/node/getinfo.js
 *   2. https://gitlab.com/autokent/pdf-parse/-/blob/v1.1.1/lib/pdf-parse.js
 */

/**
 * Given a PDF, extract and return its text content.
 *
 * @param pdf A buffer containing the PDF contents.
 * @param options
 * @param options.pageSep Optionally specifiy the string used to join pages.
 * @param options.nodeSep Optionally specifiy the string used to join nodes in the document.
 * @returns A string containing the PDF converted to text.
 */
export default async function pdfToText(
  pdf: ArrayBufferLike,
  options?: { pageSep?: string; nodeSep?: string },
): Promise<string> {
  const pages = await pdfToPages(pdf, options);
  const pageSep = getStringOptionOrDefault((options || {}).pageSep, '\n\n');
  return pages.map((page) => page.text).join(pageSep);
}

export type PageType = {
  page: number;
  text: string;
};

/**
 * Given a PDF, extract and return its pages as a list.
 *
 * @param pdf A buffer containing the PDF contents.
 * @param options
 * @param options.nodeSep Optionally specifiy the string used to join nodes in the document.
 * @returns A list of pages objects containing the page number and text content.
 */
export async function pdfToPages(
  pdf: ArrayBuffer,
  options?: { nodeSep?: string },
): Promise<PageType[]> {
  const document = await getDocument(pdf).promise;
  const numPages = document.numPages;

  const pages: PageType[] = [];

  try {
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await document.getPage(pageNum);
      try {
        const nodeSep = getStringOptionOrDefault((options || {}).nodeSep, '\n');
        const text = await extractTextFromPage(page, nodeSep);
        pages.push({ page: pageNum, text: text });
      } catch (error) {
        throw error;
      } finally {
        // Release page resources.
        page.cleanup();
      }
    }
  } catch (error) {
    throw error;
  } finally {
    document.destroy();
  }

  return pages;
}

async function extractTextFromPage(page: PDFPageProxy, sep: string) {
  const content = await page.getTextContent();
  return getTextItems(content.items)
    .map((item) => item.str)
    .join(sep);
}

function getTextItems(items: Array<TextItem | TextMarkedContent>): TextItem[] {
  return items.filter((item: any) => typeof (item as TextItem).str === 'string') as TextItem[];
}

function getStringOptionOrDefault(option: string | undefined, optionDefault: string) {
  return typeof option === 'string' ? option : optionDefault;
}
