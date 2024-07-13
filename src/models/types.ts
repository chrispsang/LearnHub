// src/models/types.ts
export interface CourseAttributes {
    id: number;
    title: string;
    description: string;
    keyPoints: string[];
    courseStructure: string[];
    targetAudience: string[];
    prerequisites: string;
    reviews?: ReviewAttributes[];
  }
  
  export interface QuizAttributes {
    id: number;
    course_id: number;
    question: string;
    options: string[];
    answer: string;
    sequence: number;
    total_questions: number;
  }
  
  export interface ReviewAttributes {
    id: number;
    userId: number;
    courseId: number;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
  }