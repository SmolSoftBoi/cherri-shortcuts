## 1. Build the deterministic archive flow

- [x] 1.1 Create the new Cherri shortcut structure and includes for Safari-based webpage image discovery.
- [x] 1.2 Implement webpage image extraction plus the user-visible no-images-found failure path.
- [x] 1.3 Implement image download, filename normalisation, and `.zip` archive creation for the discovered files.

## 2. Add Apple Intelligence metadata enrichment

- [x] 2.1 Implement the optional Apple Intelligence prompt flow for archive metadata with a narrow structured contract.
- [x] 2.2 Apply Apple Intelligence metadata to archive naming and manifest generation while preserving deterministic fallbacks.

## 3. Verify and document the shortcut

- [x] 3.1 Compile the new `.cherri` source files and verify the success, no-images, and Apple Intelligence-unavailable paths.
- [x] 3.2 Document the shortcut's supported Safari-first entry point, Apple Intelligence behaviour, and known v1 limitations.

## 4. Add shortcut definitions

- [x] 4.1 Update the change artefacts to capture Cherri shortcut definitions for compiled name and icon metadata.
- [x] 4.2 Add Cherri `#define` metadata to the shortcut source without changing the runtime archive flow.
- [x] 4.3 Recompile the shortcut and verify the definitions update does not break the build.
