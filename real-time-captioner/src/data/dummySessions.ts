import { CaptureSession } from '../types/notes';

export const dummySessions: CaptureSession[] = [
  {
    id: '1',
    subject: 'Computer Science',
    timestamp: new Date('2025-11-08T10:30:00'),
    duration: 45,
    captions: [
      'Today we are discussing algorithm complexity and Big O notation.',
      'Big O notation describes the worst case scenario for algorithm performance.',
      'Time complexity is how runtime scales with input size.',
      'Space complexity measures memory usage as input grows.',
      'Common complexities include O(1), O(log n), O(n), O(n log n), and O(n²).',
      'Binary search has O(log n) complexity while linear search is O(n).',
      'Sorting algorithms like merge sort achieve O(n log n) complexity.',
      'Understanding these concepts is crucial for writing efficient code.'
    ],
    rawText: 'Today we are discussing algorithm complexity and Big O notation. Big O notation describes the worst case scenario for algorithm performance. Time complexity is how runtime scales with input size. Space complexity measures memory usage as input grows. Common complexities include O(1), O(log n), O(n), O(n log n), and O(n²). Binary search has O(log n) complexity while linear search is O(n). Sorting algorithms like merge sort achieve O(n log n) complexity. Understanding these concepts is crucial for writing efficient code.',
    isProcessed: false
  },
  {
    id: '2',
    subject: 'Mathematics',
    timestamp: new Date('2025-11-07T14:15:00'),
    duration: 60,
    captions: [
      'Calculus lecture on derivatives and their applications.',
      'The derivative represents the rate of change of a function.',
      'Power rule: derivative of x to the n equals n times x to the n minus one.',
      'Product rule is used when differentiating two functions multiplied together.',
      'Chain rule helps differentiate composite functions.',
      'Critical points occur where the derivative equals zero.',
      'Second derivative test determines if critical points are maxima or minima.',
      'Applications include optimization problems and motion analysis.'
    ],
    rawText: 'Calculus lecture on derivatives and their applications. The derivative represents the rate of change of a function. Power rule: derivative of x to the n equals n times x to the n minus one. Product rule is used when differentiating two functions multiplied together. Chain rule helps differentiate composite functions. Critical points occur where the derivative equals zero. Second derivative test determines if critical points are maxima or minima. Applications include optimization problems and motion analysis.',
    isProcessed: false
  },
  {
    id: '3',
    subject: 'Physics',
    timestamp: new Date('2025-11-06T09:00:00'),
    duration: 50,
    captions: [
      'Newton\'s laws of motion form the foundation of classical mechanics.',
      'First law: an object at rest stays at rest unless acted upon by force.',
      'Second law: force equals mass times acceleration, F equals m a.',
      'Third law: for every action there is an equal and opposite reaction.',
      'These laws explain motion of objects from everyday items to planets.',
      'Friction is a force that opposes motion between surfaces.',
      'Normal force acts perpendicular to contact surfaces.',
      'Understanding forces helps predict and analyze physical systems.'
    ],
    rawText: 'Newton\'s laws of motion form the foundation of classical mechanics. First law: an object at rest stays at rest unless acted upon by force. Second law: force equals mass times acceleration, F equals m a. Third law: for every action there is an equal and opposite reaction. These laws explain motion of objects from everyday items to planets. Friction is a force that opposes motion between surfaces. Normal force acts perpendicular to contact surfaces. Understanding forces helps predict and analyze physical systems.',
    isProcessed: false
  },
  {
    id: '4',
    subject: 'Biology',
    timestamp: new Date('2025-11-05T13:30:00'),
    duration: 55,
    captions: [
      'Cell structure and function lecture covering organelles.',
      'The nucleus contains genetic material and controls cell activities.',
      'Mitochondria are the powerhouse of the cell producing ATP.',
      'Ribosomes synthesize proteins using messenger RNA as template.',
      'Endoplasmic reticulum comes in rough and smooth varieties.',
      'Golgi apparatus packages and modifies proteins for transport.',
      'Cell membrane regulates what enters and exits the cell.',
      'Cytoplasm is the gel-like substance filling the cell interior.'
    ],
    rawText: 'Cell structure and function lecture covering organelles. The nucleus contains genetic material and controls cell activities. Mitochondria are the powerhouse of the cell producing ATP. Ribosomes synthesize proteins using messenger RNA as template. Endoplasmic reticulum comes in rough and smooth varieties. Golgi apparatus packages and modifies proteins for transport. Cell membrane regulates what enters and exits the cell. Cytoplasm is the gel-like substance filling the cell interior.',
    isProcessed: false
  },
  {
    id: '5',
    subject: 'History',
    timestamp: new Date('2025-11-04T11:00:00'),
    duration: 40,
    captions: [
      'The Industrial Revolution transformed society in the 18th and 19th centuries.',
      'Started in Britain with textile manufacturing innovations.',
      'Steam engine invention by James Watt revolutionized transportation and industry.',
      'Factory system replaced home-based production methods.',
      'Urbanization increased as people moved to cities for work.',
      'Working conditions were often harsh with long hours and low pay.',
      'Child labor was common during early industrial period.',
      'Revolution led to economic growth but also social challenges.'
    ],
    rawText: 'The Industrial Revolution transformed society in the 18th and 19th centuries. Started in Britain with textile manufacturing innovations. Steam engine invention by James Watt revolutionized transportation and industry. Factory system replaced home-based production methods. Urbanization increased as people moved to cities for work. Working conditions were often harsh with long hours and low pay. Child labor was common during early industrial period. Revolution led to economic growth but also social challenges.',
    isProcessed: false
  },
  {
    id: '6',
    subject: 'Computer Science',
    timestamp: new Date('2025-11-03T15:45:00'),
    duration: 38,
    captions: [
      'Data structures lecture focusing on trees and graphs.',
      'Binary trees have at most two children per node.',
      'Binary search trees maintain sorted order for efficient searching.',
      'Tree traversal includes in-order, pre-order, and post-order methods.',
      'Graphs consist of vertices connected by edges.',
      'Directed graphs have edges with specific direction.',
      'Breadth-first search explores neighbors level by level.',
      'Depth-first search goes deep into one path before backtracking.'
    ],
    rawText: 'Data structures lecture focusing on trees and graphs. Binary trees have at most two children per node. Binary search trees maintain sorted order for efficient searching. Tree traversal includes in-order, pre-order, and post-order methods. Graphs consist of vertices connected by edges. Directed graphs have edges with specific direction. Breadth-first search explores neighbors level by level. Depth-first search goes deep into one path before backtracking.',
    isProcessed: false
  },
  {
    id: '7',
    subject: 'Mathematics',
    timestamp: new Date('2025-11-02T10:00:00'),
    duration: 52,
    captions: [
      'Linear algebra introduction covering vectors and matrices.',
      'Vectors represent magnitude and direction in space.',
      'Vector addition follows the parallelogram rule.',
      'Dot product measures similarity between vectors.',
      'Matrices are rectangular arrays of numbers.',
      'Matrix multiplication is not commutative.',
      'Identity matrix acts as one in matrix multiplication.',
      'Linear transformations can be represented by matrices.'
    ],
    rawText: 'Linear algebra introduction covering vectors and matrices. Vectors represent magnitude and direction in space. Vector addition follows the parallelogram rule. Dot product measures similarity between vectors. Matrices are rectangular arrays of numbers. Matrix multiplication is not commutative. Identity matrix acts as one in matrix multiplication. Linear transformations can be represented by matrices.',
    isProcessed: false
  },
  {
    id: '8',
    subject: 'Physics',
    timestamp: new Date('2025-11-01T14:30:00'),
    duration: 47,
    captions: [
      'Thermodynamics and the laws governing heat and energy.',
      'First law: energy cannot be created or destroyed, only transformed.',
      'Second law: entropy of isolated systems always increases.',
      'Third law: entropy approaches zero as temperature approaches absolute zero.',
      'Heat flows naturally from hot to cold objects.',
      'Work can be converted to heat and vice versa.',
      'Efficiency of heat engines is limited by Carnot cycle.',
      'Temperature is measure of average kinetic energy of particles.'
    ],
    rawText: 'Thermodynamics and the laws governing heat and energy. First law: energy cannot be created or destroyed, only transformed. Second law: entropy of isolated systems always increases. Third law: entropy approaches zero as temperature approaches absolute zero. Heat flows naturally from hot to cold objects. Work can be converted to heat and vice versa. Efficiency of heat engines is limited by Carnot cycle. Temperature is measure of average kinetic energy of particles.',
    isProcessed: false
  }
];
