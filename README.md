# Kanban Task Management App - System Design Document

## 1. Introduction

The Kanban Task Management App is designed to help users manage their tasks using the Kanban methodology. Users can create boards, categories within those boards, tasks within categories, and subtasks within tasks. Users can drag and drop tasks from one category to the other. The system also incorporates third-party authentication for user management.

## 2. Architecture Overview

### 2.1 Front-end

- **Framework**: Nuxt 3
- **Assets**: Figma file and icons from front-end-mentor.com

### 2.2 Back-end

- **Framework**: Nuxt 3
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Authentication with Google or OTP.

### 2.3 Data Flow

1. User logs in via third-party providers (Google) or OTP (link for login session sent to email address).
2. User creates a board.
3. Within a board, the user can create multiple categories.
4. Within a category, the user can create tasks.
5. Within a task, the user can create subtasks.

## 3. API Endpoints

Although we can query Supabase directly from the front end, we will use a back-end server to handle the API requests. This will allow us to add additional logic and security measures in the future. It also helped me practice building APIs.

### 3.1 Boards

- **GET** `/api/boards/get/[id]`: Fetches a specific board by ID.
- **GET** `/api/boards/get/all`: Fetches all boards.
- **POST** `/api/boards/post/`: Creates a new board.
- **PUT** `/api/boards/update/[id]`: Updates a specific board by ID.
- **DELETE** `/api/boards/delete/[id]`: Deletes a specific board by ID.

### 3.2 Category

- **GET** `/api/category/get/[id]`: Fetches a specific category by ID.
- **GET** `/api/category/get/[id]/tasks`: Fetches all tasks by category ID.
- **POST** `/api/category/post/`: Creates a new category.
- **PUT** `/api/category/update/[id]`: Updates a specific category by ID.
- **DELETE** `/api/category/delete/[id]`: Deletes a specific category by ID.

### 3.3 Tasks

- **GET** `/api/task/get/[id]`: Fetches a specific task by ID.
- **GET** `/api/task/get/[id]/subtasks`: Fetches all subtasks by task ID.
- **POST** `/api/task/get/`: Creates a new task.
- **PATCH** `/api/task/update/[id]`: Updates a specific task by ID.
- **DELETE** `/api/task/delete/[id]`: Deletes a specific task by ID.

### 3.4 Subtask

- **GET** `/api/subtask/get/[id]`: Fetches a specific subtask by ID.
- **POST** `/api/subtask/post`: Creates a new subtask.
- **PATCH** `/api/subtask/update/[id]`: Updates a specific subtask by ID.
- **DELETE** `/api/subtask/delete/[id]`: Deletes a specific subtask by ID.

## 4. Data Schema

### 4.1 Subtask

- `id`: uuid
- `created_at`: timestamptz
- `updated_at`: timestamptz
- `task`: uuid (relation to `task.id`)
- `title`: text
- `completed`: boolean

### 4.2 Task

- `id`: uuid
- `created_at`: timestamptz
- `updated_at`: timestamptz
- `category`: uuid (relation to `category.id`)
- `title`: text
- `description`: text
- `completed`: boolean

### 4.3 Category

- `id`: uuid
- `created_at`: timestamptz
- `title`: text
- `board`: int8 (relation to `board.id`)

### 4.4 Board

- `id`: int8
- `created_at`: timestamptz
- `title`: text
- `user_id`: uuid (relation to `profiles.id`)

### 4.5 Profiles

- `id`: uuid (relation to `auth.users.id` from Supabase Auth module)
- `updated_at`: timestamptz
- `email`: text
- `full_name`: text
- `avatar_url`: text
- `dark_theme`: boolean

In terms of future enhancements, the app can incorporate more third-party providers for authentication and can also expand its feature set to include features like task priority, notifications, collaborations, etc.

---

This document provides a high-level design of the Kanban Task Management App. Further details, such as error handling, scalability considerations, security measures, etc., must be addressed in a more detailed system design or technical specification document.
