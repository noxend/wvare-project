const randomColor = () => {
  const colors = [
    '#b71c1c',
    '#558B2F',
    '#EF6C00',
    '#00897B',
    '#0288D1',
    '#5E35B1',
    '#C2185B',
    '#388E3C',
    '#3949AB',
    '#7B1FA2'
  ];

  const randomIndex = Math.floor(colors.length * Math.random());
  return colors[randomIndex];
};

module.exports = randomColor;
