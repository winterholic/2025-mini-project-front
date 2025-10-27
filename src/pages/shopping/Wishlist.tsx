import { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';

const WishlistPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    padding: 1.25rem 2rem;
  `}

  ${media.desktop`
    padding: 1.5rem 2.5rem;
  `}
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogoImage = styled.img`
  border-radius: 6px;
`;

const StyledLogoText = styled.span`
  color: #111827;
  font-weight: 800;
  font-size: 22px;
`;

const NavMenu = styled.nav`
  display: none;
  gap: 2rem;

  ${media.tablet`
    display: flex;
  `}
`;

const NavItem = styled.a<{ $active?: boolean }>`
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#000' : '#666'};
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s;
  border-bottom: ${props => props.$active ? '2px solid #000' : '2px solid transparent'};

  &:hover {
    color: #000;
  }
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;

  ${media.tablet`
    padding: 2.5rem 2rem;
  `}

  ${media.desktop`
    padding: 3rem 2.5rem;
  `}
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.5rem;

  ${media.tablet`
    font-size: 2rem;
  `}
`;

const PageSubtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  ${media.tablet`
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  `}

  ${media.desktop`
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  `}
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: #f0f0f0;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductBrand = styled.div`
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 0.25rem;

  ${media.tablet`
    font-size: 0.875rem;
  `}
`;

const ProductTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.5rem;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${media.tablet`
    font-size: 0.95rem;
  `}
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #111;

  ${media.tablet`
    font-size: 1.1rem;
  `}
`;

const OriginalPrice = styled.span`
  font-size: 0.75rem;
  color: #999;
  text-decoration: line-through;

  ${media.tablet`
    font-size: 0.875rem;
  `}
`;

const Discount = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #ff4444;

  ${media.tablet`
    font-size: 0.95rem;
  `}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.625rem;
  border: ${props => props.$variant === 'primary' ? 'none' : '1px solid #e5e5e5'};
  background: ${props => props.$variant === 'primary'
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : '#fff'};
  color: ${props => props.$variant === 'primary' ? '#fff' : '#666'};
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    ${props => props.$variant === 'primary'
      ? 'box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);'
      : 'border-color: #000; color: #000;'}
  }

  ${media.tablet`
    font-size: 0.875rem;
    padding: 0.75rem;
  `}
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: #fff;
  border-radius: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0 0 0.5rem;
`;

const EmptyDesc = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem;
`;

const ShopButton = styled.a`
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
`;

interface WishlistItemType {
  id: number;
  imageUrl: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
      title: '오버사이즈 코튼 후디',
      brand: 'VOID.',
      price: 89000,
      originalPrice: 129000,
      discount: 31,
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      title: '클래식 데님 자켓',
      brand: 'DENIM CO.',
      price: 129000,
      originalPrice: 159000,
      discount: 19,
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
      title: '미니멀 스니커즈',
      brand: 'MINIMAL',
      price: 149000,
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
      title: '레더 크로스백',
      brand: 'LEATHER',
      price: 89000,
      originalPrice: 119000,
      discount: 25,
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      title: '와이드 슬랙스',
      brand: 'FORMAL',
      price: 79000,
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
      title: '울 니트 카디건',
      brand: 'KNIT',
      price: 99000,
      originalPrice: 139000,
      discount: 29,
    },
  ]);

  const removeFavorite = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item: WishlistItemType) => {
    alert(`"${item.title}"을(를) 장바구니에 담았습니다!`);
  };

  return (
    <WishlistPageWrapper>
      <Header>
        <HeaderContent>
          <StyledLogoLink href="/">
            <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <StyledLogoText>VOID.</StyledLogoText>
          </StyledLogoLink>
          <NavMenu>
            <NavItem href="/shopping">홈</NavItem>
            <NavItem href="/shopping/cart">장바구니</NavItem>
            <NavItem href="/shopping/wishlist" $active>좋아요</NavItem>
            <NavItem>마이페이지</NavItem>
          </NavMenu>
        </HeaderContent>
      </Header>

      <MainContent>
        <PageHeader>
          <PageTitle>좋아요</PageTitle>
          <PageSubtitle>
            {wishlistItems.length}개의 상품을 찜했습니다
          </PageSubtitle>
        </PageHeader>

        {wishlistItems.length === 0 ? (
          <EmptyWishlist>
            <EmptyIcon>💙</EmptyIcon>
            <EmptyTitle>좋아요한 상품이 없습니다</EmptyTitle>
            <EmptyDesc>마음에 드는 상품을 찜해보세요!</EmptyDesc>
            <ShopButton href="/shopping">쇼핑하러 가기</ShopButton>
          </EmptyWishlist>
        ) : (
          <ProductGrid>
            {wishlistItems.map(item => (
              <ProductCard key={item.id}>
                <ProductImageWrapper>
                  <ProductImage src={item.imageUrl} alt={item.title} />
                  <LikeButton onClick={() => removeFavorite(item.id)}>
                    ❤️
                  </LikeButton>
                </ProductImageWrapper>
                <ProductInfo>
                  <ProductBrand>{item.brand}</ProductBrand>
                  <ProductTitle>{item.title}</ProductTitle>
                  <PriceWrapper>
                    <Price>{item.price.toLocaleString()}원</Price>
                    {item.originalPrice && (
                      <>
                        <OriginalPrice>{item.originalPrice.toLocaleString()}원</OriginalPrice>
                        {item.discount && <Discount>{item.discount}%</Discount>}
                      </>
                    )}
                  </PriceWrapper>
                  <ActionButtons>
                    <ActionButton $variant="primary" onClick={() => addToCart(item)}>
                      장바구니
                    </ActionButton>
                    <ActionButton $variant="secondary">
                      바로구매
                    </ActionButton>
                  </ActionButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </MainContent>
    </WishlistPageWrapper>
  );
};

export default Wishlist;
