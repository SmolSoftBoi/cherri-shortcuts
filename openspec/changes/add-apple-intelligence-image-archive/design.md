## Context

The repository is currently a minimal Cherri toolkit with OpenSpec scaffolding but no existing shortcut capability for webpage image collection, archiving, or Apple Intelligence. This change introduces a new end-to-end shortcut flow that combines Cherri's `web`, `documents`, `text`, and `intelligence` actions in a single user-facing automation.

The explored use case is practical rather than experimental: collect the images that are visible on a webpage, download them, package them into a `.zip`, and optionally improve the final output with model-generated metadata. The key constraint is reliability. Image discovery and archive creation must remain deterministic, while metadata prompts should improve the result without becoming a hard dependency for success.

## Goals / Non-Goals

**Goals:**

- Provide a Cherri-native shortcut that can discover webpage images from Safari context, download them, and create a `.zip` archive.
- Use Apple Intelligence, and optionally another compatible Shortcuts model provider, to generate lightweight metadata such as a suggested archive name, summary, and tags.
- Define the shortcut's compiled name and icon metadata using Cherri definitions so the built Shortcut has a clear default identity.
- Keep the core archive flow working when Apple Intelligence is disabled, unavailable, or returns unusable output.
- Keep the implementation modular enough to separate image discovery, download/archive work, and metadata generation.

**Non-Goals:**

- Using Apple Intelligence to decide the authoritative image list for download.
- Supporting every possible website delivery pattern, such as infinite-scroll galleries or CSS background images, in the first version.
- Requiring a non-Apple model provider or a server-backed processing pipeline for the shortcut to succeed.
- Building a full asset-management workflow beyond creating one archive and its optional metadata output.

## Decisions

### Use Safari page context as the primary image discovery mechanism

The shortcut will treat Safari page context as the primary input path for v1. Discovering image URLs from the live page is more reliable than scraping static HTML because the browser has already resolved relative URLs and lazy-loaded image sources that are currently present in the DOM.

Alternative considered:
- Accept arbitrary URLs and scrape raw HTML first. Rejected for v1 because it adds brittle parsing logic and increases the chance of missing the actual images shown to the user.

### Keep the download-and-archive pipeline deterministic

Image discovery, downloading, and archive creation will be implemented without model involvement. Apple Intelligence will run after the shortcut has already determined the source page and collected the files that belong in the archive.

Alternative considered:
- Ask Apple Intelligence to select or filter images before download. Rejected because model variability would make the core workflow less predictable and harder to debug.

### Use bounded metadata prompts, not model-driven orchestration

The shortcut will request lightweight metadata from the selected model provider, centred on archive name, summary, and tags. The implementation should treat this output as optional enrichment that can be used to name the archive and generate a human-readable manifest, while ignoring empty or unusable output and falling back to deterministic defaults.

Alternative considered:
- Use free-form text summaries only. Rejected because downstream parsing is more fragile than a constrained metadata contract.

### Default to Apple-native providers while allowing an explicit ChatGPT path

The shortcut should default to Apple-native providers in the user-visible choices, but it may also expose ChatGPT as an explicit opt-in path when the user wants a non-Apple model. The deterministic archive flow remains primary, and metadata prompts stay optional.

Alternative considered:
- Make richer Private Cloud Compute or ChatGPT-backed prompting a required part of the flow. Rejected because it would raise the operational bar and make the shortcut fail in environments where model support is partial.

### Add non-behavioural shortcut definitions for default presentation

The shortcut should declare Cherri `#define` metadata for its compiled name and icon so the exported Shortcut presents as an intentional archive utility without changing the Safari-first runtime flow.

Alternative considered:
- Add launch-surface or input definitions as part of this update. Rejected because those definitions would broaden runtime behaviour, while the current request is only to add stable presentation metadata.

## Risks / Trade-offs

- [Safari-first input narrows the launch surface] -> Document Safari as the supported entry point for v1 and treat direct URL scraping as a follow-up enhancement.
- [Current-page discovery may miss images that load only after additional scrolling or interaction] -> Scope the shortcut to images available on the page at run time and expose a clear “no images found” message.
- [Model output can vary] -> Keep the metadata contract small, validate the returned fields, and never block archive creation on model output.
- [Archive names may collide or become invalid as filenames] -> Normalise names and add a deterministic fallback based on page title and run timestamp.

## Migration Plan

1. Add the new `apple-intelligence-image-archive` capability artefacts and corresponding Cherri source files.
2. Implement the shortcut in modular pieces for page discovery, file download/archive work, and optional metadata enrichment.
3. Compile the shortcut and verify the deterministic and optional-model fallback paths on supported tooling.
4. Roll back by removing the new capability and shortcut sources if the workflow proves too brittle in practice.

## Open Questions

- None for the initial proposal. The change intentionally narrows v1 to Safari-based discovery plus optional metadata prompts so implementation can proceed without unresolved architectural choices.
