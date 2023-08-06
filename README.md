# pdf-ts

pdf-ts is a TypeScript library for PDF text extraction. It uses Mozilla's PDF-js but exposes a simple and clean API for text extraction.

## Example

```ts
import {pdfToText} from 'pdf-ts';
const pdf = await fs.readFile('./path/to/file.pdf');
const text = await pdfToText(pdf);
console.log(text);
```

