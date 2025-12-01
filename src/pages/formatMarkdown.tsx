export const formatMarkdown = (text: string) => {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // **negritas**
        .replace(/\*(.*?)\*/g, "<i>$1</i>") // *italica*
        .replace(/_(.*?)_/g, "<u>$1</u>") // _subrayado_
        .replace(/\^\^(.*?)\^\^/g, "<del>$1</del>") // ^^tachado^^
        .replace(/`(.*?)`/g, "<code>$1</code>") // `código`
        .replace(/\n/g, "<br>") // Saltos de línea
};
