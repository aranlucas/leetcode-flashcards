const petKeys = {
  all: ["pets"] as const,
  detail: (id: string) => [...petKeys.all, id] as const,
};

export default petKeys;
