function cleanText(value) {
    return String(value || '')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function cleanFilenamePart(value) {
    const cleaned = cleanText(value)
        .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '-')
        .replace(/\.+$/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return cleaned || 'image';
}

function resolveURL(value) {
    try {
        return new URL(String(value || ''), document.baseURI);
    } catch (error) {
        return null;
    }
}

function safeDecode(value) {
    try {
        return decodeURIComponent(String(value || ''));
    } catch (error) {
        return String(value || '');
    }
}

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

function extensionFromDataURL(value) {
    const match = String(value || '').match(/^data:([^;,]+)/i);
    if (!match) {
        return '';
    }

    return extensionFromMimeType(match[1]);
}

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
