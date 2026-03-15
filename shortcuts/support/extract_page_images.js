/**
 * Normalises an input into a single-line trimmed string with collapsed whitespace.
 * @param {*} value - Value to convert to text; null or undefined become an empty string.
 * @returns {string} The cleaned string where control characters and runs of whitespace are replaced by single spaces and surrounding whitespace is removed.
 */
function cleanText(value) {
    return String(value || '')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Produce a filesystem-safe filename segment from an arbitrary value.
 * @param {*} value - Value to convert and sanitise into a filename part.
 * @returns {string} The resulting filename part, or `'image'` if the result is empty.
 */
function cleanFilenamePart(value) {
    const cleaned = cleanText(value)
        .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
        .replace(/\.+$/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return cleaned || 'image';
}

/**
 * Resolve a value into a URL object relative to the document base URI.
 *
 * @param {any} value - The input to resolve; will be converted to a string. Falsy values are treated as an empty string.
 * @returns {URL|null} A `URL` object when the input yields a valid URL, `null` otherwise.
 */
function resolveURL(value) {
    try {
        return new URL(String(value || ''), document.baseURI);
    } catch (error) {
        return null;
    }
}

/**
 * Attempt to decode a URI component, falling back to the original input if decoding fails.
 * @param {*} value - The value to decode; will be converted to a string before decoding.
 * @returns {string} The decoded value if decoding succeeds, otherwise the original value converted to a string.
 */
function safeDecode(value) {
    try {
        return decodeURIComponent(String(value || ''));
    } catch (error) {
        return String(value || '');
    }
}

/**
 * Map an image MIME type string to a common file extension.
 * @param {string} value - The MIME type to map (for example `"image/png"`).
 * @returns {string} The corresponding file extension (for example `'png'`); an empty string if the MIME type is not recognised.
 */
function extensionFromMimeType(value) {
    const mimeType = cleanText(value).toLowerCase();

    if (mimeType === 'image/jpeg') {
        return 'jpg';
    }

    if (mimeType === 'image/png') {
        return 'png';
    }

    if (mimeType === 'image/webp') {
        return 'webp';
    }

    if (mimeType === 'image/gif') {
        return 'gif';
    }

    if (mimeType === 'image/svg+xml') {
        return 'svg';
    }

    if (mimeType === 'image/avif') {
        return 'avif';
    }

    if (mimeType === 'image/heic') {
        return 'heic';
    }

    if (mimeType === 'image/heif') {
        return 'heif';
    }

    if (mimeType === 'image/bmp') {
        return 'bmp';
    }

    if (mimeType === 'image/tiff') {
        return 'tiff';
    }

    return '';
}

/**
 * Determine the file extension implied by a data URL's MIME type.
 *
 * @param {string} value - The data URL to inspect.
 * @returns {string} The file extension for the MIME type found in the data URL, or an empty string if no MIME type is present or it cannot be mapped.
 */
function extensionFromDataURL(value) {
    const match = String(value || '').match(/^data:([^;,]+)/i);
    if (!match) {
        return '';
    }

    return extensionFromMimeType(match[1]);
}

/**
 * Construct a sanitized, deterministic filename for an image.
 *
 * Uses the URL's pathname last segment as the name stem, falling back to a generated
 * "image-N" stem for blob or missing names. Determines the extension from the URL if present,
 * otherwise from the provided inline data URL, defaulting to "jpg" if neither provides an extension.
 * The returned filename is prefixed with a three-digit, 1-based padded index and has its stem
 * cleaned for filesystem safety (e.g. punctuation and whitespace collapsed).
 *
 * @param {string|URL} url - The image source value; may be any value resolvable by resolveURL.
 * @param {number} index - Zero-based index used to generate the padded numeric prefix.
 * @param {string} [inlineData] - Optional data URL whose MIME type may be used to infer the extension.
 * @returns {string} The filename in the form "NNN-stem.ext", where NNN is a zero-padded 1-based index.
 */
function buildFilename(url, index, inlineData) {
    const parsed = resolveURL(url);
    const rawName = safeDecode(parsed ? parsed.pathname.split('/').pop() || '' : '');
    const inlineExt = extensionFromDataURL(inlineData);
    const extMatch = rawName.match(/\.([A-Za-z0-9]{2,5})$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : inlineExt || 'jpg';
    const isBlobURL = parsed ? parsed.protocol === 'blob:' : false;
    const nameWithoutExt = isBlobURL ? '' : rawName.replace(/\.[A-Za-z0-9]{2,5}$/, '');
    const safeStem = cleanFilenamePart(nameWithoutExt || `image-${index + 1}`);
    const paddedIndex = String(index + 1).padStart(3, '0');

    return `${paddedIndex}-${safeStem}.${ext}`;
}

/**
 * Retrieve inline data URL for a same-origin or blob resource.
 * @param {string|URL} url - The resource URL or a value resolvable relative to document.baseURI.
 * @returns {string} A data URL for the resource, or an empty string if unavailable, not permitted, or on error.
 */
async function fetchInlineData(url) {
    const parsed = resolveURL(url);
    if (!parsed) {
        return '';
    }

    const canFetchInlineData =
        parsed.protocol === 'blob:' || parsed.origin === window.location.origin;

    if (!canFetchInlineData) {
        return '';
    }

    try {
        const response = await fetch(parsed.href);
        if (!response.ok) {
            return '';
        }

        const blob = await response.blob();

        return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(String(reader.result || ''));
            reader.onerror = () => resolve('');
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        return '';
    }
}

/**
 * Deliver the final result to the completion callback.
 * @param {*} result - Value to deliver; converted to a string. If `result` is falsy, an empty string is delivered.
 */
function finish(result) {
    completion(String(result || ''));
}

(async () => {
    const seen = new Set();
    const records = [];
    let recordIndex = 0;

    for (const image of Array.from(document.images)) {
        try {
            const source = image.currentSrc || image.src || image.getAttribute('src') || '';
            if (!source || source.startsWith('data:')) {
                continue;
            }

            const resolvedSource = resolveURL(source);
            if (!resolvedSource) {
                continue;
            }

            if (!['http:', 'https:', 'blob:'].includes(resolvedSource.protocol)) {
                continue;
            }

            const resolvedURL = resolvedSource.href;
            if (seen.has(resolvedURL)) {
                continue;
            }

            const inlineData = await fetchInlineData(resolvedURL);
            if (resolvedSource.protocol === 'blob:' && !inlineData) {
                continue;
            }

            seen.add(resolvedURL);

            const fileName = buildFilename(resolvedURL, recordIndex, inlineData);
            const altText = cleanText(image.alt);

            records.push([fileName, resolvedURL, altText, inlineData].join('\t'));
            recordIndex += 1;
        } catch (error) {
            continue;
        }
    }

    finish(records.join('\n'));
})().catch(() => finish(''));
