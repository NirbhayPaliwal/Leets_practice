import { LeetCode } from "leetcode-query";

const leetcode = new LeetCode();
const user = await leetcode.user("nirbhaypaliwal");
console.log(user.upcomingBadges);
