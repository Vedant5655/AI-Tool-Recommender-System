# AI Tool Recommender

A frontend project that helps users discover and compare AI tools through a quiz-driven recommendation interface.

## Project Structure

- `frontend/index.html` — main landing page and app shell
- `frontend/css/` — styling for layout, components, and theme
- `frontend/js/` — core JavaScript logic for routing, data, matching, and state
- `frontend/public/tools.json` — AI tool data used by the recommender

## Features

- Quiz-style interface for collecting user preferences
- Tool browsing and filtering
- Dynamic result matching based on user input
- Responsive UI components for cards, modals, and navigation

## How to Run

1. Open `frontend/index.html` in a web browser.
2. Or use a local static server:
   - Python 3: `python -m http.server 8000`
   - Then visit `http://localhost:8000/frontend`

## Development

- Update tool data in `frontend/public/tools.json`
- Modify UI components in `frontend/css/components/`
- Add or update pages in `frontend/js/components/`

## Notes

This repository contains only frontend assets. No backend server is required for the current version.
