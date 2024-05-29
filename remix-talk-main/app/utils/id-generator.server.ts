function* idGenerator(initialId: number = 6) {
  let currentId = initialId;
  while (true) {
    yield currentId++;
  }
}

const idGen = idGenerator();

export default function generateId() {
  const nextValue = idGen.next().value as number;
  return nextValue.toString();
}
