#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COMMIT_MSG_FILE = process.argv[2];

function execCommand(command) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (error) {
    return '';
  }
}

function getStagedFiles() {
  const output = execCommand('git diff --cached --name-status');
  if (!output) return [];

  return output.split('\n').map((line) => {
    const [status, ...fileParts] = line.split('\t');
    const file = fileParts.join('\t');
    return { status, file };
  });
}

function getDiffStats() {
  const output = execCommand('git diff --cached --numstat');
  if (!output) return { additions: 0, deletions: 0 };

  let additions = 0;
  let deletions = 0;

  output.split('\n').forEach((line) => {
    const [add, del] = line.split('\t');
    additions += parseInt(add) || 0;
    deletions += parseInt(del) || 0;
  });

  return { additions, deletions };
}

function categorizeChanges(stagedFiles) {
  const categories = {
    added: [],
    modified: [],
    deleted: [],
    renamed: [],
  };

  stagedFiles.forEach(({ status, file }) => {
    if (status === 'A') categories.added.push(file);
    else if (status === 'M') categories.modified.push(file);
    else if (status === 'D') categories.deleted.push(file);
    else if (status.startsWith('R')) categories.renamed.push(file);
  });

  return categories;
}

function determineChangeType(categories, stagedFiles) {
  const filePatterns = stagedFiles.map((f) => f.file);

  // Check for specific patterns
  const hasTests = filePatterns.some((f) => f.includes('test') || f.includes('spec'));
  const hasDocs = filePatterns.some((f) => f.endsWith('.md') || f.includes('docs'));
  const hasConfig = filePatterns.some(
    (f) =>
      f.includes('config') ||
      f.includes('.json') ||
      f.includes('.yml') ||
      f.includes('.yaml') ||
      f.includes('husky') ||
      f.includes('.env'),
  );
  const hasStyles = filePatterns.some(
    (f) => f.endsWith('.css') || f.endsWith('.scss') || f.includes('styles'),
  );
  const hasComponents = filePatterns.some(
    (f) =>
      f.includes('component') ||
      f.includes('components/') ||
      f.endsWith('.tsx') ||
      f.endsWith('.jsx'),
  );

  // Determine primary type
  if (
    categories.added.length > 0 &&
    categories.modified.length === 0 &&
    categories.deleted.length === 0
  ) {
    if (hasTests) return 'test';
    if (hasDocs) return 'docs';
    if (hasConfig) return 'chore';
    return 'feat';
  }

  if (categories.deleted.length > 0 && categories.added.length === 0) {
    return 'chore';
  }

  if (hasTests && !hasComponents) return 'test';
  if (hasDocs && filePatterns.length <= 2) return 'docs';
  if (hasConfig && !hasComponents) return 'chore';
  if (hasStyles && !hasComponents) return 'style';

  // Default based on file changes
  if (categories.modified.length > 0) {
    const hasBugFix = filePatterns.some((f) => f.toLowerCase().includes('fix'));
    if (hasBugFix) return 'fix';
    return 'feat';
  }

  return 'chore';
}

function getScope(stagedFiles) {
  const files = stagedFiles.map((f) => f.file);

  // Extract common directory or module
  const dirs = files
    .map((f) => {
      const parts = f.split('/');
      if (parts.length > 1) {
        // Return the first meaningful directory
        if (parts[0] === 'app' || parts[0] === 'src') {
          return parts[1];
        }
        return parts[0];
      }
      return null;
    })
    .filter(Boolean);

  // Find most common directory
  const dirCounts = {};
  dirs.forEach((dir) => {
    dirCounts[dir] = (dirCounts[dir] || 0) + 1;
  });

  const mostCommon = Object.keys(dirCounts).sort((a, b) => dirCounts[b] - dirCounts[a])[0];

  // Return scope without extension
  if (mostCommon) {
    return mostCommon.replace(/\.(ts|tsx|js|jsx|css|md)$/, '');
  }

  return '';
}

function generateSummary(stagedFiles, categories) {
  const fileCount = stagedFiles.length;

  if (fileCount === 0) {
    return 'update files';
  }

  if (fileCount === 1) {
    const { file, status } = stagedFiles[0];
    const fileName = path.basename(file, path.extname(file));

    if (status === 'A') return `add ${fileName}`;
    if (status === 'D') return `remove ${fileName}`;
    if (status === 'M') return `update ${fileName}`;
    if (status.startsWith('R')) return `rename ${fileName}`;
  }

  // Multiple files
  const parts = [];

  if (categories.added.length > 0) {
    if (categories.added.length === 1) {
      parts.push(`add ${path.basename(categories.added[0])}`);
    } else {
      parts.push(`add ${categories.added.length} files`);
    }
  }

  if (categories.modified.length > 0) {
    if (categories.modified.length === 1) {
      parts.push(`update ${path.basename(categories.modified[0])}`);
    } else {
      parts.push(`update ${categories.modified.length} files`);
    }
  }

  if (categories.deleted.length > 0) {
    if (categories.deleted.length === 1) {
      parts.push(`remove ${path.basename(categories.deleted[0])}`);
    } else {
      parts.push(`remove ${categories.deleted.length} files`);
    }
  }

  return parts.join(', ') || 'update files';
}

function generateDetailedDescription(stagedFiles, categories, stats) {
  const lines = [];

  lines.push('Changes:');

  if (categories.added.length > 0) {
    lines.push(`  Added (${categories.added.length}):`);
    categories.added.forEach((file) => {
      lines.push(`    - ${file}`);
    });
  }

  if (categories.modified.length > 0) {
    lines.push(`  Modified (${categories.modified.length}):`);
    categories.modified.forEach((file) => {
      lines.push(`    - ${file}`);
    });
  }

  if (categories.deleted.length > 0) {
    lines.push(`  Deleted (${categories.deleted.length}):`);
    categories.deleted.forEach((file) => {
      lines.push(`    - ${file}`);
    });
  }

  if (categories.renamed.length > 0) {
    lines.push(`  Renamed (${categories.renamed.length}):`);
    categories.renamed.forEach((file) => {
      lines.push(`    - ${file}`);
    });
  }

  lines.push('');
  lines.push(`Stats: +${stats.additions} -${stats.deletions}`);

  return lines.join('\n');
}

function generateCommitMessage() {
  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    return '# No staged changes';
  }

  const categories = categorizeChanges(stagedFiles);
  const changeType = determineChangeType(categories, stagedFiles);
  const scope = getScope(stagedFiles);
  const summary = generateSummary(stagedFiles, categories);
  const stats = getDiffStats();
  const description = generateDetailedDescription(stagedFiles, categories, stats);

  // Format: type(scope): summary
  const scopePart = scope ? `(${scope})` : '';
  const commitMessage = `${changeType}${scopePart}: ${summary}

${description}
`;

  return commitMessage;
}

function main() {
  try {
    // Check if commit message already exists
    const existingMessage = fs.readFileSync(COMMIT_MSG_FILE, 'utf-8').trim();

    // Skip if message is not empty and not a default/commented message
    if (existingMessage && !existingMessage.startsWith('#')) {
      return;
    }

    const commitMessage = generateCommitMessage();
    fs.writeFileSync(COMMIT_MSG_FILE, commitMessage);

    console.log('✓ Generated commit message based on staged changes');
  } catch (error) {
    console.error('Error generating commit message:', error.message);
    process.exit(1);
  }
}

main();
