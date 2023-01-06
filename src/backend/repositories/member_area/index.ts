import PDFDocument from 'pdfkit';
import addTextbox from 'textbox-for-pdfkit';
import { HttpServer } from '~/services/HttpClient';

// Header
const maxWidth = 790 * 2;
const maxHeight = 590 * 2;
export const CreateCertificate = async ({
  certificate,
  texts: { course, student },
  res,
}) => {
  const response = await HttpServer.get(certificate, {
    responseType: 'arraybuffer',
  });
  // a promise resolve
  const promise = new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      //layout: 'landscape',
      size: [maxWidth, maxHeight],
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });

    //doc.pipe(fs.createWriteStream('output.pdf'));

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));

    // Helper to move to next line
    function jumpLine(doc, lines) {
      for (let index = 0; index < lines; index++) {
        doc.moveDown();
      }
    }

    //doc.pipe(fs.createWriteStream('output.pdf'));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill('transparent');

    doc.fontSize(10);

    doc.image(
      Buffer.from(response.data, 'utf-8'),
      doc.page.width / 2 - maxWidth / 2,
      0,
      {
        fit: [maxWidth, maxHeight],
        align: 'center',
      },
    );

    if (student) {
      if (student.document) {
        const { text, pageX, pageY, fontSize } = student.document;
        AddText(doc, text, pageX, pageY, fontSize);
      }
      if (student.finishedAt) {
        const { text, pageX, pageY, fontSize } = student.finishedAt;
        AddText(doc, text, pageX, pageY, fontSize);
      }
      if (student.name) {
        const { text, pageX, pageY, fontSize } = student.name;
        AddText(doc, text, pageX, pageY, fontSize);
      }
      if (course.name) {
        const { text, pageX, pageY, fontSize } = course.name;
        AddText(doc, text, pageX, pageY, fontSize);
      }
      if (course.owner) {
        const { text, pageX, pageY, fontSize } = course.owner;
        AddText(doc, text, pageX, pageY, fontSize, true);
      }
    }

    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);

      resolve(pdfData);
    });

    doc.end();
  });

  return promise;
};

const AddText = (doc, text, x, y, fontSize = 12, handWrite = false) => {
  const calcX = -90 + parseInt(x) * 2;
  const calcY = (parseInt(y) + 28) * 2;

  //const AdjustmentX = fontSize * -3.5;
  const AdjustmentX = calcX - 120;

  addTextbox(
    [
      {
        text: text,
        font: handWrite
          ? require('~/../public/fonts/Corinthia-Regular.ttf')
          : 'Helvetica',
      },
    ],
    doc,
    maxWidth / 2 + AdjustmentX,
    calcY,
    400,
    {
      color: 'black',
      fontSize: fontSize * 2,
      lineHeight: 1,
      align: 'center',
    },
  );
};
