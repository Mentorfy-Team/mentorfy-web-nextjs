export const DefaultCertificate = {
  url: '/default-certificate.pdf',
  default_certificate: 'true',
  student: {
    name: {
      pageX: '-6',
      pageY: '289',
      fontSize: '20',
    },
    finishedAt: {
      pageX: '1',
      pageY: '341',
      fontSize: '14',
    },
  },
  course: {
    courseName: {
      pageX: '255',
      pageY: '324',
      fontSize: '14',
    },
    mentorName: {
      pageX: '-3',
      pageY: '395',
      fontSize: '16',
    },
  },
} as ProductTypes.CertificateBuilder;
