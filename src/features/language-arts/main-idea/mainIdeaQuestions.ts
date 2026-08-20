// Main Idea question bank. Data-driven so new questions can be added later
// without changing the quiz engine or screens. Each question has exactly one
// 'main-idea' choice; the other three are believable distractors covering a
// true-but-small supporting detail, a too-broad claim, and an unsupported claim.

import type { ReadingQuizQuestion } from '../../../types';

export const MAIN_IDEA_QUESTIONS: ReadingQuizQuestion[] = [
  // ---------------------------------------------------------------- EASY --
  {
    id: 'mi-e1',
    difficulty: 'easy',
    passage:
      'Ants are tiny insects, but they can do amazing things. A single ant can carry more than ten times its own body weight. Ants also work together as a team to build tunnels and find food. When one ant finds food, it leaves a special scent trail so other ants can follow. Because ants cooperate so well, a whole colony can move huge amounts of dirt or gather enough food to feed thousands of ants.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Ants are strong and work together to accomplish big tasks.',
        feedback: 'This connects both the ants\u2019 strength and teamwork mentioned throughout the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'A single ant can carry more than ten times its own body weight.',
        feedback: 'This really happened in the passage, but it only describes one part of it \u2014 the ants\u2019 strength.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Insects are the most important animals on Earth.',
        feedback: 'This goes beyond what the passage actually tells us. It only talks about ants, not all insects.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Ants build their tunnels faster than any other insect.',
        feedback: 'The passage never compares ants to other insects\u2019 tunnel-building speed.',
      },
    ],
  },
  {
    id: 'mi-e2',
    difficulty: 'easy',
    passage:
      'Every Friday, Ms. Reed\u2019s class visits the school library. Students can choose two books to bring home for the week. The librarian, Mr. Alvarez, also reads a short story out loud to the whole class. Many students say Friday is their favorite day because they get to explore new books and hear exciting stories.',
    question: 'What is the main idea of this passage?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Friday library visits let students pick books and enjoy a story together.',
        feedback: 'This combines the choosing of books and the story time, which are both described.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Students can choose two books to bring home.',
        feedback: 'True, but this only covers part of what happens on library day.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Reading books is the best way to spend free time.',
        feedback: 'This is a bigger claim than what the passage actually says.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Mr. Alvarez is the students\u2019 favorite teacher.',
        feedback: 'The passage says Friday is a favorite day, not that Mr. Alvarez is a favorite teacher.',
      },
    ],
  },
  {
    id: 'mi-e3',
    difficulty: 'easy',
    passage:
      'Coach Diaz starts every basketball practice with stretching and light jogging. Next, the team practices passing and dribbling drills. Near the end of practice, players scrimmage in small teams to use what they learned. Coach Diaz says that following the same routine each time helps players improve faster.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Basketball practice follows a routine designed to help players improve.',
        feedback: 'This ties together the stretching, drills, and scrimmage as one plan for progress.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Players scrimmage in small teams near the end of practice.',
        feedback: 'True, but that is only one part of the whole practice routine.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Coach Diaz is the best basketball coach in the state.',
        feedback: 'The passage doesn\u2019t say anything about other coaches or the whole state.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'The team wins every game they play.',
        feedback: 'The passage never mentions any games or winning at all.',
      },
    ],
  },
  {
    id: 'mi-e4',
    difficulty: 'easy',
    passage:
      'Rainbows appear when sunlight passes through raindrops in the sky. The light bends and splits into different colors, creating an arc of red, orange, yellow, green, blue, and purple. Rainbows usually show up after a rainstorm, when the sun comes out while rain is still falling somewhere nearby.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Rainbows form when sunlight bends through raindrops and splits into colors.',
        feedback: 'This explains the whole process the passage describes.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Rainbows include the colors red, orange, yellow, green, blue, and purple.',
        feedback: 'True, but this is just one detail about what a rainbow looks like.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Sunlight is responsible for all the colors we see in nature.',
        feedback: 'This claim is much bigger than what the passage explains.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Rainbows only appear in the morning.',
        feedback: 'The passage never says anything about the time of day.',
      },
    ],
  },
  {
    id: 'mi-e5',
    difficulty: 'easy',
    passage:
      'Every summer, Maya helps her grandmother plant a vegetable garden. They grow tomatoes, peppers, and cucumbers in neat rows. Maya waters the plants each morning, and her grandmother teaches her how to pull weeds without hurting the vegetables. By August, they have enough vegetables to share with neighbors.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Maya and her grandmother work together all summer to grow a vegetable garden.',
        feedback: 'This connects the planting, watering, and sharing described in the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Maya waters the plants every morning.',
        feedback: 'True, but watering is just one job Maya does.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Gardening is the most rewarding hobby for families.',
        feedback: 'The passage never makes a claim about all families or hobbies.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Maya\u2019s grandmother sells vegetables at a farmer\u2019s market.',
        feedback: 'The passage says they share vegetables with neighbors, not that they sell them.',
      },
    ],
  },
  {
    id: 'mi-e6',
    difficulty: 'easy',
    passage:
      'Bees visit flowers to collect nectar, which they use to make honey. While a bee moves from flower to flower, pollen sticks to its legs and body. When the bee lands on the next flower, some of that pollen rubs off. This helps the flower make seeds, so bees and flowers actually help each other survive.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Bees and flowers depend on each other to survive.',
        feedback: 'This captures the two-way relationship described across the whole passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Bees use nectar to make honey.',
        feedback: 'True, but that only covers one part of what bees do.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'All insects help plants grow.',
        feedback: 'The passage only discusses bees, not every insect.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Flowers cannot make seeds without bees.',
        feedback: 'The passage says pollen helps flowers make seeds, but it doesn\u2019t say flowers can never make seeds without bees.',
      },
    ],
  },
  {
    id: 'mi-e7',
    difficulty: 'easy',
    passage:
      'To make bread, a baker mixes flour, water, yeast, and salt into a dough. The dough needs time to rise before it is shaped into loaves. Once shaped, the bread bakes in a hot oven until it turns golden brown. Each step is important, because skipping one can change how the bread turns out.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Making bread involves several important steps that must be followed in order.',
        feedback: 'This reflects the whole process, not just one step.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'The dough needs time to rise before baking.',
        feedback: 'True, but rising is just one step in the process.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Baking is the most difficult kind of cooking.',
        feedback: 'The passage never compares baking to other kinds of cooking.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Bakers always use the same recipe for bread.',
        feedback: 'The passage doesn\u2019t mention recipes being the same every time.',
      },
    ],
  },
  {
    id: 'mi-e8',
    difficulty: 'easy',
    passage:
      'When sea turtle eggs hatch, the baby turtles dig their way out of the sand at night. They quickly crawl toward the ocean, guided by the bright horizon over the water. Many hatchlings do not survive the trip because birds and crabs try to catch them. The ones that reach the water swim out to begin their lives at sea.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Baby sea turtles face a dangerous journey from their nest to the ocean.',
        feedback: 'This sums up the whole hatching and crawling journey.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Baby turtles dig their way out of the sand at night.',
        feedback: 'True, but this is only the first part of their journey.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Ocean animals have very difficult lives.',
        feedback: 'The passage only talks about sea turtles, not ocean animals in general.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Most baby turtles are eaten before reaching the ocean.',
        feedback: 'The passage says many do not survive, but it doesn\u2019t say most are eaten.',
      },
    ],
  },
  {
    id: 'mi-e9',
    difficulty: 'easy',
    passage:
      'At recess, students at Lincoln Elementary can choose from several activities. Some kids play tag or jump rope, while others use the climbing wall or shoot hoops. A few students prefer to sit and talk with friends under the shade trees. No matter what they choose, recess gives students a chance to move, relax, and have fun before returning to class.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Recess offers students many ways to relax and have fun.',
        feedback: 'This covers the variety of activities and the overall purpose of recess.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Some students play tag or jump rope at recess.',
        feedback: 'True, but this only names a couple of the possible activities.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Playing outside is the healthiest activity for kids.',
        feedback: 'The passage doesn\u2019t make any claim about health.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Every student at Lincoln Elementary plays on the climbing wall.',
        feedback: 'The passage says students can choose different activities, not that everyone uses the climbing wall.',
      },
    ],
  },
  {
    id: 'mi-e10',
    difficulty: 'easy',
    passage:
      'The Chen family sorts their trash into three bins: garbage, recycling, and compost. Paper, cans, and plastic bottles go into the recycling bin. Food scraps go into the compost bin, where they slowly turn into soil. By sorting their trash carefully, the Chen family throws away much less garbage than before.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The Chen family sorts their trash to reduce how much garbage they throw away.',
        feedback: 'This connects the sorting system with its overall result.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Food scraps go into the compost bin.',
        feedback: 'True, but this is just one part of their sorting system.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Recycling can solve all of the world\u2019s trash problems.',
        feedback: 'The passage only talks about one family\u2019s habits, not the whole world.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'The Chen family has been recycling for ten years.',
        feedback: 'The passage never says how long they have been doing this.',
      },
    ],
  },

  // --------------------------------------------------------- GRADE-LEVEL --
  {
    id: 'mi-g1',
    difficulty: 'grade-level',
    passage:
      'Before telephones and airplanes existed, sending a letter across the country could take weeks. In 1860, a company started the Pony Express to speed things up. Riders on fast horses carried mail across nearly 2,000 miles, riding day and night. Each rider would gallop to a station, jump onto a fresh horse, and keep going, while another rider took over after about 75 to 100 miles. Using this relay system, mail that once took weeks could arrive in about ten days. Although the Pony Express only operated for about eighteen months before railroads and telegraphs made it unnecessary, it became a famous symbol of speed and determination in the American West.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The Pony Express used relay riders on horseback to deliver mail much faster than before.',
        feedback: 'This ties together the relay system, the riders, and the speed improvement described.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Riders would jump onto a fresh horse at each station.',
        feedback: 'True, but this describes only one part of how the system worked.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Horses were used for every kind of transportation in the 1800s.',
        feedback: 'The passage only discusses mail delivery, not all transportation.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'The Pony Express operated for many years before closing.',
        feedback: 'The passage says it only lasted about eighteen months, not many years.',
      },
    ],
  },
  {
    id: 'mi-g2',
    difficulty: 'grade-level',
    passage:
      'Water is always moving through a process called the water cycle. The sun heats water in oceans, lakes, and rivers, causing it to evaporate into the air as vapor. As the vapor rises, it cools and forms clouds through a process called condensation. Eventually, the water falls back to Earth as rain, snow, or hail, a step known as precipitation. Some of that water soaks into the ground, some flows into rivers and lakes, and some evaporates again, starting the whole cycle over. This constant movement of water keeps Earth\u2019s supply of fresh water renewed.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Water continuously moves between the Earth and sky through the water cycle.',
        feedback: 'This describes the overall cycle, not just one stage of it.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Water vapor cools and forms clouds through condensation.',
        feedback: 'True, but this is only one stage of the whole cycle.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'The sun controls every process that happens on Earth.',
        feedback: 'The passage only talks about the water cycle, not everything the sun does.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Rain always falls in the same place where it evaporated.',
        feedback: 'The passage never says rain falls in the exact place it evaporated from.',
      },
    ],
  },
  {
    id: 'mi-g3',
    difficulty: 'grade-level',
    passage:
      'George Washington Carver grew up in the 1860s and became one of America\u2019s most important scientists. He studied plants at Tuskegee Institute, where he searched for ways to help farmers whose soil had been worn out by growing cotton year after year. Carver discovered that planting peanuts, sweet potatoes, and other crops could restore nutrients to the soil. To make sure farmers had a reason to grow these new crops, he invented over one hundred uses for peanuts alone, including dyes, soaps, and food products. Carver\u2019s work helped many struggling farmers improve their land and their income.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'George Washington Carver helped farmers by discovering new crops and uses that improved their soil and income.',
        feedback: 'This connects his research, the new crops, and how farmers benefited.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Carver invented over one hundred uses for peanuts.',
        feedback: 'True, but this is just one part of his overall work with farmers.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Carver was the most famous scientist in American history.',
        feedback: 'The passage never compares Carver to other scientists or claims he was the most famous.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Carver grew up on a peanut farm.',
        feedback: 'The passage doesn\u2019t say anything about where Carver grew up or what his family farmed.',
      },
    ],
  },
  {
    id: 'mi-g4',
    difficulty: 'grade-level',
    passage:
      'Many people worked on electric light before Thomas Edison, but earlier bulbs burned out too quickly to be useful. Edison and his team tested thousands of materials to find one that would glow for a long time without breaking. In 1879, they found that a carbonized cotton thread could burn for more than thirteen hours. Edison kept improving the design until his bulbs could last hundreds of hours. He also built power stations so homes and businesses could actually use electric light, turning his invention into something people could rely on every day.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Edison improved electric light and made it practical for everyday use.',
        feedback: 'This includes both his testing process and the power stations that made the invention usable.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'A carbonized cotton thread could burn for more than thirteen hours.',
        feedback: 'True, but this only describes one discovery along the way.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Thomas Edison invented every kind of modern technology.',
        feedback: 'The passage only discusses the lightbulb, not all modern technology.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Edison worked completely alone on the lightbulb.',
        feedback: 'The passage says Edison and his team worked together, not that he worked alone.',
      },
    ],
  },
  {
    id: 'mi-g5',
    difficulty: 'grade-level',
    passage:
      'Training for a marathon takes months of steady preparation. Runners slowly increase their weekly mileage so their bodies can adjust without getting injured. They also practice running at a steady pace, since going too fast early in a race can lead to exhaustion later. Many runners include rest days in their schedule, because muscles need time to recover and grow stronger. On race day, all of this preparation helps runners pace themselves and reach the finish line, even though the race itself covers over 26 miles.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Marathon runners need months of careful training to prepare their bodies for race day.',
        feedback: 'This connects the mileage, pacing, and rest described throughout the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Runners include rest days so their muscles can recover.',
        feedback: 'True, but rest days are just one part of the whole training plan.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Running is the healthiest sport a person can do.',
        feedback: 'The passage never compares running to other sports.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Most runners finish a marathon in less than three hours.',
        feedback: 'The passage never mentions how long it takes runners to finish.',
      },
    ],
  },
  {
    id: 'mi-g6',
    difficulty: 'grade-level',
    passage:
      'Every fall, monarch butterflies in North America begin an incredible journey south to Mexico, traveling up to 3,000 miles. No single butterfly makes the whole round trip; instead, it takes several generations to complete the full migration cycle. The butterflies rely on the sun and an internal sense of direction to stay on course, even though they have never made the trip before. When they arrive in Mexico, millions of monarchs cluster together on trees to survive the winter before starting the journey back north in spring.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Monarch butterflies complete an amazing multi-generation migration between North America and Mexico.',
        feedback: 'This ties together the distance, the generations, and the destination described.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Millions of monarchs cluster together on trees in Mexico.',
        feedback: 'True, but this only describes what happens once they arrive.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'All butterflies migrate long distances every year.',
        feedback: 'The passage only describes monarch butterflies, not all butterflies.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Monarch butterflies can remember the exact trip from a previous year.',
        feedback: 'The passage says they have never made the trip before, so they can\u2019t be remembering it.',
      },
    ],
  },
  {
    id: 'mi-g7',
    difficulty: 'grade-level',
    passage:
      'Coral reefs are sometimes called the "rainforests of the sea" because they support so much life. Tiny animals called coral polyps build hard skeletons that, over many years, join together to form massive reef structures. Thousands of species of fish, crabs, and other sea creatures depend on reefs for food and shelter. Unfortunately, warmer ocean temperatures can cause coral to lose the colorful algae living inside them, a process called coral bleaching. When too much bleaching occurs, reefs can weaken and struggle to support the sea life that relies on them.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Coral reefs support enormous amounts of ocean life but are threatened by rising temperatures.',
        feedback: 'This connects both the importance of reefs and the danger they face.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Coral polyps build hard skeletons that form reef structures.',
        feedback: 'True, but this describes only how reefs are built, not the whole passage.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'The ocean is the most important habitat on Earth.',
        feedback: 'The passage focuses on coral reefs specifically, not the entire ocean.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Coral bleaching has already destroyed most of the world\u2019s reefs.',
        feedback: 'The passage says bleaching can weaken reefs, but it doesn\u2019t say most reefs are already destroyed.',
      },
    ],
  },
  {
    id: 'mi-g8',
    difficulty: 'grade-level',
    passage:
      'Every spring, students at Riverside Elementary take part in the school science fair. Each student picks a question to investigate, forms a hypothesis, and designs an experiment to test it. Over several weeks, students collect data, create charts, and prepare a poster explaining their results. On fair day, judges walk around asking students questions about their projects and how they reached their conclusions. Many students say the science fair teaches them more about how real scientists work than any single lesson in class.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The science fair gives students hands-on experience with the full process of scientific investigation.',
        feedback: 'This reflects the whole process from question to presentation described in the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Judges ask students questions about their projects on fair day.',
        feedback: 'True, but this only describes one part of fair day.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Science fairs are the best way for all students to learn.',
        feedback: 'This is a bigger claim than the passage supports; it only discusses one school\u2019s experience.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Every student at Riverside Elementary wins an award at the fair.',
        feedback: 'The passage never mentions winners or awards.',
      },
    ],
  },
  {
    id: 'mi-g9',
    difficulty: 'grade-level',
    passage:
      'Firefighters do much more than put out fires. They regularly inspect buildings to make sure fire exits and alarms are working properly. They also respond to car accidents, medical emergencies, and even rescue animals stuck in dangerous places. Between emergency calls, firefighters train constantly, practicing drills so they can react quickly no matter what situation they face. Because of this wide range of duties, firefighters play a major role in keeping their communities safe every single day.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Firefighters keep their communities safe by handling many kinds of emergencies and responsibilities.',
        feedback: 'This covers the full range of duties described, not just one.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Firefighters inspect buildings to check fire exits and alarms.',
        feedback: 'True, but this is just one of their many responsibilities.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Firefighters are the most important workers in any community.',
        feedback: 'The passage never compares firefighters to other community workers.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Firefighters spend most of their time rescuing animals.',
        feedback: 'The passage lists rescuing animals as one duty among several, not the main way they spend their time.',
      },
    ],
  },
  {
    id: 'mi-g10',
    difficulty: 'grade-level',
    passage:
      'The International Space Station, or ISS, orbits about 250 miles above Earth and travels at nearly 17,500 miles per hour. Astronauts from many different countries live and work together aboard the station, conducting experiments in areas like biology, physics, and medicine. Because there is almost no gravity aboard the ISS, astronauts must strap themselves down to sleep and use special tools to keep objects from floating away. The research done on the ISS helps scientists understand how the human body and other materials behave in space, which is important for future missions to the Moon and Mars.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The International Space Station allows astronauts from many countries to live and conduct research in space.',
        feedback: 'This connects the international teamwork with the purpose of the station\u2019s research.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Astronauts must strap themselves down to sleep because of low gravity.',
        feedback: 'True, but this is just one detail about daily life aboard the station.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Space travel will soon allow humans to live on Mars.',
        feedback: 'The passage mentions future missions but doesn\u2019t claim humans will soon live on Mars.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'The ISS is the fastest object ever built by humans.',
        feedback: 'The passage gives its speed but never compares it to other objects.',
      },
    ],
  },
  {
    id: 'mi-g11',
    difficulty: 'grade-level',
    passage:
      'Far below the ocean\u2019s surface, where sunlight cannot reach, strange creatures survive in complete darkness. Many deep-sea fish create their own light through a process called bioluminescence, using it to attract prey or scare away predators. Because food is scarce that deep underwater, some creatures have adapted huge mouths and stomachs so they can eat any meal they find, no matter the size. Scientists continue exploring these dark waters, discovering new species almost every year, since less of the deep ocean has been explored than the surface of the Moon.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Deep-sea creatures have unusual adaptations that help them survive in a dark, food-scarce environment.',
        feedback: 'This connects the bioluminescence and eating adaptations as ways creatures survive the deep sea.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Some deep-sea creatures have huge mouths and stomachs.',
        feedback: 'True, but this is only one adaptation mentioned in the passage.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Scientists know more about outer space than they know about Earth.',
        feedback: 'The passage compares ocean exploration to the Moon, but it doesn\u2019t make a broader claim about all outer space versus Earth.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Every deep-sea creature can create its own light.',
        feedback: 'The passage says many deep-sea fish use bioluminescence, not that every creature can.',
      },
    ],
  },
  {
    id: 'mi-g12',
    difficulty: 'grade-level',
    passage:
      'Most plants get all the nutrients they need from soil, water, and sunlight, but the Venus flytrap is different. It grows in soil that lacks nutrients like nitrogen, so it has developed a way to catch insects instead. Its leaves form a trap lined with tiny hairs; when an insect touches two hairs within about 20 seconds, the trap snaps shut. Digestive juices inside the trap slowly break down the insect over about a week, giving the plant the nutrients its soil cannot provide. Afterward, the trap reopens, ready to catch its next meal.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The Venus flytrap catches and digests insects to get nutrients its poor soil cannot provide.',
        feedback: 'This ties together why the plant traps insects and how the whole process works.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'The trap snaps shut when an insect touches two hairs within 20 seconds.',
        feedback: 'True, but this only explains how the trap is triggered, not the whole passage.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'All plants that grow in poor soil eat insects.',
        feedback: 'The passage only discusses the Venus flytrap, not all plants in poor soil.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'The Venus flytrap can catch insects larger than itself.',
        feedback: 'The passage never mentions the size of insects it catches.',
      },
    ],
  },
  {
    id: 'mi-g13',
    difficulty: 'grade-level',
    passage:
      'Hurricanes form over warm ocean water when rising warm air creates a spinning pattern of clouds and wind. As the storm gathers more warm, moist air, it can grow into a massive system hundreds of miles wide, with winds reaching well over 100 miles per hour. Meteorologists track hurricanes using satellites and special aircraft that fly directly into the storm to measure conditions inside. This tracking gives coastal communities time to prepare, evacuate if necessary, and protect their homes before a hurricane makes landfall.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Hurricanes form over warm water and are tracked closely so coastal communities can prepare.',
        feedback: 'This connects how hurricanes form with why tracking them matters.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Meteorologists fly aircraft directly into storms to measure conditions.',
        feedback: 'True, but this is only one part of how hurricanes are tracked.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Hurricanes are the most dangerous weather event on Earth.',
        feedback: 'The passage never compares hurricanes to other kinds of weather.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Every hurricane eventually reaches land.',
        feedback: 'The passage explains landfall preparation but never says every hurricane makes landfall.',
      },
    ],
  },
  {
    id: 'mi-g14',
    difficulty: 'grade-level',
    passage:
      'In the mid-1800s, traveling from one side of the United States to the other could take months by wagon. To solve this problem, two companies began building a railroad from opposite directions, one starting in California and the other in Nebraska. Thousands of workers, including many Chinese and Irish immigrants, blasted through mountains and laid tracks across deserts in extremely difficult conditions. When the two railroads finally met in Utah in 1869, a golden spike was driven into the ground to celebrate. The completed railroad reduced a trip that once took months down to about a week.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Workers built the Transcontinental Railroad to connect the country and dramatically shorten travel time.',
        feedback: 'This connects the building effort with the major result of faster travel.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'A golden spike was driven into the ground in Utah in 1869.',
        feedback: 'True, but this describes only the finishing celebration, not the whole story.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Railroads changed transportation everywhere in the world.',
        feedback: 'The passage only discusses this one railroad in the United States.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Only Chinese workers built the Transcontinental Railroad.',
        feedback: 'The passage mentions both Chinese and Irish immigrants among the many workers.',
      },
    ],
  },
  {
    id: 'mi-g15',
    difficulty: 'grade-level',
    passage:
      'Long before modern Thanksgiving celebrations, many cultures held harvest festivals to give thanks for a successful growing season. Families would gather to share food they had grown or gathered throughout the year, including corn, squash, and other crops. These gatherings often included games, storytelling, and expressions of gratitude for surviving another year. Over time, different harvest traditions blended together in America, eventually shaping the Thanksgiving holiday many families celebrate today.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Harvest festivals from different cultures helped shape the Thanksgiving traditions celebrated today.',
        feedback: 'This connects the historical festivals with how they influenced modern Thanksgiving.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Families shared foods like corn and squash at harvest gatherings.',
        feedback: 'True, but this only describes one detail of the festivals.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Every holiday in America came from a harvest festival.',
        feedback: 'The passage only discusses Thanksgiving, not every American holiday.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Modern Thanksgiving celebrations are identical to the original harvest festivals.',
        feedback: 'The passage says traditions blended together over time, meaning they changed rather than staying identical.',
      },
    ],
  },

  // ----------------------------------------------------------- CHALLENGE --
  {
    id: 'mi-c1',
    difficulty: 'challenge',
    passage:
      'In the 1840s, mathematician Ada Lovelace worked with inventor Charles Babbage on his design for an early mechanical computer called the Analytical Engine. While translating an article about the machine, Lovelace added her own extensive notes, which ended up several times longer than the original article. In these notes, she described how the machine could go beyond simple calculations and manipulate symbols according to rules, essentially outlining an early computer program. Because Babbage\u2019s machine was never fully built during his lifetime, Lovelace never saw her ideas run on an actual computer. Still, more than a century later, computer scientists recognized her notes as containing the first published algorithm intended for a machine, leading many to call her the first computer programmer.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Ada Lovelace\u2019s notes on the Analytical Engine described an early computer program, earning her recognition as the first computer programmer.',
        feedback: 'This connects her notes, the ideas within them, and the lasting recognition she received.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Lovelace\u2019s notes were several times longer than the original article she translated.',
        feedback: 'True, but this only describes the length of her writing, not why it mattered.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Ada Lovelace invented the modern computer.',
        feedback: 'The passage says the machine was never fully built in her lifetime, so she didn\u2019t invent a working computer.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Charles Babbage and Ada Lovelace built the Analytical Engine together.',
        feedback: 'The passage says the machine was never fully built, so the two of them did not build it together.',
      },
    ],
  },
  {
    id: 'mi-c2',
    difficulty: 'challenge',
    passage:
      'The Great Wall of China was not built all at once by a single ruler. Different Chinese states built separate walls for defense centuries before China was unified, and later dynasties connected and extended these older sections over hundreds of years. Builders used whatever materials were available nearby, including stone in the mountains and packed earth in the plains, which is why sections of the wall look different from place to place. Although popular legend claims the wall can be seen from space with the naked eye, modern astronauts have confirmed this is not actually true. Regardless, the wall remains one of the largest construction projects ever completed, stretching for thousands of miles across difficult terrain.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'The Great Wall of China was built and connected over centuries using varied materials and methods.',
        feedback: 'This reflects the long history and varied construction described throughout the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Builders used stone in the mountains and packed earth in the plains.',
        feedback: 'True, but this only explains one detail about materials, not the whole history of the wall.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'The Great Wall of China is the greatest achievement in human history.',
        feedback: 'The passage never makes a comparison to all human achievements.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Astronauts can see the Great Wall of China from space with the naked eye.',
        feedback: 'The passage directly states this popular claim has been confirmed to be untrue.',
      },
    ],
  },
  {
    id: 'mi-c3',
    difficulty: 'challenge',
    passage:
      'When a vaccine enters the body, it introduces a small, harmless piece of a virus or bacteria, or sometimes instructions for making one. This exposure trains the immune system to recognize the invader without causing the actual disease. The body creates special cells called antibodies that remember how to fight that specific germ. If the real virus or bacteria ever enters the body later, the immune system can respond much faster than it would have without the vaccine, often stopping the illness before it causes serious symptoms. Because of this, vaccines have helped dramatically reduce or even eliminate several diseases that used to be common and dangerous.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Vaccines train the immune system to fight off diseases quickly, reducing serious illness.',
        feedback: 'This connects how vaccines work with their overall effect on disease.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'The body creates antibodies that remember how to fight a specific germ.',
        feedback: 'True, but this only explains one step in how vaccines work.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Vaccines have completely eliminated all dangerous diseases.',
        feedback: 'The passage says vaccines reduced or eliminated "several" diseases, not all dangerous diseases.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Vaccines contain the full, active version of a virus or bacteria.',
        feedback: 'The passage says vaccines contain only a small, harmless piece, not the full active version.',
      },
    ],
  },
  {
    id: 'mi-c4',
    difficulty: 'challenge',
    passage:
      'Before the mid-1400s, books in Europe were copied by hand, which took so much time that few people could afford to own one. Johannes Gutenberg developed a printing press that used movable metal letters, allowing the same page to be printed many times quickly. This invention dramatically lowered the cost of producing books, and within decades, printed material spread rapidly across Europe. As more people gained access to books, literacy rates slowly began to rise, and ideas could spread faster than ever before, influencing science, religion, and politics in the centuries that followed.',
    question: 'What is the main idea?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Gutenberg\u2019s printing press made books cheaper and faster to produce, helping ideas spread across Europe.',
        feedback: 'This connects the invention with its wide-reaching effects described in the passage.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Books were copied by hand before the mid-1400s.',
        feedback: 'True, but this only describes the situation before Gutenberg\u2019s invention.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'The printing press caused every major change in modern history.',
        feedback: 'The passage mentions influence on science, religion, and politics, but doesn\u2019t claim it caused every major change.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Gutenberg\u2019s printing press made every European literate within a few years.',
        feedback: 'The passage says literacy rates rose slowly over time, not that everyone became literate quickly.',
      },
    ],
  },
  {
    id: 'mi-c5',
    difficulty: 'challenge',
    passage:
      'Wetlands are sometimes overlooked because they can look like simple swamps or marshes, but they perform several critical jobs for the environment. Their soil and plants filter pollutants out of water before it reaches rivers and lakes, acting like a natural water treatment system. During heavy storms, wetlands absorb excess water like a sponge, which reduces flooding in nearby towns. They also provide nesting and feeding grounds for countless birds, fish, and amphibians, many of which cannot survive anywhere else. Despite these benefits, wetlands have often been drained or filled in for construction, leading scientists to warn that losing them removes protections communities may not even realize they depend on.',
    question: 'What is this passage mostly about?',
    correctChoiceId: 'a',
    choices: [
      {
        id: 'a',
        type: 'main-idea',
        text: 'Wetlands provide important environmental benefits that are often overlooked or destroyed.',
        feedback: 'This connects the filtering, flood control, and habitat benefits with the warning about their loss.',
      },
      {
        id: 'b',
        type: 'supporting-detail',
        text: 'Wetlands absorb excess water like a sponge during storms.',
        feedback: 'True, but this is only one of the several benefits described.',
      },
      {
        id: 'c',
        type: 'too-broad',
        text: 'Protecting the environment is the most important job of every government.',
        feedback: 'The passage only discusses wetlands, not the responsibilities of governments in general.',
      },
      {
        id: 'd',
        type: 'unsupported',
        text: 'Most wetlands in the world have already been destroyed.',
        feedback: 'The passage says wetlands have often been drained or filled in, but it doesn\u2019t say most have already been destroyed.',
      },
    ],
  },
];
