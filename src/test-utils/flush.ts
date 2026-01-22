export async function flushPromises() {
  // microtask queue
  await Promise.resolve();
  await Promise.resolve();
}

export async function flushAll() {
  // microtasks + 1 macrotask tick
  await flushPromises();
  await new Promise((r) => setTimeout(r, 0));
}
