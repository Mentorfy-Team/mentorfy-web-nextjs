import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import RatioSize from '@app/helpers/RatioSize';
import { useMemberAreaTypes } from '@app/hooks/useMemberAreaType';
import {
  AbsoluteBottomBox,
  CourseBox,
  ProductTitle,
} from '../../bem-vindo/style';

export function CardVertical({
  user,
  itemId,
  product,
  onPopular,
}: {
  onPopular;
  itemId: string;
  product;
  user;
}) {
  const visibility = React.useContext(VisibilityContext);
  const router = useRouter();
  const visible = visibility.isItemVisible(itemId);
  const { types } = useMemberAreaTypes();
  return (
    <div
      role="button"
      style={{
        display: 'inline-block',
        userSelect: 'none',
      }}
      tabIndex={0}
      className="card"
    >
      <CourseBox
        onMouseOver={() => {}}
        className="item"
        key={itemId}
        onClick={() => {
          if (product?.relation?.approved || product.owner === user.id) {
            router.push(
              types.find((type) => type.id.toString() === product.deliver)
                .path +
                '/' +
                product.id,
            );
          } else {
            onPopular(product);
          }
        }}
      >
        <Image
          alt=""
          src={
            product?.main_image || product.member_area.member_area_type.image
          }
          width={RatioSize('w', 3)}
          height={RatioSize('h', 3)}
          quality={90}
        />

        {!product?.banner_image && (
          <AbsoluteBottomBox>
            <ProductTitle>{product?.title}</ProductTitle>
          </AbsoluteBottomBox>
        )}
      </CourseBox>
    </div>
  );
}
