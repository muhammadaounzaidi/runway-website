export const directionIds = ["a", "b", "c"] as const;
export type DirectionId = (typeof directionIds)[number];
export const isDirection = (v: unknown): v is DirectionId => directionIds.includes(v as DirectionId);
