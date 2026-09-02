/**
 * Alvos dos links de convite/redes sociais, indireccionados por /r/[slug].
 * Passar por uma rota própria (em vez de linkar direto) permite medir clique
 * antes do redirecionamento assim que uma ferramenta de analytics for conectada,
 * e trocar o destino (ex.: link de grupo esgotado) sem precisar editar as páginas.
 */
export const redirectTargets: Record<string, { destino: string; label: string }> = {
  "grupo-whatsapp-1": {
    destino: "https://chat.whatsapp.com/D39zSkdjZIE8BViIYI8cXf?mode=gi_t",
    label: "Grupo de WhatsApp 1 do Comitê",
  },
  "grupo-whatsapp-2": {
    destino: "https://chat.whatsapp.com/F4qfiA9RD36DUhzdFd89TJ?mode=gi_t",
    label: "Grupo de WhatsApp 2 do Comitê",
  },
};
