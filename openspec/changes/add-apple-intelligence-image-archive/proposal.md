## Why

The repository does not yet define a Shortcut that can gather images from a webpage and package them as a shareable archive, even though that is a practical automation target for Cherri. Adding Apple Intelligence now lets the shortcut improve naming, summaries, and metadata without making the core download-and-archive workflow dependent on a model response.

## What Changes

- Add a new Cherri shortcut that collects images from a webpage, downloads them, and packages the results into a `.zip` archive.
- Support a Safari-first workflow that can use the current page context to discover image URLs from the live DOM.
- Add an optional metadata step that can generate archive names, summaries, and lightweight metadata for the collected images using Apple Intelligence or another compatible Shortcuts model provider.
- Define the shortcut's compiled name and icon metadata with Cherri `#define` definitions so the resulting Shortcut has intentional default presentation.
- Ensure the archive flow remains deterministic and still succeeds when Apple Intelligence is unavailable, disabled, or skipped by the user.
- Document the shortcut's expected inputs, fallbacks, and failure states through a new OpenSpec capability.

## Capabilities

### New Capabilities
- `apple-intelligence-image-archive`: Create a Shortcut that gathers webpage images into an archive and can optionally use Apple Intelligence or another compatible Shortcuts model provider to generate metadata around the archive contents.

### Modified Capabilities
- None.

## Impact

- Affected code: new `.cherri` source files for the shortcut and any supporting includes or helper modules required for webpage image discovery, downloading, archiving, and optional Apple Intelligence prompts.
- Affected systems: Cherri compile output, Siri Shortcuts runtime behaviour, Safari-based webpage workflows, Apple Intelligence model availability on supported devices, and optional ChatGPT-backed metadata prompts exposed through Shortcuts.
- Dependencies: no new third-party dependencies are expected; the change relies on Cherri's built-in `web`, `documents`, `text`, and `intelligence` actions.
