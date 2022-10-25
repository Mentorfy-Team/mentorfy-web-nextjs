import React from 'react';
import Dropzone from 'react-dropzone';

const DropzoneComponent: React.FC<{ onDrop; children }> = ({
  onDrop,
  children,
}) => {
  return (
    <Dropzone
      accept={{
        'application/pdf': ['.pdf'],
      }}
      multiple={false}
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DropzoneComponent;
