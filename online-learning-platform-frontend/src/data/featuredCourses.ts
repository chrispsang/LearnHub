// src/data/courses.ts

export const featuredCourses = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: `Learn essential JavaScript concepts and techniques, from variables and functions to asynchronous programming and modern ES6+ features. Ideal for beginners and those looking to refresh their JavaScript skills.`,
    keyPoints: [
      'Understand fundamental JavaScript concepts and syntax',
      'Learn about JavaScript data types, operators, and control structures',
      'Explore advanced topics such as asynchronous programming and ES6+ features',
      'Build practical projects to reinforce learning',
    ],
    courseStructure: [
      'Module 1: Introduction to JavaScript - Basic syntax, variables, and data types',
      'Module 2: Control Structures - Loops, conditionals, and error handling',
      'Module 3: Functions and Scope - Function declarations, expressions, and scope management',
      'Module 4: Objects and Arrays - Object properties, methods, and array manipulations',
      'Module 5: Advanced JavaScript - Closures, event handling, and asynchronous programming',
      'Module 6: Modern JavaScript (ES6+) - Arrow functions, template literals, destructuring, and modules',
    ],
    targetAudience: [
      'Beginners with no prior programming experience',
      'Developers looking to refresh their JavaScript knowledge',
      'Anyone interested in building web applications',
    ],
    prerequisites: 'Basic understanding of HTML and CSS is helpful but not required',
  },
  {
    id: 'react',
    title: 'Mastering React',
    description: `Master React to build powerful, interactive user interfaces. Learn JSX, components, state management with hooks, context API, React Router, and performance optimization.`,
    keyPoints: [
      'Gain proficiency in React fundamentals such as JSX, components, and props',
      'Explore state management techniques with hooks and context API',
      'Learn routing and navigation with React Router',
      'Develop real-world applications with hands-on projects',
    ],
    courseStructure: [
      'Module 1: Introduction to React - JSX, components, and props',
      'Module 2: State Management - Hooks and context API',
      'Module 3: Routing - Navigation with React Router',
      'Module 4: Advanced Concepts - Asynchronous operations and performance optimization',
      'Module 5: Real-World Applications - Hands-on projects',
    ],
    targetAudience: [
      'Developers new to React',
      'Experienced React developers looking to deepen their knowledge',
      'Anyone interested in building interactive web applications',
    ],
    prerequisites: 'Basic understanding of JavaScript, HTML, and CSS is recommended',
  },
  {
    id: 'python',
    title: 'Python for Beginners',
    description: `Start your Python journey with this beginner-friendly course. Learn Python syntax, data types, control structures, functions, OOP, file handling, and more.`,
    keyPoints: [
      'Master Python syntax, data types, and control structures',
      'Understand object-oriented programming concepts in Python',
      'Learn to handle files and perform data analysis tasks',
      'Build practical Python applications for various domains',
    ],
    courseStructure: [
      'Module 1: Introduction to Python - Syntax, data types, and control structures',
      'Module 2: Functions and Modules - Defining and using functions and modules',
      'Module 3: Object-Oriented Programming - Classes, objects, and inheritance',
      'Module 4: File Handling - Reading and writing files',
      'Module 5: Data Analysis - Using libraries like Pandas and NumPy',
      'Module 6: Web Development - Creating web applications with Flask',
    ],
    targetAudience: [
      'Beginners with no prior programming experience',
      'Individuals looking to learn Python for data analysis, web development, or automation',
      'Anyone interested in starting a career in tech',
    ],
    prerequisites: 'No prior programming experience required',
  },
];

export default featuredCourses;
