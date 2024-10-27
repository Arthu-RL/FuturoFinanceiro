import { z } from 'zod';

const tutorialSchema = z.object({ isTutorialWindowActive: z.boolean() });
type Tutorial = z.infer<typeof tutorialSchema>;

export type { Tutorial };
export { tutorialSchema };
