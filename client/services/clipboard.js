export const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (!successful) throw new Error();
            document.body.removeChild(textArea);
            return Promise.resolve();
        } catch (error) {
            document.body.removeChild(textArea);
            return Promise.reject('Error copying to clipboard');
        }
    }
};
