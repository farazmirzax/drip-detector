# Contributing to DripDetector

Thanks for your interest in contributing! Here's how you can help:

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/drip-detector.git`
3. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Making Changes

1. Make your changes in your feature branch
2. Test your changes locally
3. Commit with clear messages: `git commit -m "Add feature: description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

## Code Style

- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ESLint configuration provided
- Add comments for complex logic
- Keep functions small and focused

## Testing

- Test the backend API with sample images
- Verify frontend UI changes across different screen sizes
- Ensure model predictions are reasonable

## Pull Request Guidelines

- Describe what your PR does
- Reference any related issues
- Include screenshots for UI changes
- Make sure the code runs without errors

## Need Help?

Open an issue with the `question` label if you need guidance!
