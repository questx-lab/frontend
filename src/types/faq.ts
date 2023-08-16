export type FaqType = {
  question: string
  answer: string
}

export const FAQs: FaqType[] = [
  {
    question: 'What is XQuest?',
    answer:
      'XQuest is a platform built for passionate community supporters. Community members earns rewards by completing quests setup by community ownner. X a Quest, Earn a rewards',
  },
  {
    question: 'How can I earn rewards on XQuest?',
    answer:
      'Sign up on our platform, complete a quest from a community that you support. After your quest claim is approved (either automatically or through review), you will get a reward based on the type of completed quests.',
  },
  {
    question: 'What are the type of rewards on XQuest?',
    answer: '',
  },
  {
    question: 'What is community lottery?',
    answer: `The lottery is an event created by project owner for users to convert their XQuest points to other rewards (often a stable coin like USDT).

Community members buy lottery tickets using their XQuest points. The more points they accumulate, the more ticket they can buy`,
  },
]
