function output(result) {
    const text = document.createElement('div');
    text.innerText = result;
    document.body.appendChild(text);
}

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

function buildFilename(url, index) {
    const parsed = new URL(url, document.baseURI);
    const rawName = decodeURIComponent(parsed.pathname.split('/').pop() || '');
    const extMatch = rawName.match(/\.([A-Za-z0-9]{2,5})$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
    const nameWithoutExt = rawName.replace(/\.[A-Za-z0-9]{2,5}$/, '');
    const safeStem = cleanFilenamePart(nameWithoutExt || `image-${index + 1}`);
    const paddedIndex = String(index + 1).padStart(3, '0');

    return `${paddedIndex}-${safeStem}.${ext}`;
}

const seen = new Set();
const lines = Array.from(document.images)
    .map((image, index) => {
        const source = image.currentSrc || image.src || image.getAttribute('src') || '';
        if (!source || source.startsWith('data:')) {
            return null;
        }

        const resolvedURL = new URL(source, document.baseURI).href;
        if (seen.has(resolvedURL)) {
            return null;
        }

        seen.add(resolvedURL);

        const fileName = buildFilename(resolvedURL, index);
        const altText = cleanText(image.alt);

        return [fileName, resolvedURL, altText].join('\t');
    })
    .filter(Boolean)
    .join('\n');

output(lines);
