const input = await Deno.readTextFile('./input.txt');

function normalize(input: string) {
  const colOne: number[] = [];
  const colTwo: number[] = [];
  input.split('\n').forEach((item) => {
    const [one, two] = item.split('   ');
    colOne.push(Number(one));
    colTwo.push(Number(two));
  });

  return { colOne, colTwo };
}

function solveOne(assignments: string): number {
  const { colOne, colTwo } = normalize(assignments);
  colOne.sort((a, b) => a - b);
  colTwo.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < colOne.length; i++) {
    sum += Math.abs(colOne[i] - colTwo[i]);
  }

  return sum;
}

function solveTwo(assignments: string): number {
  const { colOne, colTwo } = normalize(assignments);

  const scores = colTwo.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  let sum = 0;
  for (let i = 0; i < colOne.length; i++) {
    if (scores[colOne[i]]) {
      sum += colOne[i] * scores[colOne[i]];
    }
  }

  return sum;
}

const p1 = solveOne(input);
const p2 = solveTwo(input);
const output = `-----PART ONE-----

${p1}

----PART TWO------

${p2}
`;

const encoder = new TextEncoder();
const text = encoder.encode(output);
Deno.writeFileSync('./output.txt', text);
