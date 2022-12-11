import Slider from 'react-slick';

const settings = {
  dots: true,
  speed: 1000,
  slidesToScroll: 1,
  nextArrow: <div className="arrow__btn left-arrow">‹</div>,
  prevArrow: <div className="arrow__btn right-arrow">›</div>,
};

import React from 'react';
import { AbsoluteBottomBox, CourseBox, ProductTitle } from './styles';
import Image from 'next/image';

type Props = {
  numSlides: number;
  list: any[];
  onClick: (id: string) => void;
};

const Carousel: React.FC<Props> = ({ numSlides, list, onClick }) => {
  return (
    <Slider {...settings} slidesToShow={numSlides} className="container">
      {list.map((element, index) => (
        <CourseBox
          onMouseOver={() => {}}
          className="item"
          height={400}
          key={index}
          onClick={() => onClick(element.id)}
        >
          <Image
            alt=""
            src={element?.main_image || '/images/moonlit.png'}
            width={400}
            height={400}
            style={{
              objectFit: 'cover',
            }}
            quality={100}
          />

          {!element?.banner_image && (
            <AbsoluteBottomBox>
              <ProductTitle>{element?.title}</ProductTitle>
            </AbsoluteBottomBox>
          )}
        </CourseBox>
      ))}
      {[
        ...Array(
          numSlides - (list.length > numSlides ? numSlides : list.length),
        ),
      ].map((_, i) => (
        <CourseBox
          onMouseOver={() => {}}
          className="item"
          height={'400px'}
          width={'300px'}
          key={i}
        />
      ))}
    </Slider>
  );
};

export default Carousel;
