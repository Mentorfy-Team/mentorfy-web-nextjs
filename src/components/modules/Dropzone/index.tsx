import React from 'react';
import Dropzone from 'react-dropzone';

const DropzoneComponent: React.FC<{ onDrop; children; accepts? }> = ({
  onDrop,
  children,
  accepts = {
    'application/pdf': ['.pdf'],
  },
}) => {
  return (
    <Dropzone
      accept={accepts}
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
