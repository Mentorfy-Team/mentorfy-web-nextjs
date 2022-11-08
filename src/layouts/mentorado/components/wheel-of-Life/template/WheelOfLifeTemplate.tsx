import Heatmap from '../Heatmap';

const generateData = (areas: string[], input) => {
  // for each area, create a new object with the area name and the rating
  const data = [];
  for (let i = 0; i < areas.length; i++) {
    for (let j = 0; j < 10; j++) {
      data.push({
        value: input[i]?.rating > j ? 1 : 0,
        area: areas[i],
        rating: j,
      });
    }
  }
  return data;
};

export default function PDFReader(taskData, input) {
  return (
    <Heatmap
      data={generateData(
        taskData.map((task) => task.title),
        input,
      )}
    />
  );
}
