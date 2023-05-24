import Prism from "prismjs";
import { useEffect, useRef } from "react";
import "./CodeBlock.css";
const CodeBlock = ({ code, language }) => {
  const codeRef = useRef(null);
  const handleCopyClick = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="code-block">
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <button onClick={handleCopyClick}>Copy</button>
    </div>
  );
};

export default CodeBlock;
