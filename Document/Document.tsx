import React, { useState } from 'react';

export const Document = () => {
  const [textArea, setTextArea] = useState(''); // for input string
  const [document, setDocument] = useState(''); // for showing all the text in document below textarea
  const [loading, setLoading] = useState(false); // for showing loading or shimmer effect

  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!loading) {
      setLoading(true);
      e.preventDefault();
      insertTextInDocument();
      setTextArea(''); // text area to default value
    }
  };

  // concat document and add animation
  const insertTextInDocument = () => {
    let newDoc = `<p class="paragraph-highlight-class">${textArea}</p>`;
    setDocument(document + newDoc);
    removeHighlightAfterTime();
  };

  // remove animation after some time for the new added text
  const removeHighlightAfterTime = () => {
    setTimeout(() => {
      setDocument((doc) => {
        let d = doc.replace(` class="paragraph-highlight-class"`, '');
        setLoading(false);
        return d;
      });
    }, 2000);
  };

  return (
    <div>
      <div className="body-conatiner">
        <textarea
          onKeyDown={(e) => {
            // mac os and windows key matching function
            if (e.key === 'enter' || e.which === 13) {
              handleSubmit(e);
            }
          }}
          className="textarea"
          rows={10}
          cols={40}
          onChange={handleChange}
          value={textArea}
          placeholder="Enter your text here..."
        />
      </div>

      <div className="document-container">
        {document ? (
          <div
            className="document-body"
            dangerouslySetInnerHTML={{
              __html: document,
            }}
          />
        ) : (
          <div
            className="document-body"
            style={{ textAlign: 'center', color: '#52525240' }}
          >
            Added content will be displayed here
          </div>
        )}
      </div>
    </div>
  );
};
