import { FC } from 'react';
import { DescriptionText } from './styles';
import Link from 'next/link';
type props = {
  children: string | JSX.Element;
};

const Description: FC<props> = ({ children }) => {
  let finalText;
  if (typeof children === 'string') {
    // if text containes a link wrap it in a link
    const words = children.split(' ');
    const linkIndex = words.findIndex((word) => word.includes('http'));
    if (children.includes('http')) {
      finalText = words.map((word, index) => {
        if (index === linkIndex) {
          return (
            <Link key={word} href={word} target="_blank" rel="noreferrer">
              {word}
            </Link>
          );
        } else {
          return <span key={word}>{word} </span>;
        }
      });
    }
  }
  return <DescriptionText>{finalText || children}</DescriptionText>;
};

export default Description;
