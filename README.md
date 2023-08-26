# Kanban Task Management App - System Design Document

## 1. Introduction
The Kanban Task Management App is designed to help users manage their tasks using the Kanban methodology. Users can create boards, categories within those boards, tasks within categories, and subtasks within tasks. The system also incorporates third-party authentication for user management.

## 2. Architecture Overview

+-----------------------+     +-------------------------------------+
|       User            |     |       Front-end (Nuxt 3)            |
|                       |     |                                     |
|   Logs In/Uses    +---------->   Renders UI                       |
+-----------------------+     |                                     |
                             |                                     |
                             +------------------+------------------+
                                                |
                                                | Auth Calls
                                                V
                             +-------------------------------------+
                             |       Authentication (Supabase)     |
                             |                                     |
                             |       Returns user_id                |
                             +------------------+------------------+
                                                |
                                                | 
                             +-------------------------------------+
                             |       Back-end (Nuxt 3)              |
                             |                                     |
                             |   API Calls     +-----------------------> Database (Supabase/PostgreSQL)
                             |                                     |     Stores user data using user_id
                             +-------------------------------------+
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

### 3.1 Boards
- **GET** `/api/boards/[id]`: Fetches a specific board by ID.
- **GET** `/api/all`: Fetches all boards.
- **POST** `/api/boards/new`: Creates a new board.
- **PUT** `/api/boards/[id]/update`: Updates a specific board by ID.
- **DELETE** `/api/boards/[id]/delete`: Deletes a specific board by ID.

### 3.2 Category
- **GET** `/api/category/[id]`: Fetches a specific category by ID.
- **POST** `/api/category/new`: Creates a new category.
- **PUT** `/api/category/[id]/update`: Updates a specific category by ID.
- **DELETE** `/api/category/[id]/delete`: Deletes a specific category by ID.

### 3.3 Tasks
- **GET** `/api/task/[id]`: Fetches a specific task by ID.
- **POST** `/api/task/new`: Creates a new task.
- **PUT** `/api/task/[id]/update`: Updates a specific task by ID.
- **DELETE** `/api/task/[id]/delete`: Deletes a specific task by ID.

### 3.4 Subtask
- **GET** `/api/subtask/[id]`: Fetches a specific subtask by ID.
- **POST** `/api/subtask/new`: Creates a new subtask.
- **PUT** `/api/subtask/[id]/update`: Updates a specific subtask by ID.
- **DELETE** `/api/subtask/[id]/delete`: Deletes a specific subtask by ID.

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

## 5. High-Level Overview

The Kanban Task Management app provides users with a way to visualize and manage their tasks using the Kanban methodology. The app is built on the Nuxt 3 framework for both front-end and back-end. 

The app's core functionality revolves around the creation and management of boards. Each board can contain multiple categories, with each category housing multiple tasks. Tasks can further have subtasks. All these entities have CRUD operations associated with them, available through RESTful APIs.

The data is stored in a PostgreSQL database managed by Supabase. Supabase also handles authentication, allowing users to sign in with third-party providers such as Google and GitHub. 

Users first need to authenticate, after which they can create and manage their boards and the associated entities. The design of the application, including the UI/UX components, is sourced from assets provided by front-end-mentor.com.

In terms of scalability and future enhancements, the app can incorporate more third-party providers for authentication and can also expand its feature set to include features like task priority, notifications, collaborations, etc.

---

This document provides a high-level design of the Kanban Task Management App. Further details, such as error handling, scalability considerations, security measures, etc., would need to be addressed in a more detailed system design or technical specification document.
