# pdf-ts

pdf-ts is a TypeScript library for PDF text extraction. It uses [Mozilla's PDF.js](https://mozilla.github.io/pdf.js) to expose a simple API for text extraction.

```shell
npm i pdf-ts
```

## Examples

Extract text from a PDF.

```ts
import {pdfToText} from 'pdf-ts';
const pdf = await fs.readFile('./path/to/file.pdf');
const text = await pdfToText(pdf);
console.log(text);
```

Extract a list of pages from a PDF.

```ts
import {pdfToPages} from 'pdf-ts';
const pdf = await fs.readFile('./path/to/file.pdf');
const pages = await pdfToPages(pdf);
console.log(pages); // [{page: 1, text: '...'}, {page: 2, text: '...'}, ...]
```

## License

[MIT](LICENSE)

