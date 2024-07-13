'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', [
      {
        title: 'Introduction to Python',
        description: 'Learn the basics of Python programming. This course covers data types, control structures, functions, and basic algorithms.',
        keyPoints: [
          'Understand Python syntax and semantics',
          'Learn about different data types and data structures',
          'Implement basic algorithms and data manipulation',
          'Build simple Python applications',
        ],
        courseStructure: [
          'Module 1: Introduction to Python - Syntax, variables, and data types',
          'Module 2: Control Structures - Conditionals and loops',
          'Module 3: Functions - Definition and usage',
          'Module 4: Data Structures - Lists, tuples, and dictionaries',
          'Module 5: File I/O - Reading and writing files',
          'Module 6: Basic Algorithms - Sorting and searching',
        ],
        targetAudience: [
          'Beginners with no programming experience',
          'Anyone interested in learning Python for data analysis',
          'Aspiring software developers',
        ],
        prerequisites: 'None',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Web Development with React',
        description: 'Master the fundamentals of React for building interactive user interfaces. Learn about components, state, props, and the React lifecycle.',
        keyPoints: [
          'Understand the basics of React',
          'Learn about components, props, and state management',
          'Build interactive user interfaces',
          'Integrate with backend services',
        ],
        courseStructure: [
          'Module 1: Introduction to React - JSX, components, and props',
          'Module 2: State and Lifecycle - Managing state and lifecycle methods',
          'Module 3: Event Handling - Handling user inputs and events',
          'Module 4: Forms - Creating and managing forms',
          'Module 5: Routing - Implementing navigation with React Router',
          'Module 6: Advanced Concepts - Hooks, context API, and performance optimization',
        ],
        targetAudience: [
          'Front-end developers',
          'JavaScript developers',
          'Anyone interested in building web applications with React',
        ],
        prerequisites: 'Basic knowledge of JavaScript, HTML, and CSS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Data Science with R',
        description: 'Learn the fundamentals of data science using R. This course covers data manipulation, visualization, and statistical modeling.',
        keyPoints: [
          'Understand the basics of R programming',
          'Learn data manipulation with dplyr and tidyr',
          'Create visualizations with ggplot2',
          'Perform statistical analysis and modeling',
        ],
        courseStructure: [
          'Module 1: Introduction to R - Basics of R programming',
          'Module 2: Data Manipulation - Using dplyr and tidyr',
          'Module 3: Data Visualization - Creating plots with ggplot2',
          'Module 4: Statistical Analysis - Descriptive and inferential statistics',
          'Module 5: Modeling - Linear and logistic regression',
          'Module 6: Advanced Topics - Machine learning and big data',
        ],
        targetAudience: [
          'Aspiring data scientists',
          'Researchers',
          'Anyone interested in data analysis',
        ],
        prerequisites: 'Basic understanding of statistics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
