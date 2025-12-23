// import { Scorer } from '@mastra/core';

// export const WeatherScorer = new Scorer({
//   name: 'Weather Scorer',
//   description: 'Scores weather query responses',
//   schema: {
//     type: 'object',
//     properties: {
//       accuracy: {
//         type: 'number',
//         minimum: 0,
//         maximum: 1,
//         description: 'How accurate is the weather information?',
//       },
//       helpfulness: {
//         type: 'number',
//         minimum: 0,
//         maximum: 1,
//         description: 'How helpful is the response?',
//       },
//     },
//     required: ['accuracy', 'helpfulness'],
//   },
//   handler: async ({ accuracy, helpfulness }) => {
//     const score = (accuracy + helpfulness) / 2;
//     return {
//       score,
//       metadata: { accuracy, helpfulness },
//     };
//   },
// });
