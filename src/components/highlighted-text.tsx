const highlightClass =
  "font-semibold text-violet-600 dark:text-violet-400";

export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={index} className={highlightClass}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
