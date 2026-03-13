export const mockQuestions = {
  reading: [
    {
      id: 1,
      section: 'reading',
      passage: `In a study published in 2023, marine biologist Dr. Elena Marcos found that certain deep-sea organisms near hydrothermal vents exhibit bioluminescence patterns previously undocumented. Her team observed that these patterns intensified during periods of increased volcanic activity, suggesting a possible link between geothermal energy output and biological light production.`,
      attribution: `Adapted from "Deep Ocean Frontiers," Pacific Science Quarterly, 2023`,
      question: `Based on the passage, which choice best describes Dr. Marcos's primary finding?`,
      choices: [
        {
          letter: 'A',
          text: 'Deep-sea organisms produce light only near hydrothermal vents.'
        },
        {
          letter: 'B',
          text: 'Some deep-sea organisms display bioluminescence patterns that correlate with volcanic activity.'
        },
        {
          letter: 'C',
          text: 'Volcanic activity is the sole cause of bioluminescence in ocean environments.'
        },
        {
          letter: 'D',
          text: 'Dr. Marcos\'s research conclusively proves a causal relationship between geothermal energy and biological light.'
        }
      ],
      correctAnswer: 'B',
      skill: 'Information & Ideas',
      explanation: `**Choice B is correct.** The passage states that Dr. Marcos found organisms with bioluminescence patterns that "intensified during periods of increased volcanic activity," establishing a correlation. Choice C (your answer) is too strong — the passage says "suggesting a possible link," not that volcanic activity is the "sole cause." On the SAT, watch for answer choices that use absolute language ("only," "sole," "conclusively") when the passage uses hedging language ("suggesting," "possible").`
    },
    {
      id: 2,
      section: 'reading',
      passage: `The concept of "flow state" was first described by psychologist Mihaly Csikszentmihalyi in the 1970s. Flow occurs when a person becomes fully immersed in an activity, experiencing complete concentration and a sense of effortless control. Research indicates that achieving flow requires a balance between the challenge level of a task and one's skill level—too easy, and boredom sets in; too difficult, and anxiety emerges.`,
      attribution: `Adapted from "Psychology of Optimal Experience," 2020`,
      question: `According to the passage, what condition is necessary for achieving flow state?`,
      choices: [
        {
          letter: 'A',
          text: 'The activity must be extremely challenging to create engagement.'
        },
        {
          letter: 'B',
          text: 'A person must have extensive prior experience with the activity.'
        },
        {
          letter: 'C',
          text: 'There must be an appropriate match between task difficulty and personal skill level.'
        },
        {
          letter: 'D',
          text: 'The activity should be simple enough to prevent any feelings of anxiety.'
        }
      ],
      correctAnswer: 'C',
      skill: 'Information & Ideas',
      explanation: `**Choice C is correct.** The passage explicitly states that "achieving flow requires a balance between the challenge level of a task and one's skill level." This directly supports choice C.`
    },
    {
      id: 3,
      section: 'reading',
      passage: `During the Renaissance, artists began to employ mathematical principles of perspective to create the illusion of three-dimensional space on two-dimensional surfaces. Linear perspective, developed by architect Filippo Brunelleschi around 1415, uses a system of converging lines to draw the viewer's eye to a single vanishing point. This technique revolutionized painting and _________ the foundation for realistic representation in Western art.`,
      question: `Which choice completes the text with the most logical and precise word or phrase?`,
      choices: [
        {
          letter: 'A',
          text: 'established'
        },
        {
          letter: 'B',
          text: 'questioned'
        },
        {
          letter: 'C',
          text: 'abandoned'
        },
        {
          letter: 'D',
          text: 'criticized'
        }
      ],
      correctAnswer: 'A',
      skill: 'Craft & Structure',
      explanation: `**Choice A is correct.** The context indicates that linear perspective "revolutionized painting" and had a positive, foundational impact on Western art. "Established" fits logically as it means to create or set up something permanently.`
    }
  ],
  math: [
    {
      id: 4,
      section: 'math',
      question: `If 3x + 7 = 22, what is the value of 6x + 3?`,
      choices: [
        {
          letter: 'A',
          text: '33'
        },
        {
          letter: 'B',
          text: '30'
        },
        {
          letter: 'C',
          text: '33'
        },
        {
          letter: 'D',
          text: '36'
        }
      ],
      correctAnswer: 'A',
      skill: 'Algebra',
      explanation: `**Choice A is correct.** First, solve for x: 3x + 7 = 22, so 3x = 15, which means x = 5. Then substitute: 6x + 3 = 6(5) + 3 = 30 + 3 = 33.`
    },
    {
      id: 5,
      section: 'math',
      question: `The function f(x) = 2x² - 8x + 6 intersects the x-axis at which points?`,
      choices: [
        {
          letter: 'A',
          text: 'x = 1 and x = 3'
        },
        {
          letter: 'B',
          text: 'x = 2 and x = 4'
        },
        {
          letter: 'C',
          text: 'x = -1 and x = -3'
        },
        {
          letter: 'D',
          text: 'x = 0 and x = 4'
        }
      ],
      correctAnswer: 'A',
      skill: 'Advanced Math',
      explanation: `**Choice A is correct.** To find x-intercepts, set f(x) = 0: 2x² - 8x + 6 = 0. Factor out 2: 2(x² - 4x + 3) = 0, so x² - 4x + 3 = 0. This factors as (x - 1)(x - 3) = 0, giving x = 1 and x = 3.`
    }
  ]
}

export const skillsData = [
  { name: 'Craft & Structure', percentage: 90, category: 'strong' },
  { name: 'Information & Ideas', percentage: 83, category: 'strong' },
  { name: 'Standard English Conv.', percentage: 67, category: 'medium' },
  { name: 'Algebra', percentage: 88, category: 'strong' },
  { name: 'Advanced Math', percentage: 72, category: 'medium' },
  { name: 'Problem Solving & Data', percentage: 55, category: 'weak' },
  { name: 'Geometry & Trig', percentage: 85, category: 'strong' }
]