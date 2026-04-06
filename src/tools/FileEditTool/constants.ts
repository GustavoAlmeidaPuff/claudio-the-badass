// In its own file to avoid circular dependencies
export const FILE_EDIT_TOOL_NAME = 'Edit'

// Permission pattern for granting session-level access to the project's .Claudio/ folder
export const CLAUDIO_FOLDER_PERMISSION_PATTERN = '/.Claudio/**'

// Permission pattern for granting session-level access to the global ~/.Claudio/ folder
export const GLOBAL_CLAUDIO_FOLDER_PERMISSION_PATTERN = '~/.Claudio/**'

export const FILE_UNEXPECTEDLY_MODIFIED_ERROR =
  'File has been unexpectedly modified. Read it again before attempting to write it.'
