import { Achievement, User } from '@/lib/schemas/user.schema';

function findAchievement(user: User, achievementName: Achievement) {
  return user.achievements.find(({ name }) => name === achievementName);
}

export { findAchievement };
