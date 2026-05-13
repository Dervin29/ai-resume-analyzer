# AI Resume Analyzer

AI Resume Analyzer is a web application that helps users evaluate and improve their resumes using AI-powered feedback. It analyzes resume content against job descriptions, provides an ATS score, and generates structured improvement suggestions.

## Live Demo
https://ai-resume-analyzer-pied-six.vercel.app/

## Features

- Upload resume (PDF)
- Automatic PDF preview generation
- AI-powered resume analysis
- ATS score evaluation
- Structured feedback (summary, improvements, details)
- Resume history dashboard
- Individual resume review pages
- Authentication system

## Tech Stack

- React (Router-based architecture)
- TypeScript
- Tailwind CSS
- Puter (auth, storage, KV, AI services)
- PDF processing utilities
- Vercel (deployment)

## How It Works

1. User uploads a resume (PDF)
2. System converts PDF into image preview
3. Files are stored in cloud storage (fs)
4. Resume metadata is saved in KV store
5. AI analyzes resume against job description
6. Feedback is generated and stored
7. User views results in dashboard and detailed review page

## Pages

### Home
- Displays all uploaded resumes
- Shows ATS score preview
- Entry point for analysis

### Upload
- Accepts resume + job details
- Triggers AI analysis pipeline

### Resume Detail
- Shows resume preview
- Displays AI feedback:
  - Summary
  - ATS score
  - Detailed suggestions

### Auth
- Login/logout using provider auth
- Protected routes for authenticated users

## Project Structure

- `/components` - UI components (Navbar, Cards, Score UI, etc.)
- `/routes` - Application pages
- `/lib` - Utility functions and integrations
- `/constants` - Prompt and configuration logic

## Key Features Internals

- PDF → Image conversion for preview
- KV-based resume persistence
- AI prompt engineering for structured feedback
- Object URL handling for file previews

## Deployment

Deployed on Vercel.

## Future Improvements

- Resume comparison over time
- Multiple ATS models
- Job-specific scoring breakdown
- Exportable feedback reports (PDF)
- Team / recruiter dashboard
