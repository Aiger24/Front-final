// components/MarkdownRenderer.tsx
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Saltos de línea vacíos
      if (trimmedLine === '') {
        return <div key={index} className="markdown-empty-line">&nbsp;</div>;
      }

      // Procesar el contenido de la línea
      let processedContent = trimmedLine;
      
      // Reemplazar diferentes patrones de negritas
      processedContent = processedContent
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **texto**
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')      // *texto*
        .replace(/_(.*?)_/g, '<strong>$1</strong>');       // _texto_

      // Reemplazar números con círculo (❶, ❷, etc.)
      processedContent = processedContent
        .replace(/[❶❷❸❹❺❻❼❽❾]/g, '<span class="circle-number">$&</span>');

      // Determinar el tipo de línea
      if (trimmedLine.match(/^[🎯📝👥💰🏛️📋📄📞📧📍🕒💡]/)) {
        // Línea con emoji/icono
        return (
          <div key={index} className="markdown-line with-icon">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      } else if (trimmedLine.match(/^[❶❷❸❹❺❻❼❽❾]/) || trimmedLine.match(/^\d+\./)) {
        // Línea con número de lista
        return (
          <div key={index} className="markdown-line list-item">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
        // Línea con viñeta
        return (
          <div key={index} className="markdown-line bullet-item">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      } else if (trimmedLine === '---' || trimmedLine === '––' || trimmedLine === '***') {
        // Separador
        return <hr key={index} className="markdown-divider" />;
      } else if (trimmedLine.endsWith(':') || trimmedLine.match(/^[A-Z][^a-z]*:$/)) {
        // Título
        return (
          <div key={index} className="markdown-title">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      } else if (trimmedLine.toUpperCase() === trimmedLine && trimmedLine.length < 50) {
        // Texto en mayúsculas (probablemente un título)
        return (
          <div key={index} className="markdown-header">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      } else {
        // Línea normal
        return (
          <div key={index} className="markdown-line">
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      }
    });
  };

  return (
    <div className="markdown-content">
      {formatText(content)}
    </div>
  );
};

export default MarkdownRenderer;