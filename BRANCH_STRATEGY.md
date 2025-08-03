# Branch Strategy

## Overview
This repository follows a Git Flow branching strategy with the following main branches:

## Main Branches

### `main` (Production Branch)
- **Purpose**: Contains production-ready code
- **Source**: Merged from `develop` branch after testing
- **Protection**: Should be protected and require pull request reviews

### `develop` (Integration Branch)
- **Purpose**: Primary integration branch for feature development
- **Source**: All completed feature branches are merged here for testing
- **Workflow**: 
  1. Feature branches are created from `develop`
  2. Features are developed and tested in feature branches
  3. Completed features are merged back to `develop` via pull requests
  4. After testing in `develop`, stable releases are merged to `main`

## Feature Development Workflow

1. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Develop**: Work on your feature
3. **Test**: Ensure your feature works correctly
4. **Push**: `git push origin feature/your-feature-name`
5. **Create Pull Request**: Merge feature branch into `develop`
6. **Code Review**: Get approval from team members
7. **Merge**: Merge into `develop` after approval
8. **Cleanup**: Delete feature branch after successful merge

## Release Process

1. **Create Release Branch**: `git checkout -b release/v1.0.0` from `develop`
2. **Final Testing**: Test the release candidate
3. **Bug Fixes**: Fix any issues found during testing
4. **Merge to Main**: `git checkout main && git merge release/v1.0.0`
5. **Tag Release**: `git tag -a v1.0.0 -m "Release version 1.0.0"`
6. **Merge Back to Develop**: `git checkout develop && git merge release/v1.0.0`
7. **Cleanup**: Delete release branch

## Hotfix Process

1. **Create Hotfix Branch**: `git checkout -b hotfix/critical-fix` from `main`
2. **Fix Issue**: Implement the critical fix
3. **Test**: Ensure the fix works
4. **Merge to Main**: `git checkout main && git merge hotfix/critical-fix`
5. **Tag Release**: `git tag -a v1.0.1 -m "Hotfix version 1.0.1"`
6. **Merge to Develop**: `git checkout develop && git merge hotfix/critical-fix`
7. **Cleanup**: Delete hotfix branch

## Branch Naming Conventions

- **Feature branches**: `feature/descriptive-name`
- **Release branches**: `release/v1.0.0`
- **Hotfix branches**: `hotfix/critical-fix`
- **Bugfix branches**: `bugfix/issue-description`

## Best Practices

1. Always pull the latest changes before creating new branches
2. Keep feature branches focused on a single feature or fix
3. Write clear commit messages
4. Test thoroughly before merging to `develop`
5. Use pull requests for code review
6. Delete branches after successful merge 